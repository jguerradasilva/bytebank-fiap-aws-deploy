# 🚀 Deploy AWS - ByteBank App

Este guia contém todas as instruções para fazer o deploy da aplicação ByteBank na AWS usando Docker e ECS.

## 📋 Pré-requisitos

### 1. Ferramentas Necessárias
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Node.js 18+](https://nodejs.org/)
- Conta AWS ativa

### 2. Configuração AWS
```bash
# Configure suas credenciais AWS
aws configure
```

Você precisará:
- AWS Access Key ID
- AWS Secret Access Key  
- Default region (ex: us-east-1)
- Default output format (json)

## 🏗️ Opções de Deploy

### Opção 1: Deploy Rápido com Script Automatizado

#### Windows:
```cmd
cd aws
deploy.bat production us-east-1
```

#### Linux/macOS:
```bash
cd aws
chmod +x deploy.sh
./deploy.sh production us-east-1
```

### Opção 2: Deploy com CloudFormation (Recomendado)

#### 1. Criar Infraestrutura
```bash
# Deploy da infraestrutura
aws cloudformation create-stack \
  --stack-name bytebank-infrastructure \
  --template-body file://aws/cloudformation.yml \
  --parameters ParameterKey=Environment,ParameterValue=production \
  --capabilities CAPABILITY_IAM \
  --region us-east-1

# Aguardar criação (pode levar ~10 minutos)
aws cloudformation wait stack-create-complete \
  --stack-name bytebank-infrastructure \
  --region us-east-1
```

#### 2. Deploy da Aplicação
```bash
# Executar script de deploy
cd aws
./deploy.sh production us-east-1
```

### Opção 3: Deploy Manual Passo a Passo

#### 1. Criar Repositório ECR
```bash
aws ecr create-repository --repository-name bytebank-app --region us-east-1
```

#### 2. Build e Push da Imagem
```bash
# Login no ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build da imagem
docker build -t bytebank-app .

# Tag e push
docker tag bytebank-app:latest <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
```

#### 3. Criar Cluster ECS
```bash
aws ecs create-cluster --cluster-name bytebank-cluster --region us-east-1
```

#### 4. Registrar Task Definition
```bash
# Editar aws/task-definition.json com seus valores
aws ecs register-task-definition --cli-input-json file://aws/task-definition.json --region us-east-1
```

#### 5. Criar Serviço ECS
```bash
aws ecs create-service \
  --cluster bytebank-cluster \
  --service-name bytebank-service \
  --task-definition bytebank-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --region us-east-1
```

## 🔧 Desenvolvimento Local com Docker

### Ambiente de Desenvolvimento
```bash
# Executar em modo desenvolvimento
docker-compose up app-dev

# Acessar: http://localhost:5173
```

### Ambiente de Produção Local
```bash
# Executar em modo produção
docker-compose up app-prod

# Acessar: http://localhost
```

### JSON Server (API Mock)
```bash
# Executar apenas o JSON Server
docker-compose up json-server

# API disponível em: http://localhost:3001
```

## 🔄 CI/CD com GitHub Actions

### Configuração
1. Adicione os secrets no GitHub:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. Push para branch `main` ou `master` irá:
   - Executar testes
   - Build da aplicação
   - Deploy automático na AWS

### Workflow
O arquivo `.github/workflows/deploy.yml` contém:
- ✅ Testes automatizados
- 🔨 Build da aplicação
- 📦 Push para ECR
- 🚀 Deploy no ECS
- 🌐 URL da aplicação

## 📊 Monitoramento

### CloudWatch Logs
```bash
# Ver logs da aplicação
aws logs describe-log-groups --log-group-name-prefix "/ecs/bytebank-app"

# Stream de logs em tempo real
aws logs tail /ecs/bytebank-app --follow
```

### Status do Serviço
```bash
# Status do cluster
aws ecs describe-clusters --clusters bytebank-cluster

# Status do serviço
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Tasks em execução
aws ecs list-tasks --cluster bytebank-cluster --service-name bytebank-service
```

## 🛠️ Configurações Avançadas

### Escalabilidade
```bash
# Aumentar número de instâncias
aws ecs update-service \
  --cluster bytebank-cluster \
  --service bytebank-service \
  --desired-count 4
```

### Rollback
```bash
# Listar task definitions
aws ecs list-task-definitions --family-prefix bytebank-app

# Fazer rollback para versão anterior
aws ecs update-service \
  --cluster bytebank-cluster \
  --service bytebank-service \
  --task-definition bytebank-app:REVISION_NUMBER
```

## 🔒 Segurança

### HTTPS (Opcional)
Para habilitar HTTPS, adicione um certificado SSL no Application Load Balancer:

1. Obtenha um certificado SSL via AWS Certificate Manager
2. Configure o listener HTTPS no ALB
3. Redirecione HTTP para HTTPS

### Variáveis de Ambiente
Adicione variáveis sensíveis no Task Definition ou use AWS Systems Manager Parameter Store.

## 💰 Custos Estimados

### Ambiente de Produção (mensal)
- **ECS Fargate**: ~$20-40 (2 instâncias)
- **Application Load Balancer**: ~$16
- **ECR**: ~$1-5 (dependendo do uso)
- **CloudWatch Logs**: ~$1-3
- **Total estimado**: ~$40-65/mês

### Otimização de Custos
- Use FARGATE_SPOT para reduzir custos
- Configure lifecycle policies no ECR
- Ajuste retention de logs no CloudWatch
- Use Auto Scaling para otimizar recursos

## 🆘 Troubleshooting

### Problemas Comuns

#### 1. Falha no Build Docker
```bash
# Verificar logs de build
docker build -t bytebank-app . --no-cache
```

#### 2. Falha no Deploy ECS
```bash
# Verificar eventos do serviço
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Verificar logs das tasks
aws logs tail /ecs/bytebank-app --follow
```

#### 3. Health Check Falhando
- Verifique se o endpoint `/health` está respondendo
- Confirme se a porta 80 está exposta
- Verifique Security Groups

#### 4. Load Balancer não acessível
- Verifique Security Groups
- Confirme se subnets são públicas
- Verifique Target Group health

### Comandos Úteis

```bash
# Verificar status geral
aws ecs describe-clusters --clusters bytebank-cluster
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Logs em tempo real
aws logs tail /ecs/bytebank-app --follow

# Reiniciar serviço
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment

# Conectar em task (debugging)
aws ecs execute-command \
  --cluster bytebank-cluster \
  --task TASK_ID \
  --container bytebank-frontend \
  --interactive \
  --command "/bin/sh"
```

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs no CloudWatch
2. Consulte a documentação AWS ECS
3. Abra uma issue no repositório
4. Entre em contato com a equipe DevOps

---

## 🎉 Parabéns!

Sua aplicação ByteBank está agora rodando na AWS com:
- ✅ Alta disponibilidade
- ✅ Escalabilidade automática  
- ✅ Monitoramento integrado
- ✅ Deploy automatizado
- ✅ Segurança enterprise

🌐 **Acesse sua aplicação**: `http://SEU_LOAD_BALANCER_DNS.amazonaws.com`
