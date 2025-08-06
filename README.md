# M Lab Valencia

![M Lab Logo](frontend/src/assets/images/logos/MLabTransparent.webp)

## 📝 Description

M Lab Valencia is a web platform dedicated to creating and managing unique events in Valencia. Our mission is to deliver unforgettable experiences through themed events and exclusive parties.

## ⚡ Key Features

### Frontend

- 🎨 Modern design with fluid animations (Framer Motion)
- 🌐 Multilingual support (ES/EN) with i18next
- 🌙 Optimized dark theme
- 📱 Responsive and mobile-first design
- 🔍 SEO optimized
- ⚡ Fast and optimized loading

### Backend

- 📧 Email system with Nodemailer
- 🔒 Robust security with Helmet and validations
- 🚦 Rate limiting and attack protection
- 🌡️ Weather and time APIs integration

## 🛠️ Tech Stack

### Frontend

- React 18 + Vite
- Styled Components
- Framer Motion
- React Router DOM 6
- i18next
- React Helmet Async

### Backend

- Node.js
- Express
- Nodemailer
- Helmet
- CORS
- Express Validator
- Rate Limit

## 📂 Project Structure

```bash
MLab/
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── layout/
│ │ │ ├── shared/
│ │ │ └── SEO/
│ │ ├── pages/
│ │ │ ├── Home/
│ │ │ ├── AboutUs/
│ │ │ ├── Eventss/
│ │ │ └── Contact/
│ │ ├── i18n/
│ │ └── styles/
│ └── public/
└── backend/
├── middleware/
│ ├── security.js
│ ├── validator.js
│ └── errorHandler.js
├── routes/
└── server.js
```

## 🚀 Installation

```bash
# Install dependencies
npm install
# Install frontend dependencies
cd frontend && npm install
# Install backend dependencies
cd ../backend && npm install
```

## ⚙️ Environment Variables

```bash
PORT=3001
NODE_ENV=development
EMAIL_USER=monkeylab.ad@gmail.com
EMAIL_PASS=your-password
```

## 📝 Available Scripts

```json
{
"dev": "Starts frontend (5173) and backend (3001)",
"build": "Builds project for production",
"preview": "Preview build"
}
```

## 🔒 Implemented Security

- ⚔️ XSS Protection
- 🛡️ Security headers with Helmet
- 🚧 Rate limiting
- ✅ Data validation
- 🧹 Input sanitization
- 🔐 CORS configured

## 🔍 SEO & Performance

- 📱 Optimized meta tags
- 🗺️ Sitemap.xml
- 🤖 Configured robots.txt
- 📊 Open Graph tags
- 🏷️ Schema.org markup
- 🌐 SEO-friendly URLs
- 🔄 i18n support

## 📞 Contact & Support

- 📧 Email: [monkeylab.ad@gmail.com](mailto:monkeylab.ad@gmail.com)
- 📸 Instagram: [@mlab.vlc](https://www.instagram.com/mlab.vlc//)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

This project is private and all rights are reserved.

---

Developed with ❤️ by Be Creative
