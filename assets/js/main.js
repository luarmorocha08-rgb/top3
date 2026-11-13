/* TOP III Refrigeração e Equipamentos — scripts da loja */
(function () {
  'use strict';

  // ===== Configuração (troque pelo número real da empresa) =====
  var CONFIG = {
    whatsapp: '5521999999999',
    defaultMsg: 'Olá! Vim pelo site da TOP III e gostaria de um orçamento.'
  };

  // ===== Ilustrações SVG dos equipamentos =====
  var uid = 0;
  var GOODS = ['#8B1218', '#3B7DBF', '#E0A82E', '#2F7D4F', '#C94F2E', '#F2F2F2', '#6B4A9E', '#1F5F8B'];

  function rng(seed) {
    var s = seed || 1;
    return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }

  function defs(id, dark) {
    return '<defs>' +
      '<linearGradient id="st' + id + '" x1="0" x2="1">' +
        (dark
          ? '<stop offset="0" stop-color="#1E2429"/><stop offset=".5" stop-color="#3A434B"/><stop offset="1" stop-color="#1A1F23"/>'
          : '<stop offset="0" stop-color="#AEB8C1"/><stop offset=".45" stop-color="#EEF2F5"/><stop offset="1" stop-color="#A3AEB8"/>') +
      '</linearGradient>' +
      '<linearGradient id="gl' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9F4FA"/><stop offset="1" stop-color="#BCD9E8"/></linearGradient>' +
      '<linearGradient id="sh' + id + '" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
      '</defs>';
  }

  function goods(r, x, y, w) {
    var out = '', cx = x + 3;
    while (cx < x + w - 8) {
      var bw = 5 + Math.floor(r() * 4), bh = 9 + Math.floor(r() * 9);
      var c = GOODS[Math.floor(r() * GOODS.length)];
      out += '<rect x="' + cx + '" y="' + (y - bh) + '" width="' + bw + '" height="' + bh + '" rx="1.5" fill="' + c + '"/>';
      out += '<rect x="' + (cx + 1.5) + '" y="' + (y - bh - 3) + '" width="' + (bw - 3) + '" height="3" fill="' + c + '" opacity=".8"/>';
      cx += bw + 2;
    }
    return out;
  }

  function vertical(doors, opt) {
    opt = opt || {};
    var id = ++uid, r = rng(opt.seed || doors * 7);
    var dw = 66, w = doors * (dw + 4) + 16, h = 250;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' + defs(id, opt.dark);
    s += '<rect x="2" y="2" width="' + (w - 4) + '" height="' + (h - 14) + '" rx="6" fill="url(#st' + id + ')"/>';
    s += '<rect x="8" y="8" width="' + (w - 16) + '" height="30" rx="3" fill="' + (opt.header || '#8B1218') + '"/>';
    s += '<text x="' + (w / 2) + '" y="29" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="15" fill="#fff">TOP III</text>';
    for (var i = 0; i < doors; i++) {
      var x = 10 + i * (dw + 4), y = 44, dh = 160;
      s += '<rect x="' + x + '" y="' + y + '" width="' + dw + '" height="' + dh + '" rx="3" fill="' + (opt.dark ? '#14181B' : '#7D8A95') + '"/>';
      s += '<rect x="' + (x + 4) + '" y="' + (y + 4) + '" width="' + (dw - 8) + '" height="' + (dh - 8) + '" fill="url(#gl' + id + ')"/>';
      for (var k = 1; k <= 5; k++) {
        var sy = y + 4 + k * ((dh - 8) / 5.2);
        s += goods(r, x + 4, sy - 1, dw - 8);
        s += '<rect x="' + (x + 4) + '" y="' + sy + '" width="' + (dw - 8) + '" height="2" fill="#9AAAB6"/>';
      }
      s += '<rect x="' + (x + 4) + '" y="' + (y + 4) + '" width="' + (dw - 8) + '" height="' + (dh - 8) + '" fill="url(#sh' + id + ')"/>';
      var hx = (i % 2 === 0 && doors > 1) ? x + dw - 9 : x + 5;
      if (doors === 1) hx = x + dw - 9;
      s += '<rect x="' + hx + '" y="' + (y + 50) + '" width="4" height="56" rx="2" fill="' + (opt.dark ? '#5A646C' : '#3A444C') + '"/>';
    }
    s += '<rect x="8" y="210" width="' + (w - 16) + '" height="22" rx="2" fill="' + (opt.dark ? '#0F1214' : '#2F383F') + '"/>';
    for (var g = 14; g < w - 14; g += 6) s += '<rect x="' + g + '" y="214" width="3" height="14" fill="' + (opt.dark ? '#2A3136' : '#55626C') + '"/>';
    s += '<rect x="10" y="236" width="10" height="10" fill="#222"/><rect x="' + (w - 20) + '" y="236" width="10" height="10" fill="#222"/>';
    return s + '</svg>';
  }

  function chest(opt) {
    opt = opt || {};
    var id = ++uid, r = rng(opt.seed || 11), w = 280, h = 160;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' + defs(id);
    s += '<path d="M20 34 L260 34 L270 52 L10 52 Z" fill="#7D8A95"/>';
    s += '<path d="M26 37 L139 37 L139 50 L16 50 Z" fill="url(#gl' + id + ')"/><path d="M141 37 L254 37 L264 50 L141 50 Z" fill="url(#gl' + id + ')"/>';
    for (var x = 30; x < 250; x += 10) {
      var c = GOODS[Math.floor(r() * GOODS.length)];
      s += '<rect x="' + x + '" y="' + (40 + r() * 4) + '" width="8" height="6" rx="1" fill="' + c + '" opacity=".85"/>';
    }
    s += '<rect x="10" y="52" width="260" height="88" rx="4" fill="url(#st' + id + ')"/>';
    s += '<rect x="10" y="60" width="260" height="20" fill="' + (opt.stripe || '#8B1218') + '"/>';
    s += '<text x="140" y="75" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#fff">TOP III</text>';
    s += '<rect x="226" y="96" width="30" height="12" rx="2" fill="#1E2429"/><text x="241" y="105" text-anchor="middle" font-family="monospace" font-size="8" fill="#5FD0FF">-18°</text>';
    s += '<rect x="18" y="118" width="60" height="14" rx="2" fill="#55626C"/>';
    for (var g = 22; g < 76; g += 5) s += '<rect x="' + g + '" y="121" width="2" height="8" fill="#2F383F"/>';
    s += '<circle cx="28" cy="146" r="7" fill="#222"/><circle cx="252" cy="146" r="7" fill="#222"/>';
    return s + '</svg>';
  }

  function counter(doors, opt) {
    opt = opt || {};
    var id = ++uid, w = doors * 74 + 24, h = 170;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' + defs(id);
    s += '<rect x="0" y="20" width="' + w + '" height="10" rx="2" fill="#C9D2DA"/><rect x="0" y="28" width="' + w + '" height="3" fill="#8E9AA4"/>';
    s += '<rect x="6" y="31" width="' + (w - 12) + '" height="118" fill="url(#st' + id + ')"/>';
    for (var i = 0; i < doors; i++) {
      var x = 14 + i * 74;
      s += '<rect x="' + x + '" y="40" width="68" height="84" rx="3" fill="url(#st' + id + ')" stroke="#8E9AA4" stroke-width="1.5"/>';
      s += '<rect x="' + (x + 10) + '" y="46" width="48" height="5" rx="2.5" fill="#55626C"/>';
    }
    s += '<rect x="' + (w - 46) + '" y="130" width="30" height="12" rx="2" fill="#1E2429"/><text x="' + (w - 31) + '" y="139" text-anchor="middle" font-family="monospace" font-size="8" fill="#5FD0FF">+3°</text>';
    s += '<rect x="14" y="130" width="' + (doors * 30) + '" height="12" rx="2" fill="#55626C"/>';
    s += '<rect x="12" y="149" width="8" height="16" fill="#555"/><rect x="' + (w - 20) + '" y="149" width="8" height="16" fill="#555"/>';
    if (opt.glass) {
      s += '<path d="M10 20 L30 0 L' + (w - 30) + ' 0 L' + (w - 10) + ' 20 Z" fill="url(#gl' + id + ')" opacity=".9" stroke="#8E9AA4"/>';
    }
    return s + '</svg>';
  }

  function coldroom() {
    var id = ++uid, s = '<svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg">' + defs(id);
    s += '<path d="M20 40 L200 40 L240 20 L60 20 Z" fill="#E4EAEF"/>';
    s += '<path d="M200 40 L240 20 L240 190 L200 210 Z" fill="#C3CDD5"/>';
    s += '<rect x="20" y="40" width="180" height="170" fill="#F1F4F7"/>';
    for (var x = 56; x < 200; x += 36) s += '<rect x="' + x + '" y="40" width="1.5" height="170" fill="#D3DBE2"/>';
    s += '<rect x="66" y="78" width="78" height="132" fill="#E7ECF0" stroke="#AEB8C1" stroke-width="2"/>';
    s += '<rect x="128" y="130" width="10" height="34" rx="3" fill="#8B1218"/>';
    s += '<rect x="80" y="92" width="50" height="20" rx="2" fill="#1E2429"/><text x="105" y="106" text-anchor="middle" font-family="monospace" font-size="10" fill="#5FD0FF">-20°C</text>';
    s += '<rect x="20" y="50" width="180" height="16" fill="#8B1218"/><text x="110" y="62" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="11" fill="#fff">TOP III</text>';
    s += '<rect x="150" y="2" width="70" height="26" rx="3" fill="#55626C"/><circle cx="170" cy="15" r="9" fill="#2F383F"/><circle cx="170" cy="15" r="3" fill="#8E9AA4"/><rect x="186" y="8" width="26" height="14" fill="#3A444C"/>';
    s += '<use href="#i-flake" x="214" y="90" width="20" height="20" color="#9CC3D8"/>';
    return s + '</svg>';
  }

  function compressor() {
    var s = '<svg viewBox="0 0 170 150" xmlns="http://www.w3.org/2000/svg">';
    s += '<rect x="10" y="128" width="150" height="10" rx="2" fill="#55626C"/>';
    s += '<path d="M40 128 L40 70 Q40 30 85 30 Q130 30 130 70 L130 128 Z" fill="#1E2429"/>';
    s += '<path d="M54 120 L54 72 Q54 46 80 42" stroke="#3A444C" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M118 60 L150 60 L150 40" stroke="#B87333" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s += '<path d="M124 82 L160 82 L160 70" stroke="#B87333" stroke-width="6" fill="none" stroke-linecap="round"/>';
    s += '<rect x="66" y="86" width="38" height="24" rx="3" fill="#8B1218"/><text x="85" y="102" text-anchor="middle" font-family="Georgia,serif" font-size="9" font-weight="700" fill="#fff">TOP III</text>';
    return s + '</svg>';
  }

  function fan() {
    var s = '<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">';
    s += '<circle cx="80" cy="72" r="62" fill="none" stroke="#55626C" stroke-width="6"/>';
    for (var a = 0; a < 360; a += 72) {
      s += '<path transform="rotate(' + a + ' 80 72)" d="M80 72 C 70 40, 95 18, 108 30 C 112 46, 96 60, 80 72 Z" fill="#9CC3D8" stroke="#4A5A68" stroke-width="1.5"/>';
    }
    s += '<circle cx="80" cy="72" r="12" fill="#1E2429"/><circle cx="80" cy="72" r="4" fill="#8E9AA4"/>';
    s += '<rect x="64" y="132" width="32" height="12" rx="2" fill="#55626C"/>';
    return s + '</svg>';
  }

  function controller() {
    var s = '<svg viewBox="0 0 170 120" xmlns="http://www.w3.org/2000/svg">';
    s += '<rect x="10" y="20" width="150" height="80" rx="10" fill="#1E2429"/>';
    s += '<rect x="24" y="32" width="88" height="40" rx="4" fill="#0B0E10"/>';
    s += '<text x="68" y="62" text-anchor="middle" font-family="monospace" font-weight="700" font-size="24" fill="#FF4040">-18.0</text>';
    s += '<circle cx="132" cy="40" r="8" fill="#3A444C"/><circle cx="132" cy="64" r="8" fill="#3A444C"/>';
    s += '<rect x="24" y="80" width="18" height="10" rx="2" fill="#8B1218"/><rect x="48" y="80" width="18" height="10" rx="2" fill="#4A5A68"/><rect x="72" y="80" width="18" height="10" rx="2" fill="#4A5A68"/>';
    return s + '</svg>';
  }

  function service() {
    var s = '<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg">';
    s += '<circle cx="80" cy="75" r="64" fill="#F7E8E9"/>';
    s += '<g transform="translate(36 31) scale(3.7)" fill="none" stroke="#8B1218" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8Z"/></g>';
    return s + '</svg>';
  }

  var DRAW = {
    v1: function () { return vertical(1, { seed: 3 }); },
    v1d: function () { return vertical(1, { dark: true, seed: 5, header: '#4A5A68' }); },
    v2: function () { return vertical(2, { seed: 9 }); },
    v2d: function () { return vertical(2, { dark: true, seed: 13 }); },
    v3: function () { return vertical(3, { seed: 17 }); },
    v4s: function () { return vertical(4, { seed: 21, header: '#4A5A68' }); },
    chest: function () { return chest(); },
    chestS: function () { return chest({ stripe: '#4A5A68', seed: 31 }); },
    counter2: function () { return counter(2); },
    counter3: function () { return counter(3, { glass: true }); },
    coldroom: coldroom,
    compressor: compressor,
    fan: fan,
    controller: controller,
    service: service
  };

  // ===== Catálogo =====
  var CATS = [
    { id: 'expositores', name: 'Expositores' },
    { id: 'geladeiras', name: 'Geladeiras Comerciais' },
    { id: 'freezers', name: 'Freezers' },
    { id: 'camaras', name: 'Câmaras Frias' },
    { id: 'balcoes', name: 'Balcões Refrigerados' },
    { id: 'pecas', name: 'Peças de Reposição' }
  ];

  var PRODUCTS = [
    { id: 'exp-2p', cat: 'expositores', img: 'v2', name: 'Expositor Vertical 2 Portas de Vidro 1000L', tag: 'Mais vendido',
      specs: [['Capacidade', '1000 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '220V'], ['Iluminação', 'LED interna']] },
    { id: 'exp-1p', cat: 'expositores', img: 'v1', name: 'Expositor Vertical 1 Porta de Vidro 450L',
      specs: [['Capacidade', '450 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '127V / 220V'], ['Degelo', 'Automático']] },
    { id: 'cervejeira', cat: 'expositores', img: 'v1d', name: 'Cervejeira Black Porta de Vidro 570L', tag: 'Até -6 °C', tagIce: true,
      specs: [['Capacidade', '570 litros'], ['Temperatura', '-6 °C a +2 °C'], ['Tensão', '220V'], ['Acabamento', 'Preto fosco']] },
    { id: 'exp-3p', cat: 'expositores', img: 'v3', name: 'Expositor Vertical 3 Portas de Vidro 1400L',
      specs: [['Capacidade', '1400 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '220V'], ['Prateleiras', '15 reguláveis']] },
    { id: 'gel-4p', cat: 'geladeiras', img: 'v4s', name: 'Geladeira Comercial 4 Portas Inox 1000L', tag: 'Inox',
      specs: [['Capacidade', '1000 litros'], ['Temperatura', '+2 °C a +7 °C'], ['Tensão', '220V'], ['Gabinete', 'Aço inox 430']] },
    { id: 'gel-2pd', cat: 'geladeiras', img: 'v2d', name: 'Refrigerador Comercial Black 2 Portas 960L',
      specs: [['Capacidade', '960 litros'], ['Temperatura', '0 °C a +7 °C'], ['Tensão', '220V'], ['Controle', 'Digital']] },
    { id: 'frz-h', cat: 'freezers', img: 'chest', name: 'Freezer Horizontal Tampa de Vidro 500L', tag: 'Pronta entrega',
      specs: [['Capacidade', '500 litros'], ['Temperatura', '-18 °C a -22 °C'], ['Tensão', '127V / 220V'], ['Tampas', '2 de vidro deslizantes']] },
    { id: 'ilha', cat: 'freezers', img: 'chestS', name: 'Ilha de Congelados Dupla Ação 2,5 m',
      specs: [['Comprimento', '2,50 m'], ['Temperatura', '-18 °C / +2 °C'], ['Tensão', '220V'], ['Uso', 'Congelados ou resfriados']] },
    { id: 'camara', cat: 'camaras', img: 'coldroom', name: 'Câmara Fria Modular sob Medida', tag: 'Projeto',
      specs: [['Painéis', 'EPS / PIR 100 mm'], ['Temperatura', '-25 °C a +10 °C'], ['Unidade', 'Condensadora inclusa'], ['Instalação', 'Inclusa']] },
    { id: 'balcao-2p', cat: 'balcoes', img: 'counter2', name: 'Balcão Refrigerado Inox 2 Portas',
      specs: [['Capacidade', '300 litros'], ['Temperatura', '+2 °C a +8 °C'], ['Tensão', '220V'], ['Tampo', 'Inox 430']] },
    { id: 'balcao-exp', cat: 'balcoes', img: 'counter3', name: 'Balcão Expositor Vidro Curvo 2,0 m',
      specs: [['Comprimento', '2,00 m'], ['Temperatura', '0 °C a +5 °C'], ['Tensão', '220V'], ['Indicado', 'Frios e laticínios']] },
    { id: 'compressor', cat: 'pecas', img: 'compressor', name: 'Compressor Hermético 1/2 HP R290',
      specs: [['Potência', '1/2 HP'], ['Gás', 'R290'], ['Tensão', '220V'], ['Aplicação', 'Média / baixa temp.']] },
    { id: 'micromotor', cat: 'pecas', img: 'fan', name: 'Micromotor com Hélice 10W',
      specs: [['Potência', '10 W'], ['Hélice', '200 mm'], ['Tensão', 'Bivolt'], ['Rotação', '1300 rpm']] },
    { id: 'controlador', cat: 'pecas', img: 'controller', name: 'Controlador Digital de Temperatura',
      specs: [['Faixa', '-50 °C a +105 °C'], ['Saídas', 'Compressor e degelo'], ['Tensão', '115V / 230V'], ['Sensor', 'NTC incluso']] }
  ];

  var CATEGORY_CARDS = [
    { name: 'Expositores', img: 'v2', filter: 'expositores', cta: 'Ver modelos' },
    { name: 'Geladeiras Comerciais', img: 'v4s', filter: 'geladeiras', cta: 'Ver modelos' },
    { name: 'Peças de Reposição', img: 'compressor', filter: 'pecas', cta: 'Ver peças' },
    { name: 'Assistência Técnica', img: 'service', href: '#assistencia', cta: 'Agendar visita' }
  ];

  // ===== Utilidades =====
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function wppUrl(msg) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || CONFIG.defaultMsg); }
  function findProduct(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function catName(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].name; return ''; }

  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-show'); }, 2400);
  }

  // ===== Links de WhatsApp =====
  function bindWpp(root) {
    $all('.js-wpp', root).forEach(function (a) {
      a.href = wppUrl(a.getAttribute('data-msg'));
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  // ===== Hero =====
  function renderHero() {
    var el = $('#heroVisual');
    el.innerHTML = vertical(2, { seed: 41 }).replace('<svg', '<svg class="h-main"') +
      vertical(1, { dark: true, seed: 43, header: '#4A5A68' }).replace('<svg', '<svg class="h-side"') +
      '<div class="hero__badge"><svg><use href="#i-flake"/></svg><span><b>Pronta entrega</b>Expositores a partir de 450 L</span></div>';
  }

  // ===== Categorias =====
  function renderCats() {
    $('#cats').innerHTML = CATEGORY_CARDS.map(function (c) {
      return '<a class="cat reveal" href="' + (c.href || '#produtos') + '"' + (c.filter ? ' data-filter="' + c.filter + '"' : '') + '>' +
        '<div class="cat__img">' + DRAW[c.img]() + '</div><h3>' + esc(c.name) + '</h3><span>' + esc(c.cta) + ' →</span></a>';
    }).join('');
    $all('#cats [data-filter]').forEach(function (a) {
      a.addEventListener('click', function () { setFilter(a.getAttribute('data-filter')); });
    });
  }

  // ===== Produtos =====
  var currentFilter = 'todos';

  function renderFilters() {
    var list = [{ id: 'todos', name: 'Todos' }].concat(CATS);
    $('#filters').innerHTML = list.map(function (c) {
      return '<button class="filter' + (c.id === currentFilter ? ' is-active' : '') + '" role="tab" aria-selected="' + (c.id === currentFilter) + '" data-id="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');
    $all('#filters .filter').forEach(function (b) {
      b.addEventListener('click', function () { setFilter(b.getAttribute('data-id')); });
    });
  }

  function setFilter(id) {
    currentFilter = id;
    renderFilters();
    renderProducts();
  }

  function renderProducts() {
    var items = PRODUCTS.filter(function (p) { return currentFilter === 'todos' || p.cat === currentFilter; });
    $('#productGrid').innerHTML = items.map(function (p) {
      var inQuote = !!quote[p.id];
      return '<article class="card">' +
        '<div class="card__media">' + (p.tag ? '<span class="tag' + (p.tagIce ? ' tag--ice' : '') + '">' + esc(p.tag) + '</span>' : '') + DRAW[p.img]() + '</div>' +
        '<div class="card__body">' +
          '<span class="card__cat">' + esc(catName(p.cat)) + '</span>' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<ul class="specs">' + p.specs.map(function (s) { return '<li><span>' + esc(s[0]) + '</span><b>' + esc(s[1]) + '</b></li>'; }).join('') + '</ul>' +
          '<span class="card__warranty"><svg class="ic"><use href="#i-shield"/></svg> Garantia de 12 meses</span>' +
          '<div class="card__actions">' +
            '<button class="btn btn--red js-add' + (inQuote ? ' is-added' : '') + '" data-id="' + p.id + '">' + (inQuote ? '<svg class="ic"><use href="#i-check"/></svg> No orçamento' : 'Adicionar ao orçamento') + '</button>' +
            '<a class="btn btn--outline js-wpp" data-msg="' + esc('Olá! Gostaria de um orçamento do produto: ' + p.name + '.') + '" href="#"><svg class="ic"><use href="#i-wpp"/></svg> Comprar pelo WhatsApp</a>' +
          '</div>' +
        '</div></article>';
    }).join('');
    bindWpp($('#productGrid'));
    $all('#productGrid .js-add').forEach(function (b) {
      b.addEventListener('click', function () { addToQuote(b.getAttribute('data-id')); });
    });
  }

  // ===== Lista de orçamento =====
  var STORE_KEY = 'top3-orcamento';
  var quote = {};
  try { quote = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {}; } catch (e) { quote = {}; }
  Object.keys(quote).forEach(function (k) { if (!findProduct(k)) delete quote[k]; });

  function saveQuote() { try { localStorage.setItem(STORE_KEY, JSON.stringify(quote)); } catch (e) { /* armazenamento indisponível */ } }
  function quoteCount() { return Object.keys(quote).reduce(function (n, k) { return n + quote[k]; }, 0); }

  function quoteText() {
    var keys = Object.keys(quote);
    if (!keys.length) return '';
    return keys.map(function (k) { return '• ' + quote[k] + 'x ' + findProduct(k).name; }).join('\n');
  }

  function addToQuote(id) {
    quote[id] = (quote[id] || 0) + 1;
    saveQuote();
    updateQuoteUI();
    renderProducts();
    var btn = $('#openQuote');
    btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
    toast('Adicionado ao orçamento: ' + findProduct(id).name);
  }

  function updateQuoteUI() {
    $('#quoteCount').textContent = quoteCount();
    var body = $('#drawerBody'), keys = Object.keys(quote);
    if (!keys.length) {
      body.innerHTML = '<div class="drawer__empty"><svg><use href="#i-list"/></svg><p>Sua lista de orçamento está vazia.</p><a href="#produtos" class="btn btn--outline js-close">Ver produtos</a></div>';
    } else {
      body.innerHTML = keys.map(function (k) {
        var p = findProduct(k);
        return '<div class="qitem"><div class="qitem__img">' + DRAW[p.img]() + '</div><div><strong>' + esc(p.name) + '</strong>' +
          '<div class="qty"><button data-act="dec" data-id="' + k + '" aria-label="Diminuir">−</button><span>' + quote[k] + '</span><button data-act="inc" data-id="' + k + '" aria-label="Aumentar">+</button></div></div>' +
          '<button class="qitem__rm" data-act="rm" data-id="' + k + '" aria-label="Remover"><svg class="ic"><use href="#i-x"/></svg></button></div>';
      }).join('');
    }
    $('#sendQuote').disabled = !keys.length;
    $('#sendQuote').style.opacity = keys.length ? '' : '.5';
    var fi = $('#formItems');
    if (keys.length) { fi.hidden = false; fi.innerHTML = '<strong>Itens do seu orçamento:</strong><br>' + esc(quoteText()).replace(/\n/g, '<br>'); }
    else fi.hidden = true;
  }

  $('#drawerBody').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (b) {
      var id = b.getAttribute('data-id'), act = b.getAttribute('data-act');
      if (act === 'inc') quote[id]++;
      if (act === 'dec') quote[id]--;
      if (act === 'rm' || quote[id] <= 0) delete quote[id];
      saveQuote(); updateQuoteUI(); renderProducts();
      return;
    }
    if (e.target.closest('.js-close')) closeDrawer();
  });

  function openDrawer() {
    $('#drawer').classList.add('is-open');
    $('#drawer').setAttribute('aria-hidden', 'false');
    $('#drawerBackdrop').hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    $('#drawer').classList.remove('is-open');
    $('#drawer').setAttribute('aria-hidden', 'true');
    $('#drawerBackdrop').hidden = true;
    document.body.style.overflow = '';
  }
  $('#openQuote').addEventListener('click', openDrawer);
  $('#closeQuote').addEventListener('click', closeDrawer);
  $('#drawerBackdrop').addEventListener('click', closeDrawer);
  $('#toForm').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  $('#sendQuote').addEventListener('click', function () {
    if (!quoteCount()) return;
    window.open(wppUrl('Olá! Gostaria de um orçamento dos seguintes itens:\n' + quoteText()), '_blank', 'noopener');
  });

  // ===== Formulário =====
  $('#quoteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, ok = true;
    ['nome', 'telefone'].forEach(function (n) {
      var el = f.elements[n], valid = el.value.trim().length >= (n === 'telefone' ? 8 : 2);
      el.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { $('#formNote').textContent = 'Preencha nome e WhatsApp para continuar.'; return; }
    var lines = [
      'Olá! Gostaria de solicitar um orçamento.',
      '*Nome:* ' + f.elements.nome.value.trim(),
      '*WhatsApp:* ' + f.elements.telefone.value.trim()
    ];
    if (f.elements.cidade.value.trim()) lines.push('*Cidade:* ' + f.elements.cidade.value.trim());
    if (f.elements.email.value.trim()) lines.push('*E-mail:* ' + f.elements.email.value.trim());
    lines.push('*Negócio:* ' + f.elements.negocio.value);
    if (f.elements.mensagem.value.trim()) lines.push('*Necessidade:* ' + f.elements.mensagem.value.trim());
    if (quoteCount()) lines.push('*Itens:*\n' + quoteText());
    window.open(wppUrl(lines.join('\n')), '_blank', 'noopener');
    $('#formNote').textContent = 'Abrimos o WhatsApp com seus dados. É só enviar a mensagem!';
  });

  // ===== Header / menu =====
  var header = $('.header'), menuBtn = $('#menuBtn'), nav = $('#nav');
  window.addEventListener('scroll', function () { header.classList.toggle('is-scrolled', window.scrollY > 10); }, { passive: true });
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $all('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('is-open'); menuBtn.setAttribute('aria-expanded', 'false'); }); });

  // ===== Contadores e animações =====
  function animateCount(el) {
    var target = +el.getAttribute('data-count'), suffix = el.getAttribute('data-suffix') || '', start = null;
    var prefix = suffix ? '' : '+';
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / 1400, 1), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = prefix + v.toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ===== Inicialização =====
  renderHero();
  renderCats();
  renderFilters();
  renderProducts();
  updateQuoteUI();
  bindWpp(document);
  $('#year').textContent = new Date().getFullYear();

  $all('.section__head, .testi, .benefit, .split > div, .faq details').forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        if (en.target.hasAttribute('data-count')) animateCount(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: .15 });
    $all('.reveal, [data-count]').forEach(function (el) { io.observe(el); });
  } else {
    $all('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    $all('[data-count]').forEach(animateCount);
  }
})();
