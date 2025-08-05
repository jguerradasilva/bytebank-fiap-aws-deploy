# 🐋 ByteBank App - Deploy AWS com Docker

## ✅ Arquivos Criados para Deploy

### 🔧 Configuração Docker
- **`Dockerfile`** - Build de produção otimizado com Nginx
- **`Dockerfile.dev`** - Container para desenvolvimento
- **`docker-compose.yml`** - Orquestração local (dev + prod + API mock)
- **`.dockerignore`** - Otimização do build Docker
- **`nginx.conf`** - Configuração do servidor web

### ☁️ Infraestrutura AWS
- **`aws/cloudformation.yml`** - Infraestrutura completa (VPC, ECS, ALB, ECR)
- **`aws/task-definition.json`** - Definição da task ECS
- **`aws/deploy.sh`** - Script de deploy automático (Linux/macOS)
- **`aws/deploy.bat`** - Script de deploy automático (Windows)

### 🚀 CI/CD
- **`.github/workflows/deploy.yml`** - GitHub Actions para deploy automático

### 📚 Documentação
- **`DEPLOY-AWS.md`** - Guia completo de deploy
- **`.env.example`** - Variáveis de ambiente

### 🔍 Monitoramento
- **`src/pages/HealthCheck/index.tsx`** - Endpoint de health check

## 🚀 Como Fazer o Deploy

### 1. Preparação (Uma vez)
```bash
# Configure AWS CLI
aws configure

# Crie a infraestrutura
npm run deploy:infrastructure
```

### 2. Deploy da Aplicação
```bash
# Deploy automático
npm run deploy:aws

# Ou manualmente
cd aws
deploy.bat production us-east-1
```

### 3. Desenvolvimento Local
```bash
# Ambiente de desenvolvimento
npm run docker:dev

# Ambiente de produção local
npm run docker:prod
```

## 📊 Arquitetura AWS

```
Internet → Application Load Balancer → ECS Fargate Tasks → ECR Images
                    ↓
            CloudWatch Logs ← Target Group Health Checks
```

### Componentes:
- **ECS Fargate**: Container serverless
- **Application Load Balancer**: Distribuição de tráfego
- **ECR**: Registry de imagens Docker
- **CloudWatch**: Logs e monitoramento
- **VPC**: Rede isolada

## 💰 Custos Estimados
- **Desenvolvimento**: Gratuito (AWS Free Tier)
- **Produção**: ~$40-65/mês

## 🔒 Recursos de Segurança
- ✅ VPC isolada
- ✅ Security Groups configurados
- ✅ Health checks automáticos
- ✅ HTTPS ready (certificado SSL)
- ✅ Container scanning (ECR)

## 📈 Características de Produção
- ✅ Alta disponibilidade (Multi-AZ)
- ✅ Auto scaling
- ✅ Rolling deployments
- ✅ Health checks
- ✅ Logs centralizados
- ✅ Monitoramento

## 🎯 Próximos Passos

1. **Execute o deploy**:
   ```bash
   npm run deploy:aws
   ```

2. **Configure CI/CD**:
   - Adicione secrets AWS no GitHub
   - Push para `main` fará deploy automático

3. **Configuração adicional**:
   - SSL/HTTPS (AWS Certificate Manager)
   - Custom domain (Route 53)
   - Monitoramento avançado (CloudWatch Dashboards)

## 📞 Suporte

- 📖 Veja `DEPLOY-AWS.md` para guia detalhado
- 🐛 Issues no repositório
- ☁️ Documentação AWS ECS
- 🐳 Documentação Docker

---

**🎉 Sua aplicação ByteBank está pronta para a nuvem AWS!**

Acesse: `http://SEU_LOAD_BALANCER_DNS.amazonaws.com`
