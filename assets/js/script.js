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

// Инициализация
initSidebar();

// Ресайз без автоматического управления состоянием
window.addEventListener("resize", function() {
  backToTopButton.style.display = window.scrollY > 300 ? "flex" : "none";
});
// Карусель глав
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevArrow = document.querySelector('.carousel-arrow:first-child');
const nextArrow = document.querySelector('.carousel-arrow:last-child');

// Обновление активной главы
function updateActiveChapter() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  carouselItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      item.classList.add('active');
      // Прокручиваем к активному элементу
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

// Прокрутка карусели
prevArrow.addEventListener('click', () => {
  carouselTrack.scrollBy({ left: -100, behavior: 'smooth' });
});

nextArrow.addEventListener('click', () => {
  carouselTrack.scrollBy({ left: 100, behavior: 'smooth' });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', updateActiveChapter);
