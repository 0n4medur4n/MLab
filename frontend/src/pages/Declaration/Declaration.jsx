import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { useAnimationFrame } from "framer-motion";

const DeclarationSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8rem 2rem 6rem;
  perspective: 1000px;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    padding: 10rem 2rem 4rem;
    min-height: 100vh;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 8rem 1.5rem 3rem;
    min-height: 100vh;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    padding: 7rem 1rem 2rem;
    min-height: 100vh;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    padding: 6rem 1rem 2rem;
    min-height: 100vh;
  }
`;

const GlassCard = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  margin-top: 0;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    max-width: 800px;
    padding: 3.5rem;
    margin-top: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    padding: 3rem;
    border-radius: 15px;
    margin-top: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    padding: 2.5rem;
    border-radius: 12px;
    margin-top: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    padding: 2rem;
    border-radius: 10px;
    margin-top: 0;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2.5rem;
  font-family: ${(props) => props.theme.fonts.heading};
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 2rem;
  font-family: ${(props) => props.theme.fonts.body};
  text-align: justify;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 1.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.2rem;
    text-align: left;
  }
`;

const HighlightedParagraph = styled(Paragraph)`
  color: ${(props) => props.theme.colors.primary};
`;

const Starfield = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    stars.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 2000,
      color: Math.random() > 0.7 ? "#ff6d4d" : "#ffffff",
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const speed = 10;
    stars.current.forEach((star) => {
      star.z -= speed;
      if (star.z <= 1) {
        star.z = 2000;
        star.x = Math.random() * 2000 - 1000;
        star.y = Math.random() * 2000 - 1000;
      }
      const sx = (star.x / star.z) * (canvas.width / 2) + canvas.width / 2;
      const sy = (star.y / star.z) * (canvas.height / 2) + canvas.height / 2;
      const size = (1 - star.z / 2000) * 5;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

const Declaration = () => {
  const { t } = useTranslation();
  const paragraphs = t("declaration.paragraphs", { returnObjects: true });

  return (
    <DeclarationSection>
      <Starfield />
      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("declaration.title")}
        </Title>

        {paragraphs.map((paragraph, index) => {
          const ParagraphComponent =
            index === paragraphs.length - 1 ? HighlightedParagraph : Paragraph;

          return (
            <ParagraphComponent
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            >
              {paragraph}
            </ParagraphComponent>
          );
        })}
      </GlassCard>
    </DeclarationSection>
  );
};

export default Declaration;
