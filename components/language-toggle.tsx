'use client'

import * as React from 'react'
import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n/context'

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLocale(locale === 'en' ? 'uae' : 'en')}
      aria-label={t.language.toggle}
    >
      <Languages className="h-5 w-5" />
      <span className="sr-only">{locale === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  )
}
