import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function PackagesList() {
  const [packagesList, setPackagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // To prevent rapid delete clicks

  // Stable Values
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("admin_token");

  // --- 1. Load Packages (Memoized) ---
  const loadPackages = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API}/api/admin/packages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPackagesList(res.data);
    } catch (err) {
      console.error("LOAD ERROR:", err);
      // Optional: set an error message state here
    } finally {
      setIsLoading(false);
    }
  }, [API, token]);

  // --- 2. useEffect for Initial Load ---
  useEffect(() => {
    loadPackages();
  }, [loadPackages]); // Correct dependency

  // --- 3. Delete Package (Memoized) ---
  const deletePackage = useCallback(async (id) => {
    if (isDeleting || !window.confirm(`Are you sure you want to delete package ID ${id}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`${API}/api/admin/packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Instead of relying on a full refresh (loadPackages), update state directly for speed
      setPackagesList(prevList => prevList.filter(pkg => pkg._id !== id));
      
      // If you must call loadPackages to ensure fresh data:
      // await loadPackages(); 

    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Delete failed. Check console for details.");
    } finally {
      setIsDeleting(false);
    }
  }, [API, token, isDeleting]); // Added isDeleting as dependency to block concurrent deletes

  // --- 4. Render Logic (Loading/Empty States) ---
  if (isLoading) {
    return <div className="p-6 text-center">Loading packages...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Packages</h2>
        <a
          href="/admin/packages/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Package
        </a>
      </div>

      {packagesList.length === 0 ? (
        <div className="text-gray-500 border p-4 rounded-lg bg-gray-50">
          No packages found. Start by adding a new one!
        </div>
      ) : (
        <div className="space-y-4">
          {packagesList.map((pkg) => (
            <div
              key={pkg._id}
              className="flex items-center bg-white border rounded-xl p-4 shadow-sm"
            >
              <img
                src={pkg.images?.[0] || 'https://via.placeholder.com/80?text=No+Image'} // Fallback
                className="w-20 h-20 rounded object-cover"
                alt={`Primary image for ${pkg.title}`}
              />

              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{pkg.title}</h3>
                <p className="text-sm text-gray-600">₹ {pkg.price}</p>
              </div>

              <div className="flex gap-3 items-center">
                <a
                  href={`/admin/packages/${pkg._id}/edit`}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  Edit
                </a>

                <button
                  onClick={() => deletePackage(pkg._id)}
                  className={`text-red-600 hover:text-red-800 transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}