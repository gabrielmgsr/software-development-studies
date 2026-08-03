// ===== CARREGAMENTO (LOADER) =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1200);
});

// ===== PARTICLES CANVAS BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 198, 26, ${this.opacity})`;
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// CURSOR GLOW
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== LÓGICA DE AUTENTICAÇÃO (LOGIN) =====
const loginForm = document.getElementById('loginForm');
const loginWrapper = document.getElementById('loginWrapper');
const adminDashboard = document.getElementById('adminDashboard');
const loginError = document.getElementById('loginError');
const btnLogout = document.getElementById('btnLogout');

// Verifica se já está logado na sessão atual
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userVal = document.getElementById('username').value.trim();
    const passVal = document.getElementById('password').value;

    // CREDENCIAIS SOLICITADAS: admin / Senha@2026
    if (userVal === 'admin' && passVal === 'Senha@2026') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        loginError.classList.remove('active');
        showDashboard();
    } else {
        loginError.classList.add('active');
    }
});

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    adminDashboard.classList.add('hidden');
    loginWrapper.classList.remove('hidden');
});

function showDashboard() {
    loginWrapper.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    renderNewsList();
}

// ===== GERENCIAMENTO DE NOTÍCIAS (LOCALSTORAGE) =====
const newsForm = document.getElementById('newsForm');
const newsList = document.getElementById('newsList');
const newsCount = document.getElementById('newsCount');

// Notícias Padrão (Exemplo Inicial caso esteja vazio)
const defaultNews = [
    {
        id: 1,
        title: "Departamento de TI completa modernização do Data Center Municipal",
        category: "Destaque",
        icon: "🏗️",
        date: "15 de Janeiro, 2025",
        excerpt: "Toda a infraestrutura municipal passou por um processo de modernização e migração com zero downtime.",
        code: "// system-status.config — Maracaju Municipal Core\napiVersion: v1\nkind: InfrastructureStatus\nmetadata:\n  municipality: maracaju-ms\n  status: 100% OPERATIONAL"
    },
    {
        id: 2,
        title: "Segurança cibernética reforçada nos sistemas da prefeitura",
        category: "URGENTE",
        icon: "🔐",
        date: "12 de Janeiro, 2025",
        excerpt: "Verificação contínua de segurança e firewall de nova geração ativados em toda a rede.",
        code: ""
    }
];

function getNews() {
    const saved = localStorage.getItem('maracaju_ti_news');
    if (!saved) {
        localStorage.setItem('maracaju_ti_news', JSON.stringify(defaultNews));
        return defaultNews;
    }
    return JSON.parse(saved);
}

function saveNews(newsArray) {
    localStorage.setItem('maracaju_ti_news', JSON.stringify(newsArray));
    renderNewsList();
}

function renderNewsList() {
    const news = getNews();
    newsList.innerHTML = '';
    newsCount.textContent = `${news.length} notícias`;

    if (news.length === 0) {
        newsList.innerHTML = '<p style="color:var(--text-secondary);font-size:13px;">Nenhuma notícia publicada ainda.</p>';
        return;
    }

    news.forEach(item => {
        const div = document.createElement('div');
        div.className = 'admin-news-item';
        div.innerHTML = `
            <div class="admin-news-item-body">
                <div class="admin-news-item-title">${item.icon} ${item.title}</div>
                <div class="admin-news-item-date">📅 ${item.date} — <span style="color:var(--verde);">${item.category}</span></div>
                <div class="admin-news-item-desc">${item.excerpt}</div>
            </div>
            <button class="btn-delete" onclick="deleteNews(${item.id})">Excluir</button>
        `;
        newsList.appendChild(div);
    });
}

newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const news = getNews();
    const now = new Date();
    const dateFormatted = `${now.getDate()} de ${getMonthName(now.getMonth())}, ${now.getFullYear()}`;

    const newPost = {
        id: Date.now(),
        title: document.getElementById('newsTitle').value.trim(),
        category: document.getElementById('newsCategory').value,
        icon: document.getElementById('newsIcon').value.trim() || '📰',
        date: dateFormatted,
        excerpt: document.getElementById('newsExcerpt').value.trim(),
        code: document.getElementById('newsCode').value.trim()
    };

    news.unshift(newPost); // Adiciona no início
    saveNews(news);

    newsForm.reset();
    alert('✅ Notícia publicada com sucesso!');
});

window.deleteNews = function(id) {
    if (confirm('Tem certeza que deseja excluir esta notícia?')) {
        let news = getNews();
        news = news.filter(n => n.id !== id);
        saveNews(news);
    }
};

function getMonthName(monthIndex) {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return months[monthIndex];
}