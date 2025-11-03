import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { z } from 'zod'

const LeadSchema = z.object({
  sessionId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  countryCode: z.string().optional(),
  message: z.string().optional(),
  clinicId: z.string().optional(),
  packageId: z.string().optional(),
  hotelData: z.any().optional(),
  flightData: z.any().optional(),
  budget: z.number().optional(),
  travelDate: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = LeadSchema.parse(body)

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        sessionId: validated.sessionId,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        countryCode: validated.countryCode,
        message: validated.message,
        clinicId: validated.clinicId,
        packageId: validated.packageId,
        hotelData: validated.hotelData,
        flightData: validated.flightData,
        budget: validated.budget,
        travelDate: validated.travelDate ? new Date(validated.travelDate) : null,
        status: 'new',
        source: 'chat',
      },
    })

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user
    // TODO: Integrate with CRM (optional)

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Thank you! We\'ll contact you within 24 hours.',
    })
  } catch (error) {
    console.error('Lead creation error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve lead status (optional)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const leadId = searchParams.get('id')

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    return NextResponse.json(lead)
  } catch (error) {
    console.error('Lead retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve lead' },
      { status: 500 }
    )
  }
}
