// js/pages/profile.js

// Проверка авторизации
const username = localStorage.getItem('username');
const role = localStorage.getItem('userRole');

if (!username) {
    alert('Профильді көру үшін жүйеге кіріңіз!');
    window.location.href = 'login.html';
}

// Заполнение данных
document.getElementById('profileName').textContent = `Жеке Кабинет: ${username}`;
document.getElementById('profileID').textContent = Math.floor(Math.random() * 1000) + 100;
document.getElementById('profileEmail').textContent = `${username}@example.com`;
document.getElementById('profileJoinDate').textContent = '2025-' + String(Math.floor(Math.random() * 11) + 1).padStart(2, '0') + '-01';

// Роль
if (role === 'volunteer') {
    document.getElementById('profileRole').textContent = 'Рөл: Ерікті';
    document.getElementById('volunteerSection').style.display = 'block';
    document.getElementById('completedTasks').textContent = Math.floor(Math.random() * 20) + 5;
    renderTasks('volunteer');
} else if (role === 'help') {
    document.getElementById('profileRole').textContent = 'Рөл: Көмекке мұқтаж';
    document.getElementById('helpSection').style.display = 'block';
    renderTasks('help');
}

// Функция отрисовки задач
function renderTasks(userRole) {
    const mockTasks = {
        volunteer: [
            { id: 1, title: 'Қарт Қанат атаға азық-түлік жеткізу', status: 'pending' },
            { id: 2, title: 'Ауруханаға дәрі-дәрмек апару', status: 'completed' },
            { id: 3, title: 'Балалар үйіндегі шараға көмек', status: 'pending' },
        ],
        help: [
            { id: 1, title: 'Үй тазалығына көмек сұранысы', status: 'completed', volunteer: 'Азамат' },
            { id: 2, title: 'Дәріханадан дәрі әкелу', status: 'pending', volunteer: null },
        ]
    };

    const list = userRole === 'volunteer' ? document.getElementById('taskList') : document.getElementById('requestList');
    list.innerHTML = '';

    const tasks = userRole === 'volunteer' ? mockTasks.volunteer : mockTasks.help;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.status}`;
        let statusText = '';
        if (task.status === 'completed') statusText = 'Аяқталды';
        else if (task.status === 'pending') statusText = 'Күтуде';

        let extra = '';
        if (userRole === 'help' && task.volunteer) {
            extra = ` (Ерікті: ${task.volunteer})`;
        }

        li.innerHTML = `
            <span>${task.title} ${extra}</span>
            <span class="task-status ${task.status}">${statusText}</span>
        `;
        list.appendChild(li);
    });
}

// Кнопка выхода
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
});