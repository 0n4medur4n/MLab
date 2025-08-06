# Audio Assets

## Música de Fondo

Para añadir música de fondo a la aplicación:

1. **Coloca tu archivo de audio** en esta carpeta (`src/assets/audio/`)
2. **Formatos recomendados**: MP3, WAV, OGG
3. **Nombre sugerido**: `background-music.mp3` o `ambient-sound.mp3`

## Configuración

Una vez que tengas tu archivo de audio:

1. Ve al archivo `src/components/BackgroundMusic.jsx`
2. Busca la línea que dice:
   ```jsx
   {/* <source src="/src/assets/audio/background-music.mp3" type="audio/mpeg" /> */}
   ```
3. Descomenta y actualiza la ruta con el nombre de tu archivo:
   ```jsx
   <source src="/src/assets/audio/tu-archivo.mp3" type="audio/mpeg" />
   ```
4. Comenta o elimina la línea del placeholder:
   ```jsx
   {/* <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" /> */}
   ```

## Características

- ✅ **Autoplay**: La música comienza automáticamente con el loader
- ✅ **Loop**: Se reproduce en bucle continuo
- ✅ **Controles**: Botón play/pause y control de volumen
- ✅ **Volumen por defecto**: 30% para no ser intrusivo
- ✅ **Responsive**: Los controles se adaptan a diferentes pantallas

## Recomendaciones

- **Duración**: 2-5 minutos para evitar repetición frecuente
- **Volumen**: Música ambiental suave, no muy alta
- **Tema**: Que coincida con la estética "underground" y "scary" de MLab
- **Tamaño**: Optimiza el archivo para web (< 5MB recomendado)

## Troubleshooting

Si la música no se reproduce automáticamente:
- Los navegadores modernos bloquean autoplay por defecto
- Los controles aparecerán automáticamente para que el usuario pueda iniciar la música
- Esto es comportamiento normal y esperado