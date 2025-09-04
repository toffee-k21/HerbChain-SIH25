"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KycPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    govtId: "",
  });

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit KYC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/wallet")

    alert("KYC submitted!");
  };

  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Farmer / Collector KYC</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="govtId"
          placeholder="Government ID"
          value={formData.govtId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Submit KYC
        </button>
      </form>
    </div>
  );
}
