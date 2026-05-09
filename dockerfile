FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM busybox:1.36.1 AS runtime
WORKDIR /app

COPY --from=build /app/dist /app

EXPOSE 6666

CMD ["httpd", "-f", "-p", "6666", "-h", "/app"]
