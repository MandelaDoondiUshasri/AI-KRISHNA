import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Compass, Play, Pause, RotateCcw, Check, BookOpen, Volume2 } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { MoodItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const MoodMirror: React.FC = () => {
  const { language, t } = useLanguage();
  const [moods, setMoods] = useState<MoodItem[]>([]);
  const [selectedMoodId, setSelectedMoodId] = useState<string>('anxious');
  const [guidance, setGuidance] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Breathing timer state
  const [breathActive, setBreathActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (7s)' | 'Exhale (8s)'>('Inhale (4s)');
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [practiceDone, setPracticeDone] = useState(false);

  useEffect(() => {
    loadMoods();
  }, []);

  useEffect(() => {
    if (selectedMoodId) {
      loadGuidance(selectedMoodId);
      setPracticeDone(false);
      setBreathActive(false);
    }
  }, [selectedMoodId, language]);

  // Breathing timer loop
  useEffect(() => {
    let timer: any = null;
    if (breathActive) {
      timer = setInterval(() => {
        setBreathSeconds(prev => {
          if (prev <= 1) {
            if (breathPhase.startsWith('Inhale')) {
              setBreathPhase('Hold (7s)');
              return 7;
            } else if (breathPhase.startsWith('Hold')) {
              setBreathPhase('Exhale (8s)');
              return 8;
            } else {
              setBreathPhase('Inhale (4s)');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [breathActive, breathPhase]);

  const loadMoods = async () => {
    try {
      const data = await interactiveService.getMoods();
      setMoods(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadGuidance = async (moodId: string) => {
    setLoading(true);
    try {
      const data = await interactiveService.getMoodGuidance(moodId, language);
      setGuidance(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const currentMood = moods.find(m => m.id === selectedMoodId) || moods[0];

  const getMoodTitle = (m: MoodItem) => {
    if (language === 'te') return m.title_te;
    if (language === 'hi') return m.title_hi;
    return m.title_en;
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>{language === 'te' ? 'భావోద్వేగ అద్దం' : language === 'hi' ? 'मन की स्थिति का दर्पण' : "Krishna's Mood Mirror"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'మీ ప్రస్తుత భావోద్వేగాన్ని ఎంచుకోండి' : language === 'hi' ? 'अपनी वर्तमान मनोस्थिति चुनें' : "How is your heart feeling right now?"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'మీ మనస్సును కలవరపెడుతున్న భావాన్ని గుర్తించి, గీత నుండి తక్షణ ప్రశాంతతను పొందండి.' : language === 'hi' ? 'अपनी भावना को स्वीकार करें और भगवद्गीता के शाश्वत ज्ञान से तत्काल मानसिक शांति पाएं।' : "Select your present emotion to receive tailored spiritual guidance and grounding scripture."}
        </p>
      </div>

      {/* Mood Selection Pills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 max-w-4xl mx-auto">
        {moods.map((m) => {
          const isSelected = m.id === selectedMoodId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedMoodId(m.id)}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center space-y-1.5 text-center ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1E3E62] to-[#0A1A2F] border-[#F1B941] shadow-lg shadow-[#F1B941]/20 scale-105'
                  : 'bg-[#0B192C]/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <span className="text-2xl select-none">{m.emoji}</span>
              <span className={`text-xs font-semibold ${isSelected ? 'text-[#F1B941]' : 'text-slate-300'}`}>
                {getMoodTitle(m)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Guidance Card */}
      {loading ? (
        <div className="text-center py-16 krishna-card rounded-3xl">
          <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
          <p className="text-xs text-slate-400">Krishna is reflecting upon your heart...</p>
        </div>
      ) : guidance && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          
          {/* Main Wisdom Banner */}
          <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/40 shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{currentMood?.emoji}</span>
              <div>
                <span className="text-[11px] font-bold text-[#F1B941] uppercase tracking-wider block">
                  {language === 'te' ? 'దివ్య పరిష్కారం' : language === 'hi' ? 'दिव्य मार्गदर्शन' : "Sri Krishna's Counsel"}
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  {currentMood ? getMoodTitle(currentMood) : ''}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal mb-6">
              {guidance.counsel}
            </p>

            {/* Sacred Verse Card */}
            {guidance.verse && (
              <div className="p-5 rounded-2xl bg-[#081225]/80 border border-[#F1B941]/30 my-4 text-center">
                <span className="text-xs font-bold text-[#F1B941] uppercase tracking-widest block mb-2">
                  Bhagavad Gita {guidance.verse.chapter_number}.{guidance.verse.verse_number}
                </span>
                <p className="font-serif text-base sm:text-lg text-amber-200 leading-relaxed font-medium mb-2 whitespace-pre-line">
                  {guidance.verse.slok_sanskrit}
                </p>
                <p className="text-xs italic text-slate-400 font-serif mb-3">
                  {guidance.verse.transliteration}
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-200">
                  <span className="text-[#F1B941] font-semibold mr-1.5">{t.verseMeaningLabel}</span>
                  {guidance.verse.translation}
                </div>
              </div>
            )}

            {/* Micro-Practice & Pranayama */}
            <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'తక్షణ ఆచరణ' : language === 'hi' ? 'तत्काल अभ्यास' : 'Immediate Calming Practice'}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {guidance.practice}
                </p>
                <button
                  onClick={() => setPracticeDone(true)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
                    practiceDone
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{practiceDone ? (language === 'te' ? 'ఆచరించబడింది ✓' : language === 'hi' ? 'अभ्यास पूर्ण ✓' : 'Practice Completed ✓') : (language === 'te' ? 'పూర్తి చేశాను' : language === 'hi' ? 'पूर्ण किया' : 'Mark Practiced')}</span>
                </button>
              </div>

              {/* Interactive Breathing Sphere */}
              <div className="bg-[#081225] p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider mb-2">
                  4-7-8 Breath Calmer
                </span>
                
                <div className="relative w-20 h-20 flex items-center justify-center my-2">
                  <div className={`absolute inset-0 rounded-full border-2 border-cyan-400/40 transition-all duration-1000 ${
                    breathActive && breathPhase.startsWith('Inhale') ? 'scale-125 border-cyan-300 shadow-lg shadow-cyan-400/30' :
                    breathActive && breathPhase.startsWith('Hold') ? 'scale-125 border-amber-400 shadow-lg shadow-amber-400/30' : 'scale-90 border-slate-600'
                  }`}></div>
                  <div className="text-sm font-bold text-white z-10 font-mono">
                    {breathActive ? breathSeconds : '4s'}
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-300 mb-2">
                  {breathActive ? breathPhase : (language === 'te' ? 'ప్రశాంత శ్వాస' : language === 'hi' ? 'प्राणायाम शुरू करें' : 'Ready to Breathe')}
                </span>

                <button
                  onClick={() => {
                    setBreathActive(!breathActive);
                    if (!breathActive) {
                      setBreathPhase('Inhale (4s)');
                      setBreathSeconds(4);
                    }
                  }}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:brightness-110 transition-all flex items-center space-x-1.5 shadow"
                >
                  {breathActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{breathActive ? (language === 'te' ? 'ఆపు' : language === 'hi' ? 'रोकें' : 'Pause') : (language === 'te' ? 'శ్వాస ప్రారంభించు' : language === 'hi' ? 'प्रारंभ करें' : 'Start Breathing')}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
