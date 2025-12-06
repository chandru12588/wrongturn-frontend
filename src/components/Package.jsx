import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

const cleanNumber = (s) => (s || "").toString().replace(/[^0-9]/g, "");

const openWhatsApp = (phone, pkg) => {
  const p = cleanNumber(phone) || "919566806800";
  const text = `Hello! I want to book *${pkg.title}*.\nPackage ID: ${pkg._id}`;
  window.open(`https://wa.me/${p}?text=${encodeURIComponent(text)}`, "_blank");
};

const openMail = (email, pkg) => {
  const subject = `Booking enquiry: ${pkg.title}`;
  const body = `Hi,\n\nI want to enquire/book ${pkg.title}.\nPreferred Dates:\nPeople:\nNotes:\n\nThanks,\n`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

export default function PackageList() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeRegion, setActiveRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [q, setQ] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/api/packages`);
        setPackages(res.data);
      } catch (err) {
        console.log("Error loading packages", err);
      }
      setLoading(false);
    };
    load();
  }, [API]);

  const regions = useMemo(
    () => ["All", ...new Set(packages.map((p) => p.region || "Others"))],
    [packages]
  );

  const categories = useMemo(
    () => ["All", ...new Set(packages.map((p) => p.category || "Others"))],
    [packages]
  );

  const filtered = packages.filter((p) => {
    if (activeRegion !== "All" && p.region !== activeRegion) return false;
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    const txt = `${p.title} ${p.description} ${p.region}`.toLowerCase();
    if (q && !txt.includes(q.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-lg">
        Loading packages...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Tours & Packages
      </h1>

      {/* rest of UI same as before… */}
      {/* (you already have the card layout, buttons, etc.) */}
    </div>
  );
}
