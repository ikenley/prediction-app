# Start local dev dependencies
deps:
	docker-compose up -d db
	make migrate

# Start everything
start: 
	docker-compose up

down: 
	docker-compose down

migrate:
	docker-compose up flyway