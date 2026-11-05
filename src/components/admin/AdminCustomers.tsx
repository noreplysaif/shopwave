import React, { useState } from 'react';
import { Users, Search, Ban, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../utils/shopEngine';
import { Customer } from '../../types';

export const AdminCustomers: React.FC = () => {
  const { customers, orders } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);

  const filtered = customers.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
  });

  const getCustOrders = (cust: Customer) => {
    return orders.filter(
      (o) => o.customerId === cust.id || o.customerEmail.toLowerCase() === cust.email.toLowerCase()
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Customer Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review customer accounts, total spend, address history, and order fulfillment.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, email, or phone..."
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
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Orders</th>
                <th className="p-3.5">Total Spent (BDT)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((c) => {
                const custOrders = getCustOrders(c);
                const totalSpent = custOrders.reduce((sum, o) => sum + o.totalAmount, 0);

                return (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                      {c.name}
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-800 dark:text-slate-200">{c.email}</div>
                      <div className="text-[11px] text-slate-400">{c.phone}</div>
                    </td>
                    <td className="p-3.5 font-bold tabular-nums">
                      {custOrders.length} orders
                    </td>
                    <td className="p-3.5 font-bold text-[#168DE2] tabular-nums">
                      {formatBDT(totalSpent)}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          c.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedCust(c)}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-[#168DE2] hover:text-white rounded-lg font-semibold text-xs transition-colors"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setSelectedCust(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedCust.name}</h3>
                <p className="text-xs text-slate-500">{selectedCust.email} · {selectedCust.phone}</p>
              </div>
              <button onClick={() => setSelectedCust(null)} className="text-slate-400">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-400 uppercase">Saved Addresses</span>
              {selectedCust.addresses.length === 0 ? (
                <p className="text-slate-400">No saved addresses on file.</p>
              ) : (
                selectedCust.addresses.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                    <span className="font-bold">{a.label}:</span> {a.address}, {a.area}, {a.district}
                  </div>
                ))
              )}
            </div>

            <div className="pt-2">
              <span className="font-bold text-slate-400 uppercase text-xs">Order History</span>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {getCustOrders(selectedCust).map((o) => (
                  <div key={o.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border flex justify-between text-xs">
                    <div>
                      <div className="font-mono font-bold text-[#168DE2]">{o.orderNumber}</div>
                      <div className="text-[11px] text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold tabular-nums">{formatBDT(o.totalAmount)}</div>
                      <span className="text-[10px] uppercase font-bold text-emerald-600">{o.orderStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
