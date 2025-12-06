import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PackageDetails() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackage();
  }, []);

  const loadPackage = async () => {
    try {
      const res = await fetch(`${API}/api/packages/${id}`);
      const data = await res.json();
      setPkg(data);
    } catch (err) {
      console.error("Failed to load package:", err);
    }
    setLoading(false);
  };

  if (loading) return <p>Loading package...</p>;
  if (!pkg) return <p>Package not found</p>;

  return (
    <div className="p-4">
      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>

      {/* MAIN IMAGE */}
      <img
        src={pkg.images?.[0] || "/no-image.jpg"}
        className="w-full rounded mb-4"
        alt={pkg.title}
      />

      {/* DESCRIPTION */}
      <p className="mb-4 text-gray-700">{pkg.description}</p>

      {/* PRICE */}
      <p className="text-xl font-semibold mb-6">Price: ₹{pkg.price}</p>

      {/* BOOK NOW BUTTON */}
      <a
        href="/wrong-turnclub-chandru/booking"
        className="bg-indigo-600 text-white px-4 py-3 rounded-lg inline-block"
      >
        Book Now
      </a>
    </div>
  );
}
