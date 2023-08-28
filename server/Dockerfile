FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
Run npm ci
COPY . .
CMD [ "npm","start" ]