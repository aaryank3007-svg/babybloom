import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, navigateTo } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              My Saved Wishlist
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {wishlistProducts.length} cherished items saved for later
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center text-3xl mx-auto">
              💝
            </div>
            <h3 className="font-bold text-slate-800 text-base font-heading">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-slate-500">
              Save your favorite baby clothes, feeding gear, and skincare lotions by clicking the heart icon on any product.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Explore Baby Essentials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
