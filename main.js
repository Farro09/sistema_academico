document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initHeroStats();
    initFilterCourses();
    initTestimonios();
    initModal();
    initContactForm();
    initNewsletter();
    initScrollTop();
    initScrollEffects();
    initNewsletterFooter();
    initFAQ();
    initPlanes();
    initBecas();
    initMap();
    initGaleria();
    initEventos();
    initBlog();
    initCampus();
    initChat();
    initThemeToggle();
});

function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

function initHeroStats() {
    const counters = document.querySelectorAll('.hero-stat-number[data-count]');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + (target >= 100 ? '+' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

function initFilterCourses() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card[data-category]');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function initTestimonios() {
    const testimonios = document.querySelectorAll('.testimonio');
    const dotsContainer = document.querySelector('.testimonio-dots');
    const prevBtn = document.querySelector('.testimonio-btn.prev');
    const nextBtn = document.querySelector('.testimonio-btn.next');
    
    if (testimonios.length === 0) return;
    
    let currentIndex = 0;
    
    testimonios.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonio(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToTestimonio(index) {
        testimonios.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentIndex = index;
        if (currentIndex >= testimonios.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = testimonios.length - 1;
        
        testimonios[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => goToTestimonio(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToTestimonio(currentIndex + 1));
    
    let autoplay = setInterval(() => goToTestimonio(currentIndex + 1), 5000);
    
    const slider = document.querySelector('.testimonios-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goToTestimonio(currentIndex + 1), 5000);
    });
}

function initModal() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalClose = document.querySelector('.modal-close');
    const btnCards = document.querySelectorAll('.btn-card');
    
    if (!modal) return;
    
    const courseData = {
        'Programación': 'Aprende desarrollo web, apps móviles y más tecnologías actuales. Este curso te prepara para el mercado laboral con proyectos prácticos y experiencia real.',
        'Diseño Gráfico': 'Crea proyectos visuales impactantes con herramientas profesionales como Adobe Photoshop, Illustrator e InDesign. Ideal para branding y publicidad.',
        'Marketing Digital': 'Domina las redes sociales, SEO, Google Ads y estrategias de comunicación digital. Incluye certificación de Google.',
        'Ofimática': 'Domina Excel, Word, PowerPoint y otras herramientas esenciales para el entorno laboral. Certificación Microsoft Office.',
        'Robótica': 'Introducción a la electrónica, programación de microcontroladores (Arduino) y proyectos prácticos con robots.',
        'Producción Audiovisual': 'Aprende edición de video con Premiere Pro, fotografía profesional y producción multimedia completa.'
    };
    
    btnCards.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const title = card.querySelector('h3').textContent;
            const text = courseData[title] || 'Curso completo con certificación incluida.';
            
            modalTitle.textContent = title;
            modalText.textContent = text;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = form.querySelector('#nombre').value.trim();
        const email = form.querySelector('#email').value.trim();
        const mensaje = form.querySelector('#mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            showToast('Por favor complete los campos obligatorios', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Por favor ingrese un email válido', 'error');
            return;
        }
        
        setTimeout(() => {
            showToast('Mensaje enviado correctamente', 'success');
            form.reset();
        }, 500);
    });
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.style.background = type === 'error' ? '#e74c3c' : '#27ae60';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const email = input.value.trim();
            
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('¡Gracias por suscribirte!', 'success');
                input.value = '';
            } else {
                showToast('Por favor ingrese un email válido', 'error');
            }
        });
    });
}

function initNewsletterFooter() {
    const form = document.querySelector('.newsletter-mini');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const email = input.value.trim();
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('¡Gracias por suscribirte!', 'success');
            input.value = '';
        } else {
            showToast('Por favor ingrese un email válido', 'error');
        }
    });
}

function initScrollTop() {
    const scrollBtn = document.getElementById('scrollTop');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initPlanes() {
    const planBtns = document.querySelectorAll('.btn-plan');
    
    planBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const planName = btn.closest('.plan-card').querySelector('h3').textContent;
            showToast(`Has seleccionado el plan ${planName}`, 'success');
        });
    });
}

function initBecas() {
    const btnBecas = document.getElementById('btnBecas');
    
    if (btnBecas) {
        btnBecas.addEventListener('click', () => {
            showToast('Completa el formulario de contacto para solicitar tu beca', 'success');
        });
    }
}

function initMap() {
    const mapOverlay = document.getElementById('mapOverlay');
    const mapContainer = document.querySelector('.map-container');

    if (mapOverlay && mapContainer) {
        mapContainer.addEventListener('click', () => {
            mapOverlay.style.display = 'none';
        });
    }
}

function initGaleria() {
    const filterBtns = document.querySelectorAll('#galeria .filter-btn');
    const items = document.querySelectorAll('.galeria-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    document.getElementById('btnGaleria')?.addEventListener('click', () => {
        showToast('Galería completa en desarrollo', 'success');
    });
}

function initEventos() {
    document.querySelectorAll('.btn-evento').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.closest('.evento-card').querySelector('h3').textContent;
            showToast(`Reservando lugar para: ${title}`, 'success');
        });
    });
}

function initBlog() {
    document.getElementById('btnBlog')?.addEventListener('click', () => {
        showToast('Todas las noticias en desarrollo', 'success');
    });
}

function initCampus() {
    const tabs = document.querySelectorAll('.login-tab');
    const forms = document.querySelectorAll('.login-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`form${tab.dataset.tab.charAt(0).toUpperCase() + tab.dataset.tab.slice(1)}`).classList.add('active');
        });
    });

    document.querySelectorAll('.login-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Inicio de sesión en desarrollo', 'success');
        });
    });
}

function initChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (!chatToggle) return;

    chatToggle.addEventListener('click', () => {
        chatBox.classList.toggle('show');
    });

    chatClose?.addEventListener('click', () => {
        chatBox.classList.remove('show');
    });

    chatForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.textContent = message;
            chatMessages.appendChild(userMsg);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.innerHTML = '<p>Gracias por tu mensaje. Un asesor se comunicará contigo pronto. 👍</p>';
                chatMessages.appendChild(botMsg);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });
}