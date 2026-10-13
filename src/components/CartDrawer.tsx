import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle,
  Truck,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartGrandTotal,
    cartCount,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    formatINR,
    navigateTo,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon.trim());
    if (ok) setInputCoupon('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-pink-100 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#FFFDFB]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base font-heading">Shopping Bag</h2>
              <p className="text-[11px] text-slate-400">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {cart.length > 0 && (
          <div className="bg-[#FFF4F7] px-4 py-2.5 border-b border-pink-100 text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-pink-800">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-pink-600" />
                    Add <strong className="text-pink-600">{formatINR(amountNeededForFreeDelivery)}</strong> more for FREE Delivery!
                  </span>
                  <span>{Math.round(deliveryProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-pink-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500"
                    style={{ width: `${deliveryProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Congratulations! You qualify for FREE Worldwide Express Delivery 🎉</span>
              </div>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center text-3xl">
                🧸
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Looks like you haven't added any gentle essentials for your little one yet.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('shop');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-md shadow-pink-200 transition-all"
              >
                Start Baby Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-200 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white shrink-0 border border-slate-200"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-slate-400 mb-1.5">
                    {item.product.category} • {formatINR(item.product.price)} each
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <span className="text-xs font-bold text-slate-900">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 rounded transition-colors self-start"
                  title="Remove"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-[#FFFDFB] space-y-3">
            {/* Coupon Application Box */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-{formatINR(appliedCoupon.discount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-rose-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. BABY10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-1.5 text-xs uppercase font-medium bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-pink-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="font-semibold text-slate-800">{formatINR(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Savings</span>
                  <span className="font-bold">-{formatINR(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Charges</span>
                <span className="font-semibold text-slate-800">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatINR(deliveryFee)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Grand Total (INR)</span>
                <span className="text-base text-[#823947] font-heading font-serif">{formatINR(cartGrandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigateTo('checkout');
              }}
              className="w-full py-3 px-4 bg-[#B96F7C] hover:bg-[#A8616E] text-white font-semibold text-sm rounded-2xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Encrypted 256-bit Checkout • UPI QR & COD Accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
