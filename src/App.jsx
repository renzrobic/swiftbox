import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 

// Layouts & UI
import MainLayout from './components/layout/MainLayout';
import PageLoader from './components/ui/PageLoader'; // Make sure to move your loader here!
import Error from './components/ui/Error'; 

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Tracker = lazy(() => import('./pages/Tracker'));
const Admin = lazy(() => import('./pages/Admin'));
const News = lazy(() => import('./pages/News'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Product = lazy(() => import('./pages/Product')); // Fixed naming mismatch

export default function App() {
  return (
    <Router>
      <Helmet>
        <title>Swiftbox | Smart Locker Technologies</title>
        <meta name="description" content="Manage shipments and track packages in real-time with Swiftbox's advanced logistics portal." />
        <link rel="canonical" href="https://swiftbox.online" />
      </Helmet>

      <Suspense fallback={<PageLoader />}>
        <Routes>
          
          {/* Public Routes with Navbar and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Tracker />} />
            <Route path="/news" element={<News />} /> 
            <Route path="/news/:id" element={<ArticleDetail />} /> 
            <Route path="/product" element={<Product />} /> 
          </Route>

          {/* Admin Routes (No public Navbar/Footer) */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Fallback */}
          <Route path="*" element={<Error />} />

        </Routes>
      </Suspense>
    </Router>
  );
}