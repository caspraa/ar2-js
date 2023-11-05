FROM node:18-alpine
WORKDIR /ar2-js/
COPY public/ /ar2-js/public
COPY src/ /ar2-js/src
COPY package.json /ar2-js/
RUN npm install
CMD ["npm", "start"]

