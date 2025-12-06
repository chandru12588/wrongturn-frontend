import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PackageEdit() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const token = localStorage.getItem("admin_token");

  const API = import.meta.env.VITE_API_URL; // ⭐ USE ENV

  useEffect(() => {
    loadPackage();
  }, []);

  const loadPackage = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/packages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPkg(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  const updatePackage = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
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
      console.log("UPDATE ERROR:", err);
      alert("Update failed");
    }
  };

  if (!pkg) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Package</h2>

      <form onSubmit={updatePackage} className="space-y-4">

        <input
          className="border p-2 w-full"
          value={pkg.title}
          placeholder="Title"
          onChange={(e) => setPkg({ ...pkg, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          value={pkg.description}
          placeholder="Description"
          onChange={(e) =>
            setPkg({ ...pkg, description: e.target.value })
          }
        />

        <input
          className="border p-2 w-full"
          type="number"
          value={pkg.price}
          placeholder="Price"
          onChange={(e) => setPkg({ ...pkg, price: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          value={pkg.region}
          placeholder="Region"
          onChange={(e) => setPkg({ ...pkg, region: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          value={pkg.category}
          placeholder="Category"
          onChange={(e) => setPkg({ ...pkg, category: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          type="number"
          value={pkg.days}
          placeholder="Days"
          onChange={(e) => setPkg({ ...pkg, days: e.target.value })}
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

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Package
        </button>
      </form>
    </div>
  );
}
