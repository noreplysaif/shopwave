import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Scale,
  User,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Moon,
  Sun,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { formatBDT } from '../../utils/shopEngine';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenCompare: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenProduct,
  onOpenCart,
  onOpenAuth,
  onOpenCompare,
  darkMode,
  onToggleDarkMode,
}) => {
  const { products, cart, wishlist, compareList, activeUser, settings, categories } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter search results
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.visibility === 'published' &&
            (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (product: Product) => {
    onOpenProduct(product);
    setSearchQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Optional Top Announcement Strip */}
      {settings.showAnnouncement && settings.announcementBanner && (
        <div className="bg-[#123B82] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span>{settings.announcementBanner}</span>
          <span className="hidden md:inline-block opacity-75">· Free Dhaka delivery on orders over ৳50,000</span>
        </div>
      )}

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 lg:gap-8">
          {/* Zone 1: Brand Wordmark & Official Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#168DE2] rounded-lg"
              aria-label="ShopWave Home"
            >
              <img
                src="/assets/aistudio/logo_785380fd.png"
                alt="ShopWave Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#168DE2] transition-colors whitespace-nowrap ${
                currentView === 'home' ? 'text-[#168DE2] font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-[#168DE2] transition-colors whitespace-nowrap ${
                currentView === 'shop' ? 'text-[#168DE2] font-semibold' : ''
              }`}
            >
              Shop All
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdown(true)}
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <button
                onClick={() => onNavigate('shop')}
                className="flex items-center gap-1 hover:text-[#168DE2] transition-colors whitespace-nowrap py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoriesDropdown && (
                <div className="absolute top-full left-0 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigate('shop', cat.name);
                        setCategoriesDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-slate-400">
                        {products.filter((p) => p.category === cat.name && p.visibility === 'published').length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('shop', 'deals')}
              className="hover:text-[#168DE2] transition-colors whitespace-nowrap flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold"
            >
              <span>Hot Deals</span>
            </button>
            <button
              onClick={() => onNavigate('shop', 'new')}
              className="hover:text-[#168DE2] transition-colors whitespace-nowrap"
            >
              New Arrivals
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#168DE2] transition-colors whitespace-nowrap ${
                currentView === 'about' ? 'text-[#168DE2] font-semibold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#168DE2] transition-colors whitespace-nowrap ${
                currentView === 'contact' ? 'text-[#168DE2] font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Search, Tools, Account & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Autocomplete Search Input */}
            <div ref={searchRef} className="relative hidden md:block w-48 lg:w-64">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search laptops, phones..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-[#168DE2] focus:ring-1 focus:ring-[#168DE2] transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Products
                  </div>
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectSearchResult(product)}
                      className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-10 h-10 object-contain rounded bg-slate-100 dark:bg-slate-800 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          <span>{product.brand}</span>
                          <span>·</span>
                          <span className="font-semibold text-[#168DE2] tabular-nums">
                            {formatBDT(product.salePrice > 0 ? product.salePrice : product.regularPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      onNavigate('shop', `search:${searchQuery}`);
                      setSearchOpen(false);
                    }}
                    className="w-full py-2 bg-slate-50 dark:bg-slate-800/80 text-center text-xs font-semibold text-[#168DE2] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    View all matching products →
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Compare */}
            <button
              onClick={onOpenCompare}
              aria-label="Product comparison"
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors hidden sm:flex"
            >
              <Scale className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#15C8D9] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('dashboard', 'wishlist')}
              aria-label="Wishlist"
              className="relative p-2 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-slate-800 transition-colors hidden sm:flex"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / User Portal */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 p-2 rounded-xl text-slate-600 hover:text-[#168DE2] hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              aria-label="Account profile"
            >
              <User className="w-4 h-4" />
              <span className="text-xs font-semibold hidden md:inline-block max-w-[90px] truncate">
                {activeUser ? activeUser.name : 'Account'}
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#168DE2] hover:bg-[#123B82] text-white px-3.5 py-2 rounded-xl font-semibold text-xs transition-all shadow-sm"
              aria-label={`Cart with ${cartTotalItems} items`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline-block">Bag</span>
              {cartTotalItems > 0 && (
                <span className="bg-white text-[#168DE2] text-[10px] font-bold rounded-full px-1.5 py-0.2 min-w-4 text-center">
                  {cartTotalItems}
                </span>
              )}
            </button>

            {/* Quick Link to Admin Panel */}
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-[#168DE2] bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
              title="Open Admin Control Center"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#168DE2]" />
              <span className="hidden xl:inline">Admin</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('shop', `search:${searchQuery}`);
                  setMobileMenuOpen(false);
                }
              }}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-transparent focus:bg-white focus:border-[#168DE2]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium pt-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Shop All
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'deals');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-amber-600 dark:text-amber-400 font-semibold"
            >
              Hot Deals
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'new');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard', 'orders');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Track Order
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard', 'wishlist');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Wishlist ({wishlist.length})
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Contact Us
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#168DE2]"
            >
              {activeUser ? `Signed in as ${activeUser.name}` : 'Login / Register'}
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Admin Dashboard →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
