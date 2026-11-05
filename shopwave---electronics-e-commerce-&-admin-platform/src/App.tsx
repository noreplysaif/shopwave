import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { AuthModal } from './components/common/AuthModal';
import { CompareModal } from './components/common/CompareModal';
import { HomeView } from './components/store/HomeView';
import { ShopView } from './components/store/ShopView';
import { ProductDetailView } from './components/store/ProductDetailView';
import { CheckoutView } from './components/store/CheckoutView';
import { CustomerDashboardView } from './components/store/CustomerDashboardView';
import { StaticPages } from './components/store/StaticPages';
import { AdminLayout } from './components/admin/AdminLayout';
import { Product, Order } from './types';

const MainApp: React.FC = () => {
  const { products, activeUser, logoutCustomer } = useStore();

  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === 'admin') return 'admin';
      if (path === 'shop') return 'shop';
      if (path === 'checkout') return 'checkout';
      if (path === 'dashboard') return 'dashboard';
      if (['about', 'contact', 'faq', 'policy', 'terms', 'privacy'].includes(path)) return path;
    }
    return 'home';
  });
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [buyNowItem, setBuyNowItem] = useState<{
    productId: string;
    quantity: number;
    color?: string;
  } | null>(null);

  // Modals & Drawers
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('shopwave_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('shopwave_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('shopwave_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Popstate listener
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'home';
      setCurrentView(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll to top on view change
  const navigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    setBuyNowItem(null);
    if (typeof window !== 'undefined') {
      const newPath = view === 'home' ? '/' : `/${view}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductById = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      handleOpenProduct(found);
    }
  };

  const handleBuyNow = (product: Product, quantity: number, selectedColor?: string) => {
    setBuyNowItem({
      productId: product.id,
      quantity,
      color: selectedColor,
    });
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    // Keep user on the confirmation view handled inside CheckoutView
  };

  const handleTrackOrderFromConfirmation = (orderNumber: string) => {
    navigate('dashboard', 'track');
  };

  // IF ADMIN VIEW IS ACTIVE -> RENDER SEPARATE ADMIN SYSTEM
  if (currentView === 'admin') {
    return (
      <AdminLayout
        onReturnToStore={() => navigate('home')}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] dark:bg-slate-950 text-[#17243A] dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={navigate}
        onOpenProduct={handleOpenProduct}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenCompare={() => setCompareModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Storefront Body */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView onOpenProduct={handleOpenProduct} onNavigate={navigate} />
        )}

        {currentView === 'shop' && (
          <ShopView initialFilter={viewParam} onOpenProduct={handleOpenProduct} />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => navigate('shop')}
            onOpenProduct={handleOpenProduct}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            buyNowItem={buyNowItem}
            onOrderSuccess={handleOrderSuccess}
            onNavigateHome={() => navigate('home')}
            onTrackOrder={handleTrackOrderFromConfirmation}
          />
        )}

        {currentView === 'dashboard' && (
          <CustomerDashboardView
            initialTab={viewParam || 'orders'}
            onOpenProduct={handleOpenProductById}
            onSignOut={logoutCustomer}
            onContinueShopping={() => navigate('shop')}
          />
        )}

        {(currentView === 'about' ||
          currentView === 'contact' ||
          currentView === 'faq' ||
          currentView === 'privacy' ||
          currentView === 'terms' ||
          currentView === 'refund') && (
          <StaticPages page={currentView as any} onNavigate={navigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onProceedToCheckout={() => {
          setCartDrawerOpen(false);
          navigate('checkout');
        }}
        onContinueShopping={() => {
          setCartDrawerOpen(false);
          navigate('shop');
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          setAuthModalOpen(false);
          navigate('dashboard');
        }}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        onOpenProduct={handleOpenProductById}
      />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
