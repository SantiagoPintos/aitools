FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

COPY tsconfig.json /app

RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
