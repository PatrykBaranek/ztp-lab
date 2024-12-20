FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY notification-system/package*.json ./notification-system/
RUN npm install
COPY . .
RUN npm run build -w notification-system
WORKDIR /app/notification-system
CMD ["npm", "run", "start:prod"] 