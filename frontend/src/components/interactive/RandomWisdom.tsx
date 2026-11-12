import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, Copy, Check, Bookmark, Share2, Compass, Sun } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const RandomWisdom: React.FC = () => {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const [verseData, setVerseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchRandomVerse();
  }, [language]);

  const fetchRandomVerse = async () => {
    setLoading(true);
    setCopied(false);
    setSaved(false);
    try {
      const data = await interactiveService.getRandomWisdom(language);
      setVerseData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!verseData) return;
    const text = `Bhagavad Gita ${verseData.chapter_number}.${verseData.verse_number}\n\n${verseData.slok_sanskrit}\n\n${verseData.transliteration}\n\nTranslation:\n${verseData.translation}\n\nDivine Focus:\n${verseData.micro_action}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = async () => {
    if (!user || !verseData?.id) return;
    try {
      await userService.addFavorite(
        'verse',
        verseData.id,
        undefined,
        `Oracle BG ${verseData.chapter_number}.${verseData.verse_number}`,
        verseData.divine_spark
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Sun className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'దివ్య సంకల్ప శ్లోకం' : language === 'hi' ? 'दिव्य संकेत एवं आकस्मिक ज्ञान' : "Krishna's Random Wisdom"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'నేటి మీ ఆత్మ కోసం ప్రత్యక్షమైన శ్లోకం' : language === 'hi' ? 'आज आपकी आत्मा के लिए प्रकट हुआ श्लोक' : "Surprise Me: Divine Oracle"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? '700 గీతా శ్లోకాల నుండి ఒక ప్రామాణిక శ్లోకాన్ని దివ్య మార్గదర్శిగా పొందడానికి బటన్ నొక్కండి.' : language === 'hi' ? 'भगवद्गीता के 700 श्लोकों में से अपनी वर्तमान स्थिति हेतु एक दिव्य संकेत प्राप्त करें।' : "Draw a verified verse from the 700 verses of the Bhagavad Gita as your oracle for this moment."}
        </p>
      </div>

      {/* Main Oracle Action */}
      <div className="text-center">
        <button
          onClick={fetchRandomVerse}
          disabled={loading}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#F1B941] via-[#E5A93C] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#F1B941]/25 hover:scale-105 transition-all inline-flex items-center space-x-2 disabled:opacity-50"
        >
          <Dices className="w-4 h-4 text-[#081225]" />
          <span>{loading ? 'Revealing Wisdom...' : (language === 'te' ? 'మరో దివ్య శ్లోకాన్ని ఆవిష్కరించు 🦚' : language === 'hi' ? 'दूसरा दिव्य श्लोक प्रकट करें 🦚' : 'Surprise Me: Reveal Another Verse 🦚')}</span>
        </button>
      </div>

      {/* Verse Display Card */}
      {loading ? (
        <div className="text-center py-20 krishna-card rounded-3xl">
          <Sparkles className="w-10 h-10 mx-auto text-[#F1B941] animate-spin mb-4" />
          <p className="text-xs text-slate-400">The sacred pages of the Gita are opening for you...</p>
        </div>
      ) : verseData && (
        <div className="krishna-card rounded-3xl p-6 sm:p-10 border border-[#F1B941]/40 shadow-2xl relative overflow-hidden animate-fade-in">
          
          {/* Glowing Aura Background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-gradient-to-br from-[#F1B941]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F1B941]/20">
            <span className="text-xs font-bold px-3 py-1 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
              Bhagavad Gita {verseData.chapter_number}.{verseData.verse_number}
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Copy Verse"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              {user && (
                <button
                  onClick={handleBookmark}
                  className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-[#F1B941] border border-slate-700 transition-colors"
                  title="Save to favorites"
                >
                  <Bookmark className={`w-4 h-4 ${saved ? 'text-[#F1B941] fill-[#F1B941]' : ''}`} />
                </button>
              )}
            </div>
          </div>

          {/* Sanskrit Sloka */}
          <div className="my-8 text-center bg-[#081225]/80 border border-[#F1B941]/25 rounded-2xl p-6 sm:p-8">
            <p className="font-serif text-xl sm:text-2xl text-amber-200 leading-relaxed font-medium mb-3 whitespace-pre-line">
              {verseData.slok_sanskrit}
            </p>
            <p className="font-serif italic text-xs sm:text-sm text-slate-300 whitespace-pre-line max-w-2xl mx-auto">
              {verseData.transliteration}
            </p>
          </div>

          {/* Translation */}
          <div className="mb-6 p-5 rounded-2xl bg-[#0B192C]/90 border border-slate-700">
            <span className="text-xs font-semibold text-[#F1B941] uppercase tracking-wider block mb-1">
              {t.verseMeaningLabel}
            </span>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
              {verseData.translation}
            </p>
          </div>

          {/* Divine Reflection & Micro Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D2440]/70 border border-sky-500/20">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block mb-1.5 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F1B941]" />
                <span>Why This Appeared For You Today</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {verseData.divine_spark}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0A1A2F]/90 border border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1.5 flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Today's Micro-Action</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {verseData.micro_action}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

