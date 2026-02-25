// js/pages/project-detail.js

const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get('id')) || 1;

// Моковые данные (должны совпадать с projects.js)
const projectsData = {
    1: {
        title: "Алматының жасыл парктерін тазалау",
        city: "Алматы",
        type: "Экология",
        slots: 10,
        deadline: "15.01.2026",
        description: "Медеу шатқалындағы ағаштарды тазалау және күту. Бұл жоба қоршаған ортаны сақтауға және қаламызды жасыл етуге бағытталған. Қатысушыларға арнайы құралдар беріледі. Жұмыс уақыты: 09:00 - 14:00.",
        lat: 43.2565,
        lng: 76.9286
    },
    2: {
        title: "Қарттарға әлеуметтік көмек",
        city: "Астана",
        type: "Әлеуметтік",
        slots: 5,
        deadline: "30.12.2025",
        description: "Қарттар үйіндегі шараларға көмектесу. Адамдармен сөйлесу, кітап оқу және мерекелік шараларды ұйымдастыру. Сіздің мейірімділігіңіз олар үшін өте маңызды.",
        lat: 51.1694,
        lng: 71.4491
    },
    3: {
        title: "Еріктілер үшін сайтты әзірлеу",
        city: "Алматы",
        type: "IT",
        slots: 2,
        deadline: "20.01.2026",
        description: "Біздің платформаны жетілдіруге техникалық көмек. HTML/CSS/JS және Backend (Node.js) бойынша дағдылары бар еріктілер ізделеді.",
        lat: 43.2389,
        lng: 76.8897
    }
};

const project = projectsData[projectId] || projectsData[1];

// Заполнение страницы
document.getElementById('projectTitle').textContent = project.title;
document.getElementById('projectSubtitle').textContent = `Жоба ID: ${projectId} | Түрі: ${project.type}`;
document.getElementById('metaCity').textContent = project.city;
document.getElementById('metaDeadline').textContent = project.deadline;
document.getElementById('metaSlots').textContent = `${project.slots} орын`;
document.getElementById('metaType').textContent = project.type;
document.getElementById('projectDescription').textContent = project.description;
document.getElementById('projectImage').src = `/assets/images/project-${projectId}.jpg`; // замени на свои картинки

// Карта Google
window.initMap = function() {
    if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: project.lat, lng: project.lng }
        });
        new google.maps.Marker({
            position: { lat: project.lat, lng: project.lng },
            map: map,
            title: project.title
        });
    } else {
        document.getElementById('map').innerHTML = '<p style="text-align:center; padding:150px 0;">Карта жүктелмеді.</p>';
    }
};

// Заявка
document.getElementById('applyBtn').addEventListener('click', () => {
    const user = localStorage.getItem('username');
    if (!user) {
        document.getElementById('applyMessage').style.color = 'red';
        document.getElementById('applyMessage').textContent = 'Өтінім жіберу үшін жүйеге кіріңіз!';
        return;
    }
    const motivation = document.getElementById('motivation').value.trim();
    if (!motivation) {
        document.getElementById('applyMessage').style.color = 'red';
        document.getElementById('applyMessage').textContent = 'Мотивацияңызды жазыңыз!';
        return;
    }
    document.getElementById('applyMessage').style.color = 'var(--secondary)';
    document.getElementById('applyMessage').textContent = 'Өтінім сәтті жіберілді!';
    document.getElementById('motivation').value = '';
});