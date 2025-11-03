import { NextRequest, NextResponse } from 'next/server'
import { extractIntent } from '@/lib/ai/intent-extractor'
import { composeResponse } from '@/lib/ai/response-composer'
import { composeAdaptiveResponse } from '@/lib/ai/adaptive-response-composer'
import { detectEmotion, quickEmotionCheck } from '@/lib/ai/emotion-detector'
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
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
  useAdaptiveMode?: boolean // Enable intelligent, emotion-aware responses
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const {
      message,
      sessionId,
      locale = 'en',
      conversationHistory = [],
      useAdaptiveMode = true, // Default to intelligent mode
    } = body

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Step 1: Detect emotion and analyze user's state (if adaptive mode enabled)
    let emotionAnalysis = null
    if (useAdaptiveMode) {
      // Use quick check for instant feedback, then full analysis in background
      const quickEmotion = quickEmotionCheck(message)
      console.log('Quick emotion check:', quickEmotion)

      // Full emotion analysis
      emotionAnalysis = await detectEmotion(message)
      console.log('Full emotion analysis:', emotionAnalysis)
    }

    // Step 2: Extract intent from user message
    const intent = await extractIntent(message)

    // Step 3: Search for clinics based on intent
    const clinics = await searchClinics(intent, 10)

    // Step 4: Fetch hotels if needed
    let hotels = null
    if (intent.needsHotel && intent.city) {
      hotels = await searchHotels({
        city: intent.city,
        country: intent.country,
        guests: intent.numberOfPeople,
        maxPrice: intent.budget,
      })
    }

    // Step 5: Fetch flights if needed
    let flights = null
    if (intent.needsFlight && intent.city && intent.originCity) {
      flights = await searchFlights({
        origin: intent.originCity,
        destination: intent.city,
        passengers: intent.numberOfPeople,
        maxPrice: intent.budget,
      })
    }

    // Prepare clinic data
    const clinicData = clinics.map(c => ({
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
    }))

    // Step 6: Compose response (adaptive or standard)
    let responseText: string

    if (useAdaptiveMode && emotionAnalysis) {
      // Use intelligent, emotion-aware response composer
      responseText = await composeAdaptiveResponse({
        intent,
        emotionAnalysis,
        clinics: clinicData,
        hotels: hotels || undefined,
        flights: flights || undefined,
        conversationHistory,
      })
    } else {
      // Use standard response composer
      responseText = await composeResponse({
        intent,
        clinics: clinicData,
        hotels: hotels || undefined,
        flights: flights || undefined,
      })
    }

    // Step 7: Apply policy filter
    const filteredResponse = await filterResponse(responseText)

    // Step 8: Return structured response with emotion metadata
    return NextResponse.json({
      message: filteredResponse,
      intent,
      emotionAnalysis: emotionAnalysis || undefined, // Include for debugging/analytics
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
