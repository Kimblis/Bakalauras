#!/bin/bash
COUNT=1

echo "🟢 Preparing database.. [1/${COUNT}] 🚀"
cd ./backend
npx prisma generate && npx prisma migrate && npx prisma db push --accept-data-loss

echo "🟢 You are ready to go! 🎉"