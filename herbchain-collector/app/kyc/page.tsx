"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { KycCarousel } from "@/components/KycCarousel";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function KycPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    email:"",
    password:"",
    governmentId: "",
  });

  // Drag and reveal state
  const [dragProgress, setDragProgress] = useState(0); // 0 = collapsed, 1 = fully expanded
  const [isExpanded, setIsExpanded] = useState(false);
  const y = useMotionValue(0);
  
  // Transform values for smooth animations
  const opacity = useTransform(y, [0, -200, -400], [1, 0.8, 0.6]);
  const scale = useTransform(y, [0, -200, -400], [1, 0.98, 0.95]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle drag end to determine final position
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    
    // If dragged up significantly or has upward velocity, expand
    if (offset < -100 || velocity < -500) {
      setIsExpanded(true);
      setDragProgress(1);
      y.set(-300); // Fully expanded position
    } else if (offset > 50 || velocity > 500) {
      // If dragged down or has downward velocity, collapse
      setIsExpanded(false);
      setDragProgress(0);
      y.set(0); // Collapsed position
    } else {
      // Return to current state
      if (isExpanded) {
        y.set(-300);
      } else {
        y.set(0);
      }
    }
  };

  // Handle drag to update progress
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = y.get();
    const progress = Math.max(0, Math.min(1, -currentY / 300));
    setDragProgress(progress);
  };

  // Submit KYC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const {username, email, password, governmentId, location} = formData;
    // console.log(formData);
    const resp = await fetch('/api/auth',{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    console.log("resp",resp);

    const data  = await resp.json();
    console.log("data",data);
    // localStorage.setItem("collectorId", data.collectorId.id); //todo : use cookies and jwt-token :* this is temporary
    document.cookie = `collectorId=${data.collectorId.id}; path=/; max-age=86400`; // 1 day expiry


    router.push("/wallet");
  };

    useEffect(() => {
      const now = new Date().toISOString().slice(0, 16);
      setFormData((prev) => ({ ...prev, timestamp: now }));
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toFixed(6);
            const lng = pos.coords.longitude.toFixed(6);
            setFormData((prev) => ({ ...prev, location: `${lat},${lng}` }));
          },
          (err) => {
            console.error("Location error:", err);
          }
        );
      }
    }, []);


  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FCFFFE 43%, #A7F2CC 67%, #00D96B 100%)'
      }}
    >
      {/* Carousel Section */}
      <div className="pt-2 pb-16">
        <KycCarousel />
      </div>

      {/* Draggable Modal-style Form Container */}
      <motion.div
        drag="y"
        dragConstraints={{ top: -10, bottom: 0 }}
        dragElastic={0.1}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ 
          y,
          opacity,
          scale,
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15), 0 -4px 20px rgba(0, 0, 0, 0.1)'
        }}
        initial={{ y: 0 }}
        className=" max-w-2xl mx-auto fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl cursor-grab active:cursor-grabbing"
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Draggable Handle with Progress Indicator */}
        <div className="p-4 pb-0 relative">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto cursor-grab relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ 
                backgroundColor: '#FF7D24',
                width: `${dragProgress * 100}%`
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
        
        <div className="px-6 pb-6 -mb-6">
          <h2 className="text-xl font-bold mb-4 mt-4 text-center" style={{ color: '#2b9846' }}>
            {t('kyc.form.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Always visible fields */}
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              name="username"
              placeholder={t('kyc.form.fullname')}
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <motion.input
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              name="location"
              placeholder={t('kyc.form.location')}
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />

            {/* Progressive reveal hint */}
            {!isExpanded && (
              <motion.div 
                initial={{ opacity: 1 }}
                animate={{ opacity: dragProgress > 0.3 ? 0 : 1 }}
                className="text-center py-2"
              >
                <p className="text-sm text-gray-500">
                  {t('kyc.form.dragHint')}
                </p>
              </motion.div>
            )}

            {/* Conditionally revealed fields */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: dragProgress > 0.3 ? "auto" : 0,
                opacity: dragProgress > 0.3 ? 1 : 0 
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="space-y-4">
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: dragProgress > 0.3 ? 1 : 0, 
                    y: dragProgress > 0.3 ? 0 : 20 
                  }}
                  transition={{ delay: 0.1 }}
                  name="email"
                  placeholder={t('kyc.form.email')}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: dragProgress > 0.5 ? 1 : 0, 
                    y: dragProgress > 0.5 ? 0 : 20 
                  }}
                  transition={{ delay: 0.2 }}
                  name="password"
                  placeholder={t('kyc.form.password')}
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: dragProgress > 0.7 ? 1 : 0, 
                    y: dragProgress > 0.7 ? 0 : 20 
                  }}
                  transition={{ delay: 0.3 }}
                  name="governmentId"
                  placeholder={t('kyc.form.governmentId')}
                  value={formData.governmentId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              {/* Submit button - only show when fully expanded */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: dragProgress > 0.8 ? 1 : 0,
                y: dragProgress > 0.8 ? 0 : 20,
                scale: dragProgress > 0.8 ? 1 : 0.95
              }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={dragProgress <= 0.8}
              className="w-full mt-4 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#2b9846' }}
            >
              {t('kyc.form.submit')}
            </motion.button>
            </motion.div>

            
          </form>
        </div>
        
      </motion.div>
    </div>
  );
}
