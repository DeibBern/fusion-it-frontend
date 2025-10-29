import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = "https://fusion-it-backend.onrender.com/api/features?populate=Image";
const CATEGORY_ORDER = ["General Services", "Sales", "System Services"];

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 
               bg-gradient-to-r from-blue-600 to-purple-600 text-white 
               p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.7)] 
               hover:shadow-[0_0_35px_rgba(147,51,234,0.8)] 
               hover:scale-110 transition-all duration-300 z-10"
  >
    <ChevronRight size={28} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-3 top-1/2 transform -translate-y-1/2 
               bg-gradient-to-r from-purple-600 to-blue-600 text-white 
               p-4 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.7)] 
               hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] 
               hover:scale-110 transition-all duration-300 z-10"
  >
    <ChevronLeft size={28} />
  </button>
);

export default function WhatWeDo() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("General Services");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const grouped = res.data.data.reduce((acc, item) => {
          const category = item.Category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(item);
          return acc;
        }, {});
        setCategories(grouped);
      })
      .catch((err) => console.error("Error fetching features:", err))
      .finally(() => setLoading(false));
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
    centerPadding: "280px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { centerPadding: "80px" } },
      { breakpoint: 768, settings: { centerPadding: "40px" } },
      { breakpoint: 480, settings: { centerPadding: "10px" } },
    ],
  };

  return (
    <section
      id="whatwedo"
      className="relative min-h-screen flex flex-col items-center justify-center px-2 py-4 
                 bg-gradient-to-b from-white via-gray-50 to-white text-gray-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * {
          font-family: 'Inter', sans-serif !important;
          letter-spacing: -0.02em;
        }
      `}</style>

      <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-black leading-tight tracking-tight drop-shadow-md">
        What We Do
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6 tracking-tight">
        {CATEGORY_ORDER.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-6 py-2 rounded-full font-semibold text-sm leading-snug tracking-tight transition-all duration-300 ${
              activeTab === category
                ? "bg-black text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="w-full max-w-7xl relative font-inter">
        {categories[activeTab] && categories[activeTab].length > 0 ? (
          <Slider {...sliderSettings}>
            {categories[activeTab].map((item) => (
              <div key={item.id} className="px-2">
                <div
                  className="bg-white/30 backdrop-blur-lg rounded-xl shadow-md hover:shadow-lg 
                             transition-all duration-300 p-5 text-center border border-white/40 
                             leading-snug tracking-tight"
                >
                  {item.Image && (
                    <img
                      src={
                        item.Image?.url?.startsWith("http")
                          ? item.Image.url
                          : `https://fusion-it-backend.onrender.com${
                              item.Image?.url ||
                              item.Image?.formats?.medium?.url ||
                              item.Image?.formats?.large?.url ||
                              ""
                            }`
                      }
                      alt={item.Title}
                      className="w-full h-[260px] md:h-[320px] object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 leading-tight tracking-tight">
                    {item.Title}
                  </h3>
                  {item.Description && (
                    <p className="text-gray-700 text-sm md:text-base max-w-xl mx-auto leading-snug tracking-tight">
                      {item.Description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600 text-sm leading-snug tracking-tight">
            No items available in {activeTab}.
          </p>
        )}
      </div>
    </section>
  );
}
