FROM node:18-alpine

WORKDIR /src

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm","start"]
