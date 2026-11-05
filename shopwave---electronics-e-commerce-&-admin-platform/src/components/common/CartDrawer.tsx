import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT, calculateCartSubtotal, calculateCouponDiscount } from '../../utils/shopEngine';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  const { cart, updateCartQuantity, removeFromCart, coupons } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = calculateCartSubtotal(cart);
  const activeCoupon = appliedCouponCode
    ? coupons.find((c) => c.code.toUpperCase() === appliedCouponCode.toUpperCase())
    : null;

  const { discountAmount, valid: couponValid, message: couponMessage } = calculateCouponDiscount(
    activeCoupon,
    subtotal
  );

  const finalTotal = Math.max(0, subtotal - (couponValid ? discountAmount : 0));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find((c) => c.code.toUpperCase() === code);
    if (!found) {
      setCouponError('Invalid coupon code. Try WAVE10 or FIRSTBUY.');
      return;
    }

    const testResult = calculateCouponDiscount(found, subtotal);
    if (!testResult.valid) {
      setCouponError(testResult.message);
      return;
    }

    setAppliedCouponCode(code);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#168DE2]" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Shopping Bag</h2>
              <span className="text-xs font-semibold text-slate-500">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart items list or empty state */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explore our curated flagship tech collection and find your next daily driver.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="mt-5 px-5 py-2.5 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor || ''}`}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-contain bg-white dark:bg-slate-800 p-2 shrink-0 border border-slate-200/50 dark:border-slate-700/50"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-0.5"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.selectedColor && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Color: {item.selectedColor}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/40 dark:border-slate-700/40">
                      <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 bg-white dark:bg-slate-900">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5 disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {cart.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-5 space-y-4 bg-white dark:bg-slate-900">
              {/* Coupon section */}
              {appliedCouponCode ? (
                <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCouponCode}</strong> applied (-{formatBDT(discountAmount)})</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-emerald-700 hover:text-rose-600 font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. WAVE10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-transparent focus:bg-white focus:border-[#168DE2] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                    {formatBDT(subtotal)}
                  </span>
                </div>
                {couponValid && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Delivery</span>
                  <span>Calculated at checkout (৳60 / ৳120)</span>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-[#168DE2] tabular-nums">{formatBDT(finalTotal)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#168DE2] hover:bg-[#123B82] text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Genuine Warranty & Free returns within 7 days</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
