import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), "");

  const plugins = [react()];

  // Solo añadir plugins en producción
  if (mode === "production") {
    // PWA Plugin
    plugins.push(
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
        manifest: {
          name: "MLab Valencia",
          short_name: "MLab",
          description: "Eventos y experiencias únicas en Valencia",
          theme_color: "#000000",
          background_color: "#000000",
          display: "standalone",
          icons: [
            {
              src: "/assets/images/MonkeyBusinessLogo.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
        },
      })
    );

    // Compression Plugin
    plugins.push(
      compression({
        algorithm: "brotli",
        exclude: [/\.(br)$/, /\.(gz)$/, /\.(png|jpe?g|gif|webp)$/i],
        deleteOriginalAssets: false,
      })
    );
  }

  // Visualizer Plugin (solo en modo análisis)
  if (mode === "analyze") {
    plugins.push(
      visualizer({
        open: true,
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return {
    plugins,

    // Resolución de alias
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@styles": path.resolve(__dirname, "./src/styles"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@context": path.resolve(__dirname, "./src/context"),
      },
    },

    // Configuración del servidor de desarrollo
    server: {
      port: 5175,
      strictPort: false,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Configuración de build
    build: {
      outDir: "dist",
      sourcemap: mode !== "production",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            i18n: ["i18next", "react-i18next"],
            animations: ["framer-motion"],
          },
        },
      },
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: mode === "production",
        },
      },
    },

    // Optimizaciones generales
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "i18next"],
    },

    // CSS
    css: {
      devSourcemap: true,
      modules: {
        scopeBehavior: "local",
        localsConvention: "camelCase",
      },
    },

    // Configuración de preview
    preview: {
      port: 5175,
      strictPort: false,
    },
  };
});
