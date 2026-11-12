import React from 'react';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Chapter } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ChapterCardProps {
  chapter: Chapter;
  onSelect: (chapterNumber: number) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onSelect }) => {
  const { language } = useLanguage();

  const summary = (
    language === 'hi' ? chapter.summary_hi :
    language === 'te' ? chapter.summary_te :
    chapter.summary_en
  ) || chapter.summary_en;

  const themes = chapter.key_themes ? chapter.key_themes.split(',').map(t => t.trim()) : [];

  return (
    <div 
      onClick={() => onSelect(chapter.chapter_number)}
      className="krishna-card rounded-2xl p-5 hover:border-[#F1B941]/60 transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
            Chapter {chapter.chapter_number}
          </span>
          <span className="text-xs text-slate-400">
            {chapter.verses_count} Verses
          </span>
        </div>

        <h3 className="font-serif font-bold text-lg text-slate-100 group-hover:text-[#F1B941] transition-colors">
          {chapter.name_transliteration}
        </h3>
        
        <p className="font-serif text-sm text-[#F1B941]/90 mb-2 font-medium">
          {chapter.name_sanskrit}
        </p>

        <p className="text-xs font-medium text-sky-300 mb-3">
          {chapter.name_english}
        </p>

        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
          {summary}
        </p>
      </div>

      <div>
        {themes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {themes.slice(0, 3).map((theme, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
                {theme}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-[#F1B941] group-hover:translate-x-0.5 transition-transform">
          <span>Read Chapter Verses</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

