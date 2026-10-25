// English copy for the detail pages; Indonesian stays in the markup.
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  // Navigation and section headings shared by every detail page.
  var BASE = {
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'h.problem': 'Problem',
    'h.role': 'My role',
    'h.built': 'What I built',
    'h.result': 'Result',
    'h.status': 'Status'
  };

  var DICT = {
    'lab-profile': {
      title: 'Lab Profile MMT - Abdul Ghofur Almiqbadi',
      desc: 'Campus laboratory profile site in PHP with an admin panel for the gallery, news, and project catalog.',
      'p.back': 'All projects',
      'p.kind': 'Web',
      'p.title': 'Lab Profile Multimedia and Mobile Technology',
      'p.meta': 'Frontend designer, some backend · 6 people · Oct-Dec 2025',
      'p.shot': 'Screenshot slot - 1200x750',
      'p.problem': 'The laboratory had its material scattered across many places: profile, project catalog, gallery, news, lecturer list, and student work. There was no single place to present it, and every update had to go through someone who could edit code.',
      'p.role': 'Frontend designer for several pages, plus part of the controllers and queries, and the admin pages used to manage site content.',
      'p.built': 'Home, about, project catalog, gallery, news, lecturer profiles, and student work pages with a view/controller/model split. An admin panel to add, edit, and delete gallery, news, and catalog entries.',
      'p.result': 'Lab staff can update the gallery, news, and catalog themselves without touching code.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.label': 'Next project',
      'next.link': 'KeJepret'
    },
    'kejepret': {
      title: 'KeJepret - Abdul Ghofur Almiqbadi',
      desc: 'Race photo marketplace in Laravel with face search, watermarked previews, and paid downloads.',
      'p.back': 'All projects',
      'p.kind': 'Web',
      'p.title': 'KeJepret',
      'p.meta': 'Frontend designer · 4 people · Feb-Jun 2026',
      'p.shot': 'Screenshot slot - 1200x750',
      'p.problem': 'A single race produces thousands of photos. Runners struggle to find their own, and photographers had no safe way to sell them without risking the originals spreading.',
      'p.role': 'Frontend designer. I built the interface for the search flow, cart, checkout, and photographer dashboard with Blade and Tailwind.',
      'p.built': 'Face search results with a watermarked preview, a cart that spans multiple photographers, checkout, and a photographer dashboard for managing photos, prices, balance, and payouts. The interface connects to Laravel controllers, the Filament admin panel, and a FastAPI face search service.',
      'p.result': 'One complete flow from selfie to paid download. The full-resolution file only opens through a UUID token after an order is paid.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.label': 'Next project',
      'next.link': 'Sign.L'
    },
    'signl': {
      title: 'Sign.L - Abdul Ghofur Almiqbadi',
      desc: 'Flutter app for learning BISINDO with on-device hand shape detection, quizzes, and a community.',
      'p.back': 'All projects',
      'p.kind': 'Mobile',
      'p.title': 'Sign.L',
      'p.meta': 'Project manager, frontend, machine learning · 5 people · Aug 2026-present',
      'p.shot': 'Screenshot slot - 1200x750',
      'p.problem': 'Learning BISINDO from video gives no feedback. Nothing tells you whether your hand shape is actually correct.',
      'p.role': 'Project manager, frontend, and machine learning. I split the team workload by folder, kept the architecture consistent, and prepared the dataset and model.',
      'p.built': 'A Flutter app with a thin-controller architecture and a service layer, so UI code never calls the model or the network directly. Material, camera, quiz, and community screens. The camera flow: capture, crop, resize, normalise, then run inference on the device.',
      'p.result': 'The camera reads hand shapes and checks them on the device. The project is still running.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.label': 'Next project',
      'next.link': 'Codename Tree'
    },
    'codename-tree': {
      title: 'Codename Tree - Abdul Ghofur Almiqbadi',
      desc: 'Five Flutter apps in one monorepo with shared core packages, encrypted notes, and a single theme source.',
      'p.back': 'Back to portfolio',
      'p.kind': 'Mobile',
      'p.title': 'Codename Tree',
      'p.meta': 'Solo · Ongoing',
      'p.shot': 'Screenshot slot - 1200x750',
      'p.problem': 'Notes, tasks, money, habits, and schedule usually live in five different apps, each with its own look and its own way of working. Merging them into one large app makes every part heavy and hard to maintain.',
      'p.role': 'Solo. Architecture, UI, data, security, and build.',
      'p.built': 'Five separate Flutter apps in one monorepo, sharing core packages: arku_core (theme, tokens, base widgets), arku_data (Drift/SQLite schema and repositories), arku_sync, arku_premium, and arku_media. Locked notes are encrypted with AES-256-GCM using a key derived from the PIN through PBKDF2 at 120,000 iterations, so the database stays unreadable without the PIN.',
      'p.result': 'All five apps draw from one theme source and one data access pattern, so a change in the core package applies to all of them at once. Locked note content stays unreadable even if the database file is taken directly.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'p.status': 'The project is still running. The five apps, the shared packages, and note encryption are already in the repository. Drive sync, premium, and photo attachments are still in progress.',
      'next.label': 'Next project',
      'next.link': 'Lab Profile MMT'
    },
    'experience': {
      title: 'Experience - Abdul Ghofur Almiqbadi',
      desc: 'Organisations and part-time work: robotics software, media broadcasting, student association, and social media.',
      'p.back': 'Back to portfolio',
      'p.title': 'Experience',
      'p.meta': 'Organisations and part-time work',
      'e.1.role': 'Software Programming Staff',
      'e.1.meta': 'Malang · On site · Nov 2024 - Dec 2025 · 1 yr 2 mo',
      'e.1.desc': 'Trained YOLO-based object detection models for autonomous robot navigation. My part was the data and the model: annotating images, preprocessing to improve dataset quality, then running real-time object detection in Python so the robot could recognise obstacles around it.',
      'e.1.l1': 'Annotated and preprocessed image datasets for the YOLO model.',
      'e.1.l2': 'Implemented real-time object detection in Python.',
      'e.1.l3': 'Integrated the model into the robot system with the technical team.',
      'e.1.tools': 'Tools: Python · YOLO · data annotation',
      'e.2.role': 'Network & Broadcasting Staff',
      'e.2.meta': 'Malang · On site · Jul 2025 - present · 1 yr 4 mo',
      'e.2.prev': 'Previous role: Documentation & Broadcasting Staff · Jul 2025 - Jun 2026',
      'e.2.desc': 'Produced and broadcast pesantren events as videotron operator, camera operator, and livestream operator.',
      'e.2.l1': 'Videotron Operator - Wisuda & Pengukuhan Santri Al-Hikam 2026 (Sep 2026)',
      'e.2.l2': 'Camera Operator - Festival Ilmiah Santri 2026 (Feb 2026)',
      'e.2.l3': 'Camera & Livestream Operator - Manasik Haji KBIH Al-Hikam (Nov-Dec 2025)',
      'e.2.tools': 'Tools: vMix · camera · livestream',
      'e.3.role': 'Research, Talent & Interests Staff',
      'e.3.meta': 'Malang · Mar 2025 - Feb 2026 · 1 yr',
      'e.3.desc': 'Member of the research and talent department, and involved in the department events as committee member.',
      'e.3.l1': 'Chair - Musyawarah Kerja HMTI 2025 (Jan-Mar 2025)',
      'e.3.l2': 'Media Staff - Pemilihan Ketua Umum HMTI 2025 (Sep 2025 - Jan 2026)',
      'e.3.l3': 'Logistics & Security Staff - Open Recruitment HMTI 2025 (Jul-Nov 2025)',
      'e.3.l4': 'Food and Beverage Staff - Seminar Nasional HMTI 2025 (Jun-Nov 2025)',
      'e.3.l5': 'Logistics & Healthcare Staff Badminton - Sportif 2025 (Jun-Nov 2025)',
      'e.3.l6': 'Media & Discipline Staff - Expo Campus 2025 (Aug-Sep 2025)',
      'e.3.l7': 'Media and Discipline Staff - Prastudi Mahasiswa 2025 (May-Sep 2025)',
      'e.3.l8': 'Logistics Staff - 11th Dies Natalis HMTI 2025 (May-Jun 2025)',
      'e.3.l9': 'Public Relations Staff - Dialog Dosen Mahasiswa JTI 2025 (Apr-Jun 2025)',
      'e.3.l10': 'Esports Livestream Operator - Sportif 2024 (Nov-Dec 2024)',
      'e.3.tools': 'Tools: event management · communication · video editing · image editing',
      'e.4.role': 'Social Media Admin',
      'e.4.meta': 'Bandung · Remote · Nov 2023 - Jul 2024 · 9 mo',
      'e.4.desc': 'Ran Instagram and Facebook for the Mobile Legends news division: topic research, writing, editing visual and video assets, daily publishing, and comment moderation.',
      'e.4.tools': 'Tools: Canva · CapCut',
      'p.next': 'Next'
    },
    'certifications': {
      title: 'Certifications - Abdul Ghofur Almiqbadi',
      desc: 'NVIDIA, Skilvul, and Dicoding certificates in prompt engineering, Python, IoT, Flutter, and Dart.',
      'p.back': 'Back to portfolio',
      'p.title': 'Certifications',
      'p.meta': '9 certificates from 3 issuers',
      'p.note': 'Credential IDs are not published here. Verification links can be added per entry once available.',
      'c.date.jan25': 'Jan 2025',
      'c.date.mar23': 'Mar 2023',
      'c.date.jun23': 'Jun 2023',
      'c.date.oct23': 'Oct 2023',
      'c.dicoding.flutter': 'Belajar Membuat Aplikasi Flutter untuk Pemula',
      'c.dicoding.flutter.meta': 'Oct 2023 · valid until Oct 2026',
      'c.dicoding.dart': 'Memulai Pemrograman dengan Dart',
      'c.dicoding.logic': 'Pengenalan ke Logika Pemrograman (Programming Logic 101)'
    }
  };

  var page = document.body.getAttribute('data-page');
  var pageDict = DICT[page];
  if (!pageDict) return;

  // Merges shared navigation copy with the page-specific dictionary.
  var dict = {};
  [BASE, pageDict].forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      dict[key] = source[key];
    });
  });

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
