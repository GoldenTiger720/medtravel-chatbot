import OpenAI from 'openai'
import { Intent } from './intent-extractor'
import { EmotionAnalysis } from './emotion-detector'
import { ClinicResult, HotelResult, FlightResult } from './response-composer'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export interface AdaptiveResponseData {
  intent: Intent
  emotionAnalysis: EmotionAnalysis
  clinics?: ClinicResult[]
  hotels?: HotelResult[]
  flights?: FlightResult[]
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
}

/**
 * Adaptive Response Composer - Thinks for itself and adjusts to user's emotional state
 * No rigid templates - uses AI reasoning to craft contextually appropriate responses
 */
export async function composeAdaptiveResponse(data: AdaptiveResponseData): Promise<string> {
  const {
    intent,
    emotionAnalysis,
    clinics = [],
    hotels = [],
    flights = [],
    conversationHistory = [],
  } = data

  // Build dynamic system prompt based on emotional analysis
  const systemPrompt = buildDynamicSystemPrompt(emotionAnalysis)

  // Build context with search results
  const contextMessage = buildContextMessage(intent, clinics, hotels, flights)

  // Build conversation context
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ]

  // Add recent conversation history for context
  if (conversationHistory.length > 0) {
    messages.push(
      ...conversationHistory.slice(-4).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }))
    )
  }

  // Add current context
  messages.push({
    role: 'user',
    content: contextMessage,
  })

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: getTemperatureForTone(emotionAnalysis.suggestedTone),
      max_tokens: getMaxTokensForComplexity(emotionAnalysis.queryComplexity),
    })

    return response.choices[0]?.message?.content || getFallbackResponse(emotionAnalysis)
  } catch (error) {
    console.error('Adaptive response composition error:', error)
    return getFallbackResponse(emotionAnalysis)
  }
}

/**
 * Builds a dynamic system prompt that adapts to user's emotional state
 * No templates - AI reasons about the best approach
 */
function buildDynamicSystemPrompt(emotion: EmotionAnalysis): string {
  const basePersonality = `You are a knowledgeable and caring medical tourism consultant. Your role is to help people find the right medical care abroad.`

  // Emotion-specific guidance
  const emotionalGuidance = getEmotionalGuidance(emotion)

  // Tone-specific instruction
  const toneInstruction = getToneInstruction(emotion.suggestedTone)

  // Sensitivity handling
  const sensitivityNote = emotion.sensitivityLevel === 'high'
    ? `\n\nIMPORTANT: This is a sensitive topic. Be extra compassionate, patient, and understanding. Acknowledge their feelings naturally.`
    : ''

  // Empathy instruction
  const empathyNote = emotion.requiresEmpathy
    ? `\n\nShow genuine empathy and emotional intelligence. This person needs reassurance and understanding, not just information.`
    : ''

  // Core rules that never change
  const coreRules = `

CORE RULES (Always follow):
1. ONLY use information from the provided search results - never make up clinic names, prices, or details
2. NEVER give medical advice - you're a travel consultant, not a doctor
3. If no results found, acknowledge it and suggest alternatives or adjustments
4. Be truthful - if something isn't available, say so
5. Remember: Real people with real concerns are reading your response

RESPONSE STRUCTURE:
- Think about what this person really needs to hear right now
- Adapt your language and detail level to their emotional state
- If they seem overwhelmed, simplify. If they want details, provide them
- End with a natural next step or question (not forced)
- Be conversational and human, not robotic`

  return `${basePersonality}

${emotionalGuidance}

${toneInstruction}${sensitivityNote}${empathyNote}

${coreRules}`
}

/**
 * Provides emotional guidance based on detected state
 */
function getEmotionalGuidance(emotion: EmotionAnalysis): string {
  switch (emotion.primaryEmotion) {
    case 'anxious':
    case 'scared':
      return `EMOTIONAL STATE: User is anxious or worried.
YOUR APPROACH: Be reassuring and calming. Acknowledge their concerns naturally. Focus on safety, accreditations, and success rates. Use phrases like "I understand your concern" or "It's completely normal to feel this way." Provide concrete, factual information that builds confidence.`

    case 'frustrated':
      return `EMOTIONAL STATE: User is frustrated (possibly from previous negative experiences).
YOUR APPROACH: Be understanding and solution-focused. Don't add to their frustration with vague answers. Be direct and helpful. Acknowledge what they've been through. Show that you're here to make things easier.`

    case 'desperate':
    case 'urgent':
      return `EMOTIONAL STATE: User has an urgent need.
YOUR APPROACH: Be efficient and direct while still caring. They need quick, actionable information. Skip the fluff. Prioritize showing them concrete options NOW. Mention immediate availability if relevant.`

    case 'confused':
      return `EMOTIONAL STATE: User doesn't fully understand something.
YOUR APPROACH: Be educational and patient. Break down complex information simply. Use analogies if helpful. Check understanding naturally. Don't overwhelm with too much info at once.`

    case 'excited':
    case 'hopeful':
      return `EMOTIONAL STATE: User is positive and enthusiastic.
YOUR APPROACH: Match their energy (but stay professional). Share their excitement. Highlight positive aspects. Keep momentum going. This is a great time to provide thorough information.`

    case 'skeptical':
      return `EMOTIONAL STATE: User has doubts or concerns about medical tourism.
YOUR APPROACH: Build trust with facts. Emphasize verification, accreditations, reviews. Be transparent about what you can and cannot guarantee. Address concerns directly and honestly.`

    case 'overwhelmed':
      return `EMOTIONAL STATE: User feels overwhelmed by choices or information.
YOUR APPROACH: Simplify everything. Narrow down options. Give clear recommendations. Use phrases like "Let's focus on..." or "I'd suggest starting with..." Help them feel in control again.`

    case 'curious':
      return `EMOTIONAL STATE: User is exploring and learning.
YOUR APPROACH: Be informative and engaging. This person wants to understand more. Provide context, explain processes, share interesting details. Educate while you help.`

    default:
      return `EMOTIONAL STATE: Neutral inquiry.
YOUR APPROACH: Be helpful and professional. Provide clear information. Match their level of formality. Focus on being useful.`
  }
}

/**
 * Provides tone-specific instructions
 */
function getToneInstruction(tone: EmotionAnalysis['suggestedTone']): string {
  switch (tone) {
    case 'casual':
      return `\nTONE: Be friendly and conversational. Natural language. Like talking to a knowledgeable friend.`

    case 'professional':
      return `\nTONE: Be polished and competent. Formal but not stiff. Like a trusted consultant.`

    case 'reassuring':
      return `\nTONE: Be warm and calming. Gentle language. Like a caring advisor who understands.`

    case 'educational':
      return `\nTONE: Be informative and clear. Explain things well. Like a patient teacher.`

    case 'direct':
      return `\nTONE: Be concise and action-oriented. Get to the point. Like an efficient expert.`

    case 'consultative':
      return `\nTONE: Be advisory and thoughtful. Think through options with them. Like a strategic partner.`

    default:
      return `\nTONE: Be helpful and balanced.`
  }
}

/**
 * Builds the context message with search results
 */
function buildContextMessage(
  intent: Intent,
  clinics: ClinicResult[],
  hotels: HotelResult[],
  flights: FlightResult[]
): string {
  let context = `USER'S REQUEST:\n`
  context += `Looking for: ${intent.procedure || 'medical treatment'}\n`
  if (intent.city) context += `Location: ${intent.city}, ${intent.country || ''}\n`
  if (intent.budget) context += `Budget: Up to $${intent.budget}\n`
  if (intent.travelDate) context += `Preferred date: ${intent.travelDate}\n`
  if (intent.originCity) context += `Traveling from: ${intent.originCity}\n`

  context += `\n---\n\nSEARCH RESULTS:\n\n`

  // Clinics
  if (clinics.length > 0) {
    context += `CLINICS FOUND (${clinics.length}):\n\n`
    clinics.slice(0, 5).forEach((clinic, idx) => {
      context += `${idx + 1}. ${clinic.name} (${clinic.city}, ${clinic.country})\n`
      if (clinic.rating) context += `   ⭐ Rating: ${clinic.rating}/5.0 (${clinic.reviewCount || 0} reviews)\n`
      context += `   📋 Specialties: ${clinic.specialties.join(', ')}\n`
      if (clinic.packages && clinic.packages.length > 0) {
        const pkg = clinic.packages[0]
        context += `   💰 Package: ${pkg.name} - $${pkg.price} (${pkg.duration} days)\n`
      }
      context += `\n`
    })
  } else {
    context += `CLINICS: No clinics found matching the exact criteria.\n\n`
  }

  // Hotels
  if (hotels && hotels.length > 0) {
    context += `HOTELS AVAILABLE: ${hotels.length} options found\n`
    const cheapest = Math.min(...hotels.map(h => h.pricePerNight))
    context += `Starting from $${cheapest}/night\n\n`
  }

  // Flights
  if (flights && flights.length > 0) {
    context += `FLIGHTS AVAILABLE: ${flights.length} options found\n`
    const cheapest = Math.min(...flights.map(f => f.price))
    context += `Starting from $${cheapest}\n\n`
  }

  context += `---\n\nNow compose a response that:
1. Addresses what the user is really asking for
2. Presents the information in a way that matches their emotional state
3. Feels natural and human
4. Helps them take the next step

Think about what they need to hear, then respond naturally.`

  return context
}

/**
 * Adjusts temperature based on tone
 */
function getTemperatureForTone(tone: EmotionAnalysis['suggestedTone']): number {
  switch (tone) {
    case 'casual':
      return 0.8 // More creative and conversational
    case 'educational':
      return 0.6 // Balanced
    case 'reassuring':
      return 0.7 // Warm but controlled
    case 'direct':
      return 0.4 // More focused
    case 'professional':
      return 0.5 // Balanced and polished
    case 'consultative':
      return 0.6 // Thoughtful
    default:
      return 0.7
  }
}

/**
 * Adjusts max tokens based on query complexity
 */
function getMaxTokensForComplexity(complexity: EmotionAnalysis['queryComplexity']): number {
  switch (complexity) {
    case 'simple':
      return 300 // Shorter, focused response
    case 'moderate':
      return 500 // Standard length
    case 'complex':
      return 700 // More detailed
    default:
      return 500
  }
}

/**
 * Provides emotion-appropriate fallback response
 */
function getFallbackResponse(emotion: EmotionAnalysis): string {
  if (emotion.requiresEmpathy) {
    return "I understand this is important to you, and I want to help. I'm experiencing a temporary issue, but I'll be back shortly to assist you properly. Your concerns matter to me."
  }

  if (emotion.primaryEmotion === 'urgent') {
    return "I apologize for the delay. I'm working to get you the information you need as quickly as possible. Please bear with me for just a moment."
  }

  return "I'm here to help you find the right medical care. Could you please rephrase your question, and I'll do my best to assist you?"
}
