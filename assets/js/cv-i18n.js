// Swaps CV copy between Indonesian (read from the markup) and English (dictionary below).
(function () {
  var STORAGE_KEY = 'cv-lang';
  var FILES = {
    id: 'abdul-ghofur-almiqbadi-cv-id.pdf',
    en: 'abdul-ghofur-almiqbadi-cv.pdf'
  };

  var EN = {
    'summary.title': 'Professional Summary',
    'summary.body': 'D4 Informatics Engineering student at Politeknik Negeri Malang (GPA 3.78/4.00) and frontend developer on three team projects: a PHP laboratory profile site, a Laravel race photo marketplace, and a Flutter sign language app where I also lead the team and own the on-device model.',
    'skills.title': 'Technical Skills',
    'skills.langs': 'Programming languages:',
    'skills.responsive': 'responsive layout',
    'skills.inference': 'on-device inference',
    'skills.preprocessing': 'image preprocessing',
    'skills.tools': 'Tooling:',
    'exp.title': 'Experience',
    'exp.1.title': 'Sign.L - Sign Language Learning App',
    'exp.1.sub': 'Project Manager, Frontend, ML Engineer · Team of 5 · Flutter, TFLite',
    'exp.1.dates': 'Aug 2026 - Present',
    'exp.1.b1': 'Lead a five-person team on a BISINDO learning app, splitting work by folder and enforcing a thin-controller/service-layer architecture so UI code never calls the model or network directly.',
    'exp.1.b2': 'Built the learning-path, material, and camera screens in Flutter with Provider state management, and prepared the TFLite classifier for the 26 BISINDO alphabet signs plus the crop/resize/normalize pipeline feeding inference from the device camera.',
    'exp.2.title': 'KeJepret - Race Photo Marketplace',
    'exp.2.sub': 'Frontend Developer · Team of 4 · Laravel 12, Blade, Tailwind CSS 4',
    'exp.2.dates': 'Feb 2026 - Jun 2026',
    'exp.2.b1': 'Built the frontend in Blade and Tailwind over Laravel 12 for the runner face-search, cart, checkout, and photographer dashboard flows, keeping views in sync with the Filament admin panel and an external FastAPI face-search service.',
    'exp.2.b2': 'Connected watermarked photo previews, search results, and paid-download states to the Laravel controllers and API endpoints.',
    'exp.3.title': 'Laboratory Profile Website',
    'exp.3.sub': 'Frontend Developer, with backend contributions · Team of 6 · PHP, MySQL',
    'exp.3.dates': 'Oct 2025 - Dec 2025',
    'exp.3.b1': 'Built the public site in PHP on a view/controller/model split: home, about, catalog, gallery, news, lecturer, and student-work pages.',
    'exp.3.b2': 'Implemented the admin area for managing gallery, news, and catalog content, including the controllers and queries behind each screen.',
    'edu.title': 'Education',
    'edu.school': 'Politeknik Negeri Malang - D4 Informatics Engineering',
    'edu.sub': 'GPA 3.78 / 4.00 · Coursework: web programming, database systems, mobile programming, software engineering',
    'edu.dates': '2024 - present',
    'cert.title': 'Certifications & Training',
    'cert.1.date': 'Jan 2025',
    'cert.2.date': 'Jun 2023',
    'cert.3.date': 'Mar 2023',
    'cert.4.date': 'Oct 2023',
    'add.title': 'Additional',
    'add.langs': 'Languages:',
    'add.langs.value': 'Indonesian (native), English (professional working proficiency)'
  };

  var EN_TITLE = 'CV - Abdul Ghofur Almiqbadi | Frontend Developer';
  var EN_DESC = 'Curriculum vitae of Abdul Ghofur Almiqbadi, frontend developer (PHP, Laravel, Flutter). Single-column, text-based, ATS-friendly.';
  var EN_DOWNLOAD = 'Download PDF';

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
  var idDownload = downloadNode.textContent;
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
    titleNode.textContent = english ? EN_TITLE : idTitle;
    descNode.setAttribute('content', english ? EN_DESC : idDesc);
    downloadNode.href = FILES[english ? 'en' : 'id'];
    downloadNode.textContent = english ? EN_DOWNLOAD : idDownload;

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
