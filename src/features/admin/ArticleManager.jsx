import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Trash2, ImageIcon } from 'lucide-react';
import { db } from "../../config/firebase"; // Updated Path
import { ref, push, set, onValue, remove } from 'firebase/database';

const INITIAL_ARTICLE_STATE = { 
  title: '', 
  category: 'Company', 
  content: '', 
  image: '', 
  status: 'Draft' 
};

const CATEGORIES = ['Company', 'Product', 'Engineering', 'Operations'];

const ArticleRow = memo(({ art, onDelete }) => (
  <div className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 transition-all hover:shadow-sm lg:rounded-2xl">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        {art.image && (
          <img 
            src={art.image} 
            className="h-full w-full object-cover" 
            alt={`Thumbnail for ${art.title}`} 
            loading="lazy"
          />
        )}
      </div>
      <div>
        <h4 className="line-clamp-1 text-sm font-bold uppercase text-slate-800">{art.title}</h4>
        <p className="text-[9px] font-black uppercase text-slate-300">
          {art.category} • {art.date} • <span className={art.status === 'Live' ? 'text-green-500' : 'text-amber-500'}>{art.status}</span>
        </p>
      </div>
    </div>
    <button 
      type="button"
      aria-label={`Delete ${art.title}`}
      onClick={() => onDelete(art.id)} 
      className="p-2 text-slate-200 transition-colors hover:text-red-500"
    >
      <Trash2 size={16} />
    </button>
  </div>
));

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(INITIAL_ARTICLE_STATE);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const articlesRef = ref(db, 'articles');
    return onValue(articlesRef, (snapshot) => {
      const data = snapshot.val();
      setArticles(data ? Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse() : []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentArticle(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Hard limit set to 1MB to prevent Firebase Realtime DB crash.
      // TODO for future: Move this to Firebase Storage.
      if (file.size > 1048487) {
        alert("File too large. Please keep images under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentArticle(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = currentArticle.id || push(ref(db, 'articles')).key;
      const articleData = {
        ...currentArticle,
        id,
        date: currentArticle.date || new Date().toLocaleDateString('en-US', { 
          month: 'short', day: 'numeric', year: 'numeric' 
        }),
        views: currentArticle.views || 0
      };
      await set(ref(db, `articles/${id}`), articleData);
      setIsModalOpen(false);
      setCurrentArticle(INITIAL_ARTICLE_STATE);
    } catch (err) {
      console.error("Sync Failed:", err);
      alert("Sync Failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      remove(ref(db, `articles/${id}`));
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold uppercase text-royal-blue">Newsroom</h2>
        <button 
          type="button"
          onClick={() => { setCurrentArticle(INITIAL_ARTICLE_STATE); setIsModalOpen(true); }} 
          className="rounded-xl bg-royal-blue px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-black active:scale-95 lg:rounded-2xl"
        >
          New Entry
        </button>
      </div>

      <div className="space-y-2" role="list">
        {articles.map((art) => (
          <ArticleRow key={art.id} art={art} onDelete={handleDelete} />
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-royal-blue/20 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl lg:rounded-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase text-royal-blue">Draft Post</h3>
                <button 
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setIsModalOpen(false)} 
                  className="text-slate-300 transition-colors hover:text-royal-blue"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-100 bg-slate-50 p-6">
                  {currentArticle.image ? (
                    <img src={currentArticle.image} className="h-32 rounded-lg shadow-sm" alt="Preview" />
                  ) : (
                    <ImageIcon className="text-slate-200" size={48} aria-hidden="true" />
                  )}
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()} 
                    className="rounded-lg bg-white px-4 py-2 text-[10px] font-black uppercase text-royal-blue shadow-sm transition-all hover:bg-royal-blue hover:text-white"
                  >
                    Upload Image
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                    aria-label="Upload article cover image"
                  />
                </div>

                <input 
                  required 
                  name="title" 
                  value={currentArticle.title} 
                  onChange={handleChange} 
                  className="w-full rounded-xl bg-slate-50 p-4 font-bold text-royal-blue outline-none placeholder:text-royal-blue/30" 
                  placeholder="ARTICLE TITLE" 
                />

                <div className="grid grid-cols-2 gap-4">
                  <select 
                    name="category" 
                    aria-label="Category"
                    value={currentArticle.category} 
                    onChange={handleChange} 
                    className="cursor-pointer rounded-xl bg-slate-50 p-4 text-xs font-bold uppercase text-royal-blue outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  
                  <select 
                    name="status" 
                    aria-label="Publishing Status"
                    value={currentArticle.status} 
                    onChange={handleChange} 
                    className="cursor-pointer rounded-xl bg-slate-50 p-4 text-xs font-bold uppercase text-royal-blue outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Live">Live</option>
                  </select>
                </div>

                <textarea 
                  required 
                  name="content" 
                  rows={6} 
                  value={currentArticle.content} 
                  onChange={handleChange} 
                  className="w-full resize-none rounded-xl bg-slate-50 p-4 font-bold text-royal-blue outline-none placeholder:text-royal-blue/30" 
                  placeholder="WRITE YOUR CONTENT HERE..." 
                />

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-royal-blue py-4 font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} aria-hidden="true" /> Sync Cloud</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}