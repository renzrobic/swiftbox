import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Trash2, UserPlus, Key } from 'lucide-react';
import { api } from '../../services/api';

const INITIAL_MEMBER_STATE = { name: '', role: 'Maintenance', email: '', accessKey: '' };

export default function AdminUsers() {
  const [team, setTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [currentMember, setCurrentMember] = useState(INITIAL_MEMBER_STATE);

  const fetchTeam = useCallback(async () => {
    try {
      const data = await api.get('/api/v1/team');
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load team:", err);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // Handle Esc key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember(prev => ({ ...prev, [name]: value }));
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🛡️ AUTHORITATIVE BACKEND WRITE: Server validates, hashes accessKey with bcrypt, returns sanitized safe view
      const result = await api.post('/api/v1/team', {
        name: currentMember.name.trim(),
        email: currentMember.email.trim(),
        role: currentMember.role,
        accessKey: currentMember.accessKey ? currentMember.accessKey.trim() : undefined
      });

      if (result.initialKey) {
        alert(`MEMBER AUTHORIZED!\n\nGenerated One-Time Access Key: ${result.initialKey}\n\nPlease share this key securely with the user. It will not be shown again.`);
      } else {
        alert("Member authorized successfully.");
      }

      setIsModalOpen(false);
      setCurrentMember(INITIAL_MEMBER_STATE);
      await fetchTeam();
    } catch (err) {
      console.error("Auth Error:", err);
      alert(err.message || "Failed to authorize user.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Revoke authorization for ${name}?`)) {
      try {
        await api.delete(`/api/v1/team/${id}`);
        await fetchTeam();
      } catch (err) {
        console.error("Delete Error:", err);
        alert(err.message || "Failed to remove member.");
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header section */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Team</h2>
          <p className="text-[10px] font-semibold text-ink/40 tracking-wider mt-1">RBAC & Terminal Access Control</p>
        </div>
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)} 
          className="bg-ink text-white px-6 py-3 rounded-xl lg:rounded-2xl font-semibold tracking-wider text-[11px] shadow-md transition-all hover:bg-black active:scale-95 flex items-center gap-2"
        >
          <UserPlus size={14} /> Invite Member
        </button>
      </header>

      {/* Team List */}
      <div className="space-y-2" role="list">
        {fetching ? (
          <div className="p-8 text-center text-sm font-medium text-ink/40 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={16} /> Loading team members...
          </div>
        ) : team.length === 0 ? (
          <div className="p-8 text-center text-sm font-medium text-ink/30">No team members registered.</div>
        ) : (
          team.map((user) => (
            <div 
              key={user.id} 
              role="listitem"
              className="bg-white border border-ink/10 p-4 rounded-xl lg:rounded-2xl flex items-center justify-between transition-all hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div 
                  aria-hidden="true"
                  className="h-10 w-10 bg-ink rounded-lg flex items-center justify-center text-white font-semibold text-xs"
                >
                  {user.name?.[0] || '?'}
                </div>
                <div>
                  <p className="font-semibold text-sm text-ink">{user.name}</p>
                  <p className="text-[9px] font-semibold text-ink/80 tracking-wider">
                    {user.role} • <span className="text-ink/60">{user.email || 'No Email'}</span> • <span className="text-emerald-600 font-medium">{user.status || 'Active'}</span>
                  </p>
                </div>
              </div>
              <button 
                type="button"
                aria-label={`Remove ${user.name}`}
                onClick={() => handleDelete(user.id, user.name)} 
                className="p-2 text-ink/20 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/20 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }} 
              className="bg-white w-full max-w-md rounded-xl lg:rounded-2xl p-8 shadow-2xl border border-ink/10"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-ink">Authorize Member</h3>
                  <p className="text-[10px] font-semibold text-ink/40 tracking-wider mt-0.5">Assign Access Key & RBAC Role</p>
                </div>
                <button 
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setIsModalOpen(false)} 
                  className="text-ink/30 hover:text-ink transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-4">
                <input 
                  required 
                  name="name" 
                  autoComplete="off"
                  value={currentMember.name} 
                  onChange={handleChange} 
                  placeholder="Full Name" 
                  className="w-full bg-ink/5 rounded-xl p-4 font-semibold text-ink outline-none text-sm placeholder:text-ink/30 border border-transparent focus:border-ink/20" 
                />
                <input 
                  required 
                  name="email" 
                  type="email" 
                  autoComplete="off"
                  value={currentMember.email} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full bg-ink/5 rounded-xl p-4 font-semibold text-ink outline-none text-sm placeholder:text-ink/30 border border-transparent focus:border-ink/20" 
                />
                <div className="relative">
                  <input 
                    name="accessKey" 
                    maxLength={16} 
                    value={currentMember.accessKey} 
                    onChange={handleChange} 
                    placeholder="Access Key (Leave empty to auto-generate)" 
                    className="w-full bg-ink/5 rounded-xl p-4 font-semibold text-ink outline-none text-sm placeholder:text-ink/30 border border-transparent focus:border-ink/20" 
                  />
                </div>
                <select 
                  name="role" 
                  value={currentMember.role} 
                  onChange={handleChange} 
                  className="w-full bg-ink/5 rounded-xl p-4 font-semibold text-ink outline-none text-xs cursor-pointer border border-transparent focus:border-ink/20"
                >
                  <option value="Maintenance">Maintenance (Compartment Diagnostics Only)</option>
                  <option value="Operations">Operations (Parcels & Announcements)</option>
                  <option value="Super Admin">Super Admin (Full Terminal Access)</option>
                </select>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-ink text-white py-4 rounded-xl font-semibold tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-black disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Authorize Member"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}