import { useEffect, useRef } from "react";

// Removed styled controls – audio will now autoplay without any visible controller.

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  // We no longer manage play/pause state from UI; audio starts automatically.

  useEffect(() => {
    if (audioRef.current) {
      // Always try to start playing when component mounts
      const playAudio = async () => {
        try {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
          // Autoplay successful.
        } catch (error) {
          console.log("Audio autoplay blocked:", error);
        }
      };
      playAudio();
    }
  }, []);

  return (
    // Hidden audio element that autoplays in loop without any user-facing controls
    <audio ref={audioRef} loop preload="auto" style={{ display: "none" }}>
      <source src="/assets/audio/Mlab.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default BackgroundMusic;
