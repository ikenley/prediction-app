# Start local dev dependencies
deps:
	docker-compose up db flyway -d

# Start everything
start: 
	docker-compose up

down: 
	docker-compose down