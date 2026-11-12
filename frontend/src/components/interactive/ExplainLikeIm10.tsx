import React, { useState, useEffect } from 'react';
import { Sparkles, Smile, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { useLanguage } from '../../context/LanguageContext';

export const ExplainLikeIm10: React.FC = () => {
  const { language } = useLanguage();
  const [chapter, setChapter] = useState(2);
  const [verse, setVerse] = useState(47);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const presetVerses = [
    { ch: 2, v: 47, label: "2.47 • The Toy Painter (Karma)" },
    { ch: 6, v: 5, label: "6.5 • Inner Superhero (Mind)" },
    { ch: 2, v: 70, label: "2.70 • Giant Blue Ocean (Calm)" },
    { ch: 9, v: 26, label: "9.26 • The Simple Wildflower (Love)" }
  ];

  useEffect(() => {
    loadStory(chapter, verse);
  }, [chapter, verse, language]);

  const loadStory = async (ch: number, v: number) => {
    setLoading(true);
    try {
      const res = await interactiveService.getELI10(ch, v, language);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStoryText = () => {
    if (!data) return '';
    if (language === 'te' && data.story_te) return data.story_te;
    if (language === 'hi' && data.story_hi) return data.story_hi;
    return data.story_en || data.story || '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 mb-3 text-xs text-emerald-300">
          <Smile className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'పిల్లల కోసం గీతా కథలు' : language === 'hi' ? 'बाल-सुलభ गीता ज्ञान' : "Explain Like I'm 10 (ELI10)"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'సరళమైన కథలతో భగవద్గీత' : language === 'hi' ? 'सरल एवं रोचक उदाहरणों में गीता' : "Gita Wisdom Made Simple & Fun"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'పిల్లలు మరియు ప్రారంభకులకు సులభంగా అర్థమయ్యేలా ఆసక్తికరమైన కథలు మరియు రూపకాలు.' : language === 'hi' ? 'बच्चों एवं नए साधकों हेतु सरल, प्रेरक कहानियों और सुंदर उदाहरणों में गीता के गूढ़ रहस्य।' : "Profound metaphysical truths translated into delightful, memorable metaphors like LEGOs, kites, and oceans."}
        </p>
      </div>

      {/* Preset Verse Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {presetVerses.map((pv, i) => (
          <button
            key={i}
            onClick={() => {
              setChapter(pv.ch);
              setVerse(pv.v);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              chapter === pv.ch && verse === pv.v
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 border-emerald-400 text-white shadow-lg'
                : 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            {pv.label}
          </button>
        ))}
      </div>

      {/* Story Card */}
      {loading ? (
        <div className="text-center py-20 krishna-card rounded-3xl">
          <Sparkles className="w-8 h-8 mx-auto text-emerald-400 animate-spin mb-3" />
          <p className="text-xs text-slate-400">Weaving a delightful wisdom story for you...</p>
        </div>
      ) : data && (
        <div className="krishna-card rounded-3xl p-6 sm:p-10 border border-emerald-400/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#0A261D]/70 via-[#0B192C] to-[#081225] space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                {data.metaphor || '🦚 Gentle Metaphor'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {data.title}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
              {data.verse_ref}
            </span>
          </div>

          {/* Story Body */}
          <div className="p-6 rounded-2xl bg-[#081225]/80 border border-emerald-500/20 text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {getStoryText()}
          </div>

          {/* Super Kid Takeaway Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-[#1E3E62]/40 border border-emerald-400/30 flex items-center space-x-3">
            <span className="text-2xl">🌟</span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Simple Takeaway to Remember
              </span>
              <p className="text-xs sm:text-sm font-semibold text-white">
                "{data.kid_takeaway || 'You are capable of doing wonderful things with a calm heart!'}"
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
