import styled, { keyframes } from "styled-components";
import { motion, useAnimationFrame } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const strobeLight = keyframes`
  0% { opacity: 0.05; }
  50% { opacity: 0.1; }
  51% { opacity: 0.05; }
  100% { opacity: 0.08; }
`;

const distortion = keyframes`
  0% { transform: skew(0deg); }
  20% { transform: skew(-0.5deg); }
  40% { transform: skew(0.5deg); }
  60% { transform: skew(-0.25deg); }
  80% { transform: skew(0.25deg); }
  100% { transform: skew(0deg); }
`;

const bassLine = keyframes`
  0% { transform: scaleY(1) translateY(0); }
  50% { transform: scaleY(1.5) translateY(-2px); }
  100% { transform: scaleY(1) translateY(0); }
`;

const StorySection = styled.section`
  padding: ${(props) => props.theme.spacing.xl} 0;
  background-color: #000000;
  position: relative;
  overflow: hidden;
  animation: ${distortion} 5s infinite linear;

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

const WaveBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.15;
  pointer-events: none;
  transform: rotate(-5deg);

  div {
    width: 2px;
    height: 100px;
    background: linear-gradient(
      to bottom,
      rgba(255, 159, 28, 0.8),
      rgba(231, 29, 54, 0.8)
    );
    margin: 0 4px;
    animation: ${bassLine} 0.8s infinite;
    transform-origin: bottom;
    box-shadow: 0 0 15px rgba(255, 159, 28, 0.5);

    &:nth-child(2n) {
      animation-delay: 0.2s;
      height: 120px;
    }
    &:nth-child(3n) {
      animation-delay: 0.4s;
      height: 90px;
    }
    &:nth-child(4n) {
      animation-delay: 0.6s;
      height: 140px;
    }
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right,
      rgba(252, 230, 125, 0.2),
      rgba(241, 203, 232, 0.2)
    );
    mix-blend-mode: overlay;
    z-index: 2;
    transition: opacity 0.5s ease;
  }

  &:hover::before {
    opacity: 0; // Hace el overlay transparente en hover
  }

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 3;
  }
`;

const StoryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(1.1);
  transition: filter 0.5s ease;

  ${ImageCard}:hover & {
    filter: none; // Quita todos los filtros en hover
  }
`;

const StoryContainer = styled.div`
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

const Title = styled(motion.h2)`
  font-family: "Anurati", "Garet", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 3rem;
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

const Story = () => {
  const { t } = useTranslation();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Convertir la posición del mouse a grados de rotación
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <StorySection>
      <Starfield />
      <WaveBackground>
        {[...Array(20)].map((_, i) => (
          <div key={i} />
        ))}
      </WaveBackground>
      <StoryContainer>
        <TextContent>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("story.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("story.title")}
          </Title>
          <Description
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p>{t("story.description1")}</p>
            <p>{t("story.description2")}</p>
          </Description>
        </TextContent>
        <ImageCard
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          <StoryImage
            src="/assets/images/MonkeyBusinessStory.webp"
            alt={t("story.imageAlt")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </ImageCard>
      </StoryContainer>
    </StorySection>
  );
};

export default Story;

// Add Starfield component after styled components, before Story const
// Similar to Hero's Starfield
// Adjust colors and speed for Story's theme (orange touches already in #ff6d4d, but Story has rgba(255,159,28) etc., so use #ff6d4d)
const Starfield = () => {
  const canvasRef = useRef(null);
  const stars = useRef([]);

  useEffect(() => {
    stars.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 2000,
      color: Math.random() > 0.7 ? '#ff6d4d' : '#ffffff',
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
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const speed = 10; // Ajustado para coincidir con Hero
    stars.current.forEach(star => {
      star.z -= speed;
      if (star.z <= 1) {
        star.z = 2000;
        star.x = Math.random() * 2000 - 1000;
        star.y = Math.random() * 2000 - 1000;
      }
      const sx = (star.x / star.z) * (canvas.width / 2) + (canvas.width / 2);
      const sy = (star.y / star.z) * (canvas.height / 2) + (canvas.height / 2);
      const size = (1 - star.z / 2000) * 5;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};
