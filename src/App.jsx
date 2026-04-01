import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Volunteer from './pages/Volunteer';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

function AppContent({ openDonateModal }) {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/officer') || 
                      location.pathname.startsWith('/user-dashboard') ||
                      location.pathname === '/login';

  return (
    <>
      <ScrollToTop />
      {!isAdminPath && <Navbar onDonateClick={openDonateModal} />}
      
      <main className="flex-grow">
        <Routes>
          {/* Landing Page Sector - Now Public Root */}
          <Route path="/" element={<Home onDonateClick={openDonateModal} />} />
          <Route path="/home" element={<Home onDonateClick={openDonateModal} />} />
          
          <Route path="/about" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/works" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <Works />
            </ProtectedRoute>
          } />
          <Route path="/volunteer" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <Volunteer />
            </ProtectedRoute>
          } />
          <Route path="/gallery" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <Gallery />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <Contact />
            </ProtectedRoute>
          } />
          
          {/* Universal Auth Nodes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard Mission Centers */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/officer-dashboard" element={
            <ProtectedRoute allowedRoles={['officer', 'admin']}>
              <OfficerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/user-dashboard" element={
            <ProtectedRoute allowedRoles={['user', 'officer', 'admin']}>
              <UserDashboard />
            </ProtectedRoute>
          } />

          {/* Legacy Support (Optional) */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Unauthorized Catch */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 uppercase font-black text-red-500 italic text-2xl">
              Access Denied: Sector Restricted
            </div>
          } />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
    </>
  );
}

function App() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  const openDonateModal = () => setIsDonateModalOpen(true);
  const closeDonateModal = () => setIsDonateModalOpen(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AppContent openDonateModal={openDonateModal} />

        <DonationModal 
          isOpen={isDonateModalOpen} 
          onClose={closeDonateModal} 
        />
      </div>
    </Router>
  );
}

export default App;
