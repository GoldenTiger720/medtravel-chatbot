import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const SaveSchema = z.object({
  sessionId: z.string(),
  clinicId: z.string().optional(),
  packageId: z.string().optional(),
  hotelData: z.any().optional(),
  flightData: z.any().optional(),
})

// In-memory storage for MVP (use Redis or DB in production)
const savedOffers = new Map<string, any>()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = SaveSchema.parse(body)

    // Generate unique save ID
    const saveId = `save_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store the offer data
    savedOffers.set(saveId, {
      ...validated,
      createdAt: new Date().toISOString(),
    })

    // Generate shareable link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const shareUrl = `${baseUrl}/saved/${saveId}`

    return NextResponse.json({
      success: true,
      saveId,
      shareUrl,
      message: 'Offer saved successfully!',
    })
  } catch (error) {
    console.error('Save offer error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to save offer' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve saved offer
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const saveId = searchParams.get('id')

    if (!saveId) {
      return NextResponse.json({ error: 'Save ID required' }, { status: 400 })
    }

    const offer = savedOffers.get(saveId)

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Retrieve offer error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve offer' },
      { status: 500 }
    )
  }
}
