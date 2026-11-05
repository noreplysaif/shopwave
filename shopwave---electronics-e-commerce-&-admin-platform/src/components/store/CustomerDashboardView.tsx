import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Printer,
  ShoppingBag,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatBDT } from '../../utils/shopEngine';
import { Order, OrderStatus } from '../../types';

interface CustomerDashboardViewProps {
  initialTab?: string;
  onOpenProduct: (productId: string) => void;
  onSignOut: () => void;
  onContinueShopping: () => void;
}

const STATUS_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
];

export const CustomerDashboardView: React.FC<CustomerDashboardViewProps> = ({
  initialTab = 'orders',
  onOpenProduct,
  onSignOut,
  onContinueShopping,
}) => {
  const { activeUser, orders, wishlist, toggleWishlist, products, addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Customer orders
  const customerOrders = orders.filter((o) => {
    if (activeUser) {
      return (
        o.customerId === activeUser.id ||
        (o.customerEmail && o.customerEmail.toLowerCase() === activeUser.email.toLowerCase())
      );
    }
    return true; // if demo mode without login, show recent orders
  });

  // Tracked order query
  const trackedOrder = trackingInput.trim()
    ? orders.find(
        (o) =>
          o.orderNumber.toLowerCase() === trackingInput.trim().toLowerCase() ||
          o.id.toLowerCase() === trackingInput.trim().toLowerCase()
      )
    : customerOrders[0] || null;

  // Wishlist products
  const wishlistProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400';
      case 'shipped':
      case 'out_for_delivery':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-400';
      case 'confirmed':
      case 'processing':
      case 'packed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
      case 'cancelled':
      case 'returned':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#168DE2] to-[#123B82] text-white flex items-center justify-center font-bold text-xl mx-auto mb-3 shadow-md">
              {activeUser ? activeUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {activeUser ? activeUser.name : 'Guest Customer'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 truncate">
              {activeUser ? activeUser.email : 'guest@shopwave.com'}
            </p>
            {activeUser && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Orders</div>
                  <div className="font-bold text-slate-900 dark:text-white">{customerOrders.length}</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
                  <div className="text-slate-400 text-[10px]">Total Spent</div>
                  <div className="font-bold text-[#168DE2] tabular-nums">
                    {formatBDT(customerOrders.reduce((sum, o) => sum + o.totalAmount, 0))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#168DE2] text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({customerOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'track'
                  ? 'bg-[#168DE2] text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Order Tracking</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#168DE2] text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({wishlist.length})</span>
            </button>

            {activeUser && (
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors mt-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main Dashboard Content */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Order History</h3>
                <span className="text-xs text-slate-400">{customerOrders.length} records found</span>
              </div>

              {customerOrders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-800 dark:text-white">No orders found</p>
                  <p className="text-xs text-slate-400 mt-1">Start shopping to see your orders here.</p>
                  <button
                    onClick={onContinueShopping}
                    className="mt-4 px-5 py-2.5 bg-[#168DE2] text-white text-xs font-semibold rounded-xl"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-sm text-[#168DE2]">{order.orderNumber}</div>
                          <div className="text-slate-400 text-[11px]">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus.replace('_', ' ')}
                          </span>
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="p-1.5 text-slate-600 hover:text-[#168DE2] dark:text-slate-300"
                            title="View Invoice"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-white dark:bg-slate-800 p-1 shrink-0" />
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-900 dark:text-white truncate">{item.name}</div>
                                <div className="text-slate-400 text-[11px]">
                                  Qty: {item.quantity} {item.color ? `· ${item.color}` : ''}
                                </div>
                              </div>
                            </div>
                            <span className="font-bold tabular-nums shrink-0">{formatBDT(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                        <div>
                          Payment: <strong className="text-slate-800 dark:text-slate-200 uppercase">{order.paymentMethod}</strong> ({order.paymentStatus})
                          {order.trackingNumber && (
                            <span className="ml-3 text-sky-600 font-semibold">Courier Tracking: {order.trackingNumber}</span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          Total: <span className="text-[#168DE2] tabular-nums">{formatBDT(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE ORDER TRACKING */}
          {activeTab === 'track' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Order Shipment Tracking</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check live fulfillment, dispatch, and courier delivery progress
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter ShopWave Order Number (e.g. SW-2026-78412)..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 uppercase font-mono"
                />
              </div>

              {trackedOrder ? (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-700">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">Tracking Order</span>
                      <h4 className="text-lg font-extrabold text-[#168DE2]">{trackedOrder.orderNumber}</h4>
                      <p className="text-xs text-slate-500">
                        Recipient: {trackedOrder.customerName} ({trackedOrder.district})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">Current Status</span>
                      <div className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                        {trackedOrder.orderStatus.replace('_', ' ')}
                      </div>
                      {trackedOrder.trackingNumber && (
                        <div className="text-xs text-emerald-600 font-semibold mt-0.5">
                          Waybill: {trackedOrder.trackingNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Pipeline Visualizer */}
                  <div className="relative py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                      {STATUS_STEPS.map((step, idx) => {
                        const stepIndex = STATUS_STEPS.indexOf(step);
                        const currentStatusIndex = STATUS_STEPS.indexOf(trackedOrder.orderStatus);
                        const isDone = currentStatusIndex >= stepIndex && trackedOrder.orderStatus !== 'cancelled';
                        const isCurrent = trackedOrder.orderStatus === step;

                        return (
                          <div key={step} className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                                isDone
                                  ? 'bg-[#168DE2] text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                              } ${isCurrent ? 'ring-4 ring-[#168DE2]/30 scale-110' : ''}`}
                            >
                              {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`text-[11px] capitalize ${isCurrent ? 'font-bold text-[#168DE2]' : 'text-slate-500'}`}>
                              {step.replace('_', ' ')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {trackedOrder.internalNotes && (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs">
                      <strong className="text-slate-800 dark:text-slate-200">Courier Note:</strong>{' '}
                      <span className="text-slate-500">{trackedOrder.internalNotes}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-slate-400">
                  Please enter an order number to inspect shipment updates.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Saved in Wishlist</h3>
                <span className="text-xs text-slate-400">{wishlistProducts.length} items</span>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Your wishlist is empty</p>
                  <p className="text-xs text-slate-400 mt-1">Tap the heart on any product to save it for later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                      <div className="aspect-[4/3] p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl mb-3">
                        <img src={p.mainImage} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <h4
                          onClick={() => onOpenProduct(p.id)}
                          className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-[#168DE2] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <div className="mt-1 text-sm font-bold text-[#168DE2] tabular-nums">
                          {formatBDT(p.salePrice > 0 ? p.salePrice : p.regularPrice)}
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="flex-1 py-1.5 bg-[#168DE2] text-white text-xs font-semibold rounded-lg hover:bg-[#123B82] flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Invoice Modal for Printing */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div onClick={() => setSelectedInvoiceOrder(null)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <img src="/assets/aistudio/logo_785380fd.png" alt="ShopWave" className="h-8 w-auto mb-2" />
                <div className="text-xs text-slate-500">Official Retail Invoice</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#168DE2]">{selectedInvoiceOrder.orderNumber}</div>
                <div className="text-xs text-slate-400">{new Date(selectedInvoiceOrder.createdAt).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-500">Billed To:</span>
                <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">{selectedInvoiceOrder.customerName}</p>
                <p className="text-slate-500">{selectedInvoiceOrder.customerPhone}</p>
                <p className="text-slate-500">{selectedInvoiceOrder.address}, {selectedInvoiceOrder.district}</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-500">Payment:</span>
                <p className="mt-1 uppercase font-bold text-slate-800 dark:text-slate-200">{selectedInvoiceOrder.paymentMethod}</p>
                <p className="text-slate-500">Status: {selectedInvoiceOrder.paymentStatus}</p>
              </div>
            </div>

            {/* Items */}
            <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {selectedInvoiceOrder.items.map((it, idx) => (
                <div key={idx} className="p-3 flex justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{it.name}</span>
                    <span className="text-slate-400 block text-[11px]">Qty: {it.quantity}</span>
                  </div>
                  <span className="font-bold tabular-nums">{formatBDT(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="text-xs space-y-1 text-right">
              <div>Subtotal: <strong className="tabular-nums">{formatBDT(selectedInvoiceOrder.subtotal)}</strong></div>
              <div>Delivery: <strong className="tabular-nums">{formatBDT(selectedInvoiceOrder.deliveryFee)}</strong></div>
              <div className="text-base font-extrabold text-[#168DE2] pt-2 border-t border-slate-100 dark:border-slate-800">
                Total Payable: {formatBDT(selectedInvoiceOrder.totalAmount)}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#168DE2] text-white rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
