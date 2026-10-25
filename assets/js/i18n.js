// Swaps page copy between Indonesian (read from the markup) and English (dictionary below).
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  var EN = {
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Hi, I\'m <em>Abdul Ghofur Almiqbadi</em>',
    'hero.lead': 'D4 Informatics Engineering student at Politeknik Negeri Malang. I mostly work on the frontend. I have worked on several projects, including a laboratory profile site in PHP, a race photo marketplace in Laravel, and a sign language app in Flutter.',
    'hero.cta': 'View projects',
    'facts.focus.label': 'Focus',
    'facts.focus.value': 'Frontend, web & mobile',
    'facts.stack.label': 'Stack',
    'facts.gpa.label': 'GPA',
    'work.1.title': 'Website - Lab Profile Multimedia and Mobile Technology',
    'work.1.meta': 'Frontend designer, some backend · 6 people · Oct-Dec 2025',
    'work.1.desc': 'A campus laboratory profile site with home, about, project catalog, lab gallery, lab news, lecturer profiles, and student work pages. I worked as the frontend designer on several pages, a bit of controller and query work, and the admin pages used to manage content.',
    'work.2.title': 'Website - KeJepret: Marketplace for selling race photos',
    'work.2.meta': 'Frontend designer · 4 people · Feb-Jun 2026',
    'work.2.desc': 'A website where runners find their own photos using face search. Results appear with a watermark, and the original can be bought from the photographer. I worked as the frontend designer building the interface with Blade and Tailwind for the search, cart, checkout, and photographer dashboard flows.',
    'work.3.title': 'Mobile - Sign.L: BISINDO sign language learning app (Ongoing)',
    'work.3.meta': 'Project manager, frontend, machine learning · 5 people · Aug 2026-present',
    'work.3.desc': 'A mobile app for learning BISINDO with a camera that reads hand shapes to check whether a sign is correct, plus quizzes to deepen understanding and a community for sharing experience. I worked as project manager, helped build several screens, and built the dataset and model for the machine learning part.',
    'about.title': 'About',
    'about.meta': 'How I work',
    'about.p1': 'I am interested in design for web and mobile platforms. For now I mostly work on the frontend or the app interface, though sometimes I also work on the backend.',
    'about.p2': 'Right now I am learning C++, Java, Flutter, Dart, Python, HTML, CSS, JS, Laravel, and PHP.',
    'about.p3': 'For other interests, I am into game development, photography, videography, and computer networking.',
    'edu.meta': 'D4 Informatics Engineering · 2024 - 2028 (expected) · GPA 3.78 / 4.00',
    'certs.label': 'Certifications',
    'skills.languages': 'Languages',
    'contact.title': 'Contact',
    'contact.meta': 'Malang, East Java',
    'footer.note': 'Static site · GitHub Pages'
  };

  var EN_TITLE = 'Abdul Ghofur Almiqbadi - Frontend Developer';
  var EN_DESC = 'D4 Informatics Engineering student at Politeknik Negeri Malang. Frontend developer on three team projects built with PHP, Laravel, and Flutter.';

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
    titleNode.textContent = english ? EN_TITLE : idTitle;
    descNode.setAttribute('content', english ? EN_DESC : idDesc);

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
