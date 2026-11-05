import React, { useState } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../utils/shopEngine';
import { Coupon } from '../../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon, updateCoupon } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minPurchase, setMinPurchase] = useState<number>(10000);
  const [maxDiscount, setMaxDiscount] = useState<number>(5000);
  const [expiryDate, setExpiryDate] = useState('2027-12-31');
  const [usageLimit, setUsageLimit] = useState<number>(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase),
      maxDiscount: discountType === 'percentage' ? Number(maxDiscount) : undefined,
      expiryDate,
      usageLimit: Number(usageLimit),
      isActive: true,
    });

    setIsAdding(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Promotions & Coupons
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create discount promo codes for flash sales, festivals, and new buyers.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Close Form' : 'Create Coupon'}</span>
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
        >
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">New Discount Coupon</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. EID2026"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full p-2.5 rounded-xl border font-mono uppercase bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              >
                <option value="percentage">Percentage (%) Discount</option>
                <option value="fixed">Fixed Amount (৳) Discount</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Discount Value {discountType === 'percentage' ? '(%)' : '(৳)'} *
              </label>
              <input
                type="number"
                required
                min="1"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Minimum Order Subtotal (৳)</label>
              <input
                type="number"
                min="0"
                value={minPurchase}
                onChange={(e) => setMinPurchase(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            {discountType === 'percentage' && (
              <div>
                <label className="block font-semibold mb-1">Max Cap Discount (৳)</label>
                <input
                  type="number"
                  min="0"
                  value={maxDiscount}
                  onChange={(e) => setMaxDiscount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold mb-1">Expiration Date</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Usage Limit (0 for unlimited)</label>
              <input
                type="number"
                min="0"
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#168DE2] text-white rounded-xl text-xs font-bold"
            >
              Save Coupon
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <th className="p-3.5">Code</th>
                <th className="p-3.5">Discount</th>
                <th className="p-3.5">Min Spend</th>
                <th className="p-3.5">Usage</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3.5 font-bold font-mono text-[#168DE2] text-sm">
                    {c.code}
                  </td>
                  <td className="p-3.5 font-bold">
                    {c.discountType === 'percentage' ? `${c.discountValue}% Off` : formatBDT(c.discountValue)}
                    {c.maxDiscount ? ` (Max ${formatBDT(c.maxDiscount)})` : ''}
                  </td>
                  <td className="p-3.5 tabular-nums">{formatBDT(c.minPurchase)}</td>
                  <td className="p-3.5 tabular-nums">
                    {c.usageCount} / {c.usageLimit > 0 ? c.usageLimit : '∞'} used
                  </td>
                  <td className="p-3.5 text-slate-500">{c.expiryDate}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => updateCoupon(c.id, { isActive: !c.isActive })}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.isActive ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
