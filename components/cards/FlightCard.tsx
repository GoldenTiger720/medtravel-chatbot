'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plane, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { formatCurrency } from '@/lib/utils'

interface FlightCardProps {
  id: string
  airline: string
  flightNumber: string
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

export function FlightCard({
  id,
  airline,
  flightNumber,
  departure,
  arrival,
  price,
  currency,
  duration,
  stops,
  bookingUrl,
}: FlightCardProps) {
  const { t } = useI18n()

  const handleBooking = () => {
    window.open(bookingUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold">{airline}</p>
              <p className="text-xs text-muted-foreground">{flightNumber}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(price, currency)}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold">{departure.time}</p>
            <p className="text-sm text-muted-foreground">{departure.airport}</p>
            <p className="text-xs text-muted-foreground">{departure.date}</p>
          </div>

          <div className="flex flex-col items-center px-4 flex-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {duration}
            </div>
            <div className="w-full h-px bg-border my-1 relative">
              <Plane className="h-3 w-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">
              {stops === 0 ? t.flight.direct : `${stops} ${t.flight.stops}`}
            </p>
          </div>

          <div className="text-center flex-1">
            <p className="text-2xl font-bold">{arrival.time}</p>
            <p className="text-sm text-muted-foreground">{arrival.airport}</p>
            <p className="text-xs text-muted-foreground">{arrival.date}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleBooking}
          className="w-full"
        >
          {t.flight.bookFlight}
        </Button>
      </CardFooter>
    </Card>
  )
}
