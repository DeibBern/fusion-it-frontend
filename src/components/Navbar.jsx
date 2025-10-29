export default function Navbar() {
  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Company Name */}
        <h1 className="text-2xl font-bold tracking-wide">MyCompany</h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-gray-200 transition">Home</a>
          <a href="#about" className="hover:text-gray-200 transition">About</a>
          <a href="#services" className="hover:text-gray-200 transition">Services</a>
          <a href="#contact" className="hover:text-gray-200 transition">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none">
          ☰
        </button>
      </div>
    </header>
  );
}
