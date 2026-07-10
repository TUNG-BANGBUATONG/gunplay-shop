import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus, ShoppingCart } from 'lucide-react';
import { StyleSheet, View, SafeAreaView, TextInput } from '../styles';

interface HeaderProps {
  searchText: string;
  setSearchText: (text: string) => void;
  selectedGrade: string;
  setSelectedGrade: (grade: string) => void;
  onAddClick: () => void;
  cartCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchText,
  setSearchText,
  selectedGrade,
  setSelectedGrade,
  onAddClick,
  cartCount,
  onCartClick,
}) => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const grades = ['All', 'HG', 'RG', 'MG', 'PG', 'Tools', 'Apparel'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 }}>
        {/* Brand Bar */}
        <View style={styles.brandRow}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View style={styles.logoBadge}>
              G
            </View>
            <View>
              <h1 className="text-xs font-bold tracking-wider text-zinc-900 leading-none">GUNPLA STORE</h1>
            </View>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {/* 🛒 Shopping Cart trigger button */}
            <button
              id="header-cart-btn"
              onClick={onCartClick}
              className="relative p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-150 text-zinc-700 active:scale-95 transition-all cursor-pointer flex items-center"
              title="View Cart"
            >
              <ShoppingCart size={13} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[8px] rounded-full px-1 py-0.2 min-w-[14px] text-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* + Add Product Button */}
            <button
              id="header-add-product-btn"
              onClick={onAddClick}
              className="bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Plus size={11} />
              <span>Add</span>
            </button>
          </View>
        </View>

        {/* 🔍 Search Bar & Filter Button Container */}
        <View style={styles.searchFilterRow}>
          {/* Search Input wrapper */}
          <View style={styles.searchWrapper}>
            <Search size={12} className="text-zinc-400 mr-2 shrink-0" />
            <TextInput
              id="product-search-input"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Gunpla, tools, apparel..."
              className="bg-transparent text-[11px] text-zinc-850 placeholder-zinc-400 py-1 w-full outline-hidden"
            />
          </View>

          {/* Filter Button */}
          <button
            id="filter-toggle-btn"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              selectedGrade !== 'All' || showFilterDropdown
                ? 'bg-zinc-950 border-zinc-950 text-white font-semibold shadow-xs'
                : 'bg-zinc-50 border-zinc-150 text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            <SlidersHorizontal size={13} />
            {selectedGrade !== 'All' && (
              <span className="ml-1 text-[8px] bg-zinc-900 text-white rounded-full px-1 min-w-[12px] h-3 flex items-center justify-center font-bold">
                {selectedGrade}
              </span>
            )}
          </button>
        </View>

        {/* 🗂️ Filter Dropdown */}
        {showFilterDropdown && (
          <View className="p-3 bg-white border border-zinc-150 rounded-xl shadow-lg mt-2 space-y-2">
            <View className="text-[8px] text-zinc-400 font-mono uppercase tracking-wider font-semibold">
              Filter by Grade
            </View>
            <View className="flex flex-wrap gap-1">
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => {
                    setSelectedGrade(grade);
                    setShowFilterDropdown(false);
                  }}
                  className={`px-2.5 py-1 text-[10px] rounded-md transition-colors cursor-pointer ${
                    selectedGrade === grade
                      ? 'bg-zinc-950 text-white font-medium'
                      : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {grade === 'All' ? 'All Items' : grade}
                </button>
              ))}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// 💅 StyleSheet style definitions to align with real React Native architecture
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  brandRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#09090b',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#ffffff',
    letterSpacing: '0.05em',
  },
  searchFilterRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#f4f4f5',
  }
});
