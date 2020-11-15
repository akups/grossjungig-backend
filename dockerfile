FROM node:12.18.1

WORKDIR . 

COPY package*.json 

RUN npm install

COPY . .

CMD ["npm", "start"]

