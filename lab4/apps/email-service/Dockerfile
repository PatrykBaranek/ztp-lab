FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build email-service

CMD [ "node", "dist/apps/email-service/main" ]