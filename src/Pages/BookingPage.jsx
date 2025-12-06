import React from "react";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  const backendUrl = import.meta.env.VITE_API_URL; // ✔ uses Railway or local

  return <BookingForm backendUrl={backendUrl} />;
}
