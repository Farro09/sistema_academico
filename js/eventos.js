import { showToast } from './utils.js';

function initEventos() {
    document.querySelectorAll('.btn-evento').forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.closest('.evento-card').querySelector('h3').textContent;
            showToast(`Reservando lugar para: ${title}`, 'success');
        });
    });
}

export { initEventos };