# Start local dev dependencies
deps:
	docker-compose up db -d
	make migrate

# Start everything
start: 
	docker-compose up

down: 
	docker-compose down

migrate:
	docker-compose up flyway