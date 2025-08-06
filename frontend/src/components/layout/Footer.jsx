import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhone, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FooterContainer = styled.footer`
  background: linear-gradient(
    180deg,
    rgba(20, 17, 24, 0.9) 0%,
    rgba(20, 17, 24, 0.98) 100%
  );
  backdrop-filter: blur(10px);
  color: ${(props) => props.theme.colors.text};
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 109, 77, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 109, 77, 0.2),
      transparent
    );
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    padding: 3.5rem 1.5rem 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 1.5rem 1.5rem;
    
    &::before {
      display: none;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    padding: 2.5rem 1rem 1rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    padding: 2rem 0.75rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 109, 77, 0.2),
      transparent
    );
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    max-width: 1000px;
    gap: 3rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
    max-width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    
    &::after {
      bottom: -1.5rem;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    gap: 1.5rem;
    
    &::after {
      bottom: -1rem;
    }
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  border: 1px solid rgba(255, 109, 77, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: translateY(-5px);
    border-color: rgba(255, 109, 77, 0.2);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    padding: 1.8rem;
    gap: 1.3rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 1.6rem;
    gap: 1.2rem;
    border-radius: 12px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    padding: 1.5rem;
    gap: 1rem;
    border-radius: 10px;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    padding: 1.2rem;
    gap: 0.8rem;
    border-radius: 8px;
  }
`;

const SectionTitle = styled.h3`
  color: #ff6d4d;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 2px;
    background: #ff6d4d;
    transition: width 0.3s ease;
  }

  ${FooterSection}:hover &::after {
    width: 50px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 1.1rem;
    letter-spacing: 1.5px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 0.95rem;
    letter-spacing: 1px;
    margin-bottom: 0.7rem;
    text-align: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    margin-bottom: 0.6rem;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  position: relative;
  width: fit-content;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #ff6d4d;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ff6d4d;
    transform: translateX(10px);

    &::before {
      width: 100%;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 0.8rem;
    padding: 0.35rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
    justify-content: center;
    width: 100%;
    
    &:hover {
      transform: translateX(5px);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 0.8rem;
    padding: 0.3rem 0;
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  width: fit-content;

  &:hover {
    color: #ff6d4d;
    transform: translateX(10px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 0.8rem;
    padding: 0.35rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 0.85rem;
    padding: 0.4rem 0;
    justify-content: center;
    width: 100%;
    
    &:hover {
      transform: translateX(5px);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 0.8rem;
    padding: 0.3rem 0;
    gap: 0.3rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  border: 1px solid rgba(255, 109, 77, 0.1);

  &:hover {
    color: #ff6d4d;
    transform: translateY(-5px) rotate(360deg);
    background: rgba(255, 109, 77, 0.1);
    border-color: #ff6d4d;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 1.4rem;
    padding: 0.45rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.3rem;
    padding: 0.4rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 1.6rem;
    padding: 0.6rem;
    
    &:hover {
      transform: translateY(-3px) rotate(360deg);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 1.4rem;
    padding: 0.5rem;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.8;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    margin-top: 2.5rem;
    padding-top: 1.8rem;
    font-size: 0.75rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-top: 2rem;
    padding-top: 1.5rem;
    font-size: 0.7rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    margin-top: 1.5rem;
    padding-top: 1.2rem;
    font-size: 0.7rem;
    padding: 1.2rem 1rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    margin-top: 1.2rem;
    padding-top: 1rem;
    font-size: 0.65rem;
    padding: 1rem 0.75rem 0;
  }
`;

const Slogan = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff6d4d;
  margin-top: 4rem;
  letter-spacing: 2px;
  opacity: 0.9;
  text-transform: uppercase;
  background: linear-gradient(to right, #ff6d4d 0%, #ffb347 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 2.2rem;
    margin-top: 3.5rem;
    letter-spacing: 1.5px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
    margin-top: 3rem;
    letter-spacing: 1px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 1.6rem;
    margin-top: 2.5rem;
    letter-spacing: 0.5px;
    line-height: 1.2;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 1.3rem;
    margin-top: 2rem;
    letter-spacing: 0.3px;
    line-height: 1.3;
  }
`;

const Credits = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 2.5rem 0;
  font-style: italic;
  line-height: 1.8;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding: 0 2rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 1px;
    background: linear-gradient(to right, transparent, #ff6d4d, transparent);
    top: 50%;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  a {
    color: #ff6d4d;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
    padding: 0 2px;

    &::after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #ff6d4d;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      color: #ffb347;
      text-decoration: none;

      &::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    font-size: 0.9rem;
    padding: 0 1.8rem;
    margin: 2.2rem 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 0.85rem;
    padding: 0 1.5rem;
    line-height: 1.7;
    margin: 2rem 0;
    max-width: 600px;
    
    &::before,
    &::after {
      width: 20px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileL}) {
    font-size: 0.8rem;
    padding: 0 1rem;
    line-height: 1.6;
    margin: 1.8rem 0;
    max-width: 100%;
    
    &::before,
    &::after {
      display: none;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobileS}) {
    font-size: 0.75rem;
    padding: 0 0.75rem;
    line-height: 1.5;
    margin: 1.5rem 0;
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>{t("footer.navigation")}</SectionTitle>
          <FooterLink to="/">{t("header.home")}</FooterLink>
          <FooterLink to="/eventos">{t("header.events")}</FooterLink>
          <FooterLink to="/nosotros">{t("header.about")}</FooterLink>
          <FooterLink to="/contacto">{t("header.contact")}</FooterLink>
          <FooterLink to="/declaracion">{t("header.declaration")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>{t("footer.legal")}</SectionTitle>
          <FooterLink to="/cookies">{t("footer.cookies")}</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/privacidad">{t("footer.privacy")}</FooterLink>
          <FooterLink to="/terminos">{t("footer.terms")}</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>{t("footer.contact")}</SectionTitle>
          <ExternalLink href="tel:+34600000000">
            <FaPhone /> +34 600 000 000
          </ExternalLink>
          <ExternalLink href="mailto:monkeylab.ad@gmail.com">

            <FaEnvelope /> monkeylab.ad@gmail.com
          </ExternalLink>
          <SocialLinks>
            <SocialIcon
              href="https://www.instagram.com/mlab.vlc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://www.facebook.com/monkeybusinessvalencia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Slogan>Music Dealers, Experience Makers.</Slogan>

      <Credits>
        Elevating digital artistry with{" "}
        <a
          href="https://becr3ative.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Be Creative
        </a>
        . Where innovation meets emotion, transforming visions into
        extraordinary digital experiences. Each pixel crafted with purpose,
        every interaction designed to inspire.
      </Credits>

      <Copyright>
        © {currentYear} MLab Valencia. {t("footer.rights")}
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
