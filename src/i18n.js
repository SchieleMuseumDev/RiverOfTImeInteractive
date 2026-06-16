import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HTTPApi from "i18next-http-backend";

const isProduction = process.env.NODE_ENV === 'production';

i18next
.use(initReactI18next)
.use(LanguageDetector)
.use(HTTPApi)
.init({
    fallbackLng:"en",
    backend: {
      // Add your repository name right after the leading slash
      loadPath: isProduction 
      ? '/RiverOfTImeInteractive/locales/{{lng}}/{{ns}}.json' 
      : '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation:{
        escapeValue: false
    },
     react: {
    bindI18n: 'languageChanged',
    useSuspense: true
  }

})

export default i18next