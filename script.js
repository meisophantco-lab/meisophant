/* ================= SLIDER ================= */

const slider = document.getElementById("slider");

if (slider) {
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Clone slides for seamless loop
  const slides = Array.from(slider.children);
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  function autoScroll() {
    if (!isDragging) {
      slider.scrollLeft += 1;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  requestAnimationFrame(autoScroll);

  slider.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  ["mouseleave", "mouseup"].forEach(evt => {
    slider.addEventListener(evt, () => (isDragging = false));
  });

  slider.addEventListener("mousemove", e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  // Touch support
  slider.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchend", () => (isDragging = false));

  slider.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });
}

/* ================= STICKY SCROLL EFFECT ================= */

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".urls");
  if (!nav) return;

  if (window.scrollY > 50) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
});

/* ================= MOBILE MENU FIX ================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const backBtn = document.getElementById("backBtn");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuBtn.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    });
  }

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    });
  });

  /* FIX ROTATION & RESIZE BUG */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("show");
      menuBtn.textContent = "☰";
    }
  });
});