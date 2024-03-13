#!/bin/bash
COUNT=2

echo "🟢 Installing NPM Packages for Backend... [1/${COUNT}] 🚀"
cd ./backend
yarn

echo "🟢 Installing NPM Packages for Frontend... [2/${COUNT}] 🚀"
cd ../client
yarn

echo "🟢 You are ready to go! 🎉"