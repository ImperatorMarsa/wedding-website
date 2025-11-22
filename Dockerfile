FROM node:24-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

#
# BUILD
# 
FROM base AS build

RUN npm run build

#
# PROD
# 
FROM nginx:stable-alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#
# DEV
# 
FROM base AS dev

EXPOSE 3000
CMD ["npm", "run", "dev"]

