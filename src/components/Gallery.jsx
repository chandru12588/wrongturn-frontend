// src/components/Gallery.jsx
import React from "react";

export default function Gallery() {
  // Add HD scenic images (royalty-free high-quality)
  const images = [
    // Himalayas
    "https://www.mountainiq.com/wp-content/uploads/2016/06/trekking-in-nepal-1.jpg",
    // Kerala
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    // Coorg
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=900&q=80",
    // Rajasthan
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    // Goa Beach
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    // Europe sample
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80"
  ];

  // Add video thumbnails
  const videos = [
    { 
      thumb: "https://www.mountainiq.com/wp-content/uploads/2016/06/trekking-in-nepal-1.jpg",
      url: "https://www.youtube.com/watch?v=KMRzCshwiXY"
    },
    {
      thumb: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/587534898.jpg?k=01a39843c2e0974686dcf1300d470b8de7f0b20d16712b69b55d57fe96f41593&o=",
      url: "https://www.youtube.com/watch?v=injDr_8i1mQ"
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>

      {/* IMAGES */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl shadow-md group aspect-[4/3]"
          >
            <img
              src={src}
              alt={"gallery-" + i}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}

        {/* VIDEOS */}
        {videos.map((v, i) => (
          <a
            key={"video-" + i}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            className="relative overflow-hidden rounded-xl shadow-md group aspect-[4/3]"
          >
            {/* Thumbnail */}
            <img
              src={v.thumb}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Video play icon overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
