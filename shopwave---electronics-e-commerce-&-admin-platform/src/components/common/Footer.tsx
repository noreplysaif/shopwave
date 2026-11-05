import React from 'react';
import { Mail, Phone, MapPin, Shield, Truck, RefreshCw, Headphones, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings, categories } = useStore();

  return (
    <footer className="bg-[#101B32] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Trust badging strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#15C8D9]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Same-day inside Dhaka & fast nationwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#168DE2]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Genuine Tech</h4>
              <p className="text-xs text-slate-400 mt-0.5">Official manufacturer warranty support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#15C8D9]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Easy 7-Day Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free replacement policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#168DE2]">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Expert Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated audio & hardware specialists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src="/assets/aistudio/logo_785380fd.png"
              alt="ShopWave Logo"
              className="h-10 w-auto object-contain brightness-110"
            />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              ShopWave is Bangladesh’s premier destination for flagship smartphones, creator laptops, audiophile acoustics, and wearable tech. Official warranty, verified imports, and dedicated after-sales service.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#168DE2] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#168DE2] shrink-0" />
                <span>Hotline: {settings.contactPhone} (WhatsApp: {settings.whatsappNumber})</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#168DE2] shrink-0" />
                <span>Email: {settings.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('shop', cat.name)}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('dashboard', 'orders')} className="hover:text-white transition-colors">
                  Track My Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('refund')} className="hover:text-white transition-colors">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Admin Portal & Payments */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
              Store Administration
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Authorized administrators can manage store products, stock levels, orders, and customer accounts.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-[#168DE2] text-white transition-all border border-white/10"
            >
              <span>Admin Control Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Supported Payments
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-bold text-white">
                <span className="bg-[#E2136E] px-2 py-1 rounded">bKash</span>
                <span className="bg-[#F7941D] px-2 py-1 rounded">Nagad</span>
                <span className="bg-slate-700 px-2 py-1 rounded">Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} {settings.siteName}. All rights reserved. Technology Meets Lifestyle.</p>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('privacy')} className="hover:text-slate-400">
            Privacy
          </button>
          <button onClick={() => onNavigate('terms')} className="hover:text-slate-400">
            Terms
          </button>
          <button onClick={() => onNavigate('refund')} className="hover:text-slate-400">
            Refunds
          </button>
        </div>
      </div>
    </footer>
  );
};
