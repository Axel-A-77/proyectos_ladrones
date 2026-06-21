const wrap = document.querySelector('#stage-wrap');
const stage = document.querySelector('#stage');
const video = document.querySelector('#presenter');
const artFrame = document.querySelector('#art-frame');
const artImage = document.querySelector('#art-image');
const artTitle = document.querySelector('#art-title');
const fatherOverlay = document.querySelector('#father-overlay');
const fatherPanelImage = document.querySelector('#father-panel-image');
const lowerThird = document.querySelector('#lower-third');
const badge = document.querySelector('#scene-badge');
const focusRing = document.querySelector('#focus-ring');
const missing = document.querySelector('#missing-video');
const playBtn = document.querySelector('#play');
const restartBtn = document.querySelector('#restart');
const fullscreenBtn = document.querySelector('#fullscreen');
const recordBtn = document.querySelector('#record');
const seek = document.querySelector('#seek');
const timecode = document.querySelector('#timecode');

const LIMIT = 120;
let activeScene = '';
let activePhase = -1;
let recording = false;
let raf = 0;

const assets = {
  title: './assets/title-corrupt-politician.svg',
  power: './assets/power-botin.svg',
  board: './assets/detective-board.svg',
  silence: './assets/silence-impunity.svg',
  house: './assets/house-public.svg',
  candidate: './assets/candidate-promises.svg',
};

Object.values(assets).forEach((src) => {
  const img = new Image();
  img.src = src;
});

const scenes = [
  {id:'title', from:0, to:4, mode:'title', asset:assets.title, label:'PORTADA'},
  {id:'father-intro', from:4, to:17, mode:'father', panel:assets.title, label:'INTRODUCCIÓN'},
  {id:'power', from:17, to:27, mode:'art', asset:assets.power, label:'EL PODER COMO BOTÍN'},
  {id:'father-thesis', from:27, to:47, mode:'father', panel:assets.board, label:'REFLEXIÓN'},
  {id:'board', from:47, to:69, mode:'art', asset:assets.board, label:'PIZARRA DE LA CORRUPCIÓN'},
  {id:'silence', from:69, to:80, mode:'art', asset:assets.silence, label:'SILENCIO = IMPUNIDAD'},
  {id:'house', from:80, to:100, mode:'art', asset:assets.house, label:'LA CASA DEL PUEBLO'},
  {id:'candidate', from:100, to:120.001, mode:'art', asset:assets.candidate, label:'EL CANDIDATO EJEMPLAR'},
];

function resizeStage() {
  const rect = wrap.getBoundingClientRect();
  const scale = Math.min(rect.width / 1920, rect.height / 1080);
  stage.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizeStage);
resizeStage();

function formatTime(value) {
  const m = Math.floor(value / 60);
  const s = Math.floor(value % 60);
  const d = Math.floor((value % 1) * 10);
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${d}`;
}

function sceneAt(t) {
  return scenes.find((scene) => t >= scene.from && t < scene.to) || scenes.at(-1);
}

function phaseFor(scene, local) {
  if (scene.id === 'power') return local < 3.2 ? 0 : local < 6.4 ? 1 : 2;
  if (scene.id === 'board') return local < 4 ? 0 : local < 8 ? 1 : local < 13.5 ? 2 : local < 18.5 ? 3 : 4;
  if (scene.id === 'silence') return local < 4 ? 0 : local < 8 ? 1 : 2;
  if (scene.id === 'house') return local < 5 ? 0 : local < 10 ? 1 : local < 15 ? 2 : 3;
  if (scene.id === 'candidate') return local < 5 ? 0 : local < 10 ? 1 : local < 15 ? 2 : 3;
  if (scene.id === 'father-intro') return local < 6 ? 0 : 1;
  if (scene.id === 'father-thesis') return local < 7 ? 0 : local < 14 ? 1 : 2;
  return 0;
}

function resetLayers() {
  artFrame.classList.remove('visible');
  fatherOverlay.classList.remove('visible');
  badge.classList.remove('visible');
  focusRing.classList.remove('visible');
  video.style.opacity = '1';
  artTitle.innerHTML = '';
  artTitle.style.display = 'none';
  artImage.style.width = '1920px';
  artImage.style.height = '1080px';
  artImage.style.left = '0';
  artImage.style.top = '0';
  artImage.style.objectFit = 'contain';
  artImage.style.transform = 'translate(0px,0px) scale(1)';
  artImage.style.transformOrigin = 'center center';
}

function enterScene(scene) {
  resetLayers();
  activeScene = scene.id;
  activePhase = -1;
  badge.textContent = scene.label;
  badge.classList.add('visible');

  if (scene.mode === 'father') {
    video.style.opacity = '1';
    fatherPanelImage.src = scene.panel;
    fatherOverlay.classList.add('visible');
    return;
  }

  video.style.opacity = '0';
  artImage.src = scene.asset;
  artFrame.classList.add('visible');

  if (scene.mode === 'title') {
    artFrame.style.background = '#fffaf0';
    artImage.style.width = '1040px';
    artImage.style.height = '960px';
    artImage.style.left = '840px';
    artImage.style.top = '55px';
    artImage.style.objectFit = 'contain';
    artTitle.style.display = 'block';
    artTitle.innerHTML = 'LOS<br><span class="red">LADRONES</span><br>DE CUELLO<br>Y CORBATA';
  } else {
    artFrame.style.background = '#f4c95d';
  }
}

function updateFather(scene, phase) {
  if (scene.id === 'father-intro') {
    lowerThird.innerHTML = phase === 0
      ? '<span class="status-dot"></span>Una reflexión con humor'
      : '<span class="status-dot"></span>Y con <span class="accent">memoria</span>';
    fatherPanelImage.style.objectPosition = '58% center';
    fatherPanelImage.style.transform = phase === 0 ? 'scale(1.06)' : 'scale(1.16) translateY(-10px)';
  } else {
    const text = [
      'La patria no es una billetera',
      'El robo crece cuando nadie lo conecta',
      'El peligro es que parezca <span class="accent">normal</span>',
    ][phase];
    lowerThird.innerHTML = `<span class="status-dot"></span>${text}`;
    fatherPanelImage.style.objectPosition = phase === 0 ? '18% 22%' : phase === 1 ? '50% 65%' : '84% 72%';
    fatherPanelImage.style.transform = phase === 0 ? 'scale(1.32)' : phase === 1 ? 'scale(1.38)' : 'scale(1.42)';
  }
}

function updateArt(scene, phase) {
  let transform = 'translate(0px,0px) scale(1)';
  let origin = 'center center';
  focusRing.classList.remove('visible');

  if (scene.id === 'power') {
    const transforms = [
      'translate(0px,0px) scale(1)',
      'translate(0px,5px) scale(1.16)',
      'translate(-210px,10px) scale(1.25)',
    ];
    transform = transforms[phase];
  }

  if (scene.id === 'board') {
    const transforms = [
      'translate(0px,0px) scale(1)',
      'translate(-165px,110px) scale(1.42)',
      'translate(80px,-150px) scale(1.42)',
      'translate(-245px,-155px) scale(1.43)',
      'translate(0px,0px) scale(1)',
    ];
    transform = transforms[phase];
  }

  if (scene.id === 'silence') {
    const transforms = [
      'translate(90px,10px) scale(1.12)',
      'translate(-120px,15px) scale(1.19)',
      'translate(-250px,20px) scale(1.25)',
    ];
    transform = transforms[phase];
  }

  if (scene.id === 'house') {
    const transforms = [
      'translate(120px,15px) scale(1.14)',
      'translate(-40px,30px) scale(1.2)',
      'translate(-150px,-35px) scale(1.25)',
      'translate(0px,0px) scale(1)',
    ];
    transform = transforms[phase];
  }

  if (scene.id === 'candidate') {
    const transforms = [
      'translate(0px,0px) scale(1)',
      'translate(160px,0px) scale(1.18)',
      'translate(-160px,0px) scale(1.18)',
      'translate(0px,10px) scale(1.08)',
    ];
    transform = transforms[phase];
  }

  artImage.style.transformOrigin = origin;
  artImage.style.transform = transform;
}

function renderAt(t, force = false) {
  const scene = sceneAt(t);
  if (force || scene.id !== activeScene) enterScene(scene);
  const local = t - scene.from;
  const phase = phaseFor(scene, local);
  if (!force && phase === activePhase) return;
  activePhase = phase;
  if (scene.mode === 'father') updateFather(scene, phase);
  else updateArt(scene, phase);
}

async function togglePlay() {
  if (video.currentTime >= LIMIT) video.currentTime = 0;
  if (video.paused) await video.play();
  else video.pause();
}

function restart() {
  video.pause();
  video.currentTime = 0;
  activeScene = '';
  activePhase = -1;
  renderAt(0, true);
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) await wrap.requestFullscreen();
  else await document.exitFullscreen();
  setTimeout(resizeStage, 80);
}

async function startRecordingMode() {
  recording = true;
  document.body.classList.add('recording');
  restart();
  if (!document.fullscreenElement) await wrap.requestFullscreen();
  const countdown = document.createElement('div');
  countdown.className = 'countdown';
  stage.appendChild(countdown);
  for (const n of [3,2,1]) {
    countdown.textContent = n;
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  countdown.remove();
  await video.play();
}

function leaveRecordingMode() {
  recording = false;
  document.body.classList.remove('recording');
}

function loop() {
  const t = Math.min(video.currentTime || 0, LIMIT);
  renderAt(t);
  seek.value = String(t);
  timecode.textContent = `${formatTime(t)} / 02:00.0`;
  playBtn.textContent = video.paused ? 'Reproducir' : 'Pausar';
  if (t >= LIMIT) {
    video.pause();
    if (recording) leaveRecordingMode();
  }
  raf = requestAnimationFrame(loop);
}

playBtn.addEventListener('click', togglePlay);
restartBtn.addEventListener('click', restart);
fullscreenBtn.addEventListener('click', toggleFullscreen);
recordBtn.addEventListener('click', startRecordingMode);
seek.addEventListener('input', () => {
  video.currentTime = Number(seek.value);
  renderAt(video.currentTime, true);
});

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {event.preventDefault(); togglePlay();}
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
  if (event.key === 'Escape') leaveRecordingMode();
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) leaveRecordingMode();
  setTimeout(resizeStage, 80);
});

function showVideoError() {
  missing.hidden = false;
  missing.style.display = 'grid';
}
function hideVideoError() {
  missing.hidden = true;
  missing.style.display = 'none';
}

video.src = `/assets/video/papa_web.mp4?v=5`;
video.preload = 'auto';
video.addEventListener('loadedmetadata', () => {
  hideVideoError();
  video.currentTime = 0;
  renderAt(0, true);
});
video.addEventListener('canplay', hideVideoError);
video.addEventListener('error', showVideoError);
video.load();

renderAt(0, true);
raf = requestAnimationFrame(loop);
