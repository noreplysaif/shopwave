import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Boxes,
  Users,
  Tag,
  Settings,
  ShieldAlert,
  History,
  LogOut,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
  Bell,
  Lock,
  Mail,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminInventory } from './AdminInventory';
import { AdminCustomers } from './AdminCustomers';
import { AdminCoupons } from './AdminCoupons';
import { AdminSettings } from './AdminSettings';
import { AdminUsers } from './AdminUsers';
import { AdminActivityLogs } from './AdminActivityLogs';
import { AdminRole } from '../../types';
import { checkAdminPermission } from '../../utils/shopEngine';

interface AdminLayoutProps {
  onReturnToStore: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  onReturnToStore,
  darkMode,
  onToggleDarkMode,
}) => {
  const { activeAdmin, loginAdmin, logoutAdmin, orders, products } = useStore();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  // Admin login credentials state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Unverified bKash/Nagad payments count
  const pendingPaymentsCount = orders.filter(
    (o) => (o.paymentMethod === 'bkash' || o.paymentMethod === 'nagad') && o.paymentStatus === 'pending'
  ).length;

  // Low stock products count
  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock <= p.lowStockThreshold
  ).length;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim()) {
      setLoginError('Please enter admin email.');
      return;
    }
    const success = loginAdmin(loginEmail.trim());
    if (!success) {
      setLoginError('Account is inactive or credentials invalid.');
    }
  };

  const handleQuickRoleLogin = (email: string, role: AdminRole) => {
    loginAdmin(email, role);
  };

  // IF NOT LOGGED IN AS ADMIN -> SHOW ADMIN LOGIN SCREEN
  if (!activeAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-slate-800/90 rounded-3xl p-8 border border-slate-700 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <img
              src="/assets/aistudio/logo_785380fd.png"
              alt="ShopWave Logo"
              className="h-12 w-auto mx-auto mb-3 object-contain brightness-110"
            />
            <span className="text-xs font-bold text-[#15C8D9] tracking-widest uppercase">
              Administrative Control Center
            </span>
            <h1 className="text-xl font-extrabold mt-1">Staff Portal Sign-In</h1>
            <p className="text-xs text-slate-400 mt-1">
              Protected authentication required for catalog, inventory, and order operations.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Work Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@shopwave.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:border-[#168DE2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:border-[#168DE2]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Quick Demo Role Selectors */}
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              One-Click Staff Role Presets
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleQuickRoleLogin('admin@shopwave.com', 'super_admin')}
                className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-left border border-slate-600/50 hover:border-[#168DE2]"
              >
                <div className="font-bold text-white">Super Admin</div>
                <div className="text-[10px] text-slate-400">Full Access</div>
              </button>

              <button
                onClick={() => handleQuickRoleLogin('products@shopwave.com', 'product_manager')}
                className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-left border border-slate-600/50 hover:border-[#168DE2]"
              >
                <div className="font-bold text-white">Product Manager</div>
                <div className="text-[10px] text-slate-400">Catalog & Stock</div>
              </button>

              <button
                onClick={() => handleQuickRoleLogin('orders@shopwave.com', 'order_manager')}
                className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-left border border-slate-600/50 hover:border-[#168DE2]"
              >
                <div className="font-bold text-white">Order Manager</div>
                <div className="text-[10px] text-slate-400">Fulfillment & bKash</div>
              </button>

              <button
                onClick={() => handleQuickRoleLogin('manager@shopwave.com', 'store_manager')}
                className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-xl text-left border border-slate-600/50 hover:border-[#168DE2]"
              >
                <div className="font-bold text-white">Store Manager</div>
                <div className="text-[10px] text-slate-400">Operations</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onReturnToStore}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // NAVIGATION TABS WITH RBAC PERMISSION GATES
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders & Payments', icon: ShoppingBag, badge: pendingPaymentsCount },
    { id: 'inventory', label: 'Inventory', icon: Boxes, badge: lowStockCount },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
    { id: 'settings', label: 'Store Settings', icon: Settings },
    { id: 'users', label: 'Admin Staff & Roles', icon: Shield },
    { id: 'logs', label: 'Activity Logs', icon: History },
  ].filter((item) => checkAdminPermission(activeAdmin.role, item.id as any));

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#101B32] text-slate-300 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <img
              src="/assets/aistudio/logo_785380fd.png"
              alt="ShopWave Logo"
              className="h-10 w-auto object-contain brightness-110"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#168DE2] text-white shadow-sm'
                      : 'hover:bg-slate-800/60 hover:text-white text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Active Admin Profile & Sign Out */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="bg-slate-800/60 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#168DE2] to-[#15C8D9] text-white flex items-center justify-center font-bold text-xs">
              {activeAdmin.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-xs truncate">{activeAdmin.name}</div>
              <div className="text-[10px] text-[#15C8D9] uppercase font-semibold truncate">
                {activeAdmin.role.replace('_', ' ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReturnToStore}
              className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="p-2 text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-bold text-sm text-slate-900 dark:text-white capitalize">
              {activeTab.replace('_', ' ')}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdown(!notifDropdown)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {(pendingPaymentsCount > 0 || lowStockCount > 0) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              {notifDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 z-50 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                    System Notifications
                  </div>

                  {pendingPaymentsCount > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('orders');
                        setNotifDropdown(false);
                      }}
                      className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 cursor-pointer font-semibold"
                    >
                      {pendingPaymentsCount} bKash/Nagad payments awaiting verification
                    </div>
                  )}

                  {lowStockCount > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('inventory');
                        setNotifDropdown(false);
                      }}
                      className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 cursor-pointer font-semibold"
                    >
                      {lowStockCount} products reached low stock threshold
                    </div>
                  )}

                  {pendingPaymentsCount === 0 && lowStockCount === 0 && (
                    <div className="text-slate-400 text-center py-2">No pending alerts</div>
                  )}
                </div>
              )}
            </div>

            {/* Dark mode switcher */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Return to storefront */}
            <button
              onClick={onReturnToStore}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200"
            >
              <span>View Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-8 flex-1">
          {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setActiveTab(t)} />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'inventory' && <AdminInventory />}
          {activeTab === 'customers' && <AdminCustomers />}
          {activeTab === 'coupons' && <AdminCoupons />}
          {activeTab === 'settings' && <AdminSettings />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'logs' && <AdminActivityLogs />}
        </main>
      </div>
    </div>
  );
};
