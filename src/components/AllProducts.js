import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Search, ArrowLeft } from "lucide-react";
import LogoImg from "../assets/logo.png";

const API_URL = "https://fusion-it-backend.onrender.com";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [shrink, setShrink] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // ✅ Fetch products from live backend
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
          setFilteredProducts(formatted);
        }
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // ✅ Navbar shrink
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setShrink(scrolled);
      setShowBackButton(!scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackHome = () => {
    navigate("/");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-[Inter] text-gray-900 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#D5BCA1] via-[#B4C8E0] to-[#D5BCA1] bg-[length:400%_400%] animate-[gradientShift_60s_ease_infinite]" />

      {showBackButton && (
        <button
          onClick={handleBackHome}
          className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-white/90 text-[#0D1B2A] font-semibold px-4 py-2 rounded-full shadow-md border border-gray-200 hover:bg-[#f0f0f0] transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      )}

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ease-in-out backdrop-blur-md ${
          shrink
            ? "h-[90px] bg-white/95 shadow-lg border-b border-gray-300/40"
            : "h-[300px] bg-transparent"
        } flex flex-col items-center justify-center`}
      >
        <div
          className={`flex items-center justify-between w-full max-w-6xl transition-all duration-700 ${
            shrink ? "flex-row px-8 text-left" : "flex-col text-center px-6"
          }`}
        >
          <div className="flex items-center gap-4">
            <img
              src={LogoImg}
              alt="Fusion I.T. Solutions"
              className={`transition-all duration-700 ${
                shrink ? "w-12 h-12" : "w-24 h-24 mb-4 mx-auto"
              } drop-shadow-lg`}
            />
            <div
              className={`transition-all duration-700 ${
                shrink ? "max-w-lg" : "max-w-xl"
              }`}
            >
              <h1
                className={`font-extrabold tracking-tight text-[#0D1B2A] transition-all duration-700 ${
                  shrink ? "text-2xl" : "text-5xl mb-2"
                }`}
              >
                Featured Products
              </h1>
              {!shrink && (
                <p className="text-lg text-gray-800 leading-snug transition-opacity duration-700">
                  Explore our curated range of technology solutions designed for
                  businesses across the Philippines.
                </p>
              )}
            </div>
          </div>

          {shrink && (
            <div className="flex items-center gap-4 transition-all duration-700">
              <button
                onClick={handleBackHome}
                className="bg-[#0D1B2A] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#132E47] transition-all transform hover:scale-105 shadow-md"
              >
                Home
              </button>
              <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 border border-gray-200 w-60 transition-all duration-700">
                <Search className="text-gray-500 mr-2" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none text-gray-800 font-medium"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <div
        className={`transition-all duration-500 ${
          shrink ? "h-[90px]" : "h-[300px]"
        }`}
      />

      {!shrink && (
        <div className="relative z-10 max-w-4xl mx-auto mt-10 px-6 transition-all duration-700">
          <div className="flex items-center bg-white/80 backdrop-blur-md shadow-md rounded-full px-4 py-2 border border-gray-200">
            <Search className="text-gray-500 mr-3" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-gray-800 font-medium"
            />
          </div>
        </div>
      )}

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-8 mt-[20px]">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-600 font-[Inter]">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-gray-600 font-[Inter]">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {product.image && (
                  <div className="h-56 w-full flex items-center justify-center bg-white overflow-hidden border-b border-gray-200">
                    <img
                      src={`${API_URL}${product.image}`}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#0D1B2A] mb-2 font-[Inter] tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 font-[Inter] leading-snug">
                    {product.description?.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 z-50 bg-[#0D1B2A] text-white p-3 rounded-full shadow-lg hover:bg-[#132E47] transition-transform transform hover:scale-110"
          aria-label="Go to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
