#!/bin/bash
# Script de despliegue para Firebase Hosting
# MLab Valencia - Firebase Deployment Script

echo "🚀 Iniciando despliegue de MLab Valencia..."

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio frontend."
    exit 1
fi

# Instalar dependencias si es necesario
echo "📦 Verificando dependencias..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias."
    exit 1
fi

# Construir el proyecto
echo "🔨 Construyendo el proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build del proyecto."
    exit 1
fi

# Desplegar a Firebase
echo "🌐 Desplegando a Firebase Hosting..."
firebase deploy

if [ $? -ne 0 ]; then
    echo "❌ Error en el despliegue a Firebase."
    exit 1
fi

echo "✅ ¡Despliegue completado exitosamente!"
echo "🌍 Tu aplicación está disponible en: https://mlab-1e9ff.web.app"
echo "📊 Consola de Firebase: https://console.firebase.google.com/project/mlab-1e9ff/overview"