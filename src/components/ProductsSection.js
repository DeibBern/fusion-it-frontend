// src/components/ProductsSection.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products as localProducts } from "../data/products"; // ✅ local data

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(localProducts);
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 9000,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
      { breakpoint: 640, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <section
      id="products"
      className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4 sm:px-6"
    >
      {/* Global Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; letter-spacing: -0.02em; }
      `}</style>

      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-gray-800 font-[Inter] tracking-tight">
        Featured Products
      </h2>

      {products.length > 0 ? (
        <div className="w-full max-w-7xl">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-3 sm:px-4">
                <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-5 sm:p-6 flex flex-col items-center">
                  {product.image && (
                    <div className="w-full max-w-[260px] sm:max-w-[300px] h-48 sm:h-64 flex items-center justify-center bg-white rounded-xl mb-4 overflow-hidden border border-gray-200">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-contain w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 font-[Inter] text-center">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm sm:text-base font-[Inter] leading-snug">
                    {product.description?.length > 80
                      ? product.description.substring(0, 80) + "..."
                      : product.description}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-gray-500 font-[Inter] text-center">
          No products available yet.
        </p>
      )}

      <Link
        to="/products"
        className="mt-12 bg-[#0D1B2A] hover:bg-[#132E47] text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 font-[Inter]"
      >
        View More Products →
      </Link>
    </section>
  );
};

export default ProductsSection;
