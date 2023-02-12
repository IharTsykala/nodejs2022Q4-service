FROM node:18-alpine3.17

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]

