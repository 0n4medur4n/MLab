import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaGlobeAmericas, FaHandsHelping, FaShieldAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ExpectedSection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;
  margin: 6rem 0;
`;

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 2rem;
  }
`;

const TextContent = styled(motion.div)`
  position: relative;
  margin-bottom: 6rem;
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
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 3rem;
  font-weight: 300;
`;

const RoadmapContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${(props) => props.theme.colors.primary},
      transparent
    );
    z-index: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    &::before {
      display: none;
    }
  }
`;

const RoadmapItem = styled(motion.div)`
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(252, 230, 125, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;

  svg {
    font-size: 2rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 400;
`;

const ItemDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

const Expected = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const roadmapItems = [
    {
      icon: <FaGlobeAmericas />,
      title: t("events.expected.diversity.title"),
      description: t("events.expected.diversity.description"),
    },
    {
      icon: <FaHandsHelping />,
      title: t("events.expected.connections.title"),
      description: t("events.expected.connections.description"),
    },
    {
      icon: <FaShieldAlt />,
      title: t("events.expected.safety.title"),
      description: t("events.expected.safety.description"),
    },
  ];

  return (
    <ExpectedSection ref={ref}>
      <Container>
        <TextContent>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("events.expected.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("events.expected.title")}
          </Title>
        </TextContent>

        <RoadmapContainer>
          {roadmapItems.map((item, index) => (
            <RoadmapItem
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <IconWrapper>{item.icon}</IconWrapper>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDescription>{item.description}</ItemDescription>
            </RoadmapItem>
          ))}
        </RoadmapContainer>
      </Container>
    </ExpectedSection>
  );
};

export default Expected;
