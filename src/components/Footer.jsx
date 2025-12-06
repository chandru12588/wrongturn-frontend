import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 pt-12 pb-6">
      
      {/* Glass Background */}
      <div className="backdrop-blur-md bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT SECTION - BRAND + SOCIAL */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Unity</h2>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Connecting people to experience the real India.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 text-xl">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/WrongTurnHikers?mibextid=JRoKGi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/wrongturnclub/?utm_source=qr&r=nametag"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>

              {/* WhatsApp → Direct Chat with Sajjad */}
              <a
                href="https://wa.me/919566806800"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FaWhatsapp />
              </a>

            </div>
          </div>

          {/* MIDDLE SECTION - EXPLORE INFO */}
          <div>
            <h3 className="font-bold text-white mb-3">EXPLORE</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Sajjad: +91-9566806800 <br />
              contact@wrongturnclub.com <br /><br />
              Poombara Kalikkattil, <br />
              Kodaikkanal, Tamil Nadu <br />
              Minas: 9003310218, Murali: 7373816166 <br />
              <a href="mailto:info@wrongturnclub.in" className="underline">
                info@wrongturnclub.in
              </a>
            </p>
          </div>

          {/* RIGHT SECTION – NEWSLETTER */}
          <div>
            <h3 className="font-bold text-white mb-3">ADVENTURE</h3>
            <p className="text-sm text-gray-300 mb-3">
              Enter your email address
            </p>

            <input
              type="email"
              placeholder="Your email for updates"
              className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 border focus:outline-none"
            />

            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
              Join the Wrong Turn Club
            </button>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-gray-500 text-xs mt-6">
        © 2025 CREATIVE IMAGE
      </div>
    </footer>
  );
}
