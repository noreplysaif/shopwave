import React from 'react';
import { X, Trash2, ShoppingBag, Check, Shield } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../utils/shopEngine';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProduct: (productId: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose, onOpenProduct }) => {
  const { compareList, removeFromCompare, products, addToCart } = useStore();

  if (!isOpen) return null;

  const comparedProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Product Comparison ({comparedProducts.length} of 4)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side technical specs, official pricing, and warranty details
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">No products added for comparison yet.</p>
            <p className="text-xs text-slate-400 mt-1">
              Click the scale icon on any product card in the store to compare up to 4 items.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-x-auto py-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3 w-40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50 rounded-l-xl">
                    Attribute
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-3 text-center align-top relative min-w-[200px]">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl p-2">
                        <img src={p.mainImage} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <h4
                        onClick={() => {
                          onClose();
                          onOpenProduct(p.id);
                        }}
                        className="text-xs font-semibold text-slate-900 dark:text-white hover:text-[#168DE2] cursor-pointer line-clamp-2"
                      >
                        {p.name}
                      </h4>
                      <div className="mt-2 text-sm font-bold text-[#168DE2] tabular-nums">
                        {formatBDT(p.salePrice > 0 ? p.salePrice : p.regularPrice)}
                      </div>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="mt-3 w-full py-1.5 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Brand</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center font-medium text-slate-800 dark:text-slate-200">
                      {p.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Category</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-slate-700 dark:text-slate-300">
                      {p.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Availability</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {p.stock > 0 ? (
                        <span className="text-emerald-600 font-medium">In Stock ({p.stock} units)</span>
                      ) : (
                        <span className="text-rose-500 font-medium">Out of stock</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Warranty</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-slate-600 dark:text-slate-400">
                      {p.warranty}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500">Rating</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-center text-slate-800 dark:text-slate-200">
                      ★ {p.rating} ({p.reviewCount} reviews)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-500 align-top">Key Specs</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-left">
                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                        {p.specifications.slice(0, 4).map((spec, idx) => (
                          <li key={idx}>
                            <strong>{spec.label}:</strong> {spec.value}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
