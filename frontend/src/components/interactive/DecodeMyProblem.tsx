import React, { useState } from 'react';
import { Sparkles, Brain, Compass, CheckCircle2, HeartHandshake, BookOpen, ArrowRight, Lightbulb } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { useLanguage } from '../../context/LanguageContext';

export const DecodeMyProblem: React.FC = () => {
  const { language, t } = useLanguage();
  const [problemText, setProblemText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "I am working late hours, but my colleagues are getting promoted and I feel completely overlooked.",
    "I cannot stop overthinking about the future and feel anxious every evening.",
    "I want to start my own venture, but the paralyzing fear of failure keeps me stuck.",
    "Someone close to me betrayed my trust and I am consumed with anger and revenge."
  ];

  const handleDecode = async (textToUse?: string) => {
    const text = textToUse || problemText;
    if (!text.trim() || text.length < 5) return;
    setLoading(true);
    try {
      const data = await interactiveService.decodeProblem(text, language);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Brain className="w-3.5 h-3.5 text-sky-400" />
          <span>{language === 'te' ? 'సమస్య విశ్లేషణ ఇంజిన్' : language === 'hi' ? 'समस्या का आध्यात्मिक विश्लेषण' : "Decode My Problem"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'మీ సమస్య వెనుక ఉన్న మూల కారణాన్ని ఛేదించండి' : language === 'hi' ? 'अपनी समस्या के मूल कारण को समझें' : "Uncover the Real Truth Behind Your Problem"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'మీ అంతరంగాన్ని బాధపెడుతున్న విషయాన్ని రాయండి. మా కాంటెక్స్ట్ ఇంజిన్ మీ భావోద్వేగాలను, అంతర్గత ప్రశ్నను మరియు గీతా పరిష్కారాన్ని విడమరిచి చూపుతుంది.' : language === 'hi' ? 'अपनी दुविधा यहाँ लिखें। हमारा इंजन आपकी आंतरिक भावना, छिपे हुए प्रश्न और भगवद्गीता के व्यावहारिक समाधान का विश्लेषण करेगा।' : "Share your real predicament. Our intelligence engine breaks down surface symptoms, detects root emotions, and maps timeless Gita solutions."}
        </p>
      </div>

      {/* Input Box */}
      <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-xl">
        <label className="block text-xs font-semibold text-[#F1B941] uppercase tracking-wider mb-2">
          {language === 'te' ? 'మీ మనస్సును కలవరపెడుతున్న సమస్యను రాయండి' : language === 'hi' ? 'अपने मन की दुविधा यहाँ लिखें' : "Describe your current struggle:"}
        </label>
        
        <textarea
          rows={3}
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder={language === 'te' ? 'ఉదాహరణ: నేను ఎంతో కష్టపడుతున్నాను కానీ సహోద్యోగులకే గుర్తింపు వస్తోంది...' : language === 'hi' ? 'उदाहरण: मैं बहुत मेहनत करता हूँ पर सहकर्मियों को ही पदोन्नति मिलती है...' : "e.g. I work very hard, but colleagues are promoted while I am overlooked. I feel resentful and drained..."}
          className="w-full p-4 rounded-2xl bg-[#081225] border border-slate-700 text-sm text-white placeholder-slate-500 focus:border-[#F1B941] focus:outline-none transition-all leading-relaxed"
        />

        {/* Quick Sample Prompts */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 mr-1">
            {language === 'te' ? 'ఉదాహరణలు:' : language === 'hi' ? 'सुझाव:' : 'Try these:'}
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setProblemText(p);
                handleDecode(p);
              }}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#081225] border border-slate-800 text-slate-300 hover:border-slate-600 truncate max-w-xs transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => handleDecode()}
            disabled={loading || !problemText.trim()}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all disabled:opacity-40 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Decoding Problem...</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4" />
                <span>{language === 'te' ? 'గీతా జ్ఞానంతో విశ్లేషించు' : language === 'hi' ? 'गीता ज्ञान से विश्लेषण करें' : 'Decode My Problem'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Deconstructed Results View */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Root Emotion Unveiled */}
            <div className="krishna-card rounded-2xl p-5 border border-amber-400/40 bg-gradient-to-br from-[#1E3E62]/40 to-[#0A1A2F]">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4" />
                <span>1. Root Emotion Deconstructed</span>
              </div>
              <p className="text-base font-serif font-bold text-white mb-2">
                {result.root_emotion}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your surface irritation is merely a protective shell. Beneath it lies a sensitive human longing for fairness and stability.
              </p>
            </div>

            {/* 2. Hidden Inquiry */}
            <div className="krishna-card rounded-2xl p-5 border border-sky-400/40 bg-gradient-to-br from-[#0D2440]/60 to-[#0A1A2F]">
              <div className="flex items-center space-x-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-[#F1B941]" />
                <span>2. The Real Question Behind Your Words</span>
              </div>
              <p className="text-base font-serif font-bold text-sky-100 mb-2 italic">
                "{result.hidden_question}"
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                By acknowledging this core existential inquiry, you move from feeling like a victim to becoming a conscious master of your destiny.
              </p>
            </div>

          </div>

          {/* 3. Sacred Gita Verse Match */}
          {result.verse && (
            <div className="krishna-card rounded-2xl p-6 border border-[#F1B941]/40 bg-[#081225] text-center">
              <span className="text-xs font-bold text-[#F1B941] uppercase tracking-widest block mb-1">
                3. Direct Scripture Anchor: Bhagavad Gita {result.verse.chapter_number}.{result.verse.verse_number}
              </span>
              <p className="font-serif text-lg text-amber-200 leading-relaxed font-medium mb-2 whitespace-pre-line">
                {result.verse.slok_sanskrit}
              </p>
              <p className="text-xs italic text-slate-400 font-serif mb-3">
                {result.verse.transliteration}
              </p>
              <div className="pt-3 border-t border-slate-800 text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto">
                <span className="text-[#F1B941] font-semibold mr-1.5">{t.verseMeaningLabel}</span>
                {result.verse.translation}
              </div>
            </div>
          )}

          {/* 4. Action Steps & Soul Mantra */}
          <div className="krishna-card rounded-2xl p-6 border border-slate-700/80 bg-[#0B192C]">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>4. Practical Action Roadmap</span>
            </h4>
            
            <div className="space-y-2 mb-6">
              {result.action_steps?.map((step: string, i: number) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-200">
                  <span className="w-4 h-4 rounded-full bg-[#1E3E62] text-[#F1B941] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>

            {/* Soul Mantra */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#F1B941]/15 via-[#B8860B]/20 to-[#F1B941]/10 border border-[#F1B941]/40 text-center">
              <span className="text-[10px] font-bold text-[#F1B941] uppercase tracking-widest block mb-1">
                Thought to Hold in Your Heart
              </span>
              <p className="font-serif italic text-sm text-amber-100 font-medium">
                "{result.mantra}"
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
