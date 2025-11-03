import OpenAI from 'openai'
import { Intent } from './intent-extractor'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export interface ClinicResult {
  id: string
  name: string
  city: string
  country: string
  rating?: number
  reviewCount?: number
  specialties: string[]
  priceRange?: string
  packages?: Array<{
    id: string
    name: string
    price: number
    currency: string
    duration: number
  }>
}

export interface HotelResult {
  id: string
  name: string
  rating?: number
  pricePerNight: number
  currency: string
  imageUrl?: string
  bookingUrl: string
  distance?: string
}

export interface FlightResult {
  id: string
  airline: string
  flightNumber?: string
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
}

export interface ComposeResponseData {
  intent: Intent
  clinics?: ClinicResult[]
  hotels?: HotelResult[]
  flights?: FlightResult[]
}

const RESPONSE_COMPOSER_PROMPT = `You are a friendly and helpful AI assistant for a medical tourism platform. Your role is to help users find verified medical clinics and plan their medical travel.

CRITICAL RULES:
1. ONLY use information provided in the data. NEVER make up clinic names, prices, or details.
2. If no clinics are found, politely suggest adjusting the search criteria.
3. Do NOT provide medical advice. Only provide factual information about clinics and logistics.
4. Be warm, professional, and empathetic.
5. Keep responses concise but informative.
6. If hotels or flights are provided, mention them briefly and note they're from trusted partners.
7. Always remind users that the clinics are verified and accredited.
8. Encourage users to request a call or save options for more details.

Your response should:
- Greet the user warmly if it's their first message
- Acknowledge their specific request
- Present the clinics found (if any) with key details
- Mention hotel and flight options if available
- Include a call-to-action (save, request call, or ask questions)
- Be conversational and helpful

Do NOT include any JSON, code, or structured data in your response. Write naturally as if speaking to the user.
`

export async function composeResponse(data: ComposeResponseData): Promise<string> {
  try {
    const { intent, clinics = [], hotels = [], flights = [] } = data

    // Build context from data
    let context = `User is looking for: ${intent.procedure || 'medical treatment'}`
    if (intent.city) context += ` in ${intent.city}`
    if (intent.country) context += ` in ${intent.country}`
    if (intent.budget) context += ` with budget up to $${intent.budget}`

    context += `\n\nClinics found (${clinics.length}):\n`
    clinics.slice(0, 5).forEach((clinic, idx) => {
      context += `${idx + 1}. ${clinic.name} in ${clinic.city}, ${clinic.country}\n`
      context += `   - Rating: ${clinic.rating || 'N/A'} (${clinic.reviewCount || 0} reviews)\n`
      context += `   - Specialties: ${clinic.specialties.join(', ')}\n`
      if (clinic.packages && clinic.packages.length > 0) {
        const pkg = clinic.packages[0]
        context += `   - Package from $${pkg.price} (${pkg.duration} days)\n`
      }
    })

    if (hotels.length > 0) {
      context += `\nNearby hotels found: ${hotels.length} options`
      context += ` starting from $${Math.min(...hotels.map(h => h.pricePerNight))}/night\n`
    }

    if (flights.length > 0) {
      context += `\nFlight options found: ${flights.length} options`
      context += ` starting from $${Math.min(...flights.map(f => f.price))}\n`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: RESPONSE_COMPOSER_PROMPT },
        { role: 'user', content: context },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return response.choices[0]?.message?.content || 'I found some options for you. Please let me know if you\'d like more details!'
  } catch (error) {
    console.error('Response composition error:', error)
    return 'I\'m here to help! Could you please rephrase your request or provide more details?'
  }
}
