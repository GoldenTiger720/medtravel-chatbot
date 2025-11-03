import { Flight, FlightSearchParams } from './types'
import { searchFlightsAmadeus } from './amadeus-service'

// Mock flight data for MVP - Replace with real API calls to Skyscanner/Amadeus
const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'flight_1',
    airline: 'Emirates',
    flightNumber: 'EK203',
    departure: {
      airport: 'JFK',
      time: '22:30',
      date: '2025-12-01',
    },
    arrival: {
      airport: 'DXB',
      time: '18:45',
      date: '2025-12-02',
    },
    price: 850,
    currency: 'USD',
    duration: '12h 15m',
    stops: 0,
    bookingUrl: 'https://skyscanner.com/flight/ek203',
    provider: 'skyscanner',
  },
  {
    id: 'flight_2',
    airline: 'Turkish Airlines',
    flightNumber: 'TK11',
    departure: {
      airport: 'JFK',
      time: '17:00',
      date: '2025-12-01',
    },
    arrival: {
      airport: 'IST',
      time: '11:30',
      date: '2025-12-02',
    },
    price: 720,
    currency: 'USD',
    duration: '10h 30m',
    stops: 0,
    bookingUrl: 'https://skyscanner.com/flight/tk11',
    provider: 'skyscanner',
  },
  {
    id: 'flight_3',
    airline: 'Lufthansa',
    flightNumber: 'LH400',
    departure: {
      airport: 'JFK',
      time: '18:40',
      date: '2025-12-01',
    },
    arrival: {
      airport: 'FRA',
      time: '08:05',
      date: '2025-12-02',
    },
    price: 680,
    currency: 'USD',
    duration: '7h 25m',
    stops: 1,
    bookingUrl: 'https://amadeus.com/flight/lh400',
    provider: 'amadeus',
  },
]

export async function searchFlights(params: FlightSearchParams): Promise<Flight[]> {
  try {
    // Try to get real-time data from Amadeus API
    console.log('Searching flights with Amadeus API:', params)
    const amadeusResults = await searchFlightsAmadeus(params)

    if (amadeusResults && amadeusResults.length > 0) {
      console.log(`Found ${amadeusResults.length} flights from Amadeus`)
      return amadeusResults
    }

    console.log('No Amadeus results, using fallback mock data')
  } catch (error) {
    console.error('Amadeus flight search failed, using fallback:', error)
  }

  // Fallback to mock data if Amadeus fails
  let results = MOCK_FLIGHTS

  if (params.maxPrice) {
    results = results.filter(flight => flight.price <= params.maxPrice!)
  }

  // Sort by price
  results.sort((a, b) => a.price - b.price)

  return results.slice(0, 5)
}

/**
 * Example integration with Skyscanner API
 * Requires API key from RapidAPI
 */
export async function searchFlightsSkyscanner(params: FlightSearchParams): Promise<Flight[]> {
  // const SKYSCANNER_API_KEY = process.env.SKYSCANNER_API_KEY

  // const response = await fetch(
  //   `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${params.origin}/${params.destination}/${params.departureDate}`,
  //   {
  //     headers: {
  //       'X-RapidAPI-Key': SKYSCANNER_API_KEY!,
  //       'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
  //     },
  //   }
  // )

  // const data = await response.json()
  // return normalizeSkyscannerResponse(data)

  return searchFlights(params) // Fallback to mock
}

