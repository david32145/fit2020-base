FROM node:alpine

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn tsc --build

ENTRYPOINT ["node", "./build/src/server"]