import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, addToast } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      addToast('Please enter both email and password', 'error');
      return;
    }
    login(email);
  };

  const handleQuickDemoCustomer = () => {
    setEmail('priya.parent@babybloom.in');
    setPassword('demo1234');
    login('priya.parent@babybloom.in', 'customer');
  };

  const handleOwnerAdminLogin = () => {
    setEmail('samruddhiidungarwall18211@gmail.com');
    setPassword('ownerPass2026');
    login('samruddhiidungarwall18211@gmail.com', 'admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-pink-100 relative">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-400 to-rose-300 text-white flex items-center justify-center text-2xl mx-auto mb-2 shadow-md shadow-pink-200">
            👶
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">
            {isRegister ? 'Create BabyBloom Account' : 'Welcome to BabyBloom'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isRegister
              ? 'Join 12,000+ happy parents worldwide for exclusive discounts'
              : 'Sign in to access your wishlist, saved addresses & order history'}
          </p>
        </div>

        {/* Quick Demo Logins */}
        <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-bold flex items-center gap-1.5 text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              Quick One-Click Sign In:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoCustomer}
              className="py-2 px-2.5 bg-white text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 font-semibold text-[11px] transition-all text-center"
            >
              Customer Demo (Parent)
            </button>
            <button
              type="button"
              onClick={handleOwnerAdminLogin}
              className="py-2 px-2.5 bg-[#4A242E] hover:bg-[#3B1C24] text-white rounded-xl font-bold text-[11px] transition-all shadow-xs text-center flex items-center justify-center gap-1"
            >
              👑 Store Owner Access
            </button>
          </div>
          <p className="text-[10px] text-slate-400 text-center">
            Admin & Sales Dashboard access reserved strictly to: samruddhiidungarwall18211@gmail.com
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anjali Gupta"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number (+91)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white font-bold rounded-xl shadow-md shadow-pink-200 transition-all text-xs"
          >
            {isRegister ? 'Create Account' : 'Sign In to BabyBloom'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-pink-600 hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to BabyBloom?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-pink-600 hover:underline"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
