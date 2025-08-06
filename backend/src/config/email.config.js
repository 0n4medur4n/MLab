const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("🔧 Configurando transporter de email...");
console.log("📨 Email configurado:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verificar la configuración
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Error en la configuración del email:", error);
  } else {
    console.log("✅ Servidor listo para enviar emails");
  }
});

module.exports = transporter;
