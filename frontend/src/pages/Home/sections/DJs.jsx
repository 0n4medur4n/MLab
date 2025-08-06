import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DJsSection = styled.section`
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

const Container = styled(motion.div)`
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

const Label = styled(motion.span)`
  display: inline-block;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2rem;
  position: relative;
  padding-left: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 0.8rem;
    padding-left: 2.5rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 2rem;
    height: 1px;
    background-color: ${(props) => props.theme.colors.primary};
    transform-origin: left;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 1.5rem;
    }
  }
`;

const Title = styled(motion.h2)`
  font-family: "Anurati", "Garet", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 4rem;
  font-weight: 300;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 3rem;
    text-align: left;
  }
`;

const DJsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;
  perspective: 1000px;

  & > *:nth-child(5) {
    grid-column: 2;
  }

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    & > *:nth-child(5) {
      grid-column: auto;
    }
  }

  @media (orientation: landscape) and (max-width: ${(props) =>
      props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (orientation: portrait),
    (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    max-width: 500px;
    margin: 0 auto 4rem auto;
  }
`;

const DJCard = styled(motion.div)`
  position: relative;
  height: 600px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    height: 550px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 500px;
  }

  @media (orientation: portrait) and (max-width: ${(props) =>
      props.theme.breakpoints.mobile}) {
    height: 450px;
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    pointer-events: none;
    z-index: 4;
  }
`;

const DJImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  filter: blur(8px) brightness(0.7);
  transform: scale(1.1);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  ${DJCard}:hover & {
    filter: blur(0) brightness(0.9);
    transform: scale(1.05);
  }
`;

const DJInfo = styled.div`
  position: absolute;
  inset: 0;
  padding: 2rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${DJCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 300;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;

    ${DJCard}:hover & {
      transform: translateY(0);
      opacity: 1;
    }
  }

  p {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;

    ${DJCard}:hover & {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const InstagramButton = styled(motion.a)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transform: translateY(-20px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  z-index: 5;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: linear-gradient(
      45deg,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  ${DJCard}:hover & {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover {
    border-color: transparent;
    transform: scale(1.1) !important;
    box-shadow: 0 4px 15px rgba(220, 39, 67, 0.3);

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.1);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    }
  }

  svg {
    font-size: 1.2rem;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(211, 100, 100, 0.3));
  }
`;

const StyledCTAButton = styled(motion.a)`
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
  text-align: center;
`;

const DJsDescription = styled.div`
  margin: 6rem auto 4rem;
  max-width: 1000px;
  text-align: center;
  color: #fff;
  background: rgba(255, 255, 255, 0.03);
  padding: 3rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 3rem auto 2rem;
    padding: 1.5rem;
  }
`;

const DescriptionText = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  letter-spacing: 0.3px;

  strong {
    color: ${(props) => props.theme.colors.primary};
    font-weight: 500;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    text-align: left;
    line-height: 1.6;
  }
`;

const DJs = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const djs = [
    {
      id: 1,
      name: "Eleven Eleven",
      genre: "Minimal / Deep Tech",
      image: "/assets/images/ElevenEleven.webp",
      instagram: "https://instagram.com/eleveneleven",
    },
    {
      id: 2,
      name: "Cataclisma",
      genre: "Techno / Industrial",
      image: "/assets/images/Cataclisma.webp",
      instagram: "https://instagram.com/cataclisma",
    },
    {
      id: 3,
      name: "Pablo",
      genre: "House / Tech House",
      image: "/assets/images/Pablo.JPG",
      instagram: "https://instagram.com/pablo",
    },

    {
      id: 4,
      name: "I am Mike",
      genre: "Deep House / Organic",
      image: "/assets/images/IaMike.JPG",
      instagram: "https://instagram.com/IamMike",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      rotateY: -20,
      transformPerspective: 1000,
    },
    visible: (i) => ({
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <DJsSection ref={ref}>
      <Container style={{ opacity }}>
        <Label
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("djs.label")}
        </Label>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("djs.title")}
        </Title>

        <DJsGrid>
          {djs.map((dj, index) => (
            <DJCard
              key={dj.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
            >
              <DJImage image={dj.image} />
              <DJInfo>
                <h3>{dj.name}</h3>
                <p>{dj.genre}</p>
              </DJInfo>
              <InstagramButton
                href={dj.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Seguir a ${dj.name} en Instagram`}
              >
                <FaInstagram />
              </InstagramButton>
            </DJCard>
          ))}
        </DJsGrid>

        <DJsDescription>
          <DescriptionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t("djs.description.first")}
          </DescriptionText>
          <DescriptionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("djs.description.second")}
          </DescriptionText>
          <DescriptionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t("djs.description.third")}
          </DescriptionText>
          <DescriptionText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("djs.description.fourth")}
          </DescriptionText>

          <StyledCTAButton
            href="/contacto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("djs.cta")}
          </StyledCTAButton>
        </DJsDescription>
      </Container>
    </DJsSection>
  );
};

export default DJs;
