ARG MONGO_DB
FROM node:19

ENV MONGO_DB=$MONGO_DB
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build