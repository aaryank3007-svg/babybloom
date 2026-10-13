import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  CheckCheck,
  Printer,
  ArrowLeft,
  AlertTriangle,
  Building2,
  Phone,
  ShieldCheck,
  Share2
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { selectedOrderId, navigateTo, formatINR, addToast } = useApp();
  const [searchInput, setSearchInput] = useState(selectedOrderId || 'BB-2026-1042');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${id.trim()}`);
      if (!res.ok) {
        throw new Error('Order not found with the specified ID. Please check and try again.');
      }
      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch order');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOrderId) {
      setSearchInput(selectedOrderId);
      fetchOrder(selectedOrderId);
    } else {
      fetchOrder('BB-2026-1042');
    }
  }, [selectedOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchInput);
  };

  const trackingSteps: { status: OrderStatus; label: string; icon: any }[] = [
    { status: 'PENDING', label: 'Order Placed', icon: Clock },
    { status: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
    { status: 'PACKED', label: 'Packed & Sanitized', icon: Package },
    { status: 'SHIPPED', label: 'In Transit', icon: Truck },
    { status: 'DELIVERED', label: 'Delivered', icon: CheckCheck },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PACKED': return 2;
      case 'SHIPPED': return 3;
      case 'DELIVERED': return 4;
      case 'CANCELLED': return -1;
      default: return 1;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-pink-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
          <div className="text-xs text-slate-400">
            Live Fulfillment Tracking • BabyBloom Logistics
          </div>
        </div>

        {/* Search Bar Header */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-pink-100 shadow-xs">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-1">
            Track Your BabyBloom Order
          </h1>
          <p className="text-xs text-slate-500 mb-4">
            Enter your order tracking reference (e.g., <code className="bg-pink-50 text-pink-700 px-1.5 py-0.5 rounded font-bold">BB-2026-1042</code> or your new order ID)
          </p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. BB-2026-1042)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                className="w-full pl-10 pr-4 py-2.5 text-xs uppercase font-mono font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-pink-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-200 transition-all flex items-center gap-1.5"
            >
              <span>{isLoading ? 'Searching...' : 'Track'}</span>
            </button>
          </form>

          {/* Quick links to sample orders for evaluation demo */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Sample Demo Orders:</span>
            <button
              type="button"
              onClick={() => {
                setSearchInput('BB-2026-1042');
                fetchOrder('BB-2026-1042');
              }}
              className="bg-pink-50 hover:bg-pink-100 text-pink-700 px-2 py-0.5 rounded font-mono font-bold text-[11px]"
            >
              BB-2026-1042 (UPI Shipped)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput('BB-2026-1039');
                fetchOrder('BB-2026-1039');
              }}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-bold text-[11px]"
            >
              BB-2026-1039 (COD Delivered)
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-xs text-rose-700">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
            {/* Header info */}
            <div className="p-5 sm:p-6 bg-[#FFFDFB] border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-400">Order ID:</span>
                  <span className="font-mono font-extrabold text-slate-900 text-base">
                    {order.id}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      order.paymentStatus === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.paymentStatus === 'PENDING_COD'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {order.paymentStatus === 'PAID'
                      ? 'PAID ONLINE'
                      : order.paymentStatus === 'PENDING_COD'
                      ? 'CASH ON DELIVERY'
                      : 'PAYMENT PENDING'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="p-5 sm:p-8 border-b border-slate-100 bg-white">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Shipment Status Timeline
              </h2>

              <div className="relative">
                {/* Horizontal Progress line */}
                <div className="hidden sm:block absolute top-5 left-6 right-6 h-1 bg-slate-100 z-0">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-700"
                    style={{
                      width: `${(Math.max(0, getStepIndex(order.orderStatus)) / 4) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10">
                  {trackingSteps.map((step, idx) => {
                    const currentIdx = getStepIndex(order.orderStatus);
                    const isCompleted = idx <= currentIdx;
                    const isCurrent = idx === currentIdx;
                    const Icon = step.icon;

                    return (
                      <div key={step.status} className="flex flex-col items-center text-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs mb-2 ${
                            isCompleted
                              ? 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-pink-200'
                              : 'bg-slate-100 text-slate-400'
                          } ${isCurrent ? 'ring-4 ring-pink-100 scale-110' : ''}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] text-pink-600 font-extrabold mt-0.5">
                            Current Stage
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Courier info box */}
              {order.tracking && (
                <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        Carrier: {order.tracking.courierName}
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        AWB: <span className="font-mono font-medium">{order.tracking.trackingNumber}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[11px] block">Estimated Delivery</span>
                    <span className="font-bold text-slate-900 text-xs">
                      {order.tracking.estimatedDelivery}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Items & Address Details */}
            <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Items List */}
              <div className="md:col-span-7 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Ordered Items ({order.items.length})
                </h3>
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between gap-3 text-xs border border-slate-100"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.productName}</p>
                          <p className="text-slate-400 text-[11px]">
                            Qty: {item.quantity} × {formatINR(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0">
                        {formatINR(item.subtotal)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Summary */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatINR(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({order.couponCode})</span>
                      <span>-{formatINR(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{order.deliveryFee === 0 ? 'FREE' : formatINR(order.deliveryFee)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-pink-700 font-heading">{formatINR(order.grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address & Payment details */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Delivery Destination
                  </h3>
                  <p className="font-bold text-slate-900">{order.customer.fullName}</p>
                  <p className="text-slate-600 leading-relaxed">
                    {order.customer.addressLine}
                    {order.customer.landmark ? `, Near ${order.customer.landmark}` : ''}
                    <br />
                    {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
                  </p>
                  <p className="text-slate-500 pt-1">
                    Phone: <span className="font-semibold text-slate-800">+91 {order.customer.phone}</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <h3 className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Payment Details
                  </h3>
                  <p className="flex justify-between">
                    <span className="text-slate-500">Method:</span>
                    <span className="font-bold text-slate-800">
                      {order.paymentMethod === 'UPI_QR'
                        ? 'UPI QR Code'
                        : order.paymentMethod === 'COD'
                        ? 'Cash on Delivery'
                        : order.paymentMethod}
                    </span>
                  </p>
                  {order.paymentDetails?.transactionId && (
                    <p className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Ref ID:</span>
                      <span className="font-mono text-slate-700">
                        {order.paymentDetails.transactionId}
                      </span>
                    </p>
                  )}
                </div>

                <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100 text-xs text-pink-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>Backed by BabyBloom 100% Quality Assurance</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
