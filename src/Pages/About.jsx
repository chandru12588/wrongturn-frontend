import React from "react";
import img4 from "../assets/img4.jpg"
import img5 from "../assets/img5.avif"
import img6 from "../assets/img6.jpg"

export default function About() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* HERO BANNER */}
      <section className="relative">
        <img 
          src= {img4}
          alt="Wrong Turn Club"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            About Wrong Turn Club
          </h1>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Wrong Turn Club is a travel-based adventure community built for people 
          who love exploring nature, culture, wildlife, mountains, forests, 
          and unexplored places. Our trips are crafted with real experiences — 
          from jeep safaris in deep forests to peaceful hill-station retreats 
          and cultural walks across historic Indian towns.
        </p>
      </section>

      {/* IMAGE + ABOUT BLOCK */}
      <section className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
        <img 
          src={img5}
          alt="Our Journey"
          className="rounded-xl shadow"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Journey</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            What started as a simple idea to explore weekend destinations has today 
            grown into a community of passionate travelers. We focus on connecting 
            people with real India — its landscapes, food, wildlife, traditions, 
            and stories. Every trip is carefully designed to offer memorable 
            experiences and meaningful travel.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">What We Do</h2>

          <ul className="text-gray-700 space-y-3 text-lg">
            <li>• Forest jeep safaris & wildlife experiences</li>
            <li>• Hill-station tours, waterfalls & nature retreats</li>
            <li>• Cultural & heritage travel across Indian cities</li>
            <li>• Premium international travel experiences</li>
            <li>• Customized group tours for families & corporates</li>
            <li>• Budget-friendly backpack trips</li>
            <li>• Photography, food, and walking tours</li>
          </ul>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To inspire people to travel beyond the obvious. We aim to build a 
            strong travel community where every journey is unique, immersive, 
            and filled with unforgettable moments. Whether it's trekking through 
            forests, exploring ancient temples, or visiting the Alps — we bring 
            travelers closer to nature and culture.
          </p>
        </div>

        <img 
          src={img6}
          alt="Vision"
          className="rounded-xl shadow"
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">Why Choose Us?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="font-semibold text-indigo-600 mb-2">Experienced Guides</h3>
              <p className="text-gray-700 text-sm">
                Our team ensures safe, comfortable and well-planned trips.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="font-semibold text-indigo-600 mb-2">Unique Destinations</h3>
              <p className="text-gray-700 text-sm">
                We explore places that are beautiful, offbeat and meaningful.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="font-semibold text-indigo-600 mb-2">Affordable Packages</h3>
              <p className="text-gray-700 text-sm">
                Premium experiences at budget-friendly pricing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow border">
              <h3 className="font-semibold text-indigo-600 mb-2">Community Vibes</h3>
              <p className="text-gray-700 text-sm">
                You don't just travel — you become part of our family.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 text-center">
        <h3 className="text-3xl font-bold">Ready to Explore the Real India?</h3>
        <p className="text-indigo-100 mt-2 mb-6">Join us on your next adventure.</p>
        <a 
          href="/contact"
          className="px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow hover:bg-gray-100"
        >
          Contact Us
        </a>
      </section>

    </div>
  );
}
