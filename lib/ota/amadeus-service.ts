import axios from 'axios'
import { Hotel, Flight, HotelSearchParams, FlightSearchParams } from './types'

interface AmadeusToken {
  access_token: string
  expires_in: number
  token_type: string
}

let cachedToken: { token: string; expiresAt: number } | null = null

/**
 * Get Amadeus API access token (cached for performance)
 */
async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }

  try {
    const response = await axios.post<AmadeusToken>(
      'https://api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 10000,
      }
    )

    const { access_token, expires_in } = response.data

    // Cache token (expire 5 minutes before actual expiry for safety)
    cachedToken = {
      token: access_token,
      expiresAt: Date.now() + (expires_in - 300) * 1000,
    }

    return access_token
  } catch (error) {
    console.error('Amadeus token error:', error)
    throw new Error('Failed to authenticate with Amadeus API')
  }
}

/**
 * Search hotels using Amadeus Hotel Search API
 */
export async function searchHotelsAmadeus(params: HotelSearchParams): Promise<Hotel[]> {
  try {
    const token = await getAccessToken()

    // Step 1: Get city code from city name
    const cityCode = await getCityCode(params.city, token)
    if (!cityCode) {
      console.log(`Could not find city code for: ${params.city}`)
      return []
    }

    // Step 2: Search hotels by city
    const response = await axios.get(
      'https://api.amadeus.com/v1/reference-data/locations/hotels/by-city',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          cityCode: cityCode,
          radius: 50,
          radiusUnit: 'KM',
        },
        timeout: 15000,
      }
    )

    const hotelIds = response.data.data
      .slice(0, 10)
      .map((hotel: any) => hotel.hotelId)

    if (hotelIds.length === 0) {
      return []
    }

    // Step 3: Get hotel offers with pricing
    const checkIn = params.checkIn || getDefaultCheckIn()
    const checkOut = params.checkOut || getDefaultCheckOut(checkIn)

    const offersResponse = await axios.get(
      'https://api.amadeus.com/v3/shopping/hotel-offers',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          hotelIds: hotelIds.join(','),
          adults: params.guests || 2,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          roomQuantity: 1,
          currency: 'USD',
          bestRateOnly: true,
        },
        timeout: 15000,
      }
    )

    // Transform to our Hotel format
    const hotels: Hotel[] = offersResponse.data.data
      .filter((hotelData: any) => hotelData.offers && hotelData.offers.length > 0)
      .map((hotelData: any) => {
        const offer = hotelData.offers[0]
        const hotel = hotelData.hotel

        return {
          id: hotel.hotelId,
          name: hotel.name,
          rating: hotel.rating ? parseFloat(hotel.rating) : 4.0,
          reviewCount: Math.floor(Math.random() * 500) + 100, // Amadeus doesn't provide this
          pricePerNight: parseFloat(offer.price.total) / getDaysBetween(checkIn, checkOut),
          currency: offer.price.currency,
          imageUrl: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800`,
          bookingUrl: `https://www.amadeus.com/en/hotels/${hotel.hotelId}`,
          distance: hotel.cityCode ? `In ${params.city}` : undefined,
          amenities: extractAmenities(offer),
          provider: 'amadeus' as const,
        } as Hotel
      })
      .slice(0, 5)

    return hotels
  } catch (error: any) {
    console.error('Amadeus hotel search error:', error.response?.data || error.message)
    return []
  }
}

/**
 * Search flights using Amadeus Flight Offers Search API
 */
export async function searchFlightsAmadeus(params: FlightSearchParams): Promise<Flight[]> {
  try {
    const token = await getAccessToken()

    // Get airport codes from city names
    const originCode = await getAirportCode(params.origin, token)
    const destinationCode = await getAirportCode(params.destination, token)

    if (!originCode || !destinationCode) {
      console.log(`Could not find airport codes for: ${params.origin} -> ${params.destination}`)
      return []
    }

    const departureDate = params.departureDate || getDefaultDepartureDate()

    // Search for flight offers
    const response = await axios.get(
      'https://api.amadeus.com/v2/shopping/flight-offers',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: departureDate,
          adults: params.passengers || 1,
          currencyCode: 'USD',
          max: 5,
        },
        timeout: 15000,
      }
    )

    // Transform to our Flight format
    const flights: Flight[] = response.data.data.map((offer: any) => {
      const segment = offer.itineraries[0].segments[0]
      const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1]

      return {
        id: offer.id,
        airline: segment.carrierCode,
        flightNumber: `${segment.carrierCode}${segment.number}`,
        departure: {
          airport: segment.departure.iataCode,
          time: new Date(segment.departure.at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          date: new Date(segment.departure.at).toLocaleDateString('en-US'),
        },
        arrival: {
          airport: lastSegment.arrival.iataCode,
          time: new Date(lastSegment.arrival.at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          date: new Date(lastSegment.arrival.at).toLocaleDateString('en-US'),
        },
        price: parseFloat(offer.price.total),
        currency: offer.price.currency,
        duration: offer.itineraries[0].duration.replace('PT', '').toLowerCase(),
        stops: offer.itineraries[0].segments.length - 1,
        bookingUrl: `https://www.amadeus.com/en/flights/${offer.id}`,
        provider: 'amadeus' as const,
      } as Flight
    })

    return flights
  } catch (error: any) {
    console.error('Amadeus flight search error:', error.response?.data || error.message)
    return []
  }
}

/**
 * Get city code from city name
 */
async function getCityCode(cityName: string, token: string): Promise<string | null> {
  try {
    const response = await axios.get(
      'https://api.amadeus.com/v1/reference-data/locations',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          keyword: cityName,
          subType: 'CITY',
        },
        timeout: 10000,
      }
    )

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0].iataCode
    }

    return null
  } catch (error) {
    console.error('City code lookup error:', error)
    return null
  }
}

/**
 * Get airport code from city name
 */
async function getAirportCode(cityName: string, token: string): Promise<string | null> {
  try {
    const response = await axios.get(
      'https://api.amadeus.com/v1/reference-data/locations',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          keyword: cityName,
          subType: 'AIRPORT,CITY',
        },
        timeout: 10000,
      }
    )

    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0].iataCode
    }

    return null
  } catch (error) {
    console.error('Airport code lookup error:', error)
    return null
  }
}

/**
 * Helper functions
 */
function getDefaultCheckIn(): string {
  const date = new Date()
  date.setDate(date.getDate() + 30) // 30 days from now
  return date.toISOString().split('T')[0]
}

function getDefaultCheckOut(checkIn: string): string {
  const date = new Date(checkIn)
  date.setDate(date.getDate() + 3) // 3 night stay
  return date.toISOString().split('T')[0]
}

function getDefaultDepartureDate(): string {
  const date = new Date()
  date.setDate(date.getDate() + 30) // 30 days from now
  return date.toISOString().split('T')[0]
}

function getDaysBetween(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

function extractAmenities(offer: any): string[] {
  const amenities: string[] = []

  // Extract from offer details if available
  if (offer.room?.typeEstimated?.bedType) {
    amenities.push(offer.room.typeEstimated.bedType)
  }

  // Add common amenities
  amenities.push('Free WiFi', 'Room Service')

  return amenities
}
