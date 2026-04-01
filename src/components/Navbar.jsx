import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Lock, LayoutDashboard } from 'lucide-react';
import { mockAuth } from '../mockApi';

const Navbar = ({ onDonateClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Mission Protocol: Real-time Session Sync
    const currentSession = mockAuth.getSession();
    setSession(currentSession);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!session) return '/login';
    if (session.role === 'admin' && session.email === 'basha@gmail.com') return '/admin-dashboard';
    if (session.role === 'officer') return '/officer-dashboard';
    return '/user-dashboard';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2 group">
              <div className="p-2 bg-green-600 rounded-lg group-hover:rotate-12 transition-transform">
                <Heart className="h-8 w-8 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block uppercase tracking-tighter italic">
                SUN <span className="text-green-600">NGO</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-6 mr-6 uppercase text-[10px] font-black tracking-widest">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors hover:text-green-600 ${
                    isActive(link.path) ? 'text-green-600 border-b-2 border-green-600 pb-1' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={getDashboardPath()}
                className="flex items-center bg-gray-950 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-gray-200"
              >
                {session ? (
                  <><LayoutDashboard className="w-3.5 h-3.5 mr-2" /> My Dashboard</>
                ) : (
                  <><Lock className="w-3.5 h-3.5 mr-2" /> Admin Portal</>
                )}
              </Link>
              <button
                onClick={onDonateClick}
                className="bg-green-600 text-white px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100"
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
          <div className="px-4 pt-4 pb-8 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                  isActive(link.path) ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 space-y-3">
              <Link
                to={getDashboardPath()}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center bg-gray-950 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 transition-all"
              >
                <LayoutDashboard className="w-4 h-4 mr-2" /> {session ? 'My Dashboard' : 'Admin Portal'}
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onDonateClick();
                }}
                className="w-full bg-green-600 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100"
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
