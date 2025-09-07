"use client";
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { recordCollection } from '@/lib/wallet';
import GeminiAnalyzer from "./GeminiAnalyzer";
import { useRouter } from 'next/navigation';

export default function CollectionEventForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    herbName: "",
    timestamp: "",
    actorId: "",
    location: "",
    quality: "",
    quantity: 0,
  });
  const [file, setFile] = useState<File>();
  const [details, setDetails] = useState<string>("");
  const [message, setMessage] = useState<string>();

  function getCookie(name:string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  useEffect(() => {
    // Set timestamp and actorId on mount
    const now = new Date().toISOString().slice(0, 16);
    setFormData(prev => ({ ...prev, timestamp: now }));
    // const actorId = localStorage.getItem("actorId");
    
    // Example usage
    const actorId = getCookie("collectorId");
    if (actorId) setFormData(prev => ({ ...prev, actorId }));
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setFormData(prev => ({ ...prev, location: `${lat},${lng}` }));
      },
      (err) => {
        console.error("Location error:", err);
        alert("Unable to get location. Please allow location access.");
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const batchId = uuidv4();
    const { quantity, actorId, location, quality, herbName } = formData;
    recordCollection(batchId, herbName, quantity, actorId, quality, location, details);
    router.push(`/qr-code/${batchId}`);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    console.log("IPFS Hash:", data.IpfsHash);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Collection Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Timestamp */}
        <div>
          <label className="block text-sm font-medium">Timestamp</label>
          <input type="datetime-local" name="timestamp" value={formData.timestamp} disabled className="w-full p-2 border rounded-lg" />
        </div>

        {/* Collector ID */}
        <div>
          <label className="block text-sm font-medium">Collector ID</label>
          <input type="text" name="actorId" readOnly value={formData.actorId} className="w-full p-2 border rounded-lg" required />
        </div>

        {/* Herb Name */}
        <div>
          <label className="block text-sm font-medium">Herb Name</label>
          <input type="text" name="herbName" value={formData.herbName} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location (lat,lng)</label>
          <input type="text" name="location" value={formData.location} readOnly className="w-full p-2 border rounded-lg" />
          <button type="button" onClick={getLocation} className="mt-2 p-2 bg-blue-600 text-white rounded-md">
            Get Current Location
          </button>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
        </div>

        <GeminiAnalyzer file={file} setFile={setFile} details={details} setDetails={setDetails} />

        <button type="button" onClick={uploadFile} className="m-2 p-2 border rounded-md bg-blue-600 text-white">
          Upload Herb Image
        </button>

        {/* Quality */}
        <div>
          <label className="block text-sm font-medium">Initial Quality</label>
          <textarea name="quality" value={formData.quality} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea name="details" value={details} onChange={e => setDetails(e.target.value)} className="w-full p-2 border rounded-lg" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
          Add to Hyperledger
        </button>
      </form>
    </div>
  );
}
