import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <nav className="bg-red-600 text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="font-extrabold text-2xl tracking-wide">YourLogo</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-semibold">
          <a href="#hero" className="hover:text-red-200 transition">Home</a>
          <a href="#about" className="hover:text-red-200 transition">About</a>
          <a href="#services" className="hover:text-red-200 transition">What We Do</a>
          <a href="#products" className="hover:text-red-200 transition">Products</a>
          <a href="#contact" className="hover:text-red-200 transition">Contact</a>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={handleToggle}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-white"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-red-700 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-3 px-6 font-semibold">
          <a href="#hero" onClick={handleClose} className="hover:text-red-200 transition">
            Home
          </a>
          <a href="#about" onClick={handleClose} className="hover:text-red-200 transition">
            About
          </a>
          <a href="#services" onClick={handleClose} className="hover:text-red-200 transition">
            What We Do
          </a>
          <a href="#products" onClick={handleClose} className="hover:text-red-200 transition">
            Products
          </a>
          <a href="#contact" onClick={handleClose} className="hover:text-red-200 transition">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
