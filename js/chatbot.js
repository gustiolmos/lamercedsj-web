// =====================================================================
// Asistente parroquial — chatbot estilo FAQ con búsqueda por palabras clave.
//
// CÓMO AGREGAR / EDITAR RESPUESTAS:
//   Modificá el array FAQ de abajo. Cada entrada tiene:
//     - id        : identificador único
//     - title     : texto del botón rápido (con emoji opcional)
//     - keywords  : palabras clave (sin acentos, en minúsculas) para matchear
//                   cuando el usuario escribe libre. Una sola coincidencia ya
//                   activa esta respuesta.
//     - response  : texto/HTML de la respuesta del bot (admite <a>, <ul>, etc.)
//     - related   : ids de otras entradas a sugerir como botones después.
// =====================================================================

(function () {
  'use strict';

  const FAQ = [
    {
      id: 'horarios',
      title: '🕐 Horarios de misa',
      keywords: ['horario', 'horarios', 'misa', 'misas', 'hora', 'horas', 'cuando', 'domingo', 'sabado', 'semana', 'manana', 'tarde', 'noche', 'celebracion', 'celebraciones'],
      response: '<p>Nuestros horarios habituales de misa son:</p><ul><li><strong>Domingo:</strong> 10:00 y 20:00 hs</li><li><strong>Martes a Sábado:</strong> 20:00 hs</li></ul><p>En fiestas y solemnidades puede haber celebraciones adicionales — consultá la sección <a href="anuncios.html">Anuncios</a> o nuestras redes.</p>',
      related: ['confesiones', 'patrona', 'secretaria']
    },
    {
      id: 'confesiones',
      title: '☩ Confesiones',
      keywords: ['confesion', 'confesiones', 'confesarse', 'reconciliacion', 'perdon', 'pecado', 'pecados'],
      response: '<p>Para el sacramento de la Reconciliación podés acercarte <strong>antes o después de las misas</strong> y solicitar al sacerdote.</p><p>Para horarios fijos o un encuentro pautado, comunicate con la <a href="horarios.html">secretaría parroquial</a> (martes a sábado de 09:00 a 12:00 hs).</p>',
      related: ['horarios', 'secretaria']
    },
    {
      id: 'bautismo',
      title: '✦ Bautismo',
      keywords: ['bautismo', 'bautizar', 'bautizo', 'bebe', 'hijo', 'hija', 'padrino', 'padrinos', 'madrina', 'pila', 'cristiano'],
      response: '<p>Para celebrar el sacramento del Bautismo:</p><ul><li>Solicitá fecha en la <strong>secretaría parroquial</strong> (martes a sábado de 09:00 a 12:00 hs).</li><li>Es <strong>obligatoria</strong> la preparación previa para padres y padrinos.</li><li><strong>Documentación:</strong> partida de nacimiento del niño y constancias de bautismo y confirmación de los padrinos.</li></ul>',
      related: ['secretaria', 'comunion', 'contacto']
    },
    {
      id: 'comunion',
      title: '🍞 Primera Comunión',
      keywords: ['comunion', 'comuniones', 'primera', 'eucaristia', 'catequesis', 'niño', 'niña', 'niños', 'niñas', 'chicos', 'chicas', 'iniciacion'],
      response: '<p>La <strong>catequesis de iniciación</strong> y preparación para la Primera Comunión se desarrolla durante el ciclo escolar.</p><p>Para inscribir a tu hijo/a, acercate a la <strong>secretaría parroquial</strong> al inicio del año (martes a sábado de 09:00 a 12:00 hs).</p><p><strong>Requisitos:</strong> partida de bautismo y compromiso de asistencia a los encuentros.</p>',
      related: ['confirmacion', 'bautismo', 'secretaria']
    },
    {
      id: 'confirmacion',
      title: '🕊 Confirmación',
      keywords: ['confirmacion', 'confirmaciones', 'confirmar', 'espiritu', 'santo', 'crisma', 'jovenes', 'adolescentes'],
      response: '<p>La preparación para la <strong>Confirmación</strong> está dirigida a jóvenes y adultos.</p><p>Las inscripciones se reciben en la <strong>secretaría parroquial</strong> (martes a sábado de 09:00 a 12:00 hs).</p><p><strong>Requisitos:</strong> partidas de bautismo y comunión.</p>',
      related: ['comunion', 'matrimonio', 'secretaria']
    },
    {
      id: 'matrimonio',
      title: '💍 Casamiento',
      keywords: ['casarse', 'casamiento', 'boda', 'matrimonio', 'novios', 'novia', 'novio', 'prematrimonial', 'union'],
      response: '<p>Para celebrar el sacramento del Matrimonio:</p><ul><li>Solicitá turno con la <strong>mayor anticipación posible</strong> en la secretaría parroquial.</li><li>Es <strong>obligatorio</strong> realizar el curso prematrimonial.</li><li><strong>Documentación:</strong> partidas de bautismo y confirmación de los novios, DNI y constancia de matrimonio civil.</li></ul>',
      related: ['secretaria', 'contacto']
    },
    {
      id: 'uncion',
      title: '🙏 Unción de los enfermos',
      keywords: ['uncion', 'enfermo', 'enfermos', 'enferma', 'hospital', 'internado', 'internada', 'agonia', 'urgencia', 'urgente', 'extremauncion', 'sacramento de los enfermos'],
      response: '<p>La <strong>Unción de los enfermos</strong> está disponible en todo momento.</p><p>Si necesitás que el sacerdote visite a un enfermo en su casa o en el hospital, llamá al teléfono parroquial: <a href="tel:+543498427515"><strong>+54 3498 42-7515</strong></a>.</p><p>Para urgencias podés llamar en cualquier momento del día.</p>',
      related: ['contacto', 'exequias']
    },
    {
      id: 'exequias',
      title: '🕯 Funeral / Exequias',
      keywords: ['funeral', 'exequias', 'difunto', 'difuntos', 'fallecio', 'fallecido', 'fallecida', 'velatorio', 'sepelio', 'velorio', 'muerte', 'muerto'],
      response: '<p>Las celebraciones exequiales se coordinan a través de la <strong>secretaría parroquial</strong> o llamando al teléfono parroquial: <a href="tel:+543498427515">+54 3498 42-7515</a>.</p><p>Acompañamos a las familias en este momento doloroso con la oración y la celebración cristiana de la despedida.</p>',
      related: ['uncion', 'oracion', 'contacto']
    },
    {
      id: 'direccion',
      title: '📍 Cómo llegar',
      keywords: ['donde', 'queda', 'esta', 'direccion', 'ubicacion', 'ubicada', 'calle', 'mapa', 'llegar', 'iglesia', 'parroquia', 'templo'],
      response: '<p>Estamos en <strong>Independencia 2565</strong>, San Justo (S3040), provincia de Santa Fe.</p><p>El templo cuenta con <strong>entrada accesible para sillas de ruedas</strong> y fácil estacionamiento en los alrededores.</p><p>En la página de <a href="contacto.html">Contacto</a> tenés el mapa interactivo para llegar.</p>',
      related: ['contacto', 'horarios']
    },
    {
      id: 'contacto',
      title: '☏ Teléfono y contacto',
      keywords: ['telefono', 'contacto', 'contactar', 'llamar', 'comunicarme', 'hablar', 'numero', 'whatsapp', 'mail', 'email'],
      response: '<p><strong>Teléfono parroquial:</strong> <a href="tel:+543498427515">+54 3498 42-7515</a></p><p><strong>Dirección:</strong> Independencia 2565, San Justo, Santa Fe.</p><p>También nos encontrás en <a href="https://www.facebook.com/lamercedsj/" target="_blank" rel="noopener">Facebook</a> e <a href="https://www.instagram.com/lamercedsj/" target="_blank" rel="noopener">Instagram</a> como <strong>@lamercedsj</strong>.</p>',
      related: ['secretaria', 'direccion', 'redes']
    },
    {
      id: 'secretaria',
      title: '✦ Secretaría parroquial',
      keywords: ['secretaria', 'oficina', 'atencion', 'atender', 'atienden', 'partida', 'partidas', 'certificado', 'certificados', 'tramite', 'tramites'],
      response: '<p>La <strong>secretaría parroquial</strong> atiende de <strong>martes a sábado, de 09:00 a 12:00 hs</strong>.</p><p>Allí podés realizar inscripciones a sacramentos, solicitar partidas y certificados, o hacer cualquier consulta pastoral.</p>',
      related: ['contacto', 'bautismo', 'comunion']
    },
    {
      id: 'patrona',
      title: '👑 Nuestra Patrona',
      keywords: ['patrona', 'virgen', 'merced', 'mercedaria', 'mercedario', 'fiesta', 'patronal', 'maria'],
      response: '<p>Nuestra patrona es <strong>Nuestra Señora de la Merced</strong>, redentora de cautivos y protectora de quienes sufren.</p><p>Su <strong>fiesta litúrgica se celebra el 24 de septiembre</strong>, día en que nuestra parroquia se viste de gala.</p><p>Conocé más en la página <a href="nosotros.html">Nosotros</a>.</p>',
      related: ['historia', 'horarios']
    },
    {
      id: 'historia',
      title: '⛪ Historia del templo',
      keywords: ['historia', 'antigua', 'antiguedad', 'fundacion', 'fundo', 'arquitecto', 'construccion', 'construyo', 'inauguro', 'duarte', '1957', 'edificio'],
      response: '<p>Nuestro templo fue <strong>inaugurado en 1957</strong>, según el diseño del arquitecto <strong>Carlos Duarte</strong>.</p><p>Se caracteriza por una arquitectura moderna y funcional de mediados del siglo XX, con una amplia nave central y dos naves laterales.</p><p>Más detalles en la página <a href="nosotros.html">Nosotros</a>.</p>',
      related: ['patrona', 'direccion']
    },
    {
      id: 'caritas',
      title: '❤ Cáritas / colaborar',
      keywords: ['caritas', 'ayuda', 'ayudar', 'donar', 'donacion', 'donaciones', 'alimentos', 'colaborar', 'colaboracion', 'ofrenda', 'aporte'],
      response: '<p><strong>Cáritas parroquial</strong> recibe donaciones de alimentos no perecederos para asistir a familias del barrio.</p><p>Podés acercar tu aporte a la <strong>sacristía</strong> después de cada misa. Especialmente necesitamos: leche en polvo, fideos, arroz, azúcar, yerba y conservas.</p><p>Para sumarte como voluntario/a, consultá en la secretaría.</p>',
      related: ['secretaria', 'oracion']
    },
    {
      id: 'oracion',
      title: '🕯 Pedir oración',
      keywords: ['pedir', 'intencion', 'intenciones', 'oracion', 'rezar', 'rezo', 'rogar', 'rogativa', 'misa por', 'difunto'],
      response: '<p>Si querés <strong>pedir una oración</strong> o que se ofrezca una misa por una intención particular (un enfermo, un difunto, una acción de gracias), acercate a la <strong>secretaría parroquial</strong> o al sacerdote después de misa.</p><p>También podés sumarte al rezo del Santo Rosario y a los grupos de oración de la comunidad.</p>',
      related: ['secretaria', 'uncion', 'exequias']
    },
    {
      id: 'redes',
      title: '📱 Redes sociales',
      keywords: ['facebook', 'instagram', 'redes', 'social', 'sociales', 'fb', 'ig', 'seguir'],
      response: '<p>Seguinos en nuestras redes para enterarte de todas las novedades:</p><ul><li><a href="https://www.facebook.com/lamercedsj/" target="_blank" rel="noopener"><strong>Facebook:</strong> facebook.com/lamercedsj</a></li><li><a href="https://www.instagram.com/lamercedsj/" target="_blank" rel="noopener"><strong>Instagram:</strong> @lamercedsj</a></li></ul>',
      related: ['contacto', 'horarios']
    }
  ];

  // Botones rápidos del mensaje de bienvenida (los más consultados).
  const WELCOME_QUICK = ['horarios', 'bautismo', 'matrimonio', 'direccion', 'contacto', 'oracion'];

  // Mensaje cuando no se encuentra coincidencia.
  function fallbackResponse() {
    return '<p>No tengo una respuesta específica para esa consulta. Te dejo algunas opciones que sí puedo ayudarte, o podés llamar directamente al <a href="tel:+543498427515"><strong>+54 3498 42-7515</strong></a> en horario de secretaría.</p>';
  }

  // Quitar acentos, signos y normalizar a minúsculas para el matching.
  function normalize(text) {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[¿?¡!.,;:()"']/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Devuelve la entrada del FAQ con más coincidencias de keywords (o null).
  function findBestMatch(userText) {
    const text = normalize(userText);
    if (!text) return null;

    let best = null;
    let bestScore = 0;

    FAQ.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        const k = normalize(kw);
        if (text.includes(k)) {
          score += k.split(' ').length;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });

    return bestScore > 0 ? best : null;
  }

  function getEntry(id) {
    return FAQ.find((e) => e.id === id);
  }

  // ---------- UI ----------

  let panel, body, quickArea, input, toggleBtn;
  let isOpen = false;

  function init() {
    toggleBtn = document.querySelector('.chat-toggle');
    panel = document.querySelector('.chat-panel');
    if (!toggleBtn || !panel) return;

    body = panel.querySelector('.chat-body');
    quickArea = panel.querySelector('.chat-quick');
    input = panel.querySelector('.chat-input input');
    const form = panel.querySelector('.chat-input');
    const closeBtn = panel.querySelector('.chat-close');

    toggleBtn.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);
    form.addEventListener('submit', handleSubmit);

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });
  }

  function openChat() {
    if (isOpen) return;
    isOpen = true;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('hidden');
    if (!body.hasChildNodes()) {
      showWelcome();
    }
    setTimeout(() => input && input.focus(), 250);
  }

  function closeChat() {
    isOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('hidden');
  }

  function showWelcome() {
    addBotMessage('<p>¡Hola! Soy el asistente de la <strong>Parroquia Nuestra Señora de la Merced</strong>. Te ayudo con consultas frecuentes — elegí un tema o escribime tu pregunta.</p>');
    setQuickButtons(WELCOME_QUICK);
  }

  function addBotMessage(html) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-bot';
    msg.innerHTML = html;
    body.appendChild(msg);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg-user';
    msg.textContent = text;
    body.appendChild(msg);
    scrollToBottom();
  }

  function setQuickButtons(ids) {
    quickArea.innerHTML = '';
    ids.forEach((id) => {
      const entry = getEntry(id);
      if (!entry) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-quick-btn';
      btn.textContent = entry.title;
      btn.addEventListener('click', () => handleQuickClick(entry));
      quickArea.appendChild(btn);
    });
  }

  function handleQuickClick(entry) {
    addUserMessage(entry.title);
    setTimeout(() => {
      addBotMessage(entry.response);
      setQuickButtons(entry.related || WELCOME_QUICK.slice(0, 4));
    }, 250);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addUserMessage(text);
    input.value = '';

    setTimeout(() => {
      const match = findBestMatch(text);
      if (match) {
        addBotMessage(match.response);
        setQuickButtons(match.related || WELCOME_QUICK.slice(0, 4));
      } else {
        addBotMessage(fallbackResponse());
        setQuickButtons(WELCOME_QUICK);
      }
    }, 350);
  }

  function scrollToBottom() {
    setTimeout(() => { body.scrollTop = body.scrollHeight; }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
