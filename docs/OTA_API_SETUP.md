# OTA API Keys Setup Guide

This guide will walk you through obtaining API keys from Expedia, Booking.com, and Skyscanner to enable real hotel and flight search functionality.

---

## 🏨 Expedia Rapid API

### Overview
- **Service**: Hotel search and booking
- **Cost**: Free tier available, then pay-per-booking commission model
- **Best for**: Comprehensive hotel inventory with competitive rates

### How to Get API Keys

#### Step 1: Sign Up for Expedia Partner Solutions (EPS)

1. **Visit**: [https://developer.expediapartnersolutions.com](https://developer.expediapartnersolutions.com)
2. **Click**: "Get Started" or "Sign Up"
3. **Fill out the form**:
   - Company name
   - Website URL (your platform URL)
   - Business type (Travel Agency/OTA)
   - Expected monthly bookings
   - Contact information

#### Step 2: Complete Verification

1. **Wait for approval** (typically 1-3 business days)
2. **Verify your email** when you receive the confirmation
3. **Complete business verification**:
   - Provide business registration documents
   - Tax ID or VAT number
   - Proof of business address

#### Step 3: Access Your Credentials

1. **Log in** to the [EPS Portal](https://developers.expediagroup.com)
2. **Navigate to**: "My Account" → "API Credentials"
3. **Copy your credentials**:
   ```
   API Key: your_expedia_api_key
   API Secret: your_expedia_api_secret
   ```

#### Step 4: Choose Your API Product

Expedia offers several APIs:
- **Rapid API** (Recommended): Modern REST API for hotels
- **EAN API** (Legacy): Older but still supported
- **Lodge Partner API**: For property management

**For this project, use Rapid API.**

#### Step 5: Get Started

1. **Documentation**: [Rapid API Docs](https://developers.expediagroup.com/docs/products/rapid/)
2. **Sandbox**: Available for testing before going live
3. **Support**: Developer support via portal

### Pricing

- **Free tier**: Test bookings in sandbox
- **Commission model**:
  - You earn commission on bookings (typically 10-18%)
  - No monthly fees
  - Payment NET 30 days after guest checkout

### Integration Timeline

- **Sandbox testing**: 1-2 days
- **Production approval**: 3-5 business days
- **Full integration**: 1-2 weeks

### Sample Request

```javascript
const response = await fetch('https://api.ean.com/v3/properties/availability', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    checkin: '2025-12-01',
    checkout: '2025-12-05',
    currency: 'USD',
    language: 'en-US',
    occupancy: '2',
    property_id: ['12345'],
  })
})
```

---

## 🏢 Booking.com Partner Hub API

### Overview
- **Service**: Hotel search and booking
- **Cost**: Commission-based (no upfront fees)
- **Best for**: Largest hotel inventory globally

### How to Get API Keys

#### Step 1: Apply for Booking.com Affiliate Program

1. **Visit**: [https://www.booking.com/affiliate-program/](https://www.booking.com/affiliate-program/)
2. **Choose program type**:
   - **Affiliate Program**: Simple, commission per booking (easier to start)
   - **Connectivity Partner**: Full API access (more complex, higher volume)

#### Option A: Affiliate Program (Recommended for MVP)

1. **Sign up**: [Booking.com Affiliate](https://admin.booking.com/hotel/hoteladmin/join.html)
2. **Fill out application**:
   - Website details
   - Traffic estimates
   - Business model
3. **Get approved** (usually instant for affiliates)
4. **Access dashboard**: Get your affiliate ID and tracking links
5. **Use deeplinks**: Create searchable hotel links with your affiliate ID

**Note**: Affiliate program uses deeplinks, not full API. Good for MVP!

#### Option B: Connectivity Partner (Full API - For Scale)

1. **Visit**: [https://connect.booking.com](https://connect.booking.com)
2. **Apply as Technology Partner**:
   - Requires established business
   - Minimum booking volume (typically 100+ bookings/month)
   - Technical integration review
3. **Wait for approval** (2-4 weeks)
4. **Complete certification**:
   - Technical integration testing
   - Security review
   - Compliance check

#### Step 2: Get API Credentials

**For Affiliate Program:**
```
Affiliate ID: your_affiliate_id
Tracking Link Format:
https://www.booking.com/searchresults.html?aid=YOUR_AFFILIATE_ID&...
```

**For Partner Hub API:**
```
Username: your_api_username
Password: your_api_password
Hotel ID: your_hotel_id
```

### Pricing

**Affiliate Program:**
- Free to join
- Commission: 25-40% of Booking.com's commission
- Average earning: $0.80-$2.50 per booking
- Payment: Monthly, NET 30 days

**Connectivity Partner:**
- No setup fees
- Revenue share model
- Higher commission rates for volume

### Integration Methods

#### Method 1: Affiliate Deeplinks (Easy - For MVP)
```javascript
// Generate search URL with affiliate tracking
const generateBookingURL = (city, checkIn, checkOut) => {
  const params = new URLSearchParams({
    aid: 'YOUR_AFFILIATE_ID',
    ss: city,
    checkin: checkIn,
    checkout: checkOut,
    no_rooms: 1,
    group_adults: 2,
  })
  return `https://www.booking.com/searchresults.html?${params}`
}
```

#### Method 2: Partner Hub API (Advanced)
```xml
<!-- XML API Request -->
<request>
  <username>your_username</username>
  <password>your_password</password>
  <city_ids>12345</city_ids>
  <checkin>2025-12-01</checkin>
  <checkout>2025-12-05</checkout>
</request>
```

### Documentation

- Affiliate: [https://admin.booking.com](https://admin.booking.com)
- Partner API: [https://developers.booking.com](https://developers.booking.com)
- Support: partners@booking.com

---

## ✈️ Skyscanner API

### Overview
- **Service**: Flight search and comparison
- **Cost**: Free tier available via RapidAPI
- **Best for**: Multi-airline flight comparison

### How to Get API Keys

#### Method 1: RapidAPI (Recommended - Easiest)

1. **Visit**: [https://rapidapi.com/skyscanner/api/skyscanner-flight-search](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)

2. **Sign up for RapidAPI**:
   - Click "Sign Up"
   - Use Google/GitHub or email
   - Free account available

3. **Subscribe to Skyscanner API**:
   - Click "Subscribe to Test"
   - Choose a plan:
     - **Basic**: Free, 100 requests/month
     - **Pro**: $10/month, 500 requests/month
     - **Ultra**: $50/month, 3,000 requests/month
     - **Mega**: Custom pricing

4. **Get your API Key**:
   - Go to "My Apps"
   - Copy your `X-RapidAPI-Key`

5. **Test immediately**: Use the built-in API tester

#### Method 2: Direct Skyscanner Partnership (For Scale)

1. **Visit**: [https://partners.skyscanner.net](https://partners.skyscanner.net)

2. **Apply for Partnership**:
   - Travel business details
   - Website/app information
   - Expected monthly searches
   - Revenue model

3. **Requirements**:
   - Established travel business
   - Significant traffic (10,000+ visitors/month)
   - Professional website/app
   - Business registration

4. **Approval process**: 2-6 weeks

5. **Get credentials**:
   - API Key
   - Market selection
   - Custom pricing agreement

### Pricing

**RapidAPI Marketplace:**
| Plan | Price | Requests/Month | Cost per Request |
|------|-------|----------------|------------------|
| Basic | Free | 100 | $0 |
| Pro | $10 | 500 | $0.02 |
| Ultra | $50 | 3,000 | $0.017 |
| Mega | Custom | Unlimited | Negotiable |

**Direct Partnership:**
- Custom pricing based on volume
- Typically CPC (cost per click) model: $0.05-$0.20
- Revenue share options available

### Integration

#### Using RapidAPI

```javascript
const options = {
  method: 'GET',
  url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/JFK-sky/DXB-sky/2025-12-01',
  headers: {
    'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
    'X-RapidAPI-Host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
  }
}

const response = await fetch(options.url, options)
const data = await response.json()
```

### Documentation

- RapidAPI: [https://rapidapi.com/skyscanner/api/skyscanner-flight-search](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
- Direct API: [https://developers.skyscanner.net](https://developers.skyscanner.net)
- Support: Available through RapidAPI dashboard

---

## 🛩️ Alternative: Amadeus API (Recommended Alternative)

### Overview
- **Service**: Flights, hotels, and more
- **Cost**: Free tier, then usage-based
- **Best for**: Enterprise-grade travel API with excellent documentation

### Why Consider Amadeus?

- ✅ **Free tier**: 1,000 free API calls/month
- ✅ **Comprehensive**: Flights, hotels, car rentals, activities
- ✅ **Great documentation**: Best in class
- ✅ **No business requirements**: Open to developers
- ✅ **Quick approval**: Instant for testing

### How to Get Started

1. **Visit**: [https://developers.amadeus.com](https://developers.amadeus.com)

2. **Sign up**: Click "Register"
   - Email and password
   - No business verification needed initially

3. **Create an app**:
   - Go to "My Self-Service Workspace"
   - Click "Create new app"
   - Get instant credentials:
     ```
     API Key (Client ID): abc123...
     API Secret: xyz789...
     ```

4. **Start testing immediately**:
   - Self-service tier: Free 1,000 calls/month
   - Production tier: Usage-based pricing

### Pricing

**Self-Service (Free Tier):**
- 1,000 free transactions/month
- Test and production environments
- All APIs included
- Credit card NOT required

**Enterprise (Production):**
- Pay-as-you-go: $0.001-$0.01 per API call
- Volume discounts available
- Dedicated support
- SLA guarantees

### Sample Request

```javascript
// Get access token
const tokenResponse = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'YOUR_API_KEY',
    client_secret: 'YOUR_API_SECRET'
  })
})

const { access_token } = await tokenResponse.json()

// Search flights
const flightResponse = await fetch(
  'https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JFK&destinationLocationCode=DXB&departureDate=2025-12-01&adults=1',
  {
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  }
)
```

---

## 📋 Quick Comparison

| Provider | Setup Time | Approval | Free Tier | Best For |
|----------|------------|----------|-----------|----------|
| **Expedia** | 3-5 days | Required | Testing only | Hotels - US market |
| **Booking.com** | Instant (affiliate) | Easy | Yes (affiliate) | Hotels - Global |
| **Skyscanner** | Instant (RapidAPI) | None | 100 calls/month | Flights - Budget |
| **Amadeus** | Instant | None | 1,000 calls/month | **All-in-one (BEST)** |

---

## 🎯 Recommended Approach for Your Project

### Phase 1: MVP (Immediate)

**Use RapidAPI + Amadeus (Free Tiers)**

```bash
# Add to .env
RAPIDAPI_KEY="your_rapidapi_key"  # Skyscanner via RapidAPI
AMADEUS_API_KEY="your_amadeus_key"
AMADEUS_API_SECRET="your_amadeus_secret"
```

**Advantages:**
- ✅ Start immediately
- ✅ No business verification
- ✅ Free for testing
- ✅ Production-ready

### Phase 2: Scale (After MVP validation)

1. **Hotels**: Apply for Booking.com Affiliate (instant) + Expedia (3-5 days)
2. **Flights**: Upgrade Skyscanner or use Amadeus production tier
3. **Cost**: ~$50-100/month for moderate traffic

### Phase 3: Enterprise (High Volume)

1. Full Expedia Rapid API partnership
2. Booking.com Connectivity Partner
3. Direct Skyscanner partnership
4. Amadeus Enterprise with SLA

---

## 🚀 Implementation Steps

### Step 1: Get Free API Keys (TODAY)

```bash
# 1. Amadeus (5 minutes)
# Visit: https://developers.amadeus.com
# Sign up → Create app → Copy credentials

# 2. RapidAPI Skyscanner (5 minutes)
# Visit: https://rapidapi.com/skyscanner/api/skyscanner-flight-search
# Sign up → Subscribe to Free plan → Copy API key

# 3. Booking.com Affiliate (10 minutes)
# Visit: https://www.booking.com/affiliate-program/
# Sign up → Get affiliate ID
```

### Step 2: Update .env

```bash
# Add to your .env file
AMADEUS_API_KEY="your_amadeus_client_id"
AMADEUS_API_SECRET="your_amadeus_client_secret"
RAPIDAPI_KEY="your_rapidapi_key"
BOOKING_AFFILIATE_ID="your_booking_affiliate_id"
```

### Step 3: Uncomment Real API Code

1. Open `lib/ota/flight-service.ts`
2. Uncomment Amadeus integration code
3. Open `lib/ota/hotel-service.ts`
4. Uncomment Booking.com affiliate link generation

### Step 4: Test Integration

```bash
npm run dev

# Test in chat:
# "Show me flights from New York to Dubai"
# "Find hotels in Bangkok"
```

---

## 📞 Support & Resources

### Amadeus
- **Docs**: https://developers.amadeus.com/docs
- **Support**: Developer forum + email support
- **Slack**: Amadeus developer community

### Skyscanner (RapidAPI)
- **Docs**: On RapidAPI platform
- **Support**: RapidAPI support tickets
- **Community**: RapidAPI developer forum

### Booking.com
- **Affiliate Support**: partners@booking.com
- **Documentation**: Affiliate dashboard
- **Phone**: Regional support numbers

### Expedia
- **Portal**: https://developers.expediagroup.com
- **Support**: Online tickets
- **Documentation**: Comprehensive API docs

---

## ⚠️ Important Notes

### Rate Limiting

- **Amadeus Free**: 1,000 calls/month, 10 calls/second
- **RapidAPI Free**: 100 calls/month
- **Expedia**: Based on your agreement
- **Booking.com**: Unlimited (affiliate links)

### Caching Strategy

Implement caching to stay within free tiers:

```javascript
// Cache flight/hotel results for 15 minutes
const cacheKey = `flights:${origin}:${destination}:${date}`
const cached = await cache.get(cacheKey)
if (cached) return cached

const results = await fetchFlights(...)
await cache.set(cacheKey, results, { ex: 900 }) // 15 min TTL
```

### Compliance

- ✅ Display "Powered by [Provider]" logo
- ✅ Don't scrape or cache excessive data
- ✅ Follow terms of service
- ✅ Implement proper error handling
- ✅ Monitor usage to avoid overages

---

## 🎉 Next Steps

1. **Sign up for free tiers today** (30 minutes total)
2. **Add API keys to .env**
3. **Test integration** with real data
4. **Monitor usage** in provider dashboards
5. **Upgrade plans** as needed based on traffic

---

**Ready to integrate? Start with Amadeus - it's the easiest and most comprehensive!** 🚀

Need help? Check the provider docs or reach out to their support teams. Most have excellent developer communities.
