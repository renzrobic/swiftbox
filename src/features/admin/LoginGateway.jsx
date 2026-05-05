import React from 'react';
import { ShieldCheck, Command, Loader2 } from 'lucide-react';

export default function LoginGateway({ passInput, setPassInput, onAuthorize, isLoading }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-royal-blue p-4 pt-24 md:p-6 md:pt-32">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] lg:rounded-2xl md:p-12">
        
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-royal-blue/5 text-royal-blue ring-1 ring-royal-blue/10 lg:rounded-2xl">
            <ShieldCheck aria-hidden="true" size={32} className="md:h-10 md:w-10" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-royal-blue md:text-4xl">
            Swiftbox OS
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-royal-blue/40">
            Terminal Authentication
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2 text-left">
            <label htmlFor="access-key" className="ml-1 text-[10px] font-bold uppercase tracking-[0.25em] text-royal-blue/60">
              Access Key
            </label>
            <input 
              id="access-key"
              type="password"
              placeholder="••••••••"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onAuthorize()}
              className="w-full rounded-xl border-2 border-royal-blue/10 bg-royal-blue/[0.03] p-4 text-center text-xl font-bold tracking-[0.5em] text-royal-blue outline-none transition-all placeholder:tracking-normal placeholder:opacity-30 focus:border-royal-blue focus:bg-white lg:rounded-2xl"
            />
          </div>
          
          <button 
            type="button"
            onClick={onAuthorize}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-royal-blue py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-black active:scale-[0.98] disabled:translate-y-0 disabled:opacity-50 lg:rounded-2xl"
          >
            {isLoading ? (
              <Loader2 aria-hidden="true" className="animate-spin" />
            ) : (
              <><Command aria-hidden="true" size={18} className="opacity-70" /> Initialize System</>
            )}
          </button>
        </div>

        <p className="mt-10 text-center text-[9px] font-bold uppercase leading-relaxed tracking-widest text-royal-blue/30">
          Authorized personnel only. <br /> 
          Unauthorized access attempts are logged.
        </p>
      </div>
    </div>
  );
}