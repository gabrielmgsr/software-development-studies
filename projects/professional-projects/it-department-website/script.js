// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ===== PARTICLES CANVAS =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                this.x -= dx * 0.01;
                this.y -= dy * 0.01;
                this.opacity = Math.min(0.8, this.opacity + 0.02);
            }
        }

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

function initParticles() {
    const count = Math.min(120, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(44, 194, 124, ${0.1 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const cards = entry.target.querySelectorAll('.stat-card, .service-card, .team-card, .news-card-main, .news-card-sm, .monitor-panel, .mini-card');
            cards.forEach((card, i) => {
                setTimeout(() => card.classList.add('visible'), i * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .stat-card, .service-card, .team-card, .news-card-main, .news-card-sm').forEach(el => {
    revealObserver.observe(el);
});

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        if (isDecimal) {
            el.textContent = current.toFixed(2) + suffix;
        } else {
            el.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-wrap').forEach(el => {
    counterObserver.observe(el);
});

// ===== SERVER LIST =====
const servers = [
    { name: 'srv-pma-web-01', type: 'Portal Principal', status: 'online', uptime: '99.99%', load: 23 },
    { name: 'srv-pma-db-01', type: 'Banco de Dados', status: 'online', uptime: '99.97%', load: 45 },
    { name: 'srv-pma-core', type: 'Servidor Central', status: 'online', uptime: '99.95%', load: 55 },
    { name: 'srv-pma-saude', type: 'Sistemas Saúde', status: 'online', uptime: '99.98%', load: 34 },
    { name: 'srv-pma-educa', type: 'Sistemas Educação', status: 'warning', uptime: '98.2%', load: 72 },
    { name: 'srv-pma-bck-01', type: 'Storage Backup', status: 'online', uptime: '99.99%', load: 15 },
];

function renderServers() {
    const list = document.getElementById('serverList');
    if (!list) return;
    list.innerHTML = '';
    servers.forEach(s => {
        s.load = Math.min(100, Math.max(2, s.load + (Math.random() - 0.5) * 8));
        const loadClass = s.load < 40 ? 'low' : s.load < 70 ? 'medium' : 'high';
        const statusLabel = s.status === 'online' ? '🟢 Online' : s.status === 'warning' ? '🟡 Warning' : '🔴 Offline';

        list.innerHTML += `
            <div class="server-item">
                <div class="server-info">
                    <div class="server-status-dot ${s.status}"></div>
                    <div>
                        <div class="server-name">${s.name}</div>
                        <div class="server-type">${s.type}</div>
                    </div>
                </div>
                <div class="server-metrics">
                    <div class="server-uptime">${s.uptime !== '-' ? s.uptime + ' uptime' : statusLabel}</div>
                    <div class="server-load-bar">
                        <div class="server-load-fill ${loadClass}" style="width:${s.load}%"></div>
                    </div>
                </div>
            </div>
        `;
    });
}

renderServers();
setInterval(renderServers, 3000);

// ===== CPU CHART =====
const cpuValues = [];
for (let i = 0; i < 24; i++) cpuValues.push(Math.random() * 40 + 20);

function renderCpuChart() {
    const chart = document.getElementById('cpuChart');
    if (!chart) return;
    const val = Math.min(95, Math.max(15, parseInt(cpuValues[cpuValues.length - 1]) + (Math.random() - 0.5) * 12));
    cpuValues.push(val);
    cpuValues.shift();

    chart.innerHTML = '';
    cpuValues.forEach(v => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = v + '%';
        bar.style.background = v < 40 ? '#2CC27C' : v < 70 ? '#F9C61A' : '#E74C3C';
        bar.style.opacity = '0.85';
        chart.appendChild(bar);
    });

    const cpuEl = document.getElementById('cpuValue');
    if (cpuEl) cpuEl.textContent = Math.round(val);
}

renderCpuChart();
setInterval(renderCpuChart, 2000);

// ===== ACTIVITY FEED =====
const activities = [
    { text: '<strong>srv-pma-core</strong> otimização automatizada', color: '#2CC27C', time: 'agora' },
    { text: '<strong>Firewall</strong> bloqueou tentativa de acesso indevido', color: '#F9C61A', time: '2 min atrás' },
    { text: '<strong>Backup</strong> rotina concluída com sucesso', color: '#2CC27C', time: '8 min atrás' },
    { text: '<strong>Certificado SSL</strong> renovado com sucesso', color: '#3C6F99', time: '15 min atrás' },
];

function renderActivities() {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;
    feed.innerHTML = '';
    activities.forEach(a => {
        feed.innerHTML += `
            <div class="activity-item">
                <div class="activity-dot" style="background:${a.color};box-shadow:0 0 6px ${a.color}"></div>
                <div>
                    <div class="activity-text">${a.text}</div>
                    <div class="activity-time">${a.time}</div>
                </div>
            </div>
        `;
    });
}

renderActivities();

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const links = document.querySelector('.nav-links');
        if (links.style.display === 'flex') {
            links.style.display = 'none';
        } else {
            links.style.display = 'flex';
            links.style.position = 'fixed';
            links.style.top = '70px';
            links.style.left = '0';
            links.style.right = '0';
            links.style.flexDirection = 'column';
            links.style.background = '#102130';
            links.style.padding = '20px';
            links.style.gap = '8px';
            links.style.zIndex = '999';
        }
    });
}

// ===== SMOOTH SCROLL =====
// ===== SMOOTH SCROLL (Apenas para links internos que usam #) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

console.log('%c🚀 Prefeitura de Maracaju - Departamento de TI', 'color: #F9C61A; font-size: 16px; font-weight: bold;');

// ===== CARREGAR NOTÍCIAS DO PAINEL ADMIN NO SITE PRINCIPAL =====
function loadMainPageNews() {
    const newsGrid = document.getElementById('mainNewsGrid');
    if (!newsGrid) return;

    // Busca as notícias salvas pelo Admin no LocalStorage
    const savedNews = localStorage.getItem('maracaju_ti_news');
    
    // Se não houver notícias cadastradas, não faz nada
    if (!savedNews) return;

    const newsList = JSON.parse(savedNews);
    if (newsList.length === 0) return;

    // Limpa a grid antes de renderizar
    newsGrid.innerHTML = '';

    // Renderiza cada notícia cadastrada no Admin
    newsList.forEach((news, index) => {
        // Se for a primeira notícia, faz o card grande (Destaque)
        if (index === 0) {
            const mainCard = document.createElement('div');
            mainCard.className = 'news-card-main visible';
            mainCard.innerHTML = `
                <div class="news-img">
                    ${news.image ? `<img src="${news.image}" style="width:100%;height:100%;object-fit:cover;">` : news.icon || '🏗️'}
                    <span class="news-img-label tag tag-urgent">${news.category || 'Destaque'}</span>
                </div>
                <div class="news-card-body">
                    <div class="news-date">📅 ${news.date}</div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    ${news.audio ? `<div style="margin-top:16px;"><audio controls src="${news.audio}" style="width:100%;height:36px;"></audio></div>` : ''}
                    ${news.code ? `
                        <div class="code-block" style="margin-top:24px;">
                            <pre style="margin:0;white-space:pre-wrap;color:var(--verde);">${news.code}</pre>
                        </div>
                    ` : ''}
                </div>
            `;
            newsGrid.appendChild(mainCard);
        } else {
            // Demais notícias ficam em cards menores
            const smCard = document.createElement('div');
            smCard.className = 'news-card-sm visible';
            smCard.innerHTML = `
                <div class="news-thumb" style="background:rgba(249, 198, 26, 0.15);">
                    ${news.image ? `<img src="${news.image}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">` : (news.icon || '📰')}
                </div>
                <div style="flex:1;">
                    <div class="news-date">📅 ${news.date} — <span style="color:var(--verde);">${news.category}</span></div>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt}</p>
                    ${news.audio ? `<div style="margin-top:10px;"><audio controls src="${news.audio}" style="width:100%;height:32px;"></audio></div>` : ''}
                </div>
            `;
            newsGrid.appendChild(smCard);
        }
    });
}

// Executa a função assim que a página carregar
document.addEventListener('DOMContentLoaded', loadMainPageNews);