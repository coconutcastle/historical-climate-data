FROM node:18-alpine3.17

WORKDIR /climate-hist/client

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]