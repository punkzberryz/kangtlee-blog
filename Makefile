IMAGE ?= ghcr.io/punkzberryz/kangtlee-blog:latest
PLATFORM ?= linux/amd64
ENV_FILE ?= .env
APP_SERVICE ?= next-app

BUILD_ARGS = \
	--build-arg DATABASE_URL \
	--build-arg DIRECT_URL \
	--build-arg NEXT_PUBLIC_GOOGLE_ANALYTICS_ID \
	--build-arg NEXT_PUBLIC_URL \
	--build-arg GOOGLE_SHEETS_CLIENT_EMAIL \
	--build-arg GOOGLE_SHEET_ID \
	--build-arg NEXT_PUBLIC_CLOUDINARY_NAME \
	--build-arg SIGNUP_ADMIN_SECRET \
	--build-arg GOOGLE_CLIENT_ID \
	--build-arg GOOGLE_CLIENT_SECRET \
	--build-arg MAILER_EMAIL \
	--build-arg MAILER_PASSWORD

up:
	docker-compose -f docker-compose.dev.yml up -d
down:
	docker-compose -f docker-compose.dev.yml down
prune:
	docker system prune
build:
	@if [ -f $(ENV_FILE) ]; then set -a; . ./$(ENV_FILE); set +a; fi; \
	docker build . --platform $(PLATFORM) -t $(IMAGE) $(BUILD_ARGS)
build-no-cache:
	@if [ -f $(ENV_FILE) ]; then set -a; . ./$(ENV_FILE); set +a; fi; \
	docker build . --no-cache --platform $(PLATFORM) -t $(IMAGE) $(BUILD_ARGS)
build-image: build
push-image:
	docker push $(IMAGE)
ship: build-image push-image
pull:
	docker pull $(IMAGE)
logs:
	docker logs --follow kangtlee-blog-next-app-1
re-up:
	docker-compose up -d
deploy:
	@echo "--- 1. Pulling latest image... ---"
	docker compose --env-file $(ENV_FILE) pull $(APP_SERVICE)
	@echo "--- 2. Restarting container... ---"
	docker compose --env-file $(ENV_FILE) up -d $(APP_SERVICE)
	@echo "--- 3. Cleaning up old images... ---"
	docker image prune -f
	@echo "Deployed successfully!"
