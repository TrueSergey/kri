// js/pages/topic-detail.js

// Получение ID из URL
const params = new URLSearchParams(window.location.search);
const topicId = parseInt(params.get('id')) || 1;

// Моковые данные (должны совпадать с forum.js)
const topicsData = {
    1: {
        title: "Еріктілік бағдарламасына қалай қатысуға болады?",
        author: "Айгерім",
        date: "2025-11-20",
        views: 120,
        content: "Біздің платформада ерікті болу өте оңай. Алдымен тіркеліп, профиліңізді толтырыңыз, содан кейін 'Жобалар' бөлімінен өзіңізге ұнайтын жобаны таңдап, 'Қатысу' батырмасын басыңыз. Қосымша сұрақтарыңыз болса, форумда жазыңыз.",
        comments: [
            { author: "Азамат", text: "Рахмет, түсінікті!", date: "2025-11-21" },
            { author: "Айгерім", text: "Кез келген уақытта көмектесуге дайынмын.", date: "2025-11-22" }
        ]
    },
    2: {
        title: "IT волонтерлік бойынша көмек керек",
        author: "Марат",
        date: "2025-11-25",
        views: 250,
        content: "Бізге сайт жасауға көмектесетін ерікті IT маман қажет. Негізгі дағдылар: HTML, CSS, JavaScript, React. Жоба ашық, уақыт икемді.",
        comments: [
            { author: "Дмитрий", text: "Мен көмектесе аламын. Хабарласыңыз.", date: "2025-11-26" }
        ]
    },
    3: {
        title: "Қарттарға көмек: Алматыдағы жобалар",
        author: "Сәуле",
        date: "2025-12-01",
        views: 90,
        content: "Алматыдағы қарттар үйіне көмек қажет. Азық-түлік, киім-кешек жинау және психологиялық қолдау көрсету. Қосылғысы келетіндер хабарласыңыз.",
        comments: []
    }
};

// Данные темы
const topic = topicsData[topicId] || topicsData[1];

// Заполнение страницы
document.getElementById('topicTitle').textContent = topic.title;
document.getElementById('topicAuthor').textContent = topic.author;
document.getElementById('topicDate').textContent = topic.date;
document.getElementById('topicViews').textContent = topic.views;
document.getElementById('topicContent').innerHTML = `<p>${topic.content}</p>`;

// Комментарии
const commentsList = document.getElementById('commentsList');
const commentCount = document.getElementById('commentCount');

function renderComments() {
    commentsList.innerHTML = '';
    topic.comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `
            <div class="comment-header">
                <span><i class="fas fa-user-circle"></i> ${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p>${comment.text}</p>
        `;
        commentsList.appendChild(div);
    });
    commentCount.textContent = `(${topic.comments.length})`;
}
renderComments();

// Добавление комментария
document.getElementById('postCommentBtn').addEventListener('click', () => {
    const user = localStorage.getItem('username');
    if (!user) {
        document.getElementById('commentMessage').style.color = 'red';
        document.getElementById('commentMessage').textContent = 'Пікір қалдыру үшін жүйеге кіріңіз!';
        return;
    }

    const text = document.getElementById('commentText').value.trim();
    if (!text) return;

    const newComment = {
        author: user,
        text: text,
        date: new Date().toLocaleDateString('kk-KZ')
    };
    topic.comments.push(newComment);
    renderComments();
    document.getElementById('commentText').value = '';
    document.getElementById('commentMessage').textContent = 'Пікір қосылды!';
    document.getElementById('commentMessage').style.color = 'var(--secondary)';
    setTimeout(() => {
        document.getElementById('commentMessage').textContent = '';
    }, 2000);
});