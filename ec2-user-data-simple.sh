#!/bin/bash

# Script simplificado para EC2
exec > /var/log/user-data.log 2>&1

echo "$(date): Iniciando setup ByteBank"

# Instalar Docker
yum update -y
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Aguardar Docker inicializar
sleep 10

# Configurar AWS CLI
aws configure set region us-east-1

# Login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com

# Baixar e executar imagem
docker pull 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
docker run -d --name bytebank-app -p 80:80 --restart always 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest

echo "$(date): Setup completo"

# Aguardar e testar
sleep 30
docker ps
docker logs bytebank-app
