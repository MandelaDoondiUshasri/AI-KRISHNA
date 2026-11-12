import React, { useState } from 'react';
import { Sparkles, MessageSquare, Compass, Sun, Bookmark, Shield, LogIn, LogOut, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'chat', label: 'AI Krishna', icon: MessageSquare },
    { id: 'explorer', label: 'Gita Explorer', icon: Compass },
    { id: 'daily', label: t.dailyWisdom, icon: Sun },
    { id: 'saved', label: t.savedWisdom, icon: Bookmark },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: t.admin, icon: Shield }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#081225]/90 border-b border-[#F1B941]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-0.5 shadow-lg shadow-[#008DDA]/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center">
                <span className="text-xl select-none">🦚</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-wider gold-gradient-text uppercase font-serif">
                  {t.appName}
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#F1B941]/10 text-[#F1B941] rounded border border-[#F1B941]/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] tracking-wider hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3E62]/80 text-[#F1B941] border border-[#F1B941]/40 shadow-sm shadow-[#F1B941]/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F1B941]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-[#0B192C] border border-[#F1B941]/30 rounded-lg p-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#F1B941] ml-1.5 mr-1" />
              {(['en', 'hi', 'te'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    language === lang
                      ? 'bg-[#F1B941] text-[#081225] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-700">
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-200">{user.full_name || user.email.split('@')[0]}</p>
                  <span className="text-[10px] text-[#F1B941] uppercase tracking-wider">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  title={t.logout}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B192C] border-b border-[#F1B941]/20 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-[#1E3E62] text-[#F1B941]' : 'text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4 text-[#F1B941]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {(['en', 'hi', 'te'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs ${
                    language === lang ? 'bg-[#F1B941] text-[#081225] font-semibold' : 'text-slate-300'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-xs text-red-400 px-3 py-1.5 rounded bg-red-950/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logout}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="text-xs px-3 py-1.5 rounded bg-[#F1B941] text-[#081225] font-semibold"
              >
                {t.login}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

