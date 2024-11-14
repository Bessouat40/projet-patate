COMPOSE_FILE=docker-compose.yml
ENV_FILE=.env
PROJECT_NAME=myproject

.DEFAULT_GOAL := start

build:
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) build

start: build
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d

stop:
	docker-compose -f $(COMPOSE_FILE) down

clean:
	docker-compose -f $(COMPOSE_FILE) down --volumes --remove-orphans
	docker system prune -f
	docker volume prune -f

logs:
	docker-compose logs -f

rebuild:
	docker-compose -f $(COMPOSE_FILE) down
	docker-compose -f $(COMPOSE_FILE) --env-file $(ENV_FILE) up -d --build

healthcheck:
	@echo "Vérification de l'état de l'application..."
	@docker-compose ps --filter "status=running"

test:
	docker-compose -f $(COMPOSE_FILE) run --rm backend pytest

backend-shell:
	docker-compose exec backend /bin/bash

full-clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker system prune -af
