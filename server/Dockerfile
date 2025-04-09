FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/server.js"]



# ARG NODE_VERSION=22.9.0

# FROM node:20-alpine

# ENV NODE_ENV production

# WORKDIR /usr/src/app

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# # Run the application as a non-root user.
# USER node


# COPY . .

# # Expose the port that the application listens on.
# EXPOSE 8080

# # Run the application.
# CMD npm run dev


