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