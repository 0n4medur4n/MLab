# Script de despliegue para Firebase Hosting
# MLab Valencia - Firebase Deployment Script

Write-Host "🚀 Iniciando despliegue de MLab Valencia..." -ForegroundColor Green

# Verificar si estamos en el directorio correcto
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio frontend." -ForegroundColor Red
    exit 1
}

# Instalar dependencias si es necesario
Write-Host "📦 Verificando dependencias..." -ForegroundColor Yellow
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al instalar dependencias." -ForegroundColor Red
    exit 1
}

# Construir el proyecto
Write-Host "🔨 Construyendo el proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el build del proyecto." -ForegroundColor Red
    exit 1
}

# Desplegar a Firebase
Write-Host "🌐 Desplegando a Firebase Hosting..." -ForegroundColor Yellow
firebase deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en el despliegue a Firebase." -ForegroundColor Red
    exit 1
}

Write-Host "✅ ¡Despliegue completado exitosamente!" -ForegroundColor Green
Write-Host "🌍 Tu aplicación está disponible en: https://mlab-1e9ff.web.app" -ForegroundColor Cyan
Write-Host "📊 Consola de Firebase: https://console.firebase.google.com/project/mlab-1e9ff/overview" -ForegroundColor Cyan