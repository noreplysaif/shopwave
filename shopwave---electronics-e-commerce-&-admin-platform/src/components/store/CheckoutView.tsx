import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  Printer,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT, calculateCartSubtotal, calculateDeliveryFee, calculateCouponDiscount } from '../../utils/shopEngine';
import { Order, PaymentMethod } from '../../types';

interface CheckoutViewProps {
  onOrderSuccess: (order: Order) => void;
  onNavigateHome: () => void;
  onTrackOrder: (orderNumber: string) => void;
  buyNowItem?: { productId: string; quantity: number; color?: string } | null;
}

const BD_DISTRICTS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Gazipur',
  'Narayanganj',
  'Cox’s Bazar',
];

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  onOrderSuccess,
  onNavigateHome,
  onTrackOrder,
  buyNowItem,
}) => {
  const { cart, products, coupons, placeOrder, activeUser, settings } = useStore();

  // If buyNowItem was provided, checkout specifically that item; otherwise cart
  const checkoutItems = buyNowItem
    ? (() => {
        const p = products.find((prod) => prod.id === buyNowItem.productId);
        if (!p) return cart;
        return [
          {
            productId: p.id,
            name: p.name,
            sku: p.sku,
            price: p.salePrice > 0 ? p.salePrice : p.regularPrice,
            regularPrice: p.regularPrice,
            quantity: buyNowItem.quantity,
            selectedColor: buyNowItem.color,
            image: p.mainImage,
            maxStock: p.stock,
          },
        ];
      })()
    : cart;

  // Form Fields
  const [fullName, setFullName] = useState(activeUser?.name || '');
  const [phone, setPhone] = useState(activeUser?.phone || '');
  const [email, setEmail] = useState(activeUser?.email || '');
  const [district, setDistrict] = useState(activeUser?.addresses[0]?.district || 'Dhaka');
  const [city, setCity] = useState(activeUser?.addresses[0]?.city || 'Dhaka');
  const [area, setArea] = useState(activeUser?.addresses[0]?.area || 'Gulshan 2');
  const [address, setAddress] = useState(activeUser?.addresses[0]?.address || '');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>(
    district.toLowerCase() === 'dhaka' ? 'inside_dhaka' : 'outside_dhaka'
  );

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  // Confirmation state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const subtotal = calculateCartSubtotal(checkoutItems);
  const deliveryFee = calculateDeliveryFee(
    deliveryZone,
    subtotal,
    settings.deliveryFeeInsideDhaka,
    settings.deliveryFeeOutsideDhaka,
    settings.freeDeliveryThreshold
  );

  const activeCouponObj = appliedCoupon
    ? coupons.find((c) => c.code.toUpperCase() === appliedCoupon.toUpperCase())
    : null;

  const { discountAmount, valid: couponValid, message: couponMsg } = calculateCouponDiscount(
    activeCouponObj,
    subtotal
  );

  const totalPayable = Math.max(0, subtotal - (couponValid ? discountAmount : 0) + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const found = coupons.find((c) => c.code.toUpperCase() === code);
    if (!found) {
      setCouponError('Invalid coupon code.');
      return;
    }

    const test = calculateCouponDiscount(found, subtotal);
    if (!test.valid) {
      setCouponError(test.message);
      return;
    }

    setAppliedCoupon(code);
    setCouponInput('');
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard?.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(null), 2500);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (checkoutItems.length === 0) {
      setError('Your shopping bag is empty.');
      return;
    }

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setError('Please provide full name, contact phone number, and street address.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId.trim()) {
      setError(`Please provide your ${paymentMethod.toUpperCase()} Transaction ID to confirm payment verification.`);
      return;
    }

    try {
      const newOrder = placeOrder({
        customerId: activeUser?.id,
        customerName: fullName,
        customerEmail: email || 'customer@shopwave.com',
        customerPhone: phone,
        district,
        city,
        area,
        address,
        deliveryZone,
        deliveryFee,
        items: checkoutItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          sku: item.sku,
          price: item.price,
          quantity: item.quantity,
          color: item.selectedColor,
          image: item.image,
        })),
        subtotal,
        discountAmount: couponValid ? discountAmount : 0,
        couponCode: appliedCoupon || undefined,
        totalAmount: totalPayable,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
        transactionId: transactionId || undefined,
        senderNumber: senderNumber || undefined,
        orderStatus: 'pending',
        internalNotes:
          paymentMethod === 'cod'
            ? 'Cash on Delivery order placed by customer.'
            : `${paymentMethod.toUpperCase()} TrxID provided: ${transactionId}. Pending manual verification.`,
      });

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);
    } catch (err) {
      setError('Could not place order. Please review your details.');
    }
  };

  // If order is completed, show Order Confirmation Screen!
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          Order Placed Successfully
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
          We have received your order <strong>{completedOrder.orderNumber}</strong>. Our customer relations team will verify dispatch shortly.
        </p>

        {/* Invoice Card */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-left shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Order Number</div>
              <div className="text-xl font-bold text-[#168DE2]">{completedOrder.orderNumber}</div>
              <div className="text-xs text-slate-500 mt-1">
                Placed on {new Date(completedOrder.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-slate-400 font-semibold uppercase">Payment Method</div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase">
                {completedOrder.paymentMethod}
              </div>
              {completedOrder.transactionId && (
                <div className="text-xs text-slate-500">TrxID: {completedOrder.transactionId}</div>
              )}
            </div>
          </div>

          {/* Delivery destination */}
          <div className="py-4 border-b border-slate-100 dark:border-slate-800 text-xs space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">Delivery Address:</span>
            <p className="text-slate-600 dark:text-slate-400">
              {completedOrder.customerName} ({completedOrder.customerPhone})
              <br />
              {completedOrder.address}, {completedOrder.area}, {completedOrder.city}, {completedOrder.district}
            </p>
          </div>

          {/* Items */}
          <div className="py-4 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Items Ordered:</span>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded bg-slate-50 dark:bg-slate-800 p-1" />
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
                    <div className="text-[11px] text-slate-400">Qty: {item.quantity} {item.color ? `· ${item.color}` : ''}</div>
                  </div>
                </div>
                <span className="font-bold tabular-nums">{formatBDT(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="tabular-nums font-semibold">{formatBDT(completedOrder.subtotal)}</span>
            </div>
            {completedOrder.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount ({completedOrder.couponCode})</span>
                <span className="tabular-nums">-{formatBDT(completedOrder.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Delivery Fee ({completedOrder.deliveryZone.replace('_', ' ')})</span>
              <span className="tabular-nums font-semibold">{formatBDT(completedOrder.deliveryFee)}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
              <span>Total Paid / Payable</span>
              <span className="text-[#168DE2] tabular-nums">{formatBDT(completedOrder.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onTrackOrder(completedOrder.orderNumber)}
            className="px-6 py-3 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Live Order Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="px-5 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Back to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
        Secure Checkout
      </h1>
      <p className="text-xs text-slate-500 mb-8">
        Fast delivery with official warranty backing across all 64 districts of Bangladesh.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Delivery Details & Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer & Delivery Address */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#168DE2]" />
              <span>1. Customer & Shipping Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone (Bangladesh) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1711 223344"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (For Invoice & Tracking)
                </label>
                <input
                  type="email"
                  placeholder="tanvir.hossain@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    const d = e.target.value;
                    setDistrict(d);
                    setDeliveryZone(d.toLowerCase() === 'dhaka' ? 'inside_dhaka' : 'outside_dhaka');
                  }}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                >
                  {BD_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Area / Thana *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gulshan, Dhanmondi, Agrabad..."
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Complete Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House number, road number, apartment / floor, landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#168DE2]"
                />
              </div>
            </div>

            {/* Delivery Zone Selector */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Delivery Location
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-[#168DE2] bg-[#168DE2]/5'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Inside Dhaka</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {subtotal >= settings.freeDeliveryThreshold ? 'FREE Shipping' : '৳60 · Same-Day / Next-Day'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-[#168DE2] bg-[#168DE2]/5'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-white">Outside Dhaka</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {subtotal >= settings.freeDeliveryThreshold ? 'FREE Shipping' : '৳120 · 2-3 Days via Courier'}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#168DE2]" />
              <span>2. Payment Option</span>
            </h2>

            <div className="space-y-3">
              {/* COD */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#168DE2] bg-[#168DE2]/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#168DE2] focus:ring-[#168DE2]"
                />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    Cash on Delivery (COD)
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pay securely in cash when you receive the sealed package from our courier.
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-[#E2136E] bg-[#E2136E]/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="mt-1 text-[#E2136E] focus:ring-[#E2136E]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      bKash Merchant Payment
                    </span>
                    <span className="bg-[#E2136E] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      bKash
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Send total amount to our verified merchant number and input the Transaction ID.
                  </p>

                  {paymentMethod === 'bkash' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Merchant Number:</span>
                          <span className="font-bold text-slate-900 dark:text-white font-mono">01711-889900</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber('01711889900')}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center gap-1"
                        >
                          {copied === '01711889900' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copied === '01711889900' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">
                            bKash TrxID *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. BK9X8741AZ"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                            className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">
                            Sender bKash Number
                          </label>
                          <input
                            type="tel"
                            placeholder="017XXXXXXXX"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Nagad */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-[#F7941D] bg-[#F7941D]/5'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="mt-1 text-[#F7941D] focus:ring-[#F7941D]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      Nagad Merchant Payment
                    </span>
                    <span className="bg-[#F7941D] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Nagad
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Pay through Nagad App/USSD and provide your Transaction ID below.
                  </p>

                  {paymentMethod === 'nagad' && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div>
                          <span className="text-[11px] text-slate-400 block">Merchant Number:</span>
                          <span className="font-bold text-slate-900 dark:text-white font-mono">01819-778899</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyNumber('01819778899')}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center gap-1"
                        >
                          {copied === '01819778899' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copied === '01819778899' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">
                            Nagad TrxID *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. NG7719240B"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                            className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold mb-1">
                            Sender Nagad Number
                          </label>
                          <input
                            type="tel"
                            placeholder="018XXXXXXXX"
                            value={senderNumber}
                            onChange={(e) => setSenderNumber(e.target.value)}
                            className="w-full p-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary & Placement */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 sticky top-24 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#168DE2]" />
              <span>Order Summary</span>
              <span className="text-xs text-slate-500">({checkoutItems.length} items)</span>
            </h2>

            {/* Itemized list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800">
              {checkoutItems.map((item, idx) => (
                <div key={idx} className="pt-2 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-slate-50 dark:bg-slate-800 p-1 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Qty: {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums shrink-0">
                    {formatBDT(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (WAVE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center justify-between">
                  <span>Coupon {appliedCoupon} active (-{formatBDT(discountAmount)})</span>
                  <button type="button" onClick={() => setAppliedCoupon(null)} className="text-slate-400 hover:text-rose-600">
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  {formatBDT(subtotal)}
                </span>
              </div>
              {couponValid && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span className="tabular-nums">-{formatBDT(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Delivery Charge</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  {deliveryFee === 0 ? 'FREE' : formatBDT(deliveryFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
                <span>Total Payable</span>
                <span className="text-[#168DE2] tabular-nums">{formatBDT(totalPayable)}</span>
              </div>
            </div>

            {/* Submit Place Order Button */}
            <button
              type="submit"
              disabled={checkoutItems.length === 0}
              className="w-full py-4 bg-[#168DE2] hover:bg-[#123B82] text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-40"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Official Warranty Guarantee & 7-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
