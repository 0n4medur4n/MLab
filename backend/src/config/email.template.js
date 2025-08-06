const getEmailTemplate = (data) => {
  const { firstName, lastName, email, phone, message } = data;

  return `
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
            background-color: #FFD700;
            background: linear-gradient(45deg, #FFD700, #FFC107);
            color: #1A1A1A;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 30px;
            background-color: #FFFFFF;
            border-radius: 0 0 10px 10px;
          }
          .field {
            margin-bottom: 20px;
            border-bottom: 1px solid #EEEEEE;
            padding-bottom: 15px;
          }
          .label {
            font-weight: 600;
            color: #1A1A1A;
            display: block;
            margin-bottom: 5px;
          }
          .value {
            color: #4A4A4A;
          }
          .message {
            white-space: pre-line;
            background-color: #F8F9FA;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #FFD700;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #FFD700;
            color: #666;
            font-size: 0.9em;
          }
          .emoji {
            font-size: 1.2em;
            margin-right: 5px;
          }
          .bilingual {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .lang-divider {
            color: #FFD700;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2> MLab</h2>
            <p>Nuevo Mensaje de Contacto • New Contact Message</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="bilingual">
                <span class="label">👤 Nombre • Name:</span>
              </div>
              <p class="value">${firstName} ${lastName}</p>
            </div>
            <div class="field">
              <div class="bilingual">
                <span class="label">📧 Correo • Email:</span>
              </div>
              <p class="value">${email}</p>
            </div>
            <div class="field">
              <div class="bilingual">
                <span class="label">📞 Teléfono • Phone:</span>
              </div>
              <p class="value">${phone || "No proporcionado • Not provided"}</p>
            </div>
            <div class="field">
              <div class="bilingual">
                <span class="label">💬 Mensaje • Message:</span>
              </div>
              <div class="message">
                ${message}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>🌟 Este mensaje fue enviado desde el formulario de contacto de MLab</p>
            <p>🌟 This message was sent from the MLab contact form</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = getEmailTemplate;
