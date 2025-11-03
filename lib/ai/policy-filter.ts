import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const POLICY_FILTER_PROMPT = `You are a compliance checker for a medical tourism platform. Review the assistant's response and ensure it follows these rules:

STRICT RULES:
1. NO medical advice - only factual information about clinics
2. NO unverified claims about treatment outcomes
3. NO personal health assessments or diagnoses
4. NO guarantees about medical results
5. NO recommendations that favor specific clinics without data justification
6. NO disclosure of personal user data
7. NO content that violates medical advertising regulations
8. Must be respectful of all cultures and religions
9. Must comply with medical ethics

If the response violates any rule:
- Return a cleaned version that removes or rephrases the violation
- Keep the helpful intent but make it compliant

If the response is compliant:
- Return it unchanged

Return ONLY the cleaned response text, no explanations or meta-commentary.
`

export async function filterResponse(response: string): Promise<string> {
  try {
    const result = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: POLICY_FILTER_PROMPT },
        {
          role: 'user',
          content: `Review this response for compliance:\n\n${response}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 600,
    })

    return result.choices[0]?.message?.content || response
  } catch (error) {
    console.error('Policy filter error:', error)
    // Return original if filter fails (safer than blocking)
    return response
  }
}

// Lightweight local filter for common violations
export function quickPolicyCheck(response: string): { isValid: boolean; reason?: string } {
  const violations = [
    {
      pattern: /you should|you must|i recommend you|you need to (see a doctor|get treatment|take medication)/i,
      reason: 'Contains medical advice',
    },
    {
      pattern: /guaranteed|100% success|cure|definitely work/i,
      reason: 'Contains outcome guarantees',
    },
    {
      pattern: /your (condition|disease|symptoms|diagnosis)/i,
      reason: 'Contains personal health assessment',
    },
  ]

  for (const violation of violations) {
    if (violation.pattern.test(response)) {
      return { isValid: false, reason: violation.reason }
    }
  }

  return { isValid: true }
}
