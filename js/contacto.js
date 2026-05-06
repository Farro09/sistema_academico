import { showToast } from './utils.js';

function initContactForm() {
    const form = document.getElementById('contactForm');
    
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

export { initContactForm, initNewsletter };