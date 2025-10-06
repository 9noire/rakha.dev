import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-[#0f0f0f] text-white fixed top-0 z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-lime-400">rakha.dev</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <li><a href="#home" className="hover:text-lime-400">Home</a></li>
          <li><a href="#about" className="hover:text-lime-400">About</a></li>
          <li><a href="#skills" className="hover:text-lime-400">Skills</a></li>
          <li><a href="#project" className="hover:text-lime-400">Project</a></li>
          <li><a href="#certificates" className="hover:text-lime-400">Certificates</a></li>
          <li><a href="#contact" className="hover:text-lime-400">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#181818] border-t border-gray-800">
          <ul className="flex flex-col text-center text-sm py-3">
          <li><a href="#home" className="block py-2 hover:text-lime-400">Home</a></li>
          <li><a href="#about" className="block py-2 hover:text-lime-400">About</a></li>
          <li><a href="#skills" className="block py-2 hover:text-lime-400">Skills</a></li>
          <li><a href="#project" className="block py-2 hover:text-lime-400">Project</a></li>
          <li><a href="#certificates" className="block py-2 hover:text-lime-400">Certificates</a></li>
          <li><a href="#contact" className="block py-2 hover:text-lime-400">Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
