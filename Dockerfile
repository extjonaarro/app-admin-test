FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS development

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start:host"]

FROM base AS build

COPY . .
RUN npm run build:prod

FROM nginx:1.29-alpine AS production

COPY --from=build /app/dist/app-admin-test/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
