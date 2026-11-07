// Applies the saved light/dark choice before first paint and handles the header toggle.
(function () {
  var KEY = 'portfolio-theme';
  var root = document.documentElement;
  var stored = null;

  // Lets the stylesheet know scripting is on before paint, so reveal effects never hide content without JS.
  root.classList.add('js');

  try {
    stored = localStorage.getItem(KEY);
  } catch (error) {
    stored = null;
  }

  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-theme-toggle]');
    if (!button) return;

    var current =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', next);
    button.setAttribute('aria-label', next === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');

    try {
      localStorage.setItem(KEY, next);
    } catch (error) {
      // Storage can be blocked in private mode; the toggle still works for the session.
    }
  });
})();
