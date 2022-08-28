# syntax=docker/dockerfile:1
FROM node:16.17.0 as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "start:dev"]