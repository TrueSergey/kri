// js/pages/register.js

const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;
    const phone = document.getElementById('regPhone').value.trim();
    const city = document.getElementById('regCity').value;
    const role = document.getElementById('regRole').value;

    // Валидация
    if (!username || username.length < 3) {
        showMessage('Пайдаланушы аты 3 символдан кем болмауы керек', 'error');
        return;
    }
    if (!email || !email.includes('@')) {
        showMessage('Дұрыс email енгізіңіз', 'error');
        return;
    }
    if (!password || password.length < 5) {
        showMessage('Құпия сөз 5 символдан кем болмауы керек', 'error');
        return;
    }
    if (password !== password2) {
        showMessage('Құпия сөздер сәйкес келмейді', 'error');
        return;
    }
    if (!city) {
        showMessage('Қаланы таңдаңыз', 'error');
        return;
    }

    // Показываем сообщение
    registerMessage.style.display = 'block';
    registerMessage.textContent = 'Тіркелу...';
    registerMessage.className = 'form-message';

    // Имитация запроса
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Успешная регистрация (демо)
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', role);
        showMessage('Тіркелу сәтті! Профильге өту...', 'success');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1500);
    } catch (error) {
        showMessage('Қате орын алды. Қайталап көріңіз.', 'error');
    }
});

function showMessage(text, type) {
    registerMessage.textContent = text;
    registerMessage.className = `form-message ${type}`;
    registerMessage.style.display = 'block';
}