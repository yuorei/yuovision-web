dev:
	npm run dev
build:
	npm run build
prod:
	npm run build&&npm run start

# Docker commands
docker-build:
	docker build -t yuovision-web .

docker-run:
	./docker-run.sh --build

docker-run-dev:
	./docker-run.sh --dev --build

docker-run-prod:
	./docker-run.sh --prod --build

docker-stop:
	docker stop yuovision-web || true

docker-ps:
	docker ps --filter name=yuovision-web