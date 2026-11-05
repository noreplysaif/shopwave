import React, { useState } from 'react';
import {
  Heart,
  Scale,
  ShoppingBag,
  Zap,
  Star,
  CheckCircle2,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { Product } from '../../types';
import { formatBDT } from '../../utils/shopEngine';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onOpenProduct: (product: Product) => void;
  onBuyNow: (product: Product, quantity: number, selectedColor?: string) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onOpenProduct,
  onBuyNow,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare, products } = useStore();

  const [activeImage, setActiveImage] = useState<string>(product.mainImage);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');

  // Customer review form state
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      name: 'Tanvir Hossain',
      rating: 5,
      date: '2 days ago',
      comment: 'Authentic sealed unit. Delivery within Gulshan took only 4 hours. Super satisfied with ShopWave!',
    },
    {
      id: 'rev-2',
      name: 'Nabil Hasan',
      rating: 5,
      date: '1 week ago',
      comment: 'Top-tier build quality and official warranty card stamped cleanly. Highly recommend.',
    },
  ]);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
  const isOutOfStock = product.stock <= 0 && !product.allowBackorders;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  const images = [product.mainImage, ...(product.galleryImages || [])].filter(
    (img, index, self) => img && self.indexOf(img) === index
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedColor);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setReviews([
      {
        id: `rev-${Date.now()}`,
        name: reviewName,
        rating: reviewRating,
        date: 'Just now',
        comment: reviewComment,
      },
      ...reviews,
    ]);
    setReviewName('');
    setReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.visibility === 'published')
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <button onClick={onBack} className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span>{product.category}</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span>{product.brand}</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery with Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 flex items-center justify-center overflow-hidden shadow-sm relative group">
            <img
              src={activeImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-[#168DE2] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Save {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 p-2 border-2 transition-all shrink-0 ${
                    activeImage === img
                      ? 'border-[#168DE2] shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#168DE2] uppercase tracking-wider">
              <span>{product.brand}</span>
              <span aria-hidden="true">·</span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock Status */}
            <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-bold text-slate-900 dark:text-white">{product.rating}</span>
                <span className="text-slate-400 ml-1">({product.reviewCount} customer ratings)</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              {isOutOfStock ? (
                <span className="text-rose-600 font-bold">Out of Stock</span>
              ) : isLowStock ? (
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  Low Stock: Only {product.stock} units remaining
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stock} available)</span>
                </span>
              )}
            </div>
          </div>

          {/* Pricing in BDT */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {formatBDT(product.salePrice > 0 ? product.salePrice : product.regularPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-base text-slate-400 line-through tabular-nums">
                  {formatBDT(product.regularPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              Inclusive of all VAT & import duties. Official invoice with tax receipt.
            </p>
          </div>

          {/* Color Variations */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                Color Finish: <span className="text-[#168DE2] font-semibold">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      selectedColor === color
                        ? 'border-[#168DE2] bg-[#168DE2]/10 text-[#168DE2]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 px-3 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1.5 py-0.5 text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock && !product.allowBackorders}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-1.5 py-0.5 text-sm disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Max {product.stock} per customer
              </span>
            </div>
          </div>

          {/* CTA Buttons: Add to Bag & Buy Now */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border-2 border-slate-900 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#168DE2] hover:bg-[#123B82] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-40"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Wishlist & Compare Quick Toggles */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                inWishlist ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
            </button>

            <button
              onClick={() => toggleCompare(product.id)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                inCompare ? 'text-[#15C8D9]' : 'text-slate-500 hover:text-[#168DE2]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{inCompare ? 'In Comparison' : 'Compare Device'}</span>
            </button>
          </div>

          {/* Shipping & Warranty Guarantees */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#168DE2] shrink-0" />
              <span><strong>Official Warranty:</strong> {product.warranty}</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Delivery:</strong> Inside Dhaka (৳60, same-day) · Outside Dhaka (৳120, 48h)</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-[#15C8D9] shrink-0" />
              <span><strong>Returns:</strong> 7-Day Replacement Guarantee for manufacturing defects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description & Reviews */}
      <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'specs'
                ? 'text-[#168DE2] border-b-2 border-[#168DE2]'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'desc'
                ? 'text-[#168DE2] border-b-2 border-[#168DE2]'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Detailed Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-[#168DE2] border-b-2 border-[#168DE2]'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Customer Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                {product.specifications.map((spec, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">{spec.label}</span>
                    <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-medium">
                      {spec.value}
                    </span>
                  </div>
                ))}
                {product.weight && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Weight</span>
                    <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs">
                    <span className="font-bold text-slate-500">Dimensions</span>
                    <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{product.dimensions}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="max-w-3xl text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
              <p>{product.description}</p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase mb-2">
                  What’s Inside the Box
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {product.name}, Fast Charging Cable, Official Warranty & Authenticity Documentation, Quick Start Guide.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl space-y-8">
              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{r.name}</span>
                        <span className="text-[11px] text-emerald-600 font-medium">Verified Buyer</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{r.date}</span>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs my-1.5">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{r.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Share Your Feedback
                </h4>
                <p className="text-xs text-slate-500 mb-4">
                  Help fellow tech enthusiasts by writing your verified experience.
                </p>

                {reviewSubmitted && (
                  <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl">
                    Thank you! Your review has been submitted.
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Shakil Ahmed"
                        className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      >
                        <option value={5}>★★★★★ 5 - Exceptional</option>
                        <option value={4}>★★★★☆ 4 - Great</option>
                        <option value={3}>★★★☆☆ 3 - Average</option>
                        <option value={2}>★★☆☆☆ 2 - Poor</option>
                        <option value={1}>★☆☆☆☆ 1 - Terrible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Your Review</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Comment on performance, battery, screen or audio quality..."
                      className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Related {product.category} Hardware
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpenDetails={onOpenProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
