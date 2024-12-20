FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build notification-system

CMD [ "node", "dist/apps/notification-system/main" ]