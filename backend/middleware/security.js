const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");

const securityMiddleware = (app) => {
  // Configuración básica de Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://www.googletagmanager.com",
            "https://www.google-analytics.com",
            "https://ssl.google-analytics.com",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          imgSrc: [
            "'self'",
            "data:",
            "https:",
            "https://www.google-analytics.com",
            "https://ssl.gstatic.com",
            "https://www.gstatic.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          connectSrc: [
            "'self'",
            "https://api.monkeybusinessvalencia.com",
            "https://www.google-analytics.com",
            "https://api.openweathermap.org",
            "https://api.timezonedb.com",
            "https://analytics.google.com",
            "https://*.analytics.google.com",
            "https://*.google-analytics.com",
          ],
          frameSrc: ["'self'", "https://www.google.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: { policy: "cross-origin" },
      // Configuraciones adicionales de seguridad
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      noSniff: true, // X-Content-Type-Options
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // límite de 100 peticiones por ventana
    message:
      "Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos",
  });

  // CORS configuración
  const corsOptions = {
    origin: ["http://localhost:5173", "https://monkeybusinessvalencia.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 600,
  };

  app.use(cors(corsOptions));
  app.use("/api", limiter);
  app.use(xss()); // Previene XSS
  app.use(mongoSanitize()); // Previene NoSQL injection
  app.use(hpp()); // Previene HTTP Parameter Pollution
};

module.exports = securityMiddleware;
