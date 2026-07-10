import React, { useState } from 'react';
import { Star, ToggleLeft, ToggleRight, Trash2, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { StyleSheet, View, ScrollView } from '../styles';

interface ProductsListProps {
  products: Product[];
  searchText: string;
  selectedGrade: string;
  onToggleStatus: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onAddToCart?: (p: Product) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  searchText,
  selectedGrade,
  onToggleStatus,
  onDeleteProduct,
  onAddToCart,
}) => {
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);

  // Filter products based on search term and selected grade/category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase()) ||
      p.grade.toLowerCase().includes(searchText.toLowerCase());

    const matchesGrade = selectedGrade === 'All' || p.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  return (
    <View style={styles.listContainer}>
      {/* ScrollView for Products List with Mock Data Mapping */}
      <ScrollView style={{ flex: 1 }} className="px-4 py-4 scrollbar-none">
        
        {/* Count Indicator */}
        <View style={styles.headerInfo}>
          <span className="text-[10px] text-zinc-400 font-mono tracking-wider font-semibold">
            SHOWING {filteredProducts.length} PRODUCTS
          </span>
          {selectedGrade !== 'All' && (
            <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 px-2 py-0.5 rounded-full text-[9px] uppercase font-bold font-mono">
              Grade: {selectedGrade}
            </span>
          )}
        </View>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <View className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
            <span className="text-3xl mb-3">📦</span>
            <h3 className="text-xs font-semibold text-zinc-800 font-sans">No products found</h3>
            <p className="text-[11px] text-zinc-400 max-w-[200px] mt-1 font-sans">
              Try adjusting your search queries or filter categories.
            </p>
          </View>
        )}

        {/* 📦 Product Cards Mapping Loop using flexDirection: 'row' */}
        {filteredProducts.map((product) => {
          const isActive = product.status === 'Active';

          return (
            <View
              key={product.id}
              style={isActive ? styles.cardActive : styles.cardInactive}
            >
              {/* Left Image Section */}
              <View style={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Grade Badge */}
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[8px] font-bold tracking-wider rounded-md uppercase text-white bg-zinc-950/95 font-mono shadow-xs">
                  {product.grade}
                </span>
              </View>

              {/* Right Content Section */}
              <View style={styles.cardContent}>
                <View>
                  {/* Title & Price Row */}
                  <View style={styles.rowJustify}>
                    <h3
                      onClick={() => setSelectedProductDetails(product)}
                      className="text-[11px] font-bold text-zinc-900 hover:text-zinc-600 cursor-pointer line-clamp-1 flex-1 leading-snug transition-colors pr-2"
                    >
                      {product.name}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-zinc-900 whitespace-nowrap">
                      ฿{product.price.toLocaleString()}
                    </span>
                  </View>

                  {/* Rating Stars */}
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#f59e0b' }}>
                      <Star size={9} fill="currentColor" />
                      <span className="text-[9px] font-bold ml-0.5 text-zinc-700 font-mono">{product.rating.toFixed(1)}</span>
                    </View>
                    <span className="text-[9px] text-zinc-300 font-mono">•</span>
                    <span className={`text-[9px] font-semibold ${isActive ? 'text-emerald-700' : 'text-zinc-400'}`}>
                      {product.status}
                    </span>
                  </View>
                </View>

                {/* Description */}
                <p className="text-[10px] text-zinc-500 line-clamp-1 leading-normal my-1">
                  {product.description}
                </p>

                {/* Bottom Interactive Row */}
                <View style={styles.cardBottomRow}>
                  {/* Status toggle button */}
                  <button
                    onClick={() => onToggleStatus(product.id)}
                    className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-800 cursor-pointer"
                  >
                    {isActive ? (
                      <ToggleRight size={16} className="text-emerald-500" />
                    ) : (
                      <ToggleLeft size={16} className="text-zinc-400" />
                    )}
                    <span className="text-[9px] font-medium font-sans">Active</span>
                  </button>

                  <View style={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedProductDetails(product)}
                      className="p-1 rounded-lg bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-150 transition-all cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={11} />
                    </button>

                    {/* Add to Cart button (only if Active) */}
                    {isActive && onAddToCart && (
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-1 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-all cursor-pointer"
                        title="Add to Cart"
                      >
                        <ShoppingBag size={11} />
                      </button>
                    )}

                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-1 rounded-lg bg-zinc-50 text-zinc-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-zinc-150 transition-all cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 size={11} />
                    </button>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* 🔍 Product Details Modal Backdrop */}
      {selectedProductDetails && (
        <View className="absolute inset-0 z-30 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <View className="bg-white border border-zinc-150 rounded-2xl max-w-full w-full max-h-[90%] overflow-y-auto flex flex-col text-zinc-900 shadow-xl animate-scaleUp">
            {/* Modal Image */}
            <View className="relative h-44 bg-zinc-50">
              <img
                src={selectedProductDetails.image}
                alt={selectedProductDetails.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-bold bg-zinc-950 rounded-md uppercase text-white shadow-xs font-mono">
                {selectedProductDetails.grade}
              </span>
              <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                selectedProductDetails.status === 'Active'
                  ? 'bg-white/95 border-emerald-100 text-emerald-700 shadow-xs'
                  : 'bg-zinc-100/90 border-zinc-200 text-zinc-500'
              }`}>
                {selectedProductDetails.status}
              </span>
            </View>

            {/* Modal Details */}
            <View className="p-4 flex-1">
              <h3 className="text-xs font-semibold text-zinc-900 mb-1.5 leading-snug">
                {selectedProductDetails.name}
              </h3>
              
              <View className="flex items-center justify-between mb-3.5">
                <span className="text-sm font-mono font-bold text-zinc-900">
                  ฿{selectedProductDetails.price.toLocaleString()}
                </span>
                <View className="flex items-center text-amber-500 text-xs">
                  <Star size={11} fill="currentColor" />
                  <span className="font-bold ml-1 text-zinc-700 font-mono">{selectedProductDetails.rating.toFixed(1)}</span>
                  <span className="text-zinc-400 ml-1 font-medium font-sans">({selectedProductDetails.reviewsCount} reviews)</span>
                </View>
              </View>

              <View className="text-xs text-zinc-500 leading-relaxed space-y-2 mb-4">
                <p>{selectedProductDetails.description}</p>
                <View className="bg-zinc-50 p-3 rounded-xl border border-zinc-150 flex justify-between text-[10px] font-mono">
                  <View>
                    <div className="text-zinc-400 text-[8px] uppercase font-bold tracking-wider mb-0.5">Grade / Series</div>
                    <div className="text-zinc-800 font-semibold">{selectedProductDetails.grade}</div>
                  </View>
                  <View>
                    <div className="text-zinc-400 text-[8px] uppercase font-bold tracking-wider mb-0.5">Release Year</div>
                    <div className="text-zinc-800 font-semibold">{selectedProductDetails.releaseYear}</div>
                  </View>
                  <View>
                    <div className="text-zinc-400 text-[8px] uppercase font-bold tracking-wider mb-0.5">Status</div>
                    <div className="text-zinc-800 font-semibold">{selectedProductDetails.status}</div>
                  </View>
                </View>
              </View>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProductDetails(null)}
                className="w-full bg-zinc-950 hover:bg-zinc-900 text-white font-medium text-xs py-2.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                Close Details
              </button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

// 💅 StyleSheet layout styling for premium list and horizontal row cards
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    overflow: 'hidden',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardActive: {
    display: 'flex',
    flexDirection: 'row', // 👈 REQUIRED: row layout
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f4f4f5',
    overflow: 'hidden',
    marginBottom: 10,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transitionProperty: 'all',
    transitionDuration: '300ms',
  },
  cardInactive: {
    display: 'flex',
    flexDirection: 'row', // 👈 REQUIRED: row layout
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    overflow: 'hidden',
    marginBottom: 10,
    opacity: 0.6,
  },
  imageContainer: {
    position: 'relative',
    width: 96,
    height: 96,
    backgroundColor: '#f4f4f5',
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rowJustify: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBottomRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderColor: '#f4f4f5',
    paddingTop: 4,
  }
});
