// js/pages/index.js
import Swiper from 'swiper';
import 'swiper/css';

// ========== ТИПИНГ ЭФФЕКТ ДЛЯ HERO ==========
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
    const text = "Қазақстанның Еріктілер Қозғалысы. Бірге Өзгеріс Жасайық.";
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
}

// ========== КАРУСЕЛЬ НОВОСТЕЙ ==========
const track = document.getElementById('newsCarouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if (track && prevBtn && nextBtn) {
    const items = document.querySelectorAll('.news-item');
    let currentIndex = 0;
    const itemWidth = items[0]?.offsetWidth || 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', () => {
        // пересчёт ширины
        const newWidth = items[0]?.offsetWidth || 0;
        if (newWidth !== itemWidth) {
            track.style.transform = `translateX(-${currentIndex * newWidth}px)`;
        }
    });
}

// ========== ОПРОС ==========
let hasVoted = localStorage.getItem('hasVoted') === 'true';

window.vote = function(element, percent) {
    if (hasVoted) return;
    document.querySelectorAll('.poll-option').forEach(opt => opt.classList.add('voted'));
    element.classList.add('selected');
    hasVoted = true;
    localStorage.setItem('hasVoted', 'true');
    // Здесь можно отправить голос на сервер (пока заглушка)
    console.log('Voted for', element.getAttribute('data-option'));
};

// ========== СЧЁТЧИКИ СТАТИСТИКИ ==========
const statsSection = document.getElementById('statsSection');
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const current = +counter.innerText.replace(/,/g, '');
            const increment = target / 100;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
    countersStarted = true;
}

window.addEventListener('scroll', () => {
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !countersStarted) {
            startCounters();
        }
    }
});

// ========== GOOGLE MAPS ==========
window.initMap = function() {
    const almaty = { lat: 43.238949, lng: 76.889709 };
    if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 12,
            center: almaty
        });
        new google.maps.Marker({ position: almaty, map, title: 'EriktiKZ' });
    } else {
        document.getElementById('googleMap').innerHTML = '<p style="text-align:center; padding:150px 0;">Карта жүктелмеді.</p>';
    }
};

// ========== ГАЛЕРЕЯ (SWIPER) ==========
new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 }
    }
});

// ========== ФОРМА КОНТАКТОВ ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Простая валидация
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            alert('Барлық өрістерді толтырыңыз');
            return;
        }
        if (!email.includes('@')) {
            alert('Дұрыс email енгізіңіз');
            return;
        }

        alert('Хабарлама жіберілді! (Демо)');
        contactForm.reset();
    });
}

// ========== ПАРТНЁРЫ (МОДАЛКА) ==========
document.querySelectorAll('.partner-logo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const partnerId = this.getAttribute('data-partner-id');
        let description = 'Мәлімет жоқ';
        if (partnerId === 'partnerA') description = 'А-Қоры: Білім беру және жастарды қолдау.';
        else if (partnerId === 'partnerB') description = 'B-Техно: IT саласында тренингтер.';
        else if (partnerId === 'partnerC') description = 'C-Green: Экологиялық жобалар.';
        else if (partnerId === 'partnerD') description = 'Университет: Білім беру мекемесі.';
        document.getElementById('partnerDescription').innerText = description;
        document.getElementById('partnerDetailsModal').style.display = 'block';
    });
});

// ========== ЗАГРУЗКА ФОТО ==========
const photoForm = document.getElementById('photoUploadForm');
if (photoForm) {
    photoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Фото загружено! (Демо)');
        photoForm.reset();
    });
}