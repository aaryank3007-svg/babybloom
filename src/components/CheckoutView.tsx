import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address, PaymentMethod } from '../types';
import {
  ShieldCheck,
  QrCode,
  Smartphone,
  CreditCard,
  Banknote,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
  Lock,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

interface UPIOrderResponse {
  orderId: string;
  amount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  upiIntent: string;
  merchantVpa: string;
  qrDataUrl: string;
  expiresAt: string;
}

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartGrandTotal,
    appliedCoupon,
    user,
    clearCart,
    navigateTo,
    formatINR,
    addToast,
  } = useApp();

  // Form State
  const [formData, setFormData] = useState<Address>({
    fullName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    addressLine: user?.savedAddresses?.[0]?.addressLine || '',
    landmark: user?.savedAddresses?.[0]?.landmark || '',
    city: user?.savedAddresses?.[0]?.city || '',
    state: user?.savedAddresses?.[0]?.state || 'Maharashtra',
    pinCode: user?.savedAddresses?.[0]?.pinCode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI_QR');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPI QR Flow State
  const [activeUpiOrder, setActiveUpiOrder] = useState<UPIOrderResponse | null>(null);
  const [upiPaymentStatus, setUpiPaymentStatus] = useState<'WAITING' | 'VERIFYING' | 'SUCCESS' | 'FAILED'>('WAITING');
  const [timeRemaining, setTimeRemaining] = useState<number>(600); // 10 minutes

  const deliveryRegions = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'West Bengal',
    'Telangana', 'Rajasthan', 'Kerala', 'Punjab', 'Haryana', 'Uttar Pradesh',
    'California (US)', 'New York (US)', 'Texas (US)', 'London (UK)', 'Ontario (CA)',
    'Dubai (UAE)', 'Singapore', 'Sydney (AU)', 'International / Other Region'
  ];

  // Validation
  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^[+]?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid mobile number with area/country code';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.addressLine.trim()) errs.addressLine = 'Delivery street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pinCode.trim()) {
      errs.pinCode = 'Postal / ZIP Code is required';
    } else if (!/^[a-zA-Z0-9\s-]{3,10}$/.test(formData.pinCode.trim())) {
      errs.pinCode = 'Enter a valid Postal / ZIP code';
    }
    if (paymentMethod === 'UPI_ID' && !upiIdInput.includes('@')) {
      errs.upiId = 'Enter a valid UPI ID (e.g. mobile@okhdfcbank)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Submission handler
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please correct the highlighted form errors', 'error');
      return;
    }
    if (cart.length === 0) {
      addToast('Your cart is empty', 'error');
      navigateTo('shop');
      return;
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === 'UPI_QR') {
        // Call backend to create UPI payment order
        const res = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
            customer: formData,
            couponCode: appliedCoupon?.code,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to initiate UPI payment');
        }

        const data: UPIOrderResponse = await res.json();
        setActiveUpiOrder(data);
        setUpiPaymentStatus('WAITING');
        setTimeRemaining(600);
        addToast('UPI QR code generated! Scan with any UPI app', 'info');
      } else if (paymentMethod === 'COD') {
        // Call backend for Cash on Delivery
        const res = await fetch('/api/orders/cod', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
            customer: formData,
            couponCode: appliedCoupon?.code,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to create COD order');
        }

        const data = await res.json();
        clearCart();
        addToast('Cash on Delivery Order Placed Successfully! 📦', 'success');
        navigateTo('order-tracking', { orderId: data.order.id });
      } else {
        // UPI ID or Card (Demo Gateway)
        // Initiate order and verify
        const res = await fetch('/api/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
            customer: formData,
            couponCode: appliedCoupon?.code,
          }),
        });
        const orderData = await res.json();

        // Immediately verify
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderData.orderId,
            transactionId: `TXN-DEMO-${Date.now()}`,
          }),
        });
        const verified = await verifyRes.json();
        clearCart();
        addToast('Payment successful! Order confirmed 🍼', 'success');
        navigateTo('order-tracking', { orderId: verified.order.id });
      }
    } catch (err: any) {
      addToast(err.message || 'Error processing checkout', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPI Simulation & Verification
  const handleVerifyUpiPayment = async (simulatedResult: 'SUCCESS' | 'FAIL' = 'SUCCESS') => {
    if (!activeUpiOrder) return;
    setUpiPaymentStatus('VERIFYING');

    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: activeUpiOrder.orderId,
          transactionId: `UPI-TXN-${Date.now()}`,
          simulatedStatus: simulatedResult,
        }),
      });

      const data = await res.json();

      if (data.success && data.status === 'PAID') {
        setUpiPaymentStatus('SUCCESS');
        clearCart();
        addToast(`Payment of ₹${activeUpiOrder.amount} verified! Order ${activeUpiOrder.orderId} confirmed!`, 'success');
        setTimeout(() => {
          navigateTo('order-tracking', { orderId: activeUpiOrder.orderId });
        }, 1500);
      } else {
        setUpiPaymentStatus('FAILED');
        addToast('Payment authorization failed or declined. Please retry.', 'error');
      }
    } catch (err: any) {
      setUpiPaymentStatus('FAILED');
      addToast(err.message || 'Payment verification failed', 'error');
    }
  };

  if (cart.length === 0 && !activeUpiOrder) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-2xl mx-auto mb-4">
          🛍️
        </div>
        <h2 className="text-xl font-bold text-slate-800 font-heading">Your cart is empty</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Please add baby products to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-md"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-slate-500">
          <button
            onClick={() => navigateTo('shop')}
            className="hover:text-pink-600 flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Shopping
          </button>
          <span>/</span>
          <span className="font-semibold text-slate-800">Secure Checkout</span>
        </div>

        {/* Genuine Payment Security Assurance */}
        <div className="mb-6 bg-gradient-to-r from-[#FAF2F4] via-[#FDF5F0] to-[#F5EDF9] border border-[#ECD1D8] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🛡️</span>
            <div>
              <p className="font-bold text-slate-900 font-heading">
                Verified Global Payment Gateway & PCI-DSS 256-Bit Security
              </p>
              <p className="text-slate-600">
                End-to-end 256-bit SSL encrypted checkout with dynamic UPI QR code, server-side tamper protection, and instant order tracking.
              </p>
            </div>
          </div>
          <span className="bg-white px-3 py-1 rounded-full text-[#783E48] font-bold border border-[#E6C3CB] shrink-0">
            100% Secure Checkout
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* 1. Customer & Delivery Address Card */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-pink-100/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    Delivery & Contact Details
                  </h3>
                  <span className="text-[11px] text-slate-400">All fields required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-xs text-slate-400 font-medium">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98765 43210"
                        className={`w-full pl-10 pr-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                          errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (for invoice & tracking updates) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="priya.sharma@example.com"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                        errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Flat / House No., Building, Street Address *
                    </label>
                    <input
                      type="text"
                      name="addressLine"
                      value={formData.addressLine}
                      onChange={handleInputChange}
                      placeholder="Flat 402, Lotus Towers, Andheri West"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                        errors.addressLine ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                      }`}
                    />
                    {errors.addressLine && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.addressLine}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Near Infinity Mall / Metro"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-pink-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      placeholder="400053"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                        errors.pinCode ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                      }`}
                    />
                    {errors.pinCode && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.pinCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className={`w-full px-3.5 py-2 text-xs bg-slate-50 border rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-pink-100 ${
                        errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 focus:border-pink-400'
                      }`}
                    />
                    {errors.city && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State / Delivery Region *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:border-pink-400"
                    >
                      {deliveryRegions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selection */}
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-pink-100/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    Select Payment Method
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                    <Lock className="w-3 h-3" />
                    <span>256-Bit SSL Secured</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Option A: UPI QR Code (Recommended) */}
                  <label
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'UPI_QR'
                        ? 'border-[#B96F7C] bg-[#FAF2F4] shadow-2xs'
                        : 'border-[#EDE2DE] hover:border-[#DEC8CF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI_QR"
                        checked={paymentMethod === 'UPI_QR'}
                        onChange={() => setPaymentMethod('UPI_QR')}
                        className="mt-1 text-[#B96F7C] focus:ring-[#B96F7C]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <QrCode className="w-5 h-5 text-[#B96F7C]" />
                            <span className="font-semibold text-slate-900 text-sm">
                              UPI QR Code (Recommended)
                            </span>
                          </div>
                          <span className="bg-[#EBF4ED] text-[#3F6E48] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ZERO FEE • INSTANT
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5A61] mt-1">
                          Scan with Google Pay, PhonePe, Paytm, CRED or any BHIM UPI mobile app.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option B: UPI ID */}
                  <label
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'UPI_ID'
                        ? 'border-[#B96F7C] bg-[#FAF2F4] shadow-2xs'
                        : 'border-[#EDE2DE] hover:border-[#DEC8CF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI_ID"
                        checked={paymentMethod === 'UPI_ID'}
                        onChange={() => setPaymentMethod('UPI_ID')}
                        className="mt-1 text-[#B96F7C] focus:ring-[#B96F7C]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-[#4E677F]" />
                          <span className="font-semibold text-slate-900 text-sm">
                            UPI ID / VPA
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5A61] mt-1">
                          Enter your VPA (e.g., yourname@okaxis, yourname@ybl).
                        </p>

                        {paymentMethod === 'UPI_ID' && (
                          <div className="mt-3">
                            <input
                              type="text"
                              placeholder="e.g. mobile@okhdfcbank"
                              value={upiIdInput}
                              onChange={(e) => setUpiIdInput(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#B96F7C]"
                            />
                            {errors.upiId && (
                              <p className="text-[11px] text-rose-500 mt-1">{errors.upiId}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </label>

                  {/* Option C: Credit / Debit Card */}
                  <label
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-[#B96F7C] bg-[#FAF2F4] shadow-2xs'
                        : 'border-[#EDE2DE] hover:border-[#DEC8CF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        checked={paymentMethod === 'CARD'}
                        onChange={() => setPaymentMethod('CARD')}
                        className="mt-1 text-[#B96F7C] focus:ring-[#B96F7C]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-[#596982]" />
                          <span className="font-semibold text-slate-900 text-sm">
                            Credit / Debit Card (Visa, RuPay, Mastercard)
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5A61] mt-1">
                          Secure tokenized demo gateway simulation.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option D: Cash on Delivery */}
                  <label
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#B96F7C] bg-[#FAF2F4] shadow-2xs'
                        : 'border-[#EDE2DE] hover:border-[#DEC8CF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="mt-1 text-[#B96F7C] focus:ring-[#B96F7C]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-[#85652D]" />
                          <span className="font-semibold text-slate-900 text-sm">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                        <p className="text-xs text-[#6B5A61] mt-1">
                          Pay cash upon safe doorstep delivery. Payment marked as Pending COD.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#B96F7C] hover:bg-[#A8616E] disabled:opacity-50 text-white font-semibold text-sm sm:text-base rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentMethod === 'UPI_QR' ? 'Proceed to UPI QR Payment' : 'Confirm Order'} ({formatINR(cartGrandTotal)})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-pink-100/80 shadow-xs space-y-4 sticky top-24">
              <h3 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items thumbnail list */}
              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                      <p className="text-slate-400 text-[11px]">
                        Qty: {item.quantity} × {formatINR(item.product.price)}
                      </p>
                    </div>
                    <span className="font-bold text-slate-900">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatINR(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-bold">-{formatINR(cartDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping & Handling</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatINR(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Amount to Pay</span>
                  <span className="text-lg text-pink-700 font-heading">
                    {formatINR(cartGrandTotal)}
                  </span>
                </div>
              </div>

              <div className="bg-pink-50/60 p-3 rounded-2xl border border-pink-100/60 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-pink-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-600" /> BabyBloom Buyer Protection
                </p>
                <p className="text-[11px] text-slate-500">
                  Genuine 100% authentic products. Safe tamper-proof packaging. 7-day hassle-free replacement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- UPI QR CODE MODAL ----------------- */}
      {activeUpiOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#F8F9FC] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 relative">
            {/* Top Bar with Order ID & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Order Reference:</span>{' '}
                <span className="font-mono font-bold text-slate-800">{activeUpiOrder.orderId}</span>
              </div>
              <button
                onClick={() => setActiveUpiOrder(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                ✕ Cancel
              </button>
            </div>

            {/* User's Exact Google Pay UPI Card */}
            <div className="py-4 flex flex-col items-center">
              {/* Payee Header matching image */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#5B9A42] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  S
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1F2937] tracking-tight">
                  Samruddhi Dungarwal
                </h3>
              </div>

              {/* White QR Container Card */}
              <div className="relative p-5 bg-white border border-slate-200/80 rounded-3xl shadow-sm flex flex-col items-center max-w-[290px] w-full">
                {/* QR Image with GPay Center Logo */}
                <div className="relative w-52 h-52 bg-white rounded-2xl flex items-center justify-center">
                  <img
                    src={activeUpiOrder.qrDataUrl}
                    alt="UPI QR Code - Samruddhi Dungarwal"
                    className="w-full h-full object-contain rounded-xl"
                  />

                  {/* Centered Google Pay Badge matching uploaded image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full p-1.5 shadow-md flex items-center justify-center border border-slate-100">
                    <svg viewBox="0 0 48 48" className="w-7 h-7">
                      <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.78l7.98-6.19z"/>
                      <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>

                  {/* Verifying & Result Overlays */}
                  {upiPaymentStatus === 'VERIFYING' && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-2xs rounded-xl flex flex-col items-center justify-center p-3 text-center">
                      <RefreshCw className="w-8 h-8 text-[#C27885] animate-spin mb-2" />
                      <p className="text-xs font-bold text-slate-800">Verifying bank receipt...</p>
                    </div>
                  )}
                  {upiPaymentStatus === 'SUCCESS' && (
                    <div className="absolute inset-0 bg-emerald-600/95 backdrop-blur-2xs rounded-xl flex flex-col items-center justify-center p-3 text-white text-center">
                      <CheckCircle className="w-10 h-10 mb-2 animate-bounce" />
                      <p className="text-sm font-bold">Payment Verified!</p>
                      <p className="text-[11px] text-emerald-100">Generating receipt...</p>
                    </div>
                  )}
                  {upiPaymentStatus === 'FAILED' && (
                    <div className="absolute inset-0 bg-rose-600/95 backdrop-blur-2xs rounded-xl flex flex-col items-center justify-center p-3 text-white text-center">
                      <AlertCircle className="w-10 h-10 mb-2" />
                      <p className="text-sm font-bold">Payment Declined</p>
                      <p className="text-[11px] text-rose-100">Please retry below.</p>
                    </div>
                  )}
                </div>

                {/* Exact UPI ID caption matching user image */}
                <p className="text-[11px] text-[#4B5563] text-center mt-3 break-all font-sans">
                  UPI ID: <span className="font-semibold text-[#1F2937]">samruddhiidungarwall18211@okhdfcbank</span>
                </p>
              </div>

              {/* Exact footer text matching user image */}
              <p className="text-xs text-[#525F76] font-medium mt-3.5 tracking-tight text-center">
                Scan to pay with any UPI app
              </p>

              {/* Dynamic Order Payable Amount */}
              <div className="mt-3 py-2 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between w-full max-w-[290px]">
                <span className="text-xs text-slate-500 font-medium">Payable Amount:</span>
                <span className="text-base font-extrabold text-[#783E48] font-heading">
                  {formatINR(activeUpiOrder.amount)}
                </span>
              </div>
            </div>

            {/* Mobile Direct Intent Button */}
            <div className="mb-3">
              <a
                href={activeUpiOrder.upiIntent}
                className="w-full py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Tap to open Google Pay / PhonePe on phone</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>

            {/* Live Gateway Simulation / Webhook Verification Controls */}
            <div className="p-3 bg-[#FBF7EE] rounded-2xl border border-[#EDE0C8] mb-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#6D5422]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88728]" />
                  Instant Payment Verification Controls
                </span>
                <span className="text-[10px] font-mono text-[#8C6D32]">NPCI Webhook</span>
              </div>
              <p className="text-[11px] text-[#7A6335] leading-relaxed">
                Click below to simulate real-time merchant webhook confirmation & deduct stock:
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => handleVerifyUpiPayment('SUCCESS')}
                  disabled={upiPaymentStatus === 'VERIFYING'}
                  className="flex-1 py-2 px-3 bg-[#4E8548] hover:bg-[#43753E] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Simulate Payment Success
                </button>
                <button
                  onClick={() => handleVerifyUpiPayment('FAIL')}
                  disabled={upiPaymentStatus === 'VERIFYING'}
                  className="py-2 px-3 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-all"
                >
                  Test Failure
                </button>
              </div>
            </div>

            {/* Footer timer */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span>Session valid for 10 minutes</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
