import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, HeartHandshake, Truck, ArrowRight, Award } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF8F6] via-[#F8F3F1] to-[#FAF7F4] pt-6 pb-12 md:py-16">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F5E6EA]/50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#EBF0F5]/50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#F5E9EC] border border-[#ECD1D8] px-3.5 py-1.5 rounded-full text-[#7B3543] text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B96F7C]" />
              <span>Dermatologically Approved & 100% Toxin-Free</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#35252B] tracking-tight leading-[1.18] font-heading font-serif">
              Gentle care for <br />
              <span className="italic font-normal text-[#9E5362]">
                little miracles
              </span>{' '}
              every day.
            </h1>

            <p className="text-[#635359] text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              From organic skin nourishment and leak-lock diapers to safe feeding bottles and cuddly cotton wear — thoughtfully curated for conscious parents worldwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3.5 bg-[#B96F7C] hover:bg-[#A8616E] text-white font-semibold rounded-2xl shadow-sm transition-all flex items-center gap-2 text-sm group"
              >
                <span>Shop Baby Essentials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('shop', { category: 'Baby Care' })}
                className="px-5 py-3.5 bg-white hover:bg-[#FAF4F6] border border-[#E9DADF] text-[#7B3543] font-semibold rounded-2xl transition-all text-sm shadow-2xs"
              >
                Explore Newborn Care
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-[#EFE4E7] grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#EBF4ED] text-[#477C4E] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#4D4045]">100% Non-Toxic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F6EAEE] text-[#8A3B4B] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#4D4045]">Pediatrician Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#ECF1F6] text-[#43627C] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#4D4045]">Free Ship &gt; ₹499</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#FAF3E8] text-[#836329] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span className="font-medium text-[#4D4045]">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Cute framing card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-200 border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
                  alt="BabyBloom baby shopping"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                {/* Floating promo badge inside */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl">
                      👶
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Welcome Parent Offer</p>
                      <p className="text-[11px] text-slate-500">Use code <span className="font-bold text-pink-600">BABY10</span> for 10% off</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg border border-pink-100 hidden sm:flex items-center gap-2.5">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800">4.9 / 5 Rating</span>
                  </div>
                  <span className="text-[10px] text-slate-400">12,000+ Happy Parents Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
