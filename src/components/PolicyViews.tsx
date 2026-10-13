import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShieldCheck, FileText, Truck, RotateCcw } from 'lucide-react';

interface PolicyProps {
  type: 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyView: React.FC<PolicyProps> = ({ type }) => {
  const { navigateTo } = useApp();

  const content = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      subtitle: 'Fast, secure express delivery to destinations worldwide',
      sections: [
        {
          heading: '1. Shipping Rates & Free Delivery Threshold',
          body: 'We provide FREE standard shipping on all orders totaling ₹499 or above (after coupons and discounts). For orders below ₹499, a flat shipping and handling fee of ₹49 is charged.'
        },
        {
          heading: '2. Dispatch and Delivery Timelines',
          body: 'All orders placed before 3:00 PM Monday through Saturday are processed and dispatched within 24 hours from our fulfillment facilities. Transit time is 2 to 5 business days depending upon destination postal zone.'
        },
        {
          heading: '3. Order Tracking & SMS Notifications',
          body: 'Once handed to our courier partners, a unique tracking Airway Bill (AWB) number and live tracking link is generated. You can track your package anytime on our Track Order page.'
        },
        {
          heading: '4. Non-Delivery or Incomplete Addresses',
          body: 'Please ensure your Postal / ZIP code and landmark are accurate. In the rare event of non-delivery due to incorrect address, our courier executive will attempt contact before returning package to hub.'
        }
      ]
    },
    returns: {
      title: 'Return, Replacement & Refund Policy',
      icon: RotateCcw,
      subtitle: 'Our 7-Day Hassle-Free Parent Satisfaction Guarantee',
      sections: [
        {
          heading: '1. 7-Day Replacement Guarantee',
          body: 'If you receive an item that is damaged in transit, physically defective, or different from what you ordered, notify us within 7 days of delivery for a free, instant replacement.'
        },
        {
          heading: '2. Hygiene and Safety Exclusions',
          body: 'For the health and safety of infants, opened hygiene goods (including opened baby wipes, unsealed lotions, used pacifiers/feeders, and unsealed diapers) cannot be returned once original safety tamper seal is broken.'
        },
        {
          heading: '3. Refund Timeline',
          body: 'For online payments via UPI QR or card, refunds are initiated back to the source bank account within 24 to 48 hours of returned item inspection. For Cash on Delivery orders, refunds are disbursed via UPI transfer or bank NEFT.'
        }
      ]
    },
    privacy: {
      title: 'Privacy & Data Protection Policy',
      icon: ShieldCheck,
      subtitle: 'How BabyBloom respects and protects your family’s privacy',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect customer contact information (name, phone number, email address, and shipping address) strictly for order fulfillment, dispatch updates, and customer support.'
        },
        {
          heading: '2. Zero Payment Credentials Storage',
          body: 'BabyBloom does NOT collect, store, or view your banking passwords, UPI PINs, CVVs, or card numbers. All UPI QR interactions conform to NPCI standards, and card tokens are managed securely.'
        },
        {
          heading: '3. No Third-Party Data Selling',
          body: 'We will never sell or rent parent or child personal records to advertising brokers or external third parties.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions of Service',
      icon: FileText,
      subtitle: 'Agreement terms governing website purchases and user accounts',
      sections: [
        {
          heading: '1. Store Terms & Product Guarantee',
          body: 'All products sold on BabyBloom are certified dermatologically safe for infants, nontoxic, and hypoallergenic. All prices, stock information, and order workflows comply with international infant safety and consumer protection standards.'
        },
        {
          heading: '2. Pricing & Currency',
          body: 'All product prices and discounts displayed on this website are listed in standard Rupee format (₹) with international multi-currency card and UPI processing.'
        },
        {
          heading: '3. Governing Jurisdiction',
          body: 'Any claims or inquiries related to the operation of BabyBloom are handled in accordance with international consumer standards and transparent dispute resolution.'
        }
      ]
    }
  };

  const current = content[type];
  const Icon = current.icon;

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-pink-600 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                {current.title}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">{current.subtitle}</p>
            </div>
          </div>

          <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
            {current.sections.map((sec, i) => (
              <div key={i} className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-sm">{sec.heading}</h3>
                <p>{sec.body}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Last updated: October 2026 • BabyBloom Global Boutique
          </div>
        </div>
      </div>
    </div>
  );
};
