// Photo viewer for project, experience, and certificate pages.
(function () {
  var AUTO_MS = 6000;
  var PAGER_WINDOW = 3;
  var EXTENSIONS = ['.jpg', '.png', '.jpeg', '.webp'];

  // Reads the pipe-separated image list declared on the container.
  function readImages(node) {
    return (node.getAttribute('data-images') || '')
      .split('|')
      .map(function (path) { return path.trim(); })
      .filter(function (path) { return path !== ''; });
  }

  // Tests one candidate at a time so a missing file never reaches the page.
  function probe(candidates, index, done) {
    if (index >= candidates.length) {
      done(null);
      return;
    }

    var tester = new Image();
    tester.onload = function () { done(candidates[index]); };
    tester.onerror = function () { probe(candidates, index + 1, done); };
    tester.src = candidates[index];
  }

  // Keeps only the declared photos that really exist, in their declared order.
  function resolveImages(paths, done) {
    var found = new Array(paths.length);
    var pending = paths.length;

    if (pending === 0) {
      done([]);
      return;
    }

    paths.forEach(function (path, position) {
      var candidates = /\.(jpe?g|png|webp|gif)$/i.test(path)
        ? [path]
        : EXTENSIONS.map(function (ext) { return path + ext; });

      probe(candidates, 0, function (hit) {
        found[position] = hit;
        pending--;
        if (pending === 0) {
          done(found.filter(function (item) { return item; }));
        }
      });
    });
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

  // Wires one gallery: large frame, thumbnail strip, slow auto-advance.
  function buildGallery(root, media, thumbs, images) {
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

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    paint();
    start();
  }

  // Gallery containers hide themselves when none of their photos exist yet.
  function setupGallery(root) {
    var media = root.querySelector('[data-media]');
    var thumbs = root.querySelector('[data-thumbs]');
    var declared = readImages(root);

    if (!media || !thumbs || declared.length === 0) {
      root.hidden = true;
      return;
    }

    resolveImages(declared, function (images) {
      if (images.length === 0) {
        root.hidden = true;
        return;
      }
      buildGallery(root, media, thumbs, images);
    });
  }

  // Homepage cards drop the photo frame when the screenshot file is missing.
  function setupShots() {
    Array.prototype.forEach.call(document.querySelectorAll('.proj__shot'), function (frame) {
      var img = frame.querySelector('img');

      function drop() {
        if (!frame.parentNode) return;
        frame.parentNode.classList.add('proj--wide');
        frame.remove();
      }

      if (!img) {
        drop();
        return;
      }

      img.addEventListener('error', drop);
      if (img.complete && img.naturalWidth === 0) drop();
    });
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
  setupShots();
})();
