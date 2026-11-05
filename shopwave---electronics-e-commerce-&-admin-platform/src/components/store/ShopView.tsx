import React, { useState, useMemo } from 'react';
import { Filter, X, RotateCcw, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';
import { formatBDT } from '../../utils/shopEngine';

interface ShopViewProps {
  initialFilter?: string;
  onOpenProduct: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ initialFilter, onOpenProduct }) => {
  const { products, categories, brands } = useStore();

  // Parse initial filter parameter
  const initialCategory = categories.some((c) => c.name === initialFilter) ? initialFilter : '';
  const initialBrand = initialFilter?.startsWith('brand:') ? initialFilter.replace('brand:', '') : '';
  const isDeals = initialFilter === 'deals';
  const isNew = initialFilter === 'new';
  const isBestSeller = initialFilter === 'bestseller';
  const initialSearch = initialFilter?.startsWith('search:') ? initialFilter.replace('search:', '') : '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || '');
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand || '');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyDeals, setOnlyDeals] = useState<boolean>(isDeals);
  const [searchKeyword, setSearchKeyword] = useState<string>(initialSearch || '');
  const [priceMax, setPriceMax] = useState<number>(450000);
  const [sortBy, setSortBy] = useState<string>(isNew ? 'newest' : isBestSeller ? 'bestseller' : 'featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (p.visibility !== 'published') return false;
        if (selectedCategory && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        if (selectedBrand && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        if (onlyInStock && p.stock <= 0 && !p.allowBackorders) return false;
        if (onlyDeals && p.discountPercentage <= 0) return false;

        const effectivePrice = p.salePrice > 0 ? p.salePrice : p.regularPrice;
        if (effectivePrice > priceMax) return false;

        if (searchKeyword.trim()) {
          const q = searchKeyword.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q));
          if (!match) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice > 0 ? a.salePrice : a.regularPrice;
        const priceB = b.salePrice > 0 ? b.salePrice : b.regularPrice;

        switch (sortBy) {
          case 'price-asc':
            return priceA - priceB;
          case 'price-desc':
            return priceB - priceA;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'bestseller':
            return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [products, selectedCategory, selectedBrand, onlyInStock, onlyDeals, searchKeyword, priceMax, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setOnlyInStock(false);
    setOnlyDeals(false);
    setSearchKeyword('');
    setPriceMax(450000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedBrand) ||
    onlyInStock ||
    onlyDeals ||
    Boolean(searchKeyword) ||
    priceMax < 450000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {selectedCategory
              ? selectedCategory
              : selectedBrand
              ? `${selectedBrand} Products`
              : onlyDeals
              ? 'Hot Deals & Discounts'
              : 'All Electronics'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> official devices
          </p>
        </div>

        {/* Sorting & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#168DE2]" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-[#168DE2]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestseller">Best Selling</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Filter className="w-4 h-4 text-[#168DE2]" />
              <span>Refine Catalog</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#168DE2] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search keyword inside shop */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Keyword
            </label>
            <input
              type="text"
              placeholder="e.g. M3, Titanium, OLED..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:border-[#168DE2]"
            />
          </div>

          {/* Categories Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors ${
                  !selectedCategory
                    ? 'bg-[#168DE2]/10 text-[#168DE2] font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Categories ({products.filter((p) => p.visibility === 'published').length})
              </button>
              {categories.map((cat) => {
                const count = products.filter(
                  (p) => p.category === cat.name && p.visibility === 'published'
                ).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-[#168DE2]/10 text-[#168DE2] font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Brand
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedBrand('')}
                className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors ${
                  !selectedBrand
                    ? 'bg-[#168DE2]/10 text-[#168DE2] font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Brands
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(selectedBrand === b.name ? '' : b.name)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors ${
                    selectedBrand === b.name
                      ? 'bg-[#168DE2]/10 text-[#168DE2] font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-bold text-[#168DE2] tabular-nums">
                {formatBDT(priceMax)}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="450000"
              step="5000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#168DE2]"
            />
          </div>

          {/* Quick Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#168DE2] focus:ring-[#168DE2]"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">In Stock Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={(e) => setOnlyDeals(e.target.checked)}
                className="rounded text-[#168DE2] focus:ring-[#168DE2]"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Discounted / On Sale Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
              <p className="text-base font-bold text-slate-900 dark:text-white">No products found</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No electronics matched your active filter criteria. Try resetting filters or searching for another keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-5 py-2.5 bg-[#168DE2] text-white text-xs font-semibold rounded-xl hover:bg-[#123B82] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenDetails={onOpenProduct} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div onClick={() => setMobileFilterOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6 overflow-y-auto flex-1">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filter Products</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800"
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800"
                  >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Max Price</span>
                    <span className="text-[#168DE2] tabular-nums">{formatBDT(priceMax)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="450000"
                    step="5000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[#168DE2]"
                  />
                </div>

                <div className="space-y-2 text-xs font-medium">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="rounded text-[#168DE2]"
                    />
                    <span>In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlyDeals}
                      onChange={(e) => setOnlyDeals(e.target.checked)}
                      className="rounded text-[#168DE2]"
                    />
                    <span>Discounted Only</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 text-xs font-semibold bg-[#168DE2] text-white rounded-xl"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
