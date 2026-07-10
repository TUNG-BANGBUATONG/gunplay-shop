import React, { useState } from 'react';
import { PlusCircle, Check, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface AddProductTabProps {
  onAddProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  onNavigateToTab: (tab: 'Products') => void;
}

export const AddProductTab: React.FC<AddProductTabProps> = ({ onAddProduct, onNavigateToTab }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState<'HG' | 'RG' | 'MG' | 'PG' | 'Tools' | 'Apparel'>('HG');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('2026');
  
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customImage, setCustomImage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const imagePresets = [
    {
      label: 'HG Aerial Box',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
    },
    {
      label: 'Gundam Mech',
      url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=400',
    },
    {
      label: 'White T-Shirt',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400',
    },
    {
      label: 'Black T-Shirt',
      url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400',
    },
    {
      label: 'Hobby Nipper',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
    },
    {
      label: 'Abstract Neon',
      url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=400',
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter a product name');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg('Please enter a valid price');
      return;
    }

    const imageToUse = selectedPresetIndex === -1 ? (customImage.trim() || imagePresets[0].url) : imagePresets[selectedPresetIndex].url;

    onAddProduct({
      name: name.trim(),
      price: priceNum,
      grade,
      status,
      image: imageToUse,
      description: description.trim() || 'No description provided.',
      releaseYear: parseInt(releaseYear) || 2026,
    });

    setName('');
    setPrice('');
    setGrade('HG');
    setStatus('Active');
    setDescription('');
    setCustomImage('');
    setSelectedPresetIndex(0);
    
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onNavigateToTab('Products');
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-zinc-50/50 scrollbar-none">
      <h2 className="text-xs font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Add Product</h2>

      {successMsg && (
        <div className="mb-4 bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-700 text-[11px] animate-fadeIn">
          <Check size={14} />
          <span>Product saved. Redirecting...</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-600 text-[11px] animate-shake">
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 pb-8">
        {/* Name input */}
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
            PRODUCT NAME
          </label>
          <input
            id="new-product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. RG GN-001 Gundam Exia"
            className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
          />
        </div>

        {/* Price & Release Year */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              PRICE (฿)
            </label>
            <input
              id="new-product-price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 1450"
              className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              RELEASE YEAR
            </label>
            <input
              id="new-product-year"
              type="number"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              placeholder="2026"
              className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Category (Grade) & Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              GRADE CLASS
            </label>
            <select
              id="new-product-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as any)}
              className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 outline-hidden transition-all appearance-none cursor-pointer"
            >
              <option value="HG">HG (High Grade)</option>
              <option value="RG">RG (Real Grade)</option>
              <option value="MG">MG (Master Grade)</option>
              <option value="PG">PG (Perfect Grade)</option>
              <option value="Tools">Tools / Assembly</option>
              <option value="Apparel">Apparel / Merch</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              STATUS
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="status-select-active"
                onClick={() => setStatus('Active')}
                className={`py-2 text-[10px] font-medium rounded-lg border transition-all cursor-pointer ${
                  status === 'Active'
                    ? 'bg-white border-emerald-200 text-emerald-700 shadow-xs'
                    : 'bg-zinc-50 border-zinc-100 text-zinc-400 hover:bg-zinc-100/50'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                id="status-select-inactive"
                onClick={() => setStatus('Inactive')}
                className={`py-2 text-[10px] font-medium rounded-lg border transition-all cursor-pointer ${
                  status === 'Inactive'
                    ? 'bg-white border-red-200 text-red-600 shadow-xs'
                    : 'bg-zinc-50 border-zinc-100 text-zinc-400 hover:bg-zinc-100/50'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        {/* Image Presets Selector */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
            PRODUCT IMAGE PRESET
          </label>
          <div className="grid grid-cols-3 gap-2">
            {imagePresets.map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedPresetIndex(index);
                  setCustomImage('');
                }}
                className={`p-1 bg-white border rounded-xl overflow-hidden text-left relative group transition-all cursor-pointer ${
                  selectedPresetIndex === index
                    ? 'border-zinc-950 shadow-xs'
                    : 'border-zinc-100 hover:border-zinc-200'
                }`}
              >
                <div className="h-12 bg-zinc-50 rounded-lg overflow-hidden">
                  <img
                    src={preset.url}
                    alt={preset.label}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[8px] text-zinc-500 mt-1.5 truncate text-center font-medium">
                  {preset.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Image URL Option */}
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
            OR CUSTOM IMAGE URL
          </label>
          <input
            type="url"
            value={customImage}
            onChange={(e) => {
              setCustomImage(e.target.value);
              setSelectedPresetIndex(-1);
            }}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-hidden transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
            DESCRIPTION
          </label>
          <textarea
            id="new-product-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description..."
            rows={2}
            className="w-full bg-zinc-50 border border-zinc-150 focus:border-zinc-300 focus:bg-white rounded-lg px-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 outline-hidden transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          id="submit-product-btn"
          className="w-full bg-zinc-950 hover:bg-zinc-800 active:scale-[0.98] text-white font-medium text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <PlusCircle size={14} />
          <span>Add Product</span>
        </button>
      </form>
    </div>
  );
};
