const petalField = document.querySelector(".petal-field");
for (let i = 0; i < 22; i += 1) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${7 + Math.random() * 8}s`;
  petal.style.animationDelay = `${Math.random() * -12}s`;
  petal.style.transform = `scale(${0.55 + Math.random() * 0.7})`;
  petalField.appendChild(petal);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const slides = [...document.querySelectorAll(".slide")];
const dots = document.querySelector(".slide-dots");
let currentSlide = 0;
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.className = `dot${index === 0 ? " active" : ""}`;
  dot.addEventListener("click", () => showSlide(index));
  dots.appendChild(dot);
});
const slideDots = [...document.querySelectorAll(".dot")];
function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
  slideDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
}
document.querySelector("#prevSlide").addEventListener("click", () => showSlide(currentSlide - 1));
document.querySelector("#nextSlide").addEventListener("click", () => showSlide(currentSlide + 1));
setInterval(() => showSlide(currentSlide + 1), 6500);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.lightbox;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

const surpriseButton = document.querySelector("#surpriseButton");
const toast = document.querySelector("#toast");
surpriseButton.addEventListener("click", () => {
  toast.classList.add("show");
  surpriseButton.innerHTML = "Anh đang ôm em thật lâu <span>♡</span>";
  setTimeout(() => toast.classList.remove("show"), 3200);
});
