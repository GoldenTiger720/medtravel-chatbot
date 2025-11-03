# Question Templates System

## Overview

The Question Templates system provides users with 20 pre-configured medical tourism questions organized by category. When users select a template, it auto-populates the chat input and displays results in beautiful card format with relevant images.

## Features

### 20 Medical Tourism Questions

The system includes questions across 6 categories:

1. **Dental (3 questions)**
   - Dental implants in Turkey
   - Teeth whitening in Dubai
   - Porcelain veneers in Thailand

2. **Cosmetic Surgery (4 questions)**
   - Rhinoplasty in South Korea
   - Breast augmentation in Mexico
   - Liposuction in Istanbul
   - Facelift surgery in Dubai

3. **Fertility & IVF (3 questions)**
   - IVF treatment in Czech Republic
   - Egg freezing in Spain
   - Surrogacy programs in Georgia

4. **Orthopedic (3 questions)**
   - Knee replacement in India
   - Hip replacement in Thailand
   - Spine surgery in Germany

5. **Cardiac (3 questions)**
   - Heart bypass surgery in Singapore
   - Angioplasty in India
   - Heart valve replacement in UAE

6. **General Medical (4 questions)**
   - Bariatric surgery in Turkey
   - LASIK eye surgery in South Korea
   - Cancer treatment in Germany
   - Complete health checkup in Thailand

## User Interface

### Template Display

**Location:** Chat page when no messages exist

**Components:**
- **Header with icon** - Sparkles icon with greeting
- **Toggle button** - Switch between templates and quick queries
- **Category filters** - Filter templates by medical specialty
- **Template cards** - Visual cards with images, descriptions, and keywords
- **Auto-submission** - Clicking a template automatically submits the question

### Template Cards

Each card displays:
- **Hero image** - Relevant medical/destination image from Unsplash
- **Category badge** - Color-coded category indicator
- **Question text** - Full question in current language (English/Arabic)
- **Description** - Brief description of what to expect
- **Keywords** - Relevant search terms (max 3 displayed)

### Responsive Design

- **Desktop:** 4 columns grid
- **Tablet:** 2-3 columns grid
- **Mobile:** 1 column stack

## File Structure

```
lib/templates/
  └── question-templates.ts          # Template data and types

components/chat/
  ├── QuestionTemplateCard.tsx       # Individual template card
  ├── QuestionTemplateGrid.tsx       # Grid layout with filtering
  └── ChatInterface.tsx              # Main chat (updated)

locales/
  ├── en.json                        # English translations (updated)
  └── uae.json                       # Arabic translations (updated)
```

## Implementation Details

### Template Data Structure

```typescript
interface QuestionTemplate {
  id: string                          // Unique identifier
  category: 'dental' | 'cosmetic' | 'fertility' | 'orthopedic' | 'cardiac' | 'general'
  question: string                    // English question
  questionAr: string                  // Arabic question
  imageUrl: string                    // Unsplash image URL
  keywords: string[]                  // Search keywords
  description: string                 // English description
  descriptionAr: string              // Arabic description
}
```

### Category Colors

Each category has a unique color scheme:

- **Dental:** Blue (`bg-blue-500/10 text-blue-600`)
- **Cosmetic:** Purple (`bg-purple-500/10 text-purple-600`)
- **Fertility:** Pink (`bg-pink-500/10 text-pink-600`)
- **Orthopedic:** Green (`bg-green-500/10 text-green-600`)
- **Cardiac:** Red (`bg-red-500/10 text-red-600`)
- **General:** Gray (`bg-gray-500/10 text-gray-600`)

### Auto-Submission Flow

When a user clicks a template card:

1. `handleSelectTemplate(question)` is called
2. Question text is set to input field
3. Templates are hidden (`setShowTemplates(false)`)
4. After 100ms, form is auto-submitted via `form.requestSubmit()`
5. Chat API processes the question with full AI pipeline

### AI Processing

Selected template questions go through the complete AI pipeline:

1. **Emotion Detection** - Analyzes user intent and emotion
2. **Intent Extraction** - Extracts procedure, location, budget, etc.
3. **Clinic Search** - Finds matching clinics from database
4. **OTA Integration** - Fetches real-time hotels/flights via Amadeus API
5. **Adaptive Response** - Composes contextual response based on emotion
6. **Policy Filter** - Ensures compliance with medical guidelines
7. **Card Display** - Shows clinic, hotel, and flight cards

## Bilingual Support

All templates include both English and Arabic versions:

- Questions (`question` / `questionAr`)
- Descriptions (`description` / `descriptionAr`)
- Category labels (translated in locale files)
- UI elements (toggle buttons, filters, etc.)

### RTL Support

When Arabic is selected:
- Text direction changes to RTL
- Layout adjusts automatically
- Images remain in standard position
- Category badges adapt to RTL layout

## Images

All template images are sourced from Unsplash:

- **Format:** JPEG/WebP
- **Size:** Optimized via Next.js Image component
- **Resolution:** 800px width for optimal quality
- **Lazy Loading:** Automatic via Next.js
- **Hover Effect:** Scale transition on hover

### Image Configuration

Already configured in `next.config.mjs`:

```javascript
images: {
  domains: ['images.unsplash.com', 'unsplash.com'],
}
```

## Search & Filter

### Category Filter

Users can filter templates by category:

```typescript
const filteredTemplates = selectedCategory === 'all'
  ? QUESTION_TEMPLATES
  : QUESTION_TEMPLATES.filter(t => t.category === selectedCategory)
```

### Search Function (Available for Future Use)

```typescript
function searchTemplates(query: string): QuestionTemplate[] {
  const lowerQuery = query.toLowerCase()
  return QUESTION_TEMPLATES.filter(t =>
    t.question.toLowerCase().includes(lowerQuery) ||
    t.keywords.some(k => k.includes(lowerQuery)) ||
    t.description.toLowerCase().includes(lowerQuery)
  )
}
```

## Customization

### Adding New Templates

1. Open `lib/templates/question-templates.ts`
2. Add new template object to `QUESTION_TEMPLATES` array:

```typescript
{
  id: 'unique_id',
  category: 'dental', // Choose appropriate category
  question: 'Your question in English',
  questionAr: 'سؤالك بالعربية',
  imageUrl: 'https://images.unsplash.com/photo-xxx?w=800',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  description: 'Brief description',
  descriptionAr: 'وصف مختصر',
}
```

### Adding New Categories

1. Update the category type in `question-templates.ts`
2. Add translations in `locales/en.json` and `locales/uae.json`
3. Add color scheme in `QuestionTemplateCard.tsx`

### Changing Images

Replace `imageUrl` with any Unsplash image URL:

```
https://images.unsplash.com/photo-[PHOTO_ID]?w=800
```

## User Experience Flow

### First Visit

1. User lands on chat page
2. Sees greeting with Sparkles icon
3. Question templates displayed by default
4. Can browse by category or view all 20 questions

### Template Selection

1. User clicks a template card
2. Question appears in input field
3. Templates hide automatically
4. Question submits to AI
5. Loading indicator shows
6. Results display with clinic/hotel/flight cards

### Toggle Behavior

Users can toggle between:
- **Templates view** - Full grid of 20 questions with images
- **Quick queries** - 3 simple example buttons

## Performance Optimizations

- **Image Optimization:** Next.js automatic image optimization
- **Lazy Loading:** Images load as user scrolls
- **Code Splitting:** Template components load on demand
- **Memoization:** Category filters use useMemo (if needed)
- **Responsive Images:** Different sizes for different viewports

## Analytics Opportunities

Track user engagement:

```typescript
// Add to handleSelectTemplate function
console.log('Template selected:', {
  templateId: template.id,
  category: template.category,
  question: question,
  timestamp: Date.now(),
})

// Send to analytics service
analytics.track('template_selected', {
  template_id: template.id,
  category: template.category,
})
```

## Accessibility

- **Keyboard Navigation:** All cards are keyboard accessible
- **Screen Readers:** Proper ARIA labels on cards
- **Focus Indicators:** Visible focus states on interactive elements
- **Image Alt Text:** Descriptive alt text for all images
- **Color Contrast:** WCAG AA compliant color schemes

## Mobile Optimization

- **Touch Targets:** Cards are large enough (min 44x44px)
- **Hover Effects:** Work on touch devices
- **Scroll Performance:** Smooth scrolling on mobile
- **Image Loading:** Optimized for mobile networks

## Testing Recommendations

1. **Visual Testing**
   - Check all 20 template cards display correctly
   - Verify images load properly
   - Test category filtering

2. **Functional Testing**
   - Click each template and verify auto-submission
   - Test toggle between templates and quick queries
   - Verify bilingual switching

3. **Responsive Testing**
   - Test on desktop (1920px, 1366px)
   - Test on tablet (768px, 1024px)
   - Test on mobile (375px, 414px)

4. **Performance Testing**
   - Check image loading speed
   - Verify smooth scrolling
   - Test with slow network

## Future Enhancements

1. **Search Bar** - Let users search within templates
2. **Favorites** - Allow users to save favorite templates
3. **Recently Used** - Show recently selected templates
4. **Personalization** - Suggest templates based on user behavior
5. **More Categories** - Add wellness, dental cosmetic, etc.
6. **User Templates** - Allow users to create custom templates
7. **Share Templates** - Share specific questions via URL

## Related Documentation

- [Intelligent Response System](./INTELLIGENT_RESPONSE_SYSTEM.md)
- [OTA API Setup](./OTA_API_SETUP.md)
- [README](../README.md)
- [Deployment Guide](../DEPLOYMENT.md)
