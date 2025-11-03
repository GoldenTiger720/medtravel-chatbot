# Quick Start Guide

## Start the Application

Your database has been set up and seeded with sample data. To start the application:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Test the Platform

### 1. Explore the Home Page
- Modern landing page with features section
- Toggle between Dark/Light mode (top right)
- Switch between English/Arabic (top right)

### 2. Try the Chat Interface
Click "Start Your Journey" or navigate to `/chat`

**Sample Queries to Try:**

```
"Show me dental implants in Istanbul under $2000"
"I need cosmetic surgery in Thailand"
"IVF treatment in Dubai with hotel and flights"
"Dental clinics in Turkey"
```

### 3. Test Features

#### Chat Features:
- Natural language queries
- Clinic cards with ratings, specialties, and packages
- Hotel recommendations (mock data)
- Flight options (mock data)
- "Request Call" button → Opens lead capture form
- "Save" button → Generates shareable link

#### Theme Switcher:
- Click sun/moon icon in header
- Switches between light and dark mode
- Persists across page reloads

#### Language Switcher:
- Click language icon (globe) in header
- Switches between English and UAE Arabic
- Full RTL support for Arabic
- All UI text and clinic data translated

## Sample Database Data

The database has been seeded with:

### Clinics:
1. **Istanbul Dental Center** (Turkey)
   - Specialties: Dental
   - Package: Dental Implants - $1,500 USD
   - Rating: 4.8/5 (1,245 reviews)

2. **Bangkok Beauty Institute** (Thailand)
   - Specialties: Cosmetic Surgery
   - Package: Rhinoplasty - $3,500 USD
   - Rating: 4.9/5 (2,103 reviews)

3. **Dubai Fertility Center** (UAE)
   - Specialties: Fertility Treatment
   - Package: IVF Cycle - $4,500 USD
   - Rating: 4.7/5 (892 reviews)

## API Endpoints

### Test with cURL

**Chat API:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Show me dental clinics in Turkey",
    "sessionId": "test_session_123",
    "locale": "en"
  }'
```

**Lead Capture API:**
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "message": "Interested in dental implants"
  }'
```

## Architecture Overview

```
User Query → Intent Extraction (OpenAI GPT-4)
           ↓
       Clinic Search (PostgreSQL)
           ↓
       Hotel/Flight Search (OTA APIs - Mock)
           ↓
       Response Composition (OpenAI GPT-4)
           ↓
       Policy Filter (Compliance Check)
           ↓
       Display Results (React Components)
```

## Key Features Implemented

✅ **Core Features:**
- AI-powered chat interface with OpenAI GPT-4
- Intent extraction from natural language
- Clinic search with filters (category, location, budget)
- Interactive clinic, hotel, and flight cards
- Lead capture with form validation
- Save and share functionality

✅ **UI/UX:**
- Modern, responsive design
- Dark/Light mode toggle
- English/Arabic language switcher with RTL support
- Clean layout with ample margins
- Shadcn/ui components with TailwindCSS

✅ **Technical:**
- Next.js 14 with App Router
- TypeScript for type safety
- Prisma ORM with PostgreSQL
- API routes for backend logic
- Server-side rendering and static generation

## Customization

### Change Primary Color
Edit [tailwind.config.ts](tailwind.config.ts) or [app/globals.css](app/globals.css):

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Blue */
}
```

### Add More Clinics
Run the seed script or manually add via Prisma Studio:

```bash
npm run prisma:studio
```

### Connect Real OTA APIs
1. Get API keys from Expedia, Booking.com, Skyscanner
2. Add to `.env`
3. Uncomment real API code in `lib/ota/` services

## Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL in .env
# Re-run: npm run prisma:push
```

### OpenAI API Errors
```bash
# Verify OPENAI_API_KEY in .env
# Check API quota at platform.openai.com
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## Next Steps

1. **Deploy to Production**
   - Vercel: `vercel deploy`
   - Docker: `docker build -t medtravel .`

2. **Add Real OTA Integration**
   - Sign up for Expedia Rapid API
   - Get Booking.com Partner credentials
   - Integrate Skyscanner or Amadeus

3. **Enable Vector Search**
   - Install pgvector extension
   - Generate embeddings for clinics
   - Uncomment semantic search code

4. **Add Admin Dashboard**
   - Clinic management
   - Lead tracking
   - Analytics

## Support

For questions or issues:
- Check [README.md](README.md) for detailed documentation
- Review code comments
- Contact: support@medtravel.com

---

**Happy Building! 🚀**
