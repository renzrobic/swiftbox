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
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#F8FAFC] pt-20 text-left font-sans text-slate-900 md:flex-row md:pt-24">
      
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden w-64 flex-col justify-between border-r border-slate-200 bg-white p-6 md:flex">
        <div>
          <header className="mb-10 px-2">
            <h1 className="text-2xl font-bold leading-none tracking-tight text-royal-blue">
              {userSession?.name}
            </h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
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
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all lg:rounded-2xl ${
                    isActive 
                      ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/10' 
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
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

      {/* ── Mobile Navigation Bar ── */}
      <nav className="flex items-center justify-between border-b border-slate-100 bg-white p-4 md:hidden">
          <span className="text-sm font-semibold tracking-tight text-royal-blue">Swiftbox Admin</span>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <select 
                aria-label="Switch Dashboard Tab"
                value={currentTab} 
                onChange={(e) => setCurrentTab(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-[10px] font-black uppercase text-royal-blue outline-none"
              >
                {NAV_ITEMS.map(item => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 opacity-50 text-royal-blue" />
            </div>
            <button 
              onClick={logout} 
              aria-label="Logout"
              className="rounded-xl bg-red-50 p-2.5 text-red-500 active:scale-95"
            >
              <Power size={18} />
            </button>
          </div>
      </nav>

      {/* ── Main Dashboard Stage ── */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 md:p-10">
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
                <Settings size={48} className="mb-4 animate-spin-slow text-slate-200" />
                <div className="text-4xl font-black uppercase tracking-tighter text-slate-300">Config_v2.06</div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Core System Parameters</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}