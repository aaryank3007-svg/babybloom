import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Send,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the BabyBloom Family! 🍼 Exclusive tips & coupon sent.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#FAF7F4] border-t border-[#EDE1DC] text-[#4E4046]">
      {/* 1. Value Proposition Strip */}
      <div className="bg-[#F6EEF0] border-b border-[#E9DCE0] py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBE4E6] text-[#7E3D4A] flex items-center justify-center shrink-0 text-xl shadow-2xs">
              🚚
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#35252B]">Free Worldwide Shipping</h4>
              <p className="text-[11px] text-[#716067] mt-0.5">On orders above ₹499 / $50 worldwide</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EEF3] text-[#3E5C77] flex items-center justify-center shrink-0 text-xl shadow-2xs">
              🛡️
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#35252B]">100% Certified Safe</h4>
              <p className="text-[11px] text-[#716067] mt-0.5">Hypoallergenic & pediatrician tested</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EDE1] text-[#785E2E] flex items-center justify-center shrink-0 text-xl shadow-2xs">
              🔄
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#35252B]">7-Day Easy Returns</h4>
              <p className="text-[11px] text-[#716067] mt-0.5">No questions asked replacement</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E7EFE9] text-[#3D6946] flex items-center justify-center shrink-0 text-xl shadow-2xs">
              📱
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#35252B]">Instant UPI QR & COD</h4>
              <p className="text-[11px] text-[#716067] mt-0.5">Zero fee, 256-bit secure checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#F6E8EC] border border-[#ECD3D9] flex items-center justify-center text-xl shadow-2xs">
                🍼
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-[#4F2630] font-heading font-serif">
                  BabyBloom
                </span>
                <p className="text-[10px] text-[#78656B] font-light">Little Things for Little Ones.</p>
              </div>
            </div>

            <p className="text-xs text-[#6A5A61] leading-relaxed max-w-sm font-light">
              Premium worldwide baby care boutique dedicated exclusively to newborn wellness, dermatologically safe skincare, organic apparel, and sensory play essentials.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#38282E] mb-2 font-serif">Get 10% OFF Your First Baby Order:</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#3D6946] font-semibold bg-[#EBF4EE] p-2.5 rounded-xl border border-[#D5E6D8]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for code BABY10</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter parent email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#E4D8D3] rounded-xl focus:outline-hidden focus:border-[#C47D8A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#B96F7C] hover:bg-[#A8616E] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Baby Care' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Baby Skincare & Lotions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Diapering' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Tape Diapers & Wipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Feeding' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Glass Feeding Bottles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Clothing' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Organic Cotton Rompers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'Toys & Accessories' })}
                  className="hover:text-pink-600 transition-colors"
                >
                  Neem Rattles & Teethers
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Customer Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => navigateTo('order-tracking')} className="hover:text-pink-600 transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-pink-600 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-pink-600 transition-colors">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-pink-600 transition-colors">
                  About BabyBloom
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-pink-600 transition-colors font-medium text-pink-700">
                  Store Admin Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Global E-Commerce Compliance */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Policies & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={() => navigateTo('shipping-policy')} className="hover:text-pink-600 transition-colors">
                  Shipping & Dispatch Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns-policy')} className="hover:text-pink-600 transition-colors">
                  Return & Refund Terms
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy-policy')} className="hover:text-pink-600 transition-colors">
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms-conditions')} className="hover:text-pink-600 transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Payment Badges & Academic Disclosure */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-600 mr-1">Accepted Payment Modes:</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">UPI QR Code</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">Google Pay</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">PhonePe</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">Paytm</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">RuPay</span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-[10px] text-slate-700">Cash on Delivery</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400">
            © 2026 BabyBloom. Little Things for Little Ones. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
