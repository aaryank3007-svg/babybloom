import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { CheckoutView } from './components/CheckoutView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { AdminDashboard } from './components/AdminDashboard';
import { WishlistView } from './components/WishlistView';
import { CustomerOrdersView } from './components/CustomerOrdersView';
import { AboutView, ContactView, FaqView } from './components/AboutView';
import { PolicyView } from './components/PolicyViews';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, toasts, removeToast } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FFFDFB]">
      <div>
        <Header />

        <main>
          {currentView === 'home' && <HomeView />}
          {currentView === 'shop' && <ShopView />}
          {currentView === 'checkout' && <CheckoutView />}
          {currentView === 'orders' && <CustomerOrdersView />}
          {currentView === 'order-tracking' && <OrderTrackingView />}
          {currentView === 'wishlist' && <WishlistView />}
          {currentView === 'admin' && <AdminDashboard />}
          {currentView === 'about' && <AboutView />}
          {currentView === 'contact' && <ContactView />}
          {currentView === 'faqs' && <FaqView />}
          {currentView === 'shipping-policy' && <PolicyView type="shipping" />}
          {currentView === 'returns-policy' && <PolicyView type="returns" />}
          {currentView === 'privacy-policy' && <PolicyView type="privacy" />}
          {currentView === 'terms-conditions' && <PolicyView type="terms" />}
        </main>
      </div>

      <Footer />

      {/* Global Overlays & Drawers */}
      <CartDrawer />
      <AuthModal />
      <ProductDetailModal />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-pink-400 shrink-0" />}
              <span className="font-medium">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
