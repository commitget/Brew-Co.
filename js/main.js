document.addEventListener('DOMContentLoaded', function () {

  var saved;
  try { saved = localStorage.getItem('brew-lang'); } catch(e) {}
  setLang(saved || 'en');
  document.getElementById('langToggle').addEventListener('click', function () {
    var next = document.getElementById('htmlTag').lang === 'ru' ? 'en' : 'ru';
    setLang(next);
  });

  (function() {
    var cursor = document.getElementById('cursor');
    var hero = document.getElementById('hero');
    if (!cursor || !hero) return;
    var isTouch = window.innerWidth <= 768;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) { cursor.style.display = 'none'; return; }
    var mx = 0, my = 0, cx = 0, cy = 0;
    var inside = false;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      var rect = hero.getBoundingClientRect();
      inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      cursor.style.display = inside ? '' : 'none';
    });
    function loop() {
      if (inside) {
        cx += (mx - cx) * 0.15; cy += (my - cy) * 0.15;
        cursor.style.transform = 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)';
      }
      requestAnimationFrame(loop);
    }
    loop();
    hero.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (inside) cursor.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
    });
  })();

  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 80); });
  }

  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    var isMobile = function () { return window.innerWidth <= 768; };
    var lockScroll = function () {
      var scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollY + 'px';
      document.body.style.width = '100%';
    };
    var unlockScroll = function () {
      var top = parseInt(document.body.style.top, 10) || 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, -top);
    };
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      if (navLinks.classList.contains('open')) {
        lockScroll();
      } else {
        unlockScroll();
      }
    });
    navLinks.querySelectorAll('a').forEach(function (l) {
      l.addEventListener('click', function () {
        navLinks.classList.remove('open');
        unlockScroll();
      });
    });
    window.addEventListener('resize', function () {
      if (!isMobile() && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        unlockScroll();
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      if (entry.target.id === 'menu') {
        var cards = entry.target.querySelectorAll('.menu-card');
        cards.forEach(function (card, i) { setTimeout(function () { card.classList.add('visible'); }, i * 80); });
      }
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section').forEach(function (el) { observer.observe(el); });

  var reveal = document.getElementById('hoverReveal');
  if (reveal) {
    var overlay = reveal.querySelector('.hover-reveal');
    var r = 80;
    reveal.addEventListener('mousemove', function (e) {
      var rect = reveal.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      overlay.style.clipPath = 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)';
    });
    reveal.addEventListener('mouseleave', function () {
      overlay.style.clipPath = 'circle(0px at 0 0)';
    });
  }

  var tabs = document.querySelectorAll('.menu-tab');
  var cards = document.querySelectorAll('.menu-card');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var filter = tab.dataset.filter;
        cards.forEach(function (card) {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden'); card.classList.add('visible');
          } else {
            card.classList.add('hidden'); card.classList.remove('visible');
          }
        });
      });
    });
  }

});
