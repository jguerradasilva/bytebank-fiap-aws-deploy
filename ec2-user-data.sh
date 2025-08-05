#!/bin/bash

# Update system
yum update -y

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Create app directory
mkdir -p /home/ec2-user/bytebank-app
cd /home/ec2-user/bytebank-app

# Create docker-compose.yml
cat > docker-compose.yml << 'EOL'
version: '3.8'

services:
  bytebank-app:
    image: 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-repo:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
EOL

# Login to ECR and pull image
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com

# Start the application
docker-compose up -d

# Set permissions
chown -R ec2-user:ec2-user /home/ec2-user/bytebank-app

# Create service file for auto-start
cat > /etc/systemd/system/bytebank.service << 'EOL'
[Unit]
Description=ByteBank Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=true
WorkingDirectory=/home/ec2-user/bytebank-app
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=ec2-user

[Install]
WantedBy=multi-user.target
EOL

# Enable service
systemctl enable bytebank.service
systemctl start bytebank.service

echo "ByteBank deployment completed!" > /var/log/bytebank-deployment.log
