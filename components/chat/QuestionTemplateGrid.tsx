'use client'

import { useState } from 'react'
import { QUESTION_TEMPLATES, QuestionTemplate } from '@/lib/templates/question-templates'
import { QuestionTemplateCard } from './QuestionTemplateCard'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'

interface QuestionTemplateGridProps {
  onSelectQuestion: (question: string) => void
}

export function QuestionTemplateGrid({ onSelectQuestion }: QuestionTemplateGridProps) {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<QuestionTemplate['category'] | 'all'>(
    'all'
  )

  const categories: Array<QuestionTemplate['category'] | 'all'> = [
    'all',
    'dental',
    'cosmetic',
    'fertility',
    'orthopedic',
    'cardiac',
    'general',
  ]

  const categoryLabels = {
    all: t.all || 'All',
    dental: t.dental || 'Dental',
    cosmetic: t.cosmetic || 'Cosmetic',
    fertility: t.fertility || 'Fertility',
    orthopedic: t.orthopedic || 'Orthopedic',
    cardiac: t.cardiac || 'Cardiac',
    general: t.general || 'General',
  }

  const filteredTemplates =
    selectedCategory === 'all'
      ? QUESTION_TEMPLATES
      : QUESTION_TEMPLATES.filter(t => t.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {categoryLabels[category]}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTemplates.map(template => (
          <QuestionTemplateCard
            key={template.id}
            template={template}
            onSelect={onSelectQuestion}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t.noTemplatesFound || 'No question templates found'}
          </p>
        </div>
      )}
    </div>
  )
}
