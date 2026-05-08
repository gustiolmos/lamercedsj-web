// Próximas celebraciones — calendario litúrgico parroquial
// Editar este array para agregar/quitar eventos. Las fechas pasadas se ocultan automáticamente.
// Formato fecha: YYYY-MM-DD (ISO).
(function () {
  const EVENTS = [
    { iso: '2026-05-24', title: 'Pentecostés',
      desc: 'Solemnidad de la venida del Espíritu Santo. Misas en los horarios habituales del domingo.' },
    { iso: '2026-06-07', title: 'Corpus Christi',
      desc: 'Solemnidad del Santísimo Cuerpo y Sangre de Cristo. Procesión al finalizar la misa de la tarde.' },
    { iso: '2026-08-15', title: 'Asunción de la Virgen María',
      desc: 'Solemnidad de la Asunción de Nuestra Señora a los cielos.' },
    { iso: '2026-09-24', title: 'Fiesta Patronal · Nuestra Señora de la Merced',
      desc: 'La gran fiesta de nuestra parroquia. Misa solemne, procesión y bendición a la comunidad.',
      featured: true },
    { iso: '2026-11-02', title: 'Conmemoración de los Fieles Difuntos',
      desc: 'Misa por los hermanos que nos precedieron en la fe.' },
    { iso: '2026-12-08', title: 'Inmaculada Concepción de María',
      desc: 'Solemnidad de la Inmaculada Concepción, patrona de la Argentina.' },
    { iso: '2026-12-24', title: 'Nochebuena · Misa de Navidad',
      desc: 'Celebramos la Natividad de Nuestro Señor Jesucristo.' }
  ];

  const grid = document.getElementById('events-grid');
  if (!grid) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const upcoming = EVENTS
    .map(e => ({ ...e, date: new Date(e.iso + 'T00:00:00') }))
    .filter(e => e.date >= today)
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  if (upcoming.length === 0) {
    grid.innerHTML = '<p class="events-empty">Próximamente se publicarán las celebraciones del nuevo año litúrgico.</p>';
    return;
  }

  const fmt = (d) => `${d.getDate()} de ${meses[d.getMonth()]}`;
  const days = (d) => Math.round((d - today) / 86400000);

  grid.innerHTML = upcoming.map(e => {
    const n = days(e.date);
    const chip = n === 0 ? '¡Hoy!' : n === 1 ? 'Mañana' : `Faltan ${n} días`;
    return `
      <article class="card event-card${e.featured ? ' event-featured' : ''}">
        <span class="card-date">${fmt(e.date)}</span>
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <span class="event-countdown">${chip}</span>
      </article>`;
  }).join('');
})();
