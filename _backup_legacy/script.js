const canvas = document.querySelector("#particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let animationFrame;

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const createParticles = () => {
  const count = Math.min(90, Math.max(36, Math.floor(window.innerWidth / 18)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.5
  }));
};

const drawParticles = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(52, 228, 255, 0.72)";
  ctx.strokeStyle = "rgba(156, 107, 255, 0.18)";
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
    for (let j = index + 1; j < particles.length; j += 1) {
      const other = particles[j];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 115) {
        ctx.globalAlpha = 1 - distance / 115;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  });
  animationFrame = requestAnimationFrame(drawParticles);
};

const initParticles = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  resizeCanvas();
  createParticles();
  drawParticles();
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const suffix = target === 89 ? "%" : "+";
    let current = 0;
    const step = Math.max(1, Math.floor(target / 42));
    const tick = () => {
      current = Math.min(target, current + step);
      element.textContent = `${current}${suffix}`;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
    counterObserver.unobserve(element);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((element) => counterObserver.observe(element));

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && !card.dataset.category.includes(filter));
    });
  });
});

const drawRadarChart = () => {
  const radar = document.querySelector("#radar-chart");
  const radarCtx = radar.getContext("2d");
  const labels = ["ML", "NLP", "APIs", "Data", "Testing", "Cloud"];
  const values = [82, 86, 88, 80, 84, 74];
  const centerX = radar.width / 2;
  const centerY = radar.height / 2 + 8;
  const radius = 105;
  radarCtx.clearRect(0, 0, radar.width, radar.height);
  radarCtx.font = "700 12px Inter, sans-serif";
  radarCtx.textAlign = "center";
  radarCtx.textBaseline = "middle";

  for (let ring = 1; ring <= 4; ring += 1) {
    radarCtx.beginPath();
    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
      const ringRadius = (radius * ring) / 4;
      const x = centerX + Math.cos(angle) * ringRadius;
      const y = centerY + Math.sin(angle) * ringRadius;
      if (index === 0) radarCtx.moveTo(x, y);
      else radarCtx.lineTo(x, y);
    });
    radarCtx.closePath();
    radarCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    radarCtx.stroke();
  }

  labels.forEach((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    radarCtx.beginPath();
    radarCtx.moveTo(centerX, centerY);
    radarCtx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    radarCtx.strokeStyle = "rgba(52, 228, 255, 0.18)";
    radarCtx.stroke();
    radarCtx.fillStyle = "#b7c5dc";
    radarCtx.fillText(label, centerX + Math.cos(angle) * (radius + 28), centerY + Math.sin(angle) * (radius + 28));
  });

  const gradient = radarCtx.createLinearGradient(90, 70, 270, 230);
  gradient.addColorStop(0, "rgba(52, 228, 255, 0.55)");
  gradient.addColorStop(1, "rgba(156, 107, 255, 0.55)");
  radarCtx.beginPath();
  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const pointRadius = radius * (value / 100);
    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;
    if (index === 0) radarCtx.moveTo(x, y);
    else radarCtx.lineTo(x, y);
  });
  radarCtx.closePath();
  radarCtx.fillStyle = gradient;
  radarCtx.fill();
  radarCtx.strokeStyle = "#34e4ff";
  radarCtx.lineWidth = 2;
  radarCtx.stroke();
};

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resizeCanvas();
  createParticles();
  drawParticles();
  drawRadarChart();
});

initParticles();
drawRadarChart();
