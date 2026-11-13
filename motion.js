// Gentle motion for both pages: things fade and rise into place as they
// scroll into view, with a short stagger inside grids and lists.
// No dependencies. Turns itself off when the visitor's system asks for
// reduced motion, and everything stays visible if JavaScript is off.
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  // Single elements that rise into view on their own.
  var SINGLES = [
    '.section-heading', '.section-sub', '.about-lead', '.timeline-route',
    '.showcase-intro p', '.photography-text > p', '.gear-credit',
    '.channels-feature', '.channels-banners', '.blog-excerpt', '.footer-heading',
    '.footer-email', '.project-block', '.hero-photos-grid',
    // Worklog
    '.wl-title', '.wl-tagline', '.wl-meta', '.tl', '.chips', '.wl-bar',
    '.year-head', '.frame'
  ];
  // Containers whose children arrive one after another.
  var GROUPS = [
    '.about-cards', '.timeline', '.photo-collage', '.gear-grid',
    '.collab-grid', '.writing-outlets', '.skills-list', '.app-icons',
    '.social-links', '.project-images', '.media-pair', '.ep-links', '.badges'
  ];

  var targets = [];
  function mark(el, delay) {
    if (el.hasAttribute('data-reveal')) return;
    el.setAttribute('data-reveal', '');
    if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    targets.push(el);
  }
  GROUPS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        mark(child, Math.min(i, 8) * 70);
      });
    });
  });
  SINGLES.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      // Skip anything sitting inside a group item that already animates.
      var parent = el.parentElement && el.parentElement.closest('[data-reveal]');
      if (!parent) mark(el, 0);
    });
  });

  root.classList.add('motion');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });

  // Safety net: never leave anything hidden (e.g. printing, odd browsers).
  window.addEventListener('beforeprint', function () {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  });
  setTimeout(function () {
    targets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
    });
  }, 1200);
})();
