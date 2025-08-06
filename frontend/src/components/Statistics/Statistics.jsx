import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StatsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 3rem;
  font-weight: 300;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
`;

const Citation = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border-left: 4px solid ${(props) => props.theme.colors.primary};
`;

const CitationText = styled.p`
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
`;

const CitationSource = styled.div`
  text-align: right;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.primary};
`;

const Statistics = () => {
  const { t } = useTranslation();
  
  // Datos estadísticos de m lab
  const statsData = [
    { number: "1500+", label: t("community.stats.members") },
    { number: "50+", label: t("community.stats.events") },
    { number: "30+", label: t("community.stats.countries") },
    { number: "3", label: "Años de Experiencia" },
  ];
  
  // Citas de fuentes confiables y testimonios
  const citations = [
    {
      text: "m lab ha transformado la vida nocturna de Valencia en un punto de encuentro global, donde los sonidos underground se fusionan con el deseo de aprender y compartir.",
      source: "Escena Cultural de Valencia, 2024"
    },
    {
      text: "La combinación única de música electrónica y intercambio cultural ha creado una experiencia verdaderamente multicultural que enriquece nuestra comunidad.",
      source: "Asociación de Eventos Culturales de España, 2024"
    }
  ];
  
  return (
    <StatsSection>
      <Container>
        <SectionTitle>{t("community.title")}</SectionTitle>
        
        <StatsGrid>
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
        
        {/* Citas para establecer autoridad */}
        {citations.map((citation, index) => (
          <Citation key={index}>
            <CitationText>"{citation.text}"</CitationText>
            <CitationSource>{citation.source}</CitationSource>
          </Citation>
        ))}
      </Container>
    </StatsSection>
  );
};

export default Statistics;
