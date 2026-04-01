import React from 'react';
import { LayoutDashboard, Users, Heart, LogOut, ChevronRight, X, Shield, Mail, Globe } from 'lucide-react';
import { supabase } from '../supabase';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const menuItems = [
    { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'volunteers', name: 'Volunteers', icon: Users },
    { id: 'donations', name: 'Donations', icon: Heart },
    { id: 'contacts', name: 'Inquiries', icon: Mail },
    { id: 'territory', name: 'Territory Map', icon: Globe },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] text-white z-50 transition-all duration-500 ease-in-out border-r border-white/5 shadow-2xl lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header Section */}
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-green-600 rounded-2xl shadow-2xl shadow-green-900/50 border border-green-400/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter leading-none text-white uppercase italic">SUN <span className="text-green-500 font-black">NGO</span></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mt-1 flex items-center">
                    <Shield className="w-2 h-2 mr-1 text-green-600" /> Admin Node
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-8 mb-8"></div>

          {/* Navigation Menu */}
          <nav className="flex-grow px-4 space-y-3 text-xs">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group relative ${
                  activeTab === item.id 
                    ? 'bg-green-600 text-white shadow-2xl shadow-green-900/50 border border-green-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-green-500'}`} />
                  <span className="font-black uppercase tracking-widest">{item.name}</span>
                </div>
                {activeTab === item.id ? (
                  <ChevronRight className="w-4 h-4 animate-pulse opacity-70" />
                ) : (
                  <div className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-green-500 transition-colors"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom Logout Section */}
          <div className="p-6 mt-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-5 text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-2xl transition-all duration-300 group mb-6 border border-transparent hover:border-red-500/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-2 bg-white/5 group-hover:bg-red-500/20 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start text-xs">
                <span className="font-black uppercase tracking-widest leading-none">Terminate</span>
                <span className="text-[10px] font-bold text-gray-600 mt-1 uppercase italic tracking-widest">End Session</span>
              </div>
            </button>

            <div className="px-2 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Powered by SUN NGO</p>
              <p className="text-[8px] font-bold text-gray-800 mt-1 uppercase">v 2.1.0-secure</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
