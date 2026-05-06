import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader2, Trash2, ImageIcon, Pencil, ChevronLeft } from 'lucide-react';
import { db } from "../../config/firebase"; // Updated Path
import { ref, push, set, onValue, remove } from 'firebase/database';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const INITIAL_ARTICLE_STATE = { 
  title: '', 
  category: 'Company', 
  content: '', 
  image: '', 
  status: 'Live' 
};

const CATEGORIES = ['Company', 'Product', 'Engineering', 'Operations'];

const ArticleRow = memo(({ art, onEdit, onDelete }) => (
  <div className="group flex items-center justify-between rounded-xl border border-ink/10 bg-white p-4 transition-all hover:shadow-sm lg:rounded-2xl">
    <div className="flex items-center gap-4">
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-ink/5">
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
        <h4 className="line-clamp-1 text-sm font-bold uppercase text-ink">{art.title}</h4>
        <p className="text-[9px] font-black uppercase text-ink/30">
          {art.category} • {art.date} • <span className={art.status === 'Live' ? 'text-green-500' : 'text-amber-500'}>{art.status}</span>
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button 
        type="button"
        aria-label={`Edit ${art.title}`}
        onClick={() => onEdit(art)} 
        className="p-2 text-ink/20 transition-colors hover:text-ink"
      >
        <Pencil size={16} />
      </button>
      <button 
        type="button"
        aria-label={`Delete ${art.title}`}
        onClick={() => onDelete(art.id)} 
        className="p-2 text-ink/20 transition-colors hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
));

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ]
};

export default function ArticleManager() {
  const [articles, setArticles] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
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

  const handleContentChange = (value) => {
    setCurrentArticle(prev => ({ ...prev, content: value }));
  };

  const handleEdit = (art) => {
    setCurrentArticle(art);
    setIsEditorOpen(true);
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
      setIsEditorOpen(false);
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

  if (isEditorOpen) {
    return (
      <div className="space-y-6 text-left">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink/40 transition-colors hover:text-ink"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <h2 className="text-2xl font-bold uppercase text-ink">
            {currentArticle.id ? 'Edit Article' : 'New Article'}
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-ink/10">
          <div className="flex flex-col items-start gap-4">
            {currentArticle.image ? (
              <img src={currentArticle.image} className="h-48 rounded-xl object-cover shadow-sm" alt="Preview" />
            ) : (
              <div className="flex h-48 w-full max-w-sm items-center justify-center rounded-xl border-2 border-dashed border-ink/10 bg-ink/5">
                <ImageIcon className="text-ink/30" size={48} aria-hidden="true" />
              </div>
            )}
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              className="rounded-xl bg-ink/5 px-6 py-3 text-[10px] font-black uppercase text-ink transition-all hover:bg-ink hover:text-white"
            >
              {currentArticle.image ? 'Change Cover Image' : 'Upload Cover Image'}
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
            className="w-full rounded-xl bg-ink/5 p-4 text-xl font-bold text-ink outline-none placeholder:text-ink/30 border border-transparent focus:border-ink/20" 
            placeholder="ARTICLE TITLE" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select 
              name="category" 
              aria-label="Category"
              value={currentArticle.category} 
              onChange={handleChange} 
              className="cursor-pointer rounded-xl bg-ink/5 p-4 text-xs font-bold uppercase text-ink outline-none border border-transparent focus:border-ink/20"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select 
              name="status" 
              aria-label="Publishing Status"
              value={currentArticle.status} 
              onChange={handleChange} 
              className="cursor-pointer rounded-xl bg-ink/5 p-4 text-xs font-bold uppercase text-ink outline-none border border-transparent focus:border-ink/20"
            >
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className="rounded-xl overflow-hidden border border-ink/10 bg-white">
            <ReactQuill 
              theme="snow"
              value={currentArticle.content}
              onChange={handleContentChange}
              modules={QUILL_MODULES}
              className="bg-white min-h-[300px]"
              placeholder="Write your article content here..."
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="mt-4 flex w-auto items-center justify-center gap-2 rounded-xl bg-ink px-10 py-4 font-black uppercase tracking-widest text-white shadow-lg transition-all hover:bg-black disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={18} aria-hidden="true" /> Save Article</>}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold uppercase text-ink">Newsroom</h2>
        <button 
          type="button"
          onClick={() => { setCurrentArticle(INITIAL_ARTICLE_STATE); setIsEditorOpen(true); }} 
          className="rounded-xl bg-ink px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-md transition-all hover:bg-black active:scale-95 lg:rounded-2xl"
        >
          New Entry
        </button>
      </div>

      <div className="space-y-2" role="list">
        {articles.length === 0 ? (
          <div className="p-8 text-center text-sm font-medium text-ink/30">No articles found. Create one above.</div>
        ) : (
          articles.map((art) => (
            <ArticleRow key={art.id} art={art} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}