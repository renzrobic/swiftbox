import React from 'react';
import { TrendingUp, DollarSign, CreditCard, ArrowUpRight } from 'lucide-react';

// Hoisted to prevent re-allocation on every render
const FINANCIAL_METRICS = [
  { id: 'monthly-rev', label: 'Monthly Revenue', val: '₱42,150', trend: '+12%', icon: DollarSign },
  { id: 'avg-trans', label: 'Avg Transaction', val: '₱85.00', trend: '+2%', icon: CreditCard },
  { id: 'growth-rate', label: 'Growth Rate', val: '18.4%', trend: '+5%', icon: TrendingUp },
];

const PROJECTION_DATA = [40, 70, 45, 90, 65, 80, 100];

export default function AdminFinance() {
  return (
    <section className="space-y-8 text-left w-full max-w-full overflow-hidden" aria-labelledby="finance-heading">
      <div>
        <h2 id="finance-heading" className="text-2xl font-bold text-ink uppercase">
          Financials
        </h2>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {FINANCIAL_METRICS.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-slate-100 p-8 rounded-xl lg:rounded-2xl shadow-sm relative overflow-hidden group"
          >
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">
              {item.label}
            </p>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-bold text-ink tracking-tighter leading-none">
                {item.val}
              </h3>
              <span 
                className="text-[10px] font-black text-green-500 mb-1 flex items-center"
                aria-label={`Increase of ${item.trend.replace('+', '')}`}
              >
                <ArrowUpRight size={14} aria-hidden="true" /> {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* REVENUE PROJECTION CHART */}
      <div className="bg-ink rounded-xl lg:rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-10 text-center">
          Revenue Projection
        </h4>
        
        <div 
          role="img" 
          aria-label="Weekly revenue projection bar chart"
          className="flex items-end justify-between h-40 gap-2 md:gap-4 px-2"
        >
          {PROJECTION_DATA.map((h, i) => (
            <div key={`bar-${i}`} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
              <div 
                style={{ height: `${h}%` }} 
                aria-label={`Day ${i + 1}: ₱${h * 100}`}
                className="w-full max-w-[40px] bg-white/20 rounded-t-lg hover:bg-white transition-all cursor-pointer relative group"
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-ink px-2 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none">
                  ₱{h * 100}
                </div>
              </div>
              <span className="text-[9px] font-black opacity-40 uppercase">D{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}