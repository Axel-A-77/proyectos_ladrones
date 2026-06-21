const stage = document.querySelector('#stage');
const wrap = document.querySelector('#stage-wrap');
const video = document.querySelector('#presenter');
const sceneLayer = document.querySelector('#scene-layer');
const fxLayer = document.querySelector('#fx-layer');
const hudLayer = document.querySelector('#hud-layer');
const shade = document.querySelector('#video-shade');
const controls = document.querySelector('#controls');
const playBtn = document.querySelector('#play');
const restartBtn = document.querySelector('#restart');
const fullscreenBtn = document.querySelector('#fullscreen');
const recordBtn = document.querySelector('#record');
const seek = document.querySelector('#seek');
const timecode = document.querySelector('#timecode');
const missing = document.querySelector('#missing-video');

const LIMIT = 120;
let lastKey = '';
let raf = null;
let recording = false;

const C = {
  ink: '#17130f', paper: '#fff8e8', sun: '#f4c95d', red: '#e84a3c',
  blue: '#59a9d8', green: '#79b84a', gold: '#f2b84b', purple: '#7454c8',
};

const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const progress = (t, a, b) => clamp((t - a) / (b - a));
const visible = (t, at) => t >= at;
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}.${Math.floor((s % 1) * 10)}`;

function resizeStage() {
  const r = wrap.getBoundingClientRect();
  const scale = Math.min(r.width / 1920, r.height / 1080);
  stage.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeStage);
resizeStage();

function face({cx, cy, r = 120, mood = 'smug', look = 0}) {
  const brows = mood === 'smug'
    ? `<path d="M${cx-70} ${cy-45} Q${cx-35} ${cy-62} ${cx-5} ${cy-42}"/><path d="M${cx+18} ${cy-55} Q${cx+48} ${cy-76} ${cx+82} ${cy-48}"/>`
    : mood === 'worried'
      ? `<path d="M${cx-72} ${cy-52} Q${cx-38} ${cy-82} ${cx-5} ${cy-55}"/><path d="M${cx+15} ${cy-55} Q${cx+48} ${cy-82} ${cx+80} ${cy-52}"/>`
      : `<path d="M${cx-72} ${cy-52} L${cx-12} ${cy-48}"/><path d="M${cx+15} ${cy-48} L${cx+78} ${cy-52}"/>`;
  const mouth = mood === 'worried'
    ? `<path d="M${cx-55} ${cy+58} Q${cx} ${cy+25} ${cx+56} ${cy+58}"/>`
    : mood === 'angry'
      ? `<path d="M${cx-55} ${cy+45} Q${cx} ${cy+72} ${cx+55} ${cy+44}"/>`
      : `<path d="M${cx-58} ${cy+38} Q${cx} ${cy+88} ${cx+64} ${cy+25}"/>`;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${C.ink}" stroke-width="12"/>
    <g fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round">${brows}${mouth}</g>
    <ellipse cx="${cx-43}" cy="${cy-5}" rx="29" ry="35" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
    <ellipse cx="${cx+48}" cy="${cy-8}" rx="29" ry="35" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
    <circle cx="${cx-37+look}" cy="${cy-2}" r="12" fill="${C.ink}"/>
    <circle cx="${cx+54+look}" cy="${cy-5}" r="12" fill="${C.ink}"/>
    <path d="M${cx+5} ${cy+2} q-22 38 8 42" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
  `;
}

function politicianSvg({x = 0, y = 0, mood = 'smug', money = false, thin = false, scale = 1}) {
  const bodyW = thin ? 180 : 240;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    ${face({cx: 180, cy: 135, r: 122, mood, look: mood === 'smug' ? 7 : 0})}
    <path d="M${180-bodyW/2} 255 Q180 210 ${180+bodyW/2} 255 L${180+bodyW/2+15} 560 Q180 610 ${180-bodyW/2-15} 560 Z" fill="#313944" stroke="${C.ink}" stroke-width="12"/>
    <path d="M150 260 L180 330 L210 260" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
    <path d="M173 300 L190 300 L210 410 L178 450 L148 410 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="8"/>
    <path d="M105 300 Q20 340 42 445" fill="none" stroke="${C.ink}" stroke-width="28" stroke-linecap="round"/>
    <path d="M255 305 Q350 325 350 430" fill="none" stroke="${C.ink}" stroke-width="28" stroke-linecap="round"/>
    <circle cx="43" cy="445" r="28" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
    <circle cx="350" cy="430" r="28" fill="#fff" stroke="${C.ink}" stroke-width="9"/>
    <path d="M135 555 L120 770" stroke="${C.ink}" stroke-width="28" stroke-linecap="round"/>
    <path d="M225 555 L240 770" stroke="${C.ink}" stroke-width="28" stroke-linecap="round"/>
    <path d="M82 780 Q130 748 164 782" fill="#111" stroke="${C.ink}" stroke-width="8"/>
    <path d="M202 782 Q242 748 286 782" fill="#111" stroke="${C.ink}" stroke-width="8"/>
    ${money ? `<g class="shake"><rect x="65" y="355" width="120" height="58" rx="8" fill="${C.green}" stroke="${C.ink}" stroke-width="8"/><text x="125" y="395" text-anchor="middle" font-size="36" fill="${C.ink}">$</text></g>` : ''}
  </g>`;
}

function suitcaseSvg(x, y, scale = 1) {
  let bills = '';
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    bills += `<g transform="translate(${40+col*90} ${105+row*64})"><rect width="82" height="46" rx="4" fill="#9ed05f" stroke="${C.ink}" stroke-width="6"/><text x="41" y="33" text-anchor="middle" font-size="28" fill="${C.ink}">$</text></g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M130 30 Q210 -10 290 30 L290 70 L130 70 Z" fill="none" stroke="${C.ink}" stroke-width="14"/>
    <rect x="20" y="65" width="380" height="300" rx="26" fill="#6e452a" stroke="${C.ink}" stroke-width="14"/>
    <path d="M20 175 Q210 40 400 175" fill="#4f321f" stroke="${C.ink}" stroke-width="12"/>
    ${bills}
    <rect x="170" y="332" width="80" height="58" rx="8" fill="${C.gold}" stroke="${C.ink}" stroke-width="9"/>
  </g>`;
}

function titleScene() {
  return `<div class="full-scene fade" style="background:#fffaf0">
    <div style="position:absolute;left:95px;top:140px;width:850px;font-weight:900;line-height:.93;text-transform:uppercase;color:${C.ink}">
      <div style="font-size:96px">Los</div>
      <div style="font-size:150px;color:${C.red}">ladrones</div>
      <div style="font-size:104px">de cuello</div>
      <div style="font-size:104px">y corbata</div>
    </div>
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(1030 85) scale(.83)">${politicianSvg({mood:'smug', money:true})}</g>
      ${suitcaseSvg(1250, 530, .9)}
      <path d="M1080 760 q-60 15 -85 80" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
      <path d="M1660 620 q70 -12 95 40" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/>
    </svg>
  </div>`;
}

function presenterOverlay(t, mode) {
  const phrases = mode === 'intro'
    ? [{at:5, text:'Una reflexión con humor', color:C.gold}, {at:10, text:'Y con memoria', color:C.red}]
    : [{at:29, text:'La patria', color:C.blue}, {at:35, text:'El robo', color:C.red}, {at:41, text:'La costumbre', color:C.purple}];
  const active = phrases.filter((p) => t >= p.at).at(-1);
  return `<div class="present-overlay fade"></div>
    ${active ? `<div class="lower-third pop" style="border-color:${active.color};color:${C.ink}">${esc(active.text)}</div>` : ''}
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <path d="M95 120 q55 -45 110 0" fill="none" stroke="${C.gold}" stroke-width="13" stroke-linecap="round"/>
      <path d="M1650 865 q70 35 125 -12" fill="none" stroke="${C.red}" stroke-width="13" stroke-linecap="round"/>
    </svg>`;
}

function powerScene(local) {
  const step = local < 3 ? 0 : local < 6 ? 1 : 2;
  return `<div class="full-scene fade">
    <div class="scene-title">El poder como botín</div>
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(90 210)" class="slide-left">
        <rect x="0" y="0" width="430" height="650" rx="34" fill="${C.paper}" stroke="${C.ink}" stroke-width="10"/>
        <path d="M120 540 V145 H315 V540" fill="#7f4b2d" stroke="${C.ink}" stroke-width="12"/>
        <circle cx="280" cy="340" r="13" fill="${C.gold}" stroke="${C.ink}" stroke-width="6"/>
        <text x="215" y="80" text-anchor="middle" font-size="44" fill="${C.purple}">ENTRA</text>
      </g>
      <path class="draw-line" d="M545 520 H720" fill="none" stroke="${C.red}" stroke-width="13" marker-end="url(#arr)"/>
      ${step >= 1 ? `<g transform="translate(730 210)" class="pop">
        <rect x="0" y="0" width="460" height="650" rx="34" fill="${C.paper}" stroke="${C.ink}" stroke-width="10"/>
        <path d="M105 510 V265 Q230 120 355 265 V510 Z" fill="${C.purple}" stroke="${C.ink}" stroke-width="12"/>
        <path d="M90 505 H370" stroke="${C.ink}" stroke-width="18"/>
        ${politicianSvg({x:80,y:150,mood:'smug',scale:.55})}
        <text x="230" y="80" text-anchor="middle" font-size="44" fill="${C.red}">SE ACOMODA</text>
      </g>` : ''}
      ${step >= 2 ? `<path class="draw-line" d="M1215 520 H1370" fill="none" stroke="${C.red}" stroke-width="13"/>
      <g transform="translate(1390 210)" class="pop">
        <rect x="0" y="0" width="430" height="650" rx="34" fill="${C.paper}" stroke="${C.ink}" stroke-width="10"/>
        <path d="M85 190 L210 135 L340 198 L315 370 L195 425 L78 350 Z" fill="${C.green}" stroke="${C.ink}" stroke-width="12"/>
        <g transform="translate(110 390) scale(.55)">${suitcaseSvg(0,0,1)}</g>
        <text x="215" y="80" text-anchor="middle" font-size="44" fill="${C.gold}">SE APROPIA</text>
      </g>` : ''}
      <defs><marker id="arr" markerWidth="14" markerHeight="14" refX="10" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${C.red}"/></marker></defs>
    </svg>
  </div>`;
}

function detectiveScene(local) {
  const step = Math.min(4, Math.floor(local / 4));
  return `<div class="full-scene fade" style="background:#d4b07a">
    <div class="scene-title" style="color:${C.paper};text-shadow:0 5px 0 rgba(0,0,0,.2)">El verdadero peligro</div>
    <div class="paper" style="left:95px;right:95px;top:170px;bottom:70px;background:#efe1c1">
      <svg viewBox="0 0 1730 800" style="width:100%;height:100%">
        <g transform="translate(80 95)" class="pop">
          <rect width="350" height="250" rx="18" fill="#fff" stroke="${C.ink}" stroke-width="8"/>
          <path d="M65 165 L145 85 L255 105 L285 185 L190 215 L90 195 Z" fill="${C.green}" stroke="${C.ink}" stroke-width="10"/>
          <text x="175" y="45" text-anchor="middle" font-size="38">LA PATRIA</text>
        </g>
        ${step >= 1 ? `<g transform="translate(670 80)" class="pop">${suitcaseSvg(0,0,.72)}<text x="150" y="405" font-size="42" fill="${C.red}">EL ROBO</text></g>` : ''}
        ${step >= 2 ? `<g transform="translate(1260 70) scale(.6)" class="pop">${politicianSvg({mood:'smug',money:true})}</g>` : ''}
        ${step >= 2 ? `<g stroke="${C.red}" stroke-width="10" fill="none" class="draw-line"><path d="M430 220 C560 180 610 190 700 220"/><path d="M1030 250 C1160 190 1200 190 1290 220"/></g>` : ''}
        ${step >= 3 ? `<g transform="translate(250 480)" class="slide-left">
          <circle cx="120" cy="100" r="95" fill="#fff" stroke="${C.ink}" stroke-width="10"/>
          <path d="M35 240 Q120 145 205 240" fill="${C.blue}" stroke="${C.ink}" stroke-width="10"/>
          <path d="M55 105 Q120 160 185 105" fill="none" stroke="${C.ink}" stroke-width="9"/>
          <rect x="45" y="82" width="150" height="20" rx="8" fill="${C.red}" transform="rotate(-6 120 92)"/>
          <text x="250" y="105" font-size="45">CALLA</text>
        </g>` : ''}
        ${step >= 4 ? `<g transform="translate(970 505) rotate(-3)" class="shake"><rect width="500" height="155" rx="24" fill="${C.paper}" stroke="${C.red}" stroke-width="12"/><text x="250" y="98" text-anchor="middle" font-size="58" fill="${C.red}">SE VUELVE NORMAL</text></g>` : ''}
      </svg>
    </div>
  </div>`;
}

function silenceScene(local) {
  const step = Math.floor(local / 2.4);
  return `<div class="full-scene fade">
    <div class="scene-title">Silencio = impunidad</div>
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(110 240) scale(.75)" class="slide-left">${politicianSvg({mood:'smug',money:true})}</g>
      ${step >= 1 ? `<g transform="translate(770 250)" class="pop">
        <circle cx="220" cy="180" r="130" fill="#fff" stroke="${C.ink}" stroke-width="12"/>
        <path d="M115 430 Q220 290 325 430" fill="${C.blue}" stroke="${C.ink}" stroke-width="12"/>
        <rect x="120" y="170" width="200" height="24" rx="10" fill="${C.red}" transform="rotate(-5 220 180)"/>
        <text x="220" y="560" text-anchor="middle" font-size="54">EL PUEBLO CALLA</text>
      </g>` : ''}
      ${step >= 2 ? `<path class="draw-line" d="M1240 520 H1450" fill="none" stroke="${C.red}" stroke-width="15"/>
        <g transform="translate(1390 370) rotate(-4)" class="shake">
          <rect width="450" height="210" rx="28" fill="${C.paper}" stroke="${C.red}" stroke-width="14"/>
          <text x="225" y="130" text-anchor="middle" font-size="76" fill="${C.red}">IMPUNIDAD</text>
        </g>` : ''}
    </svg>
  </div>`;
}

function houseScene(local) {
  const step = Math.min(4, Math.floor(local / 4));
  return `<div class="full-scene fade">
    <div class="scene-title">La casa del pueblo</div>
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(500 190)" class="pop">
        <path d="M60 260 L470 35 L880 260" fill="${C.red}" stroke="${C.ink}" stroke-width="14" stroke-linejoin="round"/>
        <rect x="110" y="260" width="720" height="600" fill="${C.paper}" stroke="${C.ink}" stroke-width="14"/>
        <line x1="470" y1="260" x2="470" y2="860" stroke="${C.ink}" stroke-width="10"/>
        <line x1="110" y1="560" x2="830" y2="560" stroke="${C.ink}" stroke-width="10"/>
        <rect x="190" y="350" width="190" height="130" fill="${C.blue}" stroke="${C.ink}" stroke-width="10"/>
        <rect x="560" y="610" width="160" height="250" fill="#8a5a2b" stroke="${C.ink}" stroke-width="10"/>
      </g>
      ${step >= 1 ? `<g transform="translate(280 250)" class="slide-left">${politicianSvg({mood:'smug',scale:.55})}<text x="180" y="690" text-anchor="middle" font-size="42">TIENE LAS LLAVES</text></g>` : ''}
      ${step >= 2 ? `<g transform="translate(610 360) rotate(-5)" class="shake"><rect width="310" height="110" rx="18" fill="${C.paper}" stroke="${C.red}" stroke-width="10"/><text x="155" y="72" text-anchor="middle" font-size="46" fill="${C.red}">SE VENDE</text></g>` : ''}
      ${step >= 3 ? `<g transform="translate(650 675)" class="pop"><path d="M0 150 V70 Q120 0 240 70 V150" fill="${C.purple}" stroke="${C.ink}" stroke-width="10"/><text x="120" y="220" text-anchor="middle" font-size="40">EN ALQUILER</text></g>` : ''}
      ${step >= 4 ? `<g transform="translate(1120 650)" class="pop"><rect width="250" height="170" rx="14" fill="${C.gold}" stroke="${C.ink}" stroke-width="10"/><rect x="70" y="55" width="110" height="70" fill="#fff" stroke="${C.ink}" stroke-width="8"/><text x="125" y="105" text-anchor="middle" font-size="34">PEAJE</text></g>` : ''}
    </svg>
  </div>`;
}

function candidateScene(local) {
  const step = Math.min(5, Math.floor(local / 3.2));
  const words = [
    ['PUEBLO', 230, 250, C.green], ['FUTURO', 230, 480, C.gold], ['TRANSPARENCIA', 190, 710, C.blue],
    ['DESARROLLO', 1390, 250, C.green], ['CAMBIO', 1430, 480, C.red], ['JUSTICIA', 1430, 710, C.purple],
  ];
  return `<div class="full-scene fade">
    <div class="scene-title">El candidato ejemplar</div>
    <svg viewBox="0 0 1920 1080" style="position:absolute;inset:0;width:100%;height:100%">
      <g transform="translate(735 240) scale(.78)" class="pop">${politicianSvg({mood:'smug',thin:true})}</g>
      <g transform="translate(660 170)" class="pop"><rect width="600" height="120" rx="25" fill="${C.paper}" stroke="${C.ink}" stroke-width="10"/><text x="300" y="78" text-anchor="middle" font-size="44">“Vengo a servir al pueblo”</text></g>
      ${words.map((w, i) => step >= Math.ceil((i+1)/1.2) ? `<g transform="translate(${w[1]} ${w[2]})" class="pop"><rect x="-20" y="-55" width="330" height="110" rx="22" fill="${C.paper}" stroke="${C.ink}" stroke-width="9"/><circle cx="25" cy="0" r="28" fill="${w[3]}" stroke="${C.ink}" stroke-width="7"/><text x="80" y="16" font-size="38">${w[0]}</text></g>` : '').join('')}
    </svg>
  </div>`;
}

const scenes = [
  {id:'title', from:0, to:4, full:true, render:() => titleScene()},
  {id:'father-intro', from:4, to:17, full:false, render:(t) => presenterOverlay(t,'intro')},
  {id:'power', from:17, to:27, full:true, render:(t) => powerScene(t-17)},
  {id:'father-thesis', from:27, to:47, full:false, render:(t) => presenterOverlay(t,'thesis')},
  {id:'danger', from:47, to:69, full:true, render:(t) => detectiveScene(t-47)},
  {id:'silence', from:69, to:80, full:true, render:(t) => silenceScene(t-69)},
  {id:'house', from:80, to:100, full:true, render:(t) => houseScene(t-80)},
  {id:'candidate', from:100, to:120.001, full:true, render:(t) => candidateScene(t-100)},
];

function renderAt(t, force = false) {
  const scene = scenes.find((s) => t >= s.from && t < s.to) || scenes.at(-1);
  const beat = Math.floor((t - scene.from) * 4);
  const key = `${scene.id}:${beat}`;
  if (!force && key === lastKey) return;
  lastKey = key;
  video.style.opacity = scene.full ? '0' : '1';
  shade.style.opacity = scene.full ? '0' : '1';
  sceneLayer.innerHTML = scene.render(t);
  fxLayer.innerHTML = '';
  hudLayer.innerHTML = '';
}

function tick() {
  const t = Math.min(video.currentTime || 0, LIMIT);
  renderAt(t);
  seek.value = String(t);
  timecode.textContent = `${fmt(t)} / 02:00.0`;
  playBtn.textContent = video.paused ? 'Reproducir' : 'Pausar';
  if (t >= LIMIT) {
    video.pause();
    if (recording) exitRecordMode();
  }
  raf = requestAnimationFrame(tick);
}

async function togglePlay() {
  if (video.currentTime >= LIMIT) video.currentTime = 0;
  if (video.paused) await video.play(); else video.pause();
}

function restart() {
  video.pause();
  video.currentTime = 0;
  lastKey = '';
  renderAt(0, true);
}

async function enterFullscreen() {
  if (!document.fullscreenElement) await wrap.requestFullscreen();
  else await document.exitFullscreen();
  setTimeout(resizeStage, 100);
}

async function startRecordMode() {
  recording = true;
  document.body.classList.add('recording');
  restart();
  await enterFullscreen();
  const el = document.createElement('div');
  el.className = 'countdown';
  stage.appendChild(el);
  for (const n of [3, 2, 1]) {
    el.textContent = n;
    await new Promise((r) => setTimeout(r, 850));
  }
  el.remove();
  await video.play();
}

function exitRecordMode() {
  recording = false;
  document.body.classList.remove('recording');
}

playBtn.addEventListener('click', togglePlay);
restartBtn.addEventListener('click', restart);
fullscreenBtn.addEventListener('click', enterFullscreen);
recordBtn.addEventListener('click', startRecordMode);
seek.addEventListener('input', () => {
  video.currentTime = Number(seek.value);
  renderAt(video.currentTime, true);
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.key.toLowerCase() === 'f') enterFullscreen();
  if (e.key === 'Escape') exitRecordMode();
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) exitRecordMode();
  setTimeout(resizeStage, 100);
});

video.addEventListener('error', () => { missing.hidden = false; });
video.addEventListener('loadedmetadata', () => {
  missing.hidden = true;
  video.currentTime = 0;
  renderAt(0, true);
});

renderAt(0, true);
raf = requestAnimationFrame(tick);
