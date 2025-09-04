"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function KycPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    email:"",
    password:"",
    govtId: "",
  });

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit KYC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {username, email, password, govtId, location} = formData;

    const resp = await fetch('/api/auth',{
      method: "POST",
      body: JSON.stringify(formData),
    })

    const data  = await resp.json();
    localStorage.setItem("collectorId", data.collectorId); //todo : use cookies and jwt-token :* this is temporary

    router.push("/wallet");
  };


  return (
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Farmer / Collector KYC</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.username}
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
