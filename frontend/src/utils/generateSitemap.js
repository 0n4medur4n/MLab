const fs = require("fs");
const path = require("path");

const baseUrl = "https://monkeybusinessvalencia.com";
const pages = ["", "/eventos", "/nosotros", "/contacto", "/declaracion"];
const languages = ["es", "en"];

const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  pages.forEach((page) => {
    languages.forEach((lang) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${lang}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>`;

      languages.forEach((alternateLang) => {
        sitemap += `
    <xhtml:link 
      rel="alternate" 
      hrefLang="${alternateLang}" 
      href="${baseUrl}/${alternateLang}${page}"/>`;
      });

      sitemap += `
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    });
  });

  sitemap += "\n</urlset>";

  fs.writeFileSync(path.join(__dirname, "../../public/sitemap.xml"), sitemap);
};

generateSitemap();
