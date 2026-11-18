(function () {
  function track(name) {
    if (typeof window.clarity === 'function' && name) {
      window.clarity('event', name);
    }
  }

  // Expose a small, non-PII API for site scripts such as the chatbot.
  window.wizarchTrack = track;

  // Track only explicitly annotated interactions so event names stay stable
  // and we do not accidentally collect link text or user-entered content.
  document.addEventListener('click', function (event) {
    var target = event.target.closest('[data-track]');
    if (target) track(target.getAttribute('data-track'));
  });
})();
