(() => {
  const DISCLAIMER = 'Tela ilustrativa. O layout, as cores, os módulos e as funcionalidades são adaptáveis de acordo com cada cliente.';

  const demos = {
    beauty: {
      barber: {
        title: 'Florindo · Barbearia', subtitle: 'Gestão completa da sua barbearia', photo: 'assets/barbershop-768.webp',
        theme: 'dark', accent: '#13c7d4', accent2: '#f2b83f',
        nav: ['Início', 'Agenda', 'Clientes', 'Serviços', 'Financeiro', 'Estoque', 'Equipe'],
        metrics: [['Agendamentos', '8', '+33%'], ['Clientes', '48', '+12%'], ['Faturamento', 'R$ 4.320', '+28%']],
        scheduleTitle: 'Próximos atendimentos',
        rows: [['09:00', 'Corte masculino', 'Cliente 01 · Prof. Lucas', 'Confirmado'], ['10:00', 'Corte + barba', 'Cliente 02 · Prof. Matheus', 'Confirmado'], ['11:00', 'Barba', 'Cliente 03 · Prof. Lucas', 'A confirmar'], ['13:30', 'Sobrancelha', 'Cliente 04 · Prof. Matheus', 'Confirmado']],
        chartTitle: 'Faturamento da semana', chart: [34, 45, 62, 53, 74, 95, 70],
        secondaryTitle: 'Serviços mais realizados', secondary: [['Corte masculino', 92], ['Corte + barba', 74], ['Barba', 58], ['Sobrancelha', 42]]
      },
      salon: {
        title: 'Florindo · Salão de beleza', subtitle: 'Gestão do seu espaço', photo: 'assets/beauty-salon-768.webp',
        theme: 'dark', accent: '#eaa0aa', accent2: '#f2b83f',
        nav: ['Início', 'Agenda', 'Clientes', 'Serviços', 'Caixa', 'Estoque', 'Equipe'],
        metrics: [['Agendamentos', '12', '+50%'], ['Clientes', '86', '+18%'], ['Faturamento', 'R$ 12.480', '+32%']],
        scheduleTitle: 'Próximos agendamentos',
        rows: [['09:00', 'Escova', 'Cliente 01 · Juliana', 'Confirmado'], ['10:30', 'Corte feminino', 'Cliente 02 · Aline', 'Confirmado'], ['13:00', 'Coloração', 'Cliente 03 · Beatriz', 'Em andamento'], ['14:30', 'Manicure', 'Cliente 04 · Camila', 'Confirmado']],
        chartTitle: 'Faturamento da semana', chart: [38, 47, 58, 50, 68, 92, 63],
        secondaryTitle: 'Serviços mais procurados', secondary: [['Escova', 94], ['Corte feminino', 78], ['Coloração', 62], ['Manicure', 51]]
      }
    },
    health: {
      physio: {
        title: 'Florindo · Fisioterapia', subtitle: 'Organização do seu atendimento', photo: 'assets/health-768.webp',
        theme: 'light', accent: '#13bdc6', accent2: '#19a8e5',
        nav: ['Início', 'Agenda', 'Pacientes', 'Avaliações', 'Sessões', 'Financeiro', 'Relatórios'],
        metrics: [['Atendimentos', '12', '+33%'], ['Pacientes', '64', '+18%'], ['Sessões do dia', '8', '+14%']],
        scheduleTitle: 'Próximos atendimentos',
        rows: [['08:00', 'Avaliação funcional', 'Paciente · Ana Silva', 'Confirmado'], ['09:00', 'Sessão de fisioterapia', 'Paciente · Carlos Lima', 'Confirmado'], ['10:00', 'Reavaliação', 'Paciente · Juliana Souza', 'A confirmar'], ['14:00', 'Liberação miofascial', 'Paciente · Patrícia Gomes', 'Confirmado']],
        chartTitle: 'Evolução dos pacientes', chart: [24, 38, 51, 48, 66, 72, 88],
        secondaryTitle: 'Tipos de atendimento', secondary: [['Fisioterapia', 88], ['Avaliações', 62], ['Reabilitação', 54], ['Liberação miofascial', 39]]
      },
      pilates: {
        title: 'Florindo · Pilates', subtitle: 'Aulas, turmas e pacotes', photo: 'assets/pilates-studio-768.webp',
        theme: 'light warm', accent: '#9c72d8', accent2: '#d79c65',
        nav: ['Início', 'Agenda', 'Alunas', 'Turmas', 'Planos', 'Financeiro', 'Relatórios'],
        metrics: [['Aulas de hoje', '5', '+25%'], ['Alunas', '48', '+12%'], ['Planos ativos', '37', '+11%']],
        scheduleTitle: 'Aulas de hoje',
        rows: [['08:00', 'Reformer individual', 'Aluna · Juliana Castro', 'Confirmada'], ['09:00', 'Pilates solo', 'Aluna · Camila Lima', 'Confirmada'], ['10:00', 'Reformer individual', 'Aluna · Patrícia Souza', 'A confirmar'], ['14:00', 'Aula experimental', 'Aluna · Renata Alves', 'Confirmada']],
        chartTitle: 'Ocupação da semana', chart: [52, 68, 58, 72, 86, 96, 74],
        secondaryTitle: 'Frequência das alunas', secondary: [['Presentes', 88], ['Reposições', 42], ['Faltas', 18], ['Experimentais', 31]]
      },
      dental: {
        title: 'Florindo · Odontologia', subtitle: 'Agenda e etapas do atendimento', photo: 'assets/dental-clinic-768.webp',
        theme: 'light', accent: '#299ff0', accent2: '#14c8ce',
        nav: ['Início', 'Consultas', 'Pacientes', 'Procedimentos', 'Prontuário', 'Financeiro', 'Relatórios'],
        metrics: [['Consultas', '12', '+33%'], ['Pacientes', '86', '+18%'], ['Procedimentos', '28', '+25%']],
        scheduleTitle: 'Próximas consultas',
        rows: [['08:00', 'Limpeza profissional', 'Carlos Mendes', 'Confirmado'], ['09:30', 'Avaliação', 'Juliana Santos', 'Confirmado'], ['11:00', 'Clareamento dental', 'Rafael Oliveira', 'A confirmar'], ['13:30', 'Restauração', 'Mariana Costa', 'Confirmado']],
        chartTitle: 'Faturamento da semana', chart: [40, 52, 64, 72, 81, 96, 73],
        secondaryTitle: 'Procedimentos mais realizados', secondary: [['Limpeza', 91], ['Restauração', 73], ['Clareamento', 55], ['Avaliação', 46]]
      }
    },
    commerce: {
      store: {
        title: 'Florindo · Comércio', subtitle: 'Clientes, vendas e organização', photo: 'assets/commerce-768.webp',
        theme: 'dark', accent: '#13c7d4', accent2: '#f2b83f',
        nav: ['Início', 'Vendas', 'Clientes', 'Estoque', 'Pedidos', 'Financeiro', 'Relatórios'],
        metrics: [['Vendas do dia', 'R$ 2.850', '+23%'], ['Clientes', '125', '+15%'], ['Pedidos', '32', '+28%']],
        scheduleTitle: 'Últimas vendas',
        rows: [['10:24', 'Tênis casual', 'Cliente · João Silva', 'Concluída'], ['09:47', 'Camiseta básica', 'Cliente · Mariana Costa', 'Concluída'], ['09:15', 'Calça jeans', 'Cliente · Pedro Almeida', 'Concluída'], ['08:32', 'Perfume masculino', 'Cliente · Ana Beatriz', 'Processando']],
        chartTitle: 'Recebimentos da semana', chart: [31, 45, 57, 52, 70, 93, 71],
        secondaryTitle: 'Produtos mais vendidos', secondary: [['Camiseta básica', 92], ['Tênis casual', 73], ['Calça jeans', 61], ['Boné premium', 44]]
      },
      services: {
        title: 'Florindo · Serviços', subtitle: 'Orçamentos, projetos e prazos', photo: 'assets/business-768.webp',
        theme: 'dark', accent: '#13c7d4', accent2: '#f2b83f',
        nav: ['Início', 'Agenda', 'Clientes', 'Orçamentos', 'Projetos', 'Equipe', 'Financeiro'],
        metrics: [['Orçamentos', '12', '+33%'], ['Clientes', '48', '+12%'], ['Projetos ativos', '16', '+23%']],
        scheduleTitle: 'Próximas atividades',
        rows: [['Hoje 09:00', 'Visita técnica', 'Cliente · Souza Construções', 'Confirmado'], ['Hoje 14:00', 'Apresentação de proposta', 'Cliente · Edifício Aurora', 'Em andamento'], ['Amanhã 10:00', 'Instalação · Fase 1', 'Cliente · Clínica Vida', 'A confirmar'], ['25/04', 'Entrega de projeto', 'Cliente · Residencial Parque', 'Pendente']],
        chartTitle: 'Recebimentos da semana', chart: [28, 42, 56, 52, 73, 94, 70],
        secondaryTitle: 'Status dos projetos', secondary: [['Concluídos', 72], ['Em andamento', 88], ['Planejamento', 48], ['Atrasados', 18]]
      }
    },
    education: {
      school: {
        title: 'Florindo · Educação', subtitle: 'Uma rotina escolar conectada', photo: 'assets/education-768.webp',
        theme: 'dark', accent: '#20c9d5', accent2: '#f2b83f',
        nav: ['Início', 'Turmas', 'Agenda', 'Frequência', 'Avaliações', 'Comunicados', 'Relatórios'],
        metrics: [['Turmas', '12', '+20%'], ['Alunos', '248', '+12%'], ['Frequência', '94%', '+6%']],
        scheduleTitle: 'Próximas aulas de hoje',
        rows: [['08:00', '6º ano · Turma A', 'Matemática · Prof. Ana Beatriz', 'Em andamento'], ['09:50', '7º ano · Turma B', 'Ciências · Prof. Carlos Lima', 'Em andamento'], ['11:10', '8º ano · Turma A', 'Geografia · Prof. Marina Alves', 'Em breve'], ['13:30', '9º ano · Turma B', 'Português · Prof. Rafael Mendes', 'Agendado']],
        chartTitle: 'Frequência da semana', chart: [72, 81, 86, 91, 96, 93, 78],
        secondaryTitle: 'Desempenho por disciplina', secondary: [['Matemática', 91], ['Português', 84], ['Ciências', 87], ['Geografia', 86]]
      }
    }
  };

  const css = `
    .system-art{--art-bg:#071f30;--art-panel:#0b2b3f;--art-text:#f7fbff;--art-muted:#9fb4c2;--art-line:rgba(255,255,255,.1);position:relative;overflow:hidden;border-radius:22px;background:var(--art-bg);color:var(--art-text);box-shadow:0 18px 48px rgba(6,39,58,.16);font-family:inherit;text-align:left}
    .system-art.light{--art-bg:#f7fbfd;--art-panel:#fff;--art-text:#0b2b40;--art-muted:#6f818d;--art-line:rgba(7,43,64,.1);box-shadow:0 18px 48px rgba(6,39,58,.12)}
    .system-art.warm{--art-bg:#fdfbf9;--art-panel:#fff;--art-text:#192d44;--art-muted:#7f7a7b;--art-line:rgba(25,45,68,.1)}
    .system-art__hero{position:relative;min-height:168px;background:#0a2d43 center/cover no-repeat;display:flex;align-items:flex-end;padding:22px;isolation:isolate}
    .system-art__hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,27,42,.94) 0%,rgba(3,27,42,.78) 44%,rgba(3,27,42,.15) 100%);z-index:-1}
    .system-art.light .system-art__hero:before,.system-art.warm .system-art__hero:before{background:linear-gradient(90deg,rgba(255,255,255,.96) 0%,rgba(255,255,255,.82) 46%,rgba(255,255,255,.08) 100%)}
    .system-art__brand{display:flex;align-items:center;gap:10px;max-width:72%}.system-art__brand img{width:46px;height:46px;object-fit:contain;background:#fff;border-radius:12px;padding:5px}.system-art__brand strong{display:block;font-size:1.22rem;line-height:1.05}.system-art__brand span{display:block;margin-top:4px;font-size:.78rem;color:var(--art-muted)}
    .system-art__body{display:grid;grid-template-columns:118px 1fr;min-height:520px}.system-art__nav{padding:18px 12px;border-right:1px solid var(--art-line);display:flex;flex-direction:column;gap:7px}.system-art__nav span{padding:9px 10px;border-radius:10px;font-size:.76rem;color:var(--art-muted)}.system-art__nav span:first-child{background:color-mix(in srgb,var(--accent) 22%,transparent);color:var(--art-text);font-weight:800;border-left:3px solid var(--accent)}
    .system-art.light .system-art__nav span:first-child,.system-art.warm .system-art__nav span:first-child{color:#0b2b40}
    .system-art__main{padding:18px}.system-art__metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}.system-art__metric{background:var(--art-panel);border:1px solid var(--art-line);border-radius:14px;padding:12px;min-width:0}.system-art__metric span{display:block;font-size:.7rem;color:var(--art-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.system-art__metric strong{display:block;font-size:1.15rem;margin:5px 0 3px}.system-art__metric small{color:#19ca8b;font-weight:800;font-size:.65rem}
    .system-art__grid{display:grid;grid-template-columns:1.35fr .8fr;gap:12px}.system-art__panel{background:var(--art-panel);border:1px solid var(--art-line);border-radius:14px;padding:13px;min-width:0}.system-art__panel h4{margin:0 0 11px;font-size:.83rem}.system-art__row{display:grid;grid-template-columns:54px 1fr auto;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--art-line)}.system-art__row:first-of-type{border-top:0}.system-art__row time{font-size:.72rem;font-weight:800}.system-art__row strong{display:block;font-size:.72rem}.system-art__row em{display:block;font-style:normal;font-size:.62rem;color:var(--art-muted);margin-top:2px}.system-art__status{font-size:.58rem;padding:5px 7px;border-radius:999px;background:rgba(22,190,128,.16);color:#20c98b;white-space:nowrap;font-weight:800}.system-art__status.pending{background:rgba(242,184,63,.16);color:#d99b16}
    .system-art__bars{display:flex;align-items:flex-end;gap:7px;height:105px;padding-top:10px}.system-art__bars i{flex:1;min-width:6px;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,var(--accent),color-mix(in srgb,var(--accent) 58%,#0b2b40));opacity:.95}.system-art__week{display:flex;justify-content:space-between;font-size:.56rem;color:var(--art-muted);margin-top:6px}
    .system-art__secondary{margin-top:12px}.system-art__progress{display:grid;grid-template-columns:1fr 34px;gap:8px;align-items:center;margin:9px 0}.system-art__progress span{font-size:.65rem}.system-art__progress b{font-size:.62rem;text-align:right}.system-art__track{grid-column:1 / -1;height:6px;border-radius:99px;background:var(--art-line);overflow:hidden;margin-top:-3px}.system-art__track i{display:block;height:100%;background:var(--accent);border-radius:99px}
    .system-art-note{display:flex;gap:9px;align-items:flex-start;margin:12px 4px 0;padding:11px 13px;border-radius:12px;background:rgba(17,160,171,.08);color:#56717e;font-size:.75rem;line-height:1.45}.system-art-note:before{content:"i";display:grid;place-items:center;flex:0 0 18px;height:18px;border-radius:50%;background:#0fa9b5;color:#fff;font-size:.7rem;font-weight:900}
    .commerce-preview .preview-tabs{display:flex}.school-example .system-art{margin-top:0}.school-example-body.system-art-holder{display:block;padding:18px;background:#f5fafb}
    @media (max-width:620px){.system-art__hero{min-height:128px;padding:15px}.system-art__brand{max-width:86%}.system-art__brand img{width:38px;height:38px}.system-art__brand strong{font-size:1rem}.system-art__body{grid-template-columns:1fr;min-height:0}.system-art__nav{flex-direction:row;overflow:auto;border-right:0;border-bottom:1px solid var(--art-line);padding:9px}.system-art__nav span{flex:0 0 auto;padding:7px 9px;font-size:.67rem}.system-art__main{padding:11px}.system-art__metrics{gap:6px}.system-art__metric{padding:9px 7px}.system-art__metric span{font-size:.58rem}.system-art__metric strong{font-size:.86rem}.system-art__metric small{font-size:.55rem}.system-art__grid{grid-template-columns:1fr}.system-art__row{grid-template-columns:48px 1fr auto}.system-art__row strong{font-size:.68rem}.system-art__status{font-size:.52rem;padding:4px 6px}.system-art__bars{height:80px}.system-art-note{font-size:.68rem}.school-example-body.system-art-holder{padding:10px}}
  `;

  function installStyles() {
    if (document.getElementById('florindo-system-art-styles')) return;
    const style = document.createElement('style');
    style.id = 'florindo-system-art-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function statusClass(text) {
    return /confirm|conclu|andamento/i.test(text) ? '' : ' pending';
  }

  function renderArt(config) {
    const art = document.createElement('div');
    art.className = `system-art ${config.theme || ''}`;
    art.style.setProperty('--accent', config.accent);
    art.style.setProperty('--accent2', config.accent2);

    const rows = config.rows.map(([time, title, sub, status]) => `
      <div class="system-art__row"><time>${time}</time><div><strong>${title}</strong><em>${sub}</em></div><span class="system-art__status${statusClass(status)}">${status}</span></div>`).join('');
    const bars = config.chart.map(value => `<i style="height:${value}%"></i>`).join('');
    const progress = config.secondary.map(([label, value]) => `<div class="system-art__progress"><span>${label}</span><b>${value}%</b><div class="system-art__track"><i style="width:${value}%"></i></div></div>`).join('');
    const metrics = config.metrics.map(([label, value, delta]) => `<div class="system-art__metric"><span>${label}</span><strong>${value}</strong><small>↑ ${delta}</small></div>`).join('');
    const nav = config.nav.map(item => `<span>${item}</span>`).join('');

    art.innerHTML = `
      <div class="system-art__hero" style="background-image:url('${config.photo}')">
        <div class="system-art__brand"><img src="assets/logo-florindo.svg" alt=""><div><strong>${config.title}</strong><span>${config.subtitle}</span></div></div>
      </div>
      <div class="system-art__body">
        <div class="system-art__nav">${nav}</div>
        <div class="system-art__main">
          <div class="system-art__metrics">${metrics}</div>
          <div class="system-art__grid">
            <section class="system-art__panel"><h4>${config.scheduleTitle}</h4>${rows}</section>
            <div>
              <section class="system-art__panel"><h4>${config.chartTitle}</h4><div class="system-art__bars">${bars}</div><div class="system-art__week"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div></section>
              <section class="system-art__panel system-art__secondary"><h4>${config.secondaryTitle}</h4>${progress}</section>
            </div>
          </div>
        </div>
      </div>`;
    return art;
  }

  function addDisclaimer(holder) {
    const note = document.createElement('p');
    note.className = 'system-art-note';
    note.textContent = DISCLAIMER;
    holder.appendChild(note);
  }

  function wireTabbedPreview(preview, group) {
    if (!preview || !demos[group]) return;
    const tabs = Array.from(preview.querySelectorAll('[data-demo-option]'));
    const panel = preview.querySelector('[role="tabpanel"]') || preview.querySelector('.preview-panel');
    if (!panel || !tabs.length) return;

    const select = tab => {
      const config = demos[group][tab.dataset.demoOption];
      if (!config) return;
      tabs.forEach(other => {
        const active = other === tab;
        other.setAttribute('aria-selected', String(active));
        other.tabIndex = active ? 0 : -1;
      });
      if (tab.id) panel.setAttribute('aria-labelledby', tab.id);
      panel.replaceChildren(renderArt(config));
      addDisclaimer(panel);
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); select(tabs[next]); tabs[next].focus(); }
      });
    });
    select(tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
  }

  function buildCommercePreview() {
    const preview = document.querySelector('.commerce-preview');
    if (!preview) return;
    const oldPanel = preview.querySelector('.preview-panel');
    if (!oldPanel) return;

    const tabs = document.createElement('div');
    tabs.className = 'preview-tabs';
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Exemplos para comércio e serviços');
    tabs.innerHTML = '<button id="commerce-tab-store" role="tab" aria-selected="true" aria-controls="commerce-demo-panel" tabindex="0" data-demo-option="store">Comércio</button><button id="commerce-tab-services" role="tab" aria-selected="false" aria-controls="commerce-demo-panel" tabindex="-1" data-demo-option="services">Serviços</button>';
    oldPanel.id = 'commerce-demo-panel';
    oldPanel.setAttribute('role', 'tabpanel');
    oldPanel.setAttribute('aria-labelledby', 'commerce-tab-store');
    preview.insertBefore(tabs, oldPanel);
    preview.dataset.demo = 'commerce';
    wireTabbedPreview(preview, 'commerce');
  }

  function buildEducationPreview() {
    const example = document.querySelector('.school-example');
    if (!example) return;
    const body = example.querySelector('.school-example-body');
    if (!body) return;
    body.className = 'school-example-body system-art-holder';
    body.replaceChildren(renderArt(demos.education.school));
    addDisclaimer(body);
  }

  installStyles();
  wireTabbedPreview(document.querySelector('[data-demo="beauty"]'), 'beauty');
  wireTabbedPreview(document.querySelector('[data-demo="health"]'), 'health');
  buildCommercePreview();
  buildEducationPreview();
})();
