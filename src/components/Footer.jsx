import React from "react";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi";
import logo from "../assets/logo2.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navItems = [
    { name: "Beranda", to: "/" },
    { name: "Terbaru", to: "/terbaru" },
    { name: "Nasional", to: "/nasional" },
    { name: "Internasional", to: "/internasional" },
    { name: "Ekonomi", to: "/ekonomi" },
    { name: "Olahraga", to: "/olahraga" },
    { name: "Teknologi", to: "/teknologi" },
    { name: "Hiburan", to: "/hiburan" },
    { name: "Gaya Hidup", to: "/gayahidup" },
  ];

  return (
    <footer className="bg-[#263544] text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo Portal Berita" className="w-10 h-10" />
            <span className="text-2xl font-semibold">Berita Kini</span>
          </div>
          <p className="text-sm mb-6">© 2023 Berita Kini. All Rights Reserved.</p>
          <p className="mb-2 text-lg">Ikuti Kami</p>
          <div className="flex gap-3 text-3xl text-gray-700">
            <FaYoutube className="bg-white p-1 rounded-lg hover:text-red-500 cursor-pointer" />
            <FaInstagram className="bg-white p-1 rounded-lg hover:text-pink-500 cursor-pointer" />
            <FaFacebook className="bg-white p-1 rounded-lg hover:text-blue-500 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Telusuri</h3>
          <ul className="space-y-1 text-sm">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink to={item.to} className="hover:text-gray-400 cursor-pointer">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Bantuan</h3>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-gray-400 cursor-pointer">Kontak Kami</li>
            <li className="hover:text-gray-400 cursor-pointer">Laporan Pembajakan</li>
            <li className="hover:text-gray-400 cursor-pointer">Kebijakan</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Berlangganan Berita Terbaru</h3>
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input type="email" placeholder="Masukan email" className="px-3 py-2 w-full text-black outline-none" />
            <button className="bg-blue-500 hover:bg-blue-700 p-1 mr-1 rounded-md">
              <HiPaperAirplane className="text-white rotate-45 ml-1 mb-1 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
