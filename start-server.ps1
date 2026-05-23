# Simple HTTP server for the 3D website
# Double-click or run: powershell -ExecutionPolicy Bypass -File start-server.ps1

$port = 3001
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  Server running at: http://localhost:$port" -ForegroundColor Green
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

Start-Process "http://localhost:$port"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response

    $urlPath = $req.Url.LocalPath.TrimStart('/')
    if ($urlPath -eq '') { $urlPath = 'index.html' }

    $filePath = Join-Path $root $urlPath

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime = switch ($ext) {
        '.html'  { 'text/html; charset=utf-8' }
        '.css'   { 'text/css' }
        '.js'    { 'application/javascript' }
        '.webp'  { 'image/webp' }
        '.png'   { 'image/png' }
        '.jpg'   { 'image/jpeg' }
        '.svg'   { 'image/svg+xml' }
        '.mp4'   { 'video/mp4' }
        default  { 'application/octet-stream' }
      }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType   = $mime
      $res.ContentLength64 = $bytes.Length
      $res.StatusCode    = 200
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $res.OutputStream.Close()
  }
} finally {
  $listener.Stop()
}


