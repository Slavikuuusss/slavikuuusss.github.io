// Кнопка вверх
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTopButton.style.display = window.scrollY > 300 ? "flex" : "none";
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Боковое меню
const sidebar = document.getElementById("sidebar");
const burger = document.getElementById("burger");
const closeSidebar = document.getElementById("closeSidebar");

burger.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// Подменю
document.querySelectorAll(".menu-item[data-toggle]").forEach(item => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-toggle");
    const submenu = document.getElementById(targetId);
    submenu.classList.toggle("open");
    item.querySelector(".arrow").classList.toggle("rotate");
  });
});