import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import PackagesPage from "./Pages/PackagesPage";
import GalleryPage from "./Pages/GalleryPage";
import ContactPage from "./Pages/ContactPage";
import BookingPage from "./Pages/BookingPage";
import PackageDetails from "./Pages/PackageDetails";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import PackagesList from "./admin/PackagesList";
import PackageForm from "./admin/PackageForm";
import PackageEdit from "./admin/PackageEdit";

export default function App() {
  const location = useLocation();

  // Hide Navbar/Footer on admin pages
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">

      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>

          {/* ---------- USER ROUTES ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/packages" element={<PackagesList />} />
          <Route path="/admin/packages/new" element={<PackageForm />} />
          <Route path="/admin/packages/:id/edit" element={<PackageEdit />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}
