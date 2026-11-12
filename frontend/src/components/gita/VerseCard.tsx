import React, { useState } from 'react';
import { BookOpen, Bookmark, Copy, Check, ArrowRight } from 'lucide-react';
import { Verse } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

interface VerseCardProps {
  verse: Verse;
  onOpenDetail?: (verse: Verse) => void;
  onBookmarkSaved?: () => void;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, onOpenDetail, onBookmarkSaved }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeLang, setActiveLang] = useState<'en' | 'hi' | 'te'>(language);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const translation = (
    activeLang === 'hi' && verse.translation_hi ? verse.translation_hi :
    activeLang === 'te' && verse.translation_te ? verse.translation_te :
    verse.translation_en
  );

  const handleCopy = () => {
    const text = `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}\n${verse.slok_sanskrit}\n${verse.transliteration}\n\n${translation}`;
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

  const situations = verse.life_situations ? verse.life_situations.split(',').map(s => s.trim()) : [];

  return (
    <div className="krishna-card rounded-2xl p-5 hover:border-[#F1B941]/50 transition-all flex flex-col justify-between">
      <div>
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
              BG {verse.chapter_number}.{verse.verse_number}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {/* Lang switcher */}
            <div className="flex bg-[#081225] rounded p-0.5 border border-slate-700 text-[10px]">
              {(['en', 'hi', 'te'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setActiveLang(l)}
                  className={`px-1.5 py-0.5 rounded ${activeLang === l ? 'bg-[#F1B941] text-[#081225] font-bold' : 'text-slate-400'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Copy verse"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {user && (
              <button
                onClick={handleBookmark}
                className="p-1 rounded text-slate-400 hover:text-[#F1B941]"
                title="Save to favorites"
              >
                <Bookmark className={`w-3.5 h-3.5 ${saved ? 'text-[#F1B941] fill-[#F1B941]' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Sanskrit */}
        <div className="text-center py-2 px-3 my-2 bg-[#081225]/70 rounded-xl border border-[#F1B941]/15">
          <p className="font-serif text-sm sm:text-base text-amber-200 leading-relaxed whitespace-pre-line font-medium">
            {verse.slok_sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-[11px] italic text-slate-400 text-center font-serif mb-3 line-clamp-2">
          {verse.transliteration}
        </p>

        {/* Translation */}
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3 line-clamp-3">
          {translation}
        </p>

      </div>

      <div>
        {/* Situation tags */}
        {situations.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {situations.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Detail */}
        {onOpenDetail && (
          <button
            onClick={() => onOpenDetail(verse)}
            className="w-full pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#F1B941] hover:underline"
          >
            <span>Detailed Purport & Application</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
