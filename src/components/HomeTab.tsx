import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product, User } from '../types';

interface HomeTabProps {
  products: Product[];
  currentUser: User;
  onSwitchUser: () => void;
  onLogout: () => void;
  onNavigateToTab: (tab: 'Products' | 'Categories' | 'Add') => void;
  onSelectCategory: (category: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  products,
  currentUser,
  onSwitchUser,
  onLogout,
  onNavigateToTab,
  onSelectCategory,
}) => {
  const activeProducts = products.filter((p) => p.status === 'Active');
  const featuredKits = activeProducts.slice(0, 3);

  const announcements = [
    {
      id: 'a1',
      title: 'RG Akatsuki Gundam Shiranui Pack Pre-order',
      date: 'July 2026',
      badge: 'PRE-ORDER',
      color: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    },
    {
      id: 'a2',
      title: 'GBWC World Championship Qualifiers Open!',
      date: 'Aug 2026',
      badge: 'EVENT',
      color: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    },
    {
      id: 'a3',
      title: 'New Gunpla Tools Shipment Arriving',
      date: 'Direct Japan',
      badge: 'RESTOCK',
      color: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    }
  ];

  const quickCategories = [
    { code: 'HG', label: 'High Grade', desc: '1:144 scale' },
    { code: 'RG', label: 'Real Grade', desc: '1:144 hyper-detailed' },
    { code: 'MG', label: 'Master Grade', desc: '1:100 scale' },
    { code: 'PG', label: 'Perfect Grade', desc: '1:60 scale supreme' },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-zinc-50/50 scrollbar-none space-y-6">
      
      {/* 👤 Account / Welcome Card */}
      <div className="bg-white p-3 rounded-xl border border-zinc-100 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.displayName}
            className="w-8 h-8 rounded-full border border-zinc-200 bg-zinc-50"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="text-[8px] text-zinc-400 uppercase font-mono tracking-wider">Session</div>
            <h4 className="text-[11px] font-semibold text-zinc-900 leading-tight">{currentUser.displayName}</h4>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchUser}
            className="text-[9px] text-zinc-600 hover:text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1 rounded-md transition-all active:scale-95 cursor-pointer font-medium"
          >
            Switch Account
          </button>
          <button
            onClick={onLogout}
            className="text-[9px] text-red-650 hover:text-red-700 bg-red-50/50 hover:bg-red-55 border border-red-100 px-2 py-1 rounded-md transition-all active:scale-95 cursor-pointer font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* 🎪 Horizontal ScrollView Promo Banner */}
      <div>
        <div className="text-[9px] text-zinc-400 font-mono mb-2 uppercase tracking-wider font-semibold">Spotlight</div>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="min-w-[85%] snap-start shrink-0 bg-white border border-zinc-150 rounded-xl p-3.5 flex flex-col justify-between h-24 relative overflow-hidden shadow-xs"
            >
              <div>
                <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full ${ann.color}`}>
                  {ann.badge}
                </span>
                <h3 className="text-xs font-semibold text-zinc-900 mt-2.5 leading-snug line-clamp-1">
                  {ann.title}
                </h3>
              </div>

              <div className="flex justify-between items-center text-[8px] text-zinc-400 font-mono">
                <span>Bangkok HQ</span>
                <span>{ann.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⚡ Quick Grades Section */}
      <div>
        <div className="text-[9px] text-zinc-400 font-mono mb-2 uppercase tracking-wider font-semibold">Browse by Grade</div>
        <div className="grid grid-cols-2 gap-2">
          {quickCategories.map((qc) => (
            <button
              key={qc.code}
              onClick={() => {
                onSelectCategory(qc.code);
                onNavigateToTab('Products');
              }}
              className="p-3 bg-white border border-zinc-100 text-left rounded-xl hover:border-zinc-300 transition-all duration-200 shadow-xs cursor-pointer group"
            >
              <div className="text-[11px] font-bold text-zinc-900 font-mono group-hover:text-zinc-600 transition-colors">{qc.code}</div>
              <div className="text-[10px] font-medium text-zinc-500 mt-0.5">{qc.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ⭐ Highly Rated Spotlights */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <div className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider font-semibold">Featured Kits</div>
          <button
            onClick={() => onNavigateToTab('Products')}
            className="text-[9px] text-zinc-800 hover:text-zinc-600 font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            <span>All Items</span>
            <ArrowRight size={10} />
          </button>
        </div>

        <div className="space-y-2">
          {featuredKits.map((kit) => (
            <div
              key={kit.id}
              onClick={() => {
                onSelectCategory(kit.grade);
                onNavigateToTab('Products');
              }}
              className="bg-white border border-zinc-100 hover:border-zinc-200 p-2 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-200 shadow-xs"
            >
              <img
                src={kit.image}
                alt={kit.name}
                className="w-10 h-10 rounded-lg object-cover bg-zinc-50 border border-zinc-100"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 px-1.5 py-0.2 rounded uppercase">
                  {kit.grade}
                </span>
                <h4 className="text-[10px] font-medium text-zinc-900 truncate mt-0.5">{kit.name}</h4>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-[10px] font-mono font-medium text-zinc-800">฿{kit.price.toLocaleString()}</span>
                  <span className="text-[9px] text-amber-500 font-medium">
                    ★ {kit.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
