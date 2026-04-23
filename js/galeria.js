import { showToast } from './utils.js';

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

export { initGaleria };