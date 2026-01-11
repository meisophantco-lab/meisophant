const slider = document.getElementById("slider");
let isDragging = false;
let startX;
let scrollLeft;

// 1️⃣ Clone slides for seamless loop
const slides = Array.from(slider.children);
slides.forEach(slide => {
  const clone = slide.cloneNode(true);
  slider.appendChild(clone);
});

// 2️⃣ Auto-scroll
function autoScroll() {
  if (!isDragging) {
    slider.scrollLeft += 1;
    // Loop seamlessly
    if (slider.scrollLeft >= slider.scrollWidth / 2) {
      slider.scrollLeft = 0;
    }
  }
  requestAnimationFrame(autoScroll);
}
requestAnimationFrame(autoScroll);

// 3️⃣ Drag / swipe
slider.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => isDragging = false);
slider.addEventListener('mouseup', () => isDragging = false);
slider.addEventListener('mousemove', e => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

// Touch for mobile
slider.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchend', () => isDragging = false);
slider.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});


window.addEventListener('scroll', function() {
const nav = document.querySelector('.urls');
if (window.scrollY > 50) { // Scroll threshold
nav.classList.add('shrink');
} else {
nav.classList.remove('shrink');
}
});
  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const backBtn = document.getElementById("backBtn");

    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      menuBtn.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
    });

    backBtn.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuBtn.textContent = "☰";
      });
    });
  });