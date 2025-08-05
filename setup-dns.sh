#!/bin/bash

# Script para configurar DNS gratuito com Route 53
# Domínio gratuito (.tk) + Route 53 AWS

DOMAIN_NAME="bytebank.tk"
WWW_DOMAIN="www.bytebank.tk"
CURRENT_IP="34.204.75.66"
REGION="us-east-1"

echo "=== Configurando DNS para ByteBank App ==="
echo "Domínio principal: $DOMAIN_NAME"
echo "Domínio WWW: $WWW_DOMAIN"
echo "IP: $CURRENT_IP"
echo "Região: $REGION"
echo

# 1. Criar Hosted Zone no Route 53
echo "1. Criando Hosted Zone no Route 53..."
aws route53 create-hosted-zone \
  --name $DOMAIN_NAME \
  --caller-reference "bytebank-$(date +%s)" \
  --hosted-zone-config Comment="ByteBank App DNS Zone" \
  --region $REGION

# 2. Obter Name Servers
echo "2. Obtendo Name Servers..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='$DOMAIN_NAME.'].Id" --output text | cut -d'/' -f3)
echo "Hosted Zone ID: $HOSTED_ZONE_ID"

aws route53 get-hosted-zone --id $HOSTED_ZONE_ID --query 'DelegationSet.NameServers' --output table

# 3. Criar registro A para o domínio principal
echo "3. Criando registro A..."
cat > /tmp/dns-record.json << EOF
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "$DOMAIN_NAME",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "$CURRENT_IP"
          }
        ]
      }
    },
    {
      "Action": "CREATE", 
      "ResourceRecordSet": {
        "Name": "www.$DOMAIN_NAME",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "$CURRENT_IP"
          }
        ]
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch file:///tmp/dns-record.json

echo "=== DNS configurado com sucesso! ==="
echo "Domínio principal: http://$DOMAIN_NAME"
echo "Domínio WWW: http://$WWW_DOMAIN"
echo
echo "PRÓXIMOS PASSOS:"
echo "1. Registre o domínio gratuito 'bytebank.tk' em: https://www.freenom.com"
echo "2. Configure os Name Servers mostrados acima no Freenom"
echo "3. Aguarde propagação DNS (15-30 minutos)"
echo "4. Acesse: http://www.bytebank.tk"
echo
echo "CUSTO MENSAL: ~$0.50 (apenas Route 53 Hosted Zone)"
