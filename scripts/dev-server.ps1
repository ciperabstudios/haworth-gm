$ErrorActionPreference = "Stop"

$exe = "omp-server.exe"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$serverPath = Join-Path $root ".."
$bundlePath = Join-Path $serverPath "dist\bundle.js"
$shutdownFile = Join-Path $serverPath ".shutdown"

Set-Location $serverPath

Write-Host "[DEV] Hot-reload server supervisor started" -ForegroundColor Cyan

# Función para detener el servidor
function Stop-OmpServer {
    $process = Get-Process omp-server -ErrorAction SilentlyContinue
    if ($process) {
        Write-Host "[DEV] Sending shutdown signal..." -ForegroundColor Yellow
        
        # Crear archivo de señal
        New-Item -Path $shutdownFile -ItemType File -Force | Out-Null
        
        # Esperar hasta 10 segundos para shutdown graceful
        $timeout = 10
        $elapsed = 0
        
        while (-not $process.HasExited -and $elapsed -lt $timeout) {
            Start-Sleep -Milliseconds 500
            $elapsed += 0.5
            $process = Get-Process omp-server -ErrorAction SilentlyContinue
            if (-not $process) { break }
        }
        
        # Si no se cerró, forzar
        $stillRunning = Get-Process omp-server -ErrorAction SilentlyContinue
        if ($stillRunning) {
            Write-Host "[DEV] Graceful shutdown timeout, forcing kill..." -ForegroundColor Red
            $stillRunning | Stop-Process -Force
        } else {
            Write-Host "[DEV] omp-server stopped gracefully" -ForegroundColor Green
        }
        
        # Limpiar archivo de señal si quedó
        if (Test-Path $shutdownFile) {
            Remove-Item $shutdownFile -Force -ErrorAction SilentlyContinue
        }
        
        Start-Sleep -Milliseconds 500
    }
}

# Función para iniciar el servidor
function Start-OmpServer {
    Write-Host "[DEV] Starting omp-server..." -ForegroundColor Cyan
    
    $process = Start-Process `
        -FilePath ".\$exe" `
        -NoNewWindow `
        -PassThru
    
    Write-Host "[DEV] omp-server started (PID: $($process.Id))" -ForegroundColor Green
    return $process
}

# Capturar Ctrl+C del supervisor
$null = Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action {
    Write-Host "`n[DEV] Supervisor interrupted, cleaning up..." -ForegroundColor Yellow
    Stop-OmpServer
}

# Detener cualquier instancia previa
Stop-OmpServer

# Esperar a que exista el bundle inicial
Write-Host "[DEV] Waiting for initial build (dist/bundle.js)..." -ForegroundColor Cyan
while (-not (Test-Path $bundlePath)) {
    Start-Sleep -Milliseconds 500
}
Write-Host "[DEV] Initial build detected" -ForegroundColor Green

# Iniciar el servidor
$serverProcess = Start-OmpServer
$lastWriteTime = (Get-Item $bundlePath).LastWriteTime

# Monitorear cambios en el bundle
Write-Host "[DEV] Watching for changes in dist/bundle.js..." -ForegroundColor Cyan

try {
    while ($true) {
        Start-Sleep -Milliseconds 500
        
        # Verificar si el proceso sigue corriendo
        if ($serverProcess.HasExited) {
            $exitCode = $serverProcess.ExitCode

            # Convertir a hexadecimal para Windows error codes
            $hexCode = "0x{0:X}" -f [uint32]$exitCode
            
            Write-Host "[DEV] omp-server exited" -ForegroundColor Red
            Write-Host "  Exit Code (decimal): $exitCode" -ForegroundColor Yellow
            Write-Host "  Exit Code (hex): $hexCode" -ForegroundColor Yellow

            # Identificar códigos conocidos
            switch ($exitCode) {
                3221226505 { Write-Host "  Error: Stack Buffer Overrun (Memory Corruption)" -ForegroundColor Red }
                3221225477 { Write-Host "  Error: Access Violation" -ForegroundColor Red }
                3221225725 { Write-Host "  Error: Ordinal Not Found (DLL issue)" -ForegroundColor Red }
                1 { Write-Host "  Error: General Application Error" -ForegroundColor Red }
                0 { Write-Host "  Info: Normal Exit" -ForegroundColor Green }
            }
            
            Write-Host "[DEV] Restarting in 2 seconds..." -ForegroundColor Yellow
            Start-Sleep -Seconds 2
            $serverProcess = Start-OmpServer
            continue
        }
        
        # Verificar si el bundle fue modificado
        if (Test-Path $bundlePath) {
            $currentWriteTime = (Get-Item $bundlePath).LastWriteTime
            
            if ($currentWriteTime -gt $lastWriteTime) {
                Write-Host "[DEV] Bundle updated, reloading..." -ForegroundColor Yellow
                $lastWriteTime = $currentWriteTime
                
                # Detener y reiniciar el servidor
                Stop-OmpServer
                Start-Sleep -Milliseconds 500
                $serverProcess = Start-OmpServer
            }
        }
    }
} finally {
    Write-Host "[DEV] Cleaning up..." -ForegroundColor Yellow
    Stop-OmpServer
}