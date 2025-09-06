'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">
        {t('common.language')}:
      </span>
      <div className="flex rounded-md overflow-hidden border border-gray-300">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {t('common.english')}
        </button>
        <button
          onClick={() => handleLanguageChange('hi')}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            language === 'hi'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {t('common.hindi')}
        </button>
      </div>
    </div>
  );
};
