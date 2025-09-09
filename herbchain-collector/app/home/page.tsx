"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  User, 
  Wallet, 
  Bell, 
  Search, 
  Camera, 
  CreditCard,
  Leaf,
  Shield,
  CheckCircle,
  HelpCircle,
  Coins,
  TrendingUp,
  Languages
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Image from "next/image";

const HomePage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // Mock data - replace with real data later
  const userEarnings = "₹12,450";
  const totalCollections = 47;
  const notifications = 3;

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
    background: "linear-gradient(180deg, rgba(178, 255, 183, 1) 0%, rgba(223, 255, 225, 0) 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 150px"
  }}
    >
      {/* Header */}
      <div 
    //   className="sticky top-0 z-5"
      >
        <div className="flex items-center justify-between p-2 pt-4">
          {/* Left: User Profile & App Name */}
          <div className="flex items-center gap-3">
            <a href="/kyc">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-[#DEFFBE] border-primary flex items-center justify-center"
            >
              <User className="w-4 h-4 text-primary-600" />
            </motion.div>
            </a>
            <div>
              <h1 className="text-sm font-semibold text-gray-800"><a href="/">HerbChain</a></h1>
            </div>
          </div>

          {/* Right: Wallet, Earnings & Notifications */}
          <div className="flex items-center gap-4">
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-primary-50 px-3 py-2 rounded-full"
            >
              <Coins className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">{userEarnings}</span>
            </motion.div> */}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <Bell className="w-4 h-4 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[0.6rem] rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.button>

            <motion.button
              onClick={() => navigateToPage("/wallet")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"
            >
              <Wallet className="w-4 h-4 text-primary-600" />
            </motion.button>

            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {t('dashboard.welcome')}
          </h2>
          <p className="text-gray-600">{t('dashboard.overview')}</p>
        </motion.div> */}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-6"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('dashboard.searchPlaceholder')}
            className="w-full text-sm pl-10 pr-4 py-3 rounded-md border-2 border-gray-100 focus:border-primary-200 focus:outline-none bg-white shadow-sm"
          />
        </motion.div>

        {/* Main Action Grid - 1x2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 mb-6"
        >
          {/* Record Collection */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("/collectorDashboard")}
            
          >
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#DEFFBE] w-full flex justify-center items-center rounded-md p-4"
                >
                     <Image src={"/analysis.png"} alt="" width={40} height={40} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.recordCollection')}
                </p>
            </div>
          </motion.div>

          {/* My Earnings */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("/collectorDashboard")}
            
          >
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#FFFBDB] w-full flex justify-center items-center rounded-md p-4"
                >
                    <Image src={"/myearnings.png"} alt="" width={60} height={40} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.myWallet')}
                </p>
            </div>
          </motion.div>

         {/* Kheyti Ki Baat */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("/collectorDashboard")}
            
          >
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#DEFFBE] w-full flex justify-center items-center rounded-md p-4"
                >
                    <Image src={"/kheytikibaat.png"} alt="" width={60} height={40} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.kheytiKiBaat')}
                </p>
            </div>
          </motion.div>  

          {/* Near Hotspots */}
         
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("http://65.0.238.136:5000/dashboard/27c6d846-068d-497f-85d2-99e904edd99d")}
            
          >
            
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#FFFBDB] w-full flex justify-center items-center rounded-md p-4"
                >
                    <Image src={"/location.png"} alt="" width={60} height={60} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.nearHotspots')}
                </p>
            </div>
          </motion.div> 

           {/* Procurement */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("/collectorDashboard")}
            
          >
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#DEFFBE] w-full flex justify-center items-center rounded-md p-4"
                >
                    <Image src={"/procurement.png"} alt="" width={50} height={40} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.procurement')}
                </p>
            </div>
          </motion.div> 

 {/* Track */}
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToPage("http://65.0.238.136:5000/dashboard/27c6d846-068d-497f-85d2-99e904edd99d")}
            
          >
            <div  className="flex flex-col items-center gap-2">
                <div
                    style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        aspectRatio: "1 / 1",
                    }}
                    className="bg-[#FFFBDB] w-full flex justify-center items-center rounded-md p-4"
                >
                    <Image src={"/analysis.png"} alt="" width={40} height={40} />
                </div>
                <p className="text-xs font-medium text-gray-800 mb-1">
                  {t('dashboard.scanQR')}
                </p>
            </div>
          </motion.div> 

        </motion.div>

        {/* Feature Grid - 3x1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        >
          {/* <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-md text-center"
          >
            <div className="w-full rounded-md overflow-hidden">
              <Image src={"/banner1.png"} alt="" width={400} height={120} className="w-full h-auto object-cover" />
            </div>
          </motion.div> */}

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-md text-center"
          >
            <div className="w-full rounded-md overflow-hidden">
              <Image src={"/banner2.png"} alt="" width={400} height={120} className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl shadow-md text-center"
          >
            <div className="w-full rounded-md overflow-hidden">
              <Image src={"/banner3.png"} alt="" width={400} height={120} className="w-full h-auto object-cover" />
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-md p-6 px-4 shadow-lg mb-20"
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t('dashboard.recent')}
          </h3>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    Ashwagandha Collection #{String(item).padStart(3, '0')}
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago • Location: Forest Area A</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">+₹250</p>
                  <p className="text-xs text-gray-500">Verified</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Help Center Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary-600 text-white rounded-full shadow-xl flex items-center justify-center z-50"
        style={{
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <HelpCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default HomePage;
