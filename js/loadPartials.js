// js/loadPartials.js

async function loadPartial(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка загрузки ${url}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Не удалось загрузить часть страницы:', error);
        // Можно показать заглушку
        document.getElementById(elementId).innerHTML = '<p style="color: red;">Ошибка загрузки</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header.html', 'header-placeholder');
    loadPartial('footer.html', 'footer-placeholder');
});