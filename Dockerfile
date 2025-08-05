# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Set build-time environment variables
ARG VITE_BASE_URL=""
ARG VITE_EP_EXTRATO="/api/extrato"
ARG VITE_API_AUTH=https://dummyjson.com/auth/login

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_EP_EXTRATO=$VITE_EP_EXTRATO
ENV VITE_API_AUTH=$VITE_API_AUTH

# Build the application with production config
RUN npx vite build --config vite.config.production.ts

# Production stage with nginx + node
FROM nginx:alpine

# Install Node.js
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy API dependencies
COPY package*.json ./
RUN npm ci --only=production && npm install express cors

# Copy API server and data
COPY api-server.js ./
COPY json-server ./json-server

# Copy built frontend
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY startup.sh /start.sh
RUN chmod +x /start.sh

# Install curl for health checks
RUN apk add --no-cache curl

# Expose port
EXPOSE 80

# Start both API and nginx
CMD ["/start.sh"]
