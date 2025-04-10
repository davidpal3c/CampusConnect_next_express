# Stage 1: Install & Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY . .

# COPY styles ./styles
# COPY src ./src
# COPY .env.local ./

RUN npm install
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
