import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PackageEdit() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false); // New state for form submission loading

  // Stable Values
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("admin_token");

  // --- 1. Load Package Logic (Memoized using useCallback) ---
  const loadPackage = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/packages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Ensure numerical fields are numbers initially for correct input value binding
      const data = {
        ...res.data,
        price: Number(res.data.price),
        days: Number(res.data.days),
      };
      setPkg(data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  }, [API, id, token]); // Depend on stable values

  // --- 2. useEffect Hook (Correct Dependency Array) ---
  useEffect(() => {
    loadPackage();
  }, [loadPackage]); // Correctly depends on the stable loadPackage function

  // --- 3. Update Package Logic (with Loading State) ---
  const updatePackage = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Start loading state

    try {
      const form = new FormData();
      // pkg object is guaranteed to have price/days as Numbers due to input handlers/loadPackage
      form.append("data", JSON.stringify(pkg)); 

      for (const img of newImages) {
        form.append("images", img);
      }

      await axios.put(
        `${API}/api/admin/packages/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Package updated!");
      window.location.href = "/admin/packages";
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Update failed. See console for details.");
    } finally {
      setIsUpdating(false); // Stop loading state
    }
  };

  if (!pkg) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Package</h2>

      <form onSubmit={updatePackage} className="space-y-4">

        <input
          className="border p-2 w-full"
          value={pkg.title || ""}
          placeholder="Title"
          onChange={(e) => setPkg({ ...pkg, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          value={pkg.description || ""}
          placeholder="Description"
          onChange={(e) =>
            setPkg({ ...pkg, description: e.target.value })
          }
        />

        {/* Price Input - Converts value to Number */}
        <input
          className="border p-2 w-full"
          type="number"
          value={pkg.price}
          placeholder="Price"
          // Convert string value to a Number when updating state
          onChange={(e) => setPkg({ ...pkg, price: Number(e.target.value) })}
        />

        <input
          className="border p-2 w-full"
          value={pkg.region || ""}
          placeholder="Region"
          onChange={(e) => setPkg({ ...pkg, region: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          value={pkg.category || ""}
          placeholder="Category"
          onChange={(e) => setPkg({ ...pkg, category: e.target.value })}
        />

        {/* Days Input - Converts value to Number */}
        <input
          className="border p-2 w-full"
          type="number"
          value={pkg.days}
          placeholder="Days"
          // Convert string value to a Number when updating state
          onChange={(e) => setPkg({ ...pkg, days: Number(e.target.value) })}
        />

        {/* Existing images */}
        <div className="flex gap-4">
          {pkg.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-24 h-24 rounded object-cover"
            />
          ))}
        </div>

        {/* Upload new images */}
        <input
          type="file"
          className="border p-2 w-full"
          multiple
          onChange={(e) => setNewImages([...e.target.files])}
        />

        <button 
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isUpdating} // Disable during submission
        >
          {isUpdating ? "Updating..." : "Update Package"}
        </button>
      </form>
    </div>
  );
}