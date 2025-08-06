import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ExperienceSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 6rem 0;
  overflow: hidden;
`;

const NoiseOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
`;

const Container = styled.div`
  width: 100%;
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

const Header = styled.div`
  text-align: left;
  margin-bottom: 6rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 4rem;
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

const Title = styled(motion.h2)`
  font-family: 'Anurati', 'Garet', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 3rem;
  font-weight: 300;
`;

const ExperienceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (orientation: landscape) and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (orientation: portrait) and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  height: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2rem;
    min-height: 250px;
  }

  @media (orientation: portrait) and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    padding: 2.5rem;
    min-height: 200px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(210deg, transparent, rgba(255, 255, 255, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  h3 {
    color: ${(props) => props.theme.colors.primary};
    font-size: clamp(1.5rem, 2vw, 1.8rem);
    margin-bottom: 1.5rem;
    font-weight: 400;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: clamp(1rem, 1.5vw, 1.1rem);
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
  display: inline-block;

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
  text-align: center;
  margin-top: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 1rem;
  }
`;

const Experience = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const experienceCards = [
    {
      title: t("experience.cards.music.title"),
      content: t("experience.cards.music.content"),
    },
    {
      title: t("experience.cards.language.title"),
      content: t("experience.cards.language.content"),
    },
    {
      title: t("experience.cards.artists.title"),
      content: t("experience.cards.artists.content"),
    },
  ];

  return (
    <ExperienceSection ref={ref}>
      <NoiseOverlay />
      <Container style={{ opacity }}>
        <Header>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("experience.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("experience.title")}
          </Title>
        </Header>
        <ExperienceGrid>
          {experienceCards.map((item, i) => (
            <ExperienceCard
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </ExperienceCard>
          ))}
        </ExperienceGrid>
        <CTAContainer>
          <CTAButton
            to="/eventos"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("experience.ctaButton")}
          </CTAButton>
        </CTAContainer>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
