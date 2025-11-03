import { NextRequest, NextResponse } from 'next/server'
import { extractIntent } from '@/lib/ai/intent-extractor'
import { composeResponse } from '@/lib/ai/response-composer'
import { filterResponse } from '@/lib/ai/policy-filter'
import { searchClinics } from '@/lib/db/clinic-search'
import { searchHotels } from '@/lib/ota/hotel-service'
import { searchFlights } from '@/lib/ota/flight-service'

export const runtime = 'nodejs'
export const maxDuration = 60

interface ChatRequest {
  message: string
  sessionId?: string
  locale?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { message, sessionId, locale = 'en' } = body

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Step 1: Extract intent from user message
    const intent = await extractIntent(message)

    // Step 2: Search for clinics based on intent
    const clinics = await searchClinics(intent, 10)

    // Step 3: Fetch hotels if needed
    let hotels = null
    if (intent.needsHotel && intent.city) {
      hotels = await searchHotels({
        city: intent.city,
        country: intent.country,
        guests: intent.numberOfPeople,
        maxPrice: intent.budget,
      })
    }

    // Step 4: Fetch flights if needed
    let flights = null
    if (intent.needsFlight && intent.city && intent.originCity) {
      flights = await searchFlights({
        origin: intent.originCity,
        destination: intent.city,
        passengers: intent.numberOfPeople,
        maxPrice: intent.budget,
      })
    }

    // Step 5: Compose response with LLM
    const responseText = await composeResponse({
      intent,
      clinics: clinics.map(c => ({
        id: c.id,
        name: locale === 'uae' && c.nameAr ? c.nameAr : c.name,
        city: c.city,
        country: c.country,
        rating: c.rating || undefined,
        reviewCount: c.reviewCount || undefined,
        specialties: c.specialties,
        priceRange: c.priceRange || undefined,
        packages: c.packages.map(p => ({
          id: p.id,
          name: locale === 'uae' && p.nameAr ? p.nameAr : p.name,
          price: Number(p.price),
          currency: p.currency,
          duration: p.duration,
        })),
      })),
      hotels: hotels || undefined,
      flights: flights || undefined,
    })

    // Step 6: Apply policy filter
    const filteredResponse = await filterResponse(responseText)

    // Step 7: Return structured response
    return NextResponse.json({
      message: filteredResponse,
      intent,
      cards: {
        clinics: clinics.slice(0, 5).map(c => ({
          type: 'clinic',
          id: c.id,
          name: locale === 'uae' && c.nameAr ? c.nameAr : c.name,
          description: c.description.substring(0, 150) + '...',
          city: c.city,
          country: c.country,
          rating: c.rating,
          reviewCount: c.reviewCount,
          specialties: c.specialties,
          priceRange: c.priceRange,
          imageUrl: c.imageUrl,
          packages: c.packages.slice(0, 2),
        })),
        hotels: hotels?.slice(0, 3).map(h => ({
          type: 'hotel',
          id: h.id,
          name: h.name,
          rating: h.rating,
          reviewCount: h.reviewCount,
          pricePerNight: h.pricePerNight,
          currency: h.currency,
          imageUrl: h.imageUrl,
          bookingUrl: h.bookingUrl,
          distance: h.distance,
          amenities: h.amenities,
        })),
        flights: flights?.slice(0, 3).map(f => ({
          type: 'flight',
          id: f.id,
          airline: f.airline,
          flightNumber: f.flightNumber,
          departure: f.departure,
          arrival: f.arrival,
          price: f.price,
          currency: f.currency,
          duration: f.duration,
          stops: f.stops,
          bookingUrl: f.bookingUrl,
        })),
      },
      sessionId: sessionId || `session_${Date.now()}`,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process message',
        message: 'Sorry, I encountered an error. Please try again.',
      },
      { status: 500 }
    )
  }
}
