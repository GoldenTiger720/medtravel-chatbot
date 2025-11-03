import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create clinics
  const clinic1 = await prisma.clinic.create({
    data: {
      name: 'Istanbul Dental Center',
      nameAr: 'مركز إسطنبول لطب الأسنان',
      description: 'Leading dental clinic in Istanbul with over 15 years of experience in implants, veneers, and cosmetic dentistry. JCI accredited with state-of-the-art facilities.',
      descriptionAr: 'عيادة أسنان رائدة في إسطنبول مع أكثر من 15 عامًا من الخبرة في الزرع والقشور وطب الأسنان التجميلي.',
      city: 'Istanbul',
      cityAr: 'إسطنبول',
      country: 'Turkey',
      countryAr: 'تركيا',
      address: 'Nisantasi, Halaskargazi Cad. No:38, 34371',
      email: 'info@istanbuldental.com',
      phone: '+90 212 234 5678',
      website: 'https://istanbuldental.com',
      rating: 4.8,
      reviewCount: 1245,
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09',
      specialties: ['dental'],
      accreditations: ['JCI', 'ISO 9001', 'Turkish Dental Association'],
      priceRange: '$$',
      isVerified: true,
      isActive: true,
    },
  })

  const clinic2 = await prisma.clinic.create({
    data: {
      name: 'Bangkok Beauty Institute',
      nameAr: 'معهد بانكوك للتجميل',
      description: 'Premier cosmetic surgery center in Bangkok specializing in rhinoplasty, breast augmentation, and facial procedures. Over 20,000 successful procedures.',
      descriptionAr: 'مركز جراحة تجميل رائد في بانكوك متخصص في تجميل الأنف وتكبير الثدي وإجراءات الوجه.',
      city: 'Bangkok',
      cityAr: 'بانكوك',
      country: 'Thailand',
      countryAr: 'تايلاند',
      address: '999 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
      email: 'info@bangkokbeauty.com',
      phone: '+66 2 123 4567',
      website: 'https://bangkokbeauty.com',
      rating: 4.9,
      reviewCount: 2103,
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
      specialties: ['cosmetic'],
      accreditations: ['JCI', 'ISAPS', 'Thai Board of Plastic Surgery'],
      priceRange: '$$$',
      isVerified: true,
      isActive: true,
    },
  })

  const clinic3 = await prisma.clinic.create({
    data: {
      name: 'Dubai Fertility Center',
      nameAr: 'مركز دبي للخصوبة',
      description: 'World-class fertility clinic in Dubai offering IVF, IUI, egg freezing, and genetic testing. Success rates above international average.',
      descriptionAr: 'عيادة خصوبة عالمية المستوى في دبي تقدم التلقيح الصناعي والحقن المجهري وتجميد البويضات.',
      city: 'Dubai',
      cityAr: 'دبي',
      country: 'UAE',
      countryAr: 'الإمارات',
      address: 'Healthcare City, Dubai',
      email: 'info@dubaifertility.ae',
      phone: '+971 4 123 4567',
      website: 'https://dubaifertility.ae',
      rating: 4.7,
      reviewCount: 892,
      imageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133',
      specialties: ['fertility'],
      accreditations: ['CAP', 'JCI', 'Dubai Healthcare City'],
      priceRange: '$$$',
      isVerified: true,
      isActive: true,
    },
  })

  console.log('✅ Created 3 clinics')

  // Create doctors
  await prisma.doctor.create({
    data: {
      clinicId: clinic1.id,
      name: 'Dr. Mehmet Yilmaz',
      nameAr: 'د. محمد يلماز',
      title: 'Dr.',
      specialization: 'Implantology & Prosthodontics',
      specializationAr: 'زراعة الأسنان والتعويضات السنية',
      qualification: 'DDS, PhD in Implantology, 18 years experience',
      qualificationAr: 'دكتوراه في زراعة الأسنان، 18 سنة خبرة',
      experience: 18,
      languages: ['English', 'Turkish', 'Arabic'],
      rating: 4.9,
      reviewCount: 456,
      isActive: true,
    },
  })

  await prisma.doctor.create({
    data: {
      clinicId: clinic2.id,
      name: 'Dr. Siriwan Nakorn',
      nameAr: 'د. سيريوان ناكورن',
      title: 'Dr.',
      specialization: 'Plastic & Reconstructive Surgery',
      specializationAr: 'الجراحة التجميلية والترميمية',
      qualification: 'MD, Board Certified Plastic Surgeon, 22 years experience',
      qualificationAr: 'جراح تجميل معتمد، 22 سنة خبرة',
      experience: 22,
      languages: ['English', 'Thai', 'Chinese'],
      rating: 5.0,
      reviewCount: 678,
      isActive: true,
    },
  })

  console.log('✅ Created doctors')

  // Create procedures
  const proc1 = await prisma.procedure.create({
    data: {
      clinicId: clinic1.id,
      name: 'Dental Implants',
      nameAr: 'زراعة الأسنان',
      category: 'dental',
      categoryAr: 'أسنان',
      description: 'Full dental implant placement including titanium post, abutment, and crown',
      descriptionAr: 'زراعة أسنان كاملة تشمل القاعدة التيتانيوم والدعامة والتاج',
      duration: 120,
      recovery: '3-6 months for complete healing',
      recoveryAr: '3-6 أشهر للشفاء الكامل',
      isActive: true,
    },
  })

  const proc2 = await prisma.procedure.create({
    data: {
      clinicId: clinic2.id,
      name: 'Rhinoplasty',
      nameAr: 'تجميل الأنف',
      category: 'cosmetic',
      categoryAr: 'تجميل',
      description: 'Nose reshaping surgery to improve appearance and breathing',
      descriptionAr: 'جراحة إعادة تشكيل الأنف لتحسين المظهر والتنفس',
      duration: 180,
      recovery: '1-2 weeks for initial recovery, 6-12 months for final results',
      recoveryAr: '1-2 أسبوع للتعافي الأولي، 6-12 شهرًا للنتائج النهائية',
      isActive: true,
    },
  })

  console.log('✅ Created procedures')

  // Create packages
  await prisma.package.create({
    data: {
      clinicId: clinic1.id,
      procedureId: proc1.id,
      name: 'Complete Dental Implant Package',
      nameAr: 'باقة زراعة الأسنان الكاملة',
      description: 'Includes consultation, X-rays, implant placement, crown, and 2 follow-up visits',
      descriptionAr: 'تشمل الاستشارة والأشعة السينية والزراعة والتاج وزيارتين للمتابعة',
      price: 1500,
      currency: 'USD',
      duration: 7,
      includes: ['Consultation', 'X-rays & CT Scan', 'Implant Surgery', 'Crown', '2 Follow-ups', 'Airport Transfer'],
      includesAr: ['استشارة', 'أشعة سينية ومقطعية', 'جراحة الزراعة', 'التاج', 'متابعتان', 'نقل من المطار'],
      excludes: ['Accommodation', 'Flights', 'Bone grafting if needed'],
      excludesAr: ['الإقامة', 'الرحلات', 'تطعيم العظام إذا لزم الأمر'],
      isPopular: true,
      isActive: true,
    },
  })

  await prisma.package.create({
    data: {
      clinicId: clinic2.id,
      procedureId: proc2.id,
      name: 'Rhinoplasty Complete Care',
      nameAr: 'رعاية تجميل الأنف الكاملة',
      description: 'All-inclusive rhinoplasty with pre-op tests, surgery, post-op care, and medications',
      descriptionAr: 'تجميل الأنف الشامل مع الفحوصات والجراحة والرعاية اللاحقة والأدوية',
      price: 3500,
      currency: 'USD',
      duration: 10,
      includes: ['Pre-op Consultation', 'Blood Tests', 'Surgery', 'Anesthesia', 'Medications', '3 Follow-ups', 'Hotel 3 nights'],
      includesAr: ['استشارة ما قبل العملية', 'تحاليل الدم', 'الجراحة', 'التخدير', 'الأدوية', '3 متابعات', 'فندق 3 ليال'],
      excludes: ['Flights', 'Extended accommodation', 'Revision surgery'],
      excludesAr: ['الرحلات', 'الإقامة الممتدة', 'جراحة المراجعة'],
      isPopular: true,
      isActive: true,
    },
  })

  await prisma.package.create({
    data: {
      clinicId: clinic3.id,
      name: 'IVF Standard Cycle',
      nameAr: 'دورة التلقيح الصناعي القياسية',
      description: 'Complete IVF cycle with monitoring, egg retrieval, fertilization, and embryo transfer',
      descriptionAr: 'دورة تلقيح صناعي كاملة مع المراقبة وسحب البويضات والتخصيب ونقل الأجنة',
      price: 4500,
      currency: 'USD',
      duration: 21,
      includes: ['Consultation', 'Medications', 'Monitoring', 'Egg Retrieval', 'Fertilization', 'Embryo Transfer', 'Pregnancy Test'],
      includesAr: ['استشارة', 'أدوية', 'مراقبة', 'سحب البويضات', 'التخصيب', 'نقل الأجنة', 'اختبار حمل'],
      excludes: ['Genetic testing', 'Embryo freezing', 'Accommodation'],
      excludesAr: ['الفحص الجيني', 'تجميد الأجنة', 'الإقامة'],
      isPopular: true,
      isActive: true,
    },
  })

  console.log('✅ Created packages')

  // Create availability slots
  const today = new Date()
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    await prisma.availability.create({
      data: {
        clinicId: clinic1.id,
        date,
        slots: Math.floor(Math.random() * 5) + 3,
        isAvailable: true,
      },
    })

    await prisma.availability.create({
      data: {
        clinicId: clinic2.id,
        date,
        slots: Math.floor(Math.random() * 4) + 2,
        isAvailable: true,
      },
    })
  }

  console.log('✅ Created availability slots')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
