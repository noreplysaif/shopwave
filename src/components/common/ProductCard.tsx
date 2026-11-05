import React from 'react';
import { Heart, Scale, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../types';
import { formatBDT } from '../../utils/shopEngine';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useStore();
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompare(product.id);
  };

  const isOutOfStock = product.stock <= 0 && !product.allowBackorders;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      {/* Top badges (subtle, non-pill spam) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {product.discountPercentage > 0 && (
          <span className="bg-[#168DE2] text-white text-[11px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            -{product.discountPercentage}%
          </span>
        )}
        {product.isFlashSale && (
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            Flash Sale
          </span>
        )}
        {isOutOfStock && (
          <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
            Out of Stock
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleToggleWishlist}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
            inWishlist
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
              : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white dark:bg-slate-800/90 dark:text-slate-300 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleToggleCompare}
          aria-label="Compare product"
          className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
            inCompare
              ? 'bg-cyan-50 text-[#15C8D9] dark:bg-cyan-950/60 dark:text-cyan-400'
              : 'bg-white/90 text-slate-600 hover:text-[#168DE2] hover:bg-white dark:bg-slate-800/90 dark:text-slate-300 shadow-sm'
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          aria-label="Quick view"
          className="p-2 rounded-xl bg-white/90 text-slate-600 hover:text-[#168DE2] hover:bg-white dark:bg-slate-800/90 dark:text-slate-300 shadow-sm transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-6">
        <img
          src={product.mainImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Elegant fallback SVG container
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Brand & Category (unboxed text metadata per frontend-design rules) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 className="mt-1.5 text-sm sm:text-base font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#168DE2] transition-colors">
          {product.name}
        </h3>

        {/* Rating and review count */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-semibold text-slate-800 dark:text-slate-200">{product.rating}</span>
          </div>
          <span>({product.reviewCount})</span>
          {isLowStock && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-medium">Only {product.stock} left</span>
            </>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
                {formatBDT(product.salePrice > 0 ? product.salePrice : product.regularPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through tabular-nums">
                  {formatBDT(product.regularPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Official Warranty
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
                : 'bg-[#168DE2] hover:bg-[#123B82] text-white shadow-sm hover:shadow'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
