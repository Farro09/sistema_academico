import { showToast } from './utils.js';

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

export { initCampus, initChat };