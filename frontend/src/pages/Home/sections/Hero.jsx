import styled, { keyframes } from "styled-components";
import { motion, useScroll, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/HeroMLAB.webp');
  background-size: cover;
  background-position: center -150px;
  background-repeat: no-repeat;
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: ${(props) => props.theme.spacing.xl};
  max-width: 1200px;
  width: 90%;
  transform-style: preserve-3d;
  perspective: 1000px;

  &::before {
    content: "";
    position: absolute;
    inset: -1px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    border: 1px solid rgba(255, 255, 255, 0.2);
    transform: translateZ(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled(motion.h1)`
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.md};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateZ(50px);
`;

const Subtitle = styled(motion.p)`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.white};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
  transform: translateZ(30px);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const CTAButton = styled(Link)`
  font-size: 15px;
  padding: 0.7em 2.7em;
  letter-spacing: 0.06em;
  margin-top: 5rem;
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

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotateX: -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      rotateX: -10,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <HeroSection ref={containerRef}>
      <Starfield />
      <HeroContent
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ y, opacity, scale, rotateX }}
      >
        <Title variants={itemVariants}>{t("home.hero.title")}</Title>
        <Subtitle variants={itemVariants}>{t("home.hero.subtitle")}</Subtitle>
        <CTAButton to="/eventos" variants={itemVariants}>
          {t("home.hero.ctaButton")}
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

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

    const speed = 10;
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
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
};
