# 🚀 Setup CI/CD Pipeline - GitHub Actions + AWS

## 📋 Visão Geral
Este documento orienta a configuração completa do pipeline CI/CD automatizado com GitHub Actions e AWS ECS.

## 🔑 Configuração dos Secrets no GitHub

### 1. Acessar GitHub Secrets
1. Vá para o repositório no GitHub
2. Clique em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**

### 2. Secrets Necessários

#### AWS_ACCESS_KEY_ID
```
Nome: AWS_ACCESS_KEY_ID
Valor: Sua Access Key do AWS IAM
```

#### AWS_SECRET_ACCESS_KEY
```
Nome: AWS_SECRET_ACCESS_KEY
Valor: Sua Secret Key do AWS IAM
```

## 🔒 Configuração de Environment Protection

### 1. Criar Environment
1. Vá para **Settings** → **Environments**
2. Clique em **New environment**
3. Nome: `production`
4. Configure as regras:
   - ✅ **Required reviewers**: Adicione seu usuário
   - ✅ **Wait timer**: 0 minutes (ou conforme necessário)
   - ✅ **Environment secrets**: Use os mesmos secrets configurados acima

## 🏗️ Como Funciona o Pipeline

### Triggers
- ✅ **Push na branch master**: Deploy automático
- ✅ **Pull Request**: Apenas testes (sem deploy)
- ✅ **Workflow Dispatch**: Deploy manual via interface GitHub

### Estágios

#### 🧪 Stage 1: Test & Quality Checks
- Checkout do código
- Setup Node.js 18
- Instalação de dependências
- Execução de testes
- Linting
- Build da aplicação
- Auditoria de segurança

#### 🏗️ Stage 2: Build Docker Image
- Checkout do código
- Configuração AWS
- Login no ECR
- Build da imagem Docker
- Push para ECR com tags (SHA + latest)

#### 🚀 Stage 3: Deploy to AWS ECS
- Checkout do código
- Configuração AWS
- Atualização da task definition
- Deploy no ECS Fargate
- Verificação do deployment
- Notificação de status

## 🛡️ Segurança Implementada

### Branch Protection
- ✅ **CODEOWNERS**: Apenas o owner pode aprovar merges
- ✅ **Environment Protection**: Deploy requer aprovação
- ✅ **Secrets**: Credenciais AWS protegidas

### Access Control
- ✅ **Colaboradores**: Podem fazer push e PR
- ✅ **Merge**: Apenas owner pode fazer merge
- ✅ **Deploy**: Apenas owner pode aprovar deploy

## 📊 Monitoramento

### GitHub Actions
- Status do pipeline em tempo real
- Logs detalhados de cada step
- Histórico de deployments

### AWS Console
- ECS Service Status
- CloudWatch Logs
- ECR Repository Images

## 🔄 Fluxo de Trabalho

### Para Colaboradores
1. `git checkout -b feature/nova-funcionalidade`
2. Desenvolver e testar localmente
3. `git push origin feature/nova-funcionalidade`
4. Criar Pull Request
5. Pipeline executa testes automaticamente
6. Owner revisa e aprova merge

### Para Deploy
1. Merge aprovado na master
2. Pipeline automático:
   - Testes ✅
   - Build da imagem ✅
   - Deploy (aguarda aprovação) ⏳
3. Owner aprova deploy
4. Aplicação live em produção ✅

## 🚨 Comandos de Emergência

### Re-deploy Manual
```bash
# Via GitHub UI
Repository → Actions → CI/CD Pipeline → Run workflow → master → Run
```

### Rollback via AWS CLI
```bash
# Listar deployments
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Rollback para versão anterior (se necessário)
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --task-definition bytebank-task:PREVIOUS_REVISION
```

## 🔗 URLs Importantes

- **Aplicação**: http://34.204.75.66
- **AWS ECS Console**: https://console.aws.amazon.com/ecs/
- **GitHub Actions**: https://github.com/SEU_USUARIO/REPO/actions
- **ECR Repository**: https://console.aws.amazon.com/ecr/

## ✅ Checklist de Setup

- [ ] Secrets configurados no GitHub
- [ ] Environment "production" criado
- [ ] CODEOWNERS funcionando
- [ ] Pipeline testado com commit
- [ ] Deploy aprovado e funcionando
- [ ] Colaboradores adicionados
- [ ] Monitoramento ativo

---

**Status**: ✅ CI/CD Pipeline configurado e pronto para uso!
