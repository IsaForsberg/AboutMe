// Hamburger-meny
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-open');
  burger.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    burger?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
  });
});

// Markera aktiv nav-länk
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// Fade-in vid scroll
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Kontaktformulär via Formspree (AJAX – stannar kvar på sidan)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.querySelector('.form-message');
    btn.disabled = true;
    btn.textContent = 'Skickar…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        msg.textContent = 'Tack! Ditt meddelande har skickats.';
        msg.className = 'form-message success';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      msg.textContent = 'Något gick fel – maila direkt till isautanede@gmail.com';
      msg.className = 'form-message error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Skicka';
    }
  });
}
