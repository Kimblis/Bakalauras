#!/bin/bash
FAILED=0
copy_env() {
    env_path=$1
    env_name=$2
    microservice=$3
    if 
        cp -n $1 $2 &> /dev/null
    then
        echo "🟢 Created .env file for $3..."
    else 
        FAILED=1
        echo "🔵 Missing .env.example file or .env already exists in $3 directory"
    fi
}

copy_env ./backend/.env.example ./backend/.env 'Backend'
copy_env ./client/.env.example ./client/.env 'Client'

touch .env

echo "---"
echo "🟢 You are ready to go! 🎉"
echo "---"
