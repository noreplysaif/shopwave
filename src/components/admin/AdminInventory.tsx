import React, { useState } from 'react';
import { Package, AlertTriangle, CheckCircle2, Search, ArrowUpDown, Save } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../utils/shopEngine';

export const AdminInventory: React.FC = () => {
  const { products, adjustStock, updateProduct } = useStore();
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [reason, setReason] = useState('Stock Intake');

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleStartEdit = (id: string, current: number) => {
    setEditingId(id);
    setNewStockVal(current);
    setReason('Stock Intake');
  };

  const handleSaveStock = (id: string) => {
    adjustStock(id, newStockVal, reason);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Inventory Control & Stock Adjustments
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time warehouse stock tracking. Prevents overselling during customer checkout.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search inventory by title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <th className="p-3.5">Item</th>
                <th className="p-3.5">SKU</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Alert Level</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img src={item.mainImage} alt="" className="w-10 h-10 object-contain rounded bg-slate-100 dark:bg-slate-800 p-1" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white truncate max-w-xs">{item.name}</div>
                          <div className="text-[11px] text-slate-400">{item.category}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400 font-semibold">
                      {item.sku}
                    </td>

                    <td className="p-3.5">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          value={newStockVal}
                          onChange={(e) => setNewStockVal(Number(e.target.value))}
                          className="w-20 p-1.5 rounded-lg border text-xs font-bold tabular-nums"
                        />
                      ) : (
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white tabular-nums">
                          {item.stock}
                        </span>
                      )}
                    </td>

                    <td className="p-3.5 text-slate-500 tabular-nums">
                      ≤ {item.lowStockThreshold} units
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.stock <= 0
                            ? 'bg-rose-100 text-rose-800'
                            : item.stock <= item.lowStockThreshold
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.stockStatus.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-2">
                          <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="p-1 text-[11px] rounded border"
                          >
                            <option value="New Shipment Received">New Shipment</option>
                            <option value="Physical Audit Adjustment">Audit Count</option>
                            <option value="Damaged / Write-off">Write-off</option>
                          </select>
                          <button
                            onClick={() => handleSaveStock(item.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 border rounded-lg text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(item.id, item.stock)}
                          className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-[#168DE2] hover:text-white text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Adjust Stock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
