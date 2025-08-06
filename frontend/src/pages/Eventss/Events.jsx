import styled from "styled-components";
import Presentation from "./sections/Presentation";
import Next from "./sections/Next";
import Expected from "./sections/Expected";
import JoinExperience from "./sections/PartExperience";
import ContactEvents from "./sections/ContactEvents";
import { useTranslation } from "react-i18next";
import SEOHelmet from "../../components/SEO/SEOHelmet";
import { seoConfig } from "../../config/seo.config";

const EventsPage = styled.main`
  background-color: #000000;
  min-height: 100vh;
  position: relative;
`;

const Events = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "es";
  const seo = seoConfig[currentLanguage]?.events || seoConfig.es.events;

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        schema={seo.schema}
      />
      <EventsPage>
        <Presentation />
        <Next />
        <Expected />
        <JoinExperience />
        <ContactEvents />
      </EventsPage>
    </>
  );
};

export default Events;
