import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("");

  const backendUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Server error");

      setStatus("Message sent successfully!");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed: " + err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Contact Us</h2>

      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />

      <input
        required
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />

      <textarea
        required
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full p-2 border rounded mb-2"
      />

      <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded">
        Send
      </button>

      <p className="mt-2 text-sm">{status}</p>
    </form>
  );
}
