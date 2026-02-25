// js/loadPartials.js
async function loadPartial(url, elementId) {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadPartial('/header.html', 'header-placeholder');
    loadPartial('/footer.html', 'footer-placeholder');
});