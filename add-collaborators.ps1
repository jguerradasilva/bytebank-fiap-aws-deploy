# Script para adicionar colaboradores com controle de deploy

Write-Host "=== ADICIONANDO COLABORADORES COM CONTROLE DE DEPLOY ===" -ForegroundColor Green
Write-Host ""

# Lista de colaboradores
$colaboradores = @(
    @{username="diegominelli"; nome="Diego Minelli"},
    @{username="thmsaguiar"; nome="Thomas Aguiar"},
    @{username="RaulFerreira21"; nome="Raul Ferreira"},
    @{username="oeujack"; nome="Jackson Santos"}
)

# Verificar GitHub CLI
try {
    gh --version | Out-Null
    Write-Host "GitHub CLI encontrado!" -ForegroundColor Green
} catch {
    Write-Host "Instalando GitHub CLI..." -ForegroundColor Yellow
    winget install GitHub.cli
    Write-Host "Reinicie o terminal e execute novamente." -ForegroundColor Red
    exit
}

# Login
Write-Host "Fazendo login no GitHub..." -ForegroundColor Yellow
gh auth login

Write-Host ""
Write-Host "Configurando colaboradores com permissoes de desenvolvimento..." -ForegroundColor Yellow

foreach ($collab in $colaboradores) {
    Write-Host "Adicionando: $($collab.nome) (@$($collab.username))" -ForegroundColor Cyan
    
    try {
        # Adiciona com permissão "write" mas será limitado pelo CODEOWNERS
        gh api repos/jguerradasilva/bytebank-fiap-aws-deploy/collaborators/$($collab.username) `
            --method PUT `
            --field permission=write
        
        Write-Host "  SUCESSO! Permissoes: desenvolvimento + PR" -ForegroundColor Green
    } catch {
        Write-Host "  ERRO: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== CONFIGURACAO DE SEGURANCA ===" -ForegroundColor Yellow
Write-Host "Colaboradores podem:" -ForegroundColor White
Write-Host "  - Fazer commits em branches" -ForegroundColor Green
Write-Host "  - Criar Pull Requests" -ForegroundColor Green
Write-Host "  - Editar codigo fonte" -ForegroundColor Green
Write-Host ""
Write-Host "Apenas VOCE pode:" -ForegroundColor Red
Write-Host "  - Aprovar merges na master" -ForegroundColor Red
Write-Host "  - Fazer deploy na AWS" -ForegroundColor Red
Write-Host "  - Modificar workflows CI/CD" -ForegroundColor Red
Write-Host ""
Write-Host "Proximo passo: Configure Branch Protection no GitHub" -ForegroundColor Yellow
Write-Host "URL: https://github.com/jguerradasilva/bytebank-fiap-aws-deploy/settings/branches" -ForegroundColor Cyan