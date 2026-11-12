import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Sword, Heart, Award, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { KurukshetraStage } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const InteractiveKurukshetra: React.FC = () => {
  const { language } = useLanguage();
  const [stages, setStages] = useState<KurukshetraStage[]>([]);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
  const [composure, setComposure] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStages();
  }, []);

  const loadStages = async () => {
    setLoading(true);
    try {
      const data = await interactiveService.getKurukshetraStages();
      setStages(data);
      setCurrentStageIdx(0);
      setSelectedChoice(null);
      setComposure(60);
      setIsCompleted(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const currentStage = stages[currentStageIdx];

  const handleChoice = (choice: 'A' | 'B') => {
    if (selectedChoice) return;
    setSelectedChoice(choice);

    if (choice === currentStage.aligned_choice) {
      setComposure(prev => Math.min(100, prev + 10));
    } else {
      setComposure(prev => Math.max(30, prev - 10));
    }
  };

  const handleNextStage = () => {
    if (currentStageIdx < stages.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      setSelectedChoice(null);
    } else {
      setIsCompleted(true);
    }
  };

  if (loading || !currentStage) {
    return (
      <div className="text-center py-20 krishna-card rounded-3xl">
        <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
        <p className="text-xs text-slate-400">Summoning the Chariot of Kurukshetra...</p>
      </div>
    );
  }

  const isAligned = selectedChoice === currentStage.aligned_choice;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/40 mb-3 text-xs text-amber-300">
          <Sword className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'te' ? 'కురుక్షేత్ర రణరంగ అనుభవం' : language === 'hi' ? 'कुरुक्षेत्र युद्धक्षेत्र अनुभव' : "Interactive Kurukshetra Experience"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'జీవన రథంపై కృష్ణుని మార్గదర్శకత్వం' : language === 'hi' ? 'जीवन-रथ पर श्रीकृष्ण का मार्गदर्शन' : "Step Into Arjuna's Chariot"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'అంతర్గత భయాలు, సంశయాలు మరియు కామక్రోధాలపై 5 దశలలో పోరాడి ఆధ్యాత్మిక విజయాన్ని సాధించండి.' : language === 'hi' ? 'भय, संशय और छह आंतरिक शत्रुओं पर 5 चरणों में विजय प्राप्त कर धर्म योद्धा बनें।' : "Navigate the 5 epic moral crossroads of the battlefield. Face down doubt, master your composure, and raise your Gandiva bow."}
        </p>
      </div>

      {!isCompleted ? (
        <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-2xl relative space-y-6">
          
          {/* Top Status & Composure Meter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-[#F1B941] uppercase tracking-widest block">
                Stage {currentStage.stage_num} of {stages.length}
              </span>
              <h3 className="text-lg font-serif font-bold text-white">
                {currentStage.title}
              </h3>
            </div>

            {/* Composure Clarity Meter */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-300 font-semibold">Arjuna's Composure:</span>
              <div className="w-28 sm:w-36 bg-[#081225] h-3 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    composure >= 70 ? 'bg-gradient-to-r from-emerald-500 to-[#F1B941]' : 'bg-gradient-to-r from-red-500 to-amber-500'
                  }`}
                  style={{ width: `${composure}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#F1B941]">{composure}%</span>
            </div>
          </div>

          {/* Narrative Crossroads Box */}
          <div className="p-5 rounded-2xl bg-[#081225]/80 border border-slate-800 text-sm text-slate-200 leading-relaxed font-normal">
            {currentStage.description}
          </div>

          {/* Decision Crossroads Choices */}
          <div className="space-y-3">
            <button
              onClick={() => handleChoice('A')}
              disabled={selectedChoice !== null}
              className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${
                selectedChoice === 'A'
                  ? currentStage.aligned_choice === 'A'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow'
                    : 'bg-red-950/30 border-red-500 text-red-100'
                  : selectedChoice !== null && currentStage.aligned_choice === 'A'
                  ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                A
              </span>
              <span className="leading-relaxed">{currentStage.choice_a}</span>
            </button>

            <button
              onClick={() => handleChoice('B')}
              disabled={selectedChoice !== null}
              className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start space-x-3 ${
                selectedChoice === 'B'
                  ? currentStage.aligned_choice === 'B'
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-100 shadow'
                    : 'bg-red-950/30 border-red-500 text-red-100'
                  : selectedChoice !== null && currentStage.aligned_choice === 'B'
                  ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                B
              </span>
              <span className="leading-relaxed">{currentStage.choice_b}</span>
            </button>
          </div>

          {/* Feedback & Gita Lesson */}
          {selectedChoice && (
            <div className={`p-4 rounded-2xl border animate-fade-in text-xs sm:text-sm leading-relaxed ${
              isAligned ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100' : 'bg-amber-950/30 border-amber-500/40 text-amber-100'
            }`}>
              <span className="font-bold block mb-1">
                {isAligned ? '✨ Krishna\'s Nod of Approval:' : '⚡ The Charioteer Counsels:'}
              </span>
              {currentStage.lesson}
            </div>
          )}

          {/* Next Button */}
          {selectedChoice && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextStage}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all flex items-center space-x-1.5"
              >
                <span>{currentStageIdx === stages.length - 1 ? 'Claim Victory Certificate' : 'Next Battle Stage'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Victory Screen */
        <div className="krishna-card rounded-3xl p-8 sm:p-12 border-2 border-[#F1B941] shadow-2xl text-center space-y-6 animate-fade-in bg-gradient-to-b from-[#1E3E62]/80 via-[#0A1A2F] to-[#081225]">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-1 shadow-xl shadow-[#F1B941]/30">
            <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-4xl">
              🏹
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-[#F1B941] uppercase tracking-widest block mb-1">
              Battlefield Completed • Dharma Prevails
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The Chariot Triumphs: You Are Battle-Ready!
            </h3>
            <p className="text-sm font-serif italic text-amber-200 mt-2">
              "नष्टो मोहः स्मृतिर्लब्धा त्वत्प्रसादान्मयाच्युत। स्थितोऽस्मि गतसन्देहः करिष्ये वचनं तव॥"
            </p>
            <p className="text-xs text-slate-300 max-w-lg mx-auto mt-2">
              "Delusion is destroyed, divine memory is regained. My doubts have vanished, and I stand resolute to perform my duty!" (Bhagavad Gita 18.73)
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={loadStages}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Step Into The Chariot Again</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
