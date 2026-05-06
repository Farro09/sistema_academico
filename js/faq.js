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

function initMap() {
    const mapOverlay = document.getElementById('mapOverlay');
    const mapContainer = document.querySelector('.map-container');

    if (mapOverlay && mapContainer) {
        mapContainer.addEventListener('click', () => {
            mapOverlay.style.display = 'none';
        });
    }
}

export { initFAQ, initMap };