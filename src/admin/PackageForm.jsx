import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PackageForm() {
  const { id } = useParams();
  const token = localStorage.getItem("admin_token");

  const API = import.meta.env.VITE_API_URL; // ⭐ FIXED HERE

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    region: "",
    category: "",
    days: "",
  });

  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  /* ------------------------------------------------
     LOAD PACKAGE WHEN EDIT MODE
  ------------------------------------------------ */
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await axios.get(
          `${API}/api/admin/packages/${id}`, // ⭐ FIXED
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          price: res.data.price || "",
          region: res.data.region || "",
          category: res.data.category || "",
          days: res.data.days || "",
        });

        setOldImages(res.data.images || []);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      }
    };

    load();
  }, [id]);

  /* ------------------------------------------------
     HANDLE INPUT
  ------------------------------------------------ */
  const updateField = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  /* ------------------------------------------------
     SAVE (CREATE OR UPDATE)
  ------------------------------------------------ */
  const save = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(form));

      for (const img of images) {
        fd.append("images", img);
      }

      let url = `${API}/api/admin/packages`; // ⭐ FIXED
      let method = "post";

      if (id) {
        url = `${API}/api/admin/packages/${id}`; // ⭐ FIXED
        method = "put";
      }

      await axios({
        method,
        url,
        data: fd,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(id ? "Package Updated" : "Package Created");
      window.location.href = "/admin/packages";
    } catch (err) {
      console.error("SAVE ERROR:", err.response?.data || err);
      alert("Failed to save");
    }
  };

  /* ------------------------------------------------
     UI
  ------------------------------------------------ */
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit Package" : "Add Package"}
      </h2>

      {id && oldImages.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Existing Images:</h4>
          <div className="flex gap-3">
            {oldImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="package"
                className="w-20 h-20 rounded object-cover border"
              />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={save} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Region"
          value={form.region}
          onChange={(e) => updateField("region", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Category"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Days"
          type="number"
          value={form.days}
          onChange={(e) => updateField("days", e.target.value)}
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="border p-2 w-full"
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          {id ? "Update Package" : "Save Package"}
        </button>
      </form>
    </div>
  );
}
