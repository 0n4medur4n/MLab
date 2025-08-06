import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../../../components/OptimizedImage/OptimizedImage";

const UsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 6rem 0;
  overflow: hidden;
  margin-top: 100px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: 70px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 60px;
  }
`;

const Container = styled(motion.div)`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1.5rem;
  }
`;

const Label = styled(motion.span)`
  display: inline-block;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
  position: relative;
  padding-left: 3rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 2rem;
    height: 1px;
    background-color: ${(props) => props.theme.colors.primary};
    transform-origin: left;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 3rem;
  font-weight: 300;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled(motion.div)`
  p {
    font-size: clamp(1.1rem, 1.5vw, 1.25rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  strong {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 400;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 400px;
    margin: 0 auto;
    max-width: 600px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const FAQSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 1rem;
  }
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
`;

const FAQList = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FAQItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1.5rem;
`;

const Question = styled.dt`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Answer = styled.dd`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
`;

const Us = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const sectionFAQs = t('us.faqs', { returnObjects: true });

  return (
    <>
      <UsSection ref={ref}>
        <Container style={{ opacity }}>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("us.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("us.title")}
          </Title>
          <ContentWrapper>
            <TextContent
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                <strong>{t("us.brandName")}</strong> {t("us.description1")}
              </p>
              <p>
                {t("us.description2.start")}{" "}
                <strong>{t("us.description2.name1")}</strong>
                {t("us.description2.known")}{" "}
                <strong>{t("us.description2.alias")}</strong>
                {t("us.description2.and")}{" "}
                <strong>{t("us.description2.name2")}</strong>
                {t("us.description2.end")}
              </p>
              <p>{t("us.description3")}</p>
            </TextContent>
            <ImageContainer
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <OptimizedImage
                src="/assets/images/MLab.webp"
                alt={t("us.imageAlt")}
                borderRadius="20px"
                shadow={true}
                hoverEffect={true}
                lazy={true}
              />
            </ImageContainer>
          </ContentWrapper>
        </Container>
      </UsSection>

      <FAQSection>
        <FAQTitle>Preguntas Frecuentes sobre MLab</FAQTitle>
        <FAQList>
          {sectionFAQs.map((faq, index) => (
            <FAQItem key={index}>
              <Question>{faq.question}</Question>
              <Answer>{faq.answer}</Answer>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>
    </>
  );
};

export default Us;
