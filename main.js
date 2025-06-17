class RhodiumApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = null;
        this.currentNote = null;
        this.userData = {
            pages: [],
            notes: []
        };
        this.isCodeVisible = false;

        // Config Supabase
        this.supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        this.supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseKey);

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkAuthState();
        this.setupTabs();
        this.setupTextTools();
        this.setupAI();
    }

    // Encryption/Decryption XOR + base64
    encrypt(text, key = 'rhodium_secret_key') {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result);
    }

    decrypt(encryptedText, key = 'rhodium_secret_key') {
        try {
            const text = atob(encryptedText);
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return result;
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }

    // --- Supabase CRUD ---

    async loadUserDataFromSupabase() {
        if (!this.currentUser) return;

        const { data, error } = await this.supabase
            .from('Codes')
            .select('user_data, last_saved')
            .eq('code', this.currentUser.code)
            .single();

        if (error) {
            console.error('Erro ao carregar dados do Supabase:', error);
            return;
        }
        if (data && data.user_data) {
            const decrypted = this.decrypt(data.user_data);
            if (decrypted) {
                this.userData = JSON.parse(decrypted);
            } else {
                this.initializeUserData();
            }
        } else {
            this.initializeUserData();
        }
    }

    async saveUserDataToSupabase() {
        if (!this.currentUser) return;

        try {
            const encrypted = this.encrypt(JSON.stringify(this.userData));
            const now = new Date().toISOString();

            // Atualiza o registro do usuário pelo código
            const { error } = await this.supabase
                .from('Codes')
                .update({ user_data: encrypted, last_saved: now })
                .eq('code', this.currentUser.code);

            if (error) {
                console.error('Erro ao salvar dados no Supabase:', error);
            } else {
                console.log('Dados do usuário salvos no Supabase');
            }
        } catch (err) {
            console.error('Erro no saveUserDataToSupabase:', err);
        }
    }

    // --- Geração de código único (pra registro) ---
    async generateUniqueCode() {
        let code;
        let exists = true;
        while (exists) {
            code = Math.random().toString(36).substring(2, 10).toUpperCase();
            const { data, error } = await this.supabase
                .from('Codes')
                .select('code')
                .eq('code', code)
                .limit(1);

            if (error) {
                console.error('Erro ao verificar código único:', error);
                // Pra não travar, quebra o loop e aceita código gerado
                exists = false;
            } else {
                exists = data.length > 0;
            }
        }
        return code;
    }

    // --- Authentication ---

    async checkAuthState() {
        const savedUser = localStorage.getItem('rhodium_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            await this.loadUserDataFromSupabase();
            this.showMainApp();
            this.renderPages();
            this.renderNotes();
        } else {
            this.showLogin();
        }
    }

    async register(name) {
        if (!name.trim()) {
            alert('Por favor, insira um nome válido.');
            return false;
        }

        const userCode = await this.generateUniqueCode();

        const initialUserData = {
            pages: [],
            notes: []
        };

        const encryptedUserData = this.encrypt(JSON.stringify(initialUserData));

        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            code: userCode,
            created_at: new Date().toISOString(),
            last_saved: new Date().toISOString(),
            user_data: encryptedUserData
        };

        const { error } = await this.supabase
            .from('Codes')
            .insert(newUser);

        if (error) {
            console.error('Erro ao criar conta no Supabase:', error);
            alert('Erro ao criar conta. Tente novamente.');
            return false;
        }

        this.currentUser = {
            id: newUser.id,
            name: newUser.name,
            code: newUser.code,
            createdAt: newUser.created_at,
            lastSaved: newUser.last_saved
        };
        this.userData = initialUserData;

        localStorage.setItem('rhodium_current_user', JSON.stringify(this.currentUser));
        this.showMainApp();
        this.showGeneratedCode(userCode);

        return true;
    }

    async login(code) {
        const trimmedCode = code.trim().toUpperCase();
        const { data, error } = await this.supabase
            .from('Codes')
            .select('*')
            .eq('code', trimmedCode)
            .single();

        if (error || !data) {
            alert('Código inválido.');
            return false;
        }

        this.currentUser = {
            id: data.id,
            name: data.name,
            code: data.code,
            createdAt: data.created_at,
            lastSaved: data.last_saved
        };

        localStorage.setItem('rhodium_current_user', JSON.stringify(this.currentUser));
        await this.loadUserDataFromSupabase();
        this.showMainApp();
        this.renderPages();
        this.renderNotes();

        return true;
    }

    showGeneratedCode(code) {
        alert(`Sua conta foi criada com sucesso!\n\nSeu código de acesso é: ${code}\n\nGuarde este código com segurança, você precisará dele para fazer login.`);
    }

    logout() {
        this.currentUser = null;
        this.userData = { pages: [], notes: [] };
        localStorage.removeItem('rhodium_current_user');
        this.showLogin();
    }


    toggleCodeVisibility() {
        this.isCodeVisible = !this.isCodeVisible;
        const codeDisplay = document.getElementById('userCodeDisplay');
        const toggleBtn = document.getElementById('toggleCodeBtn');

        if (this.isCodeVisible) {
            codeDisplay.textContent = this.currentUser.code;
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            codeDisplay.textContent = '••••••••';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }

    // UI Navigation
    showLogin() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('registerScreen').classList.remove('active');
        document.getElementById('mainApp').classList.remove('active');
    }

    showRegister() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('registerScreen').classList.add('active');
        document.getElementById('mainApp').classList.remove('active');
    }

    showMainApp() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('registerScreen').classList.remove('active');
        document.getElementById('mainApp').classList.add('active');

        if (this.currentUser) {
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userCodeDisplay').textContent = '••••••••';
            this.isCodeVisible = false;
        }
    }

    setupTabs() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.dataset.tab;
                this.showTab(tabName);

                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    showTab(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');

        if (tabName === 'workspace') {
            this.renderPages();
        } else if (tabName === 'notes') {
            this.renderNotes();
        }
    }

    // Data Management
    initializeUserData() {
        this.userData = { pages: [], notes: [] };
        this.saveUserDataToSupabase();
    }

    saveUserData() {
        this.saveUserDataToSupabase();
    }

    // Pages Management
    createPage(title = 'Nova Página', content = '') {
        const page = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.userData.pages.push(page);
        this.saveUserData();
        return page;
    }

    editPage(pageId) {
        const page = this.userData.pages.find(p => p.id === pageId);
        if (page) {
            this.currentPage = page;
            this.showPageEditor(page);
        }
    }

    savePage() {
        if (this.currentPage) {
            const title = document.getElementById('pageTitle').value;
            const content = document.getElementById('pageContent').innerHTML;

            this.currentPage.title = title || 'Sem título';
            this.currentPage.content = content;
            this.currentPage.updatedAt = new Date().toISOString();

            this.saveUserData();
            this.hidePageEditor();
            this.renderPages();
        }
    }

    deletePage(pageId) {
        if (confirm('Tem certeza que deseja excluir esta página?')) {
            this.userData.pages = this.userData.pages.filter(p => p.id !== pageId);
            this.saveUserData();
            this.renderPages();
        }
    }

    showPageEditor(page) {
        document.getElementById('pageTitle').value = page.title;
        document.getElementById('pageContent').innerHTML = page.content;
        document.getElementById('pageEditor').classList.remove('hidden');
        document.getElementById('pagesList').style.display = 'none';
    }

    hidePageEditor() {
        document.getElementById('pageEditor').classList.add('hidden');
        document.getElementById('pagesList').style.display = 'grid';
        this.currentPage = null;
    }

    renderPages() {
        const pagesList = document.getElementById('pagesList');
        pagesList.innerHTML = '';

        this.userData.pages.forEach(page => {
            const pageCard = document.createElement('div');
            pageCard.className = 'page-card';
            pageCard.innerHTML = `
                <h3>${page.title}</h3>
                <p>${this.stripHtml(page.content).substring(0, 100)}${page.content.length > 100 ? '...' : ''}</p>
                <div class="page-date">Atualizado em ${new Date(page.updatedAt).toLocaleDateString('pt-BR')}</div>
                <div style="margin-top: 15px;">
                    <button onclick="app.editPage('${page.id}')" class="btn-secondary" style="margin-right: 10px;">EDITAR</button>
                    <button onclick="app.deletePage('${page.id}')" class="btn-secondary" style="background: #000000; color: white;">EXCLUIR</button>
                </div>
            `;
            pagesList.appendChild(pageCard);
        });
    }

    // Notes Management
    createNote(title = 'Nova Nota', content = '') {
        const note = {
            id: Date.now().toString(),
            title,
            content,
            createdAt: new Date().toISOString()
        };

        this.userData.notes.push(note);
        this.saveUserData();
        this.renderNotes();
        return note;
    }

    editNote(noteId) {
        const note = this.userData.notes.find(n => n.id === noteId);
        if (note) {
            this.currentNote = note;
            this.showNoteEditor(note);
        }
    }

    saveNote() {
        if (this.currentNote) {
            const title = document.getElementById('noteTitle').value;
            const content = document.getElementById('noteContent').innerHTML;

            this.currentNote.title = title || 'Sem título';
            this.currentNote.content = content;

            this.saveUserData();
            this.hideNoteEditor();
            this.renderNotes();
        }
    }

    deleteNote(noteId) {
        if (confirm('Tem certeza que deseja excluir esta nota?')) {
            this.userData.notes = this.userData.notes.filter(n => n.id !== noteId);
            this.saveUserData();
            this.renderNotes();
        }
    }

    showNoteEditor(note) {
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').innerHTML = note.content;
        document.getElementById('noteEditor').classList.remove('hidden');
        document.getElementById('notesList').style.display = 'none';
    }

    hideNoteEditor() {
        document.getElementById('noteEditor').classList.add('hidden');
        document.getElementById('notesList').style.display = 'grid';
        this.currentNote = null;
    }

    renderNotes() {
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        this.userData.notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${this.stripHtml(note.content).substring(0, 150)}${note.content.length > 150 ? '...' : ''}</p>
                <div class="note-date">Criado em ${new Date(note.createdAt).toLocaleDateString('pt-BR')}</div>
                <div style="margin-top: 15px;">
                    <button onclick="app.editNote('${note.id}')" class="btn-secondary" style="margin-right: 10px;">EDITAR</button>
                    <button onclick="app.deleteNote('${note.id}')" class="btn-secondary" style="background: #000000; color: white;">EXCLUIR</button>
                </div>
            `;
            notesList.appendChild(noteCard);
        });
    }

    // Enhanced PDF Processing
    async processPDF(file, mode = 'summarize') {
        try {
            document.getElementById('loadingOverlay').classList.remove('hidden');

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

            let fullText = '';
            let structure = {
                totalPages: pdf.numPages,
                pageTexts: [],
                headings: [],
                paragraphs: []
            };

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
                structure.pageTexts.push({
                    page: i,
                    text: pageText,
                    wordCount: pageText.split(' ').length
                });
            }

            switch (mode) {
                case 'summarize':
                    const summary = this.generateSummary(fullText);
                    document.getElementById('summaryText').textContent = summary;
                    document.getElementById('summaryResult').classList.remove('hidden');
                    break;

                case 'extract':
                    document.getElementById('extractedText').textContent = fullText;
                    document.getElementById('textResult').classList.remove('hidden');
                    break;

                case 'structure':
                    this.analyzeStructure(fullText, structure);
                    break;

                case 'questions':
                    const questions = this.generateQuestions(fullText);
                    document.getElementById('generatedQuestions').innerHTML = questions;
                    document.getElementById('questionsResult').classList.remove('hidden');
                    break;
            }

        } catch (error) {
            console.error('PDF processing error:', error);
            alert('Erro ao processar PDF. Verifique se o arquivo é válido.');
        } finally {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }
    }

    generateSummary(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.toLowerCase().split(/\s+/);

        const wordFreq = {};
        words.forEach(word => {
            const cleanWord = word.replace(/[^\w]/g, '');
            if (cleanWord.length > 3) {
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
            }
        });

        const sentenceScores = sentences.map(sentence => {
            const sentenceWords = sentence.toLowerCase().split(/\s+/);
            let score = 0;
            sentenceWords.forEach(word => {
                const cleanWord = word.replace(/[^\w]/g, '');
                if (wordFreq[cleanWord]) {
                    score += wordFreq[cleanWord];
                }
            });
            return { sentence: sentence.trim(), score };
        });

        sentenceScores.sort((a, b) => b.score - a.score);
        const summaryLength = Math.min(8, Math.ceil(sentences.length * 0.4));
        const topSentences = sentenceScores.slice(0, summaryLength);

        return topSentences.map(item => item.sentence).join('. ') + '.';
    }

    analyzeStructure(text, structure) {
        const lines = text.split('\n');
        const headings = [];
        const paragraphs = [];

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed.length > 0) {
                if (trimmed.length < 100 && /^[A-Z]/.test(trimmed)) {
                    headings.push(`Linha ${index + 1}: ${trimmed}`);
                } else if (trimmed.length > 50) {
                    paragraphs.push(`Parágrafo ${paragraphs.length + 1}: ${trimmed.substring(0, 100)}...`);
                }
            }
        });

        const structureHtml = `
            <h4>INFORMAÇÕES GERAIS:</h4>
            <p>Total de páginas: ${structure.totalPages}</p>
            <p>Total de palavras: ${text.split(' ').length}</p>
            <p>Total de caracteres: ${text.length}</p>
            
            <h4>POSSÍVEIS TÍTULOS/CABEÇALHOS:</h4>
            <ul>${headings.slice(0, 10).map(h => `<li>${h}</li>`).join('')}</ul>
            
            <h4>ESTRUTURA DE PARÁGRAFOS:</h4>
            <ul>${paragraphs.slice(0, 5).map(p => `<li>${p}</li>`).join('')}</ul>
        `;

        document.getElementById('documentStructure').innerHTML = structureHtml;
        document.getElementById('structureResult').classList.remove('hidden');
    }

    generateQuestions(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        const keywords = this.extractKeywords(text);
        const questions = [];

        // Gerar perguntas baseadas em palavras-chave
        keywords.slice(0, 5).forEach(keyword => {
            questions.push(`O que é ${keyword}?`);
            questions.push(`Como ${keyword} se relaciona com o tema principal?`);
        });

        // Gerar perguntas baseadas em frases importantes
        const importantSentences = sentences.filter(s => s.length > 50 && s.length < 200).slice(0, 3);
        importantSentences.forEach(sentence => {
            if (sentence.includes('porque') || sentence.includes('causa')) {
                questions.push(`Por que ${sentence.split(' ').slice(0, 5).join(' ')}...?`);
            } else {
                questions.push(`Explique: ${sentence.substring(0, 80)}...`);
            }
        });

        return questions.map((q, i) => `<p><strong>Pergunta ${i + 1}:</strong> ${q}</p>`).join('');
    }

    extractKeywords(text) {
        const words = text.toLowerCase().split(/\s+/);
        const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'para', 'por', 'com', 'sem', 'sob', 'sobre', 'entre', 'até', 'desde', 'durante', 'através', 'mediante', 'conforme', 'segundo', 'perante', 'ante', 'após', 'antes', 'contra', 'desde', 'exceto', 'salvo', 'menos', 'mais', 'muito', 'pouco', 'tanto', 'quanto', 'qual', 'que', 'quem', 'onde', 'quando', 'como', 'porque', 'se', 'mas', 'ou', 'e', 'nem', 'também', 'já', 'ainda', 'só', 'apenas', 'mesmo', 'até', 'inclusive', 'exclusive']);

        const wordFreq = {};
        words.forEach(word => {
            const cleanWord = word.replace(/[^\w]/g, '');
            if (cleanWord.length > 4 && !stopWords.has(cleanWord)) {
                wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
            }
        });

        return Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(entry => entry[0]);
    }

    // Text Tools
    setupTextTools() {
        const wordCountText = document.getElementById('wordCountText');
        const formatText = document.getElementById('formatText');

        if (wordCountText) {
            wordCountText.addEventListener('input', () => {
                const text = wordCountText.value;
                document.getElementById('charCount').textContent = text.length;
                document.getElementById('wordCount').textContent = text.split(/\s+/).filter(w => w.length > 0).length;
                document.getElementById('paragraphCount').textContent = text.split('\n').filter(p => p.trim().length > 0).length;
            });
        }

        // Format buttons
        document.getElementById('upperCase')?.addEventListener('click', () => {
            const text = formatText.value;
            document.getElementById('formatResult').value = text.toUpperCase();
        });

        document.getElementById('lowerCase')?.addEventListener('click', () => {
            const text = formatText.value;
            document.getElementById('formatResult').value = text.toLowerCase();
        });

        document.getElementById('titleCase')?.addEventListener('click', () => {
            const text = formatText.value;
            document.getElementById('formatResult').value = text.replace(/\w\S*/g, (txt) =>
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        });

        document.getElementById('removeSpaces')?.addEventListener('click', () => {
            const text = formatText.value;
            document.getElementById('formatResult').value = text.replace(/\s+/g, ' ').trim();
        });
    }

    // AI Assistant
    setupAI() {
        const aiMessages = document.getElementById('chatMessages');

        // Tool buttons
        document.querySelectorAll('.ai-tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.dataset.prompt;
                document.getElementById('aiInput').value = prompt;
            });
        });
    }

    sendAIMessage(message) {
        const messagesContainer = document.getElementById('chatMessages');

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        messagesContainer.appendChild(userMessage);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai';
            aiMessage.textContent = this.generateAIResponse(message);
            messagesContainer.appendChild(aiMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateAIResponse(message) {
        const responses = {
            'resumir': 'Para resumir um texto, identifique as ideias principais e elimine informações redundantes.',
            'traduzir': 'Para tradução precisa, considere o contexto e as nuances culturais.',
            'corrigir': 'Verificando gramática e ortografia do texto fornecido.',
            'explicar': 'Vou explicar o conceito de forma clara e didática.'
        };

        const lowerMessage = message.toLowerCase();
        for (const key in responses) {
            if (lowerMessage.includes(key)) {
                return responses[key];
            }
        }

        return 'Estou aqui para ajudar! Posso resumir textos, traduzir, corrigir gramática ou explicar conceitos. Como posso ajudá-lo?';
    }

    // Utility Methods
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // Event Binding
    bindEvents() {
        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('loginCode').value;
            this.login(code);
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            this.register(name);
        });

        document.getElementById('toggleCodeBtn')?.addEventListener('click', () => {
            this.toggleCodeVisibility();
        });

        document.getElementById('showRegister').addEventListener('click', () => {
            this.showRegister();
        });

        document.getElementById('showLogin').addEventListener('click', () => {
            this.showLogin();
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            this.showTab('settings');
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelector('[data-tab="settings"]').classList.add('active');

            if (this.currentUser) {
                document.getElementById('settingsUserName').textContent = this.currentUser.name;
            }
        });

        // Page management
        document.getElementById('addPageBtn').addEventListener('click', () => {
            const page = this.createPage();
            this.editPage(page.id);
        });

        document.getElementById('savePageBtn').addEventListener('click', () => {
            this.savePage();
        });

        document.getElementById('closeEditorBtn').addEventListener('click', () => {
            this.hidePageEditor();
        });

        // Note management
        document.getElementById('addNoteBtn')?.addEventListener('click', () => {
            const note = this.createNote();
            this.editNote(note.id);
        });

        document.getElementById('saveNoteBtn')?.addEventListener('click', () => {
            this.saveNote();
        });

        document.getElementById('closeNoteBtn')?.addEventListener('click', () => {
            this.hideNoteEditor();
        });

        // Toolbar events
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const value = btn.dataset.value;

                if (action === 'insertImage') {
                    const url = prompt('URL da imagem:');
                    if (url) {
                        document.execCommand('insertImage', false, url);
                    }
                } else if (action === 'createLink') {
                    const url = prompt('URL do link:');
                    if (url) {
                        document.execCommand('createLink', false, url);
                    }
                } else if (action === 'formatBlock') {
                    document.execCommand(action, false, value);
                } else {
                    document.execCommand(action, false, null);
                }
            });
        });

        // PDF upload
        const uploadZone = document.getElementById('uploadZone');
        const pdfInput = document.getElementById('pdfInput');

        uploadZone.addEventListener('click', () => {
            pdfInput.click();
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.background = '#e0e0e0';
        });

        uploadZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadZone.style.background = '#f8f8f8';
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.background = '#f8f8f8';
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type === 'application/pdf') {
                this.handlePDFUpload(files[0]);
            }
        });

        pdfInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handlePDFUpload(e.target.files[0]);
            }
        });

        // PDF analysis buttons
        document.getElementById('summarizePdf')?.addEventListener('click', () => {
            const file = pdfInput.files[0];
            if (file) this.processPDF(file, 'summarize');
        });

        document.getElementById('extractText')?.addEventListener('click', () => {
            const file = pdfInput.files[0];
            if (file) this.processPDF(file, 'extract');
        });

        document.getElementById('analyzeStructure')?.addEventListener('click', () => {
            const file = pdfInput.files[0];
            if (file) this.processPDF(file, 'structure');
        });

        document.getElementById('generateQuestions')?.addEventListener('click', () => {
            const file = pdfInput.files[0];
            if (file) this.processPDF(file, 'questions');
        });

        // Save buttons
        document.getElementById('saveSummary')?.addEventListener('click', () => {
            const summaryText = document.getElementById('summaryText').textContent;
            const fileName = document.getElementById('fileName').textContent;
            this.createNote(`Resumo: ${fileName}`, summaryText);
            alert('Resumo salvo nas suas notas!');
        });

        document.getElementById('saveText')?.addEventListener('click', () => {
            const extractedText = document.getElementById('extractedText').textContent;
            const fileName = document.getElementById('fileName').textContent;
            this.createNote(`Texto extraído: ${fileName}`, extractedText);
            alert('Texto salvo nas suas notas!');
        });

        document.getElementById('saveQuestions')?.addEventListener('click', () => {
            const questions = document.getElementById('generatedQuestions').innerHTML;
            const fileName = document.getElementById('fileName').textContent;
            this.createNote(`Perguntas: ${fileName}`, questions);
            alert('Perguntas salvas nas suas notas!');
        });

        // AI Assistant
        document.getElementById('sendAi')?.addEventListener('click', () => {
            const input = document.getElementById('aiInput');
            const message = input.value.trim();
            if (message) {
                this.sendAIMessage(message);
                input.value = '';
            }
        });

        document.getElementById('aiInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('sendAi').click();
            }
        });
    }

    handlePDFUpload(file) {
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('pdfPreview').classList.remove('hidden');

        // Hide all result sections
        document.querySelectorAll('.result-section').forEach(section => {
            section.classList.add('hidden');
        });
    }
}

// Initialize app
const app = new RhodiumApp();
