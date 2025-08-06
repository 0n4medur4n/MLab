# 🚀 Guía de Despliegue - MLab Valencia

## 📋 Información del Proyecto

- **Proyecto Firebase**: `mlab-1e9ff`
- **URL de Producción**: https://mlab-1e9ff.web.app
- **Consola Firebase**: https://console.firebase.google.com/project/mlab-1e9ff/overview

## 🛠️ Configuración Inicial

### Prerrequisitos

1. **Node.js** (versión 18 o superior)
2. **Firebase CLI** instalado globalmente:
   ```bash
   npm install -g firebase-tools
   ```

3. **Autenticación con Firebase**:
   ```bash
   firebase login
   ```

## 🚀 Métodos de Despliegue

### Método 1: Script NPM (Recomendado)

```bash
# Despliegue rápido
npm run deploy

# Despliegue con script de Windows
npm run deploy:windows

# Despliegue con script de Unix/Linux
npm run deploy:unix
```

### Método 2: Comandos Manuales

```bash
# 1. Instalar dependencias
npm ci

# 2. Construir el proyecto
npm run build

# 3. Desplegar a Firebase
firebase deploy
```

### Método 3: Scripts Directos

**Windows (PowerShell):**
```powershell
.\deploy.ps1
```

**Unix/Linux/macOS:**
```bash
./deploy.sh
```

## 🔧 Configuración de Firebase

### Archivos de Configuración

- **firebase.json**: Configuración principal de Firebase Hosting
- **.firebaserc**: Configuración del proyecto Firebase
- **.github/workflows/**: Workflows de GitHub Actions para CI/CD automático

### Configuración Actual

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 🔍 Verificación del Despliegue

1. **Verificar Build Local**:
   ```bash
   npm run preview
   ```

2. **Verificar en Firebase**:
   ```bash
   firebase serve
   ```

3. **Acceder a la URL de Producción**:
   https://mlab-1e9ff.web.app

## 🚨 Solución de Problemas

### Error de Autenticación
```bash
firebase login --reauth
```

### Error de Build
```bash
# Limpiar cache y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error de Permisos (Windows)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📊 Monitoreo y Analytics

- **Firebase Console**: https://console.firebase.google.com/project/mlab-1e9ff
- **Hosting Metrics**: Disponible en la consola de Firebase
- **Performance Monitoring**: Configurado automáticamente

## 🔄 CI/CD Automático

El proyecto incluye workflows de GitHub Actions que se ejecutan automáticamente:

- **Pull Request**: Despliegue a preview channel
- **Merge a main**: Despliegue a producción

## 📝 Notas Importantes

1. **Siempre hacer build antes de desplegar** para asegurar que los cambios estén incluidos
2. **Verificar que todas las dependencias estén instaladas** antes del build
3. **El directorio de salida es `dist`** (configurado en vite.config.js)
4. **Las rutas están configuradas para SPA** (Single Page Application)

## 🆘 Contacto y Soporte

Para problemas con el despliegue, contactar al equipo de desarrollo o revisar la documentación de Firebase Hosting.