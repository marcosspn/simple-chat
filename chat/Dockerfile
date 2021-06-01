FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org/

RUN npm install

COPY . .


CMD [ "node", "app.js" ]