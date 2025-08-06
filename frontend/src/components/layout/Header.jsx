import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import WeatherTime from "./WeatherTime";
import SocialIcons from "./SocialIcons";

const BREAKPOINTS = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 1rem;
  height: 100px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    height: auto;
    min-height: 120px;
    padding: 0.8rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    min-height: 100px;
    padding: 0.6rem 0.3rem;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    min-height: 80px;
    padding: 0.4rem 0.2rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0 1rem;
    margin-bottom: 0.3rem;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    padding: 0 0.5rem;
    margin-bottom: 0.2rem;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: calc(100% - 3rem);

  @media (max-width: ${BREAKPOINTS.tablet}) {
    justify-content: space-between;
    position: relative;
    flex-direction: row;
    align-items: center;
    gap: 0;
    height: auto;
    min-height: 60px;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    min-height: 50px;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    min-height: 40px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  z-index: 1001;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding-left: 1rem;
    justify-content: flex-start;
    width: auto;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    padding-left: 0.5rem;
  }

  img {
    height: 200px;
    width: auto;

    @media (max-width: ${BREAKPOINTS.tablet}) {
      height: 50px;
    }

    @media (max-width: ${BREAKPOINTS.mobileL}) {
      height: 45px;
    }

    @media (max-width: ${BREAKPOINTS.mobileS}) {
      height: 35px;
    }
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-right: 4rem;
  position: relative;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    padding: 0;
    width: 100%;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    display: flex;
  `}
`;

const LogoImage = styled.img`
  height: 150px;
  width: auto;
  transition: all 0.3s ease;
  object-fit: contain;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    height: 60px;
    margin: 0 auto;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    height: 50px;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    height: 30px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.md};
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    height: 100vh;
    width: 85%;
    max-width: 450px;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 4rem 2rem 2rem 2rem;
    transition: right 0.3s ease-in-out;
    z-index: 2000;
    overflow-y: auto;
    gap: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    width: 90%;
    padding: 3rem 1.5rem 2rem 1.5rem;
    gap: 1.2rem;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    width: 95%;
    padding: 2.5rem 1rem 1.5rem 1rem;
    gap: 1rem;
  }
`;

const HamburgerButton = styled.button`
  z-index: 2001;
  display: none;
  background: none;
  border: none;
  color: #ff6d4d;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-left: auto;
  position: relative;
  top: 0;
  right: 0;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, rgba(255, 109, 77, 0.1), rgba(255, 109, 77, 0.05));
    backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 109, 77, 0.4);
    border-radius: 15px;
    padding: 12px;
    margin-right: 1rem;
    box-shadow: 0 8px 32px rgba(255, 109, 77, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.6s ease;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(255, 109, 77, 0.2), rgba(255, 109, 77, 0.1));
      border-color: rgba(255, 109, 77, 0.6);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 12px 40px rgba(255, 109, 77, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    &:active {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 4px 16px rgba(255, 109, 77, 0.2);
    }
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    width: 45px;
    height: 45px;
    padding: 10px;
    margin-right: 0.8rem;
    border-radius: 12px;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    width: 40px;
    height: 40px;
    padding: 8px;
    margin-right: 0.5rem;
    border-radius: 10px;
  }

  span {
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #ff6d4d, #ff8a65);
    border-radius: 3px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    transform-origin: center;
    margin: 2px 0;
    box-shadow: 0 1px 3px rgba(255, 109, 77, 0.3);

    &:first-child {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg) translateY(8px)" : "rotate(0) translateY(0)"};
      background: ${({ $isOpen }) =>
        $isOpen ? "linear-gradient(90deg, #ffffff, #ff6d4d)" : "linear-gradient(90deg, #ff6d4d, #ff8a65)"};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
      transform: ${({ $isOpen }) =>
        $isOpen ? "scale(0) rotate(180deg)" : "scale(1) rotate(0)"};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(-45deg) translateY(-8px)" : "rotate(0) translateY(0)"};
      background: ${({ $isOpen }) =>
        $isOpen ? "linear-gradient(90deg, #ffffff, #ff6d4d)" : "linear-gradient(90deg, #ff6d4d, #ff8a65)"};
    }
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    span {
      height: 2.5px;
      margin: 1.5px 0;

      &:first-child {
        transform: ${({ $isOpen }) =>
          $isOpen ? "rotate(45deg) translateY(6px)" : "rotate(0) translateY(0)"};
      }

      &:nth-child(3) {
        transform: ${({ $isOpen }) =>
          $isOpen ? "rotate(-45deg) translateY(-6px)" : "rotate(0) translateY(0)"};
      }
    }
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    span {
      height: 2px;
      margin: 1px 0;

      &:first-child {
        transform: ${({ $isOpen }) =>
          $isOpen ? "rotate(45deg) translateY(5px)" : "rotate(0) translateY(0)"};
      }

      &:nth-child(3) {
        transform: ${({ $isOpen }) =>
          $isOpen ? "rotate(-45deg) translateY(-5px)" : "rotate(0) translateY(0)"};
      }
    }
  }
`;

const NavLink = styled(Link)`
  --primary-color: ${(props) => (props.$isEvents ? "#ff6d4d" : "#FFFFFF")};
  --glow-color: ${(props) =>
    props.$isEvents ? "rgba(255, 109, 77, 0.4)" : "rgba(255, 255, 255, 0.2)"};
  --shadow-color: ${(props) =>
    props.$isEvents ? "rgba(255, 109, 77, 0.1)" : "rgba(255, 255, 255, 0.1)"};

  position: relative;
  padding: 0.7em 1.7em;
  font-size: 15px;
  color: var(--primary-color);
  background: rgba(0, 0, 0, 0.1);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid var(--glow-color);
  border-radius: 2px;
  backdrop-filter: blur(5px);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--glow-color),
      transparent
    );
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-1px);
    color: var(--primary-color);
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px var(--shadow-color);

    &::before {
      opacity: 1;
      animation: shimmer 1.5s ease-in-out infinite;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @media (max-width: ${BREAKPOINTS.laptop}) {
    width: 100%;
    text-align: center;
    padding: 1.2rem 1.5rem;
    margin: 0;
    font-size: 1.3rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 109, 77, 0.1);
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(255, 109, 77, 0.1);
      border-color: rgba(255, 109, 77, 0.3);
      transform: translateY(-2px);
    }
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    min-height: 55px;
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
    min-height: 50px;
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1999;
    transition: opacity 0.3s ease;
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  }
`;

const SocialNavLink = styled.a`
  width: 100%;
  text-align: center;
  padding: 1.2rem 1.5rem;
  margin: 0;
  font-size: 1.3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 109, 77, 0.1);
  color: #ff6d4d;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  min-height: 60px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    color: #ffffff;

    svg {
      fill: #ffffff;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #ff6d4d;
    transition: fill 0.3s ease;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}) {
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    min-height: 55px;
    gap: 0.6rem;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: ${BREAKPOINTS.mobileS}) {
    padding: 0.8rem 1rem;
    font-size: 1.1rem;
    min-height: 50px;
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <HeaderContainer
      style={{
        backgroundColor: scrolled
          ? "rgba(31, 27, 36, 0.6)"
          : "rgba(31, 27, 36, 0.4)",
        padding: scrolled ? "0.3rem" : "0.4rem",
      }}
    >
      <TopBar>
        <WeatherTime />
        <SocialIcons />
      </TopBar>
      <Container>
        <LogoContainer to="/">
          <LogoImage src="/assets/images/logos/MLabTransparent.webp" alt="MLab Logo" />
        </LogoContainer>
        <NavContainer $isOpen={isMenuOpen}>
          <HamburgerButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            $isOpen={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </HamburgerButton>
          <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
          <NavLinks $isOpen={isMenuOpen}>
            <NavLink to="/" onClick={closeMenu}>
              {t("header.home")}
            </NavLink>
            <NavLink to="/nosotros" onClick={closeMenu}>
              {t("header.about")}
            </NavLink>
            <NavLink to="/contacto" onClick={closeMenu}>
              {t("header.contact")}
            </NavLink>
            <NavLink to="/eventos" onClick={closeMenu} $isEvents>
              {t("header.events")}
            </NavLink>
            <NavLink to="/declaracion" onClick={closeMenu}>
              {t("header.declaration")}
            </NavLink>
            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <LanguageSwitch />
            </div>
            <SocialNavLink
              href="https://www.instagram.com/mlab.vlc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialNavLink>
          </NavLinks>
        </NavContainer>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
