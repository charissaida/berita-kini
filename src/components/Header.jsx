import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Terbaru", to: "/terbaru" },
    { name: "Nasional", to: "/nasional" },
    { name: "Internasional", to: "/internasional" },
    { name: "Ekonomi", to: "/ekonomi" },
    { name: "Olahraga", to: "/olahraga" },
    { name: "Teknologi", to: "/teknologi" },
    { name: "Hiburan", to: "/hiburan" },
    { name: "Gaya Hidup", to: "/lifestyle" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="navbar px-4 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 focus:border-none">
            <img src={logo} alt="Logo Portal Berita" className="w-8 h-8" />
            Berita Kini
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex space-x-4">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.to} className={({ isActive }) => `btn btn-ghost btn-sm rounded ${isActive ? "text-blue-500 font-bold" : ""}`}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <button className="btn btn-ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <NavLink key={index} to={item.to} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `btn btn-ghost justify-start ${isActive ? "text-blue-500 font-bold" : ""}`}>
                {item.name}
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
