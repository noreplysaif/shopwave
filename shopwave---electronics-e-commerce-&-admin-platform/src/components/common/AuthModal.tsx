import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginCustomer, registerCustomer, activeUser, logoutCustomer } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setError('Please fill in all required fields.');
        return;
      }
      registerCustomer(name, email, phone);
      onSuccess();
    } else {
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email and password.');
        return;
      }
      const success = loginCustomer(email);
      if (!success) {
        setError('Account is disabled or credentials invalid.');
        return;
      }
      onSuccess();
    }
  };

  const handleQuickDemoLogin = (demoEmail: string) => {
    loginCustomer(demoEmail);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {activeUser ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Currently Signed In</h3>
            <p className="text-xs text-slate-500 mt-1">
              {activeUser.name} ({activeUser.email})
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onSuccess();
                }}
                className="w-full py-2.5 bg-[#168DE2] text-white rounded-xl text-xs font-semibold hover:bg-[#123B82]"
              >
                Go to My Account Dashboard
              </button>
              <button
                onClick={logoutCustomer}
                className="w-full py-2.5 border border-slate-200 dark:border-slate-700 text-rose-600 rounded-xl text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isRegister ? 'Create ShopWave Account' : 'Welcome to ShopWave'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {isRegister
                  ? 'Join Bangladesh’s premium electronics community'
                  : 'Track your orders, manage wishlist, and checkout effortlessly'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {isRegister && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tanvir Hossain"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#168DE2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (BD)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1711 223344"
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#168DE2]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir.hossain@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#168DE2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#168DE2]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-[#168DE2] hover:bg-[#123B82] text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
              >
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            {/* Quick Demo Customer Login Presets */}
            {!isRegister && (
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Demo Sign-In
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleQuickDemoLogin('tanvir.hossain@gmail.com')}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left border border-slate-200/60 dark:border-slate-700 hover:border-[#168DE2]"
                  >
                    <div className="font-semibold text-slate-800 dark:text-white truncate">Tanvir Hossain</div>
                    <div className="text-[10px] text-slate-400">Gulshan, Dhaka</div>
                  </button>
                  <button
                    onClick={() => handleQuickDemoLogin('sadia.rahman@northsouth.edu')}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-left border border-slate-200/60 dark:border-slate-700 hover:border-[#168DE2]"
                  >
                    <div className="font-semibold text-slate-800 dark:text-white truncate">Sadia Rahman</div>
                    <div className="text-[10px] text-slate-400">Bashundhara, Dhaka</div>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-5 text-center text-xs text-slate-500">
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsRegister(false);
                      setError('');
                    }}
                    className="text-[#168DE2] font-semibold hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsRegister(true);
                      setError('');
                    }}
                    className="text-[#168DE2] font-semibold hover:underline"
                  >
                    Create account
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
