import React from 'react';
import { Product } from '../types';

interface CategoriesTabProps {
  products: Product[];
  onSelectCategory: (category: string) => void;
  onNavigateToTab: (tab: 'Products') => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({
  products,
  onSelectCategory,
  onNavigateToTab,
}) => {
  const categoriesList = [
    {
      code: 'HG',
      name: 'High Grade (1:144)',
      description: 'The most popular, beginner-friendly series with a massive variety of mobile suits.',
      badgeColor: 'bg-blue-600',
    },
    {
      code: 'RG',
      name: 'Real Grade (1:144)',
      description: 'Exciting intermediate line that condenses Master Grade mechanical frames into standard sizing.',
      badgeColor: 'bg-indigo-600',
    },
    {
      code: 'MG',
      name: 'Master Grade (1:100)',
      description: 'Exceptional details, internal skeletal mechanics, and incredible mechanical gimmickry.',
      badgeColor: 'bg-purple-600',
    },
    {
      code: 'PG',
      name: 'Perfect Grade (1:60)',
      description: 'The absolute royal class. Built with maximum articulation, metal parts, LED wiring, and ultimate presence.',
      badgeColor: 'bg-red-600',
    },
    {
      code: 'Tools',
      name: 'Tools & Accessories',
      description: 'Single-blade side nippers, hobby knives, pane-liners, sandpapers, and panel-markers.',
      badgeColor: 'bg-amber-600',
    },
    {
      code: 'Apparel',
      name: 'Apparel & Merchandise',
      description: 'Official designer t-shirts, caps, builder jackets, and premium desk mats for Gunpla enthusiasts.',
      badgeColor: 'bg-teal-600',
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-zinc-50/50 scrollbar-none space-y-4">
      <h2 className="text-xs font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Gunpla Categories</h2>

      <div className="space-y-3">
        {categoriesList.map((cat) => {
          const categoryProducts = products.filter((p) => p.grade === cat.code);
          const activeCount = categoryProducts.filter((p) => p.status === 'Active').length;

          return (
            <div
              key={cat.code}
              className="bg-white border border-zinc-100 rounded-xl p-3.5 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-semibold text-zinc-900 tracking-wide">{cat.name}</h3>
                  <span className="text-[9px] font-mono text-zinc-400 font-medium">CLASS: {cat.code}</span>
                </div>
                
                <span className="text-[9px] font-mono font-medium text-zinc-600 bg-zinc-50 border border-zinc-150 px-2 py-0.5 rounded">
                  {categoryProducts.length} Items
                </span>
              </div>

              <p className="text-[10px] text-zinc-500 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex justify-between items-center pt-2.5 border-t border-zinc-100">
                <div className="text-[9px] text-zinc-400 font-medium">
                  {activeCount} active in catalog
                </div>

                <button
                  id={`view-category-btn-${cat.code.toLowerCase()}`}
                  onClick={() => {
                    onSelectCategory(cat.code);
                    onNavigateToTab('Products');
                  }}
                  className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-[10px] px-3 py-1 rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  Explore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
