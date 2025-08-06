import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WelcomeSection = styled.section`
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

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("/assets/images/background-welcome.webp");
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: filter 0.6s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
  }

  ${WelcomeSection}:hover & {
    filter: grayscale(0%);
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

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  perspective: 2000px;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem;
  transform-style: preserve-3d;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      transparent 50%,
      rgba(255, 255, 255, 0.1)
    );
    border-radius: 20px;
    z-index: 1;
  }
`;

const ContentInner = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-weight: 300;
  transform: translateZ(20px);
`;

const Text = styled.p`
  font-size: clamp(1.1rem, 1.5vw, 1.25rem);
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  transform: translateZ(10px);
`;

const CTAButton = styled(Link)`
  font-size: 15px;
  padding: 0.7em 2.7em;
  letter-spacing: 0.06em;
  position: relative;
  font-family: inherit;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

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
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  transform: translateZ(30px);
`;

const Welcome = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
  };

  return (
    <WelcomeSection ref={ref}>
      <BackgroundImage />
      <Container style={{ opacity }}>
        <ContentWrapper>
          <GlassCard
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ContentInner>
              <Title>{t("welcome.title")}</Title>
              <Text>{t("welcome.description1")}</Text>
              <Text>{t("welcome.description2")}</Text>
              <CTAContainer>
                <CTAButton
                  to="/contacto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t("welcome.ctaButton")}
                </CTAButton>
              </CTAContainer>
            </ContentInner>
          </GlassCard>
        </ContentWrapper>
      </Container>
    </WelcomeSection>
  );
};

export default Welcome;
