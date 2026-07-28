/* ============================================
   LOADING SCREEN
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');

    // Esconde o loader após carregar
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 600);
    });

    // Caso carregamento rápido, remove após timeout de segurança
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);
});

/* ============================================
   HEADER - SCROLL EFFECT
   ============================================ */
const header = document.getElementById('main-header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow + border gold
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link based on scroll
    updateActiveNav();
});

// Back to top click
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    
    // Anima os ícones do hamburger
    const spans = menuToggle.querySelectorAll('span');
    if (mainNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fechar menu ao clicar em um link
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

/* ============================================
   NAV ACTIVE STATE - SCROLL SPY
   ============================================ */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#mainNav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   COUNTER ANIMATION (STATS)
   ============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Observer para ativar contagem quando visível
const statsSection = document.querySelector('.stats-section');
let countersAnimated = false;

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

/* ============================================
   SERVICE CARDS - ANIMATION ON SCROLL
   ============================================ */
const serviceCards = document.querySelectorAll('.service-card');

if (serviceCards.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        cardObserver.observe(card);
    });
}

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        
        // Loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        btn.disabled = true;
        
        // Simula envio
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem Enviada!';
            btn.style.background = '#4CAF50';
            btn.style.color = '#fff';
            
            // Mostra mensagem de sucesso
            showNotification('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
            
            // Reset do form após 2s
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

/* ============================================
   NOTIFICATION TOAST SYSTEM
   ============================================ */
function showNotification(message, type = 'info') {
    // Remove notificações anteriores
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();
    
    const colors = {
        success: { bg: '#E8F5E9', border: '#4CAF50', icon: 'fa-check-circle' },
        error: { bg: '#FFEBEE', border: '#F44336', icon: 'fa-exclamation-circle' },
        warning: { bg: '#FFF3E0', border: '#FF9800', icon: 'fa-exclamation-triangle' },
        info: { bg: '#E3F2FD', border: '#2196F3', icon: 'fa-info-circle' }
    };
    
    const color = colors[type] || colors.info;
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background: ${color.bg};
        border-left: 4px solid ${color.border};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        color: #333;
        max-width: 400px;
        animation: slideInToast 0.4s ease-out;
    `;
    
    toast.innerHTML = `
        <i class="fas ${color.icon}" style="color: ${color.border}; font-size: 1.2rem;"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none; border: none; cursor: pointer; 
            color: #999; font-size: 1rem; padding: 4px;
        "><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(toast);
    
    // Adiciona keyframes se necessário
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            @keyframes slideInToast {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto remove após 5s
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideInToast 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

/* ============================================
   SMOOTH SCROLL para links internos
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            
            const headerHeight = document.getElementById('main-header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   PARALLAX LEVE NO HERO
   ============================================ */
const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrolled < heroHeight) {
            const pattern = heroSection.querySelector('.hero-bg-pattern');
            if (pattern) {
                pattern.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            const visual = heroSection.querySelector('.hero-visual');
            if (visual) {
                visual.style.opacity = 1 - (scrolled / heroHeight);
                visual.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }
    });
}

/* ============================================
   KEYBOARD ACCESSIBILITY
   ============================================ */
document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape') {
        mainNav.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

/* ============================================
   SISTEMA DE STATUS DOS SISTEMAS
   (simulação - em produção viria de API)
   ============================================ */
const statusData = {
    portal: { online: true, label: 'Online', uptime: '99.8%' },
    glpi: { online: true, label: 'Online', uptime: '99.5%' },
    zabbix: { online: true, label: 'Online', uptime: '100%' },
    pontos: { online: false, label: 'Manutenção', uptime: '--' },
    email: { online: true, label: 'Online', uptime: '99.9%' },
    intranet: { online: true, label: 'Online', uptime: '98.7%' }
};

// Função para atualizar status (pode ser chamada via API)
function updateSystemStatuses() {
    // Em produção, faça fetch em uma API real
    console.log('Status dos sistemas:', statusData);
}

updateSystemStatuses();

/* ============================================
   CONSOLE PERSONALIZADO
   ============================================ */
console.log('%c Pref. de Maracaju - Depto. de T.I. ', 
    'background: #1B5E20; color: #FFD600; font-size: 14px; font-weight: bold; padding: 8px 12px; border-radius: 4px;'
);
console.log('%c Portal de Serviços de Tecnologia da Informação', 
    'color: #2E7D32; font-size: 11px;'
);