import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, navigateTo, formatINR } = useApp();
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="%23FFF0F5" width="400" height="400"/><text fill="%23DB2777" font-family="sans-serif" font-size="20" font-weight="bold" x="50%" y="45%" text-anchor="middle">BabyBloom</text><text fill="%239CA3AF" font-family="sans-serif" font-size="14" x="50%" y="55%" text-anchor="middle">${encodeURIComponent(product.category)}</text></svg>`;

  return (
    <div
      onClick={() => navigateTo('product-detail', { productId: product.id })}
      className="group relative bg-white rounded-3xl border border-[#EBE1DC] p-3.5 sm:p-4 hover:shadow-md hover:shadow-[#EFE3E6]/60 hover:border-[#DCC8CF] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Badges & Wishlist Heart */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF6F4] mb-3.5 border border-[#F3ECE8]">
        <img
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-[#B96F7C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs tracking-tight">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#EBD3A4] text-[#553B12] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              BESTSELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#59847A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
              NEW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-2xs ${
            inWishlist
              ? 'bg-[#FBF1F3] text-[#B96F7C] scale-105'
              : 'bg-white/85 backdrop-blur-xs text-slate-400 hover:text-[#B96F7C] hover:bg-white'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#B96F7C] text-[#B96F7C]' : ''}`} />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center">
            <span className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View hint on hover */}
        <div className="absolute bottom-2 inset-x-2 hidden group-hover:flex items-center justify-center">
          <span className="bg-white/95 backdrop-blur-xs text-[#4A3D42] text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 transition-all border border-[#EDE2DF]">
            <Eye className="w-3.5 h-3.5 text-[#B96F7C]" /> Quick View
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Age Group */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-[#9E5362] font-semibold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <span className="bg-[#F6EFEB] text-[#635359] px-2 py-0.5 rounded-full text-[10px] font-medium">
              {product.ageGroup}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-semibold text-[#322329] group-hover:text-[#9E5362] line-clamp-2 mb-2 transition-colors">
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-2.5">
            <div className="flex items-center bg-[#EDF4EE] text-[#3F6E48] px-1.5 py-0.5 rounded text-[10px] font-bold">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-[#3F6E48] text-[#3F6E48] ml-0.5" />
            </div>
            <span className="text-[10px] text-slate-400">
              ({product.reviewCount} <span className="text-[9px]">sample ratings</span>)
            </span>
          </div>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-[#F1E8E4] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#2A1D22] font-heading font-serif">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400">
              {product.stock <= 5 && !isOutOfStock ? (
                <span className="text-[#A36622] font-medium">Only {product.stock} left in stock!</span>
              ) : (
                <span>Inclusive of all taxes</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-2.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : justAdded
                ? 'bg-[#477C4E] text-white'
                : 'bg-[#B96F7C] hover:bg-[#A8616E] text-white'
            }`}
            title="Add to cart"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
