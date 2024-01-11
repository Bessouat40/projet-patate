.PHONY: start stop test

test:
	docker-compose build frontend backend nginx foodDB
	docker-compose up -d frontend backend nginx foodDB

stop:
	docker-compose down
