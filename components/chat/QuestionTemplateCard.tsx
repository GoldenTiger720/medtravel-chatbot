'use client'

import { QuestionTemplate } from '@/lib/templates/question-templates'
import { Card } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n/context'
import Image from 'next/image'

interface QuestionTemplateCardProps {
  template: QuestionTemplate
  onSelect: (question: string) => void
}

export function QuestionTemplateCard({ template, onSelect }: QuestionTemplateCardProps) {
  const { locale, t } = useI18n()

  const question = locale === 'uae' ? template.questionAr : template.question
  const description = locale === 'uae' ? template.descriptionAr : template.description

  const categoryColors = {
    dental: 'bg-blue-500/10 text-blue-600 border-blue-200',
    cosmetic: 'bg-purple-500/10 text-purple-600 border-purple-200',
    fertility: 'bg-pink-500/10 text-pink-600 border-pink-200',
    orthopedic: 'bg-green-500/10 text-green-600 border-green-200',
    cardiac: 'bg-red-500/10 text-red-600 border-red-200',
    general: 'bg-gray-500/10 text-gray-600 border-gray-200',
  }

  const categoryLabels = {
    dental: t.dental || 'Dental',
    cosmetic: t.cosmetic || 'Cosmetic',
    fertility: t.fertility || 'Fertility',
    orthopedic: t.orthopedic || 'Orthopedic',
    cardiac: t.cardiac || 'Cardiac',
    general: t.general || 'General',
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
      onClick={() => onSelect(question)}
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={template.imageUrl}
          alt={question}
          fill
          className="object-cover transition-transform group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${
              categoryColors[template.category]
            } backdrop-blur-sm bg-white/80 dark:bg-gray-900/80`}
          >
            {categoryLabels[template.category]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {question}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>

        {/* Keywords */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {template.keywords.slice(0, 3).map(keyword => (
            <span
              key={keyword}
              className="px-2 py-0.5 text-[10px] rounded-md bg-secondary text-secondary-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
