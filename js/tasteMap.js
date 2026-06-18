var tasteData = {
  soft: {
    name: 'Тёплый овсяный',
    notes: 'овёс / карамель / ваниль',
    colors: ['#F0D9B5', '#D8B98F', '#E8C840']
  },
  bright: {
    name: 'Бергамот-колд брю',
    notes: 'чай / цитрус / холод',
    colors: ['#E8C840', '#D8B98F', '#A84932']
  },
  unusual: {
    name: 'Вишня в дыму',
    notes: 'вишня / тёмный шоколад / лёгкий дым',
    colors: ['#A84932', '#3D1A0A', '#7E4C2A']
  },
  dessert: {
    name: 'Белый шоколад матча',
    notes: 'матча / белый шоколад / сливки',
    colors: ['#F0D9B5', '#7E8A72', '#D8B98F']
  },
  noco: {
    name: 'Какао из Боливии',
    notes: 'какао / специи / сливки',
    colors: ['#3D1A0A', '#7E4C2A', '#A84932']
  }
};

function generateBlob(id, colors) {
  var pts = [];
  for (var i = 0; i < 6; i++) {
    var angle = (i / 6) * Math.PI * 2;
    var r = 50 + Math.random() * 40;
    pts.push({ x: 100 + Math.cos(angle) * r, y: 100 + Math.sin(angle) * r });
  }
  var d = 'M' + pts[0].x + ' ' + pts[0].y;
  for (var i = 0; i < pts.length; i++) {
    var next = pts[(i + 1) % pts.length];
    var cpx = (pts[i].x + next.x) / 2 + (Math.random() - 0.5) * 30;
    var cpy = (pts[i].y + next.y) / 2 + (Math.random() - 0.5) * 30;
    d += ' Q' + cpx + ' ' + cpy + ', ' + next.x + ' ' + next.y;
  }
  d += ' Z';

  var svg = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">';
  svg += '<defs><radialGradient id="g-' + id + '" cx="35%" cy="35%">';
  svg += '<stop offset="0%" stop-color="' + colors[0] + '" stop-opacity="0.8"/>';
  svg += '<stop offset="100%" stop-color="' + colors[1] + '" stop-opacity="0.25"/>';
  svg += '</radialGradient></defs>';
  svg += '<path d="' + d + '" fill="url(#g-' + id + ')" opacity="0.85"/>';
  svg += '<circle cx="' + (55 + Math.random() * 30) + '" cy="' + (55 + Math.random() * 30) + '" r="' + (6 + Math.random() * 8) + '" fill="' + colors[0] + '" opacity="0.35"/>';
  svg += '<circle cx="' + (120 + Math.random() * 30) + '" cy="' + (90 + Math.random() * 30) + '" r="' + (8 + Math.random() * 6) + '" fill="' + colors[2] + '" opacity="0.3"/>';
  svg += '</svg>';
  return svg;
}

export function initTasteMap() {
  var btns = document.querySelectorAll('.taste-btn');
  var result = document.getElementById('tasteResult');
  var nameEl = document.getElementById('tasteName');
  var notesEl = document.getElementById('tasteNotes');
  var blobEl = document.getElementById('tasteBlob');

  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var taste = btn.dataset.taste;
      var data = tasteData[taste];
      if (!data) return;

      nameEl.textContent = data.name;
      notesEl.textContent = data.notes;
      blobEl.innerHTML = generateBlob(taste, data.colors);

      result.classList.remove('show');
      void result.offsetWidth;
      result.classList.add('show');
    });
  });
}
