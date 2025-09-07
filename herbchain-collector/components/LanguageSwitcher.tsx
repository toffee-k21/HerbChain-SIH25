'use client';

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Globe, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', name: t('common.english'), flag: '🇺🇸' },
    { code: 'hi', name: t('common.hindi'), flag: '🇮🇳' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Languages className="w-4 h-4 text-gray-600" />
        </motion.button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary-600" />
            {t('common.language')}
          </DialogTitle>
          <DialogDescription>
            Choose your preferred language for the app
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                language === lang.code
                  ? 'border-primary-200 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className={`font-medium ${
                    language === lang.code ? 'text-primary-700' : 'text-gray-700'
                  }`}>
                    {lang.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lang.code === 'en' ? 'English' : 'हिंदी'}
                  </p>
                </div>
              </div>
              
              <AnimatePresence>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
