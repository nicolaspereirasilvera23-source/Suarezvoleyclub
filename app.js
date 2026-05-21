const state = {};

  function goTo(id, idx) {
    const car = document.getElementById(id);
    const track = car.querySelector('.carrusel-track');
    const dots = car.querySelectorAll('.carrusel-dot');
    const slides = car.querySelectorAll('.carrusel-slide');
    const total = slides.length;
    state[id] = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${state[id] * 100}%)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === state[id]));
  }

  function slide(id, dir) {
    goTo(id, (state[id] || 0) + dir);
  }

  // Init state
  ['car-a','car-b','car-f'].forEach(id => { state[id] = 0; });

  // Auto-play
  setInterval(() => { ['car-a','car-b','car-f'].forEach(id => slide(id, 1)); }, 4000);

  // Scroll animations
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.plantel-block, .logro-item, .timeline-item').forEach(el => {
    el.style.opacity='0'; el.style.transform='translateY(24px)';
    el.style.transition='opacity 0.6s ease, transform 0.6s ease';
    obs.observe(el);
  });

  // Nav highlight
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if(window.scrollY >= s.offsetTop - 100) cur = s.id; });
    links.forEach(a => { a.style.color = a.getAttribute('href')==='#'+cur ? 'var(--rojo)' : ''; });
  });
