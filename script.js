const typedTextEl = document.getElementById("typed-text");
const words = ["beautiful interfaces", "responsive experiences", "clean frontend code"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedTextEl) {
    return;
  }

  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typedTextEl.textContent = currentWord.slice(0, charIndex);

  let delay = isDeleting ? 42 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 1300;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 340;
  }

  window.setTimeout(typeLoop, delay);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

function attachTilt(card) {
  const intensity = 10;

  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * intensity;
    const rotateX = -((y - centerY) / centerY) * intensity;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  attachTilt(card);
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

typeLoop();
