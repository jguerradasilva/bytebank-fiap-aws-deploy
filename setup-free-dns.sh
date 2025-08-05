# Script para configurar DNS gratuito com Route 53

# 1. Primeiro, registre um domínio gratuito em freenom.com
# Exemplos: bytebank.tk, bytebank.ml, bytebank.ga, bytebank.cf

# 2. Criar hosted zone no Route 53 (substitua 'bytebank.tk' pelo seu domínio)
DOMAIN_NAME="bytebank.tk"  # Substitua pelo domínio escolhido

# Criar hosted zone
aws route53 create-hosted-zone \
    --name "$DOMAIN_NAME" \
    --caller-reference "$(date +%s)" \
    --hosted-zone-config Comment="ByteBank Free DNS"

# 3. Obter os nameservers do Route 53
aws route53 get-hosted-zone \
    --id $(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN_NAME" --query 'HostedZones[0].Id' --output text) \
    --query 'DelegationSet.NameServers'

# 4. Criar registro A apontando para o IP atual
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN_NAME" --query 'HostedZones[0].Id' --output text)

# Criar change batch para o registro A
cat > change-batch.json << EOF
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
                        "Value": "34.204.75.66"
                    }
                ]
            }
        }
    ]
}
EOF

# Aplicar as mudanças
aws route53 change-resource-record-sets \
    --hosted-zone-id "$HOSTED_ZONE_ID" \
    --change-batch file://change-batch.json
