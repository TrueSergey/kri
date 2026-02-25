// js/main.js
import { applyTranslation, changeLanguage as i18nChange } from './i18n.js';

// ========== ТЁМНАЯ ТЕМА ==========
const body = document.body;
const themeToggle = document.getElementById('modeToggle');
const themeToggleMobile = document.getElementById('modeToggleMobile');

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        body.classList.add('dark-mode');
    }
    updateThemeToggleText();
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggleText();
}

function updateThemeToggleText() {
    const isDark = body.classList.contains('dark-mode');
    const text = isDark ? 'lightMode' : 'darkMode';
    // Используем глобальную функцию перевода (будет доступна после загрузки i18n)
    const lang = localStorage.getItem('language') || 'kk';
    const t = window.translations?.[lang] || {};
    const modeText = t[text] || (isDark ? 'Жарық Режим' : 'Қараңғы Режим');
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    if (themeToggle) themeToggle.innerHTML = `<i class="fas ${icon}"></i> ${modeText}`;
    if (themeToggleMobile) themeToggleMobile.innerHTML = `<i class="fas ${icon}"></i> ${modeText}`;
}
window.updateThemeToggleText = updateThemeToggleText;

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
export function updateAuthUI() {
    const username = localStorage.getItem('username');
    const loginTrigger = document.getElementById('userLoginTrigger');
    const loginTriggerMobile = document.getElementById('userLoginTriggerMobile');
    const registerBtn = document.getElementById('registerBtn');

    const lang = localStorage.getItem('language') || 'kk';
    const t = window.translations?.[lang] || {};

    if (username) {
        if (loginTrigger) {
            loginTrigger.textContent = t.profileBtn || 'Профиль';
            loginTrigger.href = 'profile.html';
        }
        if (loginTriggerMobile) {
            loginTriggerMobile.textContent = t.profileBtn || 'Профиль';
            loginTriggerMobile.href = 'profile.html';
        }
        if (registerBtn) {
            registerBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${t.profileBtn || 'Профиль'}`;
            registerBtn.href = 'profile.html';
        }
    } else {
        const loginText = t.loginBtn || 'Кіру/Тіркелу';
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
window.updateAuthUI = updateAuthUI;

// ========== ПРОКРУТКА ВВЕРХ ==========
const scrollBtn = document.getElementById('scrollToTopBtn');
if (scrollBtn) {
    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
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

// ========== ИНИЦИАЛИЗАЦИЯ ==========
initTheme();
// Применяем перевод после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Подключаем объект переводов глобально
    import('./i18n.js').then(module => {
        window.translations = module.translations;
        module.applyTranslation();
        updateAuthUI();
    });
});