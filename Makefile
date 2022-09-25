PACKAGE=isec3004group9
DOCKER_CONTAINER=$(PACKAGE)-db
LOCAL_DEV_DB_PORT=27017

# ------------------------------------------------------------------------------
# Docker stuff
# ------------------------------------------------------------------------------
.PHONY: docker-start
docker-start:
	docker start $(DOCKER_CONTAINER) || docker run -d -p $(LOCAL_DEV_DB_PORT):5432 --name $(DOCKER_CONTAINER) mongo:latest

.PHONY: docker-stop
docker-stop:
	docker stop $(DOCKER_CONTAINER)

.PHONY: docker-remove
docker-remove:
	docker rm $(DOCKER_CONTAINER)

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
