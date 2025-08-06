import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${props => props.theme?.colors?.background || '#1f1b24'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
`;

const UndergroundText = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px ${props => props.theme.colors.primary}40;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.8rem;
    letter-spacing: 0.2em;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.secondary};
  letter-spacing: 0.1em;
  opacity: 0.7;
  text-transform: lowercase;
`;

const PulseContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 2rem 0;
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  opacity: 0;
`;

const Dot = styled(motion.div)`
  width: 4px;
  height: 4px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  position: absolute;
`;

const GlitchOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    ${props => props.theme.colors.primary}05 2px,
    ${props => props.theme.colors.primary}05 4px
  );
  pointer-events: none;
  z-index: 1;
`;

const StaticNoise = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: 
    radial-gradient(circle at 20% 50%, ${props => props.theme.colors.primary} 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, ${props => props.theme.colors.secondary} 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, ${props => props.theme.colors.primary}40 1px, transparent 1px);
  background-size: 40px 40px, 60px 60px, 30px 30px;
`;

const MusicLoader = ({ isLoading, onLoadingComplete }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <LoaderContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <StaticNoise
        animate={{
          backgroundPosition: [
            '0px 0px, 0px 0px, 0px 0px',
            '40px 40px, -60px -60px, 30px 30px',
            '80px 80px, -120px -120px, 60px 60px'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <GlitchOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0, 0.08, 0] }}
        transition={{ 
          duration: 0.15, 
          repeat: Infinity, 
          repeatDelay: 0.2 
        }}
      />
      
      <UndergroundText
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        {t('loader.title')}
      </UndergroundText>

      <PulseContainer>
        <PulseRing
          style={{ width: '60px', height: '60px', top: 0, left: 0 }}
          animate={{
            scale: [1, 1.8, 2.5],
            opacity: [0.9, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <PulseRing
          style={{ width: '60px', height: '60px', top: 0, left: 0 }}
          animate={{
            scale: [1, 1.8, 2.5],
            opacity: [0.9, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        
        <Dot
          style={{ top: '28px', left: '28px' }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </PulseContainer>

      <Subtitle
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        {t('loader.subtitle')}
      </Subtitle>

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '1px',
            height: `${15 + Math.random() * 25}px`,
            background: `#ff6d4d${Math.floor(Math.random() * 30 + 10).toString(16)}`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.3, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </LoaderContainer>
  );
};

export default MusicLoader;