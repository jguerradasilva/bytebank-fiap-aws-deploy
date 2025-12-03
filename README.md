# 🏦 ByteBank - Fintech Digital Banking Platform

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-007FFF?style=flat-square&logo=mui)](https://mui.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![AWS](https://img.shields.io/badge/AWS%20ECS-Fargate-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/ecs/)

---

## 📋 Descrição

**ByteBank** é uma aplicação bancária digital moderna desenvolvida em **React 19** com **TypeScript** e **Material-UI**, simulando funcionalidades reais de uma fintech. O projeto apresenta uma interface responsiva e intuitiva para gerenciamento de operações bancárias, com autenticação segura e integração completa com infraestrutura **AWS ECS Fargate**.

A aplicação foi desenvolvida como projeto final da turma **3FRNT** da Pós-Graduação em **Front-end Engineering** da FIAP e está **em produção**, operando com alta disponibilidade através de containerização Docker e orquestração em nuvem.

### 👥 Desenvolvido por
- **Diego Minelli** - RM362536
- **Jackson dos Santos** - RM359898
- **Jerfeson Guerra** - RM363144
- **Raul Ferreira** - RM362993
- **Thomas Aguiar** - RM363369

---

## 🎯 Propósito do Projeto

ByteBank foi desenvolvido para demonstrar competências em:

- Desenvolvimento **full-stack** de aplicações web modernas
- Arquitetura de componentes **reutilizáveis** e bem estruturados
- **Gerenciamento de estado** com Redux Toolkit
- **Autenticação** e segurança em aplicações React
- **Consumo de APIs** REST com React Query
- Containerização com **Docker** e orquestração **AWS**
- **Responsividade** e design responsivo com Material-UI
- **Documentação de componentes** com Storybook
- Integração **CI/CD** automatizada

---

## ✨ Características Principais

- 🏦 **Gerenciamento de Contas** - Visualização de saldo em conta corrente e poupança
- 📊 **Extrato Detalhado** - Agrupamento inteligente por data com edição e exclusão
- 💰 **Operações Bancárias** - Depósitos, transferências e pagamentos de boletos
- 📈 **Gráficos Interativos** - Visualização de movimentações diárias em tempo real
- 🔐 **Autenticação Segura** - Sistema de login integrado com validação
- 🎨 **UI/UX Moderna** - Design responsivo com Material-UI v7
- 📱 **Responsivo** - Otimizado para desktop, tablet e mobile
- 🧩 **Componentes Documentados** - Documentação visual com Storybook
- 🐳 **Containerizado** - Docker multi-stage para produção
- ☁️ **Cloud Ready** - Deployado em AWS ECS Fargate com alta disponibilidade

---

## 🏗️ Arquitetura & Especificações

### Stack Tecnológico

**Frontend:**
- React 19.1.0 - UI library
- TypeScript 5.8.3 - Type safety
- Vite 7.0.3 - Build tool (⚡ fast)
- Material-UI 7.2.0 - Component library
- Framer Motion - Animações suaves
- React Query - State management & data fetching
- Redux Toolkit - Gerenciamento global de estado

**Backend & APIs:**
- Express.js - API REST
- JSON Server - Mock database
- Axios - HTTP client
- CORS - Cross-origin handling

**DevTools & Testing:**
- Storybook 9.0 - Component documentation
- Vitest - Unit testing
- Playwright - E2E testing
- ESLint - Code linting
- TypeScript Compiler - Type checking

**Cloud & Infrastructure:**
- Docker - Containerização
- AWS ECS Fargate - Orquestração serverless
- AWS ECR - Container registry
- nginx - Reverse proxy

### Estrutura de Pastas

```
bytebank-fiap-aws-deploy/
├─ src/
│  ├─ components/          # Componentes reutilizáveis (Balance, Card*, etc)
│  ├─ pages/               # Páginas principais (Dashboard, Extrato, etc)
│  ├─ services/            # Camada de serviço (APIs, integrações)
│  ├─ hooks/               # React Hooks customizados
│  ├─ store/               # Redux state management
│  ├─ routes/              # Definição de rotas (públicas/privadas)
│  ├─ types/               # Tipos TypeScript globais
│  ├─ utils/               # Funções utilitárias
│  ├─ styles/              # Estilos globais e theme
│  ├─ config/              # Configurações (env, constantes)
│  ├─ stories/             # Storybook documentation
│  ├─ assets/              # Imagens e ícones
│  ├─ App.tsx              # Root component
│  └─ main.tsx             # Entry point
├─ json-server/
│  └─ db.json              # Mock database
├─ aws/
│  ├─ cloudformation.yml   # Infraestrutura IaC
│  ├─ task-definition.json # ECS task config
│  └─ deploy.bat           # Deploy automation
├─ public/                 # Static assets
├─ Dockerfile              # Production image
├─ Dockerfile.dev          # Development image
├─ docker-compose.yml      # Container orchestration
├─ nginx.conf              # Reverse proxy config
├─ vite.config.ts          # Vite configuration
├─ tsconfig.json           # TypeScript config
├─ package.json            # Dependencies
└─ README.md               # This file
```

### Fluxo de Dados

```
┌──────────────┐
│   User/UI    │
└──────┬───────┘
       │ (clicks, forms)
       ▼
┌──────────────────────┐
│ React Components     │
│ (páginas/componentes)│
└──────┬───────────────┘
       │ (queries, mutations)
       ▼
┌──────────────────────┐
│ Redux Store          │
│ (state management)   │
└──────┬───────────────┘
       │
       ├────► React Query ──► axios
       └────► Services ──────► Express/JSON Server
                              │
                              ▼
                        ┌─────────────────┐
                        │ API/Data        │
                        │ (db.json)       │
                        └─────────────────┘
```

---

## 📦 Funcionalidades em Detalhes

### 1️⃣ Dashboard Bancário
- Visualização de saldo em tempo real
- Cards informativos (saldo, poupança, investimentos)
- Gráficos de movimentação
- Quick actions para operações frequentes

### 2️⃣ Extrato Inteligente
- Lista de transações agrupada por data
- Filtros avançados (período, tipo, valor)
- Edição e exclusão de lançamentos
- Busca e ordenação
- Export de dados

### 3️⃣ Operações Bancárias
- **Depósito** - Transferência para conta corrente/poupança
- **Transferência** - Entre contas de mesmo titular
- **Boleto** - Pagamento de contas e boletos
- Validação de dados em tempo real

### 4️⃣ Autenticação & Segurança
- Login com validação DummyJSON
- Proteção de rotas privadas
- Tokens e sessões
- Logout automático
- Recuperação de senha

### 5️⃣ Componentes Reutilizáveis
- `Balance` - Exibição de saldo
- `CardComponents` - Cards genéricos
- `ButtonServices` - Botões de serviços
- `ExtratoList` - Listagem de transações
- `Chart` - Gráficos interativos
- `Input` - Campos de entrada validados
- E mais 10+ componentes documentados

---

## 🚀 Começando

### Pré-requisitos
- Node.js 16+ ou 18+
- npm ou yarn
- Docker & Docker Compose (opcional)
- AWS CLI (para deploy em produção)

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/jguerradasilva/bytebank-fiap-aws-deploy.git
cd bytebank-fiap-aws-deploy

# 2. Instale as dependências
npm install

# 3. Configure variáveis de ambiente
echo "VITE_API_AUTH=https://dummyjson.com/auth/login" > .env.local
echo "VITE_API_URL=http://localhost:3001" >> .env.local
```

### Desenvolvimento

#### Opção 1: Sem Docker (Desenvolvimento Local)

```bash
# Terminal 1: Iniciar JSON Server (API mock)
npm run dev:api

# Terminal 2: Iniciar Vite dev server
npm run dev

# Terminal 3: Iniciar Storybook (opcional)
npm run storybook
```

Aplicação: http://localhost:5173
Storybook: http://localhost:6006

#### Opção 2: Com Docker

```bash
# Desenvolvimento com hot reload
npm run docker:dev

# Acesse: http://localhost:5173
```

#### Opção 3: Todos os Serviços com Docker Compose

```bash
# Aplicação + JSON Server + nginx
docker-compose up

# Acesse: http://localhost
```

### Build & Produção

```bash
# Build para produção
npm run build

# Preview local do build
npm run preview

# Build Docker para produção
npm run docker:prod

# Acesse: http://localhost
```

---

## 📚 Documentação de Componentes

Este projeto utiliza **Storybook** para documentação visual e interativa de componentes.

### Visualizar Componentes

```bash
npm run storybook
```

Acesse: **http://localhost:6006**

Componentes documentados:
- Balance
- ButtonServices
- CardComponents
- CardInvestimentos
- CardPoupanca
- CardServicos
- CButton
- Chart
- Content
- ExtratoList
- Footer
- Header
- Input
- Navbar
- Servicos
- Title

---

## ☁️ Deploy em Produção (AWS ECS Fargate)

### Status Atual
- ✅ **ATIVO E FUNCIONANDO**
- 📍 **IP Público:** 35.153.161.237
- 🌐 **URL:** http://35.153.161.237
- 🔗 **API:** http://35.153.161.237/api/extrato
- 💰 **Custo:** ~$9/mês

### Arquitetura AWS

```
Internet
   │
   ▼
┌─────────────────────┐
│ Security Group      │ (Portas 80, 443)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ AWS ECS Cluster     │
│ bytebank-cluster    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Fargate Task        │
│ CPU: 0.25 vCPU      │
│ RAM: 0.5 GB         │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────┐
│ Docker Container         │
│ ├─ nginx (port 80)       │
│ ├─ React SPA (frontend)  │
│ └─ Express API (port 3001)
└──────────────────────────┘
```

### Especificações

| Componente | Especificação | Custo |
|-----------|---------------|-------|
| Fargate vCPU | 0.25 vCPU | $7.39/mês |
| Fargate RAM | 0.5 GB | $1.62/mês |
| Data Transfer | ~1GB/mês | $0.09/mês |
| **TOTAL** | | **~$9.00/mês** |

### Configuração AWS

```bash
# 1. Configure credenciais AWS
aws configure

# 2. Build e push da imagem
npm run docker:build
docker tag bytebank-app:latest 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com
docker push 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest

# 3. Force new deployment
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### Monitoramento

```bash
# Status do serviço
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Logs em tempo real
aws logs tail /ecs/bytebank-app --follow --region us-east-1

# Tasks em execução
aws ecs list-tasks --cluster bytebank-cluster --service-name bytebank-service

# Reiniciar (zero downtime)
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### Health Check

```bash
# Verificar saúde da aplicação
curl http://35.153.161.237/health
```

---

## 🔐 Autenticação

### Credenciais de Teste

Use qualquer uma destas credenciais para fazer login:

| Usuário | Senha |
|---------|-------|
| emilys | emilyspass |
| michaelw | michaelwpass |
| sophiab | sophiabpass |

### Fluxo de Autenticação

1. Acesse http://localhost:5173
2. Clique em "Já tenho conta" na navbar
3. Insira credenciais de teste
4. Login redirecionará para `/dashboard`
5. Use logout no header para sair

### Tecnologias

- **DummyJSON** - API de autenticação
- **Formik** - Gerenciamento de formulários
- **Yup** - Validação de schemas
- **Redux Toolkit** - Armazenamento de tokens
- **React Router** - Proteção de rotas

---

## 📋 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia Vite dev server
npm run dev:api              # Inicia JSON Server
npm run dev:full             # Inicia dev server + JSON Server

# Build & Preview
npm run build                # Build para produção
npm run preview              # Preview do build local

# Documentação
npm run storybook            # Inicia Storybook
npm run build-storybook      # Build Storybook estático

# Docker
npm run docker:dev           # Desenvolvimento com Docker
npm run docker:prod          # Produção com Docker
npm run docker:build         # Build da imagem Docker

# Qualidade de Código
npm run lint                 # Lint com ESLint

# Deploy
npm run deploy:infrastructure # Criar infraestrutura AWS
npm run deploy:aws          # Deploy em produção
```

---

## 🐳 Docker

### Desenvolvimento

```bash
npm run docker:dev
# Acesse: http://localhost:5173
# Hot reload ativado
```

### Produção

```bash
npm run docker:prod
# Acesse: http://localhost
# Otimizado e pronto para produção
```

### Docker Compose (Completo)

```bash
docker-compose up
# App + JSON Server + nginx
```

### Dockerfile Multi-Stage

```dockerfile
# Stage 1: Build React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx vite build

# Stage 2: Produção
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

---

## 🛠️ Troubleshooting

### Porta 3001 em Uso
```bash
# Matar processo na porta 3001
lsof -ti:3001 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3001   # Windows (Power Shell)
```

### Limpar Cache do npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Variáveis de Ambiente Não Detectadas
```bash
# Verificar arquivo .env
cat .env.local

# Restart dev server após mudanças em .env
```

### Docker Não Funciona
```bash
# Verificar Docker daemon
docker ps

# Rebuild sem cache
docker build --no-cache -t bytebank-app .
```

---

## 📊 Tecnologias em Detalhes

### Frontend Stack

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19.1.0 | UI Framework |
| TypeScript | 5.8.3 | Type Safety |
| Vite | 7.0.3 | Build Tool |
| Material-UI | 7.2.0 | Component Library |
| Redux Toolkit | 2.8.2 | State Management |
| React Query | 5.82.0 | Data Fetching |
| Framer Motion | 12.23.12 | Animations |
| Recharts | 3.1.0 | Charts |
| React Router | 7.7.1 | Routing |
| Axios | 1.10.0 | HTTP Client |
| date-fns | 4.1.0 | Date Utilities |

### DevTools

| Ferramenta | Versão | Propósito |
|----------|--------|----------|
| Storybook | 9.0.16 | Component Docs |
| Vitest | 3.2.4 | Unit Testing |
| Playwright | 1.54.1 | E2E Testing |
| ESLint | 9.30.1 | Code Linting |

### Cloud & Infra

| Serviço | Especificação | Região |
|--------|---------------|--------|
| ECS Fargate | 0.25 vCPU / 0.5GB RAM | us-east-1 |
| ECR | Private Registry | us-east-1 |
| CloudWatch | Logs & Monitoring | us-east-1 |

---

## 🎓 Aprendizados & Boas Práticas

### Padrões Implementados

1. **Component Composition** - Componentes pequenos e reutilizáveis
2. **Custom Hooks** - Lógica reutilizável com `useQueryExtrato` e similares
3. **Type Safety** - Full TypeScript coverage
4. **State Management** - Redux Toolkit com slices
5. **API Integration** - React Query + Axios
6. **Error Handling** - Try/catch e error boundaries
7. **Performance** - Code splitting, lazy loading, memoization
8. **Acessibilidade** - WCAG compliance com Material-UI
9. **Responsividade** - Mobile-first approach

### Decisões Arquiteturais

- **Material-UI** escolhido por: component library completa, tema customizável, suporte a acessibilidade
- **Vite** escolhido por: performance superior, fast HMR, bundle size otimizado
- **Redux Toolkit** escolhido por: simplificado vs Redux puro, menos boilerplate
- **React Query** escolhido por: caching automático, sincronização de dados, devtools
- **ECS Fargate** escolhido por: serverless, custo-benefício, escalabilidade automática

---

## 🔗 Links Úteis

- 🌐 [Aplicação em Produção](http://35.153.161.237)
- 📱 [Storybook](http://localhost:6006)
- 🎨 [Design Figma](https://www.figma.com/design/06sUi5crvAO4JuQHdGkdo2/Tech-Challenge)
- 📚 [React Docs](https://react.dev)
- 🎯 [Material-UI Docs](https://mui.com)
- ⚡ [Vite Docs](https://vitejs.dev)
- 📖 [TypeScript Docs](https://www.typescriptlang.org)
- ☁️ [AWS ECS Docs](https://docs.aws.amazon.com/ecs)

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 💬 Suporte

Para dúvidas ou problemas:

1. Verifique a seção [Troubleshooting](#-troubleshooting)
2. Abra uma [Issue](https://github.com/jguerradasilva/bytebank-fiap-aws-deploy/issues)
3. Contacte a equipe de desenvolvimento

---

## ✅ Checklist de Desenvolvimento

- [x] Prototipagem com Figma
- [x] Configuração inicial (Vite + React + TypeScript)
- [x] Setup Material-UI e temas
- [x] Desenvolvimento de componentes reutilizáveis
- [x] Integração com APIs (JSON Server + DummyJSON)
- [x] Autenticação e proteção de rotas
- [x] Gerenciamento de estado (Redux Toolkit)
- [x] Documentação com Storybook
- [x] Containerização (Docker multi-stage)
- [x] Deploy em AWS ECS Fargate
- [x] Monitoramento e logs (CloudWatch)
- [x] CI/CD automatizado
- [x] Testes unitários (Vitest)
- [x] Testes E2E (Playwright)

---

**Desenvolvido com ❤️ pela turma 3FRNT | FIAP**

Última atualização: Dezembro 2025
