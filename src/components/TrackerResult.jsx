import React from 'react';
import { motion } from 'framer-motion';
import { Package, AlertCircle } from 'lucide-react';

export default function TrackerResult({ parcelData, error }) {
  if (error) {
    return (
      <motion.div 
        key="error"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="inline-flex items-center gap-4 rounded-2xl border-2 border-royal-blue bg-royal-blue px-8 py-4 text-white shadow-xl"
      >
        <AlertCircle size={20} className="text-white/70" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Invalid Tracking Sequence</span>
      </motion.div>
    );
  }

  if (!parcelData) return null;

  return (
    <motion.div 
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
    >
      {/* Status Card */}
      <div className="rounded-3xl border-2 border-royal-blue/20 bg-royal-blue/5 p-8 md:col-span-2 md:p-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-royal-blue">Live System Update</span>
        </div>
        <h3 className="mb-12 text-3xl font-semibold uppercase tracking-tighter text-royal-blue leading-tight md:text-5xl">
          Parcel is ready for <br className="hidden md:block" /> terminal pickup.
        </h3>
        <div className="grid grid-cols-1 gap-8 border-t-2 border-royal-blue/10 pt-10 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">Locker Assignment</p>
            <p className="text-2xl font-bold uppercase text-royal-blue">Node {parcelData.lockerId}</p>
          </div>
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">Authorized On</p>
            <p className="text-2xl font-bold text-royal-blue">
              {parcelData.timestamp ? new Date(parcelData.timestamp).toLocaleDateString() : "ACTIVE"}
            </p>
          </div>
        </div>
      </div>

      {/* Instruction Card */}
      <div className="flex flex-col justify-between rounded-3xl border-2 border-royal-blue/20 bg-white p-8 shadow-sm md:p-10">
        <div>
          <AlertCircle className="mb-6 text-royal-blue" size={32} />
          <h4 className="mb-4 text-xl font-bold uppercase tracking-tight text-royal-blue">Security Protocol</h4>
          <p className="text-sm font-semibold leading-relaxed text-royal-blue/70">
            Proceed to the SwiftBox Hub terminal. Enter your 4-digit PIN to authorize the solenoid lock release at Node {parcelData.lockerId}.
          </p>
        </div>
        <div className="mt-8 border-t-2 border-royal-blue/5 pt-8">
           <div className="flex items-center gap-3">
             <Package className="text-royal-blue/70" size={18} />
             <span className="text-[10px] font-bold uppercase tracking-widest text-royal-blue/70">ID: {parcelData.parcel_id}</span>
           </div>
        </div>
      </div>
    </motion.div>
  );
}