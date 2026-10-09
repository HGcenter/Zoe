(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const language = document.querySelector('.language-switch');
  const languagePath = language.getAttribute('href');
  function syncLanguageLink() { language.setAttribute('href', languagePath + location.hash); }
  syncLanguageLink();
  window.addEventListener('hashchange', syncLanguageLink);
  const copy = document.querySelector('.copy-email');
  if (navigator.clipboard && window.isSecureContext) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const status = document.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText('zoe-zhou@outlook.com');
        status.textContent = copy.dataset.copied;
      } catch { status.textContent = copy.dataset.failed; }
    });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(link => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
