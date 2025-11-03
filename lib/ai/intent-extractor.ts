import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const IntentSchema = z.object({
  procedure: z.string().optional().describe('Type of medical procedure'),
  category: z.enum(['dental', 'cosmetic', 'fertility', 'other']).optional(),
  city: z.string().optional().describe('Destination city'),
  country: z.string().optional().describe('Destination country'),
  budget: z.number().optional().describe('Budget in USD'),
  budgetMax: z.number().optional().describe('Maximum budget in USD'),
  travelDate: z.string().optional().describe('Preferred travel date'),
  originCity: z.string().optional().describe('User\'s origin city'),
  needsHotel: z.boolean().default(false).describe('User needs hotel accommodation'),
  needsFlight: z.boolean().default(false).describe('User needs flight booking'),
  numberOfPeople: z.number().default(1).describe('Number of people traveling'),
  duration: z.number().optional().describe('Duration of stay in days'),
})

export type Intent = z.infer<typeof IntentSchema>

const INTENT_EXTRACTION_PROMPT = `You are an AI assistant for a medical tourism platform. Your job is to extract structured intent from user queries.

Extract the following information from the user's message:
- procedure: specific medical procedure (e.g., "IVF", "dental implants", "rhinoplasty")
- category: one of "dental", "cosmetic", "fertility", or "other"
- city: destination city if mentioned
- country: destination country if mentioned
- budget: budget amount in USD if mentioned
- budgetMax: maximum budget if a range is given
- travelDate: preferred travel date if mentioned
- originCity: where the user is traveling from
- needsHotel: true if user mentions hotel, accommodation, or lodging
- needsFlight: true if user mentions flights or airfare
- numberOfPeople: number of people (default 1)
- duration: length of stay in days if mentioned

Return ONLY a JSON object with these fields. Use null for missing information.

Examples:
User: "I need IVF treatment in Turkey under $5000"
Response: {"procedure": "IVF", "category": "fertility", "country": "Turkey", "budget": 5000, "needsHotel": false, "needsFlight": false}

User: "Show me dental implants in Mexico with hotel and flights from New York"
Response: {"procedure": "dental implants", "category": "dental", "country": "Mexico", "originCity": "New York", "needsHotel": true, "needsFlight": true}

User: "Rhinoplasty in Dubai for 2 people, budget 10k-15k"
Response: {"procedure": "rhinoplasty", "category": "cosmetic", "city": "Dubai", "budget": 10000, "budgetMax": 15000, "numberOfPeople": 2, "needsHotel": false, "needsFlight": false}
`

export async function extractIntent(userMessage: string): Promise<Intent> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: INTENT_EXTRACTION_PROMPT },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const parsed = JSON.parse(content)
    const validated = IntentSchema.parse(parsed)

    return validated
  } catch (error) {
    console.error('Intent extraction error:', error)
    // Return minimal intent on error
    return {
      needsHotel: false,
      needsFlight: false,
      numberOfPeople: 1,
    }
  }
}
