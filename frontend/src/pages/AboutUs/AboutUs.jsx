import styled from "styled-components";
import Us from "./sections/Us";
import MisionVision from "./sections/MisionVision";
import Movement from "./sections/Movement";
import Welcome from "./sections/Welcome";
import { useTranslation } from "react-i18next";
import SEOHelmet from "../../components/SEO/SEOHelmet";
import { seoConfig } from "../../config/seo.config";

const AboutUsContainer = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

const AboutUs = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const seo = seoConfig[currentLanguage]?.about || seoConfig.es.about;

  return (
    <>
      <SEOHelmet
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        schema={seo.schema}
      />
      <AboutUsContainer>
        <Us />
        <MisionVision />
        <Movement />
        <Welcome />
      </AboutUsContainer>
    </>
  );
};

export default AboutUs;
