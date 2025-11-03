#!/bin/bash

# Medical Tourism Platform - Helper Scripts

case "$1" in
  dev)
    echo "🚀 Starting development server..."
    npm run dev
    ;;

  build)
    echo "🏗️  Building for production..."
    npm run build
    ;;

  start)
    echo "▶️  Starting production server..."
    npm run start
    ;;

  db:push)
    echo "📊 Pushing schema to database..."
    npm run prisma:push
    ;;

  db:seed)
    echo "🌱 Seeding database..."
    npm run prisma:seed
    ;;

  db:studio)
    echo "🎨 Opening Prisma Studio..."
    npm run prisma:studio
    ;;

  db:reset)
    echo "⚠️  Resetting database..."
    read -p "Are you sure? This will delete all data. (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      npm run prisma:push -- --force-reset
      npm run prisma:seed
      echo "✅ Database reset and seeded"
    fi
    ;;

  test)
    echo "🧪 Running tests..."
    echo "Test script coming soon..."
    ;;

  lint)
    echo "🔍 Linting code..."
    npm run lint
    ;;

  format)
    echo "✨ Formatting code..."
    npx prettier --write "**/*.{ts,tsx,json,md}"
    ;;

  deploy:vercel)
    echo "☁️  Deploying to Vercel..."
    vercel --prod
    ;;

  logs)
    echo "📋 Showing logs..."
    tail -f .next/server/*.log 2>/dev/null || echo "No logs found. Run 'npm run dev' first."
    ;;

  clean)
    echo "🧹 Cleaning build artifacts..."
    rm -rf .next node_modules
    echo "✅ Cleaned. Run 'npm install' to reinstall."
    ;;

  backup:db)
    echo "💾 Backing up database..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    pg_dump $DATABASE_URL > "backups/db_backup_$TIMESTAMP.sql"
    echo "✅ Backup saved to backups/db_backup_$TIMESTAMP.sql"
    ;;

  restore:db)
    if [ -z "$2" ]; then
      echo "Usage: ./scripts.sh restore:db <backup_file>"
      exit 1
    fi
    echo "📥 Restoring database from $2..."
    psql $DATABASE_URL < "$2"
    echo "✅ Database restored"
    ;;

  check)
    echo "🔍 Running health checks..."
    echo ""
    echo "1️⃣  Checking environment variables..."
    if [ -z "$DATABASE_URL" ]; then
      echo "   ❌ DATABASE_URL not set"
    else
      echo "   ✅ DATABASE_URL configured"
    fi

    if [ -z "$OPENAI_API_KEY" ]; then
      echo "   ❌ OPENAI_API_KEY not set"
    else
      echo "   ✅ OPENAI_API_KEY configured"
    fi

    echo ""
    echo "2️⃣  Checking dependencies..."
    if [ -d "node_modules" ]; then
      echo "   ✅ Dependencies installed"
    else
      echo "   ❌ Dependencies not installed. Run 'npm install'"
    fi

    echo ""
    echo "3️⃣  Checking database connection..."
    npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
      echo "   ✅ Database connection successful"
    else
      echo "   ❌ Database connection failed"
    fi

    echo ""
    echo "4️⃣  Checking Prisma client..."
    if [ -d "node_modules/@prisma/client" ]; then
      echo "   ✅ Prisma client generated"
    else
      echo "   ❌ Prisma client not generated. Run 'npm run prisma:generate'"
    fi
    ;;

  help|*)
    echo "Medical Tourism Platform - Helper Scripts"
    echo ""
    echo "Usage: ./scripts.sh <command>"
    echo ""
    echo "Development:"
    echo "  dev              Start development server"
    echo "  build            Build for production"
    echo "  start            Start production server"
    echo "  lint             Run linter"
    echo "  format           Format code with Prettier"
    echo "  test             Run tests (coming soon)"
    echo ""
    echo "Database:"
    echo "  db:push          Push schema to database"
    echo "  db:seed          Seed database with sample data"
    echo "  db:studio        Open Prisma Studio"
    echo "  db:reset         Reset and reseed database"
    echo "  backup:db        Backup database to file"
    echo "  restore:db FILE  Restore database from file"
    echo ""
    echo "Deployment:"
    echo "  deploy:vercel    Deploy to Vercel"
    echo ""
    echo "Utilities:"
    echo "  check            Run health checks"
    echo "  logs             Show server logs"
    echo "  clean            Clean build artifacts"
    echo "  help             Show this help message"
    echo ""
    ;;
esac
