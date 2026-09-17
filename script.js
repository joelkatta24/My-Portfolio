const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.textContent = navLinks.classList.contains('open') ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀' : '☾';
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });

  navItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
