import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Accounts() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const logOut = () => {
    Cookies.remove('jwt_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111]">
      {/* Navbar */}
      <nav className="bg-black px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-8">
          <img
            src="https://res.cloudinary.com/dnns0cphq/image/upload/v1727864135/netflix_logo_direct-Photoroom-removebg-preview2_fmlf4l.png"
            alt="Netflix Logo"
            className="h-10 cursor-pointer"
            onClick={() => handleNavigate('/home')}
          />
          <div className="hidden sm:flex gap-6 text-white text-lg">
            <button onClick={() => handleNavigate('/home')} className="hover:text-red-500">Home</button>
            <button onClick={() => handleNavigate('/popular')} className="hover:text-red-500">Popular</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white cursor-pointer hidden sm:block"
            onClick={() => handleNavigate('/search')}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <img
            src="https://i.postimg.cc/gcwC5MLM/Avatar.png"
            alt="Avatar"
            className="h-8 w-8 rounded-full cursor-pointer hidden sm:block"
          />
          <img
            src="https://res.cloudinary.com/dudjdf428/image/upload/v1754295982/add-to-queue_1_cynvod.png"
            alt="Menu"
            className="h-8 w-8 cursor-pointer sm:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          />
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col gap-2 py-4 px-6 sm:hidden z-20 shadow-lg">
            <button onClick={() => handleNavigate('/home')} className="text-left py-1 hover:text-red-500">Home</button>
            <button onClick={() => handleNavigate('/popular')} className="text-left py-1 hover:text-red-500">Popular</button>
            <span className="font-semibold py-1">Account</span>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto bg-[#181818] rounded-lg shadow-lg mt-8 p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">Account</h1>
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-gray-400 text-lg mb-2">Membership</h2>
          <div className="ml-2">
            <p className="text-white text-base sm:text-lg">rahul@gmail.com</p>
            <p className="text-white text-base sm:text-lg">
              Password: <span className="text-gray-400">**********</span>
            </p>
          </div>
        </div>
        <div className="border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-gray-400 text-lg mb-2">Plan Details</h2>
          <div className="flex items-center ml-2 gap-4">
            <span className="text-white text-base sm:text-lg">Premium</span>
            <span className="bg-gray-700 text-white px-2 py-1 rounded text-xs">Ultra HD</span>
          </div>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded text-white font-semibold mt-4"
          onClick={logOut}
        >
          Logout
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-black mt-10 py-6 flex flex-col items-center">
        <div className="flex gap-6 mb-2">
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaGoogle /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaTwitter /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaInstagram /></a>
          <a href="#" className="text-white text-2xl hover:text-red-500"><FaYoutube /></a>
        </div>
        <p className="text-white text-sm">Contact Us</p>
      </footer>
    </div>
  );
}

export default Accounts;
