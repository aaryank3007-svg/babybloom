import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { FeaturedCategories } from './FeaturedCategories';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Tag,
  Heart,
  CheckCircle2,
  Gift
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, navigateTo, addToCart } = useApp();

  // Deal of the Day countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  const testimonials = [
    {
      name: 'Dr. Shalini Mehta',
      city: 'Pediatric Specialist',
      babyAge: 'Mother of 5-month old twins',
      avatar: '👩‍⚕️',
      review:
        'As a pediatrician, I am exceptionally cautious about infant cosmetics. BabyBloom’s shea calendula lotion and pure water bamboo wipes are benchmarked to European safety standards. Gentle, pure, and non-sticky!',
      rating: 5,
    },
    {
      name: 'Sarah & David Jenkins',
      city: 'London, UK',
      babyAge: 'Parents of 8-month old Oliver',
      avatar: '👨‍👩‍👦',
      review:
        'The anti-colic borosilicate glass bottle and weighted straw sippy cup reduced our baby’s gas issues drastically. Seamless worldwide checkout with instant invoice tracking made shopping a breeze.',
      rating: 5,
    },
    {
      name: 'Elena & Marco Silva',
      city: 'Toronto, Canada',
      babyAge: 'Parents of 1-year old Maya',
      avatar: '👩',
      review:
        'Ordered the luxury newborn gift hamper for our baby shower. It arrived within 2 days in beautiful keepsake packaging. The organic cotton rompers and natural wooden rattles are extraordinarily soft!',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Featured Categories Grid */}
      <FeaturedCategories />

      {/* 3. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[#9E5362] font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#B96F7C]" />
              Loved by Thousands of Parents
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35252B] font-heading font-serif">
              Our Bestselling Essentials
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-[#9E5362] hover:text-[#7A3644] font-semibold text-xs sm:text-sm flex items-center gap-1 group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Deal of the Day / Special Offer Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#874A58] via-[#7B3F4D] to-[#5C303B] p-6 sm:p-10 text-white shadow-md shadow-[#DEC8CE]/40 border border-[#9A5B69]">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-[#FDEECC] uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-[#F5CF7F]" />
                Limited Editorial Offer
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading font-serif text-[#FFF9F6]">
                Up to 30% OFF on Feeding & Skincare Bundles
              </h3>

              <p className="text-xs sm:text-sm text-[#F5E5E8] max-w-xl font-light leading-relaxed">
                Stock up on borosilicate anti-colic bottles, silicone catch bibs, and nourishing massage oils. Use coupon <strong className="text-[#FCE5B4] underline font-mono font-bold">BABY10</strong> at checkout for an extra 10% discount!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('shop', { category: 'Feeding' })}
                  className="px-6 py-3 bg-[#FAF5F2] hover:bg-white text-[#6E303D] font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Shop Deal Collection
                </button>

                {/* Countdown clock */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#F8EAEB]">
                  <Clock className="w-4 h-4 text-[#F5CF7F]" />
                  <span>Ends in:</span>
                  <div className="flex gap-1 font-mono font-bold">
                    <span className="bg-black/25 px-2 py-1 rounded">
                      {String(timeLeft.hours).padStart(2, '0')}h
                    </span>
                    <span>:</span>
                    <span className="bg-black/25 px-2 py-1 rounded">
                      {String(timeLeft.minutes).padStart(2, '0')}m
                    </span>
                    <span>:</span>
                    <span className="bg-black/25 px-2 py-1 rounded">
                      {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 hidden md:flex justify-center">
              <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 flex flex-col items-center justify-center p-4 text-center">
                <Gift className="w-10 h-10 text-[#F5CF7F] mb-2" />
                <span className="text-xl font-bold font-heading font-serif">Flat ₹150 OFF</span>
                <span className="text-[11px] text-[#F3E1E4] mt-1 font-mono">Code: FIRSTBLOOM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[#9E5362] font-bold text-xs uppercase tracking-widest mb-1 flex items-center gap-1.5 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#B96F7C]" />
              Fresh Additions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35252B] font-heading font-serif">
              New Arrivals for Toddlers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-[#9E5362] hover:text-[#7A3644] font-semibold text-xs sm:text-sm flex items-center gap-1 group"
          >
            <span>Explore All New Additions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Why Parents Love BabyBloom */}
      <section className="bg-[#FAF6F3] py-16 border-y border-[#ECE2DD]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E5362] font-sans">
              The BabyBloom Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35252B] font-heading font-serif">
              Why Parents Choose Us Over Generic Stores
            </h2>
            <p className="text-xs sm:text-sm text-[#67575D] font-light">
              Zero compromises when it comes to infant health, safety certifications, and doorstep reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EDE3DF] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F6EAEE] text-[#8C3F4F] flex items-center justify-center text-xl">
                🌿
              </div>
              <h3 className="font-bold text-[#35252B] text-base font-serif font-heading">Gentle Organic Ingredients</h3>
              <p className="text-xs text-[#6B5C62] leading-relaxed">
                Formulated with natural sweet almond oil, soothing calendula, and virgin coconut extract. No parabens or mineral oils.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EDE3DF] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF4ED] text-[#427448] flex items-center justify-center text-xl">
                🏥
              </div>
              <h3 className="font-bold text-[#35252B] text-base font-serif font-heading">Clinically Tested & Certified</h3>
              <p className="text-xs text-[#6B5C62] leading-relaxed">
                Hypoallergenic, tear-free formulas tested under pediatric and dermatological supervision for newborn safety.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EDE3DF] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF3F7] text-[#3D647E] flex items-center justify-center text-xl">
                ⚡
              </div>
              <h3 className="font-bold text-[#35252B] text-base font-serif font-heading">Instant Global & UPI Payments</h3>
              <p className="text-xs text-[#6B5C62] leading-relaxed">
                Scan with any UPI app (Google Pay, PhonePe, Paytm), credit card, or express checkout. Seamlessly verified with zero extra transaction fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
            Real Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Stories from Verified Parents
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Over 15,000+ smiling babies & happy parents worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-pink-100/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center text-amber-400">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.city} • {t.babyAge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
