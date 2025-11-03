import { Flight, FlightSearchParams } from './types'

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
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600))

  // TODO: Replace with actual API calls
  // Example: Skyscanner API, Amadeus Self-Service APIs

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

/**
 * Example integration with Amadeus API
 * Requires client ID and secret
 */
export async function searchFlightsAmadeus(params: FlightSearchParams): Promise<Flight[]> {
  // const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID
  // const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET

  // // Get access token
  // const tokenResponse = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: new URLSearchParams({
  //     grant_type: 'client_credentials',
  //     client_id: AMADEUS_CLIENT_ID!,
  //     client_secret: AMADEUS_CLIENT_SECRET!,
  //   }),
  // })

  // const { access_token } = await tokenResponse.json()

  // // Search flights
  // const response = await fetch(
  //   `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${params.origin}&destinationLocationCode=${params.destination}&departureDate=${params.departureDate}&adults=${params.passengers || 1}`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${access_token}`,
  //     },
  //   }
  // )

  // const data = await response.json()
  // return normalizeAmadeusResponse(data)

  return searchFlights(params) // Fallback to mock
}
