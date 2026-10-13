(() => {
  const examples = {
    beauty: {
      barber: { brand: 'Florindo · Barbearia', title: 'Agenda da equipe', metrics: ['8', '2', '6'], note: 'Agenda e recebimentos da equipe em uma mesma visão.', appointments: [['09:00', 'Corte masculino', 'Cliente 01 · Profissional A', true], ['10:00', 'Corte + barba', 'Cliente 02 · Profissional B', true], ['11:00', 'Barba', 'Cliente 03 · Profissional A', false]] },
      salon: { brand: 'Florindo · Salão de beleza', title: 'Agenda de profissionais', metrics: ['12', '3', '10'], note: 'Serviços, profissionais e comissões organizados para sua rotina.', appointments: [['09:00', 'Corte + escova', 'Cliente 01 · Profissional A', true], ['10:30', 'Coloração', 'Cliente 02 · Profissional B', true], ['11:00', 'Manicure', 'Cliente 03 · Profissional C', false]] }
    },
    health: {
      physio: { brand: 'Florindo · Fisioterapia', title: 'Agenda de atendimentos', metrics: ['6', '24', '5'], metricLabels: ['Atendimentos', 'Pacientes', 'Confirmados'], listTitle: 'Próximos atendimentos', note: 'Agenda, avaliações e evolução do paciente em uma mesma rotina.', appointments: [['08:00', 'Avaliação funcional', 'Paciente 01 · Fisioterapia', true], ['09:00', 'Sessão de fisioterapia', 'Paciente 02 · Acompanhamento', true], ['10:00', 'Reavaliação', 'Paciente 03 · Evolução', false]] },
      pilates: { brand: 'Florindo · Pilates', title: 'Agenda de aulas', metrics: ['4', '18', '3'], metricLabels: ['Turmas', 'Alunos', 'Confirmadas'], listTitle: 'Próximas aulas', note: 'Aulas, pacotes e controle de sessões em uma visão organizada.', appointments: [['07:00', 'Pilates · Turma A', 'Alunos 01 e 02 · Reformer', true], ['08:00', 'Pilates · Turma B', 'Alunos 03 e 04 · Aparelhos', true], ['09:00', 'Aula individual', 'Aluno 05 · Sessão do pacote', false]] },
      dental: { brand: 'Florindo · Odontologia', title: 'Agenda do consultório', metrics: ['7', '32', '6'], metricLabels: ['Consultas', 'Pacientes', 'Confirmadas'], listTitle: 'Próximas consultas', note: 'Agenda, etapas do atendimento e recebimentos com mais clareza.', appointments: [['08:30', 'Avaliação odontológica', 'Paciente 01 · Primeira consulta', true], ['09:30', 'Retorno', 'Paciente 02 · Acompanhamento', true], ['10:30', 'Consulta agendada', 'Paciente 03 · Consultório', false]] }
    }
  };
  document.querySelectorAll('[data-demo]').forEach(preview => {
    const tabs = Array.from(preview.querySelectorAll('[role="tab"]'));
    const panel = preview.querySelector('[role="tabpanel"]');
    const select = tab => {
      const item = examples[preview.dataset.demo][tab.dataset.demoOption];
      if (!item) return;
      tabs.forEach(other => {
        const active = other === tab;
        other.setAttribute('aria-selected', String(active));
        other.tabIndex = active ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      preview.querySelector('[data-demo-brand]').textContent = item.brand;
      preview.querySelector('[data-demo-title]').textContent = item.title;
      preview.querySelector('[data-demo-note]').textContent = item.note;
      item.metrics.forEach((value, index) => { preview.querySelector(`[data-metric="${index}"]`).textContent = value; });
      if (item.metricLabels) item.metricLabels.forEach((value, index) => { preview.querySelector(`[data-metric-label="${index}"]`).textContent = value; });
      if (item.listTitle) preview.querySelector('[data-demo-list-title]').textContent = item.listTitle;
      const list = preview.querySelector('[data-demo-appointments]');
      list.replaceChildren(...item.appointments.map(([time, title, subtitle, confirmed]) => {
        const row = document.createElement('div'); row.className = 'appointment';
        const clock = document.createElement('time'); clock.textContent = time;
        const content = document.createElement('div');
        const heading = document.createElement('strong'); heading.textContent = title;
        const description = document.createElement('span'); description.textContent = subtitle;
        content.append(heading, description);
        const status = document.createElement('span'); status.className = 'status ' + (confirmed ? 'confirmed' : 'pending'); status.textContent = confirmed ? 'Confirmado' : 'A confirmar';
        row.append(clock, content, status); return row;
      }));
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
  });
})();
