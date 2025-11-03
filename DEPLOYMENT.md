# Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended for MVP)

**Pros:** Zero-config, automatic HTTPS, edge network, preview deployments
**Cons:** Serverless limitations (60s timeout on Pro plan)

#### Steps:

1. **Prepare Repository**
```bash
git init
git add .
git commit -m "Initial commit: Medical Tourism Platform"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - DATABASE_URL
# - OPENAI_API_KEY
# - NEXT_PUBLIC_BASE_URL
```

3. **Configure Domain**
- Add custom domain in Vercel dashboard
- Update `NEXT_PUBLIC_BASE_URL` in environment variables

4. **Database Migration**
```bash
# Run from local with production DATABASE_URL
npm run prisma:push
npm run prisma:seed
```

**Vercel Deployment URL:** `https://your-project.vercel.app`

---

### Option 2: AWS (For Production Scale)

**Pros:** Full control, no timeouts, better for long API calls
**Cons:** More complex setup, requires DevOps knowledge

#### Architecture:
```
CloudFront → ALB → ECS/Fargate → RDS PostgreSQL
                   └─ S3 (static assets)
```

#### Steps:

1. **Set Up RDS PostgreSQL**
```bash
# Create RDS instance with pgvector
# Note the connection string
```

2. **Build Docker Image**
```dockerfile
# Already included in project
docker build -t medtravel:latest .
docker tag medtravel:latest <ecr-repo-url>:latest
docker push <ecr-repo-url>:latest
```

3. **Deploy to ECS**
```bash
# Create ECS cluster, task definition, service
# Configure environment variables
# Set up Application Load Balancer
```

4. **Configure CloudFront**
```bash
# Create CloudFront distribution
# Point to ALB
# Configure caching rules
```

**Estimated Cost:** $50-150/month depending on traffic

---

### Option 3: DigitalOcean App Platform

**Pros:** Simple, affordable, managed database
**Cons:** Less scalable than AWS

#### Steps:

1. **Create App**
- Connect GitHub repository
- Select Next.js framework
- Add DATABASE_URL from managed PostgreSQL

2. **Configure Build**
```yaml
# app.yaml
name: medtravel
services:
  - name: web
    github:
      repo: your-username/medtravel
      branch: main
    build_command: npm run build
    run_command: npm start
    envs:
      - key: DATABASE_URL
        value: ${db.DATABASE_URL}
      - key: OPENAI_API_KEY
        value: ${OPENAI_API_KEY}
databases:
  - name: db
    engine: PG
    version: "15"
```

**Estimated Cost:** $20-50/month

---

## Environment Variables

### Production .env

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# OpenAI
OPENAI_API_KEY="sk-proj-..."

# Base URL
NEXT_PUBLIC_BASE_URL="https://your-domain.com"

# OTA APIs (when ready)
EXPEDIA_API_KEY="..."
BOOKING_API_KEY="..."
SKYSCANNER_API_KEY="..."

# Email (optional)
SENDGRID_API_KEY="..."
SMTP_HOST="..."
SMTP_PORT="587"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-..."
SENTRY_DSN="..."
```

---

## Pre-Deployment Checklist

### Code
- [ ] Remove console.logs
- [ ] Update error messages
- [ ] Add analytics tracking
- [ ] Configure CORS properly
- [ ] Set up rate limiting

### Database
- [ ] Backup strategy configured
- [ ] Connection pooling enabled
- [ ] Indexes optimized
- [ ] SSL mode required

### Security
- [ ] Environment variables secured
- [ ] API keys rotated
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] Input validation on all endpoints

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Database monitoring
- [ ] API uptime monitoring
- [ ] Log aggregation

### Testing
- [ ] All API endpoints tested
- [ ] Chat flow tested
- [ ] Lead submission tested
- [ ] Mobile responsiveness checked
- [ ] Cross-browser compatibility

---

## Post-Deployment

### 1. Database Seed
```bash
# SSH into server or use Prisma Studio
npm run prisma:seed
```

### 2. Test Core Flows
- Chat interface
- Lead capture
- Language switching
- Theme switching
- Mobile experience

### 3. Set Up Monitoring

**Sentry (Error Tracking)**
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

**Vercel Analytics**
```bash
# Already enabled on Vercel
```

**Uptime Robot**
- Monitor https://your-domain.com
- Alert on downtime

### 4. Configure DNS
```bash
# Add A record or CNAME
# Enable SSL certificate
# Test www and non-www
```

### 5. Set Up Backups
```bash
# Database backup cron job
0 2 * * * pg_dump $DATABASE_URL > backup.sql
```

---

## Performance Optimization

### 1. Next.js Optimizations
```javascript
// next.config.mjs
{
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  swcMinify: true,
}
```

### 2. Database Optimizations
```sql
-- Add indexes
CREATE INDEX idx_clinics_city ON clinics(city);
CREATE INDEX idx_clinics_country ON clinics(country);
CREATE INDEX idx_packages_price ON packages(price);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Connection pooling
-- Use PgBouncer or Prisma Accelerate
```

### 3. Caching Strategy
```typescript
// Add Redis for OTA results
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
})

// Cache hotel search results for 15 minutes
const cacheKey = `hotels:${city}:${dates}`
const cached = await redis.get(cacheKey)
if (cached) return cached

const results = await searchHotels(params)
await redis.set(cacheKey, results, { ex: 900 })
```

### 4. CDN Configuration
- Cache static assets (images, CSS, JS)
- Edge caching for API responses (where appropriate)
- Compression enabled (gzip/brotli)

---

## Scaling Strategy

### Horizontal Scaling
```yaml
# Auto-scaling configuration
minReplicas: 2
maxReplicas: 10
targetCPUUtilizationPercentage: 70
```

### Database Scaling
- Read replicas for clinic searches
- Connection pooling (PgBouncer)
- Caching layer (Redis)
- Consider Aurora Serverless for auto-scaling

### Cost Optimization
- Use CDN for static assets
- Implement request caching
- Optimize database queries
- Use cheaper regions for non-latency-critical services

---

## Rollback Plan

### Quick Rollback
```bash
# Vercel
vercel rollback

# AWS ECS
aws ecs update-service --cluster medtravel --service web --task-definition medtravel:previous

# Docker
docker pull medtravel:previous
docker-compose up -d
```

### Database Rollback
```bash
# Restore from backup
psql $DATABASE_URL < backup.sql

# Revert migrations (if using Prisma Migrate)
npx prisma migrate resolve --rolled-back <migration_name>
```

---

## Monitoring & Alerts

### Key Metrics to Monitor
1. **Response Time**
   - Chat API: < 5s (P95)
   - Page load: < 3s

2. **Error Rate**
   - Target: < 0.1%
   - Alert if > 1%

3. **Database Performance**
   - Query time: < 100ms (P95)
   - Connection pool utilization

4. **OTA API Success Rate**
   - Target: > 95%
   - Alert if < 90%

### Alert Configuration
```yaml
alerts:
  - name: High Error Rate
    condition: error_rate > 1%
    notify: pagerduty

  - name: Slow Response
    condition: p95_response_time > 5000ms
    notify: slack

  - name: Database Down
    condition: db_connection_errors > 0
    notify: pagerduty
```

---

## Disaster Recovery

### Backup Strategy
- **Database:** Daily automated backups, 30-day retention
- **Environment Variables:** Secure vault (1Password/AWS Secrets)
- **Code:** Git repository with tags for each release

### Recovery Time Objectives (RTO)
- Critical systems: < 1 hour
- Non-critical: < 4 hours

### Recovery Point Objectives (RPO)
- Database: < 24 hours (daily backups)
- Code: Instant (Git)

---

## Maintenance Windows

### Scheduled Maintenance
- **Time:** Sundays 2-4 AM UTC (low traffic)
- **Frequency:** Monthly
- **Tasks:**
  - Database maintenance
  - Security updates
  - Performance optimization

### Emergency Maintenance
- Notify users via banner
- Post-mortem report within 24 hours

---

## Support & Documentation

### For DevOps Team
- Infrastructure as Code (Terraform/CloudFormation)
- CI/CD pipeline configuration
- Monitoring dashboard access

### For Support Team
- API documentation (Postman collection)
- Common issues troubleshooting guide
- Database access procedures

---

## Success Metrics

### Week 1 Targets
- [ ] Zero critical errors
- [ ] 99.9% uptime
- [ ] < 5s response times

### Month 1 Targets
- [ ] 1,000+ chat sessions
- [ ] 200+ leads captured
- [ ] 20%+ lead conversion

---

## Contact & Escalation

### Production Issues
1. Check monitoring dashboard
2. Review error logs (Sentry)
3. Check #alerts Slack channel
4. Escalate to on-call engineer

### Emergency Contacts
- DevOps Lead: devops@medtravel.com
- Database Admin: dba@medtravel.com
- On-Call: pagerduty.com/medtravel

---

**Remember:** Always test in staging before deploying to production!

**Good luck with your deployment! 🚀**
