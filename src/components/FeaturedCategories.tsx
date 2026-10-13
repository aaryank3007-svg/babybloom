import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const FeaturedCategories: React.FC = () => {
  const { navigateTo, products } = useApp();

  const categories = [
    {
      id: 'Baby Care',
      title: 'Baby Care',
      subtitle: 'Lotions, oils & bath washes',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      bgColor: 'bg-[#FDF2F4]',
      borderColor: 'border-[#F4DFE3]',
      textColor: 'text-[#873C4B]',
    },
    {
      id: 'Diapering',
      title: 'Diapering',
      subtitle: 'Taped diapers, mats & pure wipes',
      image: '/images/diaper_packet.jpg',
      bgColor: 'bg-[#F2F6F9]',
      borderColor: 'border-[#DEE6ED]',
      textColor: 'text-[#3E5C77]',
    },
    {
      id: 'Feeding',
      title: 'Feeding',
      subtitle: 'Glass bottles, sippy cups & bibs',
      image: '/images/feeding_bottle.jpg',
      bgColor: 'bg-[#FAF6EE]',
      borderColor: 'border-[#EDE5D5]',
      textColor: 'text-[#7D6128]',
    },
    {
      id: 'Clothing',
      title: 'Clothing',
      subtitle: 'Organic rompers, socks & swaddles',
      image: '/images/cotton_sleepsuit.jpg',
      bgColor: 'bg-[#F1F6F3]',
      borderColor: 'border-[#DCE7E0]',
      textColor: 'text-[#3E6548]',
    },
    {
      id: 'Toys & Accessories',
      title: 'Toys & Gifts',
      subtitle: 'Teethers, rattles & plush sets',
      image: '/images/plush_bunny.jpg',
      bgColor: 'bg-[#F7F3F8]',
      borderColor: 'border-[#EAE2EE]',
      textColor: 'text-[#644B74]',
    },
  ];

  return (
    <section className="py-12 bg-[#FCFAF8] border-b border-[#F0E6E2]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-[#9E5362] font-bold text-xs uppercase tracking-widest mb-1 font-sans">
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#35252B] font-heading font-serif">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-[#9E5362] hover:text-[#7A3644] font-semibold text-xs sm:text-sm flex items-center gap-1 group"
          >
            <span>Browse All {products.length} Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <div
                key={c.id}
                onClick={() => navigateTo('shop', { category: c.id })}
                className={`group cursor-pointer rounded-3xl p-4 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${c.bgColor} ${c.borderColor}`}
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-white shadow-xs">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{c.subtitle}</p>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                    <span className="bg-white/80 px-2 py-0.5 rounded-full">{count} Items</span>
                    <ArrowRight className="w-3.5 h-3.5 text-pink-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
