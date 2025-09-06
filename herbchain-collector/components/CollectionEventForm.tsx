"use client";
import React, { useEffect, useState } from 'react'
import { uploadFileToIPFS } from '@/utils/uploadToIPFS';
import ABI from "../utils/ABI.json";
import Address from "../utils/Address.json";
import { v4 as uuidv4 } from "uuid";
import { getHerbChainContract, recordCollection } from '@/lib/wallet';


export default function CollectionEventForm() {
  
  const [formData, setFormData] = useState({
    herbName: "",
    timestamp: "",
    actorId: "",
    location: "",
    quality: "",
    quantity : 0,
    details : ""
  });
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState();
  const [message, setMessage] = useState<string>();

  const uploadFile = async () => {
    if(!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("IPFS Hash:", data.IpfsHash);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const batchId = uuidv4();
    const {quantity, actorId, location, details, quality, herbName} = formData;
    recordCollection(batchId, herbName, quantity, actorId, quality, location, details);
  };
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setFormData((prev) => ({ ...prev, timestamp: now }));
    const actorId = localStorage.getItem("actorId");
    if(!actorId) return;
    setFormData((prev)=>({...prev, actorId:actorId}))

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
    <div className="max-w-lg mx-auto mt-10 p-6  shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Collection Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Timestamp (auto-filled & disabled) */}
        <div>
          <label className="block text-sm font-medium">Timestamp</label>
          <input
            type="datetime-local"
            name="timestamp"
            value={formData.timestamp}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
        </div>

        {/* Collector ID */}
        <div>
          <label className="block text-sm font-medium">Collector ID</label>
          <input
            type="text"
            name="actorId"
            readOnly 
            value={formData.actorId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Herb Name */}
        <div>
          <label className="block text-sm font-medium">Herb Name</label>
          <input
            type="text"
            name="herbName"
            value={formData.herbName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Location (auto-filled & disabled) */}
        <div>
          <label className="block text-sm font-medium">Location (lat,lng)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            disabled
          />
        </div>
          {/* Qty */}
          <div>
          <label className="block text-sm font-medium">Qty</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <label className='block text-sm font-medium'>Select a image</label>
        <input
          type="file"
          accept="*.jpg, *.jpeg, *.png"
          className='p-2 bg-neutral-900 w-full rounded-md'
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            } else {
              console.log("No files selected.");
            }
          }}
        />
        <button
          type="button"
          className="m-2 p-2 border-[0.5] rounded-md  bg-blue-600 block"
          onClick={uploadFile}
        >
          upload
        </button>

        {/* Initial Quality */}
        <div>
          <label className="block text-sm font-medium">Initial Quality</label>
          <textarea
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Details */}
        <div>
          <label className="block text-sm font-medium">Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Add to hyper ledger !
        </button>
      </form>
    </div>
  );
}
