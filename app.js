// guarda la imagen actual de cada carrusel
const state = {};

// Mueve el carrusel a una imagen específica
function goTo(id, idx) {
  const car = document.getElementById(id);
  const track = car.querySelector('.carrusel-track');
  const dots = car.querySelectorAll('.carrusel-dot');
  const slides = car.querySelectorAll('.carrusel-slide');
  const total = slides.length;

// Si llega al final, vuelve al inicio

  if (idx >= total) {
    idx = 0;
  }

  // Si retrocede desde la primera, va a la última
  if (idx < 0) {
    idx = total - 1;
  }

  state[id] = idx;

  track.style.transform = `translateX(-${state[id] * 100}%)`;

  // Actualiza qué punto del carrusel queda activo
  dots.forEach((dot, i) => {
    if (i === state[id]) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function slide(id, dir) {
  const actual = state[id] || 0;
  goTo(id, actual + dir);
}

['car-a', 'car-b', 'car-f'].forEach(id => {
  state[id] = 0;
});

// Avanza automáticamente cada 4 segundos
setInterval(() => {
  ['car-a', 'car-b', 'car-f'].forEach(id => {
    slide(id, 1);
  });
}, 4000);