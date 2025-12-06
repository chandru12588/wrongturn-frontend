import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PackagesList() {
  const [packagesList, setPackagesList] = useState([]);
  const token = localStorage.getItem("admin_token");

  const API = import.meta.env.VITE_API_URL; // ⭐ backend URL

  /* ------------------------------------------------
     LOAD PACKAGES (FIXED — moved inside useEffect)
  ------------------------------------------------ */
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/packages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPackagesList(res.data);
      } catch (err) {
        console.error("LOAD PACKAGES ERROR:", err);
      }
    };

    loadPackages(); // ⭐ NO WARNING NOW
  }, []);

  /* ------------------------------------------------
     DELETE PACKAGE
  ------------------------------------------------ */
  const deletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await axios.delete(`${API}/api/admin/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Reload list
      setPackagesList((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed");
    }
  };

  /* ------------------------------------------------
     UI
  ------------------------------------------------ */
  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Packages</h2>

        <a
          href="/admin/packages/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Package
        </a>
      </div>

      <div className="space-y-4">
        {packagesList.map((pkg) => (
          <div
            key={pkg._id}
            className="flex items-center bg-white border rounded-xl p-4 shadow-sm"
          >
            <img
              src={pkg.images?.[0]}
              className="w-20 h-20 rounded object-cover"
              alt="package"
            />

            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{pkg.title}</h3>
              <p className="text-sm text-gray-600">₹ {pkg.price}</p>
            </div>

            <div className="flex gap-3">
              <a
                href={`/admin/packages/${pkg._id}/edit`}
                className="text-indigo-600"
              >
                Edit
              </a>

              <button
                onClick={() => deletePackage(pkg._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
