ARG MONGO_DB
FROM node:19

RUN env
ENV MONGO_DB=$MONGO_DB
WORKDIR /app
RUN env


COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build