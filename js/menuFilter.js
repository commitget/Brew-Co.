export function initMenuFilter() {
  var tabs = document.querySelectorAll('.menu-tab');
  var cards = document.querySelectorAll('.menu-card');

  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.dataset.filter;
      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.classList.add('visible');
        } else {
          card.classList.add('hidden');
          card.classList.remove('visible');
        }
      });
    });
  });
}
