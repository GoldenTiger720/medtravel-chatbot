'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Award, DollarSign } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { formatCurrency } from '@/lib/utils'

interface Package {
  id: string
  name: string
  price: number
  currency: string
  duration: number
}

interface ClinicCardProps {
  id: string
  name: string
  description: string
  city: string
  country: string
  rating?: number | null
  reviewCount?: number | null
  specialties: string[]
  priceRange?: string | null
  imageUrl?: string | null
  packages?: Package[]
  onRequestCall?: (clinicId: string) => void
  onSave?: (clinicId: string) => void
}

export function ClinicCard({
  id,
  name,
  description,
  city,
  country,
  rating,
  reviewCount,
  specialties,
  priceRange,
  imageUrl,
  packages = [],
  onRequestCall,
  onSave,
}: ClinicCardProps) {
  const { t } = useI18n()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Award className="h-3 w-3" />
            {t.clinic.verified}
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{name}</CardTitle>
          {rating && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3" />
          {city}, {country}
          {reviewCount && reviewCount > 0 && (
            <span className="ml-2 text-muted-foreground">
              ({reviewCount} {t.clinic.reviews})
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}

        {packages.length > 0 && (
          <div className="space-y-2 border-t pt-3">
            <p className="text-sm font-medium">{t.clinic.packages}:</p>
            {packages.slice(0, 2).map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">{pkg.name}</span>
                <span className="font-medium">
                  {formatCurrency(pkg.price, pkg.currency)}
                </span>
              </div>
            ))}
          </div>
        )}

        {priceRange && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>{t.clinic.priceRange}: {priceRange}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          onClick={() => onSave?.(id)}
          variant="outline"
          className="flex-1"
        >
          {t.common.save}
        </Button>
        <Button
          onClick={() => onRequestCall?.(id)}
          className="flex-1"
        >
          {t.common.requestCall}
        </Button>
      </CardFooter>
    </Card>
  )
}
