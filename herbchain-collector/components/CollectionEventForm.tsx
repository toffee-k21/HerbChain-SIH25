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
  ArrowBigLeftDash,
  CircleArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageSelectionModal } from "./ImageSelectionModal";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

export default function CollectionEventForm() {
  const { t } = useTranslation();
  const router = useRouter();

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
  const [isHealthDialogOpen, setIsHealthDialogOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [healthError, setHealthError] = useState<string>("");

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

  const analyzeHealth = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setHealthError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/analyze-plant", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.json();
      setAnalysisResult(result.analysis); // Extract the analysis object
      
      // Auto-populate the quality assessment field
      if (result.analysis.health_status) {
        const healthSummary = `Health Score: ${result.analysis.health_status.health_score} - ${result.analysis.health_status.overall_health}. ${
          result.analysis.health_status.visible_symptoms?.length > 0 
            ? `Symptoms: ${result.analysis.health_status.visible_symptoms.join(', ')}.`
            : 'No visible symptoms detected.'
        } ${result.analysis.additional_notes || ''}`;
        setFormData(prev => ({ ...prev, quality: healthSummary }));
      }
      
      setIsHealthDialogOpen(true);
    } catch (error) {
      console.error("Health analysis failed:", error);
      setHealthError(t('health.error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const backToDashboard = () => {
    router.push("/home");
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

  function getCookie(name:string) { const value = `; ${document.cookie}`; const parts = value.split(`; ${name}=`); if (parts.length === 2) return parts.pop()?.split(';').shift(); }

  useEffect(() => {
    // Create timestamp in IST (Indian Standard Time)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + istOffset);
    const istTimestamp = istTime.toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, timestamp: istTimestamp }));

    // Try to get collector ID from localStorage (if previously entered by user)
    // const collectorId = localStorage.getItem("collectorId");
    const collectorId = getCookie("collectorId");
    if (collectorId) {
      setFormData((prev) => ({ ...prev, actorId: collectorId }));
    }

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
        {/* Back to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2"
        >
            <Button
            onClick={backToDashboard}
            variant="ghost"
            className="text-2xl text-primary"
            >
            <CircleArrowLeft style={{ width: 25, height: 25 }} />
            </Button>
        </motion.div>

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
              transition={{ delay: 0.2 }}
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

            {/* Health Analysis Button */}
            {file && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="space-y-3"
              >
                <Button
                  type="button"
                  onClick={analyzeHealth}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? t('health.analyzing') : t('health.analyze')}
                </Button>
                
                {analysisResult && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsHealthDialogOpen(true)}
                    className="w-full py-2 border-primary text-primary hover:bg-primary-50 text-sm"
                  >
                    View Health Analysis
                  </Button>
                )}
              </motion.div>
            )}

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
              disabled
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="w-full p-4 border border-green-200 bg-green-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
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

      {/* Health Analysis Dialog */}
      <Dialog open={isHealthDialogOpen} onOpenChange={setIsHealthDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-primary">
              🌿 {t('health.title')}
            </DialogTitle>
            <DialogDescription>
              {t('health.subtitle')}
            </DialogDescription>
          </DialogHeader>

          {analysisResult && (
            <div className="space-y-4">
              {/* Plant Identification */}
              {analysisResult.plant_identification && (
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    🌱 {t('health.identification')}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p><span className="font-medium">Common Name:</span> {analysisResult.plant_identification.common_name}</p>
                    <p><span className="font-medium">Scientific:</span> {analysisResult.plant_identification.scientific_name}</p>
                    <p><span className="font-medium">Confidence:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${
                        analysisResult.plant_identification.confidence === 'High' ? 'bg-green-100 text-green-800' :
                        analysisResult.plant_identification.confidence === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {analysisResult.plant_identification.confidence}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Health Status */}
              {analysisResult.health_status && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                    💚 {t('health.status')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Overall Health:</span> {analysisResult.health_status.overall_health}</p>
                    <p><span className="font-medium">Health Score:</span> {analysisResult.health_status.health_score}/10</p>
                    {analysisResult.health_status.visible_symptoms && analysisResult.health_status.visible_symptoms.length > 0 && (
                      <p><span className="font-medium">Symptoms:</span> {analysisResult.health_status.visible_symptoms.join(', ')}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Quality Assessment */}
              {analysisResult.quality_assessment && (
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
                    ⭐ {t('health.quality')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Quality Rating:</span> {analysisResult.quality_assessment.quality_rating}/10</p>
                    <p><span className="font-medium">Harvest Ready:</span> {analysisResult.quality_assessment.harvest_readiness}</p>
                    <p><span className="font-medium">Marketability:</span> {analysisResult.quality_assessment.marketability}</p>
                  </div>
                </div>
              )}

              {/* Disease & Pest Analysis */}
              {analysisResult.disease_detection && (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    🦠 {t('health.diseases')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Diseases Found:</span> {
                      analysisResult.disease_detection.diseases_found?.length > 0 
                        ? (analysisResult.disease_detection.diseases_found as string[]).join(', ')
                        : 'None detected'
                    }</p>
                    <p><span className="font-medium">Pests Found:</span> {
                      analysisResult.disease_detection.pest_issues?.length > 0 
                        ? (analysisResult.disease_detection.pest_issues as string[]).join(', ')
                        : 'None detected'
                    }</p>
                    <p><span className="font-medium">Severity:</span> {analysisResult.disease_detection.severity}</p>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    📝 {t('health.recommendations')}
                  </h4>
                  <div className="space-y-2 text-sm">
                    {analysisResult.recommendations.immediate_actions && analysisResult.recommendations.immediate_actions.length > 0 && (
                      <div>
                        <span className="font-medium">Immediate Actions:</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {analysisResult.recommendations.immediate_actions.map((action: string, index: number) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysisResult.recommendations.treatment_suggestions && analysisResult.recommendations.treatment_suggestions.length > 0 && (
                      <div>
                        <span className="font-medium">Treatment Suggestions:</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {analysisResult.recommendations.treatment_suggestions.map((suggestion: string, index: number) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysisResult.recommendations.harvest_timing && (
                      <p><span className="font-medium">Harvest Timing:</span> {analysisResult.recommendations.harvest_timing}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {analysisResult.additional_notes && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    📋 Additional Notes
                  </h4>
                  <p className="text-sm text-gray-700">{analysisResult.additional_notes}</p>
                </div>
              )}
            </div>
          )}

          {healthError && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <p className="text-red-700 text-sm">{healthError}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}