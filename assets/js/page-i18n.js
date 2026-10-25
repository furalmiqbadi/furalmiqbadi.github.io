// English copy for the detail pages; Indonesian stays in the markup.
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  // Navigation, section headings, and shared labels used on every detail page.
  var BASE = {
    'nav.work': 'Work',
    'nav.experience': 'Experience',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'h.problem': 'Problem',
    'h.role': 'My role',
    'h.built': 'What I built',
    'h.result': 'Result',
    'h.status': 'Status',
    'h.about': 'About this certificate',
    'h.work': 'What I did',
    'h.topics': 'Topics',
    'h.relevance': 'Relevance',
    'h.tools': 'Tools',
    'next.label': 'Next'
  };

  var DICT = {
    'lab-profile': {
      title: 'Lab Profile MMT - Abdul Ghofur Almiqbadi',
      desc: 'Campus laboratory profile site in PHP with an admin panel for the gallery, news, and project catalog.',
      'p.back': 'All projects',
      'p.kind': 'Web',
      'p.title': 'Lab Profile Multimedia and Mobile Technology',
      'p.meta': 'Frontend designer, some backend · 6 people · Oct-Dec 2025',
      'p.problem': 'The laboratory had its material scattered across many places: profile, project catalog, gallery, news, lecturer list, and student work. There was no single place to present it, and every update had to go through someone who could edit code.',
      'p.role': 'Frontend designer for several pages, plus part of the controllers and queries, and the admin pages used to manage site content.',
      'p.built': 'Home, about, project catalog, gallery, news, lecturer profiles, and student work pages with a view/controller/model split. An admin panel to add, edit, and delete gallery, news, and catalog entries.',
      'p.result': 'Lab staff can update the gallery, news, and catalog themselves without touching code.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.link': 'KeJepret'
    },
    'kejepret': {
      title: 'KeJepret - Abdul Ghofur Almiqbadi',
      desc: 'Race photo marketplace in Laravel with face search, watermarked previews, and paid downloads.',
      'p.back': 'All projects',
      'p.kind': 'Web',
      'p.title': 'KeJepret',
      'p.meta': 'Frontend designer · 4 people · Feb-Jun 2026',
      'p.problem': 'A single race produces thousands of photos. Runners struggle to find their own, and photographers had no safe way to sell them without risking the originals spreading.',
      'p.role': 'Frontend designer. I built the interface for the search flow, cart, checkout, and photographer dashboard with Blade and Tailwind.',
      'p.built': 'Face search results with a watermarked preview, a cart that spans multiple photographers, checkout, and a photographer dashboard for managing photos, prices, balance, and payouts. The interface connects to Laravel controllers, the Filament admin panel, and a FastAPI face search service.',
      'p.result': 'One complete flow from selfie to paid download. The full-resolution file only opens through a UUID token after an order is paid.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.link': 'Sign.L'
    },
    'signl': {
      title: 'Sign.L - Abdul Ghofur Almiqbadi',
      desc: 'Flutter app for learning BISINDO with on-device hand shape detection, quizzes, and a community.',
      'p.back': 'All projects',
      'p.kind': 'Mobile',
      'p.title': 'Sign.L',
      'p.meta': 'Project manager, frontend, machine learning · 5 people · Aug 2026-present',
      'p.problem': 'Learning BISINDO from video gives no feedback. Nothing tells you whether your hand shape is actually correct.',
      'p.role': 'Project manager, frontend, and machine learning. I split the team workload by folder, kept the architecture consistent, and prepared the dataset and model.',
      'p.built': 'A Flutter app with a thin-controller architecture and a service layer, so UI code never calls the model or the network directly. Material, camera, quiz, and community screens. The camera flow: capture, crop, resize, normalise, then run inference on the device.',
      'p.result': 'The camera reads hand shapes and checks them on the device. The project is still running.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'next.link': 'Codename Tree'
    },
    'codename-tree': {
      title: 'Codename Tree - Abdul Ghofur Almiqbadi',
      desc: 'Five Flutter apps in one monorepo with shared core packages, encrypted notes, and a single theme source.',
      'p.back': 'Back to portfolio',
      'p.kind': 'Mobile',
      'p.title': 'Codename Tree',
      'p.meta': 'Solo · Ongoing',
      'p.problem': 'Notes, tasks, money, habits, and schedule usually live in five different apps, each with its own look and its own way of working. Merging them into one large app makes every part heavy and hard to maintain.',
      'p.role': 'Solo. Architecture, UI, data, security, and build.',
      'p.built': 'Five separate Flutter apps in one monorepo, sharing core packages: arku_core (theme, tokens, base widgets), arku_data (Drift/SQLite schema and repositories), arku_sync, arku_premium, and arku_media. Locked notes are encrypted with AES-256-GCM using a key derived from the PIN through PBKDF2 at 120,000 iterations, so the database stays unreadable without the PIN.',
      'p.result': 'All five apps draw from one theme source and one data access pattern, so a change in the core package applies to all of them at once. Locked note content stays unreadable even if the database file is taken directly.',
      'p.tech': 'Technology',
      'p.repo': 'Repository',
      'p.demo': 'Demo not available yet',
      'p.status': 'The project is still running. The five apps, the shared packages, and note encryption are already in the repository. Drive sync, premium, and photo attachments are still in progress.',
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
      'e.1.lead': 'Trained YOLO-based object detection models for autonomous robot navigation.',
      'e.2.role': 'Network & Broadcasting Staff',
      'e.2.meta': 'Malang · On site · Jul 2025 - present · 1 yr 4 mo',
      'e.2.lead': 'Produced and broadcast pesantren events as videotron, camera, and livestream operator.',
      'e.3.role': 'Research, Talent & Interests Staff',
      'e.3.meta': 'Malang · Mar 2025 - Feb 2026 · 1 yr',
      'e.3.lead': 'Member of the research and talent department, plus ten department event committees.',
      'e.4.role': 'Social Media Admin',
      'e.4.meta': 'Bandung · Remote · Nov 2023 - Jul 2024 · 9 mo',
      'e.4.lead': 'Ran Instagram and Facebook for the Mobile Legends news division.'
    },
    'exp-robotics': {
      title: 'Polinema Robotics - Abdul Ghofur Almiqbadi',
      desc: 'Software Programming Staff at Polinema Robotics: dataset annotation and YOLO object detection for autonomous robot navigation.',
      'p.back': 'All experience',
      'p.kind': 'Organisation',
      'p.meta': 'Malang · On site · Nov 2024 - Dec 2025 · 1 yr 2 mo',
      'p.role': 'Software Programming Staff',
      'p.desc': 'Trained YOLO-based object detection models for autonomous robot navigation. My part was the data and the model: annotating images, preprocessing to improve dataset quality, then running real-time object detection in Python so the robot could recognise obstacles around it.',
      'p.l1': 'Annotated and preprocessed image datasets for the YOLO model.',
      'p.l2': 'Implemented real-time object detection in Python.',
      'p.l3': 'Integrated the model into the robot system with the technical team.',
      'p.tools': 'Python · YOLO · data annotation',
      'next.link': 'Al-Hikam Media Center'
    },
    'exp-al-hikam': {
      title: 'Al-Hikam Media Center - Abdul Ghofur Almiqbadi',
      desc: 'Network and Broadcasting Staff at Al-Hikam Media Center: videotron, camera, and livestream operator for pesantren events.',
      'p.back': 'All experience',
      'p.kind': 'Organisation',
      'p.meta': 'Malang · On site · Jul 2025 - present · 1 yr 4 mo',
      'p.role': 'Network & Broadcasting Staff',
      'p.desc': 'Produced and broadcast pesantren events as videotron operator, camera operator, and livestream operator.',
      'p.l1': 'Videotron Operator - Wisuda & Pengukuhan Santri Al-Hikam 2026 (Sep 2026)',
      'p.l2': 'Camera Operator - Festival Ilmiah Santri 2026 (Feb 2026)',
      'p.l3': 'Camera & Livestream Operator - Manasik Haji KBIH Al-Hikam (Nov-Dec 2025)',
      'p.tools': 'vMix · camera · livestream',
      'next.link': 'HMTI Polinema'
    },
    'exp-hmti': {
      title: 'HMTI Polinema - Abdul Ghofur Almiqbadi',
      desc: 'Research, Talent and Interests Staff at HMTI Polinema, plus ten committees across media, logistics, public relations, and livestream.',
      'p.back': 'All experience',
      'p.kind': 'Organisation',
      'p.meta': 'Malang · Mar 2025 - Feb 2026 · 1 yr',
      'p.role': 'Research, Talent & Interests Staff',
      'p.desc': 'Member of the research and talent department, and involved in the department events as committee member.',
      'p.l1': 'Chair - Musyawarah Kerja HMTI 2025 (Jan-Mar 2025)',
      'p.l2': 'Media Staff - Pemilihan Ketua Umum HMTI 2025 (Sep 2025 - Jan 2026)',
      'p.l3': 'Logistics & Security Staff - Open Recruitment HMTI 2025 (Jul-Nov 2025)',
      'p.l4': 'Food and Beverage Staff - Seminar Nasional HMTI 2025 (Jun-Nov 2025)',
      'p.l5': 'Logistics & Healthcare Staff Badminton - Sportif 2025 (Jun-Nov 2025)',
      'p.l6': 'Media & Discipline Staff - Expo Campus 2025 (Aug-Sep 2025)',
      'p.l7': 'Media and Discipline Staff - Prastudi Mahasiswa 2025 (May-Sep 2025)',
      'p.l8': 'Logistics Staff - 11th Dies Natalis HMTI 2025 (May-Jun 2025)',
      'p.l9': 'Public Relations Staff - Dialog Dosen Mahasiswa JTI 2025 (Apr-Jun 2025)',
      'p.l10': 'Esports Livestream Operator - Sportif 2024 (Nov-Dec 2024)',
      'p.tools': 'Event management · communication · video editing · image editing',
      'next.link': 'RISEUPTVID Network'
    },
    'exp-riseup': {
      title: 'RISEUPTVID Network - Abdul Ghofur Almiqbadi',
      desc: 'Social Media Admin at RISEUPTVID Network: running Instagram and Facebook for the Mobile Legends news division.',
      'p.back': 'All experience',
      'p.kind': 'Part-time work',
      'p.meta': 'Bandung · Remote · Nov 2023 - Jul 2024 · 9 mo',
      'p.role': 'Social Media Admin',
      'p.desc': 'Ran Instagram and Facebook for the Mobile Legends news division: topic research, writing, editing visual and video assets, daily publishing, and comment moderation.',
      'p.tools': 'Canva · CapCut',
      'next.link': 'All experience'
    },
    'certifications': {
      title: 'Certifications - Abdul Ghofur Almiqbadi',
      desc: 'NVIDIA, Skilvul, and Dicoding certificates in prompt engineering, Python, IoT, Flutter, and Dart.',
      'p.back': 'Back to portfolio',
      'p.title': 'Certifications',
      'p.meta': 'From NVIDIA, Skilvul, and Dicoding',
      'p.note': 'Credential IDs are not published here. Verification links can be added per entry once available.',
      'c.date.jan25': 'Jan 2025',
      'c.date.mar23': 'Mar 2023',
      'c.date.jun23': 'Jun 2023',
      'c.date.oct23': 'Oct 2023',
      'c.dicoding.flutter': 'Belajar Membuat Aplikasi Flutter untuk Pemula',
      'c.dicoding.flutter.meta': 'Oct 2023 · valid until Oct 2026',
      'c.dicoding.dart': 'Memulai Pemrograman dengan Dart',
      'c.dicoding.logic': 'Pengenalan ke Logika Pemrograman (Programming Logic 101)'
    },
    'cert-nvidia-llm': {
      title: 'Building LLM Applications With Prompt Engineering - Abdul Ghofur Almiqbadi',
      desc: 'NVIDIA certificate from January 2025 on building LLM applications with prompt engineering.',
      'p.back': 'All certifications',
      'p.issuer': 'NVIDIA',
      'p.meta': 'Jan 2025',
      'p.about': 'An NVIDIA course on writing prompts for applications that use large language models. The focus is not training a model, but steering it so the output can be used in a real application.',
      'p.t1': 'Prompt structure',
      'p.t2': 'System instructions',
      'p.t3': 'Context and limits',
      'p.t4': 'Output evaluation',
      'p.relevance': 'I use the principles when writing prompts for coding assistants and when testing model output in my own projects: instructions stay explicit, context stays bounded, and the result is checked before use.',
      'next.link': 'Python Dasar (Gold)'
    },
    'cert-skilvul-python-dasar': {
      title: 'Python Dasar (Gold) - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from March 2023, Gold level, for the Python Dasar class.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Mar 2023',
      'p.about': 'A Python fundamentals class at Skilvul, completed with a Gold grade. It covers the base of the language: writing, reading, and tidying Python code from scratch.',
      'p.t1': 'Syntax and data types',
      'p.t2': 'Branching and loops',
      'p.t3': 'Functions',
      'p.t4': 'Lists and dictionaries',
      'p.relevance': 'This is the language I use to process datasets and run YOLO object detection at Polinema Robotics.',
      'next.link': 'Python Lanjutan (Gold)'
    },
    'cert-skilvul-python-lanjutan': {
      title: 'Python Lanjutan (Gold) - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from March 2023, Gold level, for the advanced Python class.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Mar 2023',
      'p.about': 'The follow-up to Python Dasar, also completed with a Gold grade. This part goes into writing code that is tidier and reusable, not just code that runs once.',
      'p.t1': 'Object-oriented programming',
      'p.t2': 'Modules and packages',
      'p.t3': 'Error handling',
      'p.t4': 'Reading and writing files',
      'p.relevance': 'This class and module structure keeps the model training scripts from falling apart when the dataset and parameters grow.',
      'next.link': 'Algorithm & Data Structures (Gold)'
    },
    'cert-skilvul-algo': {
      title: 'Algorithm & Data Structures (Gold) - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from March 2023, Gold level, for Algorithm and Data Structures with Python.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Mar 2023',
      'p.about': 'An algorithms and data structures class in Python, completed with a Gold grade. It covers picking the right data structure and estimating what an algorithm costs.',
      'p.t1': 'Stacks and queues',
      'p.t2': 'Sorting and searching',
      'p.t3': 'Recursion',
      'p.t4': 'Time complexity',
      'p.relevance': 'Used when choosing how to store and look up data in a project, so the code does not get slow from a badly chosen structure.',
      'next.link': 'Internet of Things: Fundamentals'
    },
    'cert-skilvul-iot-fund': {
      title: 'Internet of Things: Fundamentals - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from June 2023 for the Internet of Things: Fundamentals class.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Jun 2023',
      'p.about': 'The first part of the IoT series at Skilvul. It covers the big picture: how a device collects data, sends it, and how it gets used on the other side.',
      'p.t1': 'Sensors and actuators',
      'p.t2': 'Connectivity',
      'p.t3': 'IoT architecture',
      'p.t4': 'Data flow',
      'p.relevance': 'Groundwork for understanding the device side whenever a task involves sensors and sending data.',
      'next.link': 'Internet of Things: Hardware'
    },
    'cert-skilvul-iot-hw': {
      title: 'Internet of Things: Hardware - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from June 2023 for the Internet of Things: Hardware class.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Jun 2023',
      'p.about': 'The hardware part of the IoT series at Skilvul: the physical side that reads its surroundings and carries out commands.',
      'p.t1': 'Microcontrollers',
      'p.t2': 'Pins and interfaces',
      'p.t3': 'Sensors and actuators',
      'p.t4': 'Basic circuits',
      'p.relevance': 'Helps when reading a circuit diagram and wiring a sensor to a development board without guessing pins.',
      'next.link': 'Internet of Things: Software and Platforms'
    },
    'cert-skilvul-iot-sw': {
      title: 'Internet of Things: Software and Platforms - Abdul Ghofur Almiqbadi',
      desc: 'Skilvul certificate from June 2023 for the Internet of Things: Software and Platforms class.',
      'p.back': 'All certifications',
      'p.issuer': 'Skilvul',
      'p.meta': 'Jun 2023',
      'p.about': 'The software and platform part of the IoT series at Skilvul: what handles the data after it leaves the device.',
      'p.t1': 'Firmware',
      'p.t2': 'Data transport protocols',
      'p.t3': 'Platforms and dashboards',
      'p.t4': 'Data storage',
      'p.relevance': 'Used when connecting device data to a view, so sensor readings can be seen without opening a serial monitor.',
      'next.link': 'Belajar Membuat Aplikasi Flutter untuk Pemula'
    },
    'cert-dicoding-flutter': {
      title: 'Belajar Membuat Aplikasi Flutter untuk Pemula - Abdul Ghofur Almiqbadi',
      desc: 'Dicoding certificate from October 2023 for the beginner Flutter app class.',
      'p.back': 'All certifications',
      'p.issuer': 'Dicoding Indonesia',
      'p.title': 'Belajar Membuat Aplikasi Flutter untuk Pemula',
      'p.meta': 'Oct 2023 · valid until Oct 2026',
      'p.about': 'An introductory Flutter class from Dicoding. It covers building a mobile interface from widgets, composing layouts, and handling simple state.',
      'p.t1': 'Widgets and layout',
      'p.t2': 'Simple state',
      'p.t3': 'Navigation between screens',
      'p.t4': 'Assets and images',
      'p.relevance': 'This is where I started with Flutter, which I later used to build Sign.L and the five apps in Codename Tree.',
      'next.link': 'Memulai Pemrograman dengan Dart'
    },
    'cert-dicoding-dart': {
      title: 'Memulai Pemrograman dengan Dart - Abdul Ghofur Almiqbadi',
      desc: 'Dicoding certificate from October 2023 for the Dart programming class.',
      'p.back': 'All certifications',
      'p.issuer': 'Dicoding Indonesia',
      'p.title': 'Memulai Pemrograman dengan Dart',
      'p.meta': 'Oct 2023',
      'p.about': 'A Dart fundamentals class from Dicoding, taken alongside the Flutter class. It covers the language behind Flutter: types, collections, classes, and asynchronous code.',
      'p.t1': 'Types and variables',
      'p.t2': 'Collections',
      'p.t3': 'Classes and objects',
      'p.t4': 'Async and Future',
      'p.relevance': 'The async part is what I lean on when calling the camera and running model inference without freezing the interface.',
      'next.link': 'Programming Logic 101'
    },
    'cert-dicoding-logic': {
      title: 'Pengenalan ke Logika Pemrograman - Abdul Ghofur Almiqbadi',
      desc: 'Dicoding certificate from October 2023 for Programming Logic 101.',
      'p.back': 'All certifications',
      'p.issuer': 'Dicoding Indonesia',
      'p.title': 'Pengenalan ke Logika Pemrograman (Programming Logic 101)',
      'p.meta': 'Oct 2023',
      'p.about': 'A programming logic class from Dicoding. It is not tied to one language: the content is how to break a problem into steps a computer can run.',
      'p.t1': 'Logic flow',
      'p.t2': 'Branching',
      'p.t3': 'Loops',
      'p.t4': 'Pseudocode',
      'p.relevance': 'The foundation that makes switching languages faster: the flow is clear before any code is written.',
      'next.link': 'All certifications'
    }
  };

  var page = document.body.getAttribute('data-page');
  var pageDict = DICT[page];
  if (!pageDict) return;

  // Merges shared labels with the page-specific dictionary.
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
