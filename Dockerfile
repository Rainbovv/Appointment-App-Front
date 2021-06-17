FROM node:14.17.0-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run prod-build
