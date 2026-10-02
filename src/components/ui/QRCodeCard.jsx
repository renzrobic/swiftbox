import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Check, Copy } from 'lucide-react';

export default function QRCodeCard({ value, title = "Parcel QR Code", subtitle = "Scan at SwiftBox Kiosk", pin, size = 180 }) {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!value) return;
    QRCode.toDataURL(value, {
      width: size * 2, // 2x density for retina crispness
      margin: 1,
      color: {
        dark: '#0a0a0a',
        light: '#ffffff',
      },
    })
      .then(url => setQrUrl(url))
      .catch(err => console.error("QR Code generation error:", err));
  }, [value, size]);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!value) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-ink/10 shadow-sm text-center">
      <div className="flex items-center gap-2 mb-3">
        <QrCode size={16} className="text-ink/60" />
        <span className="text-[11px] font-semibold tracking-wider text-ink/70 uppercase">
          {title}
        </span>
      </div>

      <div className="relative p-3 bg-white rounded-xl border border-ink/10 shadow-inner my-2 flex items-center justify-center">
        {qrUrl ? (
          <img 
            src={qrUrl} 
            alt={`QR code for ${value}`} 
            style={{ width: size, height: size }}
            className="rounded-lg object-contain"
          />
        ) : (
          <div style={{ width: size, height: size }} className="flex items-center justify-center bg-ink/5 rounded-lg animate-pulse">
            <span className="text-xs text-ink/40">Generating QR...</span>
          </div>
        )}
      </div>

      <p className="text-[11px] text-ink/50 mt-2 mb-3">
        {subtitle}
      </p>

      {/* Tracking ID Badge with Click-to-Copy */}
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 bg-ink/5 hover:bg-ink/10 active:scale-95 transition-all rounded-lg text-xs font-mono font-semibold text-ink border border-ink/10"
        title="Click to copy tracking ID"
      >
        <span>{value}</span>
        {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} className="text-ink/40" />}
      </button>

      {pin && (
        <div className="mt-4 w-full pt-3 border-t border-ink/10 flex items-center justify-between px-2">
          <span className="text-[10px] font-semibold tracking-wider text-ink/60 uppercase">Claim PIN:</span>
          <span className="text-base font-bold font-mono text-ink tracking-widest bg-ink/5 px-2.5 py-0.5 rounded-md border border-ink/10">
            {pin}
          </span>
        </div>
      )}
    </div>
  );
}
