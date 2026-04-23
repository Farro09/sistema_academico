import { showToast } from './utils.js';

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

export { initPlanes, initBecas };