import { showToast } from './utils.js';

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

export { initTestimonios };