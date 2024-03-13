#!/bin/bash
COUNT=1

echo "🟢 Seeding database.. [1/${COUNT}] 🚀"
cd ./backend
npx ts-node --esm prisma/seed.ts

echo "🟢 Database seeeded! 🎉"