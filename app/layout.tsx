import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/lib/i18n/context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedTravel - Your Trusted Medical Tourism Partner',
  description: 'Find world-class medical care abroad with AI-powered assistance. Discover verified clinics for dental, cosmetic, and fertility treatments.',
  keywords: 'medical tourism, dental tourism, cosmetic surgery abroad, fertility treatment, medical travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
