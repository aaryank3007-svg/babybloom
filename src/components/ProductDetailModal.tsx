import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  Share2
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    closeProductModal,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatINR,
    addToast,
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [pinCode, setPinCode] = useState('');
  const [pinStatus, setPinStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProductId(null);
      }
    };
    if (selectedProductId) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProductId, setSelectedProductId]);

  if (!selectedProductId) return null;

  const product = products.find((p) => p.id === selectedProductId);
  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleCheckPin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim();
    if (!cleanPin || cleanPin.length < 3 || cleanPin.length > 10) {
      setPinStatus('Please enter a valid postal or ZIP code');
      return;
    }
    setPinStatus(`Worldwide Express Delivery available to postal code ${cleanPin} within 2-4 business days! Free shipping on orders > ₹499.`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedProductId(null);
    navigateTo('checkout');
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setSelectedProductId(null);
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
    >
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-pink-100">
        {/* Close Button - fully interactive and working anytime */}
        <button
          type="button"
          onClick={() => {
            setSelectedProductId(null);
            closeProductModal?.();
          }}
          className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-slate-100/90 hover:bg-slate-200 active:scale-90 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all shadow-md cursor-pointer border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
          title="Close details (Esc)"
          aria-label="Close details"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Left Image Column */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                    inWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white/90 text-slate-400 hover:text-rose-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Trust highlights */}
              <div className="bg-[#FFF8FA] p-3.5 rounded-2xl border border-pink-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Baby-Safe, Dermatologist & Pediatrician Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>7-Day Easy Returns & Exchange Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Worldwide Express Dispatch within 24 Hours</span>
                </div>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Age Group */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-pink-600 font-bold text-xs uppercase tracking-wider bg-pink-50 px-2.5 py-1 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-slate-600 text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                    Age: {product.ageGroup}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-heading mb-2">
                  {product.name}
                </h1>

                {/* Rating & Sample reviews info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 ml-1" />
                  </div>
                  <span className="text-xs text-slate-500">
                    {product.reviewCount} Ratings & Verified Reviews{' '}
                    <span className="text-[10px] text-slate-400">(Sample demo data)</span>
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        Save {formatINR(product.originalPrice - product.price)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Inclusive of all taxes & GST</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        product.stock > 10
                          ? 'bg-emerald-100 text-emerald-800'
                          : product.stock > 0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stock > 10
                        ? 'In Stock'
                        : product.stock > 0
                        ? `Only ${product.stock} left`
                        : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 mb-5">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Highlights:
                  </p>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery PIN Code Checker */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 mb-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-500" /> Check Delivery to Your Location
                    </p>
                    <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                  </div>
                  <form onSubmit={handleCheckPin} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Postal / ZIP code (e.g. 400001, 10001, SW1A)"
                      value={pinCode}
                      maxLength={12}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-pink-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                    >
                      Check
                    </button>
                  </form>
                  {pinStatus ? (
                    <p className="text-[11px] text-pink-700 font-medium mt-1.5">{pinStatus}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Worldwide Express Shipping available. Feel free to skip and add to cart directly, or close anytime via ✕.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons: Quantity, Add to Cart, Buy Now */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-slate-600 disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock || isOutOfStock}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-slate-600 disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex-1 min-w-[140px] py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Buy Now */}
                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="flex-1 min-w-[140px] py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 disabled:from-slate-200 disabled:to-slate-200 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-200"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Specs, Sample Reviews */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-4 border-b border-slate-100 mb-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 transition-colors ${
                  activeTab === 'details'
                    ? 'text-pink-600 border-b-2 border-pink-500'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Specifications & Origin
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2.5 transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-pink-600 border-b-2 border-pink-500'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Parent Reviews & Ratings ({product.reviewCount})
              </button>
            </div>

            {activeTab === 'details' && product.specifications && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-slate-400 text-[10px] uppercase font-bold">{key}</p>
                    <p className="text-slate-800 font-semibold mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="bg-pink-50/60 p-3 rounded-2xl border border-pink-100/60 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{product.rating} out of 5.0</span>
                    <span className="text-slate-500">based on {product.reviewCount} customer reviews</span>
                  </div>
                  <span className="text-[10px] text-pink-700 font-bold bg-white px-2 py-0.5 rounded-full border border-pink-200">
                    Sample Verified Ratings
                  </span>
                </div>

                {/* Sample feedback cards */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">Sarah Jenkins (London, UK)</span>
                      <span className="text-[10px] text-slate-400">2 weeks ago</span>
                    </div>
                    <div className="flex items-center text-amber-400 mb-1">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-slate-600">
                      "Absolutely adore this! Gentle on my 4-month baby's sensitive skin. Will definitely repurchase from BabyBloom."
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">Dr. Elena Rostova (Pediatric Care)</span>
                      <span className="text-[10px] text-slate-400">1 month ago</span>
                    </div>
                    <div className="flex items-center text-amber-400 mb-1">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-slate-600">
                      "Clean ingredients, safe packaging, and zero harsh chemicals. Verified safe for pediatric daily use."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
