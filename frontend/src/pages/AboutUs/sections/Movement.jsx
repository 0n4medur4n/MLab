import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MovementSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 2rem 0;
  overflow: hidden;
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

const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: -2rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${(props) => props.theme.colors.primary},
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    right: -2rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent,
      ${(props) => props.theme.colors.primary},
      transparent
    );
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

  p {
    font-size: clamp(1.1rem, 1.5vw, 1.25rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
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

const CTAButton = styled(motion(Link))`
  font-size: 15px;
  padding: 0.7em 2.7em;
  letter-spacing: 0.06em;
  position: relative;
  font-family: inherit;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  text-decoration: none;
  border: 2px solid ${(props) => props.theme.colors.primary};
  background: linear-gradient(
    to right,
    rgba(252, 230, 125, 0.1) 1%,
    transparent 40%,
    transparent 60%,
    rgba(252, 230, 125, 0.1) 100%
  );
  color: ${(props) => props.theme.colors.primary};
  box-shadow: inset 0 0 10px rgba(252, 230, 125, 0.4),
    0 0 9px 3px rgba(252, 230, 125, 0.1);

  &:hover {
    color: #fff;
    box-shadow: inset 0 0 10px rgba(252, 230, 125, 0.6),
      0 0 9px 3px rgba(252, 230, 125, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform 0.4s ease-in-out;
    background: linear-gradient(
      to right,
      transparent 1%,
      rgba(252, 230, 125, 0.1) 40%,
      rgba(252, 230, 125, 0.1) 60%,
      transparent 100%
    );
  }

  &:hover:before {
    transform: translateX(15em);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    text-align: center;
    border: none;
    background: none;
    box-shadow: none;

    &:before {
      display: none;
    }
  }
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Movement = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <MovementSection ref={ref}>
      <Container style={{ opacity }}>
        <Label
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("movement.label")}
        </Label>
        <ContentWrapper>
          <ContentBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p>{t("movement.description1")}</p>
            <p>{t("movement.description2")}</p>
          </ContentBox>
          <CTAContainer>
            <CTAButton
              to="/eventos"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("movement.ctaButton")}
            </CTAButton>
          </CTAContainer>
        </ContentWrapper>
      </Container>
    </MovementSection>
  );
};

export default Movement;
