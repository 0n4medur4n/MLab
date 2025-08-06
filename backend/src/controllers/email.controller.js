const transporter = require("../config/email.config");
const getEmailTemplate = require("../config/email.template");

const sendEmail = async (req, res) => {
  const formData = req.body;
  console.log("📧 Intentando enviar emails...");

  try {
    // Email para el equipo
    const teamMailOptions = {
      from: `m lab <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🎉 Nuevo mensaje de ${formData.firstName} ${formData.lastName}`,
      html: getEmailTemplate(formData),
    };

    // Email de confirmación para el usuario
    const userMailOptions = {
      from: `m lab <${process.env.EMAIL_USER}>`,
      to: formData.email,
      subject: `🎉 Gracias por contactar con m lab | Thank you for contacting m lab`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Poppins', Arial, sans-serif;
                line-height: 1.6;
                color: #1A1A1A;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #FFFFFF;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(45deg, #FFD700, #FFC107);
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                padding: 30px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #FFD700;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 m lab 🎊</h2>
              </div>
              <div class="content">
                <h3>¡Gracias por tu mensaje! | Thank you for your message!</h3>
                
                <p><strong>Español:</strong></p>
                <p>Hola ${formData.firstName},</p>
                <p>Gracias por contactar con m lab. Hemos recibido tu mensaje y nuestro equipo lo revisará pronto.</p>
                <p>Nos pondremos en contacto contigo para ayudarte a organizar tu próximo evento inolvidable.</p>
                <p>¡Prepárate para vivir una experiencia única!</p>
                
                <br/>
                
                <p><strong>English:</strong></p>
                <p>Hello ${formData.firstName},</p>
                <p>Thank you for contacting m lab. We have received your message and our team will review it soon.</p>
                <p>We will get in touch with you to help you organize your next unforgettable event.</p>
                <p>Get ready for a unique experience!</p>
              </div>
              <div class="footer">
                <p>🎉 m lab Team 🎊</p>
                <p>Valencia, España</p>
                <a href="https://www.instagram.com/mlab.vlc/"> Follow us on Instagram </a>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    console.log("📤 Enviando emails...");

    // Enviar ambos emails
    const [teamInfo, userInfo] = await Promise.all([
      transporter.sendMail(teamMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log("✅ Emails enviados exitosamente:", {
      teamMessageId: teamInfo.messageId,
      userMessageId: userInfo.messageId,
    });

    res.status(200).json({
      success: true,
      message: "Emails enviados correctamente",
    });
  } catch (error) {
    console.error("❌ Error al enviar emails:", error);
    res.status(500).json({
      success: false,
      error: "Error al enviar los emails",
      details: error.message,
    });
  }
};

module.exports = {
  sendEmail,
};
