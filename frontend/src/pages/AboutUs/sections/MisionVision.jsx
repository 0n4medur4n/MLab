import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const MisionVisionSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 4rem 0;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 2rem 0;
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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4rem;
`;

const Label = styled(motion.span)`
  display: inline-block;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
  position: relative;
  padding-right: 3rem;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 2rem;
    height: 1px;
    background-color: ${(props) => props.theme.colors.primary};
    transform-origin: right;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${(props) => props.theme.colors.primary},
      transparent
    );

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;

const ContentBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  h3 {
    font-size: clamp(1.8rem, 2.5vw, 2.2rem);
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  p {
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(210deg, transparent, rgba(255, 255, 255, 0.02));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const MisionVision = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <MisionVisionSection ref={ref}>
      <Container style={{ opacity }}>
        <HeaderWrapper>
          <Label
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("misionVision.label")}
          </Label>
        </HeaderWrapper>
        <ContentGrid>
          <ContentBox
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t("misionVision.mision.title")}</h3>
            <p>{t("misionVision.mision.description")}</p>
          </ContentBox>
          <ContentBox
            variants={boxVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{t("misionVision.vision.title")}</h3>
            <p>{t("misionVision.vision.description")}</p>
          </ContentBox>
        </ContentGrid>
      </Container>
    </MisionVisionSection>
  );
};

export default MisionVision;
