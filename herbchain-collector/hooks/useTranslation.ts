import { useLanguage } from '@/contexts/LanguageContext';

// Custom hook that provides translation function and language utilities
export const useTranslation = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return {
    t,
    language,
    setLanguage,
    isEnglish: language === 'en',
    isHindi: language === 'hi',
  };
};

// Hook for getting direction (useful for RTL languages in future)
export const useDirection = () => {
  const { language } = useLanguage();
  
  return {
    direction: 'ltr', // Both English and Hindi are LTR
    isRTL: false,
  };
};
