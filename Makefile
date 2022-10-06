PACKAGE=isec3004group9
DOCKER_CONTAINER=$(PACKAGE)-db
LOCAL_DEV_DB_PORT=27017

# ------------------------------------------------------------------------------
# Docker stuff
# ------------------------------------------------------------------------------
.PHONY: docker-start
docker-start:
	docker start $(DOCKER_CONTAINER) || docker run -d -p $(LOCAL_DEV_DB_PORT):27017 --name $(DOCKER_CONTAINER) mongo:latest

.PHONY: docker-stop
docker-stop:
	docker stop $(DOCKER_CONTAINER)

.PHONY: docker-remove
docker-remove:
	docker rm $(DOCKER_CONTAINER)

# ------------------------------------------------------------------------------
# Docker, build for lecturer
# ------------------------------------------------------------------------------
.PHONY: docker-build
docker-build:
	docker stop isec3004group9-db-build
	docker stop isec3004group9-server-build
	docker rm isec3004group9-db-build
	docker rm isec3004group9-server-build
	docker build -f DeployDb.Dockerfile -t isec3004group9-db-build .
	docker build -f DeployServer.Dockerfile -t isec3004group9-server-build .
	docker network rm isec3004group9-network
	docker network create --driver bridge isec3004group9-network
	docker run -d -p 27018:27017 --network isec3004group9-network --name isec3004group9-db-build isec3004group9-db-build
	docker run -d -p 8001:8000 --network isec3004group9-network --name isec3004group9-server-build isec3004group9-server-build

# ------------------------------------------------------------------------------
# Server stuff
# ------------------------------------------------------------------------------
.PHONY: init
init: install docker-start

.PHONY: install
install:
	npm install

.PHONY: dev
dev:
	npm run dev
