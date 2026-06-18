export function initCursor() {
  var cursor = document.getElementById('cursor');
  if (!cursor) return;

  var isTouch = window.innerWidth <= 768;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReduced) {
    cursor.style.display = 'none';
    return;
  }

  var mouseX = 0, mouseY = 0;
  var curX = 0, curY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    cursor.style.transform =
      'translate(' + curX + 'px, ' + curY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .menu-card, .taste-btn, .value-card, .playlist-item').forEach(function (el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
  });
}
