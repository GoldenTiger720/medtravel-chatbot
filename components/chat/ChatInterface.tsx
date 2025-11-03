'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { ClinicCard } from '@/components/cards/ClinicCard'
import { HotelCard } from '@/components/cards/HotelCard'
import { FlightCard } from '@/components/cards/FlightCard'
import { LeadDialog } from '@/components/dialogs/LeadDialog'
import { generateSessionId } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  cards?: {
    clinics?: any[]
    hotels?: any[]
    flights?: any[]
  }
}

export function ChatInterface() {
  const { t, locale } = useI18n()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => generateSessionId())
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null)
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId,
          locale,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      const assistantMessage: Message = {
        id: `msg_${Date.now()}_assistant`,
        role: 'assistant',
        content: data.message,
        cards: data.cards,
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `msg_${Date.now()}_error`,
        role: 'assistant',
        content: t.chat.noResults,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestCall = (clinicId: string) => {
    setSelectedClinicId(clinicId)
    setIsLeadDialogOpen(true)
  }

  const handleSave = async (clinicId: string) => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          clinicId,
        }),
      })

      const data = await response.json()
      if (data.success) {
        alert(`${t.save.saved}\n${t.save.shareLink} ${data.shareUrl}`)
      }
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <h2 className="text-2xl font-bold">{t.chat.title}</h2>
            <p className="text-muted-foreground max-w-md">
              {t.chat.startConversation}
            </p>
            <div className="grid gap-2 mt-4">
              {t.chat.exampleQueries.map((query, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="text-sm"
                  onClick={() => setInput(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] space-y-4 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-2xl px-4 py-3'
                  : ''
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>

              {message.cards && (
                <div className="space-y-6 mt-4">
                  {/* Clinic Cards */}
                  {message.cards.clinics && message.cards.clinics.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {message.cards.clinics.map((clinic) => (
                        <ClinicCard
                          key={clinic.id}
                          {...clinic}
                          onRequestCall={handleRequestCall}
                          onSave={handleSave}
                        />
                      ))}
                    </div>
                  )}

                  {/* Hotel Cards */}
                  {message.cards.hotels && message.cards.hotels.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t.hotel.title}</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        {message.cards.hotels.map((hotel) => (
                          <HotelCard key={hotel.id} {...hotel} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flight Cards */}
                  {message.cards.flights && message.cards.flights.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t.flight.title}</h3>
                      <div className="grid gap-4">
                        {message.cards.flights.map((flight) => (
                          <FlightCard key={flight.id} {...flight} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{t.chat.thinking}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      {messages.length > 0 && (
        <div className="px-4 md:px-6 py-2 text-xs text-center text-muted-foreground border-t">
          {t.chat.disclaimer}
        </div>
      )}

      {/* Input Area */}
      <div className="border-t p-4 md:p-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>

      {/* Lead Dialog */}
      <LeadDialog
        open={isLeadDialogOpen}
        onOpenChange={setIsLeadDialogOpen}
        clinicId={selectedClinicId}
        sessionId={sessionId}
      />
    </div>
  )
}
