FROM node:18.12

# ----------- Backend ----------
WORKDIR /app/backend
COPY ./backend ./
RUN yarn
RUN npx prisma generate
RUN yarn build

EXPOSE 2050