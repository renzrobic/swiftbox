import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Imports
import Home from './pages/Home';
import Tracker from './pages/Tracker';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* 🟢 Site renders immediately without waiting for state */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col bg-white font-sans antialiased overflow-x-hidden"
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Tracker />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </Router>
  );
}