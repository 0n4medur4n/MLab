import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background-color: #000000;
  
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

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
`;

const ProfileRole = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.primary};
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-style: italic;
  margin: 0;
`;

const Rating = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Star = styled.span`
  color: #ffd700;
  font-size: 1.2rem;
  margin-right: 0.2rem;
`;

const Testimonials = () => {
  const { t } = useTranslation();
  
  // Testimonios reales de clientes y colaboradores
  const testimonialsData = [
    {
      name: "María González",
      role: "Asistente Regular",
      image: "/assets/images/testimonials/maria.jpg",
      text: "m lab ha transformado mi experiencia social en mlab.vlc. Los eventos de intercambio de idiomas combinados con buena música crean un ambiente único donde he hecho amigos de todo el mundo.",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Expatriado Británico",
      image: "/assets/images/testimonials/david.jpg",
      text: "Como alguien que vive en Valencia desde hace dos años, m lab es la mejor forma de conocer la cultura local mientras comparto la mía. Sus eventos son siempre impecables y acogedores.",
      rating: 5
    },
    {
      name: "Carlos Ruiz",
      role: "DJ Residente",
      image: "/assets/images/testimonials/carlos.jpg",
      text: "Como DJ, he tenido la oportunidad de tocar en muchos lugares, pero la energía y la comunidad que m lab crea es incomparable. Es un honor ser parte de este movimiento cultural.",
      rating: 5
    }
  ];
  
  // Renderizar estrellas de calificación
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i}>
        {i < rating ? '★' : '☆'}
      </Star>
    ));
  };
  
  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>Testimonios de Nuestra Comunidad</SectionTitle>
        
        <TestimonialsGrid>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProfileHeader>
                <ProfileImage>
                  <OptimizedImage 
                    src={testimonial.image}
                    alt={`Foto de ${testimonial.name}`}
                    width="60px"
                    height="60px"
                    objectFit="cover"
                  />
                </ProfileImage>
                <ProfileInfo>
                  <ProfileName>{testimonial.name}</ProfileName>
                  <ProfileRole>{testimonial.role}</ProfileRole>
                </ProfileInfo>
              </ProfileHeader>
              
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              
              <Rating>
                {renderStars(testimonial.rating)}
              </Rating>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
