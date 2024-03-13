# ---------- Base ----------
FROM node:18.12-alpine3.16 AS base

# ---------- Builder ----------
FROM base AS builder
WORKDIR /app/backend
COPY ./backend ./
RUN yarn
RUN npx prisma generate

#frontend 
WORKDIR /app/client
COPY ./client ./
RUN yarn
ARG VITE_API_URL
ARG VITE_ENV

RUN yarn build 

# ---------- Production ----------
FROM nginx:1.23.2

COPY --from=builder /app/client/dist/ /usr/share/nginx/html
COPY --from=builder /app/client/default.conf /etc/nginx/conf.d/
EXPOSE 80