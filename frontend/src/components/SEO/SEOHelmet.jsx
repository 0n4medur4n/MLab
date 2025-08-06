import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SEOHelmet = ({
  title,
  description,
  keywords,
  image = "/og-image.jpg",
  schema,
}) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;
  const baseUrl = "https://mlab.vlc";
  const canonicalUrl = `${baseUrl}${location.pathname}`;

  const alternateUrls = {
    es: `${baseUrl}/es${location.pathname}`,
    en: `${baseUrl}/en${location.pathname}`,
  };

  return (
    <Helmet>
      {/* Básico */}
      <html lang={currentLang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical y Alternates para i18n */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es" href={alternateUrls.es} />
      <link rel="alternate" hrefLang="en" href={alternateUrls.en} />
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.es} />

      {/* Open Graph */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta
        property="og:locale"
        content={currentLang === "es" ? "es_ES" : "en_US"}
      />
      <meta
        property="og:locale:alternate"
        content={currentLang === "es" ? "en_US" : "es_ES"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHelmet;
