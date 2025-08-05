#!/bin/bash

# 🚀 Script para commit e push do CI/CD Pipeline

echo "🔧 Configurando CI/CD Pipeline - GitHub Actions + AWS ECS"
echo "=================================================="

# Verificar se estamos no repositório git
if [ ! -d ".git" ]; then
    echo "❌ Erro: Este não é um repositório Git!"
    exit 1
fi

# Adicionar arquivos modificados
echo "📁 Adicionando arquivos ao staging..."
git add .github/workflows/deploy.yml
git add .github/SETUP_CI_CD.md
git add aws/task-definition.json

# Verificar status
echo "📊 Status do repositório:"
git status --short

# Commit das mudanças
echo "💾 Fazendo commit das mudanças..."
git commit -m "feat: implement comprehensive CI/CD pipeline with GitHub Actions

✨ Features:
- Multi-stage pipeline: test → build → deploy
- Environment protection for production deploys
- Automated ECR image building and pushing
- ECS Fargate deployment automation
- Security controls and notifications

🔧 Technical details:
- Fixed ECR repository name from bytebank-app to bytebank-repo
- Updated task definition with correct AWS account ID
- Added comprehensive testing and quality checks
- Implemented deployment verification and status reporting

🛡️ Security:
- Environment protection requires manual approval
- Branch protection via CODEOWNERS maintained
- AWS credentials stored as GitHub secrets

📚 Documentation:
- Added detailed CI/CD setup guide
- Step-by-step secret configuration
- Emergency procedures and monitoring info"

# Push para o repositório
echo "🚀 Fazendo push para o repositório..."
git push origin main 2>/dev/null || git push origin master

echo ""
echo "✅ CI/CD Pipeline configurado com sucesso!"
echo ""
echo "🔑 Próximos passos:"
echo "1. Configure os secrets no GitHub:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo ""
echo "2. Crie o environment 'production' no GitHub"
echo ""
echo "3. Teste o pipeline com um novo commit"
echo ""
echo "📖 Consulte .github/SETUP_CI_CD.md para instruções detalhadas"
echo ""
echo "🔗 Aplicação: http://34.204.75.66"
