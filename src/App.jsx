import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Layouts & UI
import MainLayout from './components/layout/MainLayout';
import PageLoader from './components/ui/PageLoader';
import Error from './components/ui/Error';
import SmartSuspense from './components/ui/SmartSuspense';

// Lazy Loaded Pages

const Home = lazy(() => import('./pages/Home'));
const Tracker = lazy(() => import('./pages/Tracker'));
const Admin = lazy(() => import('./pages/Admin'));
const News = lazy(() => import('./pages/News'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const Product = lazy(() => import('./pages/Product'));
const KineticTech = lazy(() => import('./pages/KineticTech'));
const EmbeddedTech = lazy(() => import('./pages/EmbeddedTech'));
const SecurityTech = lazy(() => import('./pages/SecurityTech'));
const PlatformOverview = lazy(() => import('./pages/PlatformOverview'));
const Documentation = lazy(() => import('./pages/Documentation'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Status = lazy(() => import('./pages/Status'));

export default function App() {
  return (
    <Router>
      <Helmet>
        <title>Swiftbox | Smart Locker Technologies</title>
        <meta name="description" content="Advanced IoT logistics for secure parcel management." />
      </Helmet>

      <SmartSuspense>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />

            {/* DEDICATED TECHNICAL PAGES */}
            <Route path="/product/kinetic" element={<KineticTech />} />
            <Route path="/product/iot" element={<EmbeddedTech />} />
            <Route path="/product/security" element={<SecurityTech />} />

            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<ArticleDetail />} />
            <Route path="/track" element={<Tracker />} />
            <Route path="/platform" element={<PlatformOverview />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/status" element={<Status />} />
          </Route>

          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </SmartSuspense>

    </Router>
  );
}