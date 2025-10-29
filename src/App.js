// src/App.js
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import LogoImg from "./assets/logo.png";
import WhatWeDo from "./components/WhatWeDo";
import ProductsSection from "./components/ProductsSection";
import ContactFloater from "./components/ContactFloater";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import AllProducts from "./components/AllProducts";

// ✅ Import hero images
import HonestImg from "./components/HONEST.png";
import ReliableImg from "./components/RELIABLE.jpg";
import AffordableImg from "./components/AFFORDABLE.png";
import ExpertImg from "./components/EXPERT.jpg";

/* ---------------- NAVBAR ---------------- */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scroll.scrollToTop({ duration: 500, smooth: true }), 100);
    } else {
      scroll.scrollToTop({ duration: 500, smooth: true });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={LogoImg} alt="Fusion I.T. Solutions" className="w-12 h-12 object-contain" />
          <span className={`font-bold text-xl md:text-2xl ${scrolled ? "text-gray-800" : "text-white"}`}>
            Fusion I.T. Solutions
          </span>
        </div>

        <div className={`space-x-6 font-medium ${scrolled ? "text-gray-800" : "text-white"}`}>
          <a
            href="#hero"
            onClick={handleHomeClick}
            className={`cursor-pointer hover:text-blue-500 transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            Home
          </a>
          <ScrollLink
            to="what-we-do"
            smooth
            duration={500}
            offset={35}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="products"
            smooth
            duration={500}
            offset={28}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          >
            Products
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth
            duration={500}
            offset={-20}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          >
            About
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
};

/* ---------------- HERO ---------------- */
function Hero() {
  const slides = [
    {
      title: "Honest Solutions You Can Trust",
      image: HonestImg,
      description: "Integrity in every line of code — we deliver what we promise.",
    },
    {
      title: "Reliable Technology for Modern Businesses",
      image: ReliableImg,
      description: "Dependable IT systems that keep your business running smoothly.",
    },
    {
      title: "Affordable Innovation Without Compromise",
      image: AffordableImg,
      description: "Smart, cost-effective IT solutions designed for your needs.",
    },
    {
      title: "Expert Support Every Step of the Way",
      image: ExpertImg,
      description: "Our professionals ensure your technology works as hard as you do.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0, scrollY: 0 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => next(), 7000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const x = (relX - 0.5) * 12;
      const y = (relY - 0.5) * 8;
      setParallax((p) => ({ ...p, x, y }));
    };

    const onScroll = () => {
      const sc = window.scrollY || window.pageYOffset;
      const scrollY = Math.max(0, Math.min(40, sc * 0.02));
      setParallax((p) => ({ ...p, scrollY }));
    };

    hero.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      hero.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const next = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setAnimating(false);
    }, 1200);
  };

  const prev = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimating(false);
    }, 1200);
  };

  const textTransform = `translate3d(${parallax.x}px, ${parallax.y - parallax.scrollY}px, 0)`;

  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero" ref={heroRef}>
      {[0, 1, 2].map((layer) => (
        <div
          key={layer}
          className={`absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            animating ? `diag3DLayer${layer + 1}` : ""
          }`}
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 1 - layer * 0.25,
            zIndex: 3 - layer,
            transformOrigin: "left center",
          }}
        ></div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 transition-all duration-1000 ${
          animating ? "textOut" : "textIn"
        }`}
        style={{
          transform: textTransform,
          willChange: "transform",
        }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-[Inter] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
          {slides[currentSlide].title}
        </h2>
        <p
          className="text-lg sm:text-xl text-gray-100 max-w-3xl tracking-tight leading-snug font-[Inter]"
          style={{
            textShadow:
              "0 2px 5px rgba(0,0,0,0.9), 0 3px 8px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9)",
          }}
        >
          {slides[currentSlide].description}
        </p>
      </div>

      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full hover:bg-black/70 transition z-20"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full hover:bg-black/70 transition z-20"
      >
        ›
      </button>

      <style>{`
        .diag3DLayer1 { transform: rotateY(15deg) scale(1.1); opacity: 0.7; }
        .diag3DLayer2 { transform: rotateY(-10deg) scale(1.05); opacity: 0.5; }
        .diag3DLayer3 { transform: rotateY(5deg) scale(1.02); opacity: 0.3; }
        .textOut { opacity: 0; transform: translateY(40px); }
        .textIn { opacity: 1; transform: translateY(0); }
      `}</style>
    </section>
  );
}

/* ---------------- SECTION WRAPPER ---------------- */
const SectionWrapper = ({ id, children, elevated = true, small = false, smallHeight = "90vh" }) => {
  const isProducts = id === "products";
  return (
    <section
      id={id}
      className={`relative flex items-center justify-center ${
        isProducts ? "py-4" : "py-4"
      } px-6 bg-gradient-to-b from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] ${
        small ? "" : "min-h-screen"
      }`}
      style={small ? { minHeight: smallHeight } : {}}
    >
      <div
        className={`max-w-6xl w-full p-10 transition-all duration-500 ${
          elevated
            ? "bg-white/10 backdrop-blur-md rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.3)] border border-white/20 hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-white/30"
            : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
};

/* ---------------- ABOUT ---------------- */
function AboutSection() {
  return (
    <SectionWrapper id="about" elevated={true}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <img src={LogoImg} alt="Fusion I.T. Solutions" className="w-28 mx-auto md:mx-0 mb-6" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#734C36] tracking-tight font-[Inter]">
            Fusion I.T. Solutions
          </h2>
          <h3 className="text-2xl md:text-4xl font-bold mt-4 leading-snug text-[#0D1B2A] tracking-tight font-[Inter]">
            Your #1 Go-To Partner <br /> for All Your IT Needs
          </h3>
          <p className="mt-6 text-lg font-medium tracking-tight leading-snug font-[Inter]">
            Delivering{" "}
            <span className="text-[#734C36] font-bold">HONEST, RELIABLE, AFFORDABLE</span> and{" "}
            <span className="text-[#734C36] font-bold">EXPERT</span> solutions across the Philippines.
          </p>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#0D1B2A] tracking-tight font-[Inter]">
            About Us
          </h2>
          <p className="text-lg leading-relaxed mb-4 tracking-tight font-[Inter]">
            Fusion I.T. Solutions is a premier technology solutions provider based in San Juan, Batangas, Philippines.
            Our mission is to deliver honest service, reliable solutions, and affordable prices.
          </p>
          <p className="text-lg leading-relaxed tracking-tight font-[Inter]">
            Whether you need software, hardware, networking, security, solar solutions, technical support, or paper
            products, Fusion I.T. Solutions has the expertise and experience to deliver.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-10">
      <div className="max-w-6xl mx-auto text-center font-[Inter]">
        <p className="text-lg font-semibold">Fusion I.T. Solutions</p>
        <p className="text-gray-400 mt-2">Empowering Businesses through Technology and Innovation.</p>
        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
          <a href="#hero" className="hover:text-blue-400">
            Home
          </a>
          <a href="#what-we-do" className="hover:text-blue-400">
            Services
          </a>
          <a href="#products" className="hover:text-blue-400">
            Products
          </a>
          <a href="#about" className="hover:text-blue-400">
            About
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Fusion I.T. Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------------- HOME PAGE ---------------- */
function HomePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <SectionWrapper id="what-we-do" elevated={false} small={true} smallHeight="60vh">
        <WhatWeDo />
      </SectionWrapper>
      <SectionWrapper id="products" elevated={false}>
        <ProductsSection />
      </SectionWrapper>
      <AboutSection />
      <Footer />
      <ContactFloater />
    </>
  );
}

/* ---------------- MAIN APP ---------------- */
function App() {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="App animate-gradient">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background: linear-gradient(135deg, #D5BCA1, #B4C8E0, #D5BCA1);
          background-size: 400% 400%;
          animation: gradientShift 60s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
