import React from 'react';
import { Sparkles, Heart, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050B14] border-t border-[#F1B941]/20 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Divine Sanskrit Inscription */}
        <div className="text-center mb-10 pb-8 border-b border-slate-800/80">
          <p className="text-lg sm:text-xl font-serif text-[#F1B941] italic tracking-wide mb-2">
            "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          </p>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            "Whenever righteousness declines and purpose falters, timeless wisdom awakens to illuminate the path." — Bhagavad Gita 4.7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦚</span>
              <span className="font-serif font-bold text-lg text-slate-100">{t.appName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An intelligent spiritual guidance platform combining Lord Krishna's eternal counsel in the Bhagavad Gita with context-aware AI.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#F1B941]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context Bridge Engine v1.0</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('chat')} className="hover:text-[#F1B941] transition-colors">
                  AI Krishna Chat
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-[#F1B941] transition-colors">
                  All 18 Chapters & 700 Verses
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('daily')} className="hover:text-[#F1B941] transition-colors">
                  Daily Gita Wisdom
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('saved')} className="hover:text-[#F1B941] transition-colors">
                  Saved Life Guidance
                </button>
              </li>
            </ul>
          </div>

          {/* Life Situations */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Guidance Areas</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Career & Workplace Comparison</li>
              <li>Overthinking & Restlessness</li>
              <li>Fear of Failure & Performance Stress</li>
              <li>Anger & Ego Control</li>
              <li>Relationships & Healthy Detachment</li>
              <li>Life Crossroads & Purpose</li>
            </ul>
          </div>

          {/* Safety & Respect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5 text-amber-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Spiritual Integrity</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              AI Krishna is an AI spiritual companion inspired by the Bhagavad Gita. It distinguishes authentic scripture from interpretation and does not replace medical, mental health, legal, or financial counseling.
            </p>
            <p className="text-[11px] text-slate-400">
              In severe emotional crisis, call Tele-MANAS (14416) or 988.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} AI KRISHNA – Your Life Companion. Built with reverence.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for seekers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

