export interface QuestionTemplate {
  id: string
  category: 'dental' | 'cosmetic' | 'fertility' | 'orthopedic' | 'cardiac' | 'general'
  question: string
  questionAr: string
  imageUrl: string
  keywords: string[]
  description: string
  descriptionAr: string
}

export const QUESTION_TEMPLATES: QuestionTemplate[] = [
  // Dental Tourism
  {
    id: 'dental_implants',
    category: 'dental',
    question: 'I need dental implants in Turkey. What are my options?',
    questionAr: 'أحتاج إلى زراعة أسنان في تركيا. ما هي خياراتي؟',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
    keywords: ['dental', 'implants', 'turkey', 'teeth'],
    description: 'Find top-rated dental clinics in Turkey offering implant procedures',
    descriptionAr: 'ابحث عن أفضل عيادات الأسنان في تركيا التي تقدم إجراءات الزرع',
  },
  {
    id: 'teeth_whitening',
    category: 'dental',
    question: 'Show me affordable teeth whitening clinics in Dubai',
    questionAr: 'أرني عيادات تبييض الأسنان بأسعار معقولة في دبي',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800',
    keywords: ['dental', 'whitening', 'dubai', 'cosmetic'],
    description: 'Affordable teeth whitening options in Dubai',
    descriptionAr: 'خيارات تبييض الأسنان بأسعار معقولة في دبي',
  },
  {
    id: 'veneers',
    category: 'dental',
    question: 'I want porcelain veneers in Thailand under $3000',
    questionAr: 'أريد قشور البورسلين في تايلاند بأقل من 3000 دولار',
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800',
    keywords: ['dental', 'veneers', 'thailand', 'cosmetic'],
    description: 'Quality porcelain veneers at competitive prices in Thailand',
    descriptionAr: 'قشور بورسلين عالية الجودة بأسعار تنافسية في تايلاند',
  },

  // Cosmetic Surgery
  {
    id: 'rhinoplasty',
    category: 'cosmetic',
    question: 'Looking for rhinoplasty surgeons in South Korea',
    questionAr: 'أبحث عن جراحي تجميل الأنف في كوريا الجنوبية',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    keywords: ['cosmetic', 'rhinoplasty', 'nose', 'korea'],
    description: 'World-class rhinoplasty procedures in South Korea',
    descriptionAr: 'إجراءات تجميل الأنف عالمية المستوى في كوريا الجنوبية',
  },
  {
    id: 'breast_augmentation',
    category: 'cosmetic',
    question: 'Breast augmentation in Mexico with flights from USA',
    questionAr: 'تكبير الثدي في المكسيك مع رحلات من الولايات المتحدة',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
    keywords: ['cosmetic', 'breast', 'augmentation', 'mexico'],
    description: 'Safe and affordable breast augmentation in Mexico',
    descriptionAr: 'تكبير الثدي الآمن والميسور في المكسيك',
  },
  {
    id: 'liposuction',
    category: 'cosmetic',
    question: 'I need liposuction in Istanbul, including hotel stay',
    questionAr: 'أحتاج إلى شفط الدهون في اسطنبول، بما في ذلك الإقامة في الفندق',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800',
    keywords: ['cosmetic', 'liposuction', 'istanbul', 'turkey'],
    description: 'Comprehensive liposuction packages in Istanbul with accommodation',
    descriptionAr: 'باقات شفط الدهون الشاملة في اسطنبول مع الإقامة',
  },
  {
    id: 'facelift',
    category: 'cosmetic',
    question: 'Facelift surgery in Dubai with luxury recovery stay',
    questionAr: 'جراحة شد الوجه في دبي مع إقامة تعافي فاخرة',
    imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800',
    keywords: ['cosmetic', 'facelift', 'dubai', 'luxury'],
    description: 'Premium facelift procedures with luxury recovery in Dubai',
    descriptionAr: 'إجراءات شد الوجه المميزة مع تعافي فاخر في دبي',
  },

  // Fertility & IVF
  {
    id: 'ivf_treatment',
    category: 'fertility',
    question: 'IVF treatment in Czech Republic under $5000',
    questionAr: 'علاج التلقيح الصناعي في جمهورية التشيك بأقل من 5000 دولار',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5714fd502?w=800',
    keywords: ['ivf', 'fertility', 'czech', 'treatment'],
    description: 'Affordable IVF treatment with high success rates',
    descriptionAr: 'علاج التلقيح الصناعي بأسعار معقولة مع معدلات نجاح عالية',
  },
  {
    id: 'egg_freezing',
    category: 'fertility',
    question: 'Egg freezing clinics in Spain with English support',
    questionAr: 'عيادات تجميد البويضات في إسبانيا مع دعم اللغة الإنجليزية',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800',
    keywords: ['fertility', 'egg', 'freezing', 'spain'],
    description: 'Professional egg freezing services in Spain',
    descriptionAr: 'خدمات تجميد البويضات المهنية في إسبانيا',
  },
  {
    id: 'surrogacy',
    category: 'fertility',
    question: 'Surrogacy programs in Georgia with legal support',
    questionAr: 'برامج الحمل البديل في جورجيا مع دعم قانوني',
    imageUrl: 'https://images.unsplash.com/photo-1607970791666-6d690c6e0e75?w=800',
    keywords: ['fertility', 'surrogacy', 'georgia', 'legal'],
    description: 'Comprehensive surrogacy programs with legal assistance',
    descriptionAr: 'برامج الحمل البديل الشاملة مع المساعدة القانونية',
  },

  // Orthopedic
  {
    id: 'knee_replacement',
    category: 'orthopedic',
    question: 'Knee replacement surgery in India with rehabilitation',
    questionAr: 'جراحة استبدال الركبة في الهند مع إعادة التأهيل',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800',
    keywords: ['orthopedic', 'knee', 'replacement', 'india'],
    description: 'Quality knee replacement with post-op rehabilitation in India',
    descriptionAr: 'استبدال الركبة الجيد مع إعادة التأهيل بعد العملية في الهند',
  },
  {
    id: 'hip_replacement',
    category: 'orthopedic',
    question: 'Hip replacement in Thailand, need travel assistance',
    questionAr: 'استبدال الورك في تايلاند، أحتاج مساعدة السفر',
    imageUrl: 'https://images.unsplash.com/photo-1551601651-bc60f254d532?w=800',
    keywords: ['orthopedic', 'hip', 'replacement', 'thailand'],
    description: 'Complete hip replacement packages with travel coordination',
    descriptionAr: 'باقات استبدال الورك الكاملة مع تنسيق السفر',
  },
  {
    id: 'spine_surgery',
    category: 'orthopedic',
    question: 'Spine surgery specialists in Germany',
    questionAr: 'متخصصو جراحة العمود الفقري في ألمانيا',
    imageUrl: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=800',
    keywords: ['orthopedic', 'spine', 'surgery', 'germany'],
    description: 'Expert spine surgery with advanced medical technology',
    descriptionAr: 'جراحة العمود الفقري الخبيرة مع التكنولوجيا الطبية المتقدمة',
  },

  // Cardiac
  {
    id: 'heart_bypass',
    category: 'cardiac',
    question: 'Heart bypass surgery in Singapore, urgent need',
    questionAr: 'جراحة تحويل مجرى الشريان التاجي في سنغافورة، حاجة عاجلة',
    imageUrl: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800',
    keywords: ['cardiac', 'heart', 'bypass', 'singapore'],
    description: 'World-class cardiac surgery with immediate availability',
    descriptionAr: 'جراحة القلب عالمية المستوى مع التوافر الفوري',
  },
  {
    id: 'angioplasty',
    category: 'cardiac',
    question: 'Angioplasty procedure in India at best hospitals',
    questionAr: 'إجراء رأب الأوعية في الهند في أفضل المستشفيات',
    imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800',
    keywords: ['cardiac', 'angioplasty', 'india', 'heart'],
    description: 'Advanced angioplasty at top Indian hospitals',
    descriptionAr: 'رأب الأوعية المتقدم في أفضل المستشفيات الهندية',
  },
  {
    id: 'valve_replacement',
    category: 'cardiac',
    question: 'Heart valve replacement in UAE with family accommodation',
    questionAr: 'استبدال صمام القلب في الإمارات مع إقامة العائلة',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
    keywords: ['cardiac', 'valve', 'replacement', 'uae'],
    description: 'Comprehensive valve replacement with family support services',
    descriptionAr: 'استبدال الصمام الشامل مع خدمات دعم الأسرة',
  },

  // General Medical
  {
    id: 'weight_loss',
    category: 'general',
    question: 'Bariatric surgery in Turkey with all-inclusive package',
    questionAr: 'جراحة السمنة في تركيا مع باقة شاملة',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    keywords: ['bariatric', 'weight', 'surgery', 'turkey'],
    description: 'Complete weight loss surgery packages with aftercare',
    descriptionAr: 'باقات جراحة إنقاص الوزن الكاملة مع الرعاية اللاحقة',
  },
  {
    id: 'laser_eye',
    category: 'general',
    question: 'LASIK eye surgery in South Korea',
    questionAr: 'جراحة العين بالليزر في كوريا الجنوبية',
    imageUrl: 'https://images.unsplash.com/photo-1626525718554-7c55d5024e70?w=800',
    keywords: ['lasik', 'eye', 'vision', 'korea'],
    description: 'Advanced LASIK procedures with cutting-edge technology',
    descriptionAr: 'إجراءات الليزك المتقدمة بأحدث التقنيات',
  },
  {
    id: 'cancer_treatment',
    category: 'general',
    question: 'Cancer treatment options in Germany with second opinion',
    questionAr: 'خيارات علاج السرطان في ألمانيا مع رأي ثانٍ',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800',
    keywords: ['cancer', 'oncology', 'treatment', 'germany'],
    description: 'Comprehensive cancer care with expert second opinions',
    descriptionAr: 'رعاية السرطان الشاملة مع آراء الخبراء الثانية',
  },
  {
    id: 'health_checkup',
    category: 'general',
    question: 'Complete health checkup in Thailand with resort stay',
    questionAr: 'فحص صحي شامل في تايلاند مع إقامة في المنتجع',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    keywords: ['checkup', 'wellness', 'preventive', 'thailand'],
    description: 'Comprehensive health screenings in a relaxing environment',
    descriptionAr: 'فحوصات صحية شاملة في بيئة مريحة',
  },
]

// Helper function to get templates by category
export function getTemplatesByCategory(category: QuestionTemplate['category']): QuestionTemplate[] {
  return QUESTION_TEMPLATES.filter(t => t.category === category)
}

// Helper function to search templates
export function searchTemplates(query: string): QuestionTemplate[] {
  const lowerQuery = query.toLowerCase()
  return QUESTION_TEMPLATES.filter(t =>
    t.question.toLowerCase().includes(lowerQuery) ||
    t.keywords.some(k => k.includes(lowerQuery)) ||
    t.description.toLowerCase().includes(lowerQuery)
  )
}
