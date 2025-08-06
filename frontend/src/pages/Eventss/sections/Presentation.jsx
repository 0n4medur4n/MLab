import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const distortion = keyframes`
  0% {
    filter: none;
  }
  50% {
    filter: brightness(1.1) contrast(1.1);
  }
  100% {
    filter: none;
  }
`;

const strobeLight = keyframes`
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.15;
  }
  100% {
    opacity: 0.1;
  }
`;

const PresentationSection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;
  animation: ${distortion} 5s infinite linear;
  margin-top: 80px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 159, 28, 0.9),
      rgba(231, 29, 54, 0.2)
    );
    animation: ${strobeLight} 4s infinite;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(252, 230, 125, 0.3),
      transparent
    );
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${(props) => props.theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing.xl};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled(motion.div)`
  position: relative;
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
  margin-bottom: 4rem;
  font-weight: 300;
`;

const Description = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);

  p {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const VisualElement = styled(motion.div)`
  position: relative;
  height: 500px;
  background: linear-gradient(45deg, rgba(252, 230, 125, 0.1), transparent);
  border: 1px solid rgba(252, 230, 125, 0.2);
  border-radius: 10px;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(252, 230, 125, 0.1),
      transparent 70%
    );
  }

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 3;
  }
`;

const FloatingElements = styled(motion.div)`
  position: absolute;
  ${(props) => props.position};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: ${(props) => props.theme.colors.primary};
  opacity: 0.1;
  border-radius: 50%;
`;

const Presentation = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <PresentationSection>
      <Container>
        <TextContent>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("eventsPresentation.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("eventsPresentation.title")}
          </Title>
          <Description
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p>{t("eventsPresentation.description1")}</p>
            <p>{t("eventsPresentation.description2")}</p>
          </Description>
        </TextContent>

        <VisualElement
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <FloatingElements
              key={i}
              position={`
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
              `}
              size={`${Math.random() * 100 + 50}px`}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </VisualElement>
      </Container>
    </PresentationSection>
  );
};

export default Presentation;
