import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const ContentSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%);
  
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContentCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const ContentBody = styled.div`
  padding: 1.5rem;
`;

const ContentTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ContentText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ContentLink = styled.a`
  display: inline-block;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FAQSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FAQTitle = styled.h4`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const FAQList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;
`;

const FAQItem = styled.li`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LongTailContent = () => {
  const { t } = useTranslation();
  
  // Contenido optimizado para consultas de cola larga
  const contentData = [
    {
      title: "Cómo aprender inglés mientras disfrutas de la mejor música electrónica en Valencia",
      text: "Descubre nuestra metodología única que combina eventos de intercambio de idiomas con m lab de música electrónica para acelerar tu aprendizaje de forma divertida y social.",
      image: "/assets/images/content/language-music.jpg",
      link: "/metodo-aprender-ingles-mlab.vlc",
      faqs: [
        "¿Necesito tener conocimientos previos de inglés?",
        "¿Qué tipo de música se toca en estos eventos?",
        "¿Cuánto tiempo tardaré en mejorar mi nivel de inglés?"
      ]
    },
    {
      title: "Eventos de intercambio cultural en Valencia para expatriados y locales",
      text: "Nuestros eventos mensuales crean puentes entre comunidades locales y expatriados, fomentando el entendimiento cultural a través de la música y el diálogo.",
      image: "/assets/images/content/cultural-exchange.jpg",
      link: "/eventos-intercambio-cultural-valencia-expatriados",
      faqs: [
        "¿Qué actividades se realizan en estos eventos?",
        "¿Puedo participar si no soy expatriado?",
        "¿Con qué frecuencia se organizan estos eventos?"
      ]
    },
    {
      title: "Guía completa para DJs emergentes: Cómo tocar en eventos internacionales en Valencia",
      text: "Compartimos consejos prácticos y experiencias reales de DJs que han comenzado su carrera tocando en nuestros eventos internacionales en Valencia.",
      image: "/assets/images/content/dj-guide.jpg",
      link: "/guia-djs-emergentes-eventos-internacionales-valencia",
      faqs: [
        "¿Qué equipo técnico se proporciona?",
        "¿Cómo puedo enviar mi demo?",
        "¿Qué géneros musicales se buscan?"
      ]
    }
  ];
  
  return (
    <ContentSection>
      <Container>
        <SectionTitle>Contenido Especializado para Consultas Específicas</SectionTitle>
        
        <ContentGrid>
          {contentData.map((content, index) => (
            <ContentCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ImageContainer>
                <OptimizedImage 
                  src={content.image}
                  alt={content.title}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
              </ImageContainer>
              
              <ContentBody>
                <ContentTitle>{content.title}</ContentTitle>
                <ContentText>{content.text}</ContentText>
                <ContentLink href={content.link}>Leer más detalles</ContentLink>
                
                <FAQSection>
                  <FAQTitle>Preguntas frecuentes relacionadas:</FAQTitle>
                  <FAQList>
                    {content.faqs.map((faq, faqIndex) => (
                      <FAQItem key={faqIndex}>{faq}</FAQItem>
                    ))}
                  </FAQList>
                </FAQSection>
              </ContentBody>
            </ContentCard>
          ))}
        </ContentGrid>
      </Container>
    </ContentSection>
  );
};

export default LongTailContent;
