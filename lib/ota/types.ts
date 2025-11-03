export interface HotelSearchParams {
  city: string
  country?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  maxPrice?: number
}

export interface Hotel {
  id: string
  name: string
  rating: number
  reviewCount: number
  pricePerNight: number
  currency: string
  imageUrl: string
  bookingUrl: string
  distance?: string
  amenities: string[]
  provider: 'expedia' | 'booking'
}

export interface FlightSearchParams {
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
  passengers?: number
  maxPrice?: number
}

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  departure: {
    airport: string
    time: string
    date: string
  }
  arrival: {
    airport: string
    time: string
    date: string
  }
  price: number
  currency: string
  duration: string
  stops: number
  bookingUrl: string
  provider: 'skyscanner' | 'amadeus'
}
