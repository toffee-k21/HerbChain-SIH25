"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KycPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    email:"",
    password:"",
    governmentId: "",
  });

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    localStorage.setItem("collectorId", data.collectorId.id); //todo : use cookies and jwt-token :* this is temporary

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
    <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Farmer / Collector KYC</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
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
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
         <input
          name="governmentId"
          placeholder="Government ID"
          value={formData.governmentId}
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
