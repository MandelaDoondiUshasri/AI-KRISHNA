import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Globe, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const { language } = useLanguage();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [prefLang, setPrefLang] = useState<Language>(language);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, fullName, prefLang);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@aikrishna.life');
    setPassword('DivineAdmin2026!Krishna');
    setMode('login');
  };

  const fillDemoUser = () => {
    setEmail('arjuna@pandava.org');
    setPassword('ParthaGita2026!');
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0B192C] border border-[#F1B941]/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#1E3E62] to-[#F1B941] p-0.5">
            <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-2xl">
              🦚
            </div>
          </div>
          <h3 className="text-xl font-bold font-serif gold-gradient-text">
            {mode === 'login' ? 'Welcome Back to AI Krishna' : 'Begin Your Spiritual Journey'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login'
              ? 'Sign in to access your saved conversations, favorite verses, and reflections'
              : 'Create an account for personalized life guidance and history tracking'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#081225] p-1 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-[#1E3E62] text-[#F1B941] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-[#1E3E62] text-[#F1B941] shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Arjuna"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#081225] border border-slate-700 focus:border-[#F1B941] focus:outline-none text-white placeholder-slate-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seeker@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#081225] border border-slate-700 focus:border-[#F1B941] focus:outline-none text-white placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#081225] border border-slate-700 focus:border-[#F1B941] focus:outline-none text-white placeholder-slate-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Language</label>
              <div className="relative">
                <Globe className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  value={prefLang}
                  onChange={(e) => setPrefLang(e.target.value as Language)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-[#081225] border border-slate-700 focus:border-[#F1B941] focus:outline-none text-white"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] hover:brightness-110 transition-all shadow-md shadow-[#F1B941]/20 mt-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Demo Fast Login Pills */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <p className="text-[11px] text-center text-slate-400 mb-2">Quick Test Accounts:</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillDemoUser}
              className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 text-center transition-colors"
            >
              Demo Seeker
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="flex-1 py-1.5 px-2 rounded-lg bg-[#1E3E62]/60 hover:bg-[#1E3E62] text-[11px] text-[#F1B941] border border-[#F1B941]/30 text-center transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

