import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ref, set } from 'firebase/database';
import { db } from '../../config/firebase';

const INITIAL_FORM = { 
  lockerId: 'L01', 
  phone: '', 
  parcelId: '', 
  sender: '' 
};

export default function AdminForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'parcelId' ? value.toUpperCase() : value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const id = formData.parcelId.trim();
    
    if (!id || !formData.phone) {
      return alert("Fields Required");
    }
    
    setIsSubmitting(true);

    try {
      // 🚀 DIRECT DB WRITE: Bypass backend proxy, leverages Firebase Rules
      await set(ref(db, `parcels/${id}`), {
        parcel_id: id,
        sender: formData.sender || "Authorized Merchant",
        recipient_phone: formData.phone,
        dimensions: "Standard",
        status: "SHIPPING",
        location: "Manila Gateway Hub",
        coords: [14.5995, 120.9842],
        lockerId: "TBA",
        timestamp: Date.now(),
        history: [{
          status: 'Processed',
          location: "Manila Gateway Hub",
          coords: [14.5995, 120.9842],
          time: Date.now(),
          current: true
        }]
      });

      alert(`AUTHORIZED: ${id} registered successfully.`);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Failed to register parcel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-ink/10 bg-white p-6 md:p-8 text-left shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-ink">
        Register Parcel
      </h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="relative">
          <select 
            name="lockerId" 
            aria-label="Select Locker"
            value={formData.lockerId} 
            onChange={handleChange} 
            className="w-full cursor-pointer appearance-none rounded-lg bg-ink/5 p-4 text-xs font-semibold text-ink outline-none border border-transparent focus:border-ink/10"
          >
            {['L01', 'L02', 'L03', 'L04'].map(id => (
              <option key={id} value={id}>Locker {id}</option>
            ))}
          </select>
        </div>

        <input 
          required 
          name="parcelId" 
          aria-label="Parcel ID"
          autoComplete="off"
          spellCheck="false"
          value={formData.parcelId} 
          onChange={handleChange} 
          className="w-full rounded-lg bg-ink/5 p-4 text-sm font-semibold text-ink outline-none placeholder:text-ink/30 border border-transparent focus:border-ink/10" 
          placeholder="Parcel ID" 
        />

        <input 
          name="sender" 
          aria-label="Merchant or Sender Name"
          value={formData.sender} 
          onChange={handleChange} 
          className="w-full rounded-lg bg-ink/5 p-4 text-sm font-semibold text-ink outline-none placeholder:text-ink/30 border border-transparent focus:border-ink/10" 
          placeholder="Merchant / Sender" 
        />

        <input 
          required 
          name="phone" 
          type="tel"
          aria-label="Recipient Phone Number"
          autoComplete="off"
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full rounded-lg bg-ink/5 p-4 text-sm font-semibold text-ink outline-none placeholder:text-ink/30 border border-transparent focus:border-ink/10" 
          placeholder="Recipient Phone" 
        />

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="mt-6 flex w-full items-center justify-center rounded-lg bg-ink py-4 text-xs font-semibold tracking-wider text-white transition-all hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Authorize Sequence"
          )}
        </button>
      </form>
    </div>
  );
}