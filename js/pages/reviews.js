// js/pages/reviews.js

// Моковые отзывы
let mockReviews = [
    {
        reviewer: "Әлия С.",
        volunteer: "101",
        rating: 5,
        text: "Волонтер 101 өте жауапты және мейірімді. Көмегі дер кезінде жетті. Үлкен рахмет!",
        date: "2025-11-15"
    },
    {
        reviewer: "Мұрат Қ.",
        volunteer: "Азамат",
        rating: 4,
        text: "Кішкене кешіккені болмаса, жұмысын өте жақсы атқарды. 4/5 жұлдыз лайық.",
        date: "2025-11-14"
    },
    {
        reviewer: "Жанна Е.",
        volunteer: "105",
        rating: 5,
        text: "HelpMap арқылы өте жылдам көмек алдым. Ұйымдастырушыларға алғыс!",
        date: "2025-11-12"
    }
];

// Рейтинг звёздами
const stars = document.querySelectorAll('.rating-stars .star');
let currentRating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        currentRating = rating;
        updateStars(rating);
    });
});

function updateStars(rating) {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Отрисовка отзывов
function renderReviews() {
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';
    mockReviews.forEach(rev => {
        const starsHtml = Array(5).fill().map((_, i) => 
            `<i class="fas fa-star ${i < rev.rating ? 'selected' : ''}" style="color: ${i < rev.rating ? '#ffc107' : '#ccc'};"></i>`
        ).join('');

        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-header">
                <span class="reviewer">${rev.reviewer} → Волонтер: ${rev.volunteer}</span>
                <span class="review-date">${rev.date}</span>
            </div>
            <div class="review-rating">${starsHtml}</div>
            <p class="review-text">${rev.text}</p>
        `;
        container.appendChild(div);
    });
}
renderReviews();

// Отправка формы
const reviewForm = document.getElementById('reviewForm');
const reviewMessage = document.getElementById('reviewMessage');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = localStorage.getItem('username');
    if (!user) {
        showMessage('Пікір қалдыру үшін жүйеге кіріңіз!', 'error');
        return;
    }
    const volunteer = document.getElementById('volunteerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    if (!volunteer || !text || currentRating === 0) {
        showMessage('Барлық өрістерді толтырыңыз және рейтинг таңдаңыз!', 'error');
        return;
    }

    const newReview = {
        reviewer: user,
        volunteer: volunteer,
        rating: currentRating,
        text: text,
        date: new Date().toLocaleDateString('kk-KZ')
    };
    mockReviews.unshift(newReview);
    renderReviews();
    reviewForm.reset();
    currentRating = 0;
    updateStars(0);
    showMessage('Пікір сәтті қосылды!', 'success');
});

function showMessage(text, type) {
    reviewMessage.textContent = text;
    reviewMessage.className = `form-message ${type}`;
    reviewMessage.style.display = 'block';
    setTimeout(() => {
        reviewMessage.style.display = 'none';
    }, 3000);
}