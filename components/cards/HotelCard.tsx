'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Wifi, Car } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { formatCurrency } from '@/lib/utils'

interface HotelCardProps {
  id: string
  name: string
  rating?: number
  reviewCount?: number
  pricePerNight: number
  currency: string
  imageUrl?: string
  bookingUrl: string
  distance?: string
  amenities?: string[]
}

export function HotelCard({
  id,
  name,
  rating,
  reviewCount,
  pricePerNight,
  currency,
  imageUrl,
  bookingUrl,
  distance,
  amenities = [],
}: HotelCardProps) {
  const { t } = useI18n()

  const handleBooking = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          {rating && (
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        {distance && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {distance}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              >
                {amenity === 'Free WiFi' && <Wifi className="h-3 w-3" />}
                {amenity === 'Free Parking' && <Car className="h-3 w-3" />}
                {amenity}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-1 pt-2 border-t">
          <span className="text-2xl font-bold">
            {formatCurrency(pricePerNight, currency)}
          </span>
          <span className="text-sm text-muted-foreground">
            {t.hotel.perNight}
          </span>
        </div>

        {reviewCount && reviewCount > 0 && (
          <p className="text-xs text-muted-foreground">
            {reviewCount} {t.clinic.reviews}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleBooking}
          className="w-full"
        >
          {t.hotel.viewOnBooking}
        </Button>
      </CardFooter>
    </Card>
  )
}
