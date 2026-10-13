import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Shield,
  Truck,
  PhoneCall,
  LayoutDashboard,
  LogOut,
  Gift
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartOpen,
    user,
    isAdmin,
    logout,
    setIsAuthModalOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    products,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const categories = [
    { name: 'All Products', cat: 'All' },
    { name: 'Baby Care', cat: 'Baby Care' },
    { name: 'Diapering', cat: 'Diapering' },
    { name: 'Feeding', cat: 'Feeding' },
    { name: 'Clothing', cat: 'Clothing' },
    { name: 'Toys & Accessories', cat: 'Toys & Accessories' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setSearchFocused(false);
    }
  };

  const filteredPreview = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF8]/95 backdrop-blur-md border-b border-[#F0E6E2] shadow-2xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#F5ECEE] text-[#69424B] border-b border-[#EBDDE0] py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-[#EAD5D9] text-[#63333D] font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wider">OFFER</span>
            <span className="truncate">
              Flat 10% OFF with code <strong className="text-[#843644] font-bold">BABY10</strong> | Free Express Shipping Worldwide on orders above ₹499
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs text-[#704851]">
            <button
              onClick={() => navigateTo('order-tracking')}
              className="flex items-center gap-1 hover:text-[#421A22] transition-colors"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
            <span className="text-[#DEC8CC]">|</span>
            <button
              onClick={() => navigateTo('contact')}
              className="flex items-center gap-1 hover:text-[#421A22] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24/7 Global Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-8">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A3D42] hover:text-[#843644] rounded-lg hover:bg-[#F6EDEF]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo & Tagline */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-2.5 select-none shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F6E8EC] border border-[#ECD3D9] flex items-center justify-center shadow-xs">
              <span className="text-xl">🍼</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[#4F2630] font-heading font-serif">
                  BabyBloom
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B96F7C]"></span>
              </div>
              <p className="text-[10px] text-[#78656B] font-light tracking-wide -mt-0.5 hidden sm:block">
                Little Things for Little Ones.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search gentle lotions, diapers, feeding sets, rattles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-10 pr-24 py-2.5 text-xs bg-white border border-[#E7DDD9] rounded-full focus:outline-hidden focus:border-[#C47D8A] focus:bg-white focus:ring-2 focus:ring-[#F7EBEE] transition-all text-[#3D3337] placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-[#B96F7C] hover:bg-[#A8616E] text-white text-xs font-semibold rounded-full shadow-xs transition-all"
              >
                Search
              </button>
            </form>

            {/* Instant Search Suggestions Dropdown */}
            {searchFocused && searchQuery.trim() && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden z-50 py-2"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Matching Products ({filteredPreview.length})
                </div>
                {filteredPreview.length > 0 ? (
                  filteredPreview.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigateTo('product-detail', { productId: item.id });
                        setSearchFocused(false);
                      }}
                      className="px-3 py-2 hover:bg-pink-50/70 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-9 h-9 object-cover rounded-lg bg-slate-100"
                        />
                        <div>
                          <p className="text-xs font-medium text-slate-800 line-clamp-1">{item.name}</p>
                          <span className="text-[10px] text-pink-600 bg-pink-50 px-1.5 py-0.5 rounded font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900">₹{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] text-slate-400 line-through ml-1">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-slate-500 text-center">
                    No baby products found matching "{searchQuery}"
                  </div>
                )}
                <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                  <button
                    onClick={() => {
                      navigateTo('shop');
                      setSearchFocused(false);
                    }}
                    className="w-full text-center py-1.5 text-xs font-semibold text-pink-600 hover:text-pink-700 flex items-center justify-center gap-1"
                  >
                    View all matching results <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 text-slate-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all"
                title="Account"
                aria-label="User Account"
              >
                <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                  {user ? user.name[0].toUpperCase() : <User className="w-4 h-4" />}
                </div>
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {user ? user.name : 'Guest Shopper'}
                    </p>
                    {isAdmin && (
                      <span className="inline-block mt-1 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Store Owner & Admin
                      </span>
                    )}
                  </div>

                  <div className="py-1 text-xs text-slate-700">
                    <button
                      onClick={() => {
                        navigateTo('orders');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-pink-50 flex items-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                      My Orders & Invoices
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('order-tracking');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-pink-50 flex items-center gap-2"
                    >
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      Track An Order
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('wishlist');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-pink-50 flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                      Saved Wishlist ({wishlist.length})
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        navigateTo('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-purple-600" />
                      {isAdmin ? 'Admin & Sales Dashboard' : 'Store Admin Portal'}
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    {user ? (
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-pink-600 font-bold hover:bg-pink-50 flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5" />
                        Sign In / Register
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#B96F7C] hover:bg-[#A8616E] text-white px-3.5 sm:px-4 py-2 rounded-full shadow-xs transition-all font-semibold text-xs sm:text-sm"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F3D79A] text-[#553C0F] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-2 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search lotions, diapers, bottles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-16 py-2 text-xs bg-white border border-[#E7DDD9] rounded-full focus:outline-hidden focus:border-[#C47D8A]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 px-3 py-1 bg-[#B96F7C] text-white text-[11px] font-semibold rounded-full"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 3. Category Links Navigation Strip */}
      <nav className="bg-[#FCFAF8] border-t border-[#F0E6E2] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-semibold text-[#66575E] overflow-x-auto py-1">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('home')}
              className={`py-2 transition-colors ${
                currentView === 'home' ? 'text-[#823947] font-bold border-b-2 border-[#823947]' : 'hover:text-[#823947]'
              }`}
            >
              Home
            </button>
            {categories.map((cat) => (
              <button
                key={cat.cat}
                onClick={() => navigateTo('shop', { category: cat.cat })}
                className={`py-2 transition-colors whitespace-nowrap ${
                  currentView === 'shop' && selectedCategory === cat.cat
                    ? 'text-[#823947] font-bold border-b-2 border-[#823947]'
                    : 'hover:text-[#823947]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 text-[#6B5C63]">
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#823947] py-2 ${currentView === 'about' ? 'text-[#823947] font-bold' : ''}`}
            >
              About BabyBloom
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#823947] py-2 ${currentView === 'contact' ? 'text-[#823947] font-bold' : ''}`}
            >
              Contact Us
            </button>
            {isAdmin && (
              <button
                onClick={() => navigateTo('admin')}
                className="text-[#6C4B7E] hover:text-[#583968] bg-[#F5EDF9] border border-[#E8DAEE] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <LayoutDashboard className="w-3 h-3" />
                Admin & Sales
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-pink-100 px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-pink-50"
            >
              Home
            </button>
            <div className="border-t border-slate-100 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
                 Shop By Category
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.cat}
                  onClick={() => {
                    navigateTo('shop', { category: cat.cat });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-pink-50 flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-2 flex flex-col gap-1 text-xs">
              <button
                onClick={() => {
                  navigateTo('order-tracking');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-pink-50 flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-pink-500" /> Track Order
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    navigateTo('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2 px-3 rounded-lg bg-purple-50 text-purple-700 font-bold flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-purple-600" /> Admin & Sales Dashboard
                </button>
              )}
              <button
                onClick={() => {
                  navigateTo('about');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-pink-50"
              >
                About Us
              </button>
              <button
                onClick={() => {
                  navigateTo('contact');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-pink-50"
              >
                Contact & Support
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
