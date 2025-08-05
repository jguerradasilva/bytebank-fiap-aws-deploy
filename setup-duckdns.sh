#!/bin/bash

# Script para configurar Duck DNS (Gratuito e Simples)
# Não precisa do AWS Route 53 - Economia de $0.50/mês

SUBDOMAIN="bytebank"
DOMAIN="bytebank.duckdns.org"
CURRENT_IP="34.204.75.66"

echo "🦆 === Configurando Duck DNS para ByteBank App ==="
echo "Subdomínio: $SUBDOMAIN"
echo "Domínio completo: $DOMAIN"
echo "IP de destino: $CURRENT_IP"
echo

echo "📋 PASSOS PARA CONFIGURAR DUCK DNS:"
echo
echo "1. Acesse: https://www.duckdns.org"
echo "2. Faça login com Google, GitHub ou Twitter"
echo "3. No campo 'subdomain', digite: $SUBDOMAIN"
echo "4. No campo 'ip', cole: $CURRENT_IP"
echo "5. Clique em 'add domain'"
echo
echo "✅ PRONTO! O DNS funcionará em 1-2 minutos!"
echo
echo "🌐 URLS QUE FUNCIONARÃO:"
echo "- Principal: http://$DOMAIN"
echo "- API: http://$DOMAIN/api/extrato"
echo
echo "🔧 COMANDOS PARA TESTAR:"
echo "nslookup $DOMAIN"
echo "curl -I http://$DOMAIN"
echo
echo "💰 CUSTO TOTAL: \$0 (Duck DNS é 100% gratuito!)"
echo
echo "🎯 VANTAGENS DO DUCK DNS:"
echo "✅ Gratuito para sempre"
echo "✅ Funciona imediatamente (1-2 minutos)"
echo "✅ Sem necessidade de Route 53"
echo "✅ SSL gratuito disponível"
echo "✅ Renovação automática"
echo "✅ API para atualizações dinâmicas"

# Função para verificar se o domínio já está funcionando
check_dns() {
    echo
    echo "🔍 Verificando se o DNS já está funcionando..."
    if nslookup $DOMAIN > /dev/null 2>&1; then
        echo "✅ DNS está funcionando!"
        echo "🌐 Testando aplicação..."
        
        if curl -I http://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
            echo "🎉 SUCESSO! Aplicação está acessível em: http://$DOMAIN"
        else
            echo "⏳ DNS funcionando, mas aplicação ainda não acessível. Aguarde alguns segundos..."
        fi
    else
        echo "⏳ DNS ainda não propagado. Configure no Duck DNS e aguarde 1-2 minutos."
    fi
}

# Verificar se o usuário quer testar agora
echo
read -p "Deseja verificar se o DNS já está configurado? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    check_dns
fi

echo
echo "🦆 DUCK DNS - A melhor alternativa gratuita para DNS!"
