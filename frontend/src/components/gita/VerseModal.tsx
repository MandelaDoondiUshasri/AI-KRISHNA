import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Bookmark, Sparkles, BookOpen } from 'lucide-react';
import { Verse } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

interface VerseModalProps {
  verse: Verse | null;
  onClose: () => void;
  onBookmarkSaved?: () => void;
}

export const VerseModal: React.FC<VerseModalProps> = ({ verse, onClose, onBookmarkSaved }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'en' | 'hi' | 'te'>(language);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setActiveTab(language);
  }, [language]);

  if (!verse) return null;

  const handleCopy = () => {
    const text = `Bhagavad Gita Chapter ${verse.chapter_number}, Verse ${verse.verse_number}\n\n${verse.slok_sanskrit}\n\n${verse.transliteration}\n\nEnglish:\n${verse.translation_en}\n\nHindi:\n${verse.translation_hi || 'N/A'}\n\nTelugu:\n${verse.translation_te || 'N/A'}\n\nExplanation:\n${verse.explanation}`;
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
        `BG ${verse.chapter_number}.${verse.verse_number}`,
        verse.explanation || undefined
      );
      setSaved(true);
      if (onBookmarkSaved) onBookmarkSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#081225] border border-[#F1B941]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F1B941]/20 pr-8">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
              {language === 'te' ? `భగవద్గీత అధ్యాయం ${verse.chapter_number}, శ్లోకం ${verse.verse_number}` : language === 'hi' ? `भगवद्गीता अध्याय ${verse.chapter_number}, श्लोक ${verse.verse_number}` : `Bhagavad Gita Chapter ${verse.chapter_number}, Verse ${verse.verse_number}`}
            </span>
            <h2 className="text-lg font-serif font-bold text-white mt-1">
              {verse.chapter_title_en || `${t.chapterWord} ${verse.chapter_number}`}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Copy verse"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            {user && (
              <button
                onClick={handleBookmark}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-[#F1B941]"
                title="Bookmark verse"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'text-[#F1B941] fill-[#F1B941]' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Sanskrit Devanagari */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-b from-[#132B45] to-[#0A1A2F] border border-[#F1B941]/30 text-center">
          <p className="font-serif text-lg sm:text-xl text-amber-200 leading-relaxed whitespace-pre-line font-medium mb-3">
            {verse.slok_sanskrit}
          </p>
          <p className="text-xs sm:text-sm italic text-slate-300 font-serif whitespace-pre-line">
            {verse.transliteration}
          </p>
        </div>

        {/* Multilingual Translation Switcher */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t.translationWord}
            </span>
            <div className="flex bg-[#0B192C] p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setActiveTab('en')}
                className={`px-3 py-1 rounded ${activeTab === 'en' ? 'bg-[#F1B941] text-[#081225] font-bold' : 'text-slate-300'}`}
              >
                English
              </button>
              <button
                onClick={() => setActiveTab('hi')}
                className={`px-3 py-1 rounded ${activeTab === 'hi' ? 'bg-[#F1B941] text-[#081225] font-bold' : 'text-slate-300'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setActiveTab('te')}
                className={`px-3 py-1 rounded ${activeTab === 'te' ? 'bg-[#F1B941] text-[#081225] font-bold' : 'text-slate-300'}`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800 text-sm text-slate-100 leading-relaxed">
            {activeTab === 'en' && verse.translation_en}
            {activeTab === 'hi' && (verse.translation_hi || verse.translation_en)}
            {activeTab === 'te' && (verse.translation_te || verse.translation_en)}
          </div>
        </div>

        {/* Detailed Commentary / Explanation */}
        {verse.explanation && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-[#F1B941] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.philosophicalPurport}</span>
            </h4>
            <div className="p-4 rounded-xl bg-[#0B192C]/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {verse.explanation}
            </div>
          </div>
        )}

        {/* Concepts and Life Situations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {t.coreConcepts}
            </span>
            <div className="flex flex-wrap gap-1">
              {verse.core_concepts?.split(',').map((c, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[#1E3E62]/70 text-sky-200 border border-sky-400/20">
                  {c.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              {t.relevantSituations}
            </span>
            <div className="flex flex-wrap gap-1">
              {verse.life_situations?.split(',').map((s, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-[#B8860B]/20 text-amber-200 border border-amber-400/30">
                  #{t.situationsMap[s.trim().toLowerCase()] || s.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
