import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { MythItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const MythVsTruth: React.FC = () => {
  const { language } = useLanguage();
  const [myths, setMyths] = useState<MythItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyths();
  }, []);

  const loadMyths = async () => {
    try {
      const data = await interactiveService.getMyths();
      setMyths(data);
      if (data.length > 0) {
        setExpandedId(data[0].id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getTruthText = (m: MythItem) => {
    if (language === 'te') return m.truth_te;
    if (language === 'hi') return m.truth_hi;
    return m.truth_en;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'అపోహలు vs వాస్తవాలు' : language === 'hi' ? 'भ्रम बनाम शाश्वत सत्य' : "Myth vs Truth"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'భగవద్గీతపై ప్రచారంలో ఉన్న అపోహలు' : language === 'hi' ? 'भगवद्गीता के संबंध में प्रचलित भ्रांतियां' : "Dispelling Common Gita Misconceptions"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'శతాబ్దాలుగా ప్రచారంలో ఉన్న అపోహలను ఛేదించి, శ్రీకృష్ణుని అసలైన బోధనలను శాస్త్రీయంగా తెలుసుకోండి.' : language === 'hi' ? 'सदियों से चली आ रही भ्रांतियों को तोड़कर श्रीकृष्ण के मूल शास्त्रीय उपदेशों के वास्तविक स्वरूप को जानें।' : "Explore authentic scriptural facts debunking popular misunderstandings about Karma, detachment, and Kurukshetra."}
        </p>
      </div>

      {/* Myth Accordion Cards */}
      {loading ? (
        <div className="text-center py-20 krishna-card rounded-3xl">
          <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
          <p className="text-xs text-slate-400">Loading Vedic truths...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myths.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`krishna-card rounded-2xl border transition-all overflow-hidden ${
                  isExpanded ? 'border-[#F1B941]/50 shadow-xl' : 'border-slate-800'
                }`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30 font-bold text-[11px] uppercase tracking-wider shrink-0">
                      Popular Myth
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-slate-100">
                      "{item.statement}"
                    </h3>
                  </div>

                  <div className="text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#F1B941]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 animate-fade-in space-y-3">
                    
                    <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4" />
                      <span>Scriptural Truth (శాస్త్రీయ సత్యం)</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal bg-[#081225]/70 p-4 rounded-xl border border-emerald-500/20">
                      {getTruthText(item)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span className="font-mono text-[#F1B941] font-semibold flex items-center space-x-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Scriptural Anchor: {item.verse_proof}</span>
                      </span>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

