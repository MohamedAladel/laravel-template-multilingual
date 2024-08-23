import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation_en from './Translations/en/translation.json'
import translation_ar from './Translations/ar/translation.json'
import translation_id from './Translations/id/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
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
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      // Persist the user's language preference
     persistentUser: true
    }
  });

export default i18n;
