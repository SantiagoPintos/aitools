FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

COPY tsconfig.json /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "npm", "--", "start"]
