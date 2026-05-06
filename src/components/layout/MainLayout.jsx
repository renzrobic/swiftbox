import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function MainLayout() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-white font-sans antialiased selection:bg-ink/10"
    >
      <ScrollToTop />
      <Navbar />
      
      {/* Outlet is where your nested routes (Home, Tracker, etc.) will render */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </motion.div>
  );
}