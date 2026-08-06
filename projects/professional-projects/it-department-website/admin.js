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

// ===== AUTENTICAÇÃO E LOGIN DE ADMINISTRADORES =====
const loginForm = document.getElementById('loginForm');
const loginWrapper = document.getElementById('loginWrapper');
const adminDashboard = document.getElementById('adminDashboard');
const loginError = document.getElementById('loginError');
const btnLogout = document.getElementById('btnLogout');

// Lista inicial de admins
const defaultAdmins = [
    { username: 'admin', password: 'Senha@2026' }
];

function getAdmins() {
    const saved = localStorage.getItem('maracaju_ti_admins');
    if (!saved) {
        localStorage.setItem('maracaju_ti_admins', JSON.stringify(defaultAdmins));
        return defaultAdmins;
    }
    return JSON.parse(saved);
}

if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const uVal = document.getElementById('username').value.trim();
    const pVal = document.getElementById('password').value;
    const admins = getAdmins();

    const userMatch = admins.find(a => a.username === uVal && a.password === pVal);

    if (userMatch) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('activeUser', uVal);
        loginError.classList.remove('active');
        showDashboard();
    } else {
        loginError.classList.add('active');
    }
});

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('activeUser');
    adminDashboard.classList.add('hidden');
    loginWrapper.classList.remove('hidden');
});

function showDashboard() {
    loginWrapper.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    document.getElementById('currentUserBadge').textContent = `🟢 Logado: ${sessionStorage.getItem('activeUser') || 'Admin'}`;
    renderNewsList();
    renderUserList();
}

// ===== GESTÃO DE USUÁRIOS ADMIN =====
const addUserForm = document.getElementById('addUserForm');
const userList = document.getElementById('userList');
const userCount = document.getElementById('userCount');

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = document.getElementById('newUsername').value.trim();
    const newPass = document.getElementById('newPassword').value;

    let admins = getAdmins();
    if (admins.some(a => a.username === newUser)) {
        alert('❌ Este nome de usuário já existe!');
        return;
    }

    admins.push({ username: newUser, password: newPass });
    localStorage.setItem('maracaju_ti_admins', JSON.stringify(admins));
    addUserForm.reset();
    renderUserList();
    alert('✅ Novo administrador cadastrado com sucesso!');
});

function renderUserList() {
    const admins = getAdmins();
    userList.innerHTML = '';
    userCount.textContent = `${admins.length} usuários`;

    admins.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'admin-news-item';
        div.innerHTML = `
            <div class="admin-news-item-body">
                <div class="admin-news-item-title">👤 ${item.username}</div>
            </div>
            ${item.username !== 'admin' ? `<button class="btn-delete" onclick="deleteUser(${index})">Remover</button>` : '<span style="font-size:11px;color:var(--amarelo);">Principal</span>'}
        `;
        userList.appendChild(div);
    });
}

window.deleteUser = function(index) {
    if (confirm('Deseja remover este acesso de administrador?')) {
        let admins = getAdmins();
        admins.splice(index, 1);
        localStorage.setItem('maracaju_ti_admins', JSON.stringify(admins));
        renderUserList();
    }
};

// ===== GESTÃO DE NOTÍCIAS (COM SUPORTE A FOTOS, ÁUDIOS E CÓDIGO/LOGS) =====
const newsForm = document.getElementById('newsForm');
const newsList = document.getElementById('newsList');
const newsCount = document.getElementById('newsCount');

// Notícias originais padrão mantidas
const defaultNews = [
    {
        id: 1,
        title: "Departamento de TI completa modernização do Data Center Municipal",
        category: "Destaque",
        icon: "🏗️",
        date: "15 de Janeiro, 2025",
        excerpt: "Toda a infraestrutura municipal passou por um processo de modernização e migração com zero downtime.",
        code: "// system-status.config — Maracaju Municipal Core\napiVersion: v1\nkind: InfrastructureStatus\nmetadata:\n  municipality: maracaju-ms\n  status: 100% OPERATIONAL",
        image: null,
        audio: null
    },
    {
        id: 2,
        title: "Segurança cibernética reforçada nos sistemas da prefeitura",
        category: "URGENTE",
        icon: "🔐",
        date: "12 de Janeiro, 2025",
        excerpt: "Verificação contínua de segurança e firewall de nova geração ativados em toda a rede.",
        code: "",
        image: null,
        audio: null
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

newsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const imageFile = document.getElementById('newsImage').files[0];
    const audioFile = document.getElementById('newsAudio').files[0];

    const imageBase64 = imageFile ? await fileToBase64(imageFile) : null;
    const audioBase64 = audioFile ? await fileToBase64(audioFile) : null;

    const now = new Date();
    const dateFormatted = `${now.getDate()} de ${getMonthName(now.getMonth())}, ${now.getFullYear()}`;

    const newPost = {
        id: Date.now(),
        title: document.getElementById('newsTitle').value.trim(),
        category: document.getElementById('newsCategory').value,
        icon: document.getElementById('newsIcon').value.trim() || '📰',
        date: dateFormatted,
        excerpt: document.getElementById('newsExcerpt').value.trim(),
        code: document.getElementById('newsCode') ? document.getElementById('newsCode').value.trim() : '',
        image: imageBase64,
        audio: audioBase64
    };

    const news = getNews();
    news.unshift(newPost);
    saveNews(news);

    newsForm.reset();
    alert('✅ Notícia publicada com sucesso!');
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
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
                ${item.image ? `<div style="margin-top:8px;"><img src="${item.image}" style="max-width:150px;max-height:100px;border-radius:8px;object-fit:cover;"></div>` : ''}
                ${item.audio ? `<div style="margin-top:8px;"><audio controls src="${item.audio}" style="height:32px;width:100%;max-width:300px;"></audio></div>` : ''}
            </div>
            <button class="btn-delete" onclick="deleteNews(${item.id})">Excluir</button>
        `;
        newsList.appendChild(div);
    });
}

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