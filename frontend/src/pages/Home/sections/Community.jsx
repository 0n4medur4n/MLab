import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CommunitySection = styled.section`
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
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
  font-family: "Anurati", "Garet", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 3rem;
  font-weight: 300;
`;

const Description = styled(motion.div)`
  max-width: 800px;
  margin-bottom: 4rem;

  p {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }
`;

const InstagramButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1em 2em;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  text-decoration: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;

  * {
    color: #fff !important;
  }

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

  &:hover,
  &:focus,
  &:active {
    color: #fff !important;
    text-decoration: none;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 39, 67, 0.3);

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.1);
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
    }
  }

  svg {
    font-size: 1.4rem;
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-start;
  margin-top: 3rem;
`;

const Community = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <CommunitySection ref={ref}>
      <Container style={{ opacity }}>
        <Label
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("community.label")}
        </Label>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("community.title")}
        </Title>
        <Description
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p>{t("community.description1")}</p>
          <p>{t("community.description2")}</p>
        </Description>
        <ButtonContainer>
          <InstagramButton
            href="https://www.instagram.com/mlab.vlc/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FaInstagram />
            {t("community.instagramButton")}
          </InstagramButton>
        </ButtonContainer>
      </Container>
    </CommunitySection>
  );
};

export default Community;
