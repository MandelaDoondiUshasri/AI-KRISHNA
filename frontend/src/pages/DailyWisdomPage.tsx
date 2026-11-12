import React, { useState, useEffect } from 'react';
import { Sun, Calendar, Sparkles } from 'lucide-react';
import { DailyWisdom } from '../types';
import { dailyService } from '../services/dailyService';
import { DailyWisdomCard } from '../components/daily/DailyWisdomCard';
import { useLanguage } from '../context/LanguageContext';

export const DailyWisdomPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [todayWisdom, setTodayWisdom] = useState<DailyWisdom | null>(null);
  const [archive, setArchive] = useState<DailyWisdom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWisdom();
  }, []);

  const loadWisdom = async () => {
    try {
      const [today, arc] = await Promise.all([
        dailyService.getTodayWisdom(),
        dailyService.getArchive()
      ]);
      setTodayWisdom(today);
      setArchive(arc);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081225] py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.dailyBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2 leading-tight">
            {t.dailyTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.dailySubtitle}
          </p>
        </div>

        {/* Today's Featured Card */}
        {loading ? (
          <div className="text-center py-20 krishna-card rounded-3xl">
            <Sparkles className="w-8 h-8 mx-auto text-[#F1B941] animate-spin mb-3" />
            <p className="text-xs text-slate-400">{t.loadingDaily}</p>
          </div>
        ) : todayWisdom ? (
          <div className="mb-14">
            <DailyWisdomCard daily={todayWisdom} />
          </div>
        ) : null}

        {/* Past Reflections Archive */}
        {archive.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-6 pb-2 border-b border-slate-800">
              <Calendar className="w-4 h-4 text-[#F1B941]" />
              <h3 className="text-lg font-serif font-bold text-slate-200">
                {t.recentWisdomTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archive.map((item) => (
                <div
                  key={item.id}
                  className="krishna-card rounded-2xl p-5 border border-slate-800 hover:border-[#F1B941]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-mono text-[#F1B941]">{item.date_str}</span>
                      <span className="font-semibold px-2 py-0.5 rounded bg-slate-800 text-sky-300">
                        BG {item.verse?.chapter_number}.{item.verse?.verse_number}
                      </span>
                    </div>

                    <p className="font-serif text-sm text-amber-100 line-clamp-2 italic mb-2">
                      "{item.verse?.slok_sanskrit}"
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-3">
                      {language === 'te' && item.verse?.translation_te ? item.verse.translation_te : language === 'hi' && item.verse?.translation_hi ? item.verse.translation_hi : item.verse?.translation_en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">{t.focusLabel}</span>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {language === 'te' && item.reflection_te ? item.reflection_te : language === 'hi' && item.reflection_hi ? item.reflection_hi : (item.practical_focus || item.reflection_en)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
