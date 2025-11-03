// src/components/WhatWeDo.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { whatWeDo } from "../data/whatWeDo"; // local data

const CATEGORY_ORDER = ["General Services", "Sales", "System Services"];

/* ---------------- CUSTOM ARROWS ---------------- */
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 
               bg-gradient-to-r from-blue-600 to-purple-600 text-white 
               p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 
               transition-all duration-300 z-10"
  >
    <ChevronRight size={22} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-3 top-1/2 transform -translate-y-1/2 
               bg-gradient-to-r from-purple-600 to-blue-600 text-white 
               p-3 sm:p-4 rounded-full shadow-lg hover:scale-110 
               transition-all duration-300 z-10"
  >
    <ChevronLeft size={22} />
  </button>
);

export default function WhatWeDo() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("General Services");

  useEffect(() => {
    setCategories(whatWeDo);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: "250px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1536, settings: { centerPadding: "160px" } },
      { breakpoint: 1280, settings: { centerPadding: "100px" } },
      { breakpoint: 1024, settings: { centerPadding: "60px" } },
      { breakpoint: 768, settings: { centerMode: false, arrows: false } },
      { breakpoint: 640, settings: { centerMode: false, arrows: false } },
    ],
  };

  return (
    <section
      id="whatwedo"
      className="relative min-h-screen flex flex-col items-center justify-center 
                 px-4 sm:px-6 py-10 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
    >
      {/* Apply Inter Font Globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif; letter-spacing: -0.02em; }
      `}</style>

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-center text-black leading-tight drop-shadow-md">
        What We Do
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {CATEGORY_ORDER.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-5 sm:px-7 py-2 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              activeTab === category
                ? "bg-black text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Slider Section */}
      <div className="w-full max-w-7xl relative">
        {categories[activeTab] && categories[activeTab].length > 0 ? (
          <Slider {...sliderSettings}>
            {categories[activeTab].map((item) => (
              <div key={item.id} className="px-2 sm:px-3">
                <div
                  className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl 
                             transition-all duration-300 p-5 sm:p-7 text-center border border-white/40"
                >
                  {item.Image && (
                    <div className="w-full h-56 sm:h-72 md:h-80 flex items-center justify-center overflow-hidden rounded-xl mb-4 border border-gray-200">
                      <img
                        src={item.Image}
                        alt={item.Title}
                        className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-900 mb-2">
                    {item.Title}
                  </h3>
                  {item.Description && (
                    <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto">
                      {item.Description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600 text-sm sm:text-base">
            No items available in {activeTab}.
          </p>
        )}
      </div>
    </section>
  );
}
