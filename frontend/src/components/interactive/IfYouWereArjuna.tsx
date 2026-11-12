import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, CheckCircle, AlertCircle, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { ArjunaScenario } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const IfYouWereArjuna: React.FC = () => {
  const { language } = useLanguage();
  const [scenarios, setScenarios] = useState<ArjunaScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const data = await interactiveService.getArjunaScenarios();
      setScenarios(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const currentScenario = scenarios[currentIndex];

  const handleSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    setCurrentIndex((prev) => (prev + 1) % scenarios.length);
  };

  if (loading || !currentScenario) {
    return (
      <div className="text-center py-20 krishna-card rounded-3xl">
        <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
        <p className="text-xs text-slate-400">Loading battlefield dilemmas...</p>
      </div>
    );
  }

  const chosenOption = currentScenario.options.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Shield className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'నీవే అర్జునుడివైతే' : language === 'hi' ? 'यदि आप अर्जुन होते' : "If You Were Arjuna"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'నిత్య జీవిత నైతిక సంక్షోభాలు' : language === 'hi' ? 'दैनिक जीवन के नैतिक धर्मसंकट' : "Real-Life Decision Crossroads"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'క్లిష్టమైన పరిస్థితులలో మీ ఎంపికను ఎన్నుకోండి. శ్రీకృష్ణుని బోధనలు మీ నిర్ణయాన్ని ఎలా సరిచేస్తాయో తెలుసుకోండి.' : language === 'hi' ? 'कठिन परिस्थितियों में अपने विकल्प का चयन करें और जानें कि श्रीकृष्ण का ज्ञान किस मार्ग का निर्देश देता है।' : "Choose your path in complex modern dilemmas. Discover how Krishna's battlefield counsel guides the highest action."}
        </p>
      </div>

      {/* Progress & Pagination */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>Scenario {currentIndex + 1} of {scenarios.length}</span>
        <div className="flex space-x-1.5">
          {scenarios.map((_, idx) => (
            <div
              key={idx}
              className={`w-6 h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[#F1B941]' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Scenario Box */}
      <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-2xl relative">
        
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
          {currentScenario.title}
        </h3>

        {/* Narrative Context */}
        <div className="p-4 rounded-2xl bg-[#081225]/80 border border-slate-800 mb-6 text-sm text-slate-200 leading-relaxed font-normal">
          {currentScenario.context}
        </div>

        {/* Question */}
        <p className="text-xs sm:text-sm font-semibold text-[#F1B941] uppercase tracking-wider mb-4">
          {currentScenario.question}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentScenario.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3 ${
                  isSelected
                    ? option.is_gita_aligned
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-500/10'
                      : 'bg-amber-950/30 border-amber-500/60 text-amber-100'
                    : 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isSelected
                    ? option.is_gita_aligned ? 'bg-emerald-500 text-black' : 'bg-amber-500 text-black'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {option.id}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Section Once Selected */}
        {chosenOption && (
          <div className={`p-5 rounded-2xl border animate-fade-in ${
            chosenOption.is_gita_aligned
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-amber-950/20 border-amber-500/40'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {chosenOption.is_gita_aligned ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <h4 className={`text-sm font-bold ${
                chosenOption.is_gita_aligned ? 'text-emerald-300' : 'text-amber-300'
              }`}>
                {chosenOption.is_gita_aligned
                  ? (language === 'te' ? 'ధర్మబద్ధమైన మార్గం (శ్రీకృష్ణుని బోధన)' : language === 'hi' ? 'धर्मसम्मत मार्ग (श्रीकृष्ण का उपदेश)' : 'Gita-Aligned Righteous Action (Dharma)')
                  : (language === 'te' ? 'అర్జునుని తొలి సంకోచం (మోహము & భయము)' : language === 'hi' ? 'अर्जुन का प्रारंभिक संकोच (मोह एवं भय)' : "Seeker's Initial Hesitation (Moha & Fear)")
                }
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
              {chosenOption.feedback}
            </p>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-2">
              <span className="font-mono text-[#F1B941] font-semibold">
                Reference: {currentScenario.verse_ref}
              </span>
              <span className="text-slate-300 italic">
                "{currentScenario.core_lesson}"
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all flex items-center space-x-2"
          >
            <span>{currentIndex === scenarios.length - 1 ? (language === 'te' ? 'మొదటినుండి' : language === 'hi' ? 'पुनः खेलें' : 'Restart Scenarios') : (language === 'te' ? 'తదుపరి సంక్షోభం' : language === 'hi' ? 'अगला धर्मसंकट' : 'Next Scenario')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

