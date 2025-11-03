import { prisma } from './prisma'
import { Intent } from '../ai/intent-extractor'
import { Prisma } from '@prisma/client'

export interface ClinicSearchResult {
  id: string
  name: string
  nameAr?: string | null
  description: string
  city: string
  country: string
  rating: number | null
  reviewCount: number | null
  specialties: string[]
  priceRange: string | null
  imageUrl: string | null
  packages: Array<{
    id: string
    name: string
    nameAr?: string | null
    price: any
    currency: string
    duration: number
  }>
}

export async function searchClinics(intent: Intent, limit: number = 10): Promise<ClinicSearchResult[]> {
  try {
    const where: Prisma.ClinicWhereInput = {
      isActive: true,
      isVerified: true,
    }

    // Filter by category/specialty
    if (intent.category) {
      where.specialties = {
        has: intent.category,
      }
    }

    // Filter by city
    if (intent.city) {
      where.city = {
        contains: intent.city,
        mode: 'insensitive',
      }
    }

    // Filter by country
    if (intent.country) {
      where.country = {
        contains: intent.country,
        mode: 'insensitive',
      }
    }

    const clinics = await prisma.clinic.findMany({
      where,
      include: {
        packages: {
          where: {
            isActive: true,
            ...(intent.budget && {
              price: {
                lte: intent.budget,
              },
            }),
            ...(intent.budgetMax && {
              price: {
                gte: intent.budget || 0,
                lte: intent.budgetMax,
              },
            }),
          },
          orderBy: {
            price: 'asc',
          },
          take: 3,
        },
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' },
      ],
      take: limit,
    })

    return clinics.map(clinic => ({
      id: clinic.id,
      name: clinic.name,
      nameAr: clinic.nameAr,
      description: clinic.description,
      city: clinic.city,
      country: clinic.country,
      rating: clinic.rating,
      reviewCount: clinic.reviewCount,
      specialties: clinic.specialties,
      priceRange: clinic.priceRange,
      imageUrl: clinic.imageUrl,
      packages: clinic.packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        nameAr: pkg.nameAr,
        price: pkg.price,
        currency: pkg.currency,
        duration: pkg.duration,
      })),
    }))
  } catch (error) {
    console.error('Clinic search error:', error)
    return []
  }
}

// Vector search function (requires pgvector and embeddings)
export async function semanticClinicSearch(query: string, limit: number = 10): Promise<ClinicSearchResult[]> {
  try {
    // TODO: Implement vector search with OpenAI embeddings
    // const embedding = await generateEmbedding(query)

    // const results = await prisma.$queryRaw`
    //   SELECT
    //     id, name, city, country, rating, specialties,
    //     1 - (embedding <=> ${embedding}::vector) as similarity
    //   FROM clinics
    //   WHERE is_active = true AND is_verified = true
    //     AND 1 - (embedding <=> ${embedding}::vector) > 0.7
    //   ORDER BY similarity DESC
    //   LIMIT ${limit}
    // `

    // For now, fall back to text search
    const clinics = await prisma.clinic.findMany({
      where: {
        isActive: true,
        isVerified: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        packages: {
          where: { isActive: true },
          orderBy: { price: 'asc' },
          take: 3,
        },
      },
      take: limit,
    })

    return clinics.map(clinic => ({
      id: clinic.id,
      name: clinic.name,
      nameAr: clinic.nameAr,
      description: clinic.description,
      city: clinic.city,
      country: clinic.country,
      rating: clinic.rating,
      reviewCount: clinic.reviewCount,
      specialties: clinic.specialties,
      priceRange: clinic.priceRange,
      imageUrl: clinic.imageUrl,
      packages: clinic.packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        nameAr: pkg.nameAr,
        price: pkg.price,
        currency: pkg.currency,
        duration: pkg.duration,
      })),
    }))
  } catch (error) {
    console.error('Semantic clinic search error:', error)
    return []
  }
}
