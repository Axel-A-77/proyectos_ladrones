const video = document.querySelector('#presenter');
const layer = document.querySelector('#scene-layer');

const INK = '#17130f';
const PAPER = '#fff8e8';
const RED = '#e84a3c';
const BLUE = '#59a9d8';
const GREEN = '#79b84a';
const GOLD = '#f2b84b';
const PURPLE = '#7454c8';

let lastPhase = -1;
let active = false;

const pin = (x, y, color = RED) => `<circle cx="${x}" cy="${y}" r="17" fill="${color}" stroke="${INK}" stroke-width="7"/>`;
const line = (x1, y1, x2, y2, color = RED) => `<path d="M${x1} ${y1} C${(x1+x2)/2} ${y1-40}, ${(x1+x2)/2} ${y2+40}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"/>`;

function note(x, y, w, h, title, body, color, extra = '') {
  return `<g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="20" fill="#fffdf7" stroke="${INK}" stroke-width="8"/>
    <rect x="0" y="0" width="${w}" height="54" rx="20" fill="${color}"/>
    <text x="${w/2}" y="39" text-anchor="middle" font-size="31" fill="${INK}" font-weight="900">${title}</text>
    <text x="${w/2}" y="${h-38}" text-anchor="middle" font-size="27" fill="${INK}" font-weight="900">${body}</text>
    ${extra}
  </g>`;
}

function citizen(x, y) {
  return `<g transform="translate(${x} ${y})">
    <circle cx="90" cy="80" r="66" fill="#fff" stroke="${INK}" stroke-width="9"/>
    <circle cx="68" cy="75" r="8" fill="${INK}"/><circle cx="112" cy="75" r="8" fill="${INK}"/>
    <path d="M55 110 Q90 132 126 108" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <path d="M30 250 Q90 140 150 250" fill="${BLUE}" stroke="${INK}" stroke-width="10"/>
    <path d="M55 250 L45 350 M125 250 L136 350" stroke="${INK}" stroke-width="13" stroke-linecap="round"/>
  </g>`;
}

function thief(x, y) {
  return `<g transform="translate(${x} ${y})">
    <circle cx="105" cy="85" r="70" fill="#fff" stroke="${INK}" stroke-width="10"/>
    <path d="M48 70 Q105 30 162 70" fill="none" stroke="${INK}" stroke-width="11"/>
    <circle cx="78" cy="82" r="10" fill="${INK}"/><circle cx="130" cy="82" r="10" fill="${INK}"/>
    <path d="M72 118 Q108 145 145 105" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
    <path d="M25 270 Q105 150 185 270 L170 430 H42 Z" fill="#313944" stroke="${INK}" stroke-width="11"/>
    <path d="M95 195 L108 240 L124 195" fill="${RED}" stroke="${INK}" stroke-width="7"/>
    <rect x="30" y="275" width="145" height="75" rx="12" fill="${GREEN}" stroke="${INK}" stroke-width="8"/>
    <text x="103" y="327" text-anchor="middle" font-size="46" fill="${INK}" font-weight="900">$</text>
  </g>`;
}

function boardMarkup(phase) {
  const camera = [
    'translate(0px,0px) scale(1)',
    'translate(-720px,-100px) scale(1.65)',
    'translate(-50px,-360px) scale(1.55)',
    'translate(-1010px,-410px) scale(1.65)',
    'translate(0px,0px) scale(1)',
  ][phase];
  const caption = [
    'MIRAR TODA LA RED',
    'LA SOCIEDAD TAMBIÉN CUENTA',
    'NO SOLO DESAPARECE DINERO',
    'EL PELIGRO ES ACOSTUMBRARSE',
    'TODO QUEDA CONECTADO',
  ][phase];

  return `<div class="full-scene" style="background:#b88b56">
    <div style="position:absolute;left:110px;top:32px;color:${PAPER};font-size:58px;font-weight:900;text-transform:uppercase;text-shadow:0 5px 0 rgba(0,0,0,.25)">Pizarra de la corrupción</div>
    <div style="position:absolute;right:85px;top:35px;background:${PAPER};color:${RED};border:7px solid ${INK};border-radius:18px;padding:12px 22px 9px;font-size:31px;font-weight:900;transform:rotate(2deg)">${caption}</div>
    <div style="position:absolute;left:75px;right:75px;top:125px;bottom:60px;background:#ead8b9;border:12px solid ${INK};border-radius:28px;overflow:hidden;box-shadow:14px 16px 0 rgba(0,0,0,.22)">
      <div style="position:absolute;inset:0;transform:${camera};transform-origin:top left;transition:transform .7s cubic-bezier(.2,.85,.25,1)">
        <svg viewBox="0 0 1770 820" style="width:1770px;height:820px">
          ${line(270,230,760,180)}
          ${line(270,230,760,530)}
          ${line(920,180,1395,220)}
          ${line(920,530,1395,520)}
          ${line(830,275,830,435,PURPLE)}
          ${pin(270,230)}${pin(760,180,BLUE)}${pin(760,530,GOLD)}${pin(1395,220,GREEN)}${pin(1395,520,PURPLE)}

          ${note(55,70,430,300,'LA PATRIA','DEBERÍA SER CUIDADA',GREEN,'<path d="M110 200 L205 115 L315 145 L335 230 L225 258 L130 235 Z" fill="'+GREEN+'" stroke="'+INK+'" stroke-width="9"/>')}
          ${note(615,35,430,310,'LA SOCIEDAD','MIRA CON CONCIENCIA',BLUE,citizen(120,55))}
          ${note(610,420,450,315,'DINERO PÚBLICO','NO ES BILLETERA',GOLD,'<rect x="110" y="92" width="230" height="130" rx="24" fill="#70452b" stroke="'+INK+'" stroke-width="10"/><text x="225" y="175" text-anchor="middle" font-size="72" fill="'+GOLD+'">$</text>')}
          ${note(1250,70,430,320,'EL LADRÓN','ROBA CON CORBATA',RED,thief(115,48))}
          ${note(1240,410,455,330,'LA COSTUMBRE','LO CONVIERTE EN NORMAL',PURPLE,'<g transform="translate(74 125) rotate(-4)"><rect width="310" height="110" rx="20" fill="'+PAPER+'" stroke="'+RED+'" stroke-width="10"/><text x="155" y="72" text-anchor="middle" font-size="55" fill="'+RED+'">NORMAL</text></g>')}

          <g transform="translate(720 315) rotate(-3)">
            <rect width="420" height="120" rx="20" fill="${PAPER}" stroke="${RED}" stroke-width="11"/>
            <text x="210" y="78" text-anchor="middle" font-size="48" fill="${RED}" font-weight="900">EL VERDADERO PELIGRO</text>
          </g>
        </svg>
      </div>
    </div>
  </div>`;
}

function phaseFor(t) {
  if (t < 51) return 0;
  if (t < 55) return 1;
  if (t < 60.5) return 2;
  if (t < 65.5) return 3;
  return 4;
}

function loop() {
  const t = video.currentTime || 0;
  if (t >= 47 && t < 69) {
    const phase = phaseFor(t);
    if (!active || phase !== lastPhase) {
      active = true;
      lastPhase = phase;
      layer.innerHTML = boardMarkup(phase);
    }
  } else {
    active = false;
    lastPhase = -1;
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
