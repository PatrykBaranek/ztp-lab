FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build push-service

CMD ["node", "dist/apps/push-service/main"]