(() => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });

  const highlights = {
    business: {
      label: 'SISTEMAS, APLICATIVOS E AUTOMAÇÕES.',
      title: 'Tecnologia para<br>quem <span>faz acontecer.</span>',
      description: 'A Florindo Sistemas cria tecnologia sob medida para organizar sua rotina, aproximar pessoas e acompanhar o crescimento do seu negócio.',
      cta: 'Encontre sua solução', href: '#contato',
      alt: 'Profissionais trabalhando juntos com um notebook em um escritório.',
      caption: 'Pessoas no centro. Tecnologia a favor.'
    },
    education: {
      label: 'NOSSA PRINCIPAL ESPECIALIDADE',
      title: 'Mais conexão.<br>Mais tempo para <span>educar.</span>',
      description: 'Gestão escolar, rotina pedagógica e comunicação em soluções pensadas para quem faz a educação acontecer todos os dias.',
      cta: 'Conheça Florindo Educação', href: '#educacao',
      alt: 'Professora registrando a chamada no tablet em uma sala de aula.',
      caption: 'Tecnologia próxima da rotina escolar.'
    },
    health: {
      label: 'SOLUÇÕES PARA SAÚDE',
      title: 'Organização para<br>quem <span>cuida de pessoas.</span>',
      description: 'Agenda, atendimentos, avaliações e relatórios. Uma rotina mais organizada para o profissional se dedicar ao que faz melhor.',
      cta: 'Conheça os exemplos para saúde', href: '#saude',
      alt: 'Fisioterapeuta usando um notebook em uma clínica.',
      caption: 'Mais clareza no acompanhamento e na gestão.'
    }
  };
  const image = document.getElementById('heroImage');
  const buttons = document.querySelectorAll('[data-hero]');
  buttons.forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.hero;
    const item = highlights[name];
    document.getElementById('heroLabel').textContent = item.label;
    document.getElementById('heroTitle').innerHTML = item.title;
    document.getElementById('heroDescription').textContent = item.description;
    const cta = document.getElementById('heroCta');
    cta.firstChild.textContent = item.cta + ' ';
    cta.setAttribute('href', item.href);
    const photoName = name === 'education' ? 'education-classroom' : name;
    image.srcset = `assets/${photoName}-768.webp 768w, assets/${photoName}-1536.webp 1536w`;
    image.src = `assets/${photoName}-1536.webp`;
    image.alt = item.alt;
    document.getElementById('heroImageLabel').textContent = item.caption;
    buttons.forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
  }));
  document.getElementById('year').textContent = new Date().getFullYear();
})();


