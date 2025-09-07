"use client";
import React, { useEffect, useState } from "react";
import { uploadFileToIPFS } from "@/utils/uploadToIPFS";
import ABI from "../utils/ABI.json";
import Address from "../utils/Address.json";
import { v4 as uuidv4 } from "uuid";
import { getHerbChainContract, recordCollection } from "@/lib/wallet";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Clock,
  User,
  Leaf,
  Weight,
  FileText,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageSelectionModal } from "./ImageSelectionModal";
import { useTranslation } from "@/hooks/useTranslation";

export default function CollectionEventForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    herbName: "",
    timestamp: "",
    actorId: "",
    location: "",
    quality: "",
    quantity: "",
    details: "",
  });
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    setMessage(`Selected: ${selectedFile.name}`);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("IPFS Hash:", data.IpfsHash);
    setFileUrl(data.IpfsHash);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload file first if selected
    if (file) {
      await uploadFile();
    }

    console.log("Form Data:", formData);
    const batchId = uuidv4();
    const { quantity, actorId, location, details, quality, herbName } =
      formData;
    recordCollection(
      batchId,
      herbName,
      Number(quantity),
      actorId,
      quality,
      location,
      details
    );

    // Show success message
    setMessage(t("collection.success"));
  };
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, timestamp: now }));

    // Get collector ID from localStorage or generate one if doesn't exist
    let collectorId = localStorage.getItem("collectorId");
    if (!collectorId) {
      collectorId = `COL-${Date.now()}`;
      localStorage.setItem("collectorId", collectorId);
    }
    setFormData((prev) => ({ ...prev, actorId: collectorId }));

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(6);
          const lng = pos.coords.longitude.toFixed(6);
          setFormData((prev) => ({ ...prev, location: `${lat},${lng}` }));
        },
        (err) => {
          console.error("Location error:", err);
          // Set a default message if location access is denied
          setFormData((prev) => ({
            ...prev,
            location: t("collection.form.location.denied"),
          }));
        }
      );
    }
  }, [t]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(135deg, #FCFFFE 43%, #A7F2CC 67%, #00D96B 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">
            {t("collection.title")}
          </h1>
          <p className="text-gray-600">{t("collection.subtitle")}</p>
        </motion.div> */}

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)",
          }}
        >
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Image Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-2"
            >
              {/* <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon className="w-4 h-4 text-primary" />
                {t("collection.form.image")}
              </label> */}

              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Selected herb"
                    className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    {t("collection.form.image.change")}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 border-2 border-dashed border-primary/30 hover:border-primary/50 text-primary"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8" />
                    <span>{t("collection.form.image.select")}</span>
                  </div>
                </Button>
              )}

              {message && <p className="text-sm text-green-600">{message}</p>}
            </motion.div>

            {/* Timestamp Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-primary" />
                {t("collection.form.timestamp")}
                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
              </label>
              <input
                type="datetime-local"
                name="timestamp"
                value={formData.timestamp}
                onChange={handleChange}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none bg-green-50 text-primary font-medium text-sm"
                disabled
              />
            </motion.div>

            {/* Collector ID Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-primary" />
                {t("collection.form.collectorId")}
                {formData.actorId && (
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                )}
              </label>
              <input
                type="text"
                name="actorId"
                readOnly
                value={
                  formData.actorId || t("collection.form.loading.collectorId")
                }
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none bg-green-50 text-primary font-medium text-sm"
              />
            </motion.div>

            {/* Location Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-primary" />
                {t("collection.form.location.label")}
                {formData.location &&
                  !formData.location.includes("Loading") &&
                  !formData.location.includes("denied") && (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  )}
              </label>
              <input
                type="text"
                name="location"
                value={
                  formData.location || t("collection.form.loading.location")
                }
                onChange={handleChange}
                className="w-full p-4 border border-green-200 rounded-xl focus:outline-none bg-green-50 text-primary font-medium text-sm"
                disabled
              />
            </motion.div>

            {/* Herb Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Leaf className="w-4 h-4 text-primary" />
                {t("collection.form.herbName")} *
              </label>
              <input
                type="text"
                name="herbName"
                value={formData.herbName}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder={t("collection.form.herbName.placeholder")}
                required
              />
            </motion.div>

            {/* Quantity Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Weight className="w-4 h-4 text-primary" />
                {t("collection.form.quantity.label")} *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder={t("collection.form.quantity.placeholder")}
                min="0"
                step="0.1"
                required
              />
            </motion.div>

            {/* Quality Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-primary" />
                {t("collection.form.quality")}
              </label>
              <textarea
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder={t("collection.form.quality.placeholder")}
                rows={3}
              />
            </motion.div>

            {/* Details Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-2"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-primary" />
                {t("collection.form.details")}
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder={t("collection.form.details.placeholder")}
                rows={3}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="pt-4"
            >
              <Button
                type="submit"
                className="w-full py-6 bg-primary hover:bg-primary-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t("collection.submit")}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Image Selection Modal */}
      <ImageSelectionModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
}
