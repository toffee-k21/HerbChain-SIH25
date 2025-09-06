"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface KycCarouselSlide {
  id: string;
  image: string;
  heading: string;
  primaryText: string;
  secondaryText: string;
}

export const KycCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const slides: KycCarouselSlide[] = [
    {
      id: "collectors",
      image: "/farmer.png",
      heading: t('kyc.carousel.collectors.title'),
      primaryText: t('kyc.carousel.collectors.primary'),
      secondaryText: t('kyc.carousel.collectors.secondary'),
    },
    {
      id: "technicians",
      image: "/analysis.png",
      heading: t('kyc.carousel.technicians.title'),
      primaryText: t('kyc.carousel.technicians.primary'),
      secondaryText: t('kyc.carousel.technicians.secondary'),
    },
    {
      id: "stakeholders",
      image: "/farmer.png",
      heading: t('kyc.carousel.stakeholders.title'),
      primaryText: t('kyc.carousel.stakeholders.primary'),
      secondaryText: t('kyc.carousel.stakeholders.secondary'),
    },
    {
      id: "consumers",
      image: "/consumers.png",
      heading: t('kyc.carousel.consumers.title'),
      primaryText: t('kyc.carousel.consumers.primary'),
      secondaryText: t('kyc.carousel.consumers.secondary'),
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative h-80 overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <div className="h-32 w-32 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].heading}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold mb-1"
              style={{ color: "#2b9846" }}
            >
              {slides[currentSlide].heading}
            </motion.h2>

            {/* Primary Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl font-semibold mb-1"
              style={{ color: "#FF7D24" }}
            >
              {slides[currentSlide].primaryText}
            </motion.p>

            {/* Secondary Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base leading-relaxed"
              style={{ color: "#000000" }}
            >
              {slides[currentSlide].secondaryText}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-2 opacity-100" : "w-2 opacity-50"
            }`}
            style={{
              backgroundColor: "#FF7D24", // Orange color for indicators
            }}
          />
        ))}
      </div>
    </div>
  );
};
