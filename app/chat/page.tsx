'use client'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { useI18n } from '@/lib/i18n/context'
import { MessageSquare, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ChatPage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">{t.common.appName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto">
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}
