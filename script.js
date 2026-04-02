// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll(
  '.skill-card, .project-card, .about-grid, .contact-grid, .section-title'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when visible
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animate');
        });

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// Fallback: reveal all after 2s if observer hasn't triggered
setTimeout(() => {
  fadeElements.forEach(el => {
    if (!el.classList.contains('visible')) {
      el.classList.add('visible');
      el.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
    }
  });
}, 2000);

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 2500);
});
