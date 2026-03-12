SHELL := /bin/bash

.PHONY: install start api api-db-init build test docker-up docker-down

install:
	npm install

start:
	npm start

api:
	npm run api

api-db-init:
	npm run api:db:init

build:
	npm run build:prod

test:
	npm run test:ci

docker-up:
	docker compose up --build

docker-down:
	docker compose down
