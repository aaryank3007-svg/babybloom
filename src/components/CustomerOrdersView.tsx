import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { ShoppingBag, ArrowRight, Truck, CheckCircle, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

export const CustomerOrdersView: React.FC = () => {
  const { user, navigateTo, formatINR } = useApp();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const url = user?.email ? `/api/orders?email=${encodeURIComponent(user.email)}` : '/api/orders';
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (e) {
        console.error('Failed to load orders', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-pink-600" />
              My Orders & Receipts
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              View your past purchases, download tax invoices, and track live deliveries
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-xs text-pink-600 font-semibold hover:text-pink-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            Loading your order history...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center text-3xl mx-auto">
              📦
            </div>
            <h3 className="font-bold text-slate-800 text-base">No orders placed yet</h3>
            <p className="text-xs text-slate-500">
              When you complete an order via UPI QR or Cash on Delivery, your receipts will appear here.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-white rounded-3xl border border-pink-100/80 p-5 shadow-xs hover:border-pink-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {o.id}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        o.paymentStatus === 'PAID'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.paymentStatus === 'PENDING_COD'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {o.paymentStatus === 'PAID' ? 'PAID ONLINE' : o.paymentStatus}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    {new Date(o.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {o.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs bg-slate-50 p-2.5 rounded-2xl">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-10 h-10 rounded-xl object-cover bg-white border border-slate-200"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                        <p className="text-slate-400 text-[11px]">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-slate-900">{formatINR(item.subtotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-500">Total Paid: </span>
                    <strong className="text-slate-900 text-sm">{formatINR(o.grandTotal)}</strong>
                    <span className="text-slate-400 text-[11px] ml-2">({o.paymentMethod})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('order-tracking', { orderId: o.id })}
                      className="px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
