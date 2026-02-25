// js/pages/projects.js

// Моковые данные проектов (позже заменим на запрос к API)
const mockProjects = [
    { id: 1, title: "Алматының жасыл парктерін тазалау", city: "Алматы", type: "Экология", slots: 10, deadline: "15.01.2026", description: "Медеу шатқалындағы ағаштарды тазалау және күту." },
    { id: 2, title: "Қарттарға әлеуметтік көмек", city: "Астана", type: "Әлеуметтік", slots: 5, deadline: "30.12.2025", description: "Қарттар үйіндегі шараларға көмектесу." },
    { id: 3, title: "Еріктілер үшін сайтты әзірлеу", city: "Алматы", type: "IT", slots: 2, deadline: "20.01.2026", description: "Біздің платформаны жетілдіруге техникалық көмек." },
    { id: 4, title: "Шымкенттегі апаттан кейінгі тазарту", city: "Шымкент", type: "Экология", slots: 20, deadline: "05.01.2026", description: "Табиғи апат аймағын қалпына келтіру жұмыстары." },
    { id: 5, title: "Астанадағы мұқтаж отбасыларға азық-түлік", city: "Астана", type: "Әлеуметтік", slots: 8, deadline: "10.02.2026", description: "Азық-түлік жинау және тарату." },
];

// Функция создания карточки проекта
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> ${project.city}</span>
            <span><i class="fas fa-clock"></i> ${project.deadline}</span>
            <span><i class="fas fa-users"></i> Қажет: ${project.slots}</span>
        </div>
        <div class="project-footer">
            <a href="project-detail.html?id=${project.id}" class="main-btn" style="width: 100%;">Толығырақ & Қатысу</a>
        </div>
    `;
    return card;
}

// Функция фильтрации и отображения проектов
function renderProjects() {
    const cityFilter = document.getElementById('cityFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const searchFilter = document.getElementById('searchFilter').value.toLowerCase();

    const filtered = mockProjects.filter(project => {
        const matchCity = cityFilter === 'all' || project.city === cityFilter;
        const matchType = typeFilter === 'all' || project.type === typeFilter;
        const matchSearch = project.title.toLowerCase().includes(searchFilter) || 
                           project.description.toLowerCase().includes(searchFilter);
        return matchCity && matchType && matchSearch;
    });

    const container = document.getElementById('projectList');
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align: center; width: 100%; padding: 30px;">Проекттер табылмады 😔</p>';
        return;
    }

    filtered.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

// Добавляем слушатели событий на фильтры
document.getElementById('cityFilter').addEventListener('change', renderProjects);
document.getElementById('typeFilter').addEventListener('change', renderProjects);
document.getElementById('searchFilter').addEventListener('input', renderProjects);

// Первоначальный рендеринг
renderProjects();