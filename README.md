# Tech Bank App

Este projeto foi desenvolvido pelos alunos:
 - Diego Minelli - RM362536
 - Jackson dos Santos - RM359898
 - Jerfeson Guerra - RM363144
 - Raul Ferreira - RM362993
 - Thomas Aguiar - RM363369

Matriculados na turma 3FRNT da Pós Graduação em Front-end Engeniering da FIAP.

O Tech Bank App é uma aplicação bancária digital desenvolvida em [React](https://react.dev) com Material UI, simulando funcionalidades de uma fintech. O projeto permite visualizar saldo, extrato, realizar depósitos, transferências, pagamentos de boletos e acessar outros serviços de uma conta bancária.
Decidimos também reimaginar em alguns pontos o layout proposto ara o projeto, que pode ser encontrato nesse projeto do [Figma](https://www.figma.com/design/06sUi5crvAO4JuQHdGkdo2/Tech-Challenge?node-id=0-1&p=f&t=GN8a2pifAUeCwBl0-0)

## Funcionalidades
  As principais funcionalidades do projeto são:

- Visualização de saldo em conta corrente e poupança
- Extrato detalhado com agrupamento por data, edição e exclusão de lançamentos
- Depósito em conta corrente ou poupança
- Transferência entre contas
- Pagamento de boletos
- Gráfico com movimentações diárias
- Filtros na aba de extrato
- Listagem de serviços adicionais
- Interface responsiva e moderna

## Tecnologias Utilizadas

- [React](https://react.dev)
- [Material UI](https://mui.com)
- [json-server](https://github.com/typicode/json-server) (mock API)
- [Docker](https://www.docker.com) (containerização)
- [AWS ECS](https://aws.amazon.com/ecs/) (deploy em produção)

## Como rodar o projeto

1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de dados (json-server):**
   ```bash
   npm install -g json-server
   json-server --watch json-server/db.json --port 3001
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador. Após abrir a aplicação no seu navegador, aparecerá uma tela inicial informativa sobre o Bytebank, para acessar a parte transacional do projeto, clique em "Já tenho conta".

## Documentação de Componentes com Storybook

Este projeto utiliza o [Storybook](https://storybook.js.org/) para documentar e visualizar os componentes de interface de forma isolada.

### O que foi feito

- **Configuração do Storybook** integrada ao projeto Next.js.
- **Stories criados** para os principais componentes da pasta `src/components`, permitindo visualizar exemplos, estados e variações.

### Como rodar o Storybook

1. Inicie o Storybook:
   ```bash
   npm run storybook
   ```

2. Acesse o Storybook no navegador:
   ```
   http://localhost:6006
   ```

## Executar com Docker

### Desenvolvimento
```bash
# Executar em modo desenvolvimento com hot reload
npm run docker:dev
```
Acesse: [http://localhost:5173](http://localhost:5173)

### Produção Local
```bash
# Executar build de produção
npm run docker:prod
```
Acesse: [http://localhost](http://localhost)

### Docker Compose (App + API)
```bash
# Executar aplicação completa com JSON Server
docker-compose up
```

## Deploy na AWS com ECS Fargate

### Aplicação em Produção
- **Status:** ✅ ATIVO e FUNCIONANDO
- **Plataforma:** AWS ECS Fargate
- **IP Público:** `35.153.161.237`
- **URL de Acesso:** http://35.153.161.237
- **API Endpoint:** http://35.153.161.237/api/extrato

### Arquitetura AWS

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ECS Cluster   │ ➜  │  Fargate Task   │ ➜  │   Application   │
│ bytebank-cluster│    │  CPU: 0.25 vCPU │    │ Frontend + API  │
│                 │    │  RAM: 0.5 GB    │    │ Port 80 Public  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Especificações Técnicas
- **Compute:** AWS Fargate (Serverless)
- **CPU:** 0.25 vCPU
- **Memória:** 0.5 GB RAM
- **Networking:** VPC pública
- **Container:** Docker multi-stage (nginx + Node.js)
- **Health Check:** Endpoint `/health` com monitoramento

### Custos de Operação
| Recurso | Especificação | Custo Mensal |
|---------|---------------|--------------|
| Fargate vCPU | 0.25 vCPU | $7.39 |
| Fargate RAM | 0.5 GB | $1.62 |
| Data Transfer | ~1GB/mês | $0.09 |
| **TOTAL** | | **$9.01/mês** |

### Componentes AWS Implementados

**ECS (Elastic Container Service)**
- Cluster: `bytebank-cluster`
- Service: `bytebank-service` (1 instância)
- Task Definition: `bytebank-app:9` (versão atual)
- Launch Type: Fargate (serverless)

**ECR (Elastic Container Registry)**
- Repository: `bytebank-app`
- Image: Multi-stage Docker build
- Tagging: `latest` (produção)

**VPC & Networking**
- Subnets: Públicas em múltiplas AZs
- Security Groups: Portas 80, 443 abertas
- IP Público: Atribuído automaticamente

### Containerização

**Dockerfile Multi-Stage**
```dockerfile
# Stage 1: Build React App
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx vite build

# Stage 2: Production (nginx + Node.js)
FROM nginx:alpine
RUN apk add --no-cache nodejs npm
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/api-server.js /app/
COPY --from=build /app/json-server /app/json-server
COPY nginx.conf /etc/nginx/nginx.conf
COPY startup.sh /app/startup.sh
EXPOSE 80
CMD ["/app/startup.sh"]
```

**Arquitetura do Container**
- Frontend: React app servido pelo nginx
- Backend: Express.js API na porta 3001
- Proxy: nginx reverse proxy (80 → 3001)
- Dados: JSON local persistente

### Pré-requisitos
- Conta AWS ativa
- AWS CLI instalado e configurado
- Docker Desktop rodando
- Credenciais IAM com permissões ECS/ECR

### Configuração AWS CLI
```bash
# Instalar AWS CLI (Windows)
winget install Amazon.AWSCLI

# Configurar credenciais
aws configure
```

### Deploy em Produção
```bash
# 1. Build e push da imagem
npm run docker:build
docker tag bytebank-app:latest 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com
docker push 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest

# 2. Atualizar serviço ECS
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### Deploy Automatizado
```bash
# Script completo de deploy
cd aws
deploy.bat production us-east-1
```

### Health Check
Após o deploy, verifique: `http://34.204.75.66/health`

### Monitoramento e Logs
```bash
# Status do serviço
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Logs da aplicação
aws logs tail /ecs/bytebank-app --follow --region us-east-1

# Tasks em execução
aws ecs list-tasks --cluster bytebank-cluster --service-name bytebank-service

# Reiniciar serviço (zero downtime)
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### DNS Gratuito com Duck DNS
Para configurar um domínio gratuito:

1. **Acesse:** https://www.duckdns.org
2. **Login:** com Google, GitHub ou Twitter
3. **Configure:**
   - subdomain: `bytebank`
   - ip: `34.204.75.66`
4. **URLs funcionais:**
   - http://bytebank.duckdns.org
   - http://bytebank.duckdns.org/api/extrato

### Vantagens do Fargate
- Serverless: Sem servidores para gerenciar
- Auto-scaling: Escalabilidade automática
- Alta disponibilidade: Multi-AZ por padrão
- Segurança: Isolamento de containers
- Pay-per-use: Pagamento por uso real

## Estrutura do Projeto

src/
├─ assets/         # Imagens e ícones
├─ components/     # Componentes reutilizáveis da interface
├─ config/         # Configurações e variáveis de ambiente
├─ hooks/          # Ganchos para consultas de dados
├─ pages/          # Páginas principais (dashboard, extrato, etc)
├─ routes/         # Definição de rotas do sistema
├─ services/       # Camada de serviço (APIs, integrações)
├─ store/          # Gerenciamento de estado (Redux)
├─ types/          # Tipagens TypeScript
├─ utils/          # Funções utilitárias e constantes
├─ stories/        # Documentação visual de componentes
aws/
├─ cloudformation.yml    # Infraestrutura AWS
├─ task-definition.json  # Configuração ECS
├─ deploy.bat           # Script deploy Windows
└─ deploy.sh            # Script deploy Linux
.github/workflows/      # CI/CD automatizado
json-server/
└─ db.json         # Base de dados mockada (extratos e operações)

## Observações

- O projeto utiliza o `json-server` para simular uma API REST. Certifique-se de deixá-lo rodando para que as operações funcionem corretamente.
- Os dados não são persistidos em um banco real, apenas no arquivo `db.json`.
- Para deploy em produção, consulte a documentação completa em `DEPLOY-AWS.md`.
- O health check está disponível em `/health` para monitoramento.

## Scripts Disponíveis

```bash
npm run dev                    # Servidor desenvolvimento
npm run build                  # Build produção
npm run preview               # Preview build local
npm run storybook             # Documentação componentes
npm run docker:dev            # Docker desenvolvimento
npm run docker:prod           # Docker produção
npm run deploy:infrastructure # Criar infraestrutura AWS
npm run deploy:aws           # Deploy na AWS
```

## 🔐 Sistema de Autenticação

O projeto agora inclui um sistema completo de autenticação integrado com a API DummyJSON.

### Funcionalidades de Autenticação
- Login modal integrado na página inicial
- Proteção de rotas privadas 
- Gerenciamento de estado com Redux Toolkit
- Logout automático
- Redirecionamento baseado no status de autenticação

### Credenciais de Teste (DummyJSON)
Para testar o sistema de autenticação, use uma das seguintes credenciais:

```
Usuário: emilys
Senha: emilyspass

Usuário: michaelw  
Senha: michaelwpass

Usuário: sophiab
Senha: sophiabpass
```

### Como Usar
1. Acesse a página inicial (`/home`)
2. Clique em "Já tenho conta" na navbar
3. Insira uma das credenciais de teste
4. Será redirecionado para o dashboard após login bem-sucedido
5. Use o botão de logout no header para sair

### Configuração da API
Adicione a seguinte variável ao seu arquivo `.env`:
```env
VITE_API_AUTH=https://dummyjson.com/auth/login
```

### Estrutura das Rotas
- **Rotas Públicas**: `/home`, `/` (landing page com navbar e login)
- **Rotas Privadas**: `/dashboard`, `/extrato`, `/deposito`, `/transferir`, `/boleto`
- **Proteção**: Usuários não autenticados são redirecionados para `/home`

## 📦 Dependências Adicionadas para Autenticação

```json
{
  "formik": "^2.4.5",
  "yup": "^1.4.0"
}
```

Instale com:
```bash
npm install formik yup
```
#   T e s t   C I / C D 
 

 
