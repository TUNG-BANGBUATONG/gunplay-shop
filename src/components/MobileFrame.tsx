import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto my-3 select-none">
      {/* 📱 Premium Smartphone Simulator (Graphite Black Outer Shell) */}
      <div className="relative mx-auto w-[360px] h-[720px] bg-zinc-900 rounded-[48px] p-2.5 shadow-2xl border-4 border-zinc-800 ring-1 ring-black/5 flex flex-col transition-all duration-300">
        
        {/* Physical Ear Speaker Grill */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-zinc-800 rounded-full z-30"></div>

        {/* Dynamic Island / Notch Camera Simulator */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-start pl-2">
          <div className="w-1 h-1 rounded-full bg-indigo-950 border border-indigo-900/20"></div>
        </div>

        {/* Left Side Volume Rockers */}
        <div className="absolute top-24 -left-[4px] w-[2px] h-10 bg-zinc-700 rounded-l-sm"></div>
        <div className="absolute top-36 -left-[4px] w-[2px] h-10 bg-zinc-700 rounded-l-sm"></div>

        {/* Right Side Power Button */}
        <div className="absolute top-28 -right-[4px] w-[2px] h-14 bg-zinc-700 rounded-r-sm"></div>

        {/* 🎬 Inner Screen Content - Pristine White Viewport */}
        <div className="flex-1 flex flex-col bg-white rounded-[38px] overflow-hidden border border-zinc-100 relative z-10 select-text">
          {children}
        </div>

        {/* 🏠 Bottom Navigation Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-800 rounded-full z-30"></div>
      </div>
    </div>
  );
};
