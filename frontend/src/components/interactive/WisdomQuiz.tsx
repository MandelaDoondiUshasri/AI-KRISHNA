import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Sparkles, Trophy, Star, ArrowRight } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { QuizQuestion } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

export const WisdomQuiz: React.FC = () => {
  const { language } = useLanguage();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getSessionId = () => {
    let sid = localStorage.getItem('aikrishna_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('aikrishna_session_id', sid);
    }
    return sid;
  };

  useEffect(() => {
    loadQuiz();
  }, [language]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const data = await interactiveService.getQuiz(language);
      setQuestions(data);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setScore(0);
      setIsFinished(false);
      setSubmissionResult(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correct_index) {
      setScore(prev => prev + 10);
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        const res = await interactiveService.submitQuizScore(score, questions.length, getSessionId());
        setSubmissionResult(res);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (loading || !currentQ) {
    return (
      <div className="text-center py-20 krishna-card rounded-3xl">
        <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
        <p className="text-xs text-slate-400">Loading Vedic Wisdom Quiz...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Trophy className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'గీతా విజ్ఞాన క్విజ్' : language === 'hi' ? 'गीता ज्ञान प्रश्नोत्तरी' : "Krishna's Wisdom Quiz"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'మీ గీతా జ్ఞానాన్ని పరీక్షించుకోండి' : language === 'hi' ? 'अपनी आध्यात्मिक समझ को परखें' : "Test Your Bhagavad Gita Knowledge"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'ప్రామాణిక ప్రశ్నలకు సమాధానమిచ్చి పాయింట్లు, స్థాయిలు మరియు దివ్య బ్యాడ్జ్‌లను పొందండి.' : language === 'hi' ? 'प्रश्नों के सही उत्तर देकर अंक, स्तर और दिव्य पदक अर्जित करें।' : "Earn points, level up, and unlock divine badges as you deepen your scriptural clarity."}
        </p>
      </div>

      {!isFinished ? (
        <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-2xl space-y-6">
          
          {/* Top Progress & Score */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-4 border-b border-slate-800">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <div className="flex items-center space-x-1.5 text-[#F1B941] font-bold">
              <Star className="w-4 h-4 fill-[#F1B941]" />
              <span>{score} Points</span>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct_index;

              let btnStyle = 'bg-[#081225] border-slate-800 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-100';
                } else if (isSelected) {
                  btnStyle = 'bg-red-950/40 border-red-500 text-red-100';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span className="font-medium leading-relaxed">{opt}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-[#081225]/90 border border-slate-700/80 animate-fade-in text-xs leading-relaxed text-slate-300">
              <span className="text-[#F1B941] font-bold block mb-1">Gita Insight:</span>
              {currentQ.explanation}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md shadow-[#F1B941]/20 transition-all flex items-center space-x-1.5"
              >
                <span>{currentIndex === questions.length - 1 ? 'Finish & See Badges' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="krishna-card rounded-3xl p-8 sm:p-10 border border-[#F1B941]/40 shadow-2xl text-center space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#1E3E62] via-[#008DDA] to-[#F1B941] p-0.5">
            <div className="w-full h-full rounded-full bg-[#081225] flex items-center justify-center text-3xl">
              🏆
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-[#F1B941] uppercase tracking-widest block mb-1">
              Quiz Completed
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {score} / {questions.length * 10} Points
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Current Rank: <span className="text-amber-300 font-bold">{submissionResult?.level || 'Seeker (जिज्ञासु)'}</span>
            </p>
          </div>

          {/* Unlocked Badges */}
          {submissionResult?.badges && submissionResult.badges.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#081225]/80 border border-slate-800">
              <h4 className="text-xs font-bold text-[#F1B941] uppercase tracking-wider mb-3 flex items-center justify-center space-x-1.5">
                <Award className="w-4 h-4" />
                <span>Earned Badges</span>
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {submissionResult.badges.map((b: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-[#1E3E62]/80 border border-[#F1B941]/40 text-xs font-bold text-amber-200 shadow">
                    ✨ {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button
              onClick={loadQuiz}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Quiz Again</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

