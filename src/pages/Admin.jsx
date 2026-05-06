import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Newspaper, BarChart3, Settings,
  Power, Server, Wallet, Users, ChevronDown
} from 'lucide-react';

// Hooks
import { useAdminAuth } from '../hooks/useAdminAuth';

// Feature Components
import LogisticsDashboard from '../features/admin/LogisticsDashboard';
import ArticleManager from '../features/admin/ArticleManager';
import AdminAnalytics from '../features/admin/AdminAnalytics';
import AdminUsers from '../features/admin/AdminUsers';
import AdminFinance from '../features/admin/AdminFinance';
import AdminInfrastructure from '../features/admin/AdminInfrastructure';
import LoginGateway from '../features/admin/LoginGateway';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Logistics', icon: LayoutDashboard },
  { id: 'infra', label: 'Infrastructure', icon: Server },
  { id: 'finance', label: 'Financials', icon: Wallet },
  { id: 'seo', label: 'News', icon: Newspaper },
  { id: 'users', label: 'Team', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Config', icon: Settings },
];

export default function Admin() {
  // Use our new custom hook!
  const { isAuthenticated, userSession, loading, authorize, logout } = useAdminAuth();

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [passInput, setPassInput] = useState('');

  const handleAuthorize = async () => {
    const success = await authorize(passInput);
    if (!success) setPassInput('');
  };

  if (!isAuthenticated) {
    return (
      <LoginGateway
        passInput={passInput}
        setPassInput={setPassInput}
        onAuthorize={handleAuthorize}
        isLoading={loading}
      />
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-white pt-24 text-left font-sans text-ink md:flex-row md:pt-24">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden w-64 flex-col justify-between border-r border-ink/5 bg-white p-6 md:flex">
        <div>
          <header className="mb-10 px-2">
            <h1 className="text-2xl font-bold leading-none tracking-tight text-ink">
              {userSession?.name}
            </h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-ink/30">
              {userSession?.role}
            </p>
          </header>

          <nav className="space-y-1" aria-label="Admin Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all lg:rounded-2xl ${isActive
                    ? 'bg-ink text-white shadow-lg shadow-ink/10 btn-ai-glow'
                    : 'text-ink/40 hover:bg-ink/5'
                    } shadow-sm border border-transparent`}
                >
                  <item.icon size={16} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 transition-all hover:bg-red-50 lg:rounded-2xl"
        >
          <Power size={16} aria-hidden="true" /> Exit Session
        </button>
      </aside>

      {/* ── Mobile Navigation Bar (Premium Scrollable Tabs) ── */}
      <nav className="flex flex-col border-b border-ink/10 bg-white md:hidden overflow-hidden">
        <div className="flex items-center justify-between p-4 px-6">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-ink">Swiftbox Terminal</span>
          <button
            onClick={logout}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 active:scale-90 transition-transform"
          >
            <Power size={14} />
          </button>
        </div>

        {/* Horizontal Technical Scroll */}
        <div className="flex w-full items-center gap-1 overflow-x-auto px-4 pb-4 no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${isActive
                  ? 'bg-ink text-white shadow-lg shadow-ink/10 btn-ai-glow'
                  : 'bg-ink/5 text-ink/40 border border-ink/5'
                  }`}
              >
                <item.icon size={12} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Main Dashboard Stage ── */}
      <main className="flex-1 overflow-y-auto bg-pearl p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'dashboard' && <LogisticsDashboard />}
            {currentTab === 'infra' && <AdminInfrastructure />}
            {currentTab === 'finance' && <AdminFinance />}
            {currentTab === 'seo' && <ArticleManager />}
            {currentTab === 'users' && <AdminUsers />}
            {currentTab === 'analytics' && <AdminAnalytics />}
            {currentTab === 'settings' && (
              <div className="flex min-h-[50vh] flex-col items-center justify-center">
                <Settings size={48} className="mb-4 animate-spin-slow  text-ink/30" />
                <div className="text-4xl font-black uppercase tracking-tighter text-ink/30">Config_v2.06</div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-ink/30">Core System Parameters</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}