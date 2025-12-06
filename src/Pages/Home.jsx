// src/Pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img7 from "../assets/img7.jpeg"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= HERO SECTION ================= */}
      <header className="relative h-[60vh] md:h-[75vh] w-full">

        {/* Background Image (Himalayas) */}
        <img
          src={img7}   // Place this image inside public/assets/
          alt="Himalayas Scenic"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 md:bg-black/20"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
            Explore the unbeaten paths with <br />
            <span className="text-indigo-400">Wrong Turn Club</span>
          </h1>

          <p className="max-w-2xl mx-auto text-gray-200 mb-6 mt-4 text-base md:text-lg drop-shadow">
            Handpicked packages across India and international destinations —
            jeep safaris, forest tours, cultural trips and scenic escapes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700"
            >
              View Packages
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-gray-200 text-gray-900 bg-white/90 hover:bg-white shadow"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Floating Social Icons */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-4 text-white z-20">

          {/* Facebook */}
          <a
            href="https://www.facebook.com/WrongTurnHikers?mibextid=JRoKGi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition transform hover:scale-110"
          >
            <FaFacebookF size={18} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/wrongturnclub/?utm_source=qr&r=nametag"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition transform hover:scale-110"
          >
            <FaInstagram size={18} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919566806800"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-green-500/80 backdrop-blur-md hover:bg-green-600 transition transform hover:scale-110"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>

      </header>

      {/* ================= NORMAL CONTENT ================= */}
      <main className="max-w-6xl mx-auto px-4 py-10">

        {/* 3 Feature Boxes */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow text-center">
            <h3 className="font-semibold mb-2">Forest & Safari</h3>
            <p className="text-sm text-gray-600">
              Jeep safaris and wildlife tours across India and Africa.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow text-center">
            <h3 className="font-semibold mb-2">Cultural Trips</h3>
            <p className="text-sm text-gray-600">
              Heritage, food & city walking tours.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow text-center">
            <h3 className="font-semibold mb-2">International Tours</h3>
            <p className="text-sm text-gray-600">
              Europe scenic tours & safari experiences.
            </p>
          </div>
        </section>

        {/* Popular Packages */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Popular Packages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src={img1} alt="Anamalai" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">Anamalai Jeep Safari</h3>
                <p className="text-sm text-gray-600">
                  2-day wildlife and waterfall trip.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src={img2} alt="Coorg" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">Coorg Coffee Tour</h3>
                <p className="text-sm text-gray-600">
                  Coffee estates, waterfalls and trekking.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img src={img3} alt="Europe" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">Germany + Switzerland</h3>
                <p className="text-sm text-gray-600">
                  Alps, lakes and scenic drives.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
