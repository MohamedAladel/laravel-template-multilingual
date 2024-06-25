import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation_en from './Translations/en/translation.json'
import translation_ar from './Translations/ar/translation.json'
import translation_id from './Translations/id/translation.json'

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: true,
    lng:'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
      
    },
    resources: {
        en: {
            translation: translation_en,
        },
        ar: {
            translation: translation_ar,
        },
        id: {
            translation: translation_id,
        }
    }
  });

export default i18n;