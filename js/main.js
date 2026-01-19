// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
const observer = new IntersectionObserver(
   entries => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add("show");
         }
      });
   },
   {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
   }
);

// Observe all sections and cards
document.querySelectorAll("section").forEach(section => {
   section.classList.add("hidden");
   observer.observe(section);
});

document.querySelectorAll(".project-card, .skill-orb, .timeline-item").forEach(el => {
   el.classList.add("hidden");
   observer.observe(el);
});

// ========== ATMOSPHERIC PARTICLE SYSTEM ==========
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId;

function initCanvas() {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
}

class Particle {
   constructor() {
      this.reset();
      this.y = Math.random() * canvas.height;
      this.opacity = Math.random() * 0.5 + 0.2;
   }

   reset() {
      this.x = Math.random() * canvas.width;
      this.y = -10;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.speedX = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.5 + 0.2;
   }

   update() {
      this.y += this.speedY;
      this.x += this.speedX;

      // Gentle floating motion
      this.x += Math.sin(this.y * 0.01) * 0.3;

      if (this.y > canvas.height) {
         this.reset();
      }

      if (this.x < 0 || this.x > canvas.width) {
         this.x = Math.random() * canvas.width;
      }
   }

   draw() {
      ctx.fillStyle = `rgba(159, 197, 168, ${this.opacity * 0.6})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
   }
}

function createParticles() {
   const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 50);
   particles = [];
   for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
   }
}

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   particles.forEach(particle => {
      particle.update();
      particle.draw();
   });

   animationId = requestAnimationFrame(animate);
}

// Initialize particles
initCanvas();
createParticles();
animate();

// Handle resize
let resizeTimeout;
window.addEventListener("resize", () => {
   clearTimeout(resizeTimeout);
   resizeTimeout = setTimeout(() => {
      initCanvas();
      createParticles();
   }, 250);
});

// Pause particles when tab is not visible
document.addEventListener("visibilitychange", () => {
   if (document.hidden) {
      cancelAnimationFrame(animationId);
   } else {
      animate();
   }
});

// ========== CURSOR GLOW EFFECT ==========
let mouseX = 0;
let mouseY = 0;
let cursorGlow = null;

function createCursorGlow() {
   cursorGlow = document.createElement("div");
   cursorGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(159, 197, 168, 0.08), transparent 70%);
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
   `;
   document.body.appendChild(cursorGlow);
}

document.addEventListener("mousemove", (e) => {
   mouseX = e.clientX;
   mouseY = e.clientY;

   if (!cursorGlow) createCursorGlow();

   cursorGlow.style.left = mouseX + "px";
   cursorGlow.style.top = mouseY + "px";
   cursorGlow.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
   if (cursorGlow) {
      cursorGlow.style.opacity = "0";
   }
});
