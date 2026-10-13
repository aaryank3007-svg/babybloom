import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Category } from '../types';
import { INITIAL_PRODUCTS, VALID_COUPONS } from '../data/products';

export type ViewType =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'orders'
  | 'order-detail'
  | 'admin'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'shipping-policy'
  | 'returns-policy'
  | 'privacy-policy'
  | 'terms-conditions'
  | 'order-tracking';

interface Toast {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

export const AUTHORIZED_ADMIN_EMAIL = 'samruddhiidungarwall18211@gmail.com';

interface AppContextType {
  products: Product[];
  isLoadingProducts: boolean;
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  isAdmin: boolean;
  currentView: ViewType;
  selectedCategory: string;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  closeProductModal: () => void;
  selectedOrderId: string | null;
  searchQuery: string;
  couponCode: string;
  appliedCoupon: { code: string; discount: number; description: string } | null;
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  toasts: Toast[];
  // Navigation & view setters
  navigateTo: (view: ViewType, options?: { productId?: string; category?: string; orderId?: string }) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  deliveryFee: number;
  cartGrandTotal: number;
  cartCount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Auth
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  // Notification
  addToast: (text: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  // Currency helper
  formatINR: (amount: number) => string;
  refreshProducts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('BABY10');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; description: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persistent user
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('babybloom_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistent cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('babybloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('babybloom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('babybloom_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('babybloom_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('babybloom_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('babybloom_user');
    }
  }, [user]);

  // Fetch live products from backend
  const refreshProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      }
    } catch (e) {
      console.warn('Backend not yet reachable, using initialized catalogue', e);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const closeProductModal = () => {
    setSelectedProductId(null);
  };

  const navigateTo = (view: ViewType, options?: { productId?: string; category?: string; orderId?: string }) => {
    if (options?.productId) setSelectedProductId(options.productId);
    else if (!options?.productId && view !== currentView) setSelectedProductId(null);
    if (options?.category) setSelectedCategory(options.category);
    if (options?.orderId) setSelectedOrderId(options.orderId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        if (newQty === existing.quantity && existing.quantity >= product.stock) {
          addToast(`Maximum stock limit reached (${product.stock} units)`, 'error');
          return prev;
        }
        addToast(`Updated ${product.name} quantity to ${newQty}`, 'success');
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        if (product.stock <= 0) {
          addToast(`Sorry, ${product.name} is currently out of stock`, 'error');
          return prev;
        }
        addToast(`Added "${product.name}" to cart! 🛍️`, 'success');
        return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const max = item.product.stock;
          const finalQty = Math.min(max, quantity);
          if (quantity > max) {
            addToast(`Only ${max} units available in stock`, 'error');
          }
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const removed = prev.find((i) => i.product.id === productId);
      if (removed) {
        addToast(`Removed "${removed.product.name}" from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Totals Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const found = VALID_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      addToast('Invalid coupon code. Try BABY10 or FIRSTBLOOM', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrderValue) {
      addToast(`Minimum cart value of ₹${found.minOrderValue} required for ${found.code}`, 'error');
      return false;
    }

    let calculatedDiscount = 0;
    if (found.discountType === 'percentage') {
      calculatedDiscount = Math.round((cartSubtotal * found.discountValue) / 100);
    } else {
      calculatedDiscount = found.discountValue;
    }

    setAppliedCoupon({
      code: found.code,
      discount: calculatedDiscount,
      description: found.description,
    });
    setCouponCode(found.code);
    addToast(`Coupon "${found.code}" applied! You saved ₹${calculatedDiscount} 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed', 'info');
  };

  // Re-calculate coupon discount if cart changes
  const cartDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const deliveryFee = cartSubtotal >= 499 || cartSubtotal === 0 ? 0 : 49;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isAdmin = Boolean(
    user &&
    user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase() &&
    user.role === 'admin'
  );

  const login = (email: string, _role: 'customer' | 'admin' = 'customer') => {
    const cleanEmail = email.trim();
    const isOwner = cleanEmail.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
    const effectiveRole: 'customer' | 'admin' = isOwner ? 'admin' : 'customer';

    const newUser: User = {
      id: isOwner ? 'usr-owner-admin' : `usr-${Date.now()}`,
      name: isOwner ? 'Samruddhi Dungarwal (Admin / Store Owner)' : cleanEmail.split('@')[0],
      email: cleanEmail,
      phone: '9876543210',
      role: effectiveRole,
      savedAddresses: [
        {
          fullName: isOwner ? 'Samruddhi Dungarwal' : cleanEmail.split('@')[0],
          phone: '9876543210',
          email: cleanEmail,
          addressLine: 'A-203, Blossom Meadows, Baner Road',
          landmark: 'Near D-Mart',
          city: 'Pune',
          state: 'Maharashtra',
          pinCode: '411045',
        },
      ],
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    if (isOwner) {
      addToast('Welcome Samruddhi! Store Owner & Sales Dashboard Unlocked 👑', 'success');
    } else {
      addToast(`Welcome back, ${newUser.name}!`, 'success');
    }
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out', 'info');
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        isLoadingProducts,
        cart,
        wishlist,
        user,
        isAdmin,
        currentView,
        selectedCategory,
        selectedProductId,
        setSelectedProductId,
        closeProductModal,
        selectedOrderId,
        searchQuery,
        couponCode,
        appliedCoupon,
        isCartOpen,
        isAuthModalOpen,
        toasts,
        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        setIsCartOpen,
        setIsAuthModalOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartGrandTotal,
        cartCount,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isInWishlist,
        login,
        logout,
        addToast,
        removeToast,
        formatINR,
        refreshProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
