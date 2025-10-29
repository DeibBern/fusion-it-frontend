import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://fusion-it-backend.onrender.com";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          const formatted = data.data.map((p) => {
            const attr = p.attributes || p;
            const img =
              attr.image?.data?.attributes?.url ||
              attr.image?.url ||
              p.image?.url ||
              null;
            return {
              id: p.id,
              name: attr.name || "Unnamed Product",
              description: attr.description || "",
              image: img,
            };
          });
          setProducts(formatted);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      id="products"
      className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-6"
    >
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800 font-[Inter] tracking-tight">
        Featured Products
      </h2>

      {products.length > 0 ? (
        <div className="w-full max-w-7xl">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="px-4">
                <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-6 flex flex-col items-center">
                  {product.image && (
                    <div className="w-64 h-64 flex items-center justify-center bg-white rounded-xl mb-4 overflow-hidden border border-gray-200">
                      <img
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : `${API_URL}${product.image}`
                        }
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 font-[Inter] text-center">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm font-[Inter] leading-snug">
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
        <p className="text-gray-500 font-[Inter]">No products available yet.</p>
      )}

      <Link
        to="/products"
        className="mt-12 bg-[#0D1B2A] hover:bg-[#132E47] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 font-[Inter]"
      >
        View More Products →
      </Link>
    </section>
  );
};

export default ProductsSection;
