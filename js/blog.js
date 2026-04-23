import { showToast } from './utils.js';

function initBlog() {
    document.getElementById('btnBlog')?.addEventListener('click', () => {
        showToast('Todas las noticias en desarrollo', 'success');
    });
}

export { initBlog };