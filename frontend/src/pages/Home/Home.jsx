import Hero from "./sections/Hero";
import Story from "./sections/Story";
import Experience from "./sections/Experience";
import NextEvents from "./sections/NextEvents";
import Community from "./sections/Community";
import Mission from "./sections/Mission";
import Alliance from "./sections/Alliance";
import Djs from "./sections/DJs";
import Playlist from "./sections/Playlist";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import EnhancedSEOHelmet from "../../components/SEO/EnhancedSEOHelmet";
import { seoConfig } from "../../config/seo.config";
import { generalFAQs } from "../../config/faq.config";

const HomeContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

const Home = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "es";
  const seo = seoConfig[currentLanguage]?.home || seoConfig.es.home;

  // Configuración específica para la página principal
  const pageUrl = "https://monkeybusinessvalencia.com";
  const defaultImage = "https://monkeybusinessvalencia.com/assets/images/MonkeyBusinessLogo.png";

  return (
    <>
      <EnhancedSEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        url={pageUrl}
        image={defaultImage}
        schema={seo.schema}
        faqs={generalFAQs}
      />
      <HomeContainer>
        <Hero />
        <Story />
        <Mission />
        <Experience />
        <Alliance />
        <NextEvents />
        <Djs />
        <Playlist />
        <Community />
      </HomeContainer>
    </>
  );
};

export default Home;
