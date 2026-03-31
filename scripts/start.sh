#!/bin/sh
echo "Running database migrations..."
npx prisma db push --skip-generate 2>&1 || echo "DB push skipped - continuing with static data"

echo "Seeding database..."
npx tsx prisma/seed.ts 2>&1 || echo "Seed skipped - continuing with static data"

echo "Starting server..."
exec node server.js
