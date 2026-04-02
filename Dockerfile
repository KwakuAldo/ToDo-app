FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/public/index.html /usr/share/nginx/html/index.html
COPY --from=builder /app/dist/css /usr/share/nginx/html/css
COPY --from=builder /app/dist/js /usr/share/nginx/html/js

EXPOSE 80
