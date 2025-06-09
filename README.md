# Mxlsc - Marketplace de Automações Python

Site estático para venda de automações Python com sistema de pagamento integrado e notificações por email.

## 🚀 Deploy no GitHub Pages

1. Faça fork ou clone este repositório
2. Vá em **Settings** > **Pages**
3. Selecione **Deploy from a branch**
4. Escolha **main branch** e **/ (root)**
5. Clique em **Save**

Seu site estará disponível em: `https://seuusuario.github.io/mxlsc`

## 📧 Configuração de Email (IMPORTANTE)

Para receber notificações de compras e contatos, você precisa configurar um serviço de email. Recomendamos usar **EmailJS** (gratuito):

### 1. Criar conta no EmailJS

1. Acesse [emailjs.com](https://www.emailjs.com)
2. Crie uma conta gratuita
3. Vá em **Email Services** e conecte sua conta de email (Gmail, Outlook, etc.)
4. Anote seu **Service ID**

### 2. Criar template de email

1. Vá em **Email Templates**
2. Crie um novo template com o conteúdo:

```
Nova Compra - {{product_name}}

Produto: {{product_name}}
Preço: {{price}}
Cliente: {{buyer_email}}
Método: {{payment_method}}
Data: {{date}}

Descrição: {{description}}

Envie a automação para o cliente.
```

3. Anote o **Template ID**

### 3. Configurar no site

No arquivo `script.js`, encontre a função `sendEmailNotification` e substitua:

```javascript
// Substitua estas configurações
emailjs.init("SEU_PUBLIC_KEY");

emailjs.send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
    product_name: currentAutomation.title,
    price: currentAutomation.isFree ? 'Gratuito' : `R$ ${currentAutomation.price.toFixed(2)}`,
    buyer_email: buyerEmail,
    payment_method: paymentMethod,
    date: new Date().toLocaleString('pt-BR'),
    description: currentAutomation.description,
    to_email: 'mxlsc@proton.me'
});
```

### 4. Alternativa: Formspree

Se preferir usar Formspree:

1. Acesse [formspree.io](https://formspree.io)
2. Crie um formulário
3. Use o endpoint fornecido no `script.js`

## 💳 Configuração de Pagamentos

O sistema atual simula pagamentos. Para implementar pagamentos reais:

### Opção 1: Mercado Pago
- Mais usado no Brasil
- Suporta PIX, cartões, boleto
- Documentação: [developers.mercadopago.com](https://developers.mercadopago.com)

### Opção 2: PagSeguro
- Alternativa brasileira
- Interface simples
- Documentação: [dev.pagseguro.uol.com.br](https://dev.pagseguro.uol.com.br)

### Opção 3: Stripe
- Padrão internacional
- Documentação: [stripe.com/docs](https://stripe.com/docs)

## 🛠️ Customização

### Adicionar novas automações

Edite o array `automationsData` no `script.js`:

```javascript
{
    id: 14,
    title: "Sua Nova Automação",
    description: "Descrição breve",
    longDescription: "Descrição detalhada",
    categoryId: 1, // 1-6 conforme categoria
    price: 99.00,
    isFree: false,
    isPremium: true,
    rating: 4.8,
    reviewCount: 50,
    downloadCount: 200,
    author: "Seu Nome",
    authorUsername: "@seu_usuario",
    features: ["Feature 1", "Feature 2"],
    technologies: ["python", "requests"]
}
```

### Modificar categorias

Edite o array `categoriesData` no `script.js`:

```javascript
{ id: 7, name: "Nova Categoria", icon: "fas fa-icon", count: 0 }
```

### Alterar cores/tema

Modifique as variáveis CSS no `styles.css`:

```css
:root {
    --text-accent: #ff4500; /* Cor principal */
    --fire-gradient: linear-gradient(...); /* Gradiente de fogo */
}
```

## 📱 Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Tema escuro com gradientes vermelhos/laranja
- ✅ Animações suaves e efeitos visuais
- ✅ Sistema de busca em tempo real
- ✅ Modal de pagamento com múltiplas opções
- ✅ Notificações automáticas por email
- ✅ Formulário de contato
- ✅ Compatível com GitHub Pages
- ✅ SEO otimizado

## 🔧 Estrutura do Projeto

```
├── index.html      # Página principal
├── styles.css      # Todos os estilos
├── script.js       # Toda a funcionalidade
└── README.md       # Este arquivo
```

## 📈 Analytics

Para acompanhar visitantes, adicione o Google Analytics no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🎨 Recursos Visuais

- Fonte terminal: JetBrains Mono
- Ícones: Font Awesome 6
- Animações: CSS puro (sem bibliotecas)
- Background: Efeito matrix animado
- Tema: Cyberpunk/Terminal

## 📞 Suporte

Para dúvidas sobre configuração ou customização, consulte a documentação dos serviços utilizados ou abra uma issue no repositório.

---

**Criado por Mxlsc** - Marketplace profissional de automações Python
