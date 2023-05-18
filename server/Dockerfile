FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .

EXPOSE 4040
CMD [ "yarn", "start" ]