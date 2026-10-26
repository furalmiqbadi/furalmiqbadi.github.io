// English copy for the detail pages; Indonesian stays in the markup.
(function () {
  var STORAGE_KEY = 'portfolio-lang';
  var DATA = window.PF_PAGES_EN || { base: {}, pages: {} };

  var page = document.body.getAttribute('data-page');
  var pageDict = DATA.pages[page];
  if (!pageDict) return;

  // Merges shared labels with the page-specific dictionary.
  var dict = {};
  [DATA.base, pageDict.copy].forEach(function (source) {
    Object.keys(source || {}).forEach(function (key) {
      dict[key] = source[key];
    });
  });
  dict.title = pageDict.title;
  dict.desc = pageDict.desc;

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var idCopy = {};
  nodes.forEach(function (node) {
    idCopy[node.getAttribute('data-i18n')] = node.innerHTML;
  });

  var titleNode = document.querySelector('title');
  var descNode = document.querySelector('meta[name="description"]');
  var idTitle = titleNode.textContent;
  var idDesc = descNode ? descNode.getAttribute('content') : '';
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.lang__btn'));

  // Applies English or restores the Indonesian copy captured on load.
  function apply(lang) {
    var english = lang === 'en';

    nodes.forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var value = english ? dict[key] : idCopy[key];
      if (value === undefined) return;
      node.innerHTML = value;
    });

    document.documentElement.lang = english ? 'en' : 'id';
    titleNode.textContent = english ? dict.title : idTitle;
    if (descNode) descNode.setAttribute('content', english ? dict.desc : idDesc);

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
