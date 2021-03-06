FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn tsc --build

COPY .env ./build/.env

ENTRYPOINT ["node", "./src/server"]