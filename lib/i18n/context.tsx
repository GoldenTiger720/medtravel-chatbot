'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import enTranslations from '@/locales/en.json'
import uaeTranslations from '@/locales/uae.json'

type Locale = 'en' | 'uae'
type Translations = typeof enTranslations

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  uae: uaeTranslations,
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    // Load locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'uae')) {
      setLocaleState(savedLocale)
    }
  }, [])

  useEffect(() => {
    // Update HTML dir and lang attributes
    const dir = locale === 'uae' ? 'rtl' : 'ltr'
    const lang = locale === 'uae' ? 'ar' : 'en'

    document.documentElement.dir = dir
    document.documentElement.lang = lang
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const dir = locale === 'uae' ? 'rtl' : 'ltr'

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
        dir,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
