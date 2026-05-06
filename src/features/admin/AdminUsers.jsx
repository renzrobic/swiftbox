import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Trash2, UserPlus } from 'lucide-react';
import { db } from "../../config/firebase";
import { ref, push, set, onValue, remove } from 'firebase/database';

const INITIAL_MEMBER_STATE = { name: '', role: 'Maintenance', email: '', accessKey: '' };

export default function AdminUsers() {
  const [team, setTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentMember, setCurrentMember] = useState(INITIAL_MEMBER_STATE);

  useEffect(() => {
    const teamRef = ref(db, 'team');
    return onValue(teamRef, (snapshot) => {
      const data = snapshot.val();
      setTeam(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []);
    });
  }, []);

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
      const id = push(ref(db, 'team')).key;
      const finalKey = currentMember.accessKey || Math.floor(1000 + Math.random() * 9000).toString();
      
      await set(ref(db, `team/${id}`), { 
        ...currentMember, 
        id, 
        accessKey: finalKey, 
        status: 'Offline' 
      });

      setIsModalOpen(false);
      setCurrentMember(INITIAL_MEMBER_STATE);
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Failed to authorize user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header section */}
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-ink uppercase">Team</h2>
        <button 
          type="button"
          onClick={() => setIsModalOpen(true)} 
          className="bg-ink text-white px-6 py-3 rounded-xl lg:rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-md transition-all hover:bg-black active:scale-95"
        >
          Invite Member
        </button>
      </header>

      {/* Team List */}
      <div className="space-y-2" role="list">
        {team.map((user) => (
          <div 
            key={user.id} 
            role="listitem"
            className="bg-white border border-ink/10 p-4 rounded-xl lg:rounded-2xl flex items-center justify-between transition-all hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div 
                aria-hidden="true"
                className="h-10 w-10 bg-ink rounded-lg flex items-center justify-center text-white font-black uppercase text-xs"
              >
                {user.name?.[0] || '?'}
              </div>
              <div>
                <p className="font-bold text-sm text-ink">{user.name}</p>
                <p className="text-[9px] font-black text-ink/30 uppercase tracking-wider">
                  {user.role} • <span className="text-ink/40">Key: {user.accessKey}</span>
                </p>
              </div>
            </div>
            <button 
              type="button"
              aria-label={`Remove ${user.name}`}
              onClick={() => remove(ref(db, `team/${user.id}`))} 
              className="p-2 text-ink/20 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
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
              className="bg-white w-full max-w-md rounded-xl lg:rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-ink uppercase">Authorize User</h3>
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
                  placeholder="FULL NAME" 
                  className="w-full bg-ink/5 rounded-xl p-4 font-bold text-ink outline-none text-sm placeholder:text-ink/30" 
                />
                <input 
                  required 
                  name="email" 
                  type="email" 
                  autoComplete="off"
                  value={currentMember.email} 
                  onChange={handleChange} 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-ink/5 rounded-xl p-4 font-bold text-ink outline-none text-sm placeholder:text-ink/30" 
                />
                <input 
                  name="accessKey" 
                  maxLength={8} 
                  value={currentMember.accessKey} 
                  onChange={handleChange} 
                  placeholder="ACCESS KEY (OPTIONAL)" 
                  className="w-full bg-ink/5 rounded-xl p-4 font-bold text-ink outline-none text-sm placeholder:text-ink/30" 
                />
                <select 
                  name="role" 
                  value={currentMember.role} 
                  onChange={handleChange} 
                  className="w-full bg-ink/5 rounded-xl p-4 font-bold text-ink outline-none text-xs uppercase cursor-pointer"
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Operations">Operations</option>
                  <option value="Super Admin">Super Admin</option>
                </select>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-ink text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-black disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Authorize User"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}