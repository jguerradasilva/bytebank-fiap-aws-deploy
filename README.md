# Tech Bank App

Este projeto foi desenvolvido pelos alunos:
 - Diego Minelli - RM362536
 - Jackson dos Santos - RM359898
 - Jefferson Guerra - RM363144
 - Raul Ferreira - RM362993
 - Thomas Aguiar - RM363369

Matriculados na turma 3FRNT da Pós Graduação em Front-end Engeniering da FIAP.

O Tech Bank App é uma aplicação bancária digital desenvolvida em [React](https://react.dev) com Material UI, simulando funcionalidades de uma fintech. O projeto permite visualizar saldo, extrato, realizar depósitos, transferências, pagamentos de boletos e acessar outros serviços de uma conta bancária.
Decidimos também reimaginar em alguns pontos o layout proposto ara o projeto, que pode ser encontrato nesse projeto do [Figma](https://www.figma.com/design/06sUi5crvAO4JuQHdGkdo2/Tech-Challenge?node-id=0-1&p=f&t=GN8a2pifAUeCwBl0-0)

## 🚀 Otimizações de Performance (Branch: lazy-loading-implementation)

Esta branch contém melhorias significativas de performance implementadas:

### Lazy Loading de Rotas
- **React.lazy()** e **Suspense** para carregamento sob demanda
- Redução do bundle inicial
- Carregamento mais rápido da aplicação
- Loading component durante transições de página

### Otimização de Cache (React Query)
- **staleTime**: 5 minutos (reduz refetches desnecessários)
- **gcTime**: 10 minutos (mantém dados em cache)
- **refetchOnMount**: false (evita requisições duplicadas)
- **retry**: configuração inteligente de tentativas

### Custom Hooks
- **useDebounce**: 500ms delay para inputs de busca/filtro
- Reduz chamadas de API durante digitação

### Componentes de Loading
- **Skeleton screens** para melhor UX
- CardSkeleton, ListSkeleton, ChartSkeleton, TableSkeleton

### Validações Aprimoradas
- Validação síncrona e assíncrona no formulário de login
- Feedback visual imediato para o usuário

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

- [React 19.1.0](https://react.dev)
- [Vite 7.2.7](https://vitejs.dev)
- [Material UI 7.2.0](https://mui.com)
- [React Router 7.7.1](https://reactrouter.com)
- [Redux Toolkit 2.8.2](https://redux-toolkit.js.org)
- [TanStack React Query 5.82.0](https://tanstack.com/query)
- [Formik](https://formik.org) + [Yup](https://github.com/jquense/yup) (validação de formulários)
- [json-server](https://github.com/typicode/json-server) (mock API)
- [DummyJSON API](https://dummyjson.com) (autenticação)

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

5. **Credenciais de acesso:**
   - **Usuário:** emilys
   - **Senha:** emilyspass
   
   (As credenciais são validadas via [DummyJSON API](https://dummyjson.com/docs/auth))

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

## Estrutura do Projeto

```
src/
├─ assets/         # Imagens e ícones
├─ components/     # Componentes reutilizáveis da interface
├─ config/         # Configurações e variáveis de ambiente
├─ hooks/          # Ganchos para consultas de dados (React Query, useDebounce)
├─ pages/          # Páginas principais (dashboard, extrato, etc)
├─ routes/         # Definição de rotas do sistema (com lazy loading)
├─ services/       # Camada de serviço (APIs, integrações)
├─ store/          # Gerenciamento de estado (Redux)
├─ types/          # Tipagens TypeScript
├─ utils/          # Funções utilitárias e constantes
├─ stories/        # Documentação visual de componentes
json-server/
└─ db.json         # Base de dados mockada (extratos e operações)
```

## Observações

- O projeto utiliza o `json-server` para simular uma API REST. Certifique-se de deixá-lo rodando para que as operações funcionem corretamente.
- Os dados não são persistidos em um banco real, apenas no arquivo `db.json`.

## Licença

Projeto desenvolvido para fins educacionais no Tech Challenge FIAP. Pós Graduação em Front-end Engeniering
