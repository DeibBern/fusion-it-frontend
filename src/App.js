// src/App.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import LogoImg from "./assets/logo.png";
import WhatWeDo from "./components/WhatWeDo";
import ProductsSection from "./components/ProductsSection";
import ContactFloater from "./components/ContactFloater";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import AllProducts from "./components/AllProducts";

// ✅ Hero Images
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

        <div className={`hidden md:flex space-x-6 font-medium ${scrolled ? "text-gray-800" : "text-white"}`}>
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

  const next = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setAnimating(false);
    }, 1200);
  }, [slides.length]);

  const prev = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimating(false);
    }, 1200);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => next(), 7000);
    return () => clearInterval(interval);
  }, [next]);

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

  const textTransform = `translate3d(${parallax.x}px, ${parallax.y - parallax.scrollY}px, 0)`;

  return (
    <section
      className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center"
      id="hero"
      ref={heroRef}
    >
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

      <div className="absolute inset-0 bg-black/50 z-5"></div>

      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-10 transition-all duration-1000 ${
          animating ? "textOut" : "textIn"
        }`}
        style={{ transform: textTransform, willChange: "transform" }}
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight font-[Inter] drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
          {slides[currentSlide].title}
        </h2>
        <p
          className="text-base sm:text-lg md:text-xl text-gray-100 max-w-[90%] sm:max-w-3xl tracking-tight leading-snug font-[Inter]"
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
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white text-lg sm:text-2xl px-3 sm:px-4 py-2 rounded-full hover:bg-black/70 transition z-20"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white text-lg sm:text-2xl px-3 sm:px-4 py-2 rounded-full hover:bg-black/70 transition z-20"
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

/* ---------------- WRAPPER ---------------- */
const SectionWrapper = ({ children, id }) => (
  <section id={id} className="relative z-10">
    {children}
  </section>
);

/* ---------------- ABOUT ---------------- */
const AboutSection = () => (
  <SectionWrapper id="about">
    <div className="bg-gray-50 py-20 px-6 md:px-16 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 font-[Inter]">About Us</h2>
      <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed font-[Inter]">
        Fusion I.T. Solutions provides complete and innovative IT systems for businesses.  
        We offer customized services that combine honesty, reliability, affordability,  
        and expertise — building solutions that drive success.
      </p>
    </div>
  </SectionWrapper>
);

/* ---------------- FOOTER ---------------- */
const Footer = () => (
  <footer className="bg-[#0D1B2A] text-white text-center py-6 font-[Inter]">
    <p>© {new Date().getFullYear()} Fusion I.T. Solutions. All rights reserved.</p>
  </footer>
);

/* ---------------- HOMEPAGE ---------------- */
function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SectionWrapper id="what-we-do">
        <WhatWeDo />
      </SectionWrapper>
      <SectionWrapper id="products">
        <ProductsSection />
      </SectionWrapper>
      <AboutSection />
      <Footer />
      <ContactFloater />
    </>
  );
}

/* ---------------- APP ---------------- */
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<AllProducts />} />
    </Routes>
  );
}

export default App;
