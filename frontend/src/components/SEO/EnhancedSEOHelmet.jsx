import React from "react";
import { Helmet } from "react-helmet-async";

const EnhancedSEOHelmet = ({
  title,
  description,
  keywords,
  url,
  image,
  schema,
  faqs = [],
  eventType = null,
  eventDetails = null,
}) => {
  // Schema.org Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "M lab Valencia",
    url: "https://mlab.vlc",
    logo: "https://mlab.vlc/logo.png",
    description: "Eventos y experiencias únicas en Valencia",
    sameAs: [
      "https://www.instagram.com/mlab.vlc/",
      // Agregar otras redes sociales
    ],
  };

  // Schema.org WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "M lab Valencia",
    url: "https://mlab.vlc",
    description: description,
    publisher: {
      "@type": "Organization",
      name: "M lab Valencia",
    },
  };

  // Schema.org FAQPage
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // Schema.org Event (si aplica)
  const eventSchema =
    eventType && eventDetails
      ? {
          "@context": "https://schema.org",
          "@type": eventType,
          name: eventDetails.name,
          startDate: eventDetails.startDate,
          endDate: eventDetails.endDate,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: eventDetails.locationName,
            address: {
              "@type": "PostalAddress",
              streetAddress: eventDetails.streetAddress,
              addressLocality: eventDetails.city,
              postalCode: eventDetails.postalCode,
              addressCountry: eventDetails.country,
            },
          },
          image: [eventDetails.image],
          description: eventDetails.description,
          offers: {
            "@type": "Offer",
            name: eventDetails.ticketName || "Entrada General",
            price: eventDetails.price || "0",
            priceCurrency: eventDetails.currency || "EUR",
            validFrom: eventDetails.validFrom,
            url: eventDetails.ticketUrl,
          },
          performer:
            eventDetails.performers?.map((performer) => ({
              "@type": "Person",
              name: performer.name,
            })) || [],
          organizer: {
            "@type": "Organization",
            name: "M lab Valencia",
            url: "https://mlab.vlc",
          },
        }
      : null;

  // Combinar todos los esquemas
  const schemas = [organizationSchema, websiteSchema];
  if (faqSchema) schemas.push(faqSchema);
  if (eventSchema) schemas.push(eventSchema);
  if (schema) schemas.push(schema);

  const jsonLdScripts = schemas.map((schemaData, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  ));

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={image || "https://mlab.vlc/default-image.jpg"}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={image || "https://mlab.vlc/default-image.jpg"}
      />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* JSON-LD Schemas */}
      {jsonLdScripts}
    </Helmet>
  );
};

export default EnhancedSEOHelmet;
