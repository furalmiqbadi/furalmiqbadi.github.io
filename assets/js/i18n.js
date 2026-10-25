// Swaps page copy between Indonesian (read from the markup) and English (dictionary below).
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  var EN = {
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'hero.title': 'Hi, I\'m<br><em>Abdul Ghofur Almiqbadi</em>',
    'hero.lead': 'D4 Informatics Engineering student at Politeknik Negeri Malang. Currently going deeper into Web Development, Android Development, Internet of Things, and Machine Learning. Interested in visual design and user experience.',

    'facts.focus.label': 'Focus',
    'facts.focus.value': 'Frontend, web & mobile, IoT, ML',
    'facts.stack.label': 'Stack',
    'facts.gpa.label': 'GPA',

    'work.title': 'Work',
    'work.meta': 'All projects',
    'work.origin.pbl': 'Project-based learning',
    'work.origin.solo': 'Solo project',
    'work.status.progress': 'In progress',
    'work.detail': 'View detail',
    'work.1.title': 'Lab Profile MMT',
    'work.1.meta': 'Frontend designer · 6 people · Oct-Dec 2025',
    'work.1.desc': 'A campus laboratory profile site with an admin panel for the gallery, news, and project catalog.',
    'work.1.result': '<strong>Result:</strong> lab staff can update the gallery, news, and catalog themselves without touching code.',
    'work.2.title': 'KeJepret',
    'work.2.meta': 'Frontend designer · 4 people · Feb-Jun 2026',
    'work.2.desc': 'A race photo marketplace where runners find their photos through face search, then buy the original from the photographer.',
    'work.2.result': '<strong>Result:</strong> a watermarked preview keeps the full-resolution file locked until an order is paid.',
    'work.3.title': 'Sign.L',
    'work.3.meta': 'Project manager, frontend, machine learning · 5 people · Aug 2026-present',
    'work.3.desc': 'A BISINDO learning app with a camera that reads hand shapes, plus quizzes and a community.',
    'work.3.result': '<strong>Result:</strong> the camera checks hand shapes and tells whether the sign is correct.',
    'work.4.title': 'Codename Tree',
    'work.4.meta': 'Solo · Ongoing',
    'work.4.desc': 'Five Flutter apps - notes, tasks, money, habits, and calendar - in one monorepo with shared core packages.',
    'work.4.result': '<strong>Result:</strong> all five apps share one core package, so theme, components, and data access stay consistent across them.',

    'exp.title': 'Experience',
    'exp.meta': 'Organisations and part-time work',
    'exp.1.role': 'Network & Broadcasting Staff',
    'exp.1.meta': 'Jul 2025 - present · 1 yr 4 mo',
    'exp.1.desc': 'Videotron, camera, and livestream operator for pesantren events: graduation, Festival Ilmiah Santri, and Manasik Haji.',
    'exp.2.role': 'Research, Talent & Interests Staff',
    'exp.2.meta': 'Mar 2025 - Feb 2026 · 1 yr',
    'exp.2.desc': 'Chair of Musyawarah Kerja 2025, plus ten other committees across media, logistics, public relations, and esports livestream.',
    'exp.3.role': 'Software Programming Staff',
    'exp.3.meta': 'Nov 2024 - Dec 2025 · 1 yr 2 mo',
    'exp.3.desc': 'Trained YOLO models for autonomous robot navigation: data annotation, image preprocessing, and real-time object detection in Python.',
    'exp.4.role': 'Social Media Admin',
    'exp.4.meta': 'Nov 2023 - Jul 2024 · 9 mo · Remote',
    'exp.4.desc': 'Ran Instagram and Facebook for the Mobile Legends news division: research, editing, daily publishing, and comment moderation.',

    'about.title': 'About',
    'about.meta': 'How I work',
    'about.p1': 'I am interested in design for web and mobile platforms. For now I mostly work on the frontend or the app interface, though sometimes I also work on the backend.',
    'about.p2': 'Right now I am learning C++, Java, Flutter, Dart, Python, HTML, CSS, JS, Laravel, and PHP.',
    'about.p3': 'For other interests, I am into photography, videography, computer networking, and IoT. Outside class I work on photography and videography.',
    'edu.meta': 'D4 Informatics Engineering · 2024 - present · GPA 3.78 / 4.00',

    'awards.label': 'Awards',
    'awards.1': 'OSN-K Malang Regency Informatics 2023 - 2nd place, city/regency level',
    'awards.2': 'OSN-K Malang Regency Informatics 2022 - 8th place, city/regency level',
    'awards.3': 'Samsung Innovation Campus Batch 4 (Team Verlyn - 2023) - Top 25',

    'certs.label': 'Certifications',
    'certs.more': 'See all certifications',
    'certs.1': 'Building LLM Applications With Prompt Engineering - NVIDIA, 2025',
    'certs.2': 'Internet of Things: Fundamentals, Hardware, Software & Platforms - Skilvul, 2023',
    'certs.3': 'Python Dasar, Python Lanjutan, Algorithm & Data Structures (Gold) - Skilvul, 2023',
    'certs.4': 'Flutter for Beginners, Dart, Programming Logic 101 - Dicoding, 2023',

    'skills.languages': 'Programming languages',
    'skills.ml': 'Machine learning',
    'skills.tools': 'Tools',

    'contact.title': 'Contact',
    'contact.meta': 'Malang, East Java',
    'contact.cv': 'Download CV',

    'footer.note': 'Portfolio'
  };

  var EN_TITLE = 'Abdul Ghofur Almiqbadi - Frontend Developer';
  var EN_DESC = 'D4 Informatics Engineering student at Politeknik Negeri Malang. Frontend developer on three team projects, plus a solo project called Codename Tree.';

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
