import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Sparkles, Award, MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="bg-pink-100 text-pink-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Our Story & Promise
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Caring for Little Ones Worldwide
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            BabyBloom was founded with one sacred belief: every newborn deserves pure, non-toxic, scientifically formulated gentle care that parents can trust with eyes closed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl mx-auto">
              🌱
            </div>
            <h3 className="font-bold text-slate-900 text-base">100% Certified Toxin-Free</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero parabens, SLS, silicones, synthetic dyes, or petroleum mineral oils in our care range.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl mx-auto">
              🔬
            </div>
            <h3 className="font-bold text-slate-900 text-base">Pediatrician Endorsed</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every formula and fabric is clinically tested by dermatologists on delicate infant skin.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mx-auto">
              🌍
            </div>
            <h3 className="font-bold text-slate-900 text-base">Gentle for All Climates</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engineered with breathable organic cottons and soothing botanicals like shea, calendula, and virgin coconut.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl shadow-pink-200">
          <h2 className="text-2xl font-bold font-heading">Ready to pamper your little angel?</h2>
          <p className="text-xs sm:text-sm text-pink-100 max-w-lg mx-auto">
            Discover our collection of baby care, soft taped diapers, feeding essentials, and cuddly toys today.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-3 bg-white text-pink-700 font-bold text-xs rounded-xl shadow-md hover:bg-pink-50 transition-colors"
          >
            Explore Catalogue
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', queryType: 'Order Support', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your inquiry has been received! Our baby care team will reply within 4 hours.', 'success');
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            We're Here for You & Your Baby
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have questions about feeding bottles, skin sensitivity, or an existing order? Get in touch with our friendly support team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-pink-600">
              BabyBloom Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Fulfillment Hub & Office</p>
                  <p>Plot 44, Tech Boulevard, Powai, Mumbai, Maharashtra - 400076 (Sample Address)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Parent Helpline Email</p>
                  <p>support@babybloom.in</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">Toll-Free Helpline</p>
                  <p>+91 1800 220 990 / +91 98765 43210 (Mon-Sat, 9am - 7pm IST)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
              <p>Customer care hours: Monday to Saturday, 9:00 AM – 7:00 PM IST. We strive to reply to all queries within 2 hours.</p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-pink-100 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Thank You, {form.name}!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Your inquiry regarding <strong className="text-slate-700">{form.queryType}</strong> has been logged into our support queue. A pediatrician or support agent will reply to {form.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Radhika Iyer"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="98765 43210"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Topic / Concern</label>
                  <select
                    value={form.queryType}
                    onChange={(e) => setForm({ ...form, queryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                    <option value="UPI QR Payment Query">UPI QR Payment Query</option>
                    <option value="Product Ingredients & Safety">Product Ingredients & Safety</option>
                    <option value="Return / Replacement Request">Return / Replacement Request</option>
                    <option value="Other Feedback">Other Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help you and your baby..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqView: React.FC = () => {
  const faqs = [
    {
      q: 'How does the UPI QR Code Payment work?',
      a: 'When you choose UPI QR at checkout, BabyBloom generates an official NPCI-compliant UPI payment intent string and dynamic QR code tied to your Order ID and exact INR amount. You can scan it using Google Pay, PhonePe, Paytm, or CRED. Once payment succeeds, our backend verifies the transaction and confirms the order immediately.'
    },
    {
      q: 'Are all products safe for newborns?',
      a: 'Yes! Every skincare, lotion, body wash, and oil on BabyBloom is 100% hypoallergenic, pH 5.5 balanced, dermatologically tested, and free from parabens, phthalates, artificial perfumes, and sulfates.'
    },
    {
      q: 'What is the delivery fee and shipping timeline?',
      a: 'We offer FREE Express Shipping worldwide on all orders of ₹499 and above. For orders below ₹499, a nominal standard delivery charge of ₹49 applies. Orders are dispatched within 24 hours from our fulfillment centers and reach you in 2 to 5 business days with real-time tracking.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, Cash on Delivery and pay-on-arrival is available across supported postal zones. Simply select "Cash on Delivery" at checkout. Your order will be placed with payment status marked as Pending COD.'
    },
    {
      q: 'What is the return and replacement policy?',
      a: 'We offer a 7-day hassle-free replacement or refund guarantee if an item arrives damaged, defective, or incorrect. For hygiene and safety reasons, opened consumables (lotions, wipes, opened diapers) cannot be returned unless defective upon arrival.'
    },
    {
      q: 'Which coupon codes can I use for discounts?',
      a: 'You can use code BABY10 at checkout for an instant 10% discount on all orders above ₹299. For first-time parents ordering above ₹799, use code FIRSTBLOOM for flat ₹150 off!'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Quick answers about shipping, payments, product safety, and order handling.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs space-y-2">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="text-pink-500 font-extrabold">Q.</span> {item.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-5">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
