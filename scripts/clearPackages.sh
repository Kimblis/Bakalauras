#!/bin/bash
COUNT=2

echo "🟢 Clearing NPM Packages for Backend... [1/${COUNT}] 🚀"
cd ./backend
sudo rm -rf node_modules && rm yarn.lock

echo "🟢 Clearing NPM Packages for Frontend... [2/${COUNT}] 🚀"
cd ../client
sudo rm -rf node_modules && rm yarn.lock
