# Configuracao de Branch Protection para Deploy Controlado

## Branch Protection Rules
Configure no GitHub:
1. Settings > Branches > Add rule
2. Branch name pattern: master
3. Configuracoes:
   - [x] Require pull request reviews before merging
   - [x] Dismiss stale PR approvals when new commits are pushed
   - [x] Require review from code owners
   - [x] Restrict pushes that create files
   - [x] Require status checks to pass before merging

## CODEOWNERS File
Crie .github/CODEOWNERS:
* @jguerradasilva

## Resultado:
- Colaboradores podem fazer PRs
- Apenas voce pode aprovar merges na master
- Deploy so acontece com sua aprovacao
