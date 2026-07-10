import React, { useState } from 'react';
import { User as UserIcon, Lock, ArrowRight } from 'lucide-react';
import { MOCK_USERS } from '../mockData';
import { User } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('กรุณาใส่ชื่อผู้ใช้ (Username)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const foundUser = MOCK_USERS.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase()
      );

      if (foundUser) {
        onLoginSuccess(foundUser);
      } else {
        setError('ไม่พบบัญชีผู้ใช้นี้');
        setIsSubmitting(false);
      }
    }, 300);
  };

  const autofillUser = (userKey: 'admin' | 'customer') => {
    const matched = MOCK_USERS.find((u) => u.username === userKey);
    if (matched) {
      setUsername(matched.username);
      setPassword('••••••••');
      setError('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-6 justify-between select-none relative">
      {/* Top Header section */}
      <div className="text-center mt-8 animate-fadeIn">
        <div className="w-12 h-12 bg-zinc-950 rounded-xl mx-auto flex items-center justify-center font-bold text-xl tracking-wider text-white shadow-sm">
          G
        </div>
        <h2 className="text-xs font-semibold tracking-wider text-zinc-900 mt-4 uppercase">
          GUNPLA STORE
        </h2>
        <p className="text-[9px] text-zinc-400 tracking-widest uppercase font-mono mt-1">
          Catalog Showcase
        </p>
      </div>

      {/* Login Form area */}
      <div className="my-auto py-6">
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Error Message */}
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-[10px] text-red-600 text-center">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              USERNAME (ชื่อผู้ใช้)
            </label>
            <div className="flex items-center bg-zinc-50 border border-zinc-150 rounded-lg px-3 py-2 focus-within:border-zinc-300 focus-within:bg-white transition-all">
              <UserIcon size={12} className="text-zinc-400 mr-2 shrink-0" />
              <input
                id="login-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ชื่อผู้ใช้ เช่น admin หรือ customer"
                className="bg-transparent text-xs text-zinc-800 placeholder-zinc-400 outline-hidden w-full font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-medium text-zinc-500 tracking-wider">
              PASSWORD (รหัสผ่าน)
            </label>
            <div className="flex items-center bg-zinc-50 border border-zinc-150 rounded-lg px-3 py-2 focus-within:border-zinc-300 focus-within:bg-white transition-all">
              <Lock size={12} className="text-zinc-400 mr-2 shrink-0" />
              <input
                id="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-xs text-zinc-800 placeholder-zinc-400 outline-hidden w-full"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-950 hover:bg-zinc-900 active:scale-[0.98] disabled:opacity-50 text-white text-xs font-medium py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-4"
          >
            <span>{isSubmitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ (Sign In)'}</span>
            <ArrowRight size={12} />
          </button>
        </form>
      </div>

      {/* Quick Autofill Selector */}
      <div className="border-t border-zinc-100 pt-5 mt-auto">
        <div className="text-[9px] text-zinc-400 text-center mb-3">
          บัญชีทดสอบด่วน (Quick Accounts)
        </div>
        
        <div className="grid grid-cols-2 gap-2.5">
          {/* Admin Switcher */}
          <button
            type="button"
            id="quick-login-admin"
            onClick={() => autofillUser('admin')}
            className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-150 p-2.5 rounded-lg text-left active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="text-[10px] font-medium text-zinc-900">
              Admin Ray
            </div>
            <div className="text-[8px] text-zinc-400 font-mono mt-0.5">Role: Admin</div>
          </button>

          {/* Customer Switcher */}
          <button
            type="button"
            id="quick-login-customer"
            onClick={() => autofillUser('customer')}
            className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-150 p-2.5 rounded-lg text-left active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="text-[10px] font-medium text-zinc-900">
              Banagher
            </div>
            <div className="text-[8px] text-zinc-400 font-mono mt-0.5">Role: Customer</div>
          </button>
        </div>
      </div>
    </div>
  );
};
