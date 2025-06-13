// Кнопка вверх
const backToTopButton = document.getElementById("backToTop");
const mainOverlay = document.createElement('div');
mainOverlay.className = 'main-overlay';
document.body.appendChild(mainOverlay);

// Боковое меню
const sidebar = document.getElementById("sidebar");
const burger = document.getElementById("burger");
const closeSidebar = document.getElementById("closeSidebar");

// Функция переключения сайдбара
function toggleSidebar() {
  sidebar.classList.toggle("open");
  document.body.classList.toggle("no-scroll");
  mainOverlay.style.visibility = sidebar.classList.contains("open") ? "visible" : "hidden";
  mainOverlay.style.opacity = sidebar.classList.contains("open") ? "1" : "0";
}

// Обработчики событий
burger.addEventListener("click", function(e) {
  e.stopPropagation();
  toggleSidebar();
});

closeSidebar.addEventListener("click", toggleSidebar);
mainOverlay.addEventListener("click", toggleSidebar);

// Подменю
document.querySelectorAll(".menu-item[data-toggle]").forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = item.getAttribute("data-toggle");
    const submenu = document.getElementById(targetId);
    submenu.classList.toggle("open");
    item.querySelector(".arrow").classList.toggle("rotate");
  });
});

// Адаптация для мобильных (только инициализация)
function initSidebar() {
  if (window.innerWidth > 768) {
    sidebar.classList.add("open");
  } else {
    sidebar.classList.remove("open");
  }
}

// Кнопка "Наверх"
window.addEventListener("scroll", () => {
  backToTopButton.style.display = window.scrollY > 300 ? "flex" : "none";
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Карусель глав
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevArrow = document.querySelector('.carousel-arrow:first-child');
const nextArrow = document.querySelector('.carousel-arrow:last-child');

// Обновление активной главы (БЕЗ автоматической прокрутки страницы)
function updateActiveChapter() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  carouselItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      item.classList.add('active');
      // Убрано: item.scrollIntoView(), чтобы страница не прыгала
    }
  });
}

// Прокрутка карусели (вручную стрелками)
prevArrow.addEventListener('click', () => {
  carouselTrack.scrollBy({ left: -100, behavior: 'smooth' });
});

nextArrow.addEventListener('click', () => {
  carouselTrack.scrollBy({ left: 100, behavior: 'smooth' });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
  // Сначала прокручиваем страницу вверх
  window.scrollTo(0, 0);

  // Затем инициализируем остальные элементы
  initSidebar();
  updateActiveChapter();
});

// Ресайз
window.addEventListener("resize", function() {
  backToTopButton.style.display = window.scrollY > 300 ? "flex" : "none";
});
// Konami Code Implementation
(function() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                    'KeyB', 'KeyA'];
  let konamiIndex = 0;

  // Более надежная проверка клавиш
  function checkKey(e) {
    // Игнорируем комбинации с Ctrl/Alt/Shift
    if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) return;

    // Проверяем код клавиши (KeyA/KeyB для букв)
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;

      if (konamiIndex === konamiCode.length) {
        activateKonamiMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  }

  function activateKonamiMode() {
    document.body.classList.add('konami-mode');
    console.log('Konami Code activated!');

    // Создаем эффект конфетти
    for (let i = 0; i < 50; i++) {
      createConfetti();
    }

    // Автоматическое выключение через 10 секунд
    setTimeout(() => {
      document.body.classList.remove('konami-mode');
    }, 10000);
  }

  function createConfetti() {
    const confetti = document.createElement('div');
    confetti.innerHTML = ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)];
    confetti.style.position = 'fixed';
    confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
    confetti.style.zIndex = '9999';
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.top = `${-50}px`;
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }

  // Добавляем стили для анимации конфетти
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fall {
      to { transform: translateY(${window.innerHeight + 50}px) rotate(360deg); }
    }
    .konami-mode .chapter-tile {
      animation: shake 0.5s ease infinite;
    }
    @keyframes shake {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
  `;
  document.head.appendChild(style);

  // Инициализация
  document.addEventListener('keydown', checkKey);
})();
