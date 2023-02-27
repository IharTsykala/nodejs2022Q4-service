FROM node:18-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]

