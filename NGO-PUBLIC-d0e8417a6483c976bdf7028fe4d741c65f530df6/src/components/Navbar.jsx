import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Lock } from 'lucide-react';

const Navbar = ({ onDonateClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                SUN <span className="text-green-600">NGO</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-6 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                    isActive(link.path) ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/admin-login"
                className="flex items-center bg-gray-950 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-black transition duration-300 shadow-lg"
              >
                <Lock className="w-3.5 h-3.5 mr-2" /> Admin Portal
              </Link>
              <button
                onClick={onDonateClick}
                className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-green-700 transition duration-300 shadow-lg shadow-green-200"
              >
                Donate Now
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <Link
                to="/admin-login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center bg-gray-950 text-white px-6 py-3 rounded-lg font-bold hover:bg-black transition duration-300"
              >
                <Lock className="w-4 h-4 mr-2" /> Admin Portal
              </Link>
              <button
                onClick={() => {
                  onDonateClick();
                  setIsOpen(false);
                }}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 shadow-lg shadow-green-100"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
