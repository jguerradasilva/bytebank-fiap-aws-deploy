# 🌐 Guia de Configuração DNS - www.bytebank.tk

## ✅ **AWS Route 53 CONFIGURADO COM SUCESSO!**

### **📋 Informações da Configuração:**
- **Domínio Principal:** `bytebank.tk`
- **Domínio WWW:** `www.bytebank.tk`
- **IP de Destino:** `34.204.75.66`
- **Hosted Zone ID:** `Z04676153AM8PVOS1RQ2F`

### **🔧 Name Servers AWS (ANOTE ESTES):**
```
ns-1096.awsdns-09.org
ns-648.awsdns-17.net
ns-84.awsdns-10.com
ns-1781.awsdns-30.co.uk
```

---

## 🎯 **PRÓXIMOS PASSOS - REGISTRO GRATUITO**

### **1. Registrar Domínio Gratuito (.tk)**
1. Acesse: **https://www.freenom.com**
2. Digite: `bytebank` na busca
3. Selecione `.tk` (gratuito por 12 meses)
4. Clique em "Get it now!" 
5. Checkout (criar conta se necessário)

### **2. Configurar DNS no Freenom**
1. Após registro, vá em **"My Domains"**
2. Clique em **"Manage Domain"** para `bytebank.tk`
3. Vá na aba **"Management Tools"** 
4. Clique em **"Nameservers"**
5. Selecione **"Use custom nameservers"**
6. Configure os 4 Name Servers AWS:
   ```
   Nameserver 1: ns-1096.awsdns-09.org
   Nameserver 2: ns-648.awsdns-17.net  
   Nameserver 3: ns-84.awsdns-10.com
   Nameserver 4: ns-1781.awsdns-30.co.uk
   ```
7. Salvar alterações

### **3. Aguardar Propagação DNS**
- **Tempo:** 15-30 minutos (pode levar até 48h)
- **Teste:** `nslookup www.bytebank.tk`

---

## 🚀 **APÓS PROPAGAÇÃO - URLS FUNCIONAIS:**

- **Principal:** http://bytebank.tk
- **WWW:** http://www.bytebank.tk  
- **API:** http://www.bytebank.tk/api/extrato

---

## 💰 **CUSTOS:**

| Item | Custo |
|------|-------|
| **Domínio .tk** | $0 (12 meses grátis) |
| **Route 53 Hosted Zone** | $0.50/mês |
| **DNS Queries** | $0.40 por milhão |
| **TOTAL MENSAL** | **~$0.50** |

---

## 🔍 **COMANDOS DE TESTE:**

### **Testar Propagação DNS:**
```bash
nslookup www.bytebank.tk
dig www.bytebank.tk
```

### **Testar Aplicação:**
```bash
curl -I http://www.bytebank.tk
curl http://www.bytebank.tk/api/extrato
```

### **Verificar Status Route 53:**
```bash
aws route53 get-change --id /change/C0398332K7TNPIVR9FHK
```

---

## 📱 **RENOVAÇÃO AUTOMÁTICA**
- Configure lembrete para renovar domínio .tk em 11 meses
- Alternativa: comprar domínio .com ($12/ano) para estabilidade

**🎉 Seu ByteBank estará acessível em www.bytebank.tk em breve!**
