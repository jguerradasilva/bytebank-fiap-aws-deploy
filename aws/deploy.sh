#!/bin/bash

# AWS Deploy Script for ByteBank App
# Usage: ./deploy.sh [environment] [region]

set -e

# Configuration
ENVIRONMENT=${1:-production}
AWS_REGION=${2:-us-east-1}
APP_NAME="bytebank-app"
CLUSTER_NAME="bytebank-cluster"
SERVICE_NAME="bytebank-service"
ECR_REPOSITORY="$APP_NAME"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting deployment of ByteBank App to AWS...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  Environment: $ENVIRONMENT"
echo "  AWS Region: $AWS_REGION"
echo "  AWS Account: $AWS_ACCOUNT_ID"
echo "  ECR Repository: $ECR_URI"
echo ""

# Step 1: Create ECR repository if it doesn't exist
echo -e "${YELLOW}📦 Checking ECR repository...${NC}"
if ! aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION &> /dev/null; then
    echo "Creating ECR repository..."
    aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION
    echo -e "${GREEN}✅ ECR repository created${NC}"
else
    echo -e "${GREEN}✅ ECR repository exists${NC}"
fi

# Step 2: Login to ECR
echo -e "${YELLOW}🔐 Logging into ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URI

# Step 3: Build Docker image
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
docker build -t $APP_NAME:$ENVIRONMENT .
docker tag $APP_NAME:$ENVIRONMENT $ECR_URI:$ENVIRONMENT
docker tag $APP_NAME:$ENVIRONMENT $ECR_URI:latest

# Step 4: Push to ECR
echo -e "${YELLOW}📤 Pushing image to ECR...${NC}"
docker push $ECR_URI:$ENVIRONMENT
docker push $ECR_URI:latest

# Step 5: Update task definition
echo -e "${YELLOW}📝 Updating task definition...${NC}"
sed "s/YOUR_ACCOUNT_ID/$AWS_ACCOUNT_ID/g; s/YOUR_REGION/$AWS_REGION/g" aws/task-definition.json > aws/task-definition-updated.json

# Register new task definition
aws ecs register-task-definition --cli-input-json file://aws/task-definition-updated.json --region $AWS_REGION

# Step 6: Update ECS service
echo -e "${YELLOW}🔄 Updating ECS service...${NC}"
aws ecs update-service \
    --cluster $CLUSTER_NAME \
    --service $SERVICE_NAME \
    --task-definition $APP_NAME \
    --region $AWS_REGION

# Step 7: Wait for deployment
echo -e "${YELLOW}⏳ Waiting for deployment to complete...${NC}"
aws ecs wait services-stable \
    --cluster $CLUSTER_NAME \
    --services $SERVICE_NAME \
    --region $AWS_REGION

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"

# Get service URL
LOAD_BALANCER_DNS=$(aws elbv2 describe-load-balancers \
    --query "LoadBalancers[?contains(LoadBalancerName, 'bytebank')].DNSName" \
    --output text \
    --region $AWS_REGION)

if [ ! -z "$LOAD_BALANCER_DNS" ]; then
    echo -e "${GREEN}🌐 Application URL: http://$LOAD_BALANCER_DNS${NC}"
else
    echo -e "${YELLOW}⚠️  Load balancer DNS not found. Check AWS Console for the application URL.${NC}"
fi

# Cleanup
rm -f aws/task-definition-updated.json

echo -e "${GREEN}✨ Deployment script completed!${NC}"
