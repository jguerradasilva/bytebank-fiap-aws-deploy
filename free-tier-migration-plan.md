# Plano de Migração para Free Tier + DNS Gratuito

## 1. MIGRAÇÃO PARA EC2 FREE TIER

### Recursos inclusos no Free Tier:
- ✅ EC2 t2.micro: 750 horas/mês (24/7 por 1 instância)
- ✅ 30GB EBS gp2 storage
- ✅ Route 53: 1 hosted zone gratuita (se usar domínio .tk, .ml, .ga, .cf)
- ✅ ALB: NÃO está no free tier
- ✅ Classic Load Balancer: 750 horas/mês

### Arquitetura proposta (Free Tier):
```
Internet
    ↓
EC2 t2.micro (Free Tier)
├── Docker Compose
│   ├── nginx (port 80)
│   └── node.js API (port 3001)
└── DNS gratuito (Freenom + Route 53)
```

## 2. OPÇÕES DE DNS GRATUITO

### Opção A: Freenom + Route 53 (Totalmente gratuito)
- Domínio .tk, .ml, .ga, .cf gratuito por 12 meses
- Route 53 hosted zone gratuita para 1 domínio
- Exemplo: bytebank.tk, bytebank.ml

### Opção B: NoIP (Dinâmico gratuito)
- Subdomínio gratuito: bytebank.ddns.net
- Renovação manual a cada 30 dias
- Sem custos

### Opção C: Cloudflare (Gratuito)
- Requer domínio próprio ($10-15/ano)
- DNS gratuito + CDN + SSL

## 3. IMPLEMENTAÇÃO RECOMENDADA

### Passo 1: Criar EC2 t2.micro
- AMI: Amazon Linux 2
- Instance type: t2.micro
- Storage: 8GB gp2 (dentro do free tier)
- Security Group: HTTP (80), HTTPS (443), SSH (22)

### Passo 2: DNS Gratuito com Freenom
1. Registrar domínio .tk em freenom.com
2. Configurar Route 53 hosted zone
3. Apontar nameservers do Freenom para Route 53

### Passo 3: Deploy com Docker Compose
- Usar docker-compose.yml em vez de ECS
- Nginx + Node.js no mesmo container ou containers separados
- SSL gratuito com Let's Encrypt

## 4. ESTIMATIVA DE CUSTOS

### Atual (Fargate):
- Fargate: ~$30/mês
- ECR: Gratuito (dentro do limite)
- **Total: ~$30/mês**

### Proposta (EC2 Free Tier):
- EC2 t2.micro: $0 (free tier)
- EBS 8GB: $0 (free tier)
- Route 53: $0 (1 hosted zone gratuita)
- Domínio Freenom: $0
- **Total: $0/mês (12 meses free tier)**
