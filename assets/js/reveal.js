// Reveals blocks as they enter the viewport. Purely additive: without JS
// everything stays visible, and any block scrolled past is revealed too, so
// fast jumps can never leave a section blank.
(function () {
  // Split a heading into one span per letter so the letters can start stacked
  // at the left edge and then slide apart into the real title.
  function split(title) {
    var text = title.textContent.trim();
    if (!text) return;
    title.textContent = "";
    title.setAttribute("aria-label", text);
    Array.prototype.forEach.call(text, function (ch, i) {
      if (ch === " ") {
        title.appendChild(document.createTextNode(" "));
        return;
      }
      var span = document.createElement("span");
      span.className = "title__l";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--i", i);
      span.textContent = ch;
      title.appendChild(span);
    });
  }

  function splitPending() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".section__head:not(.is-visible) .section__title"),
      split
    );
  }

  splitPending();

  // Language switches rewrite the heading text, so rebuild the letters that
  // have not animated in yet.
  Array.prototype.forEach.call(
    document.querySelectorAll(".lang__btn"),
    function (button) {
      button.addEventListener("click", function () {
        window.setTimeout(splitPending, 0);
      });
    }
  );

  var pending = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!pending.length) return;

  var ticking = false;

  var LINE = 0.85; // the horizontal guide line elements must cross

  function check() {
    ticking = false;
    var viewport = window.innerHeight || document.documentElement.clientHeight;

    pending = pending.filter(function (el) {
      var rect = el.getBoundingClientRect();
      var inView = rect.top < viewport * LINE && rect.bottom > 0;
      if (inView || rect.bottom <= 0) {
        el.classList.add("is-visible");
        return false;
      }
      return true;
    });

    if (!pending.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(check);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();
})();
