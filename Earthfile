VERSION 0.6

FROM node:19.4

WORKDIR /app

deps:
    COPY package.json package-lock.json ./
    RUN npm install
    SAVE ARTIFACT package.json      AS LOCAL ./package.json
    SAVE ARTIFACT package-lock.json AS LOCAL ./package-lock.json

build:
    FROM +deps
    COPY . .
    RUN npm run build
    RUN npm run build.server
    SAVE ARTIFACT dist /dist AS LOCAL dist

docker:
    FROM nginx
    COPY +build/dist /usr/share/nginx/html
    EXPOSE 80
    SAVE IMAGE --push registry.digitalocean.com/farwydi/mplus:latest

main:
    BUILD +docker
