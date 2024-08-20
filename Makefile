dev-up:
	docker-compose -f docker-compose.dev.yml up -d
dev-down:
	docker-compose -f docker-compose.dev.yml down
prune:
	docker system prune
build:
	docker build . --platform linux/amd64 -t ${IMAGE_NAME}