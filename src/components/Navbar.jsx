import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // ✅ For clean icons (hamburger + close)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Company Name */}
        <h1 className="text-2xl font-bold tracking-wide">MyCompany</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-gray-200 transition">
            Home
          </a>
          <a href="#about" className="hover:text-gray-200 transition">
            About
          </a>
          <a href="#services" className="hover:text-gray-200 transition">
            Services
          </a>
          <a href="#contact" className="hover:text-gray-200 transition">
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-gray-700">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <a
              href="#home"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#contact"
              className="hover:text-gray-200 transition"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
