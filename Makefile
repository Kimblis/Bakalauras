# Create .env files by .env.example in every service
create-env-files:
	./scripts/env.sh

# Install NPM Packages for all services 
install-npm:
	./scripts/packages.sh

# Clear NPM Packages for all services (if something is not working as expected)
clear-npm:
	./scripts/clearPackages.sh

# Start running PostgreSql and Redis servers with Docker containers
start-services:
	docker-compose up -d db

# Prepare database
prepare-db:
	./scripts/prepare-db.sh

# Seed database
seed-db:
	./scripts/seed-db.sh

# Start all services
start-server:
	docker-compose -f ./docker-compose.yml up --build app_local
