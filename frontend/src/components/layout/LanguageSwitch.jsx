import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 0.3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.2);
  backdrop-filter: blur(5px);
  margin: 0.5rem 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    justify-content: center;
  }
`;

const LanguageButton = styled.button`
  background: ${({ $isActive }) =>
    $isActive ? "rgba(255, 166, 0, 0.2)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "#ffd700" : "#ffffff")};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .flag {
    font-size: 1.2rem;
    filter: ${({ $isActive }) => ($isActive ? "none" : "grayscale(30%)")};
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(255, 215, 0, 0.1);
    color: #ffd700;

    .flag {
      filter: none;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0.7rem 1.5rem;
    font-size: 1rem;

    .flag {
      font-size: 1.4rem;
    }
  }
`;

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitchContainer>
      <LanguageButton
        $isActive={i18n.language === "es"}
        onClick={() => changeLanguage("es")}
      >
        <span className="flag">🇪🇸</span>
        <span>ES</span>
      </LanguageButton>
      <LanguageButton
        $isActive={i18n.language === "en"}
        onClick={() => changeLanguage("en")}
      >
        <span className="flag">🇬🇧</span>
        <span>EN</span>
      </LanguageButton>
      <LanguageButton
        $isActive={i18n.language === "fr"}
        onClick={() => changeLanguage("fr")}
      >
        <span className="flag">🇫🇷</span>
        <span>FR</span>
      </LanguageButton>
    </SwitchContainer>
  );
};

export default LanguageSwitch;
