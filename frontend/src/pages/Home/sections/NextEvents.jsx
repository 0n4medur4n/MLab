import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EventsSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  overflow: hidden;
`;

const AsymmetricBorder = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before {
    top: 15%;
    right: -5%;
    width: 1px;
    height: 70%;
    transform: rotate(15deg);
  }

  &::after {
    bottom: 20%;
    left: -5%;
    width: 1px;
    height: 60%;
    transform: rotate(-20deg);
  }
`;

const EventsContainer = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing.md};
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
  margin-bottom: 4rem;
  font-weight: 300;
`;

const EventDescription = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 4rem;
`;

const EventsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 2rem;
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  height: auto;
  min-height: 650px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 600px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 550px;
    padding: 1.25rem;
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

  // Líneas asimétricas decorativas
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to right,
      transparent 45%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 55%
    );
    transform: rotate(35deg);
    pointer-events: none;
  }
`;

const EventImage = styled.div`
  height: 400px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 350px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 300px;
    margin: -1.25rem -1.25rem 1.25rem -1.25rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 80%, rgba(0, 0, 0, 0.5));
  }
`;

const EventInfo = styled.div`
  h3 {
    font-size: clamp(1.5rem, 2vw, 1.8rem);
    color: #fff;
    margin-bottom: 1rem;
    font-weight: 300;
  }

  .date {
    color: ${(props) => props.theme.colors.primary};
    font-size: clamp(1.1rem, 1.5vw, 1.2rem);
    margin-bottom: 1rem;
    display: block;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: clamp(0.9rem, 1.2vw, 1rem);
  }
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
  text-align: center;
`;

const CardCTAButton = styled.a`
  font-size: 14px;
  padding: 0.6em 2em;
  letter-spacing: 0.06em;
  position: relative;
  font-family: inherit;
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.4em;
  text-decoration: none;
  display: inline-block;
  margin-top: 1.5rem;
  cursor: pointer;

  border: 2px solid rgba(255, 255, 255, 0.8);
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1) 1%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.1) 100%
  );
  color: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 9px 3px rgba(255, 255, 255, 0.1);

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: inset 0 0 10px rgba(252, 230, 125, 0.4),
      0 0 9px 3px rgba(252, 230, 125, 0.1);
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
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.1) 60%,
      transparent 100%
    );
  }

  &:hover:before {
    transform: translateX(15em);
  }
`;

const NextEvents = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const events = [
    {
      id: 1,
      title: t("events.event1.title"),
      date: t("events.event1.date"),
      description: t("events.event1.description"),
      image: "/assets/images/LANGUAGE EXCHANCE 21-02.webp",
      ticketUrl:
        "https://xceed.me/en/valencia/event/language-exchange-by-MLab--182336/channel--MLab",
    },
    {
      id: 2,
      title: t("events.event2.title"),
      date: t("events.event2.date"),
      description: t("events.event2.description"),
      image: "/assets/images/LANGUAGE EXCHANCE 24-01.webp",
      ticketUrl: "https://marca.com",
    },
    {
      id: 3,
      title: t("events.event3.title"),
      date: t("events.event3.date"),
      description: t("events.event3.description"),
      image: "/assets/images/LANGUAGE EXCHANCE 10-01.webp",
      ticketUrl:
        "https://xceed.me/en/valencia/event/language-exchange-by-MLab-13mar--182338/channel--MLab",
    },
  ];

  return (
    <EventsSection ref={ref}>
      <AsymmetricBorder />
      <EventsContainer style={{ opacity }}>
        <Label
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("events.label")}
        </Label>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("events.title")}
        </Title>

        <EventDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("events.description")}
        </EventDescription>

        <EventsGrid>
          {events.map((event, index) => (
            <EventCard
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <EventImage
                style={{
                  backgroundImage: `url(${event.image})`,
                }}
              />
              <EventInfo>
                <h3>{event.title}</h3>
                <span className="date">{event.date}</span>
                <p>{event.description}</p>
                <CardCTAButton
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  as={motion.a}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {t("events.ticketButton")}
                </CardCTAButton>
              </EventInfo>
            </EventCard>
          ))}
        </EventsGrid>
        <CTAContainer>
          <CTAButton
            to="/eventos"
            as={motion.a}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("events.viewAllButton")}
          </CTAButton>
        </CTAContainer>
      </EventsContainer>
    </EventsSection>
  );
};

export default NextEvents;
