# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

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

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'node /app/api-server.js &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose port
EXPOSE 80

# Start both API and nginx
CMD ["/start.sh"]
