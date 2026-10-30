/* ============================================================================
   MARCA RUBÉN PONCE · Modo claro / oscuro
   v2.0 · 2026-10-29
   ----------------------------------------------------------------------------
   Se carga en el <head>, ANTES de las hojas de estilo, para que la página
   pinte directamente en el tema correcto (sin parpadeo):
     <script src="../../assets/marca/tema.js"></script>

   - Pone data-theme="light" | "dark" en <html>.
   - Primera visita: sigue la preferencia del sistema operativo.
   - Al pulsar el botón, la elección se recuerda en este navegador.
   - El botón se coloca en cada elemento con el atributo data-rp-tema; si la
     página no tiene ninguno, aparece flotando en la esquina inferior izquierda.
   ============================================================================ */
(function () {
  var CLAVE = 'rp-tema';
  var raiz = document.documentElement;
  var botones = [];
  var sistema = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function guardado() {
    try { var v = localStorage.getItem(CLAVE); return v === 'dark' || v === 'light' ? v : null; }
    catch (e) { return null; }
  }
  function inicial() {
    return guardado() || (sistema && sistema.matches ? 'dark' : 'light');
  }

  var ICONO_LUNA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg>';
  var ICONO_SOL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';

  function aplicar(tema) {
    raiz.setAttribute('data-theme', tema);
    raiz.style.colorScheme = tema;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema === 'dark' ? '#0B1220' : '#1567B0');
    botones.forEach(function (b) {
      var oscuro = tema === 'dark';
      b.innerHTML = oscuro ? ICONO_SOL : ICONO_LUNA;
      b.setAttribute('aria-pressed', String(oscuro));
      b.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      b.title = oscuro ? 'Modo claro' : 'Modo oscuro';
    });
  }

  aplicar(inicial());

  if (sistema && sistema.addEventListener) {
    sistema.addEventListener('change', function (e) {
      if (!guardado()) aplicar(e.matches ? 'dark' : 'light');
    });
  }

  function crearBoton(flotante) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'rp-tema-btn' + (flotante ? ' rp-tema-flotante' : '');
    b.addEventListener('click', function () {
      var nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(CLAVE, nuevo); } catch (e) {}
      aplicar(nuevo);
    });
    botones.push(b);
    return b;
  }

  function montar() {
    var css = document.createElement('style');
    css.textContent =
      '.rp-tema-btn{display:inline-flex;align-items:center;justify-content:center;flex:none;width:40px;height:40px;padding:0;' +
      'border-radius:999px;border:1px solid var(--rp-borde,#DFE6F0);background:transparent;color:var(--rp-texto-2,#5C6B85);' +
      'cursor:pointer;transition:color .2s,border-color .2s,background .2s;}' +
      '.rp-tema-btn:hover{color:var(--rp-enlace,#1567B0);border-color:var(--rp-enlace,#1567B0);}' +
      '.rp-tema-btn:focus-visible{outline:2px solid var(--rp-enlace,#1567B0);outline-offset:3px;}' +
      '.rp-tema-btn svg{display:block;}' +
      '.rp-tema-flotante{position:fixed;left:16px;bottom:16px;z-index:200;background:var(--rp-superficie,#FFFFFF);' +
      'box-shadow:0 4px 16px rgba(15,27,45,.12);}' +
      '[data-theme="dark"] .rp-tema-flotante{background:#121C2E;color:#C9D2E0;border-color:#24324A;box-shadow:0 4px 16px rgba(0,0,0,.4);}' +
      '.rp-tema-claro .rp-tema-btn,.rp-tema-btn.rp-tema-claro{color:#FFFFFF;border-color:rgba(255,255,255,.35);}' +
      '.rp-tema-claro .rp-tema-btn:hover,.rp-tema-btn.rp-tema-claro:hover{color:#FFFFFF;border-color:#FFFFFF;background:rgba(255,255,255,.12);}' +
      '@media print{.rp-tema-btn{display:none!important;}}';
    document.head.appendChild(css);

    var huecos = document.querySelectorAll('[data-rp-tema]');
    if (huecos.length) {
      huecos.forEach(function (h) { h.appendChild(crearBoton(false)); });
    } else {
      document.body.appendChild(crearBoton(true));
    }
    aplicar(raiz.getAttribute('data-theme'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
