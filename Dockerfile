FROM node:19

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
RUN npm run build