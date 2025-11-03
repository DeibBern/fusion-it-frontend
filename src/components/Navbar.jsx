import React, { useState, useEffect } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImg from "../assets/logo.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src={LogoImg}
            alt="Fusion I.T. Solutions"
            className="w-12 h-12 object-contain"
          />
          <span
            className={`font-bold text-xl md:text-2xl ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            Fusion I.T. Solutions
          </span>
        </div>

        {/* Desktop Links */}
        <div
          className={`hidden md:flex space-x-6 font-medium ${
            scrolled ? "text-gray-800" : "text-white"
          }`}
        >
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X
              size={28}
              className={scrolled ? "text-gray-800" : "text-white"}
            />
          ) : (
            <Menu
              size={28}
              className={scrolled ? "text-gray-800" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* Slide Down Mobile Menu */}
      <div
        className={`md:hidden bg-[#0D1B2A] text-white text-center font-medium overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-64 py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleHomeClick}
            className="cursor-pointer hover:text-blue-400 transition-colors bg-transparent border-none"
          >
            Home
          </button>
          <ScrollLink
            to="what-we-do"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="products"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            Products
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth
            duration={500}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            About
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
