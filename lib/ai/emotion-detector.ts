import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const EmotionAnalysisSchema = z.object({
  primaryEmotion: z.enum([
    'anxious',
    'confused',
    'curious',
    'desperate',
    'excited',
    'frustrated',
    'hopeful',
    'neutral',
    'overwhelmed',
    'scared',
    'skeptical',
    'urgent',
  ]).describe('The primary emotion detected in the user\'s message'),

  emotionIntensity: z.number().min(0).max(10).describe('Intensity of the emotion from 0-10'),

  queryComplexity: z.enum([
    'simple',      // "Show me clinics"
    'moderate',    // "I need IVF in Dubai under $5000"
    'complex',     // Multiple requirements, comparisons
  ]).describe('Complexity of the user\'s query'),

  userIntent: z.enum([
    'browsing',           // Just looking around
    'comparing',          // Comparing options
    'deciding',           // Ready to make a decision
    'information_seeking',// Wants to learn more
    'urgent_need',        // Needs help quickly
  ]).describe('User\'s overall intent'),

  sensitivityLevel: z.enum([
    'low',      // General inquiry
    'medium',   // Personal but not sensitive
    'high',     // Very personal/sensitive topic
  ]).describe('How sensitive the topic is'),

  requiresEmpathy: z.boolean().describe('Whether response should be empathetic'),

  suggestedTone: z.enum([
    'casual',
    'professional',
    'reassuring',
    'educational',
    'direct',
    'consultative',
  ]).describe('Recommended tone for the response'),
})

export type EmotionAnalysis = z.infer<typeof EmotionAnalysisSchema>

const EMOTION_DETECTION_PROMPT = `You are an expert in emotional intelligence and user psychology. Analyze the user's message to understand their emotional state and needs.

Your analysis will help provide the most helpful and appropriate response. Consider:
- Emotional tone and intensity
- Level of urgency or anxiety
- How sensitive the topic might be
- What communication style would be most helpful

Be nuanced and perceptive. Detect subtle cues like:
- "I'm worried..." (anxious, needs reassurance)
- "Just looking..." (browsing, casual)
- "I need this ASAP..." (urgent, direct)
- "Can you explain..." (curious, educational)
- "I've been trying..." (frustrated, needs empathy)

Return ONLY a JSON object with your analysis.`

export async function detectEmotion(userMessage: string): Promise<EmotionAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: EMOTION_DETECTION_PROMPT },
        {
          role: 'user',
          content: `Analyze this message:\n\n"${userMessage}"`
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      return getDefaultEmotionAnalysis()
    }

    const parsed = JSON.parse(content)
    const validated = EmotionAnalysisSchema.parse(parsed)

    return validated
  } catch (error) {
    console.error('Emotion detection error:', error)
    return getDefaultEmotionAnalysis()
  }
}

function getDefaultEmotionAnalysis(): EmotionAnalysis {
  return {
    primaryEmotion: 'neutral',
    emotionIntensity: 5,
    queryComplexity: 'moderate',
    userIntent: 'information_seeking',
    sensitivityLevel: 'medium',
    requiresEmpathy: false,
    suggestedTone: 'professional',
  }
}

// Quick emotion keywords for fast detection (fallback)
export function quickEmotionCheck(message: string): Partial<EmotionAnalysis> {
  const lowerMessage = message.toLowerCase()

  // Anxiety indicators
  if (/(worried|anxious|nervous|scared|afraid|concern)/i.test(lowerMessage)) {
    return {
      primaryEmotion: 'anxious',
      requiresEmpathy: true,
      suggestedTone: 'reassuring',
      sensitivityLevel: 'high',
    }
  }

  // Urgency indicators
  if (/(urgent|asap|quickly|soon|emergency|need help)/i.test(lowerMessage)) {
    return {
      primaryEmotion: 'urgent',
      userIntent: 'urgent_need',
      suggestedTone: 'direct',
    }
  }

  // Confusion indicators
  if (/(confused|don't understand|explain|what does|how does)/i.test(lowerMessage)) {
    return {
      primaryEmotion: 'confused',
      suggestedTone: 'educational',
      userIntent: 'information_seeking',
    }
  }

  // Excitement indicators
  if (/(excited|can't wait|amazing|perfect|great)/i.test(lowerMessage)) {
    return {
      primaryEmotion: 'excited',
      suggestedTone: 'casual',
      requiresEmpathy: false,
    }
  }

  // Browsing indicators
  if (/(just looking|browsing|exploring|checking out|show me)/i.test(lowerMessage)) {
    return {
      userIntent: 'browsing',
      suggestedTone: 'casual',
      queryComplexity: 'simple',
    }
  }

  return {}
}
