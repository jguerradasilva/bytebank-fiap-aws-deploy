#!/bin/sh

# Start API server in background
echo "Starting API server..."
node /app/api-server.js &
API_PID=$!

# Wait for API to be ready
echo "Waiting for API server to start..."
for i in $(seq 1 30); do
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "API server is ready!"
        break
    fi
    echo "Waiting for API server... ($i/30)"
    sleep 1
done

# Check if API is still running
if ! kill -0 $API_PID > /dev/null 2>&1; then
    echo "ERROR: API server failed to start"
    exit 1
fi

# Start nginx
echo "Starting nginx..."
nginx -g "daemon off;"
