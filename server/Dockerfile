# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src


RUN npm install
RUN npm run build

# verify the build output
RUN ls -R /app/dist 

# RUN find /app/dist -type f 
#  # This will show all built files
# RUN pwd && ls -la /app/dist  
# # Show directory structure

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# copying only necessary files for production 
COPY package*.json ./
COPY prisma ./prisma
# COPY .env ./
COPY --from=builder /app/dist ./dist

# COPY --from=builder /app/node_modules ./node_modules


# install only production dependencies
RUN npm install --omit=dev

# Generate Prisma client
RUN npx prisma generate

CMD ["node", "dist/server.js"]

