// Swaps CV copy between Indonesian (read from the markup) and English (generated dictionary).
(function () {
  var STORAGE_KEY = 'cv-lang';
  var DATA = window.PF_CV_EN || { title: '', desc: '', download: '', files: { id: '', en: '' }, copy: {} };
  var EN = DATA.copy || {};

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var idCopy = {};
  nodes.forEach(function (node) {
    idCopy[node.getAttribute('data-i18n')] = node.textContent;
  });

  var titleNode = document.querySelector('title');
  var descNode = document.querySelector('meta[name="description"]');
  var downloadNode = document.getElementById('cv-download');
  var idTitle = titleNode.textContent;
  var idDesc = descNode.getAttribute('content');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.lang__btn'));

  // Applies one language across the sheet, the page metadata, and the PDF download target.
  function apply(lang) {
    var english = lang === 'en';

    nodes.forEach(function (node) {
      var value = english ? EN[node.getAttribute('data-i18n')] : idCopy[node.getAttribute('data-i18n')];
      if (value === undefined) return;
      node.textContent = value;
    });

    document.documentElement.lang = english ? 'en' : 'id';
    titleNode.textContent = english ? DATA.title : idTitle;
    descNode.setAttribute('content', english ? DATA.desc : idDesc);
    downloadNode.href = english ? DATA.files.en : DATA.files.id;

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

  // URL parameter wins so a shared link or the PDF build can pin a language.
  var params = new URLSearchParams(window.location.search);
  var initial = params.get('lang');

  if (initial !== 'id' && initial !== 'en') {
    try {
      initial = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      initial = null;
    }
  }

  if (initial === 'en') apply('en');
})();
