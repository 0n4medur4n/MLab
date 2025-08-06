require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const emailRoutes = require("./src/routes/email.routes");
const securityMiddleware = require("./middleware/security");
const errorHandler = require("./middleware/errorHandler");
const { validateContact } = require("./middleware/validator");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middlewares de seguridad
securityMiddleware(app);

// Routes
app.use("/api", emailRoutes);

// Rutas con validación
app.post("/api/send-email", validateContact, async (req, res, next) => {
  try {
    // Tu lógica actual
  } catch (error) {
    next(error);
  }
});

// Middleware de manejo de errores
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
