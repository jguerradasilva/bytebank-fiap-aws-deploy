#!/bin/bash

# Script de inicialização EC2 para ByteBank App - Versão 2
# Este script instala Docker, baixa a imagem e inicia a aplicação

LOG_FILE=/var/log/bytebank-init.log
exec > >(tee -a $LOG_FILE) 2>&1

echo "$(date): Iniciando setup do ByteBank App..."

# Função para log com timestamp
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S'): $1"
}

log "=== Fase 1: Atualizando sistema ==="
yum update -y

log "=== Fase 2: Instalando Docker ==="
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

log "=== Fase 3: Configurando AWS CLI ==="
# Configure AWS CLI com região
aws configure set region us-east-1

log "=== Fase 4: Autenticando no ECR ==="
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com

log "=== Fase 5: Baixando imagem do ECR ==="
docker pull 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest

log "=== Fase 6: Criando docker-compose.yml ==="
cat > /home/ec2-user/docker-compose.yml << 'EOF'
version: '3.8'
services:
  bytebank-app:
    image: 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
    ports:
      - "80:80"
    restart: always
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
EOF

log "=== Fase 7: Instalando Docker Compose ==="
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

log "=== Fase 8: Iniciando aplicação ==="
cd /home/ec2-user
/usr/local/bin/docker-compose up -d

log "=== Fase 9: Verificando status ==="
sleep 30
docker ps -a
/usr/local/bin/docker-compose logs

log "=== Fase 10: Teste de conectividade ==="
sleep 60
curl -I http://localhost/ || log "ERRO: Aplicação não está respondendo"

log "=== Setup completo! ==="
log "Aplicação deve estar disponível em: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
