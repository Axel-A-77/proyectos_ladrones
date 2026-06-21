// Transcribe el audio con timestamps POR PALABRA (Whisper vía transformers.js)
// -> src/data/words.json  [{word, start, end} en segundos].
// Uso: node scripts/transcribe.mjs [archivo.wav]
import {pipeline, env} from '@xenova/transformers';
import wavefilePkg from 'wavefile';
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';

const {WaveFile} = wavefilePkg;

env.allowLocalModels = false;

const root = process.cwd();
const wavPath = process.argv[2] || path.join(root, 'masters/papa_6min.wav');
const outPath = path.join(root, 'src/data/words.json');

console.log('Leyendo', wavPath);
const wav = new WaveFile(readFileSync(wavPath));
wav.toBitDepth('32f');
wav.toSampleRate(16000);
let samples = wav.getSamples();
if (Array.isArray(samples)) samples = samples[0];
samples = Float32Array.from(samples);

console.log('Cargando modelo whisper-base…');
const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base');

console.log('Transcribiendo', (samples.length / 16000).toFixed(0), 's de audio…');
const out = await transcriber(samples, {
  language: 'spanish',
  task: 'transcribe',
  return_timestamps: 'word',
  chunk_length_s: 30,
  stride_length_s: 5,
});

const words = (out.chunks || [])
  .map((c) => ({word: (c.text || '').trim(), start: c.timestamp[0], end: c.timestamp[1]}))
  .filter((w) => w.word && w.start != null);

writeFileSync(outPath, JSON.stringify(words));
console.log(`OK: ${words.length} palabras -> ${outPath}`);
