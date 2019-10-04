FROM node:current-alpine

COPY . /app
WORKDIR /app

RUN npm ci 

EXPOSE 7777

CMD ["npm", "run", "dev"]