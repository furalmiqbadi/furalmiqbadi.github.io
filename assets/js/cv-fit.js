// Keeps the CV sheet at true A4 width and scales it down to fit narrow screens.
(function () {
  var A4_WIDTH = 793.7; // 210mm expressed in CSS pixels
  var sheet = document.querySelector('.sheet');
  if (!sheet) return;

  // Fits the sheet to the viewport width without changing its internal layout.
  function fit() {
    var available = document.documentElement.clientWidth - 24;
    var zoom = Math.min(1, available / A4_WIDTH);
    sheet.style.setProperty('--cv-zoom', zoom.toFixed(3));
  }

  fit();
  window.addEventListener('resize', fit);
})();
