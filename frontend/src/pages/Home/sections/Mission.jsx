import styled from "styled-components";
import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const MissionSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  padding: 4rem 0;
`;

const NoiseOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/%3E%3C/svg%3E');
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
`;

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 4rem;
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
  font-family: 'Anurati', 'Garet', sans-serif;
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

const ImageCard = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 600px;
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
    opacity: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 3;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 400px;
    margin-bottom: 2rem;
  }
`;

const MissionImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(1.1);
  transition: filter 0.5s ease;

  ${ImageCard}:hover & {
    filter: none;
  }
`;

const Mission = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

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
    <MissionSection ref={ref}>
      <WaveBackground />
      <NoiseOverlay />
      <Grid style={{ opacity }}>
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
          <MissionImage
            src="/assets/images/MissionMonkeyBusiness.webp"
            alt={t("mission.imageAlt")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </ImageCard>
        <TextContent>
          <Label
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("mission.label")}
          </Label>
          <Title
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("mission.title")}
          </Title>
          <Description
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p>{t("mission.description1")}</p>
            <p>{t("mission.description2")}</p>
          </Description>
        </TextContent>
      </Grid>
    </MissionSection>
  );
};

export default Mission;

// Add NebulaBackground component after styled components, before Mission const
// Harmonious travel theme: animated gradient nebula with black and orange
const NebulaBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, '#ff6d4d');
    gradient.addColorStop(1, 'black');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Subtle animation: slow shift
    ctx.globalAlpha = 0.1 + Math.sin(time * 0.001) * 0.05;
  });

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};

// Replace NebulaBackground with WaveBackground
// Subtle wave gradient in orange tones over black with minimal particles
// Adjust WaveBackground for multiple orange gradients over black
// Use shades like #ff6d4d, #ff8c00, #ffa500 for variety
const WaveBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Create few particles with orange colors
    particles.current = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: ['#ff6d4d', '#ff8c00', '#ffa500'][Math.floor(Math.random() * 3)],
    }));

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useAnimationFrame((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Wave gradient with varying orange shades
    for (let y = 0; y < canvas.height; y += 10) {
      const intensity = Math.sin((y / canvas.height + time * 0.0005) * Math.PI * 2) * 0.3 + 0.3;
      const shade = Math.floor((y / canvas.height) * 3);
      const colors = ['rgba(255, 109, 77, ${intensity})', 'rgba(255, 140, 0, ${intensity})', 'rgba(255, 165, 0, ${intensity})'];
      ctx.fillStyle = colors[shade % 3];
      ctx.fillRect(0, y, canvas.width, 10);
    }

    // Subtle particles
    particles.current.forEach(p => {
      p.y += p.speed;
      if (p.y > canvas.height) p.y = 0;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 0.2; // Subtle opacity
  });

  return (
    <motion.canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};
