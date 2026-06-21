import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const host = '127.0.0.1';
const port = Number(process.env.PORT || 4173);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

function resolveRequest(url = '/') {
  const pathname = decodeURIComponent(url.split('?')[0]);
  const requested = pathname === '/' || pathname === '/v3-web' || pathname === '/v3-web/'
    ? '/v3-web/index.html'
    : pathname;
  const file = path.resolve(root, `.${requested}`);
  if (!file.startsWith(root)) return null;
  return file;
}

function sendVideo(req, res, file, size) {
  const range = req.headers.range;
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'video/mp4');

  if (!range) {
    res.writeHead(200, {'Content-Length': size});
    fs.createReadStream(file).pipe(res);
    return;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) {
    res.writeHead(416, {'Content-Range': `bytes */${size}`});
    res.end();
    return;
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) {
    res.writeHead(416, {'Content-Range': `bytes */${size}`});
    res.end();
    return;
  }

  res.writeHead(206, {
    'Content-Length': end - start + 1,
    'Content-Range': `bytes ${start}-${end}/${size}`,
  });
  fs.createReadStream(file, {start, end}).pipe(res);
}

const server = http.createServer((req, res) => {
  try {
    const file = resolveRequest(req.url);
    if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Archivo no encontrado');
      return;
    }

    const stat = fs.statSync(file);
    const ext = path.extname(file).toLowerCase();
    if (ext === '.mp4') {
      sendVideo(req, res, file, stat.size);
      return;
    }

    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(file).pipe(res);
  } catch (error) {
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(error instanceof Error ? error.message : String(error));
  }
});

server.listen(port, host, () => {
  console.log(`V3 lista en http://${host}:${port}/v3-web/`);
  console.log('Video esperado: assets/video/papa_h264.mp4');
  console.log('Presiona Ctrl+C para detener el servidor.');
});
