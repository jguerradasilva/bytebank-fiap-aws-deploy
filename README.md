# 🏦 ByteBank - Fintech Digital Banking Platform

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.2.0-007FFF?style=flat-square&logo=mui)](https://mui.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![AWS](https://img.shields.io/badge/AWS%20ECS-Fargate-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/ecs/)

---

## 📋 Description

**ByteBank** is a modern digital banking application developed with **React 19**, **TypeScript**, and **Material-UI**, simulating real fintech functionalities. The project features a responsive and intuitive interface for banking operations management, with secure authentication and complete integration with **AWS ECS Fargate** infrastructure.

The application was developed as a final project for the **3FRNT** class of FIAP's **Front-end Engineering** Graduate Program and is **in production**, operating with high availability through Docker containerization and cloud orchestration.

### 👥 Developed by
- **Diego Minelli** - RM362536
- **Jackson dos Santos** - RM359898
- **Jerfeson Guerra** - RM363144
- **Raul Ferreira** - RM362993
- **Thomas Aguiar** - RM363369

---

## 🎯 Project Purpose

ByteBank was developed to demonstrate competencies in:

- Modern **full-stack** web application development
- **Reusable** and well-structured component architecture
- **State management** with Redux Toolkit
- **Authentication** and security in React applications
- **REST API consumption** with React Query
- **Docker** containerization and **AWS** orchestration
- **Responsiveness** and responsive design with Material-UI
- **Component documentation** with Storybook
- Automated **CI/CD** integration

---

## ✨ Key Features

- 🏦 **Account Management** - Balance view for checking and savings accounts
- 📊 **Detailed Statement** - Smart grouping by date with editing and deletion
- 💰 **Banking Operations** - Deposits, transfers, and bill payments
- 📈 **Interactive Charts** - Real-time visualization of daily transactions
- 🔐 **Secure Authentication** - Integrated login system with validation
- 🎨 **Modern UI/UX** - Responsive design with Material-UI v7
- 📱 **Responsive** - Optimized for desktop, tablet, and mobile
- 🧩 **Documented Components** - Visual documentation with Storybook
- 🐳 **Containerized** - Multi-stage Docker for production
- ☁️ **Cloud Ready** - Deployed on AWS ECS Fargate with high availability

---

## 🏗️ Architecture & Specifications

### Technology Stack

**Frontend:**
- React 19.1.0 - UI library
- TypeScript 5.8.3 - Type safety
- Vite 7.0.3 - Build tool (⚡ fast)
- Material-UI 7.2.0 - Component library
- Framer Motion - Smooth animations
- React Query - State management & data fetching
- Redux Toolkit - Global state management

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
- Docker - Containerization
- AWS ECS Fargate - Serverless orchestration
- AWS ECR - Container registry
- nginx - Reverse proxy

### Folder Structure

```
bytebank-fiap-aws-deploy/
├─ src/
│  ├─ components/          # Reusable components (Balance, Card*, etc)
│  ├─ pages/               # Main pages (Dashboard, Statement, etc)
│  ├─ services/            # Service layer (APIs, integrations)
│  ├─ hooks/               # Custom React Hooks
│  ├─ store/               # Redux state management
│  ├─ routes/              # Route definitions (public/private)
│  ├─ types/               # Global TypeScript types
│  ├─ utils/               # Utility functions
│  ├─ styles/              # Global styles and theme
│  ├─ config/              # Configurations (env, constants)
│  ├─ stories/             # Storybook documentation
│  ├─ assets/              # Images and icons
│  ├─ App.tsx              # Root component
│  └─ main.tsx             # Entry point
├─ json-server/
│  └─ db.json              # Mock database
├─ aws/
│  ├─ cloudformation.yml   # IaC infrastructure
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

### Data Flow

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

## 📦 Features in Detail

### 1️⃣ Banking Dashboard
- Real-time balance viewing
- Informative cards (balance, savings, investments)
- Transaction charts
- Quick actions for frequent operations

### 2️⃣ Smart Statement
- Transaction list grouped by date
- Advanced filters (period, type, amount)
- Entry editing and deletion
- Search and sorting
- Data export

### 3️⃣ Banking Operations
- **Deposit** - Transfer to checking/savings account
- **Transfer** - Between accounts of the same holder
- **Bill Payment** - Account and bill payments
- Real-time data validation

### 4️⃣ Authentication & Security
- Login with DummyJSON validation
- Private route protection
- Tokens and sessions
- Automatic logout
- Password recovery

### 5️⃣ Reusable Components
- `Balance` - Balance display
- `CardComponents` - Generic cards
- `ButtonServices` - Service buttons
- `ExtratoList` - Transaction listing
- `Chart` - Interactive charts
- `Input` - Validated input fields
- Plus 10+ documented components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or 18+
- npm or yarn
- Docker & Docker Compose (optional)
- AWS CLI (for production deployment)

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/jguerradasilva/bytebank-fiap-aws-deploy.git
cd bytebank-fiap-aws-deploy

# 2. Install dependencies
npm install

# 3. Configure environment variables
echo "VITE_API_AUTH=https://dummyjson.com/auth/login" > .env.local
echo "VITE_API_URL=http://localhost:3001" >> .env.local
```

### Development

#### Option 1: Without Docker (Local Development)

```bash
# Terminal 1: Start JSON Server (mock API)
npm run dev:api

# Terminal 2: Start Vite dev server
npm run dev

# Terminal 3: Start Storybook (optional)
npm run storybook
```

Application: http://localhost:5173
Storybook: http://localhost:6006

#### Option 2: With Docker

```bash
# Development with hot reload
npm run docker:dev

# Access: http://localhost:5173
```

#### Option 3: All Services with Docker Compose

```bash
# Application + JSON Server + nginx
docker-compose up

# Access: http://localhost
```

### Build & Production

```bash
# Build for production
npm run build

# Local build preview
npm run preview

# Docker build for production
npm run docker:prod

# Access: http://localhost
```

---

## 📚 Component Documentation

This project uses **Storybook** for visual and interactive component documentation.

### View Components

```bash
npm run storybook
```

Access: **http://localhost:6006**

Documented components:
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

## ☁️ Production Deployment (AWS ECS Fargate)

### Current Status
- ✅ **ACTIVE AND RUNNING**
- 📍 **Public IP:** 35.153.161.237
- 🌐 **URL:** http://35.153.161.237
- 🔗 **API:** http://35.153.161.237/api/extrato
- 💰 **Cost:** ~$9/month

### AWS Architecture

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

### Specifications

| Component | Specification | Cost |
|-----------|---------------|------|
| Fargate vCPU | 0.25 vCPU | $7.39/month |
| Fargate RAM | 0.5 GB | $1.62/month |
| Data Transfer | ~1GB/month | $0.09/month |
| **TOTAL** | | **~$9.00/month** |

### AWS Configuration

```bash
# 1. Configure AWS credentials
aws configure

# 2. Build and push image
npm run docker:build
docker tag bytebank-app:latest 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 307987836348.dkr.ecr.us-east-1.amazonaws.com
docker push 307987836348.dkr.ecr.us-east-1.amazonaws.com/bytebank-app:latest

# 3. Force new deployment
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### Monitoring

```bash
# Service status
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Real-time logs
aws logs tail /ecs/bytebank-app --follow --region us-east-1

# Running tasks
aws ecs list-tasks --cluster bytebank-cluster --service-name bytebank-service

# Restart (zero downtime)
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

### Health Check

```bash
# Check application health
curl http://35.153.161.237/health
```

---

## 🔐 Authentication

### Test Credentials

Use any of these credentials to login:

| Username | Password |
|---------|-------|
| emilys | emilyspass |
| michaelw | michaelwpass |
| sophiab | sophiabpass |

### Authentication Flow

1. Access http://localhost:5173
2. Click "Já tenho conta" in the navbar
3. Enter test credentials
4. Login will redirect to `/dashboard`
5. Use logout in header to sign out

### Technologies

- **DummyJSON** - Authentication API
- **Formik** - Form management
- **Yup** - Schema validation
- **Redux Toolkit** - Token storage
- **React Router** - Route protection

---

## 📋 Available Scripts

```bash
# Development
npm run dev                    # Start Vite dev server
npm run dev:api              # Start JSON Server
npm run dev:full             # Start dev server + JSON Server

# Build & Preview
npm run build                # Build for production
npm run preview              # Preview local build

# Documentation
npm run storybook            # Start Storybook
npm run build-storybook      # Build static Storybook

# Docker
npm run docker:dev           # Development with Docker
npm run docker:prod          # Production with Docker
npm run docker:build         # Build Docker image

# Code Quality
npm run lint                 # Lint with ESLint

# Deploy
npm run deploy:infrastructure # Create AWS infrastructure
npm run deploy:aws          # Deploy to production
```

---

## 🐳 Docker

### Development

```bash
npm run docker:dev
# Access: http://localhost:5173
# Hot reload enabled
```

### Production

```bash
npm run docker:prod
# Access: http://localhost
# Optimized and production-ready
```

### Docker Compose (Complete)

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

### Port 3001 in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3001   # Windows (Power Shell)
```

### Clear npm Cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Detected
```bash
# Check .env file
cat .env.local

# Restart dev server after .env changes
```

### Docker Not Working
```bash
# Check Docker daemon
docker ps

# Rebuild without cache
docker build --no-cache -t bytebank-app .
```

---

## 📊 Technologies in Detail

### Frontend Stack

| Technology | Version | Usage |
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

| Tool | Version | Purpose |
|----------|--------|----------|
| Storybook | 9.0.16 | Component Docs |
| Vitest | 3.2.4 | Unit Testing |
| Playwright | 1.54.1 | E2E Testing |
| ESLint | 9.30.1 | Code Linting |

### Cloud & Infra

| Service | Specification | Region |
|--------|---------------|--------|
| ECS Fargate | 0.25 vCPU / 0.5GB RAM | us-east-1 |
| ECR | Private Registry | us-east-1 |
| CloudWatch | Logs & Monitoring | us-east-1 |

---

## 🎓 Learnings & Best Practices

### Implemented Patterns

1. **Component Composition** - Small and reusable components
2. **Custom Hooks** - Reusable logic with `useQueryExtrato` and similar
3. **Type Safety** - Full TypeScript coverage
4. **State Management** - Redux Toolkit with slices
5. **API Integration** - React Query + Axios
6. **Error Handling** - Try/catch and error boundaries
7. **Performance** - Code splitting, lazy loading, memoization
8. **Accessibility** - WCAG compliance with Material-UI
9. **Responsiveness** - Mobile-first approach

### Architectural Decisions

- **Material-UI** chosen for: complete component library, customizable theme, accessibility support
- **Vite** chosen for: superior performance, fast HMR, optimized bundle size
- **Redux Toolkit** chosen for: simplified vs pure Redux, less boilerplate
- **React Query** chosen for: automatic caching, data synchronization, devtools
- **ECS Fargate** chosen for: serverless, cost-effectiveness, automatic scalability

---

## 🔗 Useful Links

- 🌐 [Production Application](http://35.153.161.237)
- 📱 [Storybook](http://localhost:6006)
- 🎨 [Figma Design](https://www.figma.com/design/06sUi5crvAO4JuQHdGkdo2/Tech-Challenge)
- 📚 [React Docs](https://react.dev)
- 🎯 [Material-UI Docs](https://mui.com)
- ⚡ [Vite Docs](https://vitejs.dev)
- 📖 [TypeScript Docs](https://www.typescriptlang.org)
- ☁️ [AWS ECS Docs](https://docs.aws.amazon.com/ecs)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💬 Support

For questions or issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/jguerradasilva/bytebank-fiap-aws-deploy/issues)
3. Contact the development team

---

## ✅ Development Checklist

- [x] Prototyping with Figma
- [x] Initial setup (Vite + React + TypeScript)
- [x] Material-UI and themes setup
- [x] Reusable component development
- [x] API integration (JSON Server + DummyJSON)
- [x] Authentication and route protection
- [x] State management (Redux Toolkit)
- [x] Documentation with Storybook
- [x] Containerization (Docker multi-stage)
- [x] Deployment on AWS ECS Fargate
- [x] Monitoring and logs (CloudWatch)
- [x] Automated CI/CD
- [x] Unit tests (Vitest)
- [x] E2E tests (Playwright)

---

Last updated: December 2025
