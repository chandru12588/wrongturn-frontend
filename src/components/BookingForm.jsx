import React, { useState, useRef } from "react";
import { getFromStorage, saveToStorage } from "../utils/storage";

export default function BookingForm({
  backendUrl = import.meta.env.VITE_API_URL,
  campsitePhone = "+919566806800",
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    packageId: "camp_stay",
    checkIn: "",
    checkOut: "",
    guests: 1,
    notes: "",
  });

  const [idFile, setIdFile] = useState(null);
  const [status, setStatus] = useState("");
  const fileRef = useRef();

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowed.includes(f.type)) {
      alert("Upload JPG/PNG/PDF only");
      return;
    }
    setIdFile(f);
  };

  const checkAvailability = () => {
    const avail = getFromStorage("wtc_availability", {});
    const key = form.packageId === "camp_stay" ? "a-frame" : form.packageId;

    const slot = avail[key] || { total: 3, bookings: [] };
    const requested = { from: new Date(form.checkIn), to: new Date(form.checkOut) };

    const overlapping = slot.bookings.filter((b) => {
      const bFrom = new Date(b.checkIn),
        bTo = new Date(b.checkOut);
      return !(requested.to <= bFrom || requested.from >= bTo);
    }).length;

    return overlapping < slot.total;
  };

  const openWhatsAppAdmin = (booking) => {
    const msg = `New Booking:
Name: ${booking.name}
Phone: ${booking.phone}
Email: ${booking.email}
Package: ${booking.packageId}
Check-In: ${booking.checkIn}
Check-Out: ${booking.checkOut}
Guests: ${booking.guests}`;

    window.open(
      `https://wa.me/${campsitePhone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("Validating...");

    if (!form.name || !form.phone || !form.checkIn || !form.checkOut || !idFile) {
      alert("Please fill all required fields & upload ID");
      setStatus("");
      return;
    }

    if (!checkAvailability()) {
      setStatus("Selected package/dates not available");
      return;
    }

    setStatus("Uploading booking...");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("phone", form.phone);
    fd.append("email", form.email);
    fd.append("packageId", form.packageId);
    fd.append("stayType", form.packageId === "camp_stay" ? "a-frame" : form.packageId);
    fd.append("checkIn", form.checkIn);
    fd.append("checkOut", form.checkOut);
    fd.append("guests", String(form.guests));
    fd.append("notes", form.notes || "");
    fd.append("idFile", idFile);

    try {
      const res = await fetch(`${backendUrl}/api/book`, {
        method: "POST",
        body: fd,
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Server error");

      const booking = {
        id: j.id || "bk_" + Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      };

      const bookings = getFromStorage("wtc_bookings", []);
      bookings.push(booking);
      saveToStorage("wtc_bookings", bookings);

      const avail = getFromStorage("wtc_availability", {});
      const key = form.packageId === "camp_stay" ? "a-frame" : form.packageId;

      if (!avail[key]) avail[key] = { total: 3, bookings: [] };

      avail[key].bookings.push({
        bookingId: booking.id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      });

      saveToStorage("wtc_availability", avail);

      setStatus("Booking created! Opening WhatsApp...");
      openWhatsAppAdmin(booking);

    } catch (err) {
      console.error(err);
      setStatus("Booking failed: " + err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Book Your Experience</h2>

      <select
        value={form.packageId}
        onChange={(e) => setForm({ ...form, packageId: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="camp_stay">Campsite Stay (Tent / A-Frame)</option>
        <option value="jeep_safari">Jeep Safari</option>
        <option value="campfire_dj">Campfire & DJ</option>
        <option value="food_experience">Local Food Experience</option>
      </select>

      <input
        required
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        required
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />

      <div className="flex gap-2 mb-2">
        <input
          required
          type="date"
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          className="w-1/2 p-2 border rounded"
        />

        <input
          required
          type="date"
          value={form.checkOut}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          className="w-1/2 p-2 border rounded"
        />
      </div>

      <input
        type="number"
        min="1"
        value={form.guests}
        onChange={(e) => setForm({ ...form, guests: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        placeholder="Notes / Preferences"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />

      <label className="block mb-2">Upload ID (JPG/PNG/PDF)</label>
      <input
        ref={fileRef}
        onChange={onFile}
        required
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        className="mb-4"
      />

      <div className="flex gap-2">
        <button type="submit" className="flex-1 p-2 bg-indigo-600 text-white rounded">
          Send Booking
        </button>

        <button
          type="button"
          className="flex-1 p-2 border rounded"
          onClick={() => {
            const shortMsg = `Booking request - ${form.name} - ${form.phone} - ${form.packageId}`;
            window.open(
              `https://wa.me/${campsitePhone.replace(/\D/g, "")}?text=${encodeURIComponent(shortMsg)}`,
              "_blank"
            );
          }}
        >
          WhatsApp
        </button>
      </div>

      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </form>
  );
}
