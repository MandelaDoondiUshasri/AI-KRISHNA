import React, { useState, useEffect } from 'react';
import { Target, Flame, CheckCircle, Circle, Sparkles, Compass, Award } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { DailyChallengeData } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

const GOALS = [
  { id: 'focus', label_en: 'Focus & Tapas', label_hi: 'एकाग्रता एवं तप', label_te: 'ఏకాగ్రత & సాధన', icon: '🎯' },
  { id: 'peace', label_en: 'Inner Peace', label_hi: 'मानसिक शांति', label_te: 'మనశ్శాంతి', icon: '🕊️' },
  { id: 'service', label_en: 'Selfless Service', label_hi: 'निःस्वार्थ सेवा', label_te: 'నిస్వార్థ సేవ', icon: '💖' },
  { id: 'courage', label_en: 'Courage & Action', label_hi: 'साहस एवं कर्म', label_te: 'ధైర్యం & కార్యాచరణ', icon: '🦁' },
  { id: 'clarity', label_en: 'Clarity & Swadharma', label_hi: 'स्पष्टता एवं स्वधर्म', label_te: 'స్పష్టత & స్వధర్మం', icon: '🧘' }
];

export const WhatShouldIDoToday: React.FC = () => {
  const { language } = useLanguage();
  const [selectedGoal, setSelectedGoal] = useState('focus');
  const [challengeData, setChallengeData] = useState<DailyChallengeData | null>(null);
  const [loading, setLoading] = useState(true);

  // Generate or retrieve persistent guest session ID from localStorage
  const getSessionId = () => {
    let sid = localStorage.getItem('aikrishna_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('aikrishna_session_id', sid);
    }
    return sid;
  };

  useEffect(() => {
    loadChallenges(selectedGoal);
  }, [selectedGoal]);

  const loadChallenges = async (goal: string) => {
    setLoading(true);
    try {
      const data = await interactiveService.getDailyChallenges(goal, getSessionId());
      setChallengeData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (taskId: number) => {
    try {
      const updated = await interactiveService.toggleDailyChallengeTask(taskId, selectedGoal, getSessionId());
      setChallengeData(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const completedCount = challengeData?.challenges.filter(c => c.completed).length || 0;
  const totalCount = challengeData?.challenges.length || 3;
  const isAllComplete = completedCount === totalCount;

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Target className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'te' ? 'నేటి ఆధ్యాత్మిక సవాలు' : language === 'hi' ? 'आज का साधना संकल्प' : "What Should I Do Today?"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'లక్ష్యం ఆధారిత నిత్య సాధన' : language === 'hi' ? 'दैनिक कर्म संकल्प' : "Daily Micro-Sadhana Challenges"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'మీరు అభివృద్ధి చేసుకోవాలనుకుంటున్న లక్ష్యాన్ని ఎంచుకోండి. శ్రీకృష్ణుని బోధనల ప్రకారం నేటి 3 సూక్ష్మ పనులను పూర్తి చేయండి.' : language === 'hi' ? 'अपना आध्यात्मिक लक्ष्य चुनें और आज के 3 व्यावहारिक कर्म संकल्पों को पूरा करके अपनी साधना को सुदृढ़ करें।' : "Choose your primary focus. Complete 3 concrete actions grounded in Gita wisdom to build an unshakeable mind."}
        </p>
      </div>

      {/* Goal Selection Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {GOALS.map((g) => {
          const isSelected = selectedGoal === g.id;
          const label = language === 'te' ? g.label_te : language === 'hi' ? g.label_hi : g.label_en;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGoal(g.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center space-x-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#1E3E62] to-[#0A1A2F] border-[#F1B941] text-[#F1B941] shadow-lg shadow-[#F1B941]/15 scale-105'
                  : 'bg-[#0B192C]/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{g.icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Challenge Card */}
      {loading ? (
        <div className="text-center py-20 krishna-card rounded-3xl">
          <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
          <p className="text-xs text-slate-400">Loading today's challenges...</p>
        </div>
      ) : challengeData && (
        <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-2xl space-y-6">
          
          {/* Top Status & Streak */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                {challengeData.date}
              </span>
              <h3 className="text-lg font-serif font-bold text-white capitalize">
                {selectedGoal} Path • {completedCount}/{totalCount} Completed
              </h3>
            </div>

            {/* Streak Counter */}
            <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{challengeData.streak_count}-Day Sadhana Streak</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#081225] h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-[#F1B941] h-full transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>

          {/* Tasks Checklist */}
          <div className="space-y-3">
            {challengeData.challenges.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggle(task.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3.5 ${
                  task.completed
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                    : 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                  task.completed ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600'
                }`}>
                  {task.completed && <CheckCircle className="w-4 h-4 stroke-[2.5]" />}
                </div>

                <div className="flex-1">
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed ${task.completed ? 'line-through opacity-75' : ''}`}>
                    {task.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Celebration */}
          {isAllComplete && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#1E3E62]/40 to-emerald-950/60 border border-emerald-400/50 text-center animate-fade-in">
              <Award className="w-8 h-8 text-[#F1B941] mx-auto mb-1.5" />
              <h4 className="text-sm font-bold text-emerald-300">
                {language === 'te' ? 'ఈనాటి సాధన సంపూర్ణమైంది! ధన్యోస్మి' : language === 'hi' ? 'आज का संकल्प पूर्ण हुआ! साधुवाद' : "Today's Sadhana is Complete!"}
              </h4>
              <p className="text-xs text-slate-300 mt-1 italic">
                "Whatever you do, whatever you offer or give away, do it as an offering unto Me." (BG 9.27)
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
