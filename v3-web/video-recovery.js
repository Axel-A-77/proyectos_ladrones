const video = document.getElementById('presenter');
const missing = document.getElementById('missing-video');

function hideError() {
  missing.hidden = true;
  missing.style.display = 'none';
}

function showError() {
  if (video.readyState >= 1) {
    hideError();
    return;
  }
  missing.hidden = false;
  missing.style.display = 'grid';
}

video.innerHTML = '';
video.src = '/assets/video/papa_web.mp4?v=4';
video.preload = 'auto';

video.addEventListener('loadedmetadata', hideError);
video.addEventListener('loadeddata', hideError);
video.addEventListener('canplay', hideError);
video.addEventListener('playing', hideError);
video.addEventListener('error', () => setTimeout(showError, 1200));

hideError();
video.load();
setTimeout(showError, 5000);
