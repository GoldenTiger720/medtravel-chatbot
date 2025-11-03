import { Hotel, HotelSearchParams } from './types'

// Mock hotel data for MVP - Replace with real API calls to Expedia/Booking.com
const MOCK_HOTELS: Hotel[] = [
  {
    id: 'hotel_1',
    name: 'Grand Luxury Hotel',
    rating: 4.5,
    reviewCount: 1245,
    pricePerNight: 120,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    bookingUrl: 'https://booking.com/hotel/grand-luxury',
    distance: '2.5 km from clinic',
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Spa'],
    provider: 'booking',
  },
  {
    id: 'hotel_2',
    name: 'City Center Suites',
    rating: 4.3,
    reviewCount: 892,
    pricePerNight: 95,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    bookingUrl: 'https://expedia.com/hotel/city-center-suites',
    distance: '1.8 km from clinic',
    amenities: ['Free WiFi', 'Gym', 'Breakfast'],
    provider: 'expedia',
  },
  {
    id: 'hotel_3',
    name: 'Comfort Inn Medical District',
    rating: 4.0,
    reviewCount: 567,
    pricePerNight: 75,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    bookingUrl: 'https://booking.com/hotel/comfort-inn',
    distance: '0.5 km from clinic',
    amenities: ['Free WiFi', 'Free Parking', 'Airport Shuttle'],
    provider: 'booking',
  },
]

export async function searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // TODO: Replace with actual API calls
  // Example: Expedia Rapid API, Booking.com Partner Hub API

  // Filter based on params
  let results = MOCK_HOTELS

  if (params.maxPrice) {
    results = results.filter(hotel => hotel.pricePerNight <= params.maxPrice!)
  }

  // Sort by price
  results.sort((a, b) => a.pricePerNight - b.pricePerNight)

  return results.slice(0, 5)
}

/**
 * Example integration with Expedia Rapid API
 * Requires API key and secret
 */
export async function searchHotelsExpedia(params: HotelSearchParams): Promise<Hotel[]> {
  // const EXPEDIA_API_KEY = process.env.EXPEDIA_API_KEY
  // const EXPEDIA_API_SECRET = process.env.EXPEDIA_API_SECRET

  // const response = await fetch('https://api.ean.com/v3/properties', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${accessToken}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     location: params.city,
  //     checkin: params.checkIn,
  //     checkout: params.checkOut,
  //     occupancy: params.guests || 1,
  //   })
  // })

  // const data = await response.json()
  // return normalizeExpediaResponse(data)

  return searchHotels(params) // Fallback to mock
}

/**
 * Example integration with Booking.com Partner Hub API
 */
export async function searchHotelsBooking(params: HotelSearchParams): Promise<Hotel[]> {
  // const BOOKING_API_KEY = process.env.BOOKING_API_KEY

  // const response = await fetch('https://distribution-xml.booking.com/2.0/json/hotels', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Basic ${btoa(BOOKING_API_KEY)}`,
  //   },
  // })

  // const data = await response.json()
  // return normalizeBookingResponse(data)

  return searchHotels(params) // Fallback to mock
}
