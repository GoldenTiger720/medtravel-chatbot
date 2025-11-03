# MedTravel - AI-Powered Medical Tourism Platform

A modern, full-stack medical tourism platform built with Next.js 14, featuring AI-powered chat assistance, clinic search, and integrated hotel/flight booking.

## 🌟 Features

- **AI-Powered Chat Interface**: Natural language processing for understanding user queries
- **Verified Clinics Database**: Searchable database of accredited medical clinics
- **OTA Integration**: Hotel and flight search from Expedia, Booking.com, and Skyscanner
- **Bilingual Support**: English and UAE Arabic (RTL support)
- **Dark/Light Mode**: Theme switcher for user preference
- **Modern UI**: Built with Shadcn/ui and TailwindCSS
- **Lead Management**: Capture and track user inquiries
- **Shareable Offers**: Save and share treatment packages

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, Shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI GPT-4 for intent extraction and response generation
- **Internationalization**: Custom i18n with en.json and uae.json
- **Theme**: next-themes for dark/light mode

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (with pgvector extension for semantic search)
- OpenAI API key

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

The `.env` file is already configured with:

```env
DATABASE_URL="your_postgresql_connection_string"
OPENAI_API_KEY="your_openai_api_key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with sample data
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
chatbot/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Main chat endpoint
│   │   ├── lead/route.ts          # Lead capture endpoint
│   │   └── save/route.ts          # Save offer endpoint
│   ├── chat/
│   │   └── page.tsx               # Chat interface page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── cards/
│   │   ├── ClinicCard.tsx         # Clinic result card
│   │   ├── HotelCard.tsx          # Hotel result card
│   │   └── FlightCard.tsx         # Flight result card
│   ├── chat/
│   │   └── ChatInterface.tsx      # Main chat component
│   ├── dialogs/
│   │   └── LeadDialog.tsx         # Lead capture form
│   ├── ui/                        # Shadcn/ui components
│   ├── theme-provider.tsx         # Theme context
│   ├── theme-toggle.tsx           # Dark/light mode switcher
│   └── language-toggle.tsx        # Language switcher
├── lib/
│   ├── ai/
│   │   ├── intent-extractor.ts    # Extract user intent with LLM
│   │   ├── response-composer.ts   # Compose AI responses
│   │   └── policy-filter.ts       # Content compliance filter
│   ├── db/
│   │   ├── prisma.ts              # Prisma client
│   │   └── clinic-search.ts       # Clinic search logic
│   ├── i18n/
│   │   └── context.tsx            # Internationalization context
│   ├── ota/
│   │   ├── types.ts               # OTA type definitions
│   │   ├── hotel-service.ts       # Hotel search service
│   │   └── flight-service.ts      # Flight search service
│   └── utils.ts                   # Utility functions
├── locales/
│   ├── en.json                    # English translations
│   └── uae.json                   # Arabic translations
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding script
├── .env                           # Environment variables
├── package.json
└── README.md
```

## 🔧 API Endpoints

### POST /api/chat

Chat with the AI assistant to find clinics, hotels, and flights.

**Request:**
```json
{
  "message": "I need IVF treatment in Dubai under $5000",
  "sessionId": "session_123",
  "locale": "en"
}
```

**Response:**
```json
{
  "message": "I found 3 verified clinics...",
  "intent": {
    "procedure": "IVF",
    "category": "fertility",
    "city": "Dubai",
    "budget": 5000
  },
  "cards": {
    "clinics": [...],
    "hotels": [...],
    "flights": [...]
  }
}
```

### POST /api/lead

Submit a lead form to request a call.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "clinicId": "clinic_123",
  "message": "Interested in dental implants"
}
```

### POST /api/save

Save an offer and get a shareable link.

**Request:**
```json
{
  "sessionId": "session_123",
  "clinicId": "clinic_123",
  "packageId": "package_456"
}
```

## 🎨 Customization

### Adding New Languages

1. Create a new JSON file in `/locales/` (e.g., `fr.json`)
2. Copy structure from `en.json` and translate
3. Update `lib/i18n/context.tsx` to include the new locale

### Styling

The platform uses TailwindCSS with custom theme variables defined in `app/globals.css`. Modify the CSS variables to change colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
```

### OTA Integration

Replace mock OTA services with real API calls:

1. Get API keys from Expedia, Booking.com, and Skyscanner
2. Add keys to `.env`:
   ```env
   EXPEDIA_API_KEY=your_key
   BOOKING_API_KEY=your_key
   SKYSCANNER_API_KEY=your_key
   ```
3. Uncomment real API code in `lib/ota/hotel-service.ts` and `lib/ota/flight-service.ts`

## 🗄️ Database Schema

### Key Tables

- **clinics**: Medical facilities with procedures and packages
- **doctors**: Medical professionals affiliated with clinics
- **procedures**: Medical procedures offered
- **packages**: Treatment packages with pricing
- **leads**: User inquiries and contact information
- **ota_referrals**: Tracking for hotel/flight bookings

### Vector Search (Optional)

To enable semantic search with pgvector:

1. Install pgvector extension in PostgreSQL
2. Generate embeddings using OpenAI API
3. Uncomment vector search code in `lib/db/clinic-search.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
# Build image
docker build -t medtravel .

# Run container
docker run -p 3000:3000 --env-file .env medtravel
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📊 Performance Targets

As per PRD requirements:

- Response latency: < 5 seconds (P95)
- System availability: 99%
- Zero hallucination tolerance (policy filter)
- OTA API success rate: > 95%
- Lead conversion target: > 20% of sessions

## 🔒 Security & Compliance

- No medical advice - only factual clinic information
- HIPAA-compliant data handling
- No personal data in AI responses
- Encrypted API keys (backend only)
- User consent for data storage

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database with sample data
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For issues or questions:
- Create an issue in the repository
- Contact: support@medtravel.com

---

**Built with ❤️ using Next.js 14, TypeScript, and OpenAI**
