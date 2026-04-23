import { showToast, initScrollTop, initScrollEffects, initNewsletterFooter, initThemeToggle } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initScrollTop();
    initScrollEffects();
    initNewsletterFooter();
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