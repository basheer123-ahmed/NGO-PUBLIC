import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonationModal from './components/DonationModal';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Volunteer from './pages/Volunteer';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

function AppContent({ openDonateModal }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navbar onDonateClick={openDonateModal} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onDonateClick={openDonateModal} />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* Backward compatibility for old link */}
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
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
