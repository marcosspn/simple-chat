FROM node:13.12.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

CMD [ "node", "app.js" ]