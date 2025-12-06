import React, { useEffect, useState } from "react";

export default function PackagesPage() {
  const API = import.meta.env.VITE_API_URL; // correct variable
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const res = await fetch(`${API}/api/packages`); // FIXED URL
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error("Failed to load packages:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Packages</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <a
            key={pkg._id}
            href={`/wrong-turnclub-chandru/packages/${pkg._id}`}  
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={pkg.images?.[0] || "/no-image.jpg"}   // FIX: Cloudinary images
              className="w-full h-40 object-cover rounded mb-2"
            />

            <h2 className="text-lg font-semibold">{pkg.title}</h2>
            <p className="text-gray-600">₹{pkg.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
