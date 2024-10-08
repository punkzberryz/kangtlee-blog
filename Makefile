up:
	docker-compose -f docker-compose.dev.yml up -d
down:
	docker-compose -f docker-compose.dev.yml down
prune:
	docker system prune
build:
	docker build . --platform linux/amd64 -t ghcr.io/punkzberryz/kangtlee-blog:latest
pull:
	docker pull ghcr.io/punkzberryz/kangtlee-blog:latest
logs:
	docker logs --follow kangtlee-blog-next-app-1
re-up:
	docker-compose up -d