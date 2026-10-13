import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    formatINR,
  } = useApp();

  const [priceRange, setPriceRange] = useState<number>(2500);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'popular' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedAge, setSelectedAge] = useState<string>('ALL');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const categories = ['All', 'Baby Care', 'Diapering', 'Feeding', 'Clothing', 'Toys & Accessories'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Price range
      if (p.price > priceRange) return false;
      // In stock
      if (inStockOnly && p.stock <= 0) return false;
      // Age group
      if (selectedAge !== 'ALL' && !p.ageGroup.toLowerCase().includes(selectedAge.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0;
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, selectedAge, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange(2500);
    setInStockOnly(false);
    setSelectedAge('ALL');
    setSortBy('featured');
  };

  const isFiltered =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    priceRange < 2500 ||
    inStockOnly ||
    selectedAge !== 'ALL';

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & Search strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {selectedCategory === 'All' ? 'All Baby Products' : selectedCategory}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
              {products.length} dermatologist-approved essentials
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-pink-500" />
              <span>Filters</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-pink-500 shadow-xs"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-low">Price: Low to High (₹)</option>
                <option value="price-high">Price: High to Low (₹)</option>
                <option value="popular">Popularity & Ratings</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filter Sidebar (Desktop + Mobile Drawer) */}
          <aside
            className={`md:col-span-3 space-y-6 ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
                : 'hidden md:block'
            }`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 md:hidden">
                <h3 className="font-bold text-slate-900 text-base">Filter Catalogue</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="bg-white p-5 rounded-3xl border border-pink-100/80 shadow-xs space-y-6">
              {/* Header & Clear Filters */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-pink-500" />
                  Filters
                </span>
                {isFiltered && (
                  <button
                    onClick={handleClearFilters}
                    className="text-[11px] text-pink-600 hover:text-pink-800 font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* 1. Category Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5">
                  Categories
                </label>
                <div className="space-y-1.5">
                  {categories.map((c) => {
                    const isSelected = selectedCategory.toLowerCase() === c.toLowerCase();
                    const count =
                      c === 'All'
                        ? products.length
                        : products.filter((p) => p.category.toLowerCase() === c.toLowerCase()).length;
                    return (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-pink-100 text-pink-800 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{c}</span>
                        <span className="text-[10px] text-slate-400">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Price Range Slider */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>Max Price (INR)</span>
                  <span className="text-pink-600">{formatINR(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹200</span>
                  <span>₹2,500</span>
                </div>
              </div>

              {/* 3. Age Group Filter */}
              <div className="border-t border-slate-100 pt-4">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Baby Age Group
                </label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
                >
                  <option value="ALL">All Age Stages</option>
                  <option value="0-6">0 - 6 Months</option>
                  <option value="6-12">6 - 12 Months</option>
                  <option value="12-24">1 - 2 Years</option>
                  <option value="Years">2+ Toddler</option>
                </select>
              </div>

              {/* 4. In Stock Toggle */}
              <div className="border-t border-slate-100 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-pink-600 rounded-sm focus:ring-pink-500"
                  />
                  <span>Exclude Out of Stock</span>
                </label>
              </div>

              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold md:hidden"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              )}
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-400 flex items-center justify-center text-3xl mx-auto">
                  🔍
                </div>
                <h3 className="font-bold text-slate-800 text-base font-heading">
                  No baby products match your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or adjusting your price and category filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
