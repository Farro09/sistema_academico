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

export { initFilterCourses, initModal };