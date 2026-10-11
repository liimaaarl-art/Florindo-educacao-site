(() => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const slides = [...document.querySelectorAll('.hero-slide')];
  const dots = [...document.querySelectorAll('.hero-dot')];
  const hero = document.querySelector('.hero-slider');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer;
  let pointerStart = null;

  const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 20);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
  };
  menuToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  const showSlide = (index, userInitiated = false) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (userInitiated) restartAutoplay();
  };

  const stopAutoplay = () => { if (timer) clearInterval(timer); };
  const startAutoplay = () => {
    stopAutoplay();
    if (!prefersReducedMotion && slides.length > 1) timer = setInterval(() => showSlide(current + 1), 6500);
  };
  const restartAutoplay = () => { stopAutoplay(); startAutoplay(); };

  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.target), true)));
  hero.addEventListener('mouseenter', stopAutoplay);
  hero.addEventListener('mouseleave', startAutoplay);
  hero.addEventListener('focusin', stopAutoplay);
  hero.addEventListener('focusout', startAutoplay);

  hero.addEventListener('pointerdown', e => { pointerStart = e.clientX; });
  hero.addEventListener('pointerup', e => {
    if (pointerStart === null) return;
    const delta = e.clientX - pointerStart;
    pointerStart = null;
    if (Math.abs(delta) > 45) showSlide(current + (delta < 0 ? 1 : -1), true);
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showSlide(current + 1, true);
    if (e.key === 'ArrowLeft') showSlide(current - 1, true);
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());
  startAutoplay();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .13, rootMargin: '0px 0px -40px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();