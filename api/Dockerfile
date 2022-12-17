FROM node:18-alpine3.17

RUN npm install -g nodemon

WORKDIR /climate-hist/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9999

# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start:dev"]