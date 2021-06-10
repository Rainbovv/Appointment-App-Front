FROM node:14.17.0-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run prod-build
RUN npm run prod