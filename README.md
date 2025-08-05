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

## Deploy na AWS

### Pré-requisitos
- Conta AWS ativa
- AWS CLI instalado e configurado
- Docker Desktop rodando

### Configuração AWS CLI
```bash
# Instalar AWS CLI (Windows)
winget install Amazon.AWSCLI

# Configurar credenciais
aws configure
```

### Deploy Automatizado

1. **Criar infraestrutura (primeira vez):**
   ```bash
   npm run deploy:infrastructure
   ```

2. **Deploy da aplicação:**
   ```bash
   npm run deploy:aws
   ```

### Deploy Manual
```bash
# Executar script de deploy
cd aws
deploy.bat production us-east-1
```

### Health Check
Após o deploy, verifique: `http://SEU_LOAD_BALANCER_DNS/health`

### Comandos Úteis AWS
```bash
# Ver logs da aplicação
aws logs tail /ecs/bytebank-app --follow

# Status do serviço
aws ecs describe-services --cluster bytebank-cluster --services bytebank-service

# Reiniciar serviço
aws ecs update-service --cluster bytebank-cluster --service bytebank-service --force-new-deployment
```

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

## Licença

Projeto desenvolvido para fins educacionais no Tech Challenge FIAP. Pós Graduação em Front-end Engeniering
