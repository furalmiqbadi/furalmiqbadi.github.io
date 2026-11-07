// Scroll-driven motion: a turning hairline ring around the portrait and an
// endless project slider. The active card is pulled to the centre line, the
// stack advances with scroll, and it keeps looping on its own while idle.
(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ring = document.querySelector(".portrait__ring");
  var slider = document.querySelector("[data-project-slider]");
  var track = slider ? slider.querySelector(".project-track") : null;
  var originals = track
    ? Array.prototype.slice.call(track.querySelectorAll("[data-project-card]"))
    : [];
  var count = originals.length;
  var cards = originals.slice();

  var position = 0;
  var ticking = false;
  var hovered = false;

  if (!count) {
    // Detail pages only need the ring.
    if (ring && !reduced) {
      window.addEventListener(
        "scroll",
        function () {
          ring.style.transform =
            "rotate(" + (window.pageYOffset * 0.04).toFixed(2) + "deg)";
        },
        { passive: true }
      );
    }
    return;
  }

  // Duplicate the set so the slide can pass the end without a visible rewind.
  originals.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.removeAttribute("data-project-card");
    clone.setAttribute("aria-hidden", "true");
    clone.classList.remove("is-active");
    Array.prototype.forEach.call(
      clone.querySelectorAll("a, button"),
      function (el) {
        el.setAttribute("tabindex", "-1");
      }
    );
    track.appendChild(clone);
    cards.push(clone);
  });

  function centre(card) {
    var offset = card.offsetLeft + card.offsetWidth / 2 - slider.clientWidth / 2;
    track.style.transform = "translate3d(" + (-offset).toFixed(1) + "px,0,0)";
  }

  function paint(index) {
    cards.forEach(function (card, i) {
      card.classList.toggle("is-active", i === index);
    });
  }

  function apply(index, animate) {
    position = index;
    paint(index);
    if (!animate) {
      track.style.transition = "none";
      void track.offsetWidth;
    }
    centre(cards[index]);
    if (!animate) {
      window.requestAnimationFrame(function () {
        track.style.transition = "";
      });
    }
  }

  // Always move forward so the loop never appears to rewind.
  function goTo(target) {
    var current = position % count;
    var delta = (target - current + count) % count;
    if (!delta) return;
    // Clear a leftover clone offset from a previous wrap.
    if (position >= count) position -= count;
    apply(position + delta, true);
  }

  function next() {
    goTo((position % count + 1) % count);
  }

  if (track) {
    track.addEventListener("transitionend", function (event) {
      if (event.propertyName !== "transform" || position < count) return;
      apply(position - count, false);
    });
  }

  apply(1, false);

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;

    if (ring && !reduced) {
      ring.style.transform = "rotate(" + (y * 0.05).toFixed(2) + "deg)";
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    centre(cards[position]);
    onScroll();
  });
  window.addEventListener("load", function () {
    centre(cards[position]);
  });

  // The slider is independent from the page scroll: it just loops on its own.
  window.setInterval(function () {
    if (document.hidden || hovered) return;
    if (slider.contains(document.activeElement)) return;
    var rect = slider.getBoundingClientRect();
    var viewport = window.innerHeight || document.documentElement.clientHeight;
    if (rect.bottom <= 0 || rect.top >= viewport) return;
    next();
  }, 3400);

  slider.addEventListener("mouseenter", function () {
    hovered = true;
  });
  slider.addEventListener("mouseleave", function () {
    hovered = false;
  });
  slider.addEventListener("focusin", function (event) {
    var card = event.target.closest
      ? event.target.closest("[data-project-card]")
      : null;
    var index = card ? originals.indexOf(card) : -1;
    if (index > -1) goTo(index);
  });

  update();
})();
