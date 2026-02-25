// js/main.js

// ========== ТЁМНАЯ ТЕМА ==========
const body = document.body;
const themeToggle = document.getElementById('modeToggle');
const themeToggleMobile = document.getElementById('modeToggleMobile');

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        body.classList.add('dark-mode');
    }
    updateThemeButtons();
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtons();
}

function updateThemeButtons() {
    const isDark = body.classList.contains('dark-mode');
    const text = isDark ? 'Жарық Режим' : 'Қараңғы Режим';
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    if (themeToggle) themeToggle.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
    if (themeToggleMobile) themeToggleMobile.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// ========== МОБИЛЬНОЕ МЕНЮ ==========
const mobileToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Закрыть меню при клике на ссылку
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ========== ОБНОВЛЕНИЕ UI В ЗАВИСИМОСТИ ОТ АВТОРИЗАЦИИ ==========
function updateAuthUI() {
    const username = localStorage.getItem('username');
    const loginTrigger = document.getElementById('userLoginTrigger');
    const loginTriggerMobile = document.getElementById('userLoginTriggerMobile');
    const registerBtn = document.getElementById('registerBtn');

    if (username) {
        // Пользователь залогинен
        if (loginTrigger) {
            loginTrigger.textContent = 'Профиль';
            loginTrigger.href = 'profile.html';
        }
        if (loginTriggerMobile) {
            loginTriggerMobile.textContent = 'Профиль';
            loginTriggerMobile.href = 'profile.html';
        }
        if (registerBtn) {
            registerBtn.innerHTML = `<i class="fas fa-user-circle"></i> Профильге өту`;
            registerBtn.href = 'profile.html';
        }
    } else {
        // Гость
        const loginText = 'Кіру/Тіркелу';
        if (loginTrigger) {
            loginTrigger.textContent = loginText;
            loginTrigger.href = 'login.html';
        }
        if (loginTriggerMobile) {
            loginTriggerMobile.textContent = loginText;
            loginTriggerMobile.href = 'login.html';
        }
        if (registerBtn) {
            registerBtn.innerHTML = `<i class="fas fa-hand-holding-heart"></i> ${loginText}`;
            registerBtn.href = 'login.html';
        }
    }
}

// ========== ПРОКРУТКА ВВЕРХ ==========
const scrollBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== ЗАКРЫТИЕ МОДАЛОК ПО КЛИКУ НА ФОН ==========
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ МОДАЛОК ==========
window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
};

window.openHeroModal = function(element) {
    const title = element.getAttribute('data-title');
    const text = element.getAttribute('data-text');
    document.getElementById('heroModalTitle').innerText = title;
    document.getElementById('heroModalText').innerText = text;
    document.getElementById('heroInfoModal').style.display = 'block';
};

window.closeHeroModal = function() {
    document.getElementById('heroInfoModal').style.display = 'none';
};

// ========== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ==========
initTheme();
updateAuthUI();