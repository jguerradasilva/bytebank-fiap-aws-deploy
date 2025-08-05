@echo off
REM AWS Deploy Script for ByteBank App (Windows)
REM Usage: deploy.bat [environment] [region]

setlocal enabledelayedexpansion

REM Configuration
set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production

set AWS_REGION=%2
if "%AWS_REGION%"=="" set AWS_REGION=us-east-1

set APP_NAME=bytebank-app
set CLUSTER_NAME=bytebank-cluster
set SERVICE_NAME=bytebank-service
set ECR_REPOSITORY=%APP_NAME%

echo 🚀 Starting deployment of ByteBank App to AWS...

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI is not installed. Please install it first.
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker first.
    exit /b 1
)

REM Get AWS Account ID
for /f "tokens=*" %%i in ('aws sts get-caller-identity --query Account --output text') do set AWS_ACCOUNT_ID=%%i
set ECR_URI=%AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/%ECR_REPOSITORY%

echo 📋 Configuration:
echo   Environment: %ENVIRONMENT%
echo   AWS Region: %AWS_REGION%
echo   AWS Account: %AWS_ACCOUNT_ID%
echo   ECR Repository: %ECR_URI%
echo.

REM Step 1: Create ECR repository if it doesn't exist
echo 📦 Checking ECR repository...
aws ecr describe-repositories --repository-names %ECR_REPOSITORY% --region %AWS_REGION% >nul 2>&1
if errorlevel 1 (
    echo Creating ECR repository...
    aws ecr create-repository --repository-name %ECR_REPOSITORY% --region %AWS_REGION%
    echo ✅ ECR repository created
) else (
    echo ✅ ECR repository exists
)

REM Step 2: Login to ECR
echo 🔐 Logging into ECR...
for /f "tokens=*" %%i in ('aws ecr get-login-password --region %AWS_REGION%') do docker login --username AWS --password-stdin %ECR_URI% < echo %%i

REM Step 3: Build Docker image
echo 🔨 Building Docker image...
docker build -t %APP_NAME%:%ENVIRONMENT% ..
docker tag %APP_NAME%:%ENVIRONMENT% %ECR_URI%:%ENVIRONMENT%
docker tag %APP_NAME%:%ENVIRONMENT% %ECR_URI%:latest

REM Step 4: Push to ECR
echo 📤 Pushing image to ECR...
docker push %ECR_URI%:%ENVIRONMENT%
docker push %ECR_URI%:latest

REM Step 5: Update task definition
echo 📝 Updating task definition...
powershell -Command "(Get-Content task-definition.json) -replace 'YOUR_ACCOUNT_ID', '%AWS_ACCOUNT_ID%' -replace 'YOUR_REGION', '%AWS_REGION%' | Set-Content task-definition-updated.json"

REM Register new task definition
aws ecs register-task-definition --cli-input-json file://task-definition-updated.json --region %AWS_REGION%

REM Step 6: Update ECS service
echo 🔄 Updating ECS service...
aws ecs update-service --cluster %CLUSTER_NAME% --service %SERVICE_NAME% --task-definition %APP_NAME% --region %AWS_REGION%

REM Step 7: Wait for deployment
echo ⏳ Waiting for deployment to complete...
aws ecs wait services-stable --cluster %CLUSTER_NAME% --services %SERVICE_NAME% --region %AWS_REGION%

echo 🎉 Deployment completed successfully!

REM Get service URL
for /f "tokens=*" %%i in ('aws elbv2 describe-load-balancers --query "LoadBalancers[?contains(LoadBalancerName, 'bytebank')].DNSName" --output text --region %AWS_REGION%') do set LOAD_BALANCER_DNS=%%i

if not "%LOAD_BALANCER_DNS%"=="" (
    echo 🌐 Application URL: http://%LOAD_BALANCER_DNS%
) else (
    echo ⚠️  Load balancer DNS not found. Check AWS Console for the application URL.
)

REM Cleanup
if exist aws\task-definition-updated.json del aws\task-definition-updated.json

echo ✨ Deployment script completed!
pause
