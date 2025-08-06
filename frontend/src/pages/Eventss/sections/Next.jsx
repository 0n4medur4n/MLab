import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ValenciaEvents from "./ValenciaEvents";

const NextSection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 2rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : "rgba(255, 255, 255, 0.6)"};
  padding: 1rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.theme.colors.primary};
    transform: scaleX(${(props) => (props.$isActive ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const EventsGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const EventCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-5px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 5px;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EventDate = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const EventTitle = styled.h3`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 2rem;
  font-weight: 400;
`;

const EventDetails = styled.div`
  display: flex;
  gap: 3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  font-size: 1.1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const EventLineup = styled.p`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  font-size: 1.1rem;
`;

const Next = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("proximos");

  const translateWeekDay = (date) => {
    const [day, rest] = date.split(", ");
    return i18n.language === "en"
      ? date
          .replace("VIE", "FRI")
          .replace("SAB", "SAT")
          .replace("DOM", "SUN")
          .replace("LUN", "MON")
          .replace("MAR", "TUE")
          .replace("MIE", "WED")
          .replace("JUE", "THU")
      : date;
  };

  const events = {
    proximos: [
      {
        id: 1,
        date: "VIE, 14 FEB",
        title: "Valentine´s Day",
        location: t("events.locations.valencia"),
        venue: "The Apartment",
        image: "/assets/images/flyer3.webp",
        lineup: "Eleven Eleven, I a Mike, Pablo, VΔLENTINΘ, Oktay",
        attendance: "150",
      },
      {
        id: 2,
        date: "VIE, 21 FEB",
        title: "Language Exchange",
        location: t("events.locations.valencia"),
        venue: "Sky Bar",
        image: "/assets/images/flyer2.webp",
        lineup: "Cataclisma, VΔLENTINΘ, Pablo, Jack Barnett",
        attendance: "250",
      },
    ],
    pasados: [
      {
        id: 1,
        date: "VIE, 10 ENE",
        title: "Language Exchange",
        location: t("events.locations.valencia"),
        venue: "Sky Bar",
        image: "/assets/images/LANGUAGE EXCHANCE 10-01.webp",
        lineup: "Eleven Eleven, Cataclisma, Pablo",
        attendance: "100",
      },
      {
        id: 2,
        date: "VIE, 24 ENE",
        title: "Language Exchange",
        location: t("events.locations.valencia"),
        venue: "Sky Bar",
        image: "/assets/images/LANGUAGE EXCHANCE 24-01.webp",
        lineup: "Eleven Eleven, Pablo, I am Mike, Nnastie",
        attendance: "100",
      },
      {
        id: 3,
        date: "VIE, 7 FEB",
        title: "Language Exchange",
        location: t("events.locations.valencia"),
        venue: "Sky Bar",
        image: "/assets/images/LANGUAGE EXCHANCE 07-02.webp",
        lineup: "Cataclisma, Pablo, I am Mike, VΔLENTINΘ",
        attendance: "100",
      },
      {
        id: 4,
        date: "VIE, 14 FEB",
        title: "Language Exchange Valentine's Day Special Edition",
        location: t("events.locations.valencia"),
        venue: "The Apartment",
        image: "/assets/images/flyer3.webp",
        lineup: "Eleven Eleven, I am Mike, Pablo, VΔLENTINΘ, Oktay",
        attendance: "100",
      },
    ],
    valencia: [],
  };

  return (
    <NextSection>
      <Container>
        <TabsContainer>
          <Tab
            $isActive={activeTab === "proximos"}
            onClick={() => setActiveTab("proximos")}
          >
            {t("events.tabs.upcoming")}
          </Tab>
          <Tab
            $isActive={activeTab === "pasados"}
            onClick={() => setActiveTab("pasados")}
          >
            {t("events.tabs.past")}
          </Tab>
          <Tab
            $isActive={activeTab === "valencia"}
            onClick={() => setActiveTab("valencia")}
          >
            {t("events.tabs.valencia")}
          </Tab>
        </TabsContainer>

        {(activeTab === "proximos" || activeTab === "pasados") && (
          <EventsGrid>
            {events[activeTab].map((event) => (
              <EventCard
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <EventImage src={event.image} alt={event.title} />
                <EventInfo>
                  <div>
                    <EventDate>{translateWeekDay(event.date)}</EventDate>
                    <EventTitle>{event.title}</EventTitle>
                    <EventDetails>
                      <div>
                        <FaMapMarkerAlt />
                        {event.location} - {event.venue}
                      </div>
                      <div>
                        <FaUsers />
                        {t("events.attendance", { count: event.attendance })}
                      </div>
                    </EventDetails>
                    <EventLineup>
                      {t("events.lineup")}: {event.lineup}
                    </EventLineup>
                  </div>
                </EventInfo>
              </EventCard>
            ))}
          </EventsGrid>
        )}

        {activeTab === "valencia" && <ValenciaEvents />}
      </Container>
    </NextSection>
  );
};

export default Next;
