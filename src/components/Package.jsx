// src/components/Package.jsx
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

/* ----------------- Helpers ----------------- */
const cleanNumber = (s) => (s || "").toString().replace(/[^0-9]/g, "");

const openWhatsApp = (phone, pkg) => {
  const p = cleanNumber(phone) || "919566806800";
  const text = `Hello! I want to book *${pkg.title}*.\nPackage ID: ${pkg._id}`;
  window.open(`https://wa.me/${p}?text=${encodeURIComponent(text)}`, "_blank");
};

const openMail = (email, pkg) => {
  const subject = `Booking enquiry: ${pkg.title}`;
  const body = `Hi,\n\nI want to enquire/book ${pkg.title}.\nPreferred Dates:\nPeople:\nNotes:\n\nThanks,\n`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/* Small pill */
const Pill = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
    {children}
  </span>
);

/* ----------------- Component ----------------- */
export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [q, setQ] = useState("");

  /* ----------------- Fetch packages from backend ----------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/packages/public/all");
        setPackages(res.data);
      } catch (err) {
        console.log("Error loading packages", err);
      }
      setLoading(false);
    };
    load();
  }, []);

  /* ----------------- Create dynamic filters ----------------- */
  const regions = useMemo(() => {
    return ["All", ...new Set(packages.map((p) => p.region || "Others"))];
  }, [packages]);

  const categories = useMemo(() => {
    return ["All", ...new Set(packages.map((p) => p.category || "Others"))];
  }, [packages]);

  /* ----------------- Filter logic ----------------- */
  const filtered = packages.filter((p) => {
    if (activeRegion !== "All" && p.region !== activeRegion) return false;
    if (activeCategory !== "All" && p.category !== activeCategory) return false;

    const txt = `${p.title} ${p.description} ${p.region}`.toLowerCase();
    if (q && !txt.includes(q.toLowerCase())) return false;

    return true;
  });

  /* ----------------- Loading state ----------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-lg">
        Loading packages...
      </div>
    );
  }

  /* ----------------- UI ----------------- */
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Tours & Packages
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20 bg-white border rounded-xl p-4 shadow-sm">

            {/* Search */}
            <label className="block text-sm text-gray-600 mb-2">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search packages..."
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />

            {/* Region Filter */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold">States / Regions</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRegion(r)}
                    className={`text-sm px-3 py-1 rounded-full ${
                      activeRegion === r ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold">Category</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`text-sm px-3 py-1 rounded-full ${
                      activeCategory === c ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              <strong>{filtered.length}</strong> packages found
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg border overflow-hidden">

              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={pkg.images?.[0]}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                <p className="text-xs text-gray-500">{pkg.region}</p>

                <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                  {pkg.description}
                </p>

                <div className="mt-3 font-bold text-indigo-600">₹ {pkg.price}</div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => openWhatsApp(pkg.phone, pkg)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                  >
                    WhatsApp
                  </button>

                  <button
                    onClick={() => openMail(pkg.email, pkg)}
                    className="flex-1 border border-gray-200 py-2 rounded-lg"
                  >
                    Email
                  </button>
                </div>

                <a
                  href={`/packages/${pkg._id}`}
                  className="mt-3 inline-block text-center bg-indigo-600 text-white py-2 rounded-lg"
                >
                  View Details
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
