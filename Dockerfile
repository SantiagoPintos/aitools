FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json /app

COPY tsconfig.json /app

RUN pnpm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

EXPOSE 3000

CMD ["npm", "start"]
