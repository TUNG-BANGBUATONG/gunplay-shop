import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'Home' as TabType, emoji: '🏠', label: 'Home' },
    { id: 'Add' as TabType, emoji: '➕', label: 'Add' },
    { id: 'Products' as TabType, emoji: '📦', label: 'Products' },
    { id: 'Categories' as TabType, emoji: '🗂️', label: 'Categories' },
  ];

  return (
    <nav className="bg-white border-t border-zinc-100 pb-safe select-none relative z-20 shadow-lg">
      <div className="flex h-15 justify-around items-center px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id.toLowerCase()}`}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center flex-1 py-1.5 px-2 transition-all active:scale-95 cursor-pointer"
            >
              {/* Emoji Icon */}
              <span
                className={`text-lg transition-all duration-200 ${
                  isActive ? 'scale-125 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]' : 'opacity-60 saturate-50 hover:opacity-100'
                }`}
              >
                {tab.emoji}
              </span>

              {/* Label */}
              <span
                className={`text-[9px] font-medium tracking-wide mt-1 transition-colors duration-200 ${
                  isActive ? 'text-zinc-950 font-bold' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
