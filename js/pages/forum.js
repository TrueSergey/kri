// js/pages/forum.js

// Моковые данные тем
let mockTopics = [
    { id: 1, title: "Еріктілік бағдарламасына қалай қатысуға болады?", category: "Жалпы", author: "Айгерім", date: "2025-11-20", replies: 5, views: 120 },
    { id: 2, title: "IT волонтерлік бойынша көмек керек", category: "Техникалық", author: "Марат", date: "2025-11-25", replies: 12, views: 250 },
    { id: 3, title: "Қарттарға көмек: Алматыдағы жобалар", category: "Көмек сұранысы", author: "Сәуле", date: "2025-12-01", replies: 8, views: 90 },
];

// Рендеринг списка тем
function renderTopics() {
    const container = document.getElementById('topicList');
    container.innerHTML = '';

    mockTopics.forEach(topic => {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic-item';
        topicDiv.onclick = () => window.location.href = `topic-detail.html?id=${topic.id}`;
        topicDiv.innerHTML = `
            <div>
                <div class="topic-title">${topic.title}</div>
                <div class="topic-meta">Санат: ${topic.category} | Автор: ${topic.author} | ${topic.date}</div>
            </div>
            <div class="topic-meta">${topic.replies}</div>
            <div class="topic-meta">${topic.views}</div>
            <div class="topic-meta">${topic.date}</div>
        `;
        container.appendChild(topicDiv);
    });
}

// Модальное окно
const modal = document.getElementById('topicModal');
const createBtns = [document.getElementById('createTopicBtn'), document.getElementById('createTopicFloat')];
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('newTopicForm');
const message = document.getElementById('topicMessage');

createBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const user = localStorage.getItem('username');
        if (!user) {
            alert('Тақырып құру үшін жүйеге кіріңіз!');
            window.location.href = 'login.html';
            return;
        }
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('topicTitle').value.trim();
    const category = document.getElementById('topicCategory').value;
    const content = document.getElementById('topicContent').value.trim();

    if (!title || !category || !content) {
        message.textContent = 'Барлық өрістерді толтырыңыз';
        message.style.color = 'red';
        return;
    }

    // Создание новой темы (в реальности отправили бы на сервер)
    const newTopic = {
        id: mockTopics.length + 1,
        title,
        category,
        author: localStorage.getItem('username') || 'Аноним',
        date: new Date().toISOString().slice(0,10),
        replies: 0,
        views: 0,
        content // для детальной страницы
    };
    mockTopics.unshift(newTopic);
    renderTopics();

    message.textContent = 'Тақырып сәтті құрылды!';
    message.style.color = 'var(--secondary)';
    form.reset();
    setTimeout(() => {
        modal.style.display = 'none';
        message.textContent = '';
    }, 1000);
});

// Начальный рендеринг
renderTopics();