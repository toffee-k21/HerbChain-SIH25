"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  MapPin,
  Globe,
  Users,
  FlaskConical,
  Building2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface OnboardingStep {
  id: string;
  type: "location" | "language" | "intro" | "role";
  heading: string;
  text: string;
  image?: string;
  icon?: React.ReactNode;
  buttons?: Array<{
    text: string;
    variant: "default" | "outline" | "secondary";
    action: () => void;
  }>;
}

export const OnboardingCarousel = () => {
  const { t, setLanguage, language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleLocationAllow = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location allowed:", position.coords);
          setCurrentStep(1);
        },
        (error) => {
          console.log("Location denied:", error);
          setCurrentStep(1);
        }
      );
    } else {
      setCurrentStep(1);
    }
  };

  const handleLanguageSelect = (lang: "en" | "hi") => {
    setLanguage(lang);
    setCurrentStep(2);
  };

  const handleRoleSelect = (role: string) => {
    console.log("Role selected:", role);
    router.push("/kyc");
  };

  const steps: OnboardingStep[] = [
    // Step 1: Location Permission
    {
      id: "location",
      type: "location",
      heading: t("onboarding.location.title"),
      text: t("onboarding.location.text"),
      icon: <MapPin className="w-20 h-20 text-primary" />,
      buttons: [
        {
          text: t("onboarding.location.allow"),
          variant: "default",
          action: handleLocationAllow,
        },
        {
          text: t("onboarding.location.skip"),
          variant: "outline",
          action: () => setCurrentStep(1),
        },
      ],
    },
    // Step 2: Language Selection
    {
      id: "language",
      type: "language",
      heading: t("onboarding.language.title"),
      text: t("onboarding.language.text"),
      icon: <Globe className="w-20 h-20 text-primary" />,
      buttons: [
        {
          text: t("onboarding.language.english"),
          variant: "outline",
          action: () => handleLanguageSelect("en"),
        },
        {
          text: t("onboarding.language.hindi"),
          variant: "outline",
          action: () => handleLanguageSelect("hi"),
        },
      ],
    },
    // Step 3: Wild Collectors and Farmers
    {
      id: "wild-collectors",
      type: "intro",
      heading: t("onboarding.wildcollectors.title"),
      text: t("onboarding.wildcollectors.text"),
      icon: <Users className="w-20 h-20 text-primary" />,
    },
    // Step 4: Lab Technicians
    {
      id: "lab-technicians",
      type: "intro",
      heading: t("onboarding.labtechnicians.title"),
      text: t("onboarding.labtechnicians.text"),
      icon: <FlaskConical className="w-20 h-20 text-primary" />,
    },
    // Step 5: StakeHolders
    {
      id: "stakeholders",
      type: "intro",
      heading: t("onboarding.stakeholders.title"),
      text: t("onboarding.stakeholders.text"),
      icon: <Building2 className="w-20 h-20 text-primary" />,
    },
    // Step 6: Consumers
    {
      id: "consumers",
      type: "intro",
      heading: t("onboarding.consumers.title"),
      text: t("onboarding.consumers.text"),
      icon: <ShoppingCart className="w-20 h-20 text-primary" />,
    },
    // Step 7: Role Selection
    {
      id: "role-selection",
      type: "role",
      heading: t("onboarding.role.title"),
      text: t("onboarding.role.text"),
      buttons: [
        {
          text: t("onboarding.role.wildcollector"),
          variant: "default",
          action: () => handleRoleSelect("wild-collector"),
        },
        {
          text: t("onboarding.role.labtechnician"),
          variant: "default",
          action: () => handleRoleSelect("lab-technician"),
        },
        {
          text: t("onboarding.role.stakeholder"),
          variant: "default",
          action: () => handleRoleSelect("stakeholder"),
        },
        {
          text: t("onboarding.role.consumer"),
          variant: "default",
          action: () => handleRoleSelect("consumer"),
        },
      ],
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Indicators */}
      <div className="flex justify-center items-center p-4 space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === currentStep
                ? "bg-primary"
                : index < currentStep
                ? "bg-primary/60"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center max-w-md w-full space-y-8"
          >
            {/* Icon or Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              {currentStepData.image ? (
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-primary">
                  <Image
                    src={currentStepData.image}
                    alt={currentStepData.heading}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                currentStepData.icon
              )}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-gray-800"
            >
              {currentStepData.heading}
            </motion.h1>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {currentStepData.text}
            </motion.p>

            {/* Buttons */}
            {currentStepData.buttons && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`space-y-4 ${
                  currentStepData.type === "language" ||
                  currentStepData.type === "role"
                    ? "grid grid-cols-1 gap-3"
                    : ""
                } ${currentStepData.type === "role" ? "grid-cols-2" : ""}`}
              >
                {currentStepData.buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant}
                    onClick={button.action}
                    className={`w-full py-6 text-lg font-semibold ${
                      button.variant === "default"
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                        : "border-primary text-primary hover:bg-primary/10"
                    }`}
                    size="lg"
                  >
                    {button.text}
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (for intro screens) */}
      {currentStepData.type === "intro" && (
        <div className="flex justify-between items-center p-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t("common.previous")}</span>
          </Button>

          {/* <div className="flex space-x-2">
            {steps
              .filter((step) => step.type === 'intro')
              .map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentStep - 2 === index ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
          </div> */}

          <Button
            variant="ghost"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2"
          >
            <span>{t("common.next")}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
