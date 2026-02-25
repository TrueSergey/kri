// js/pages/login.js
import { updateAuthUI } from '../main.js';

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    loginMessage.style.display = 'block';
    loginMessage.textContent = 'Кіру...';
    loginMessage.className = 'form-message';

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'demo' && password === '123') {
            localStorage.setItem('username', 'DemoUser');
            localStorage.setItem('userRole', 'volunteer');
            loginMessage.textContent = 'Сәтті! Қош келдіңіз!';
            loginMessage.classList.add('success');
            updateAuthUI(); // Обновляем интерфейс
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        } else {
            throw new Error('Пайдаланушы аты немесе құпия сөз қате');
        }
    } catch (error) {
        loginMessage.textContent = error.message;
        loginMessage.classList.add('error');
    }
});