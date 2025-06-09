// Data Storage
const automationsData = [
    {
        id: 1,
        title: "Scraper E-commerce Avançado",
        description: "Automação completa para extrair dados de produtos de múltiplas plataformas de e-commerce com anti-captcha e proxy rotation.",
        longDescription: "Esta automação permite extrair dados completos de produtos de múltiplas plataformas de e-commerce, incluindo preços, descrições, avaliações e imagens. Conta com sistema anti-captcha integrado e rotação automática de proxies para máxima eficiência. Suporta Mercado Livre, Amazon, OLX e mais de 20 sites.",
        categoryId: 1,
        price: 127.00,
        isFree: false,
        isPremium: true,
        rating: 4.9,
        reviewCount: 142,
        downloadCount: 847,
        author: "DataHack Pro",
        authorUsername: "@datahack_pro",
        features: ["Multi-plataforma", "Anti-detecção", "Proxy rotation", "Captcha solver", "Exportação múltipla"],
        technologies: ["requests", "selenium", "2captcha", "beautifulsoup4", "pandas"]
    },
    {
        id: 2,
        title: "WhatsApp Business Automator",
        description: "Automatize mensagens em massa, respostas automáticas e gerenciamento de contatos no WhatsApp Business.",
        longDescription: "Sistema completo para automação do WhatsApp Business com envio de mensagens personalizadas, auto-resposta inteligente, agendamento de campanhas e relatórios detalhados de engajamento.",
        categoryId: 6,
        price: 89.00,
        isFree: false,
        isPremium: true,
        rating: 4.8,
        reviewCount: 89,
        downloadCount: 523,
        author: "ChatBot Master",
        authorUsername: "@chatbot_master",
        features: ["Mensagens em massa", "Auto-resposta", "Agendamento", "Relatórios", "Lista de transmissão"],
        technologies: ["selenium", "whatsapp-web.js", "puppeteer", "schedule"]
    },
    {
        id: 3,
        title: "YouTube Analytics Extractor",
        description: "Extraia métricas completas de canais e vídeos do YouTube para análise de performance e concorrência.",
        longDescription: "Ferramenta profissional para extração de dados do YouTube incluindo visualizações, likes, comentários, dados demográficos e análise de tendências. Ideal para criadores de conteúdo e agências.",
        categoryId: 1,
        price: 75.00,
        isFree: false,
        isPremium: false,
        rating: 4.7,
        reviewCount: 67,
        downloadCount: 291,
        author: "Media Analytics",
        authorUsername: "@media_analytics",
        features: ["Métricas detalhadas", "Análise de concorrentes", "Tendências", "Relatórios visuais"],
        technologies: ["youtube-dl", "google-api", "matplotlib", "pandas"]
    },
    {
        id: 4,
        title: "PDF Invoice Generator",
        description: "Gere faturas profissionais em PDF automaticamente com dados do Excel ou banco de dados.",
        longDescription: "Sistema automatizado para geração de faturas em PDF com templates personalizáveis, cálculos automáticos de impostos, numeração sequencial e envio por email opcional.",
        categoryId: 2,
        price: 45.00,
        isFree: false,
        isPremium: false,
        rating: 4.6,
        reviewCount: 34,
        downloadCount: 178,
        author: "Invoice Pro",
        authorUsername: "@invoice_pro",
        features: ["Templates personalizáveis", "Cálculo de impostos", "Numeração automática", "Envio por email"],
        technologies: ["reportlab", "pandas", "smtplib", "openpyxl"]
    },
    {
        id: 5,
        title: "Stock Price Monitor",
        description: "Monitore preços de ações em tempo real com alertas personalizados via email, SMS ou Telegram.",
        longDescription: "Sistema de monitoramento de ações com alertas inteligentes, análise técnica básica, histórico de preços e integração com múltiplas corretoras. Suporte para B3, NYSE e NASDAQ.",
        categoryId: 6,
        price: 95.00,
        isFree: false,
        isPremium: true,
        rating: 4.9,
        reviewCount: 156,
        downloadCount: 692,
        author: "FinTech Dev",
        authorUsername: "@fintech_dev",
        features: ["Alertas em tempo real", "Múltiplas bolsas", "Análise técnica", "Dashboard web"],
        technologies: ["yfinance", "telegram-bot", "flask", "sqlite3"]
    },
    {
        id: 6,
        title: "LinkedIn Lead Generator",
        description: "Extraia leads qualificados do LinkedIn com filtros avançados e exportação para CRM.",
        longDescription: "Ferramenta profissional para prospecção no LinkedIn com busca avançada, extração de dados de perfis, detecção de emails e integração direta com principais CRMs do mercado.",
        categoryId: 1,
        price: 145.00,
        isFree: false,
        isPremium: true,
        rating: 4.8,
        reviewCount: 78,
        downloadCount: 345,
        author: "Sales Hack Pro",
        authorUsername: "@saleshack_pro",
        features: ["Filtros avançados", "Detecção de email", "Integração CRM", "Anti-detecção"],
        technologies: ["selenium", "requests", "beautifulsoup4", "hunter.io"]
    },
    {
        id: 7,
        title: "Email Campaign Analyzer",
        description: "Analise performance de campanhas de email marketing com métricas avançadas e insights acionáveis.",
        longDescription: "Plataforma completa de análise de email marketing com tracking de opens, clicks, bounces, unsubscribes e ROI. Inclui A/B testing e recomendações de otimização.",
        categoryId: 3,
        price: 67.00,
        isFree: false,
        isPremium: false,
        rating: 4.5,
        reviewCount: 45,
        downloadCount: 234,
        author: "Email Metrics",
        authorUsername: "@email_metrics",
        features: ["Métricas avançadas", "A/B testing", "ROI tracking", "Recomendações IA"],
        technologies: ["mailgun-api", "pandas", "matplotlib", "sklearn"]
    },
    {
        id: 8,
        title: "Database Backup Automator",
        description: "Automatize backups de bancos de dados MySQL, PostgreSQL e MongoDB com agendamento e armazenamento em nuvem.",
        longDescription: "Sistema robusto de backup automatizado para múltiplos SGBDs com compressão, criptografia, upload para AWS S3/Google Drive e notificações de status via email.",
        categoryId: 5,
        price: 85.00,
        isFree: false,
        isPremium: false,
        rating: 4.9,
        reviewCount: 123,
        downloadCount: 567,
        author: "DB Admin Pro",
        authorUsername: "@dbadmin_pro",
        features: ["Múltiplos SGBDs", "Compressão", "Criptografia", "Upload nuvem", "Agendamento"],
        technologies: ["pymongo", "psycopg2", "mysql-connector", "boto3"]
    },
    {
        id: 9,
        title: "Instagram Growth Bot",
        description: "Automatize crescimento no Instagram com likes, follows, comments e unfollows inteligentes.",
        longDescription: "Bot avançado para crescimento orgânico no Instagram com IA para targeting, limites seguros, análise de hashtags e relatórios de crescimento detalhados. 100% dentro dos ToS.",
        categoryId: 6,
        price: 115.00,
        isFree: false,
        isPremium: true,
        rating: 4.6,
        reviewCount: 234,
        downloadCount: 1245,
        author: "Growth Expert",
        authorUsername: "@growth_expert",
        features: ["IA targeting", "Limites seguros", "Análise hashtags", "Relatórios crescimento"],
        technologies: ["instagrapi", "selenium", "opencv", "schedule"]
    },
    {
        id: 10,
        title: "Web Scraper Universal",
        description: "Scraper genérico configurável para qualquer site com interface visual e agendamento.",
        longDescription: "Ferramenta universal de web scraping com interface gráfica para configuração, suporte a JavaScript, captcha solving e agendamento automático. Não requer conhecimento de programação.",
        categoryId: 1,
        price: 0.00,
        isFree: true,
        isPremium: false,
        rating: 4.4,
        reviewCount: 567,
        downloadCount: 2134,
        author: "Open Source Team",
        authorUsername: "@opensource_team",
        features: ["Interface gráfica", "Suporte JavaScript", "Agendamento", "Templates prontos"],
        technologies: ["selenium", "tkinter", "beautifulsoup4", "schedule"]
    },
    {
        id: 11,
        title: "Excel Data Merger",
        description: "Una e processe múltiplos arquivos Excel automaticamente com validação e limpeza de dados.",
        longDescription: "Ferramenta profissional para merge de planilhas Excel com detecção automática de estruturas, limpeza de duplicatas, validação de dados e geração de relatórios de qualidade.",
        categoryId: 2,
        price: 38.00,
        isFree: false,
        isPremium: false,
        rating: 4.7,
        reviewCount: 89,
        downloadCount: 445,
        author: "Excel Ninja",
        authorUsername: "@excel_ninja",
        features: ["Merge inteligente", "Limpeza duplicatas", "Validação dados", "Relatórios qualidade"],
        technologies: ["openpyxl", "pandas", "xlsxwriter", "numpy"]
    },
    {
        id: 12,
        title: "Telegram Trading Bot",
        description: "Bot de trading automatizado para criptomoedas via Telegram com estratégias configuráveis.",
        longDescription: "Bot avançado de trading para Binance e outras exchanges com estratégias DCA, stop-loss, take-profit e análise técnica. Controle completo via comandos do Telegram.",
        categoryId: 6,
        price: 175.00,
        isFree: false,
        isPremium: true,
        rating: 4.8,
        reviewCount: 145,
        downloadCount: 623,
        author: "Crypto Trader Pro",
        authorUsername: "@cryptotrader_pro",
        features: ["Múltiplas exchanges", "Estratégias DCA", "Stop-loss/Take-profit", "Análise técnica"],
        technologies: ["python-telegram-bot", "ccxt", "pandas", "ta-lib"]
    },
    {
        id: 13,
        title: "SEO Keyword Analyzer",
        description: "Analise palavras-chave e concorrência para SEO com dados do Google, Bing e YouTube.",
        longDescription: "Ferramenta completa de análise SEO com pesquisa de palavras-chave, análise de concorrência, tracking de rankings e sugestões de otimização baseadas em IA.",
        categoryId: 4,
        price: 99.00,
        isFree: false,
        isPremium: true,
        rating: 4.7,
        reviewCount: 167,
        downloadCount: 789,
        author: "SEO Master",
        authorUsername: "@seo_master",
        features: ["Pesquisa keywords", "Análise concorrência", "Tracking rankings", "Sugestões IA"],
        technologies: ["serpapi", "requests", "beautifulsoup4", "nltk"]
    }
];

const categoriesData = [
    { id: 1, name: "Web Scraping", icon: "fas fa-globe", count: 5 },
    { id: 2, name: "Excel/CSV", icon: "fas fa-file-excel", count: 2 },
    { id: 3, name: "Email", icon: "fas fa-envelope", count: 1 },
    { id: 4, name: "Relatórios", icon: "fas fa-chart-bar", count: 1 },
    { id: 5, name: "Banco de Dados", icon: "fas fa-database", count: 1 },
    { id: 6, name: "Bot/API", icon: "fas fa-robot", count: 3 }
];

// Global Variables
let currentAutomation = null;
let currentStep = 1;
let selectedPaymentMethod = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createMatrixEffect();
    initializeEmailService();
});

// App Initialization
function initializeApp() {
    loadCategories();
    loadFeaturedAutomations();
    setupEventListeners();
    animateOnScroll();
}

// Matrix Background Effect
function createMatrixEffect() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01';
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.color = '#ff4500';
        span.style.opacity = Math.random() * 0.5;
        span.style.fontSize = '12px';
        span.style.fontFamily = 'JetBrains Mono, monospace';
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        
        // Animate
        span.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        span.style.animationDelay = Math.random() * 2 + 's';
        
        matrixBg.appendChild(span);
    }
}

// Load Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = '';
    
    categoriesData.forEach(category => {
        const categoryCard = createCategoryCard(category);
        grid.appendChild(categoryCard);
    });
}

// Create Category Card
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card glass-card hover-lift slide-up';
    card.innerHTML = `
        <div class="category-icon fire-gradient">
            <i class="${category.icon}"></i>
        </div>
        <h3 class="category-name terminal-font">${category.name}</h3>
        <p class="category-count terminal-font">${category.count} scripts</p>
    `;
    
    card.addEventListener('click', () => filterByCategory(category.id));
    return card;
}

// Load Featured Automations
function loadFeaturedAutomations() {
    const grid = document.getElementById('automationsGrid');
    grid.innerHTML = '';
    
    // Get featured automations (premium or high rating)
    const featured = automationsData
        .filter(auto => auto.isPremium || auto.rating >= 4.5)
        .slice(0, 6);
    
    featured.forEach((automation, index) => {
        setTimeout(() => {
            const automationCard = createAutomationCard(automation);
            grid.appendChild(automationCard);
        }, index * 100);
    });
}

// Create Automation Card
function createAutomationCard(automation) {
    const card = document.createElement('div');
    card.className = 'automation-card glass-card hover-lift slide-up';
    
    const stars = generateStars(automation.rating);
    const categoryName = getCategoryName(automation.categoryId);
    
    card.innerHTML = `
        <div class="automation-header">
            <div class="automation-demo">
                <i class="fas fa-terminal"></i>
                <div class="automation-demo-text terminal-font">python run.py</div>
            </div>
            <div class="automation-badges">
                ${automation.isPremium ? '<span class="automation-badge badge-premium terminal-font">PREMIUM</span>' : ''}
                ${automation.isFree ? '<span class="automation-badge badge-free terminal-font">FREE</span>' : ''}
                <div class="automation-favorite">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
        </div>
        
        <div class="automation-content">
            <div class="automation-meta">
                <span class="automation-category terminal-font">./${categoryName.toLowerCase().replace(/\s+/g, '_')}</span>
                <div class="automation-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text terminal-font">${automation.rating}</span>
                </div>
            </div>
            
            <h3 class="automation-title terminal-font">${automation.title}</h3>
            <p class="automation-description">${automation.description}</p>
            
            <div class="automation-footer">
                <div class="automation-author">
                    <div class="author-avatar">
                        <i class="fas fa-user-ninja"></i>
                    </div>
                    <span class="author-name terminal-font">${automation.authorUsername}</span>
                </div>
                <div class="automation-price">
                    <div class="price-value terminal-font">
                        ${automation.isFree ? 'FREE' : `R$ ${automation.price.toFixed(2)}`}
                    </div>
                    <div class="price-downloads terminal-font">${automation.downloadCount} exec</div>
                </div>
            </div>
            
            <div class="automation-actions">
                <button class="btn-primary terminal-font" onclick="buyAutomation(${automation.id})">
                    <i class="fas fa-shopping-cart"></i>
                    ${automation.isFree ? 'wget' : 'buy'}
                </button>
                <button class="btn-secondary" onclick="previewAutomation(${automation.id})">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate Stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star star empty"></i>';
    }
    
    return starsHTML;
}

// Get Category Name
function getCategoryName(categoryId) {
    const category = categoriesData.find(cat => cat.id === categoryId);
    return category ? category.name : 'Outros';
}

// Buy Automation
function buyAutomation(automationId) {
    currentAutomation = automationsData.find(auto => auto.id === automationId);
    if (!currentAutomation) return;
    
    if (currentAutomation.isFree) {
        // For free automations, just send email notification
        sendEmailNotification('mxlsc@proton.me', 'free');
        showNotification('Automation baixada! Verifique seu email.');
        return;
    }
    
    // Reset payment flow
    currentStep = 1;
    selectedPaymentMethod = null;
    updatePaymentStep();
    showPaymentModal();
}

// Preview Automation
function previewAutomation(automationId) {
    const automation = automationsData.find(auto => auto.id === automationId);
    if (!automation) return;
    
    showNotification(`Prévia de ${automation.title} - Em breve!`);
}

// Show Payment Modal
function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Payment Modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('buyerEmail').value = '';
    currentStep = 1;
    selectedPaymentMethod = null;
    updatePaymentStep();
}

// Next Step in Payment
function nextStep() {
    const email = document.getElementById('buyerEmail').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Por favor, insira um email válido.');
        return;
    }
    
    currentStep = 2;
    updatePaymentStep();
}

// Update Payment Step
function updatePaymentStep() {
    // Hide all steps
    document.querySelectorAll('.payment-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const steps = ['emailStep', 'paymentStep', 'processingStep', 'successStep'];
    if (steps[currentStep - 1]) {
        document.getElementById(steps[currentStep - 1]).classList.add('active');
    }
}

// Select Payment Method
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Remove previous selections
    document.querySelectorAll('.payment-method').forEach(pm => {
        pm.classList.remove('selected');
    });
    
    // Add selection to clicked method
    event.target.closest('.payment-method').classList.add('selected');
    
    // Auto advance after selection
    setTimeout(() => {
        processPayment();
    }, 1000);
}

// Process Payment
function processPayment() {
    const email = document.getElementById('buyerEmail').value;
    
    if (!selectedPaymentMethod || !email) {
        showNotification('Erro no processamento. Tente novamente.');
        return;
    }
    
    // Show processing step
    currentStep = 3;
    updatePaymentStep();
    
    // Simulate payment processing
    setTimeout(() => {
        // Send email notification
        sendEmailNotification(email, selectedPaymentMethod);
        
        // Show success
        currentStep = 4;
        updatePaymentStep();
        
        // Auto close modal after success
        setTimeout(() => {
            closePaymentModal();
            showNotification('Pedido efetuado! Sua automação será enviada em breve.');
        }, 4000);
    }, 2000);
}

// Send Email Notification
async function sendEmailNotification(buyerEmail, paymentMethod) {
    // Sanitize inputs to prevent XSS and injection attacks
    const sanitizedEmail = sanitizeInput(buyerEmail);
    const sanitizedPayment = sanitizeInput(paymentMethod);
    const sanitizedTitle = sanitizeInput(currentAutomation.title);
    const sanitizedDescription = sanitizeInput(currentAutomation.description);
    
    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
        console.error('Invalid email format');
        return false;
    }
    
    // Rate limiting check
    if (!checkRateLimit()) {
        console.error('Rate limit exceeded');
        return false;
    }
    
    const emailData = {
        to: 'mxlsc@proton.me',
        subject: `Nova Compra - ${sanitizedTitle}`,
        body: `
            Nova compra realizada!
            
            Produto: ${sanitizedTitle}
            Preço: ${currentAutomation.isFree ? 'Gratuito' : `R$ ${currentAutomation.price.toFixed(2)}`}
            Cliente: ${sanitizedEmail}
            Método de Pagamento: ${paymentMethod === 'free' ? 'Gratuito' : sanitizedPayment.toUpperCase()}
            Data: ${new Date().toLocaleString('pt-BR')}
            ID da Transação: ${generateTransactionId()}
            
            Descrição: ${sanitizedDescription}
            
            Por favor, envie a automação para o cliente.
        `
    };
    
    try {
        // Store purchase record locally for security audit
        storePurchaseRecord(emailData);
        
        // Using EmailJS with actual configuration
        if (window.emailjs && window.emailjs.send) {
            await window.emailjs.send(
                'service_5dijxng', 
                'template_1pnd4vi', 
                {
                    to_email: 'mxlsc@proton.me',
                    from_name: sanitizedEmail,
                    product_name: sanitizedTitle,
                    product_price: currentAutomation.isFree ? 'Gratuito' : `R$ ${currentAutomation.price.toFixed(2)}`,
                    customer_email: sanitizedEmail,
                    payment_method: paymentMethod === 'free' ? 'Gratuito' : sanitizedPayment.toUpperCase(),
                    transaction_date: new Date().toLocaleString('pt-BR'),
                    transaction_id: generateTransactionId(),
                    product_description: sanitizedDescription
                }
            );
        } else {
            console.log('EmailJS not loaded - Email data:', emailData);
        }
        
        return true;
    } catch (error) {
        console.error('Email send error:', error);
        return false;
    }
}

// Security Functions
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocols
        .replace(/on\w+=/gi, '') // Remove event handlers
        .replace(/data:/gi, '') // Remove data: URLs
        .replace(/vbscript:/gi, '') // Remove vbscript: protocols
        .trim()
        .slice(0, 500); // Limit length
}

function checkRateLimit() {
    const now = Date.now();
    const rateLimitKey = 'emailRateLimit';
    const rateLimitWindow = 60000; // 1 minute
    const maxRequests = 5;
    
    let requests = JSON.parse(localStorage.getItem(rateLimitKey) || '[]');
    
    // Clean old requests
    requests = requests.filter(timestamp => now - timestamp < rateLimitWindow);
    
    if (requests.length >= maxRequests) {
        return false;
    }
    
    requests.push(now);
    localStorage.setItem(rateLimitKey, JSON.stringify(requests));
    return true;
}

function generateTransactionId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 9);
    return `TXN-${timestamp}-${randomStr}`.toUpperCase();
}

function storePurchaseRecord(emailData) {
    try {
        const purchases = JSON.parse(localStorage.getItem('purchaseRecords') || '[]');
        const record = {
            id: generateTransactionId(),
            timestamp: Date.now(),
            product: emailData.subject,
            customerEmail: emailData.body.match(/Cliente: (.+)/)?.[1] || 'unknown',
            ipHash: hashIP(getClientIP()),
            userAgent: navigator.userAgent.slice(0, 200)
        };
        
        purchases.push(record);
        
        // Keep only last 100 records for storage efficiency
        if (purchases.length > 100) {
            purchases.splice(0, purchases.length - 100);
        }
        
        localStorage.setItem('purchaseRecords', JSON.stringify(purchases));
    } catch (error) {
        console.error('Failed to store purchase record:', error);
    }
}

function hashIP(ip) {
    // Simple hash function for privacy
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
        const char = ip.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
}

function getClientIP() {
    // This is a placeholder - in production you'd get real IP from server
    return '127.0.0.1';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function checkContactFormRateLimit() {
    const now = Date.now();
    const rateLimitKey = 'contactFormRateLimit';
    const rateLimitWindow = 300000; // 5 minutes
    const maxRequests = 3;
    
    let requests = JSON.parse(localStorage.getItem(rateLimitKey) || '[]');
    
    // Clean old requests
    requests = requests.filter(timestamp => now - timestamp < rateLimitWindow);
    
    if (requests.length >= maxRequests) {
        return false;
    }
    
    requests.push(now);
    localStorage.setItem(rateLimitKey, JSON.stringify(requests));
    return true;
}

function isSpamContent(text) {
    if (!text || typeof text !== 'string') return false;
    
    const spamPatterns = [
        /viagra/gi,
        /casino/gi,
        /lottery/gi,
        /winner/gi,
        /congratulations/gi,
        /click here/gi,
        /free money/gi,
        /make money fast/gi,
        /guaranteed/gi,
        /urgent/gi,
        /act now/gi,
        /limited time/gi,
        /\$\$\$/gi,
        /!!!+/gi,
        /\b(http|https):\/\/[^\s]+/gi // URLs
    ];
    
    // Check for excessive repeated characters
    if (/(.)\1{5,}/.test(text)) return true;
    
    // Check for excessive caps
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.7 && text.length > 10) return true;
    
    return spamPatterns.some(pattern => pattern.test(text));
}

// Validate Email with enhanced security
function isValidEmail(email) {
    // More robust email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) return false;
    
    // Additional security checks
    if (email.length > 254) return false; // RFC 5321 limit
    if (email.includes('..')) return false; // Consecutive dots not allowed
    if (email.startsWith('.') || email.endsWith('.')) return false;
    
    // Check for suspicious patterns
    const suspiciousPatterns = [
        /script/gi,
        /javascript/gi,
        /vbscript/gi,
        /<.*>/gi,
        /\${.*}/gi
    ];
    
    return !suspiciousPatterns.some(pattern => pattern.test(email));
}

// Show Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Modal close on outside click
    const modal = document.getElementById('paymentModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePaymentModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePaymentModal();
        }
    });
}

// Handle Search
function handleSearch(e) {
    const rawQuery = e.target.value;
    const query = sanitizeInput(rawQuery).toLowerCase().trim();
    const grid = document.getElementById('automationsGrid');
    
    // Prevent excessively long search queries
    if (query.length > 100) {
        showNotification('Termo de busca muito longo');
        return;
    }
    
    if (!query) {
        loadFeaturedAutomations();
        return;
    }
    
    const filtered = automationsData.filter(auto =>
        auto.title.toLowerCase().includes(query) ||
        auto.description.toLowerCase().includes(query) ||
        auto.author.toLowerCase().includes(query) ||
        auto.technologies.some(tech => tech.toLowerCase().includes(query))
    );
    
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        const safeQuery = escapeHtml(query);
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);" class="terminal-font">
                Nenhuma automação encontrada para "${safeQuery}"
            </div>
        `;
        return;
    }
    
    filtered.forEach((automation, index) => {
        setTimeout(() => {
            const automationCard = createAutomationCard(automation);
            grid.appendChild(automationCard);
        }, index * 50);
    });
}

// Filter by Category
function filterByCategory(categoryId) {
    const filtered = automationsData.filter(auto => auto.categoryId === categoryId);
    const grid = document.getElementById('automationsGrid');
    
    grid.innerHTML = '';
    
    filtered.forEach((automation, index) => {
        setTimeout(() => {
            const automationCard = createAutomationCard(automation);
            grid.appendChild(automationCard);
        }, index * 100);
    });
    
    // Scroll to automations section
    scrollToSection('automations');
}

// Handle Contact Form Submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    // Rate limiting for contact form
    if (!checkContactFormRateLimit()) {
        showNotification('Muitas mensagens enviadas. Aguarde alguns minutos.');
        return;
    }
    
    const formData = new FormData(e.target);
    const rawContactData = Object.fromEntries(formData);
    
    // Sanitize all form inputs
    const contactData = {
        name: sanitizeInput(rawContactData.name),
        email: sanitizeInput(rawContactData.email),
        company: sanitizeInput(rawContactData.company || ''),
        automationType: sanitizeInput(rawContactData.automationType),
        budget: sanitizeInput(rawContactData.budget),
        description: sanitizeInput(rawContactData.description)
    };
    
    // Validate required fields
    if (!contactData.name || contactData.name.length < 2) {
        showNotification('Nome deve ter pelo menos 2 caracteres.');
        return;
    }
    
    if (!isValidEmail(contactData.email)) {
        showNotification('Email inválido.');
        return;
    }
    
    if (!contactData.description || contactData.description.length < 10) {
        showNotification('Descrição deve ter pelo menos 10 caracteres.');
        return;
    }
    
    // Check for spam patterns
    if (isSpamContent(contactData.description) || isSpamContent(contactData.name)) {
        showNotification('Mensagem rejeitada. Tente novamente com conteúdo válido.');
        return;
    }
    
    // Send email notification for contact form
    sendContactEmail(contactData);
    
    // Show success message
    showNotification('Mensagem enviada! Entraremos em contato em breve.');
    
    // Reset form
    e.target.reset();
}

// Send Contact Email
async function sendContactEmail(data) {
    try {
        // Using EmailJS for contact form
        if (window.emailjs && window.emailjs.send) {
            await window.emailjs.send(
                'service_5dijxng', 
                'template_1pnd4vi', 
                {
                    to_email: 'mxlsc@proton.me',
                    from_name: data.name,
                    customer_email: data.email,
                    product_name: `Contato - ${data.automationType}`,
                    product_price: data.budget,
                    payment_method: 'Formulário de Contato',
                    transaction_date: new Date().toLocaleString('pt-BR'),
                    transaction_id: generateTransactionId(),
                    product_description: `
Empresa: ${data.company || 'Não informado'}
Tipo: ${data.automationType}
Orçamento: ${data.budget}

Descrição:
${data.description}`
                }
            );
            console.log('Contact email sent successfully');
        } else {
            console.log('EmailJS not loaded for contact form');
        }
    } catch (error) {
        console.error('Contact email error:', error);
        throw error;
    }
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 100; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Show Demo
function showDemo() {
    showNotification('Demo em desenvolvimento! Em breve você poderá testar as automações.');
}

// Animate on Scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe elements that should animate
    document.querySelectorAll('.category-card, .automation-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize EmailJS
function initializeEmailService() {
    if (window.emailjs) {
        window.emailjs.init("6SIOK74c0Xp8zQ0yy");
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS library not loaded');
    }
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showDemo = showDemo;
window.buyAutomation = buyAutomation;
window.previewAutomation = previewAutomation;
window.closePaymentModal = closePaymentModal;
window.nextStep = nextStep;
window.selectPaymentMethod = selectPaymentMethod;