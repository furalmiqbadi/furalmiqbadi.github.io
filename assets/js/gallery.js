// Photo viewer for project pages: thumbnails, click to switch, slow auto-advance.
(function () {
  var AUTO_MS = 6000;
  var PAGER_WINDOW = 3;

  // Reads the pipe-separated image list declared on the container.
  function readImages(node) {
    return (node.getAttribute('data-images') || '')
      .split('|')
      .map(function (path) { return path.trim(); })
      .filter(function (path) { return path !== ''; });
  }

  // Builds one clickable preview for the thumbnail strip.
  function makeThumb(src, index, onPick) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'thumb';

    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';

    button.appendChild(img);
    button.addEventListener('click', function () { onPick(index); });
    return button;
  }

  // Hides a broken image so the frame keeps its plain background.
  function watchMedia(media) {
    if (!media || media.getAttribute('data-watched') === 'true') return;
    media.setAttribute('data-watched', 'true');
    media.addEventListener('error', function () { media.hidden = true; });
  }

  // Numbered pager: three numbers at a time, plus arrows for the next group.
  function renderPager(pager, total, current, onPick) {
    pager.innerHTML = '';
    if (total < 2) return;

    var start = Math.max(0, Math.min(current - 1, total - PAGER_WINDOW));
    if (total <= PAGER_WINDOW) start = 0;
    var end = Math.min(total, start + PAGER_WINDOW);

    function makeButton(label, index, extra) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      if (extra) button.className = extra;
      if (index === null) {
        button.disabled = true;
      } else {
        button.addEventListener('click', function () { onPick(index); });
      }
      pager.appendChild(button);
    }

    // Arrows only appear once the pages outnumber the visible numbers.
    var arrows = total > PAGER_WINDOW;

    if (arrows) makeButton('‹', current === 0 ? null : current - 1, 'pager__arrow');

    for (var i = start; i < end; i++) {
      makeButton(String(i + 1), i, i === current ? 'is-active' : '');
    }

    if (arrows) makeButton('›', current === total - 1 ? null : current + 1, 'pager__arrow');
  }

  // Single project gallery: one large image plus a thumbnail strip.
  function setupGallery(root) {
    var media = root.querySelector('[data-media]');
    var thumbs = root.querySelector('[data-thumbs]');
    var images = readImages(root);
    if (!media || !thumbs || images.length === 0) return;

    var index = 0;
    var timer = null;

    function paint() {
      media.hidden = false;
      media.src = images[index];
      Array.prototype.forEach.call(thumbs.children, function (child, i) {
        child.classList.toggle('is-active', i === index);
      });
    }

    function go(next) {
      index = (next + images.length) % images.length;
      paint();
    }

    function stop() {
      window.clearInterval(timer);
    }

    function start() {
      stop();
      if (images.length < 2) return;
      timer = window.setInterval(function () { go(index + 1); }, AUTO_MS);
    }

    images.forEach(function (src, i) {
      thumbs.appendChild(makeThumb(src, i, function () {
        go(i);
        start();
      }));
    });

    watchMedia(media);

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    paint();
    start();
  }

  // Stacked lists split into pages of three, switched through the numbered pager.
  function setupPaged(root) {
    var pages = Array.prototype.slice.call(root.querySelectorAll('.paged__page'));
    var pager = root.querySelector('[data-pager]');
    if (pages.length === 0 || !pager) return;

    var current = 0;

    function paint() {
      pages.forEach(function (page, i) {
        page.classList.toggle('is-active', i === current);
      });
      renderPager(pager, pages.length, current, function (next) {
        current = Math.max(0, Math.min(pages.length - 1, next));
        paint();
      });
    }

    root.classList.add('is-ready');
    paint();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-gallery]'), setupGallery);
  Array.prototype.forEach.call(document.querySelectorAll('[data-paged]'), setupPaged);
})();
