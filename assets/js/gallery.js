// Photo viewer for project pages and the homepage showcase: thumbnails, click to switch, slow auto-advance.
(function () {
  var AUTO_MS = 6000;

  // Reads the pipe-separated image list declared on the container.
  function readImages(node) {
    return (node.getAttribute('data-images') || '')
      .split('|')
      .map(function (path) { return path.trim(); })
      .filter(function (path) { return path !== ''; });
  }

  // Builds one thumbnail; the number stays visible while the file is missing.
  function makeThumb(src, index, onPick) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'thumb';

    var num = document.createElement('span');
    num.className = 'thumb__num';
    num.textContent = String(index + 1);

    var img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('error', function () { img.hidden = true; });

    button.appendChild(num);
    button.appendChild(img);
    button.addEventListener('click', function () { onPick(index); });
    return button;
  }

  // Keeps the placeholder visible until a real file actually loads.
  function watchMedia(media, slot) {
    if (!media || !slot || media.getAttribute('data-watched') === 'true') return;
    media.setAttribute('data-watched', 'true');

    media.addEventListener('load', function () { slot.hidden = true; });
    media.addEventListener('error', function () {
      media.hidden = true;
      slot.hidden = false;
    });

    if (media.complete && media.naturalWidth > 0) slot.hidden = true;
  }

  // Single project gallery: one large image plus a thumbnail strip.
  function setupGallery(root) {
    var media = root.querySelector('[data-media]');
    var slot = root.querySelector('.media__slot');
    var thumbs = root.querySelector('[data-thumbs]');
    var images = readImages(root);
    if (!media || !slot || !thumbs || images.length === 0) return;

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

    watchMedia(media, slot);

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    paint();
    start();
  }

  // Homepage showcase: one project at a time, its own photos, numbered pager.
  function setupShowcase(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.showcase__item'));
    var thumbs = root.querySelector('[data-thumbs]');
    var pager = root.querySelector('[data-pager]');
    if (items.length === 0 || !thumbs || !pager) return;

    var project = 0;
    var photo = 0;
    var timer = null;

    function images() {
      return readImages(items[project]);
    }

    function media() {
      return items[project].querySelector('[data-media]');
    }

    function stop() {
      window.clearInterval(timer);
    }

    function start() {
      stop();
      if (images().length < 2) return;
      timer = window.setInterval(function () {
        photo = (photo + 1) % images().length;
        paintPhoto();
      }, AUTO_MS);
    }

    function paintPhoto() {
      var list = images();
      var node = media();
      if (!node || list.length === 0) return;

      node.hidden = false;
      node.src = list[photo];
      Array.prototype.forEach.call(thumbs.children, function (child, i) {
        child.classList.toggle('is-active', i === photo);
      });
    }

    function paintProject() {
      items.forEach(function (item, i) {
        item.classList.toggle('is-active', i === project);
      });
      Array.prototype.forEach.call(pager.children, function (button, i) {
        button.classList.toggle('is-active', i === project);
      });

      thumbs.innerHTML = '';
      images().forEach(function (src, i) {
        thumbs.appendChild(makeThumb(src, i, function () {
          photo = i;
          paintPhoto();
          start();
        }));
      });

      watchMedia(media(), items[project].querySelector('.media__slot'));
      photo = 0;
      paintPhoto();
      start();
    }

    Array.prototype.forEach.call(pager.children, function (button, i) {
      button.addEventListener('click', function () {
        project = i;
        paintProject();
      });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    root.classList.add('is-ready');
    paintProject();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-gallery]'), setupGallery);
  Array.prototype.forEach.call(document.querySelectorAll('[data-showcase]'), setupShowcase);
})();
