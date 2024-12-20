FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build scheduler-service

CMD ["node", "dist/apps/scheduler-service/main"]