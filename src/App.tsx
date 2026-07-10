import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MobileFrame } from './components/MobileFrame';
import { StyleSheetInspector } from './components/StyleSheetInspector';
import { ProductsList } from './components/ProductsList';
import { HomeTab } from './components/HomeTab';
import { AddProductTab } from './components/AddProductTab';
import { CategoriesTab } from './components/CategoriesTab';
import { LoginScreen } from './components/LoginScreen';
import { Product, TabType, User } from './types';
import { INITIAL_PRODUCTS, MOCK_USERS } from './mockData';
import { Sliders, LogOut, Code, Smartphone, HelpCircle, RefreshCw, ShoppingCart, X } from 'lucide-react';

export default function App() {
  // --- Core Products Database State ---
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('gunpla_products');
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  // --- Login State ---
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('gunpla_user');
    return stored ? JSON.parse(stored) : null;
  });

  // --- Tab Navigation ---
  const [activeTab, setActiveTab] = useState<TabType>('Home');

  // --- Header Filter & Search States ---
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');

  // --- Dynamic CSS / StyleSheet Inspector States ---
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState<'space-between' | 'space-around' | 'center'>('space-between');
  const [paddingSize, setPaddingSize] = useState<number>(12);

  // --- Cart Simulator (For Customer Experience) ---
  const [cart, setCart] = useState<Product[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // --- Sidebar Controller for Mobile Screens ---
  const [showSidebarOnMobile, setShowSidebarOnMobile] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('gunpla_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gunpla_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gunpla_user');
    }
  }, [currentUser]);

  // Handle adding new product
  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
      rating: 4.5 + Math.random() * 0.5, // Random star rating 4.5 - 5.0
      reviewsCount: Math.floor(Math.random() * 30) + 1,
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  // Handle Status Toggle (Active vs Inactive)
  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p))
    );
  };

  // Handle Product Deletion
  const handleDeleteProduct = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการสินค้านี้?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      // Remove from cart if deleted
      setCart((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Handle switching users
  const handleSwitchUser = () => {
    const nextUser = currentUser?.username === 'admin' ? MOCK_USERS[1] : MOCK_USERS[0];
    setCurrentUser(nextUser);
    alert(`สลับบัญชีผู้ใช้เป็น: ${nextUser.displayName} (${nextUser.role})`);
  };

  // Handle logging out
  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setActiveTab('Home');
  };

  // Quick reset to initial mock data
  const handleResetData = () => {
    if (confirm('ต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('gunpla_products', JSON.stringify(INITIAL_PRODUCTS));
      alert('รีเซ็ตข้อมูลเรียบร้อยแล้ว!');
    }
  };

  // Add product to cart simulator
  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    alert(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว!`);
  };

  // Calculate cart subtotal
  const cartSubtotal = cart.reduce((acc, p) => acc + p.price, 0);

  // Apply custom interactive stylesheet configurations onto inline/tailwind definitions inside list cards
  const getDynamicStyleClasses = () => {
    const flexDir = flexDirection === 'row' ? 'flex-row' : 'flex-col';
    const justify =
      justifyContent === 'space-between'
        ? 'justify-between'
        : justifyContent === 'space-around'
        ? 'justify-around'
        : 'justify-center';
    
    return `${flexDir} ${justify}`;
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-900 font-sans antialiased flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      
      {/* 📱 Fully Responsive Unified Viewport Container for Android, iPhone, iPad */}
      <div className="w-full h-[calc(100vh-32px)] sm:h-[800px] sm:max-w-[420px] md:max-w-[768px] bg-white flex flex-col sm:shadow-2xl sm:border sm:border-zinc-200 sm:rounded-[36px] overflow-hidden relative transition-all duration-300">
        
        {/* If NO user logged in, render the Login Screen */}
        {!currentUser ? (
          <LoginScreen onLoginSuccess={(user) => setCurrentUser(user)} />
        ) : (
          // Main store viewport
          <div className="flex-1 flex flex-col min-h-0 relative bg-white">
            
            {/* 1. Header (Search and filters) */}
            <Header
              searchText={searchText}
              setSearchText={setSearchText}
              selectedGrade={selectedGrade}
              setSelectedGrade={setSelectedGrade}
              onAddClick={() => setActiveTab('Add')}
              cartCount={cart.length}
              onCartClick={() => setShowCartDrawer(true)}
            />

            {/* 2. Main Tab View Router */}
            <div className="flex-1 flex flex-col min-h-0">
              {activeTab === 'Home' && (
                <HomeTab
                  products={products}
                  currentUser={currentUser}
                  onSwitchUser={handleSwitchUser}
                  onLogout={handleLogout}
                  onNavigateToTab={(tab) => {
                    if (tab === 'Add') setActiveTab('Add');
                    else if (tab === 'Products') setActiveTab('Products');
                    else if (tab === 'Categories') setActiveTab('Categories');
                  }}
                  onSelectCategory={(cat) => setSelectedGrade(cat)}
                />
              )}

              {activeTab === 'Products' && (
                <ProductsList
                  products={products}
                  searchText={searchText}
                  selectedGrade={selectedGrade}
                  onToggleStatus={handleToggleStatus}
                  onDeleteProduct={handleDeleteProduct}
                  onAddToCart={handleAddToCart}
                />
              )}

              {activeTab === 'Add' && (
                <AddProductTab
                  onAddProduct={(p) => {
                    handleAddProduct(p);
                    setActiveTab('Products'); // redirect to list
                  }}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'Categories' && (
                <CategoriesTab
                  products={products}
                  onSelectCategory={(cat) => setSelectedGrade(cat)}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                />
              )}
            </div>

            {/* 3. Bottom Menu Bar with emojis (🏠 Home, ➕ Add, 📦 Products, 🗂️ Categories) */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </div>

      {/* 🛒 Shopping Cart Drawer Simulator (Slide Over Panel) */}
      {showCartDrawer && (
        <div className="fixed inset-0 bg-zinc-950/65 backdrop-blur-xs flex justify-end z-50 animate-fadeIn">
          <div className="w-full max-w-md bg-white border-l border-zinc-150 h-full p-6 flex flex-col text-zinc-900 shadow-2xl animate-slideLeft">
            <div className="flex justify-between items-center border-b border-zinc-150 pb-4 mb-4">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <span>🛒</span>
                <span>ตะกร้าสินค้าของคุณ (Your Cart)</span>
              </h3>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-150 text-zinc-500 hover:text-zinc-900 transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-none">
              {cart.length === 0 ? (
                <div className="text-center py-24 text-zinc-400">
                  <span className="text-4xl">🛒</span>
                  <p className="text-xs font-semibold mt-3">ยังไม่มีสินค้าในตะกร้า</p>
                  <p className="text-[10px] text-zinc-400 mt-1">กดเพิ่มสินค้าในหน้า Products เพื่อสั่งซื้อ!</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="p-3 bg-zinc-50/70 border border-zinc-100 rounded-xl flex items-center justify-between gap-3 animate-fadeIn"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-zinc-100 border border-zinc-150"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{item.name}</h4>
                        <span className="text-[8px] bg-zinc-100 text-zinc-600 border border-zinc-200 px-1 py-0.2 rounded uppercase font-mono font-bold inline-block mt-0.5">
                          {item.grade}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-zinc-900">
                        ฿{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          const updated = [...cart];
                          updated.splice(index, 1);
                          setCart(updated);
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold cursor-pointer"
                        title="Remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer Summary */}
            <div className="border-t border-zinc-150 pt-4 mt-4 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-medium">ยอดรวมทั้งหมด (Subtotal)</span>
                <span className="text-base font-mono font-bold text-zinc-900">
                  ฿{cartSubtotal.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (cart.length === 0) return;
                    setCart([]);
                    alert('ชำระเงินเรียบร้อยแล้ว! ขอบคุณที่อุดหนุนกองทัพโมเดลกันพลาของเรา!');
                    setShowCartDrawer(false);
                  }}
                  disabled={cart.length === 0}
                  className="w-full bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 text-white font-medium text-xs py-2.5 rounded-xl cursor-pointer text-center transition-all shadow-xs"
                >
                  ชำระเงิน (Checkout)
                </button>
                <button
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                  className="w-full bg-zinc-100 hover:bg-zinc-150 disabled:opacity-50 text-zinc-500 hover:text-zinc-950 font-medium text-xs py-2.5 rounded-xl border border-zinc-150 transition-all cursor-pointer"
                >
                  ล้างตะกร้า (Clear)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
