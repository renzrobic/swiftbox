import React, { useState } from 'react';
import PlatformNav from '../features/platform-app/PlatformNav';
import WorkspaceFeed from '../features/platform-app/WorkspaceFeed';
import CommandInput from '../features/platform-app/CommandInput';
import HistorySidebar from '../features/platform-app/HistorySidebar';

export default function PlatformApp() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-white/20">
      
      {/* MAIN CANVAS */}
      <div className="flex flex-1 flex-col relative">
        <PlatformNav />
        <WorkspaceFeed />
        <CommandInput prompt={prompt} setPrompt={setPrompt} />
      </div>

      {/* RIGHT SIDEBAR (History Pane) */}
      <HistorySidebar />

    </div>
  );
}
