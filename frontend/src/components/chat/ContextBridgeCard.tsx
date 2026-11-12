import React, { useState } from 'react';
import { BookOpen, Sparkles, CheckCircle2, Bookmark, Copy, Check, ShieldAlert, HeartHandshake, Compass, Flame } from 'lucide-react';
import { StructuredResponse } from '../../types';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

interface ContextBridgeCardProps {
  data: StructuredResponse;
  onBookmarkSaved?: () => void;
}

export const ContextBridgeCard: React.FC<ContextBridgeCardProps> = ({ data, onBookmarkSaved }) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleCopyVerse = () => {
    if (!data.verse) return;
    const text = `Bhagavad Gita Chapter ${data.verse.chapter_number}, Verse ${data.verse.verse_number}\n\n${data.verse.slok_sanskrit}\n\n${data.verse.transliteration}\n\nTranslation:\n${data.verse.translation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveVerse = async () => {
    if (!user || !data.verse?.id) return;
    try {
      await userService.addFavorite(
        'verse',
        data.verse.id,
        undefined,
        `BG ${data.verse.chapter_number}.${data.verse.verse_number}`,
        data.thought_to_remember
      );
      setSaved(true);
      if (onBookmarkSaved) onBookmarkSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-4 text-slate-200">
      
      {/* Attribution & Emotion Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-700/60 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#F1B941] animate-pulse"></span>
          <span className="text-[#F1B941] font-medium tracking-wide">
            {data.is_direct_verse ? 'Direct Bhagavad Gita Scripture Match' : 'Philosophical Gita Connection'}
          </span>
        </div>
        {data.emotion_detected && (
          <span className="px-2.5 py-0.5 rounded-full bg-[#1E3E62] text-xs text-sky-200 border border-sky-400/30">
            {data.emotion_detected}
          </span>
        )}
      </div>

      {/* 1. Understanding Your Situation */}
      <div className="bg-[#0B192C]/80 border-l-4 border-amber-400 p-4 rounded-r-xl">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <HeartHandshake className="w-4 h-4" />
          <span>1. Understanding Your Situation</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {data.situation_understanding}
        </p>
      </div>

      {/* 2. Krishna's Wisdom */}
      <div className="bg-[#0D2440]/60 border border-sky-500/20 p-4 rounded-xl">
        <div className="flex items-center space-x-2 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-[#F1B941]" />
          <span>2. Krishna's Wisdom</span>
        </div>
        <p className="text-sm text-slate-100 leading-relaxed">
          {data.krishna_wisdom}
        </p>
      </div>

      {/* 3. Relevant Bhagavad Gita Verse */}
      {data.verse && (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#132B45] to-[#0A1A2F] border border-[#F1B941]/40 rounded-xl p-5 shadow-lg shadow-black/40">
          
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F1B941]/20">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-[#F1B941]" />
              <span className="text-xs font-bold font-serif text-[#F1B941] tracking-wider uppercase">
                3. Relevant Bhagavad Gita Verse (Chapter {data.verse.chapter_number}, Verse {data.verse.verse_number})
              </span>
            </div>
            
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleCopyVerse}
                title="Copy Sanskrit Verse & Translation"
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {user && data.verse.id && (
                <button
                  onClick={handleSaveVerse}
                  title="Bookmark this verse"
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-[#F1B941] transition-colors"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'text-[#F1B941] fill-[#F1B941]' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Sanskrit Devanagari */}
          <div className="text-center my-4 py-2 bg-[#081225]/60 rounded-lg border border-[#F1B941]/20 px-3">
            <p className="font-serif text-base sm:text-lg text-amber-200 tracking-wide leading-relaxed whitespace-pre-line font-medium">
              {data.verse.slok_sanskrit}
            </p>
          </div>

          {/* IAST Transliteration */}
          <p className="text-xs italic text-slate-400 text-center font-serif mb-4 whitespace-pre-line">
            {data.verse.transliteration}
          </p>

          {/* Translation */}
          <div className="pt-3 border-t border-slate-700/60">
            <span className="text-[11px] font-semibold text-[#F1B941] uppercase tracking-wider block mb-1">
              Meaning:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {data.verse.translation}
            </p>
          </div>
        </div>
      )}

      {/* 4. How This Applies to Your Life */}
      <div className="bg-[#0B192C]/80 border border-slate-700/60 p-4 rounded-xl">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>4. How This Applies to Your Life</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          {data.how_it_applies}
        </p>
      </div>

      {/* 5. Practical Steps You Can Take */}
      {data.practical_steps && data.practical_steps.length > 0 && (
        <div className="bg-[#081225]/80 border border-slate-700/70 p-4 rounded-xl">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>5. Practical Steps You Can Take</span>
          </div>
          <div className="space-y-2.5">
            {data.practical_steps.map((step, idx) => {
              const isChecked = completedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#0B192C] border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center ${
                    isChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through opacity-75' : ''}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. A Thought to Remember */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#F1B941]/15 via-[#B8860B]/20 to-[#F1B941]/10 border border-[#F1B941]/40 text-center">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#F1B941] block mb-1">
          6. A Thought to Remember
        </span>
        <p className="font-serif italic text-sm sm:text-base text-amber-100 font-medium">
          "{data.thought_to_remember}"
        </p>
      </div>

      {/* Safety & Spiritual Integrity Disclaimer */}
      {data.disclaimer && (
        <p className="text-[11px] text-slate-400 italic text-center pt-2">
          {data.disclaimer}
        </p>
      )}

    </div>
  );
};

