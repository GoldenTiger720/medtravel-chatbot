'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { useI18n } from '@/lib/i18n/context'
import { MessageSquare, Shield, Globe, HeadphonesIcon, Sparkles, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { t } = useI18n()

  const features = [
    {
      icon: Sparkles,
      title: t.features.aiPowered.title,
      description: t.features.aiPowered.description,
    },
    {
      icon: Shield,
      title: t.features.verifiedClinics.title,
      description: t.features.verifiedClinics.description,
    },
    {
      icon: Globe,
      title: t.features.allInOne.title,
      description: t.features.allInOne.description,
    },
    {
      icon: HeadphonesIcon,
      title: t.features.support.title,
      description: t.features.support.description,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{t.common.appName}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {t.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button size="lg" className="text-lg px-8 py-6">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t.hero.cta}
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  {t.common.learnMore}
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{t.hero.trustBadge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose {t.common.appName}?
              </h2>
              <p className="text-lg text-muted-foreground">
                Your journey to world-class medical care starts here
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <Card key={idx} className="border-2 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-muted/20 border-t">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Popular Treatment Categories
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{t.specialties.dental}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Implants, Veneers, Orthodontics
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{t.specialties.cosmetic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Rhinoplasty, Liposuction, Breast Surgery
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{t.specialties.fertility}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    IVF, IUI, Egg Freezing
                  </p>
                </CardContent>
              </Card>
            </div>

            <Link href="/chat">
              <Button size="lg" variant="outline">
                Explore All Treatments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="hover:text-primary transition-colors">
                {t.footer.about}
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                {t.footer.terms}
              </Link>
              <Link href="/contact" className="hover:text-primary transition-colors">
                {t.footer.contact}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
