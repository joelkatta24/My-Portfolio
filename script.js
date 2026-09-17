/* =============================================================
   1. REAL-TIME CANVAS PARTICLE NETWORK
============================================================= */

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.radius = Math.random() * 1.5 + 0.8;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
    ctx.fill();
  }
}

// Instantiate particles
const totalParticles = Math.min(
  Math.floor(window.innerWidth / 18),
  65
);

for (let i = 0; i < totalParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Connect close particles with subtle faint lines
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.strokeStyle =
          `rgba(6, 182, 212, ${0.15 * (1 - dist / 110)})`;

        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();


/* =============================================================
   2. MOBILE NAVIGATION DRAWER
============================================================= */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuIcon = document.getElementById('menuIcon');

if (menuToggle && navLinks && menuIcon) {

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    const isOpen = navLinks.classList.contains('active');

    menuIcon.className = isOpen
      ? 'ph ph-x'
      : 'ph ph-list';
  });

  // Auto close mobile menu when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuIcon.className = 'ph ph-list';
    });
  });
}


/* =============================================================
   3. PROJECT FILTERING
============================================================= */

const filterButtons =
  document.querySelectorAll('.filter-btn');

const projectCards =
  document.querySelectorAll('.project-card');

filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    // Toggle active state on buttons
    filterButtons.forEach(btn =>
      btn.classList.remove('active')
    );

    button.classList.add('active');

    const selectedFilter =
      button.getAttribute('data-filter');

    projectCards.forEach(card => {

      const category =
        card.getAttribute('data-category');

      if (
        selectedFilter === 'all' ||
        selectedFilter === category
      ) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }

    });
  });

});


/* =============================================================
   4. CONTACT FORM
   Formspree handles the submission directly.
   
   IMPORTANT:
   Do NOT use event.preventDefault() here.
   Do NOT use fetch() here.
   Do NOT clear the form with JavaScript.
============================================================= */

// The contact form is intentionally handled by Formspree
// through the HTML form action attribute.


/* =============================================================
   5. DYNAMIC YEAR
============================================================= */

const currentYear =
  document.getElementById('currentYear');

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}