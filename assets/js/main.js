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
    var lid = opt.solid ? '#E9EEF2' : 'url(#gl' + id + ')';
    s += '<path d="M26 37 L139 37 L139 50 L16 50 Z" fill="' + lid + '"/><path d="M141 37 L254 37 L264 50 L141 50 Z" fill="' + lid + '"/>';
    if (opt.solid) s += '<rect x="70" y="41" width="30" height="4" rx="2" fill="#55626C"/><rect x="180" y="41" width="30" height="4" rx="2" fill="#55626C"/>';
    for (var x = 30; x < 250 && !opt.solid; x += 10) {
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

  function gondola(opt) {
    opt = opt || {};
    var id = ++uid, r = rng(opt.seed || 51), w = 200, h = 250;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">' + defs(id);
    var post = opt.steel ? '#5E6B76' : 'url(#st' + id + ')';
    if (!opt.steel) {
      s += '<rect x="18" y="34" width="164" height="194" fill="#E4EAEF"/>';
      for (var py = 44; py < 226; py += 10) for (var px = 26; px < 178; px += 10) s += '<circle cx="' + px + '" cy="' + py + '" r="1" fill="#C3CDD5"/>';
    }
    s += '<rect x="10" y="' + (opt.header ? 30 : 14) + '" width="8" height="' + (opt.header ? 200 : 216) + '" fill="' + post + '"/>';
    s += '<rect x="182" y="' + (opt.header ? 30 : 14) + '" width="8" height="' + (opt.header ? 200 : 216) + '" fill="' + post + '"/>';
    if (opt.header) {
      s += '<rect x="6" y="4" width="188" height="28" rx="3" fill="#8B1218"/>';
      s += '<text x="100" y="24" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="15" fill="#fff">TOP III</text>';
    }
    var shelves = [76, 116, 156, 196];
    shelves.forEach(function (y) {
      if (opt.steel) {
        var bx = 22;
        while (bx < 170) {
          var bw = 26 + Math.floor(r() * 18), bh = 18 + Math.floor(r() * 14);
          if (bx + bw > 178) break;
          s += '<rect x="' + bx + '" y="' + (y - bh) + '" width="' + bw + '" height="' + bh + '" fill="#C89B6A" stroke="#A97E52"/><rect x="' + bx + '" y="' + (y - bh) + '" width="' + bw + '" height="4" fill="#B88A5A"/>';
          bx += bw + 4;
        }
      } else {
        s += goods(r, 20, y, 160);
      }
      s += '<rect x="14" y="' + y + '" width="172" height="5" fill="' + (opt.steel ? '#7D8A95' : '#AEB8C1') + '"/>';
      s += '<rect x="14" y="' + (y + 5) + '" width="172" height="3" fill="' + (opt.steel ? '#4A5A68' : '#8E9AA4') + '"/>';
    });
    if (!opt.steel) s += goods(r, 20, 226, 160);
    s += '<rect x="8" y="226" width="184" height="16" rx="2" fill="' + (opt.steel ? '#4A5A68' : '#55626C') + '"/>';
    return s + '</svg>';
  }

  function basket(opt) {
    opt = opt || {};
    var id = ++uid, color = opt.color || '#8B1218', w = 200, h = opt.wheels ? 210 : 170;
    var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg">';
    s += '<defs><clipPath id="bk' + id + '"><path d="M22 62 L178 62 L164 150 L36 150 Z"/></clipPath></defs>';
    if (opt.wheels) {
      s += '<path d="M168 70 L186 6" stroke="#8E9AA4" stroke-width="5" stroke-linecap="round"/><rect x="176" y="0" width="20" height="10" rx="4" fill="#1E2429"/>';
    } else {
      s += '<path d="M44 62 Q60 8 96 10" stroke="#3A444C" stroke-width="6" fill="none" stroke-linecap="round"/>';
      s += '<path d="M156 62 Q140 8 104 10" stroke="#3A444C" stroke-width="6" fill="none" stroke-linecap="round"/>';
      s += '<rect x="86" y="4" width="28" height="12" rx="6" fill="#1E2429"/>';
    }
    if (opt.wire) {
      s += '<g clip-path="url(#bk' + id + ')" stroke="#8E9AA4" stroke-width="2.2">';
      for (var x = 22; x < 180; x += 12) s += '<line x1="' + x + '" y1="60" x2="' + (100 + (x - 100) * .82) + '" y2="152"/>';
      for (var y = 74; y < 152; y += 12) s += '<line x1="10" y1="' + y + '" x2="190" y2="' + y + '"/>';
      s += '</g><path d="M22 62 L178 62 L164 150 L36 150 Z" fill="none" stroke="#6B7882" stroke-width="3"/>';
    } else {
      s += '<path d="M22 62 L178 62 L164 150 L36 150 Z" fill="' + color + '"/>';
      s += '<g clip-path="url(#bk' + id + ')" fill="#000" opacity=".28">';
      for (var yy = 78; yy < 146; yy += 13) for (var xx = 30; xx < 172; xx += 15) s += '<rect x="' + xx + '" y="' + yy + '" width="10" height="7" rx="2"/>';
      s += '</g><rect x="72" y="100" width="56" height="18" rx="3" fill="#fff"/>';
      s += '<text x="100" y="113" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="10" fill="' + color + '">TOP III</text>';
    }
    s += '<rect x="16" y="56" width="168" height="10" rx="3" fill="' + (opt.wire ? '#6B7882' : '#1E2429') + '" opacity="' + (opt.wire ? 1 : .55) + '"/>';
    if (opt.wheels) {
      s += '<rect x="36" y="150" width="128" height="8" rx="2" fill="#3A444C"/><path d="M48 158 L48 176 M152 158 L152 176" stroke="#3A444C" stroke-width="5"/>';
      s += '<circle cx="48" cy="190" r="13" fill="#222"/><circle cx="48" cy="190" r="4" fill="#8E9AA4"/><circle cx="152" cy="190" r="13" fill="#222"/><circle cx="152" cy="190" r="4" fill="#8E9AA4"/>';
    }
    return s + '</svg>';
  }

  function cart() {
    var id = ++uid, s = '<svg viewBox="0 0 230 190" xmlns="http://www.w3.org/2000/svg">';
    s += '<defs><clipPath id="ct' + id + '"><path d="M30 30 L192 30 L172 112 L52 112 Z"/></clipPath></defs>';
    s += '<g clip-path="url(#ct' + id + ')" stroke="#9AA7B1" stroke-width="2">';
    for (var x = 30; x < 196; x += 10) s += '<line x1="' + x + '" y1="28" x2="' + x + '" y2="114"/>';
    for (var y = 40; y < 114; y += 10) s += '<line x1="20" y1="' + y + '" x2="200" y2="' + y + '"/>';
    s += '</g><path d="M30 30 L192 30 L172 112 L52 112 Z" fill="none" stroke="#6B7882" stroke-width="4" stroke-linejoin="round"/>';
    s += '<path d="M192 30 L214 16" stroke="#6B7882" stroke-width="5" stroke-linecap="round"/><rect x="206" y="6" width="20" height="14" rx="4" fill="#8B1218"/>';
    s += '<rect x="150" y="36" width="34" height="18" rx="3" fill="#8B1218"/><text x="167" y="49" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="8" fill="#fff">TOP III</text>';
    s += '<path d="M56 112 L62 160 M170 112 L176 160 M60 140 L178 140 M58 160 L186 160" stroke="#6B7882" stroke-width="4" stroke-linecap="round"/>';
    s += '<circle cx="64" cy="174" r="11" fill="#222"/><circle cx="64" cy="174" r="4" fill="#8E9AA4"/><circle cx="178" cy="174" r="11" fill="#222"/><circle cx="178" cy="174" r="4" fill="#8E9AA4"/>';
    return s + '</svg>';
  }

  function checkout(opt) {
    opt = opt || {};
    var id = ++uid, s = '<svg viewBox="0 0 270 180" xmlns="http://www.w3.org/2000/svg">' + defs(id);
    s += '<rect x="214" y="16" width="4" height="40" fill="#3A444C"/><rect x="192" y="0" width="48" height="32" rx="3" fill="#1E2429"/><rect x="196" y="4" width="40" height="22" fill="#5FA8D3" opacity=".7"/>';
    s += '<rect x="10" y="66" width="250" height="90" rx="3" fill="url(#st' + id + ')"/>';
    if (opt.belt) {
      s += '<rect x="10" y="56" width="160" height="12" rx="3" fill="#1E2429"/>';
      for (var x = 16; x < 166; x += 10) s += '<rect x="' + x + '" y="59" width="2" height="6" fill="#3A444C"/>';
    } else {
      s += '<rect x="10" y="58" width="160" height="10" rx="2" fill="#C9D2DA"/>';
    }
    s += '<rect x="170" y="58" width="90" height="10" rx="2" fill="#AEB8C1"/><rect x="176" y="48" width="22" height="10" rx="2" fill="#2F383F"/><rect x="179" y="50" width="16" height="4" fill="#E04848" opacity=".8"/>';
    s += '<rect x="10" y="84" width="250" height="22" fill="#8B1218"/><text x="135" y="100" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#fff">TOP III</text>';
    s += '<rect x="200" y="116" width="50" height="34" rx="2" fill="none" stroke="#8E9AA4" stroke-width="1.5"/><rect x="220" y="130" width="10" height="4" rx="2" fill="#55626C"/>';
    s += '<rect x="10" y="156" width="250" height="12" fill="#3A444C"/>';
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
    chestSolid: function () { return chest({ solid: true }); },
    vFreezer: function () { return vertical(1, { seed: 61, header: '#4A5A68' }); },
    gondolaWall: function () { return gondola({ seed: 53 }); },
    gondolaCentral: function () { return gondola({ seed: 57, header: true }); },
    shelfSteel: function () { return gondola({ steel: true, seed: 59 }); },
    basketRed: function () { return basket(); },
    basketSteel: function () { return basket({ color: '#4A5A68' }); },
    basketWire: function () { return basket({ wire: true }); },
    basketWheels: function () { return basket({ wheels: true }); },
    cart: cart,
    checkout: function () { return checkout(); },
    checkoutBelt: function () { return checkout({ belt: true }); },
    counter2: function () { return counter(2); },
    counter3: function () { return counter(3, { glass: true }); },
    coldroom: coldroom,
    compressor: compressor,
    fan: fan,
    controller: controller,
    service: service
  };

  // ===== Catálogo (cada categoria vira uma seção da vitrine) =====
  var CATS = [
    { id: 'freezers', name: 'Freezers', img: 'chest', desc: 'Freezers horizontais, verticais e ilhas de congelados para conservar com segurança.' },
    { id: 'expositores', name: 'Expositores Refrigerados', img: 'v2', desc: 'Expositores verticais e cervejeiras com portas de vidro e iluminação LED.' },
    { id: 'geladeiras', name: 'Geladeiras e Balcões', img: 'v4s', desc: 'Geladeiras comerciais e balcões refrigerados para cozinhas, bares e padarias.' },
    { id: 'camaras', name: 'Câmaras Frias', img: 'coldroom', desc: 'Câmaras frias modulares projetadas e instaladas sob medida para a sua operação.' },
    { id: 'prateleiras', name: 'Prateleiras e Gôndolas', img: 'gondolaWall', desc: 'Gôndolas de parede, centrais e estantes de aço para loja e estoque.' },
    { id: 'cestinhas', name: 'Cestinhas e Carrinhos', img: 'basketRed', desc: 'Cestinhas plásticas, aramadas, com rodinhas e carrinhos de compra.' },
    { id: 'checkouts', name: 'Checkouts', img: 'checkoutBelt', desc: 'Checkouts simples e com esteira para agilizar o caixa.' },
    { id: 'pecas', name: 'Peças de Reposição', img: 'compressor', desc: 'Compressores, micromotores, controladores e peças originais em estoque.' }
  ];

  var PRODUCTS = [
    // Freezers
    { id: 'frz-h', cat: 'freezers', img: 'chest', name: 'Freezer Horizontal Tampa de Vidro 500L', tag: 'Pronta retirada',
      specs: [['Capacidade', '500 litros'], ['Temperatura', '-18 °C a -22 °C'], ['Tensão', '127V / 220V'], ['Tampas', '2 de vidro deslizantes']] },
    { id: 'frz-hs', cat: 'freezers', img: 'chestSolid', name: 'Freezer Horizontal 2 Tampas Cegas 400L',
      specs: [['Capacidade', '400 litros'], ['Temperatura', '-18 °C a -22 °C'], ['Tensão', '127V / 220V'], ['Função', 'Freezer ou refrigerador']] },
    { id: 'frz-v', cat: 'freezers', img: 'vFreezer', name: 'Freezer Vertical Porta de Vidro 560L',
      specs: [['Capacidade', '560 litros'], ['Temperatura', '-18 °C a -22 °C'], ['Tensão', '220V'], ['Degelo', 'Automático']] },
    { id: 'ilha', cat: 'freezers', img: 'chestS', name: 'Ilha de Congelados Dupla Ação 2,5 m',
      specs: [['Comprimento', '2,50 m'], ['Temperatura', '-18 °C / +2 °C'], ['Tensão', '220V'], ['Uso', 'Congelados ou resfriados']] },
    // Expositores
    { id: 'exp-2p', cat: 'expositores', img: 'v2', name: 'Expositor Vertical 2 Portas de Vidro 1000L', tag: 'Mais vendido',
      specs: [['Capacidade', '1000 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '220V'], ['Iluminação', 'LED interna']] },
    { id: 'exp-1p', cat: 'expositores', img: 'v1', name: 'Expositor Vertical 1 Porta de Vidro 450L',
      specs: [['Capacidade', '450 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '127V / 220V'], ['Degelo', 'Automático']] },
    { id: 'cervejeira', cat: 'expositores', img: 'v1d', name: 'Cervejeira Black Porta de Vidro 570L', tag: 'Até -6 °C', tagIce: true,
      specs: [['Capacidade', '570 litros'], ['Temperatura', '-6 °C a +2 °C'], ['Tensão', '220V'], ['Acabamento', 'Preto fosco']] },
    { id: 'exp-3p', cat: 'expositores', img: 'v3', name: 'Expositor Vertical 3 Portas de Vidro 1400L',
      specs: [['Capacidade', '1400 litros'], ['Temperatura', '+1 °C a +8 °C'], ['Tensão', '220V'], ['Prateleiras', '15 reguláveis']] },
    // Geladeiras e balcões
    { id: 'gel-4p', cat: 'geladeiras', img: 'v4s', name: 'Geladeira Comercial 4 Portas Inox 1000L', tag: 'Inox',
      specs: [['Capacidade', '1000 litros'], ['Temperatura', '+2 °C a +7 °C'], ['Tensão', '220V'], ['Gabinete', 'Aço inox 430']] },
    { id: 'gel-2pd', cat: 'geladeiras', img: 'v2d', name: 'Refrigerador Comercial Black 2 Portas 960L',
      specs: [['Capacidade', '960 litros'], ['Temperatura', '0 °C a +7 °C'], ['Tensão', '220V'], ['Controle', 'Digital']] },
    { id: 'balcao-2p', cat: 'geladeiras', img: 'counter2', name: 'Balcão Refrigerado Inox 2 Portas',
      specs: [['Capacidade', '300 litros'], ['Temperatura', '+2 °C a +8 °C'], ['Tensão', '220V'], ['Tampo', 'Inox 430']] },
    { id: 'balcao-exp', cat: 'geladeiras', img: 'counter3', name: 'Balcão Expositor Vidro Curvo 2,0 m',
      specs: [['Comprimento', '2,00 m'], ['Temperatura', '0 °C a +5 °C'], ['Tensão', '220V'], ['Indicado', 'Frios e laticínios']] },
    // Câmaras frias
    { id: 'camara', cat: 'camaras', img: 'coldroom', name: 'Câmara Fria Modular para Congelados', tag: 'Projeto',
      specs: [['Painéis', 'PIR 150 mm'], ['Temperatura', '-25 °C a -18 °C'], ['Unidade', 'Condensadora inclusa'], ['Instalação', 'Inclusa']] },
    { id: 'camara-resf', cat: 'camaras', img: 'coldroom', name: 'Câmara Fria Modular para Resfriados',
      specs: [['Painéis', 'EPS 100 mm'], ['Temperatura', '0 °C a +10 °C'], ['Unidade', 'Condensadora inclusa'], ['Instalação', 'Inclusa']] },
    // Prateleiras e gôndolas
    { id: 'gond-parede', cat: 'prateleiras', img: 'gondolaWall', name: 'Gôndola de Parede 2,00 m com 5 Níveis', tag: 'Mais vendido',
      specs: [['Altura', '2,00 m'], ['Módulo', '1,00 m de largura'], ['Níveis', '4 prateleiras + base'], ['Pintura', 'Epóxi branca']] },
    { id: 'gond-central', cat: 'prateleiras', img: 'gondolaCentral', name: 'Gôndola Central Dupla Face',
      specs: [['Altura', '1,60 m'], ['Módulo', '1,00 m de largura'], ['Faces', '2 (dupla)'], ['Carga', 'Até 60 kg por nível']] },
    { id: 'ponta', cat: 'prateleiras', img: 'gondolaCentral', name: 'Ponta de Gôndola com Testeira',
      specs: [['Altura', '1,60 m'], ['Largura', '0,90 m'], ['Níveis', '4 prateleiras'], ['Testeira', 'Personalizável']] },
    { id: 'estante-aco', cat: 'prateleiras', img: 'shelfSteel', name: 'Estante de Aço para Estoque 6 Bandejas',
      specs: [['Altura', '2,00 m'], ['Bandejas', '6 reguláveis'], ['Carga', 'Até 100 kg por bandeja'], ['Chapa', 'Aço galvanizado']] },
    // Cestinhas e carrinhos
    { id: 'cesta-plast', cat: 'cestinhas', img: 'basketRed', name: 'Cestinha Plástica com Alça 20L', tag: 'Kit 10 un.', tagIce: true,
      specs: [['Capacidade', '20 litros'], ['Material', 'Polipropileno'], ['Alças', '2 com pega emborrachada'], ['Cores', 'Vermelha, cinza, azul']] },
    { id: 'cesta-cinza', cat: 'cestinhas', img: 'basketSteel', name: 'Cestinha Plástica Empilhável 16L',
      specs: [['Capacidade', '16 litros'], ['Material', 'Polipropileno'], ['Empilhável', 'Sim'], ['Personalização', 'Logo da loja']] },
    { id: 'cesta-aramada', cat: 'cestinhas', img: 'basketWire', name: 'Cestinha Aramada Cromada 22L',
      specs: [['Capacidade', '22 litros'], ['Material', 'Aço cromado'], ['Alças', '2 com pega plástica'], ['Empilhável', 'Sim']] },
    { id: 'cesta-rodinhas', cat: 'cestinhas', img: 'basketWheels', name: 'Cestinha com Rodinhas e Alça Retrátil 45L',
      specs: [['Capacidade', '45 litros'], ['Rodas', '2 de PVC'], ['Alça', 'Telescópica'], ['Empilhável', 'Sim']] },
    { id: 'carrinho', cat: 'cestinhas', img: 'cart', name: 'Carrinho de Compras Aramado 160L',
      specs: [['Capacidade', '160 litros'], ['Material', 'Aço zincado'], ['Rodízios', '4 giratórios'], ['Assento', 'Infantil rebatível']] },
    // Checkouts
    { id: 'checkout-esteira', cat: 'checkouts', img: 'checkoutBelt', name: 'Checkout com Esteira Elétrica 2,50 m', tag: 'Supermercado',
      specs: [['Comprimento', '2,50 m'], ['Esteira', 'Motorizada com sensor'], ['Acabamento', 'Inox + MDF'], ['Lado', 'Direito ou esquerdo']] },
    { id: 'checkout-simples', cat: 'checkouts', img: 'checkout', name: 'Checkout Simples 1,80 m',
      specs: [['Comprimento', '1,80 m'], ['Tampo', 'Inox'], ['Gaveta', 'Para dinheiro'], ['Indicado', 'Mercados e lojas']] },
    // Peças
    { id: 'compressor', cat: 'pecas', img: 'compressor', name: 'Compressor Hermético 1/2 HP R290',
      specs: [['Potência', '1/2 HP'], ['Gás', 'R290'], ['Tensão', '220V'], ['Aplicação', 'Média / baixa temp.']] },
    { id: 'micromotor', cat: 'pecas', img: 'fan', name: 'Micromotor com Hélice 10W',
      specs: [['Potência', '10 W'], ['Hélice', '200 mm'], ['Tensão', 'Bivolt'], ['Rotação', '1300 rpm']] },
    { id: 'controlador', cat: 'pecas', img: 'controller', name: 'Controlador Digital de Temperatura',
      specs: [['Faixa', '-50 °C a +105 °C'], ['Saídas', 'Compressor e degelo'], ['Tensão', '115V / 230V'], ['Sensor', 'NTC incluso']] }
  ];

  // ===== Utilidades =====
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function wppUrl(msg) { return 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg || CONFIG.defaultMsg); }
  function findProduct(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }

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
      '<div class="hero__badge"><span class="hero__badge-n">25</span><span><b>anos de mercado</b>Refrigerando o comércio desde 2001</span></div>';
  }

  // ===== Categorias (atalhos para as seções) =====
  function renderCats() {
    $('#cats').innerHTML = CATS.map(function (c) {
      var n = PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      return '<a class="cat reveal" href="#cat-' + c.id + '">' +
        '<div class="cat__img">' + DRAW[c.img]() + '</div><h3>' + esc(c.name) + '</h3><span>' + n + (n === 1 ? ' modelo' : ' modelos') + ' →</span></a>';
    }).join('');
  }

  // ===== Vitrine em seções (cards estilo app) =====
  function card(p) {
    return '<article class="card" data-id="' + p.id + '" tabindex="0" aria-label="' + esc(p.name) + ' — ver detalhes">' +
      '<div class="card__media">' + (p.tag ? '<span class="tag' + (p.tagIce ? ' tag--ice' : '') + '">' + esc(p.tag) + '</span>' : '') + DRAW[p.img]() + '</div>' +
      '<div class="card__body">' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<div class="card__chips">' + p.specs.slice(0, 2).map(function (s) { return '<span>' + esc(s[1]) + '</span>'; }).join('') + '</div>' +
        '<div class="card__foot">' +
          '<span class="card__more">Ver detalhes</span>' +
          '<button class="add js-add" data-id="' + p.id + '" aria-label="Adicionar ' + esc(p.name) + ' ao orçamento"></button>' +
        '</div>' +
      '</div></article>';
  }

  function renderCatalog() {
    $('#catnav').innerHTML = '<div class="catnav__inner">' + CATS.map(function (c) {
      return '<a href="#cat-' + c.id + '" data-id="' + c.id + '">' + esc(c.name) + '</a>';
    }).join('') + '</div>';

    $('#catalog').innerHTML = CATS.map(function (c, i) {
      var items = PRODUCTS.filter(function (p) { return p.cat === c.id; });
      return '<section class="catsec" id="cat-' + c.id + '" aria-labelledby="h-' + c.id + '">' +
        '<div class="catsec__head">' +
          '<div class="catsec__title"><span class="catsec__num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
          '<div><h3 id="h-' + c.id + '">' + esc(c.name) + '</h3><p>' + esc(c.desc) + '</p></div></div>' +
          '<a class="link-wpp js-wpp" href="#" data-msg="' + esc('Olá! Gostaria de um orçamento da linha ' + c.name + '.') + '"><svg class="ic"><use href="#i-wpp"/></svg> Orçamento da linha</a>' +
        '</div>' +
        '<div class="grid">' + items.map(card).join('') + '</div>' +
      '</section>';
    }).join('');

    bindWpp($('#catalog'));
    $('#catalog').addEventListener('click', function (e) {
      var b = e.target.closest('.js-add');
      if (b) { e.stopPropagation(); addToQuote(b.getAttribute('data-id')); return; }
      var c = e.target.closest('.card');
      if (c) openSheet(c.getAttribute('data-id'));
    });
    $('#catalog').addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) { e.preventDefault(); openSheet(e.target.getAttribute('data-id')); }
    });
    renderProducts();

    // Destaca a seção visível na barra de categorias
    if ('IntersectionObserver' in window) {
      var links = $all('#catnav a');
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id.replace('cat-', '');
          links.forEach(function (a) {
            var on = a.getAttribute('data-id') === id;
            a.classList.toggle('is-active', on);
            if (on && a.parentNode.scrollTo) a.parentNode.scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' });
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      $all('.catsec').forEach(function (s) { spy.observe(s); });
    }
  }

  // Atualiza os botões "+" conforme a lista de orçamento
  function renderProducts() {
    $all('.js-add').forEach(function (b) {
      var n = quote[b.getAttribute('data-id')] || 0;
      b.classList.toggle('is-added', n > 0);
      b.innerHTML = n ? '<svg class="ic"><use href="#i-check"/></svg><span>' + n + '</span>' : '<svg class="ic"><use href="#i-plus"/></svg>';
    });
    if (sheetId) renderSheetActions();
  }

  // ===== Busca =====
  function norm(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  var searchIndex = {};
  PRODUCTS.forEach(function (p) {
    var cat = CATS.filter(function (c) { return c.id === p.cat; })[0];
    searchIndex[p.id] = norm([p.name, cat ? cat.name : '', p.tag || ''].concat(p.specs.map(function (s) { return s[1]; })).join(' '));
  });

  function applySearch(q) {
    var words = norm(q).trim().split(/\s+/).filter(Boolean), any = false;
    $all('#catalog .card').forEach(function (c) {
      var txt = searchIndex[c.getAttribute('data-id')];
      var ok = words.every(function (w) { return txt.indexOf(w) > -1 || (w.length >= 4 && txt.indexOf(w.slice(0, Math.max(4, w.length - 1))) > -1); });
      c.hidden = !ok;
    });
    $all('.catsec').forEach(function (s) {
      var vis = $all('.card', s).some(function (c) { return !c.hidden; });
      s.hidden = !vis;
      if (vis) any = true;
    });
    $('#emptySearch').hidden = any;
    $('#catnav').classList.toggle('is-dim', words.length > 0);
  }

  var searchInput = $('#productSearch');
  searchInput.addEventListener('input', function () { applySearch(searchInput.value); });
  function goSearch(q) {
    searchInput.value = q || '';
    applySearch(searchInput.value);
    $('#produtos').scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { searchInput.focus({ preventScroll: true }); }, 450);
  }
  $('#heroSearch').addEventListener('submit', function (e) {
    e.preventDefault();
    goSearch(e.target.elements.q.value);
  });
  $('#searchBtn').addEventListener('click', function () { goSearch(searchInput.value); });
  $all('.hero-chips a, #catnav a, #cats a').forEach(function (a) {
    a.addEventListener('click', function () { if (searchInput.value) { searchInput.value = ''; applySearch(''); } });
  });

  // ===== Detalhes do produto (bottom sheet) =====
  var sheetId = null;
  function renderSheetActions() {
    var n = quote[sheetId] || 0;
    $('#sheetActions').innerHTML =
      (n
        ? '<div class="sheet__qty"><span>No orçamento</span><div class="qty qty--lg"><button data-act="dec" aria-label="Diminuir">−</button><span>' + n + '</span><button data-act="inc" aria-label="Aumentar">+</button></div></div>' +
          '<button class="btn btn--red btn--block btn--lg" data-act="open"><svg class="ic"><use href="#i-list"/></svg> Ver meu orçamento</button>'
        : '<button class="btn btn--red btn--block btn--lg" data-act="inc"><svg class="ic"><use href="#i-plus"/></svg> Adicionar ao orçamento</button>');
  }

  function openSheet(id) {
    var p = findProduct(id); if (!p) return;
    var cat = CATS.filter(function (c) { return c.id === p.cat; })[0];
    sheetId = id;
    $('#sheetContent').innerHTML =
      '<div class="sheet__media">' + (p.tag ? '<span class="tag' + (p.tagIce ? ' tag--ice' : '') + '">' + esc(p.tag) + '</span>' : '') + DRAW[p.img]() + '</div>' +
      '<div class="sheet__info">' +
        '<span class="card__cat">' + esc(cat ? cat.name : '') + '</span>' +
        '<h3 id="sheetTitle">' + esc(p.name) + '</h3>' +
        '<ul class="specs specs--lg">' + p.specs.map(function (s) { return '<li><span>' + esc(s[0]) + '</span><b>' + esc(s[1]) + '</b></li>'; }).join('') + '</ul>' +
        '<div class="sheet__perks"><span><svg class="ic"><use href="#i-shield"/></svg> Garantia de 12 meses</span><span><svg class="ic"><use href="#i-factory"/></svg> Retirada na fábrica</span></div>' +
        '<div class="sheet__actions"><div id="sheetActions"></div>' +
        '<a class="btn btn--outline btn--block js-wpp" href="#" data-msg="' + esc('Olá! Gostaria de um orçamento do produto: ' + p.name + '.') + '"><svg class="ic"><use href="#i-wpp"/></svg> Comprar pelo WhatsApp</a></div>' +
      '</div>';
    bindWpp($('#sheetContent'));
    renderSheetActions();
    $('#sheet').classList.add('is-open');
    $('#sheet').setAttribute('aria-hidden', 'false');
    showBackdrop();
    setTimeout(function () { $('#closeSheet').focus({ preventScroll: true }); }, 50);
  }
  function closeSheet() {
    if (!sheetId) return;
    var last = sheetId;
    sheetId = null;
    $('#sheet').classList.remove('is-open');
    $('#sheet').setAttribute('aria-hidden', 'true');
    hideBackdrop();
    var c = $('#catalog .card[data-id="' + last + '"]');
    if (c) c.focus({ preventScroll: true });
  }
  $('#closeSheet').addEventListener('click', closeSheet);
  $('#sheetContent').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b || !sheetId) return;
    var act = b.getAttribute('data-act');
    if (act === 'inc') addToQuote(sheetId);
    if (act === 'dec') { quote[sheetId]--; if (quote[sheetId] <= 0) delete quote[sheetId]; saveQuote(); updateQuoteUI(); renderProducts(); }
    if (act === 'open') { closeSheet(); openDrawer(); }
  });

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

  function bump(el) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }

  function addToQuote(id) {
    quote[id] = (quote[id] || 0) + 1;
    saveQuote();
    updateQuoteUI();
    renderProducts();
    bump($('#openQuote')); bump($('#tabQuote'));
    if (navigator.vibrate) { try { navigator.vibrate(12); } catch (e) { /* sem vibração */ } }
    toast('Adicionado ao orçamento ✓');
  }

  function updateQuoteUI() {
    var n = quoteCount();
    $('#quoteCount').textContent = n;
    $('#tabCount').textContent = n;
    $('#tabCount').classList.toggle('is-zero', !n);
    var body = $('#drawerBody'), keys = Object.keys(quote);
    if (!keys.length) {
      body.innerHTML = '<div class="drawer__empty"><svg><use href="#i-list"/></svg><p>Sua lista de orçamento está vazia.</p><a href="#produtos" class="btn btn--outline js-close">Ver produtos</a></div>';
    } else {
      body.innerHTML = keys.map(function (k) {
        var p = findProduct(k);
        return '<div class="qitem"><div class="qitem__img">' + DRAW[p.img]() + '</div><div><strong>' + esc(p.name) + '</strong>' +
          '<div class="qty"><button data-act="dec" data-id="' + k + '" aria-label="Diminuir">−</button><span>' + quote[k] + '</span><button data-act="inc" data-id="' + k + '" aria-label="Aumentar">+</button></div></div>' +
          '<button class="qitem__rm" data-act="rm" data-id="' + k + '" aria-label="Remover"><svg class="ic"><use href="#i-x"/></svg></button></div>';
      }).join('') + '<p class="drawer__note"><svg class="ic"><use href="#i-factory"/></svg> Os pedidos são retirados na fábrica. Combinamos o dia e o horário pelo WhatsApp.</p>';
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

  var openLayers = 0;
  function showBackdrop() { openLayers++; $('#drawerBackdrop').hidden = false; document.body.style.overflow = 'hidden'; }
  function hideBackdrop() { openLayers = Math.max(0, openLayers - 1); if (!openLayers) { $('#drawerBackdrop').hidden = true; document.body.style.overflow = ''; } }

  function openDrawer() {
    if ($('#drawer').classList.contains('is-open')) return;
    $('#drawer').classList.add('is-open');
    $('#drawer').setAttribute('aria-hidden', 'false');
    showBackdrop();
  }
  function closeDrawer() {
    if (!$('#drawer').classList.contains('is-open')) return;
    $('#drawer').classList.remove('is-open');
    $('#drawer').setAttribute('aria-hidden', 'true');
    hideBackdrop();
  }
  function closeAll() { closeSheet(); closeDrawer(); }
  $('#openQuote').addEventListener('click', openDrawer);
  $('#tabQuote').addEventListener('click', openDrawer);
  $('#closeQuote').addEventListener('click', closeDrawer);
  $('#drawerBackdrop').addEventListener('click', closeAll);
  $('#toForm').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  $('#sendQuote').addEventListener('click', function () {
    if (!quoteCount()) return;
    window.open(wppUrl('Olá! Gostaria de um orçamento dos seguintes itens (retirada na fábrica):\n' + quoteText()), '_blank', 'noopener');
  });

  // ===== Barra de abas: destaca a área visível =====
  if ('IntersectionObserver' in window) {
    var tabs = $all('#tabbar [data-tab]');
    var tabSpy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.getAttribute('data-tab-area');
        tabs.forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === id); });
      });
    }, { rootMargin: '-50% 0px -50% 0px' });
    [['.hero', 'topo'], ['#categorias', 'produtos'], ['#produtos', 'produtos'], ['#obras', 'obras']].forEach(function (pair) {
      var el = $(pair[0]); if (el) { el.setAttribute('data-tab-area', pair[1]); tabSpy.observe(el); }
    });
    $all('main > section:not([data-tab-area])').forEach(function (el) { el.setAttribute('data-tab-area', 'none'); tabSpy.observe(el); });
  }

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
    var prefix = el.hasAttribute('data-prefix') ? el.getAttribute('data-prefix') : (suffix ? '' : '+');
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
  renderCatalog();
  updateQuoteUI();
  bindWpp(document);
  $('#year').textContent = new Date().getFullYear();

  $all('.section__head, .benefit, .split > div, .faq details, .obra').forEach(function (el) { el.classList.add('reveal'); });
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
