// Worklog filters: year timeline, role chips and "collapse media".
// Plain JavaScript, no build step. Everything is driven by data-* attributes
// in worklog.html, so adding a frame there needs no changes here.
(function () {
  var state = { year: 'all', role: 'all', collapsed: false };

  var main = document.getElementById('wl-main');
  var frames = Array.prototype.slice.call(document.querySelectorAll('[data-frame]'));
  var yearHeads = document.querySelectorAll('[data-year-head]');
  var credits = document.querySelectorAll('.credit[data-frame-ref]');
  var cols = document.querySelectorAll('.tl-col');
  var chips = document.querySelectorAll('.chip');
  var countEl = document.getElementById('wl-count');
  var emptyEl = document.getElementById('wl-empty');
  var collapseBtn = document.getElementById('wl-collapse');
  var collapseLabel = document.getElementById('wl-collapse-label');

  var byNo = {};
  frames.forEach(function (f) {
    byNo[f.getAttribute('data-frame')] = {
      year: f.getAttribute('data-year'),
      roles: (f.getAttribute('data-roles') || '').split(/\s+/)
    };
  });

  function roleOk(info) {
    return state.role === 'all' || info.roles.indexOf(state.role) !== -1;
  }
  function visible(info) {
    return roleOk(info) && (state.year === 'all' || state.year === info.year);
  }
  function plural(n) {
    return n + (n === 1 ? ' frame' : ' frames');
  }

  function render() {
    var shown = 0;
    var perYear = {};

    frames.forEach(function (f) {
      var info = byNo[f.getAttribute('data-frame')];
      var on = visible(info);
      f.hidden = !on;
      if (on) {
        shown += 1;
        perYear[info.year] = (perYear[info.year] || 0) + 1;
      }
    });

    Array.prototype.forEach.call(yearHeads, function (h) {
      var y = h.getAttribute('data-year-head');
      var n = perYear[y] || 0;
      h.hidden = n === 0;
      var c = h.querySelector('[data-year-count]');
      if (c) c.textContent = plural(n).toUpperCase();
    });

    Array.prototype.forEach.call(credits, function (li) {
      li.hidden = !visible(byNo[li.getAttribute('data-frame-ref')]);
    });

    // Timeline: highlight the selected column and colour its blocks.
    Array.prototype.forEach.call(cols, function (col) {
      var y = col.getAttribute('data-year');
      var sel = state.year === y;
      col.classList.toggle('is-sel', sel);
      col.setAttribute('aria-pressed', sel ? 'true' : 'false');
      Array.prototype.forEach.call(col.querySelectorAll('.blk'), function (b) {
        var info = byNo[b.getAttribute('data-frame-ref')];
        b.classList.toggle('on', sel && roleOk(info));
      });
    });

    Array.prototype.forEach.call(chips, function (chip) {
      var on = chip.getAttribute('data-role') === state.role;
      chip.classList.toggle('is-on', on);
      chip.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    countEl.textContent = plural(shown);
    emptyEl.hidden = shown !== 0;
    main.classList.toggle('is-collapsed', state.collapsed);
    collapseBtn.setAttribute('aria-pressed', state.collapsed ? 'true' : 'false');
    collapseLabel.textContent = state.collapsed ? 'SHOW MEDIA' : 'COLLAPSE MEDIA';
  }

  Array.prototype.forEach.call(cols, function (col) {
    col.addEventListener('click', function () {
      state.year = col.getAttribute('data-year');
      render();
    });
  });
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      state.role = chip.getAttribute('data-role');
      render();
    });
  });
  collapseBtn.addEventListener('click', function () {
    state.collapsed = !state.collapsed;
    render();
  });

  render();
})();
