// Swaps page copy between Indonesian (read from the markup) and English (generated dictionary).
(function () {
  var STORAGE_KEY = 'portfolio-lang';
  var DATA = window.PF_HOME_EN || { title: '', desc: '', copy: {} };
  var EN = DATA.copy || {};

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var idCopy = {};
  nodes.forEach(function (node) {
    var key = node.getAttribute('data-i18n');
    idCopy[key] = node.hasAttribute('data-i18n-html') ? node.innerHTML : node.textContent;
  });

  var titleNode = document.querySelector('title');
  var descNode = document.querySelector('meta[name="description"]');
  var idTitle = titleNode.textContent;
  var idDesc = descNode.getAttribute('content');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.lang__btn'));

  // Applies one language to every tagged node, the document title, and the meta description.
  function apply(lang) {
    var english = lang === 'en';

    nodes.forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var value = english ? EN[key] : idCopy[key];
      if (value === undefined) return;
      if (node.hasAttribute('data-i18n-html')) {
        node.innerHTML = value;
      } else {
        node.textContent = value;
      }
    });

    document.documentElement.lang = english ? 'en' : 'id';
    titleNode.textContent = english ? DATA.title : idTitle;
    descNode.setAttribute('content', english ? DATA.desc : idDesc);

    buttons.forEach(function (button) {
      var active = button.getAttribute('data-lang') === lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Storage can be blocked in private mode; the toggle still works for the session.
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.getAttribute('data-lang'));
    });
  });

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    stored = null;
  }

  if (stored === 'en') apply('en');
})();
