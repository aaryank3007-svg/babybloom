import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ChevronDown, ChevronUp, ShoppingBag, QrCode, ShieldCheck, Truck, LayoutDashboard, Code2, PlusCircle } from 'lucide-react';

export const PresentationGuideBanner: React.FC = () => {
  const { navigateTo, addToCart, products, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  const handleFillDemoCart = () => {
    if (products.length >= 2) {
      addToCart(products[0], 1);
      addToCart(products[6], 1);
      addToast('Demo items added to cart! Open Cart or proceed to Checkout', 'success');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#703D49] via-[#61333F] to-[#4A373E] text-[#F9F4F2] shadow-xs text-xs sm:text-sm border-b border-[#5C2B36]">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="bg-white/15 px-2.5 py-0.5 rounded-full font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 text-[#F6DCD8]">
            <Sparkles className="w-3.5 h-3.5 text-[#E6C280]" />
            New Parent Perks • Free Shipping above ₹499
          </span>
          <span className="hidden md:inline text-[#E8D4D7] text-xs font-light">
            BabyBloom — Premium Baby Care Boutique with UPI & Worldwide Checkout
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-xs font-medium bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-lg transition-colors text-[#F5E6E8]"
          >
            <span>{isOpen ? 'Hide Shortcuts' : 'Store Shortcuts'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/20 py-2 px-4 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#E7C6CD] mr-1">Quick Shortcuts:</span>
              <button
                onClick={() => navigateTo('shop')}
                className="bg-white/10 hover:bg-white/20 text-[#FAF2F4] px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium"
              >
                <ShoppingBag className="w-3 h-3 text-[#E6BAC3]" />
                1. Catalogue & Filters
              </button>
              <button
                onClick={handleFillDemoCart}
                className="bg-[#D9A354]/20 hover:bg-[#D9A354]/30 text-[#FCE8B8] border border-[#D9A354]/40 px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium"
                title="Populates cart with 2 sample products"
              >
                <PlusCircle className="w-3 h-3 text-[#F5D591]" />
                Quick Populate Cart
              </button>
              <button
                onClick={() => navigateTo('checkout')}
                className="bg-white/10 hover:bg-white/20 text-[#FAF2F4] px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium"
              >
                <QrCode className="w-3 h-3 text-[#D5B7EE]" />
                2. UPI QR Checkout
              </button>
              <button
                onClick={() => navigateTo('order-tracking', { orderId: 'BB-2026-1042' })}
                className="bg-white/10 hover:bg-white/20 text-[#FAF2F4] px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium"
              >
                <Truck className="w-3 h-3 text-[#B4E3D5]" />
                3. Live Order Tracking
              </button>
            </div>
            <div className="text-[11px] text-[#E0CFD3] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A5D6A7]" />
              <span>Official UPI QR & International Payment Gateway • Standard (₹)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
