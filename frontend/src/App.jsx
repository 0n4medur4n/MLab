import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MusicLoader from "./components/MusicLoader";
import BackgroundMusic from "./components/BackgroundMusic";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Main = styled(motion.main)`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
`;

// Componente interno que usa useLocation dentro del contexto de BrowserRouter
const AppContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Main
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AppRoutes location={location} />
        </Main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BackgroundMusic startWithLoader={true} />
      <BrowserRouter>
        <div style={{ position: 'relative' }}>
          {/* Preload content in background */}
          <div style={{ 
            opacity: isLoading ? 0 : 1, 
            transition: 'opacity 0.8s ease-in-out',
            position: isLoading ? 'absolute' : 'relative',
            width: '100%',
            zIndex: isLoading ? -1 : 1
          }}>
            <AppContent />
          </div>
          
          {/* Show loader on top */}
          {isLoading && (
            <MusicLoader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
