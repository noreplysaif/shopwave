import React from 'react';
import { ArrowRight, Zap, Flame, Sparkles, Shield, Truck, Award, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';

interface HomeViewProps {
  onOpenProduct: (product: Product) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenProduct, onNavigate }) => {
  const { products, categories, brands, settings } = useStore();

  const publishedProducts = products.filter((p) => p.visibility === 'published');
  const flashSaleProducts = publishedProducts.filter((p) => p.isFlashSale).slice(0, 4);
  const featuredProducts = publishedProducts.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = publishedProducts.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = publishedProducts.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#101B32] to-slate-900 text-white py-16 sm:py-24">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#168DE2]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[#15C8D9] text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ShopWave Bangladesh Official Store</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                {settings.heroHeading || 'Next-Generation Flagship Tech is Here.'}
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {settings.heroSubheading ||
                  'Experience breakthrough computing, spatial audio, and cinematic camera hardware with official warranty and same-day delivery.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate(settings.heroCtaLink || 'shop')}
                  className="px-6 py-3.5 bg-[#168DE2] hover:bg-[#15C8D9] text-white text-sm font-bold rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 group"
                >
                  <span>{settings.heroCtaText || 'Explore Flagship Devices'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('shop', 'deals')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-2xl transition-all border border-white/15 backdrop-blur-md"
                >
                  Browse Hot Deals
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-[#15C8D9] shrink-0" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Truck className="w-4 h-4 text-[#15C8D9] shrink-0" />
                  <span>Dhaka Express</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Shield className="w-4 h-4 text-[#15C8D9] shrink-0" />
                  <span>Official Warranty</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-6 shadow-2xl overflow-hidden group">
                  <div className="absolute top-4 right-4 bg-[#168DE2] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </div>
                  <div className="aspect-[4/3] flex items-center justify-center p-4">
                    <img
                      src={
                        featuredProducts[0]?.mainImage ||
                        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
                      }
                      alt="Featured Tech"
                      className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-[#15C8D9] font-semibold uppercase tracking-wider">
                      {featuredProducts[0]?.brand || 'Apple'}
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {featuredProducts[0]?.name || 'iPhone 16 Pro Max'}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {featuredProducts[0]?.shortDescription ||
                        'Grade 5 titanium design with A18 Pro silicon and 48MP camera.'}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-white tabular-nums">
                        ৳{featuredProducts[0]?.salePrice?.toLocaleString('en-BD') || '172,000'}
                      </span>
                      <button
                        onClick={() => featuredProducts[0] && onOpenProduct(featuredProducts[0])}
                        className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl hover:bg-[#15C8D9] hover:text-white transition-all shadow-md"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Top Electronics Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-semibold text-[#168DE2] hover:underline flex items-center gap-1"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat) => {
            const count = publishedProducts.filter((p) => p.category === cat.name).length;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('shop', cat.name)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#168DE2] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{count} {count === 1 ? 'Product' : 'Products'}</p>
                  </div>
                </div>
                <div className="mt-4 aspect-[16/9] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-2">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Flash Sales with High Urgency */}
      {flashSaleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent p-6 sm:p-8 rounded-3xl border border-amber-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-md">
                  <Zap className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      Flash Deals & Special Discounts
                    </h2>
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      Limited Stock
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Save up to 15% on flagship models for a limited period
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('shop', 'deals')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenDetails={onOpenProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">
              Curated Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Featured Flagship Electronics
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-semibold text-[#168DE2] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onOpenDetails={onOpenProduct} />
          ))}
        </div>
      </section>

      {/* Best Sellers & New Arrivals Split Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Best Sellers */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500 fill-current" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Most Popular / Best Sellers</h3>
              </div>
              <button
                onClick={() => onNavigate('shop', 'bestseller')}
                className="text-xs font-semibold text-[#168DE2] hover:underline"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} onOpenDetails={onOpenProduct} />
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#15C8D9]" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fresh New Arrivals</h3>
              </div>
              <button
                onClick={() => onNavigate('shop', 'new')}
                className="text-xs font-semibold text-[#168DE2] hover:underline"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} onOpenDetails={onOpenProduct} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Grid Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#168DE2] uppercase tracking-wider">Official Partners</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Authorised Global Brands
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            All devices are factory sealed and backed by official manufacturer warranties.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => onNavigate('shop', `brand:${brand.name}`)}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-[#168DE2] hover:shadow-md cursor-pointer transition-all"
            >
              <span className="text-base font-black text-slate-800 dark:text-white tracking-tighter">
                {brand.logo}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#123B82] to-[#168DE2] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#15C8D9]">
              Special Corporate & Creator Discount
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Upgrade Your Studio or Workspace with ShopWave
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Equip your creative agency or dev team with high-power Apple M3 workstations, Dell 6K monitors, and Sony audio gear. Volume discounts and official VAT invoices provided.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-[#15C8D9] hover:text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Inquire for Business
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
