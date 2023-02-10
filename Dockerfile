FROM node:18.14-alpine
WORKDIR /app
COPY package.json .
COPY .env .
COPY jsconfig.json .
RUN npm install
COPY ./src ./src
EXPOSE 6003
CMD ["npm", "start"]