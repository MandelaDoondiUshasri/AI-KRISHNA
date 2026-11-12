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
    { id: 'home', label: t.homeNav, icon: Sparkles },
    { id: 'chat', label: t.chatNav, icon: MessageSquare },
    { id: 'explorer', label: t.explorerNav, icon: Compass },
    { id: 'daily', label: t.dailyNav, icon: Sun },
    { id: 'saved', label: t.savedNav, icon: Bookmark },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: t.adminNav, icon: Shield }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#081225]/95 border-b border-[#F1B941]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Brand (No wrap) */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-0.5 shadow-md shadow-[#008DDA]/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center">
                <span className="text-lg sm:text-xl select-none leading-none">🦚</span>
              </div>
            </div>
            
            <div className="flex flex-col justify-center shrink-0">
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="text-sm sm:text-base lg:text-lg font-bold tracking-wider gold-gradient-text uppercase font-serif whitespace-nowrap">
                  {t.appName}
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[#F1B941]/10 text-[#F1B941] rounded border border-[#F1B941]/30 leading-none">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-[#94A3B8] tracking-wider whitespace-nowrap hidden sm:block mt-0.5 leading-tight">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3E62] text-[#F1B941] border border-[#F1B941]/40 shadow-sm shadow-[#F1B941]/15'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#F1B941]' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mid-size Desktop Nav */}
          <nav className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3E62] text-[#F1B941] border border-[#F1B941]/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Selector & Auth */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#0B192C] border border-[#F1B941]/30 rounded-lg p-0.5 text-xs shrink-0">
              <Globe className="w-3.5 h-3.5 text-[#F1B941] ml-1 mr-0.5 shrink-0" />
              {(['en', 'hi', 'te'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap transition-colors ${
                    language === lang
                      ? 'bg-[#F1B941] text-[#081225]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </button>
              ))}
            </div>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-700 shrink-0">
                <div className="text-right leading-none">
                  <p className="text-xs font-semibold text-slate-200 whitespace-nowrap">{user.full_name || user.email.split('@')[0]}</p>
                  <span className="text-[9px] text-[#F1B941] uppercase tracking-wider">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  title={t.logout}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{t.login}</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap ${
                  isActive ? 'bg-[#1E3E62] text-[#F1B941]' : 'text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4 text-[#F1B941] shrink-0" />
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
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    language === lang ? 'bg-[#F1B941] text-[#081225]' : 'text-slate-300'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
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
                className="text-xs px-3 py-1.5 rounded-xl bg-[#F1B941] text-[#081225] font-bold"
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
