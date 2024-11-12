.PHONY: start stop test

start:
	docker-compose build frontend backend nginx foodDB
	docker-compose up -d frontend backend nginx foodDB

dev:
	docker-compose build frontend backend nginx foodDB
	docker-compose up -d frontend backend nginx foodDB

stop:
	docker-compose down
