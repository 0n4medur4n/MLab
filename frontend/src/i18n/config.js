import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { es } from "./translations/es";
import { en } from "./translations/en";
import { fr } from "./translations/fr";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: es,
      },
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    fallbackLng: "es",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
