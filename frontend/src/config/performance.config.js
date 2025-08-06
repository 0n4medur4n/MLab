// Configuración de optimización de rendimiento para MLab

// Configuración de carga diferida para imágenes
export const lazyLoadingConfig = {
  threshold: 0.1,
  rootMargin: "50px",
};

// Configuración de compresión de imágenes
export const imageOptimizationConfig = {
  quality: 80,
  format: "webp",
  responsiveSizes: [320, 640, 1024, 1920],
};

// Configuración de cache
export const cacheConfig = {
  staticAssets: {
    maxAge: "1y",
    etag: true,
  },
  apiResponses: {
    maxAge: "5m",
    staleWhileRevalidate: "1h",
  },
};

// Configuración de preloading
export const preloadConfig = {
  criticalImages: [
    "/assets/images/MonkeyBusinessLogo.png",
    "/assets/images/founders.webp",
    // Agregar otras imágenes críticas
  ],
  criticalFonts: [
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700",
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600",
  ],
  criticalScripts: [
    // Scripts críticos para el renderizado inicial
  ],
};

// Configuración de indexabilidad
export const indexingConfig = {
  crawlableRoutes: ["/", "/about", "/events", "/contact", "/declaration"],
  noIndexRoutes: [
    // Rutas que no deben ser indexadas
  ],
  canonicalBaseUrl: "https://monkeybusinessvalencia.com",
};

// Configuración de estructura de URLs
export const urlStructureConfig = {
  trailingSlash: false,
  lowercase: true,
  removeExtensions: true,
};

// Configuración de accesibilidad
export const accessibilityConfig = {
  minimumContrastRatio: 4.5,
  focusVisible: true,
  skipLinks: true,
};
