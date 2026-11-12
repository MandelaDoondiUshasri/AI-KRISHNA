import React, { useState, useEffect } from 'react';
import { Sun, Sparkles, Copy, Check, Bookmark, Share2, Compass, BookOpen } from 'lucide-react';
import { DailyWisdom } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

interface DailyWisdomCardProps {
  daily: DailyWisdom;
  onBookmarkSaved?: () => void;
}

export const DailyWisdomCard: React.FC<DailyWisdomCardProps> = ({ daily, onBookmarkSaved }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'te'>(language);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setActiveLang(language);
  }, [language]);

  const verse = daily.verse;
  const translation = (
    activeLang === 'hi' && verse.translation_hi ? verse.translation_hi :
    activeLang === 'te' && verse.translation_te ? verse.translation_te :
    verse.translation_en
  );

  const reflection = (
    activeLang === 'hi' && daily.reflection_hi ? daily.reflection_hi :
    activeLang === 'te' && daily.reflection_te ? daily.reflection_te :
    daily.reflection_en
  );

  const handleCopy = () => {
    const text = `Bhagavad Gita Daily Wisdom (${daily.date_str})\nChapter ${verse.chapter_number}, Verse ${verse.verse_number}\n\n${verse.slok_sanskrit}\n\n${verse.transliteration}\n\nMeaning:\n${translation}\n\nDaily Focus:\n${daily.practical_focus || reflection}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = async () => {
    if (!user) return;
    try {
      await userService.addFavorite(
        'verse',
        verse.id,
        undefined,
        `Daily Wisdom: BG ${verse.chapter_number}.${verse.verse_number}`,
        daily.practical_focus || daily.reflection_en
      );
      setSaved(true);
      if (onBookmarkSaved) onBookmarkSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative overflow-hidden krishna-card rounded-3xl p-6 sm:p-10 border border-[#F1B941]/40 shadow-2xl">
      
      {/* Decorative Aura background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-[#F1B941]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F1B941]/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1E3E62] to-[#F1B941] p-0.5 shadow-md shadow-[#F1B941]/20">
            <div className="w-full h-full rounded-2xl bg-[#081225] flex items-center justify-center text-2xl text-amber-300">
              <Sun className="w-6 h-6 animate-spin [animation-duration:20s]" />
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#F1B941] uppercase tracking-widest block">
              {t.todayContemplationBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {language === 'te' ? 'భగవద్గీత' : language === 'hi' ? 'भगवद्गीता' : 'Bhagavad Gita'} {verse.chapter_number}.{verse.verse_number}
            </h2>
          </div>
        </div>

        {/* Language & Actions */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#081225] rounded-lg p-1 border border-slate-700 text-xs">
            {(['en', 'hi', 'te'] as const).map(l => (
              <button
                key={l}
                onClick={() => setActiveLang(l)}
                className={`px-2.5 py-1 rounded font-medium ${
                  activeLang === l ? 'bg-[#F1B941] text-[#081225] font-bold' : 'text-slate-300'
                }`}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हिन्दी' : 'తెలుగు'}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Share / Copy Wisdom"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {user && (
            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-[#F1B941] border border-slate-700 transition-colors"
              title="Save to favorites"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'text-[#F1B941] fill-[#F1B941]' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Sanskrit Verse & Transliteration */}
      <div className="my-8 text-center bg-[#081225]/80 border border-[#F1B941]/25 rounded-2xl p-6 sm:p-8">
        <p className="font-serif text-xl sm:text-2xl text-amber-200 leading-relaxed whitespace-pre-line font-medium mb-4">
          {verse.slok_sanskrit}
        </p>
        <p className="font-serif italic text-sm text-slate-300 whitespace-pre-line max-w-2xl mx-auto">
          {verse.transliteration}
        </p>
      </div>

      {/* Translation */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#0B192C]/90 border border-slate-700/80">
        <span className="text-xs font-semibold text-[#F1B941] uppercase tracking-wider block mb-1">
          {t.eternalMeaning}
        </span>
        <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
          {translation}
        </p>
      </div>

      {/* Daily Reflection & Practical Application */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D2440]/70 border border-sky-500/20">
          <div className="flex items-center space-x-2 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#F1B941]" />
            <span>{t.whyItMatters}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {reflection}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1A2F]/90 border border-emerald-500/20">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>{t.todayFocus}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {daily.practical_focus || (
              language === 'te' ? "ఆందోళన లేదా పోలికల భారం లేకుండా నేటి ప్రతి పనిని పూర్తి ఏకాగ్రతతో అంకితభావంతో చేయండి." :
              language === 'hi' ? "चिंता या तुलना के बोझ से मुक्त होकर, आज के प्रत्येक कर्म को पूर्ण एकाग्रता से समर्पित करें।" :
              "Dedicate every action today with total attention, free from the burden of anxious comparison."
            )}
          </p>
        </div>
      </div>

    </div>
  );
};

