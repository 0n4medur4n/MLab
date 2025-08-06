import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const PlaylistSection = styled.section`
  position: relative;
  min-height: auto;
  padding: 6rem 0;
  background-color: #000000;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 215, 0, 0.2),
      transparent
    );
  }
`;

const PlaylistContainer = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 2rem;
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
  margin-bottom: 4rem;
  font-weight: 300;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const PlaylistCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 215, 0, 0.3);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
`;

const PlaylistTitle = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: 1px;
`;

const IframeContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);

  iframe {
    border-radius: 12px;
    transition: all 0.3s ease;
  }
`;

const Playlist = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <PlaylistSection ref={ref}>
      <PlaylistContainer style={{ opacity }}>
        <Label
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("playlist.label")}
        </Label>
        <Title
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("playlist.title")}
        </Title>

        <Description
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("playlist.description")}
        </Description>

        <PlaylistGrid>
          <PlaylistCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PlaylistTitle>Spotify</PlaylistTitle>
            <IframeContainer>
              <iframe
                src="https://open.spotify.com/embed/playlist/52Xqqkxv2g5VNRkfUO0aX8?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </IframeContainer>
          </PlaylistCard>

          <PlaylistCard
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PlaylistTitle>SoundCloud</PlaylistTitle>
            <IframeContainer>
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="0"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1971375740&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
              />
            </IframeContainer>
          </PlaylistCard>
        </PlaylistGrid>
      </PlaylistContainer>
    </PlaylistSection>
  );
};

export default Playlist;
