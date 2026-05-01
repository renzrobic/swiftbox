import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';
import { Key, Smartphone, Hash, Loader2 } from 'lucide-react';

export default function AdminForm() {
  const [formData, setFormData] = useState({ lockerId: 'L01', phone: '', parcelId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
    const { lockerId, phone, parcelId } = formData;

    try {
      // 1. Update Real-time Database
      const lockerRef = ref(db, `lockers/${lockerId}`);
      await update(lockerRef, {
        status: 'OCCUPIED',
        recipient_phone: phone,
        parcel_id: parcelId,
        claim_pin: generatedPin,
        timestamp: Date.now()
      });

      // 2. Trigger SMS Notification
      await fetch('http://localhost:5000/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone, parcelId, pin: generatedPin, lockerId })
      });

      setFormData({ lockerId: 'L01', phone: '', parcelId: '' });
      alert(`AUTHORIZED: Node ${lockerId} Active.`);
    } catch (error) {
      console.error("Authorization Failed:", error);
      alert("CRITICAL ERROR: Sequence Interrupted.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-3xl border-2 border-royal-blue/30 bg-white p-10 shadow-2xl shadow-royal-blue/5">
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-royal-blue" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-blue/70">System Input</span>
        </div>
        <h2 className="text-4xl font-bold uppercase tracking-tighter text-royal-blue leading-none">
          Register <br /> Parcel.
        </h2>
      </div>

      <form onSubmit={handleRegister} className="space-y-10">
        {/* TARGET NODE */}
        <div className="group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">Target Node</label>
          <div className="relative border-b-2 border-royal-blue/30 transition-colors group-focus-within:border-royal-blue">
            <select 
              name="lockerId"
              value={formData.lockerId}
              onChange={handleChange}
              className="w-full cursor-pointer appearance-none bg-transparent py-4 font-bold uppercase tracking-tight text-royal-blue outline-none"
            >
              {['L01', 'L02', 'L03', 'L04'].map(id => (
                <option key={id} value={id}>Locker {id}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TRACKING IDENTIFIER */}
        <div className="group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">Tracking Identifier</label>
          <div className="flex items-center border-b-2 border-royal-blue/30 transition-colors group-focus-within:border-royal-blue">
            <Hash size={16} className="mr-3 text-royal-blue/70" />
            <input 
              required
              name="parcelId"
              placeholder="SBX-XXXX"
              value={formData.parcelId}
              onChange={handleChange}
              className="w-full bg-transparent py-4 font-bold uppercase tracking-tight text-royal-blue outline-none placeholder:text-royal-blue/70"
            />
          </div>
        </div>

        {/* RECIPIENT DATA */}
        <div className="group">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">Recipient Data (GSM)</label>
          <div className="flex items-center border-b-2 border-royal-blue/30 transition-colors group-focus-within:border-royal-blue">
            <Smartphone size={16} className="mr-3 text-royal-blue/70" />
            <input 
              required
              type="tel"
              name="phone"
              placeholder="09XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent py-4 font-bold tracking-tight text-royal-blue outline-none placeholder:text-royal-blue/70"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-royal-blue py-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-xl shadow-royal-blue/10 transition-all duration-300 hover:bg-black disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <><Key size={14} strokeWidth={3} /> Authorize Sequence</>
          )}
        </button>
      </form>

      <div className="mt-12 border-t-2 border-royal-blue/30 pt-8">
        <p className="text-[9px] font-medium uppercase tracking-wider text-royal-blue/70 leading-relaxed">
          Validation Required: Ensure target node is vacant before authorizing solenoid release.
        </p>
      </div>
    </div>
  );
}