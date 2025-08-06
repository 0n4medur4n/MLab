import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';

const pulse = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(2.5);
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
`;

const WaveContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 3px;
  margin-bottom: 40px;
`;

const WaveBar = styled(motion.div)`
  width: 4px;
  background: linear-gradient(to top, #ff006e, #8338ec, #3a86ff);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(131, 56, 236, 0.5);
`;

const MusicNote = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  color: #8338ec;
  opacity: 0.7;
  text-shadow: 0 0 10px rgba(131, 56, 236, 0.8);
`;

const LoaderText = styled(motion.div)`
  font-family: 'Garet Heavy', sans-serif;
  font-size: 24px;
  color: #ffffff;
  margin-top: 20px;
  text-align: center;
  letter-spacing: 2px;
`;

const SubtitleText = styled(motion.div)`
  font-family: 'Garet Book', sans-serif;
  font-size: 14px;
  color: #cccccc;
  margin-top: 10px;
  text-align: center;
  letter-spacing: 1px;
`;

const CircularLoader = styled(motion.div)`
  width: 120px;
  height: 120px;
  border: 3px solid transparent;
  border-radius: 50%;
  position: relative;
  margin-bottom: 30px;
`;

const CircularProgress = styled(motion.div)`
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #ff006e;
  border-right: 3px solid #8338ec;
  border-bottom: 3px solid #3a86ff;
  border-radius: 50%;
  position: absolute;
  top: -3px;
  left: -3px;
`;

const MusicLoader = ({ onLoadingComplete }) => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const waveBars = Array.from({ length: 12 }, (_, i) => i);
  const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♯'];

  const noteVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: (i) => ({
      opacity: [0, 0.7, 0],
      y: [-20, -80, -100],
      scale: [0.5, 1.2, 0.3],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        delay: i * 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const waveVariants = {
    hidden: { scaleY: 0.1 },
    visible: (i) => ({
      scaleY: [0.1, 2.5, 0.1],
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <LoaderContainer>
      {/* Animated background particles */}
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 80%, rgba(255, 0, 110, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(131, 56, 236, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(58, 134, 255, 0.1) 0%, transparent 50%)'
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating music notes */}
      {musicNotes.map((note, i) => (
        <MusicNote
          key={i}
          custom={i}
          variants={noteVariants}
          initial="hidden"
          animate="visible"
          style={{
            left: `${20 + i * 12}%`,
            top: `${10 + (i % 3) * 30}%`
          }}
        >
          {note}
        </MusicNote>
      ))}

      {/* Central loader with circular animation */}
      <CircularLoader>
        <CircularProgress
          animate={{
            rotate: 360 * (progress / 100),
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '14px',
            color: '#ffffff',
            fontFamily: 'Garet Heavy'
          }}
        >
          {progress}%
        </motion.div>
      </CircularLoader>

      {/* Sound wave animation */}
      <WaveContainer>
        {waveBars.map((_, i) => (
          <WaveBar
            key={i}
            custom={i}
            variants={waveVariants}
            initial="hidden"
            animate="visible"
            style={{
              height: `${20 + (i % 4) * 15}px`,
              backgroundColor: `hsl(${280 + i * 20}, 70%, 60%)`
            }}
          />
        ))}
      </WaveContainer>

      {/* Loading text with typewriter effect */}
      <LoaderText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {t('loader.title')}
      </LoaderText>

      <SubtitleText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {t('loader.subtitle')}
      </SubtitleText>

      {/* Pulsing circles in background */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            border: `1px solid rgba(131, 56, 236, ${0.3 - i * 0.1})`,
            borderRadius: '50%'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </LoaderContainer>
  );
};

export default MusicLoader;