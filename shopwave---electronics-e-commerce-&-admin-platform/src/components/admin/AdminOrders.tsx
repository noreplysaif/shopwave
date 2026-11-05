import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  XCircle,
  Truck,
  Printer,
  Download,
  AlertCircle,
  Clock,
  Eye,
  Edit,
  Save,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus, PaymentStatus } from '../../types';
import { formatBDT } from '../../utils/shopEngine';

const ALL_STATUSES: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'returned',
  'refunded',
];

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, verifyPayment } = useStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [paymentFilter, setPaymentFilter] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Quick edit note & tracking inside modal
  const [editingNotes, setEditingNotes] = useState('');
  const [editingTracking, setEditingTracking] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        (o.transactionId && o.transactionId.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (statusFilter && o.orderStatus !== statusFilter) return false;
    if (paymentFilter && o.paymentMethod !== paymentFilter) return false;
    return true;
  });

  const handleOpenOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditingNotes(order.internalNotes || '');
    setEditingTracking(order.trackingNumber || '');
  };

  const handleSaveDetails = () => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, selectedOrder.orderStatus, editingNotes, editingTracking);
    setSelectedOrder({
      ...selectedOrder,
      internalNotes: editingNotes,
      trackingNumber: editingTracking,
    });
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    }
  };

  const handleVerify = (orderId: string, verified: boolean) => {
    verifyPayment(orderId, verified);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus: verified ? 'verified' : 'failed',
        orderStatus: verified && selectedOrder.orderStatus === 'pending' ? 'confirmed' : selectedOrder.orderStatus,
      });
    }
  };

  const handleExportOrdersCSV = () => {
    const headers = 'OrderNumber,Date,CustomerName,Phone,District,PaymentMethod,PaymentStatus,OrderStatus,Total\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.orderNumber}","${o.createdAt}","${o.customerName}","${o.customerPhone}","${o.district}","${o.paymentMethod}","${o.paymentStatus}","${o.orderStatus}",${o.totalAmount}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ShopWave_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Order Fulfillment & Verification
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Process incoming orders, verify bKash/Nagad transactions, and manage deliveries.
          </p>
        </div>

        <button
          onClick={handleExportOrdersCSV}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Filter strip */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search order number, customer name, phone, or TrxID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <option value="">All Statuses</option>
          {ALL_STATUSES.map((st) => (
            <option key={st} value={st}>
              {st.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <option value="">All Payment Types</option>
          <option value="cod">Cash on Delivery (COD)</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5">Total (BDT)</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Order Number */}
                    <td className="p-3.5">
                      <div className="font-bold text-[#168DE2] font-mono">{order.orderNumber}</div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-900 dark:text-white">{order.customerName}</div>
                      <div className="text-[11px] text-slate-400">{order.customerPhone} ({order.district})</div>
                    </td>

                    {/* Payment Info */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold uppercase text-slate-800 dark:text-slate-200">
                          {order.paymentMethod}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                            order.paymentStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                      {order.transactionId && (
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Trx: {order.transactionId}
                        </div>
                      )}
                    </td>

                    {/* Fulfillment Status Selector */}
                    <td className="p-3.5">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-800 dark:text-slate-200"
                      >
                        {ALL_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st.replace('_', ' ').toUpperCase()}
                          </option>
                        ))}
                      </select>
                      {order.trackingNumber && (
                        <div className="text-[10px] text-sky-600 mt-0.5 font-medium">
                          {order.trackingNumber}
                        </div>
                      )}
                    </td>

                    {/* Total Amount */}
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white tabular-nums">
                      {formatBDT(order.totalAmount)}
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleOpenOrder(order)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#168DE2] hover:text-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setSelectedOrder(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Order Details</span>
                <h3 className="text-xl font-bold text-[#168DE2]">{selectedOrder.orderNumber}</h3>
                <p className="text-xs text-slate-500">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
                <button onClick={() => setSelectedOrder(null)} className="p-1.5 text-slate-400">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Payment Verification Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Payment Method: {selectedOrder.paymentMethod.toUpperCase()}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      selectedOrder.paymentStatus === 'verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                {selectedOrder.transactionId && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-mono">
                    Transaction ID: <strong>{selectedOrder.transactionId}</strong> (Sender: {selectedOrder.senderNumber || 'N/A'})
                  </p>
                )}
              </div>

              {selectedOrder.paymentStatus !== 'verified' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVerify(selectedOrder.id, true)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify Payment</span>
                  </button>
                  <button
                    onClick={() => handleVerify(selectedOrder.id, false)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* Customer & Shipping info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase">Customer Info</span>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedOrder.customerName}</p>
                <p className="text-slate-500">{selectedOrder.customerPhone}</p>
                <p className="text-slate-500">{selectedOrder.customerEmail}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase">Delivery Address</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedOrder.address}</p>
                <p className="text-slate-500">
                  {selectedOrder.area}, {selectedOrder.city}, {selectedOrder.district} (Zone: {selectedOrder.deliveryZone})
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Ordered Products</span>
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden text-xs">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-10 object-contain rounded bg-slate-50 dark:bg-slate-800 p-1" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                        <div className="text-[11px] text-slate-400">
                          SKU: {item.sku} {item.color ? `· Color: ${item.color}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold tabular-nums">{formatBDT(item.price * item.quantity)}</div>
                      <div className="text-[10px] text-slate-400">{item.quantity} x {formatBDT(item.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking ID & Notes Update */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Courier Tracking ID (e.g. RedX / Pathao)</label>
                <input
                  type="text"
                  placeholder="e.g. RDX-DH-98412"
                  value={editingTracking}
                  onChange={(e) => setEditingTracking(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Internal Fulfillment Notes</label>
                <input
                  type="text"
                  placeholder="Notes for dispatch or courier..."
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleSaveDetails}
                className="px-4 py-2 bg-[#168DE2] hover:bg-[#123B82] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes & Waybill</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
