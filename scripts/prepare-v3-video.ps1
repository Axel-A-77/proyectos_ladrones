$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$source = Join-Path $root 'assets\video\papa_h264.mp4'
$output = Join-Path $root 'assets\video\papa_web.mp4'

if (-not (Test-Path $source)) {
  Write-Host "No se encontro el video de origen:" -ForegroundColor Red
  Write-Host $source
  exit 1
}

$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
  Write-Host "FFmpeg no esta instalado o no esta en PATH." -ForegroundColor Yellow
  Write-Host "Ejecuta: winget search ffmpeg"
  Write-Host "Instala una version de FFmpeg, cierra PowerShell y vuelve a ejecutar este script."
  exit 2
}

Write-Host "Preparando una copia compatible con Edge/Chrome..." -ForegroundColor Cyan
Write-Host "Origen:  $source"
Write-Host "Salida:  $output"

& ffmpeg -y `
  -i $source `
  -map 0:v:0 `
  -map 0:a:0? `
  -c:v libx264 `
  -profile:v high `
  -level 4.1 `
  -pix_fmt yuv420p `
  -preset fast `
  -crf 20 `
  -c:a aac `
  -b:a 192k `
  -movflags +faststart `
  $output

if ($LASTEXITCODE -ne 0 -or -not (Test-Path $output)) {
  Write-Host "La conversion fallo." -ForegroundColor Red
  exit 3
}

$file = Get-Item $output
Write-Host "Video web creado correctamente:" -ForegroundColor Green
Write-Host $file.FullName
Write-Host ("Tamano: {0:N1} MB" -f ($file.Length / 1MB))
Write-Host "Ahora ejecuta: npm run v3:dev" -ForegroundColor Green
