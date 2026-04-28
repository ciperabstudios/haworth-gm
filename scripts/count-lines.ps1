 # Script para contar líneas de código en archivos .ts

# Ruta de la carpeta src (puedes modificarla)
$srcPath = ".\src"

# Verificar que la carpeta existe
if (-Not (Test-Path $srcPath)) {
    Write-Host "Error: La carpeta '$srcPath' no existe." -ForegroundColor Red
    exit
}

# Obtener todos los archivos .ts de forma recursiva
$tsFiles = Get-ChildItem -Path $srcPath -Filter "*.ts" -Recurse -File

# Verificar si se encontraron archivos
if ($tsFiles.Count -eq 0) {
    Write-Host "No se encontraron archivos .ts en '$srcPath'" -ForegroundColor Yellow
    exit
}

# Inicializar contadores
$totalLines = 0
$totalFiles = 0

Write-Host "`nAnalizando archivos TypeScript en: $srcPath`n" -ForegroundColor Cyan
Write-Host "=" * 80

# Procesar cada archivo
foreach ($file in $tsFiles) {
    $lines = (Get-Content $file.FullName -ErrorAction SilentlyContinue).Count
    $totalLines += $lines
    $totalFiles++
    
    # Mostrar información de cada archivo
    $relativePath = $file.FullName.Replace((Get-Location).Path, ".")
    Write-Host "$relativePath" -ForegroundColor Gray
    Write-Host "  Líneas: $lines" -ForegroundColor White
}

# Mostrar resumen
Write-Host "`n" ("=" * 80)
Write-Host "`nRESUMEN:" -ForegroundColor Green
Write-Host "  Total de archivos .ts: $totalFiles"
Write-Host "  Total de líneas de código: $totalLines"
Write-Host ""