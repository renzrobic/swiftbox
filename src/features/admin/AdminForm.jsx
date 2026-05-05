import React, { useState } from 'react';
import { db } from '../../config/firebase'; // Ensure correct path
import { ref, set } from 'firebase/database'; 
import { Loader2 } from 'lucide-react';

// Use env variable to prevent breaking when deployed!
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      await set(ref(db, `parcels/${id}`), {
        parcel_id: id,
        sender: formData.sender || "Authorized Merchant",
        recipient_phone: formData.phone,
        status: 'IN_TERMINAL',
        location: 'Pagadian Capitol College',
        lockerId: formData.lockerId,
        claim_pin: generatedPin,
        timestamp: Date.now()
      });

      // API FIX: Use dynamic base URL
      await fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: formData.phone, 
          parcelId: id, 
          pin: generatedPin, 
          lockerId: formData.lockerId 
        })
      }).catch(() => console.warn("SMS Gateway Offline"));

      alert(`AUTHORIZED: ${id} is now in ${formData.lockerId}`);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Firebase Sync Error:", error);
      alert("Database Sync Failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-left shadow-sm lg:rounded-2xl">
      <h2 className="mb-8 text-xl font-bold uppercase tracking-tight text-royal-blue">
        Register
      </h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <select 
          name="lockerId" 
          aria-label="Select Locker"
          value={formData.lockerId} 
          onChange={handleChange} 
          className="w-full cursor-pointer appearance-none rounded-xl bg-slate-50 p-4 text-xs font-bold uppercase text-royal-blue outline-none"
        >
          {['L01', 'L02', 'L03', 'L04'].map(id => (
            <option key={id} value={id}>Locker {id}</option>
          ))}
        </select>

        <input 
          required 
          name="parcelId" 
          aria-label="Parcel ID"
          autoComplete="off"
          spellCheck="false"
          value={formData.parcelId} 
          onChange={handleChange} 
          className="w-full rounded-xl bg-slate-50 p-4 text-sm font-bold text-royal-blue outline-none placeholder:text-royal-blue/30" 
          placeholder="PARCEL ID" 
        />

        <input 
          name="sender" 
          aria-label="Merchant or Sender Name"
          value={formData.sender} 
          onChange={handleChange} 
          className="w-full rounded-xl bg-slate-50 p-4 text-sm font-bold text-royal-blue outline-none placeholder:text-royal-blue/30" 
          placeholder="MERCHANT" 
        />

        <input 
          required 
          name="phone" 
          type="tel"
          aria-label="Recipient Phone Number"
          autoComplete="off"
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full rounded-xl bg-slate-50 p-4 text-sm font-bold text-royal-blue outline-none placeholder:text-royal-blue/30" 
          placeholder="PHONE" 
        />

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-royal-blue py-4 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
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