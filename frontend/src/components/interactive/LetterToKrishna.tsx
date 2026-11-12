import React, { useState } from 'react';
import { Mail, Sparkles, Flame, Shield, Lock, Copy, Check, Feather, RotateCcw } from 'lucide-react';
import { interactiveService } from '../../services/interactiveService';
import { useLanguage } from '../../context/LanguageContext';

export const LetterToKrishna: React.FC = () => {
  const { language } = useLanguage();
  const [letterText, setLetterText] = useState('');
  const [isEphemeral, setIsEphemeral] = useState(true);
  const [reply, setReply] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getSessionId = () => {
    let sid = localStorage.getItem('aikrishna_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('aikrishna_session_id', sid);
    }
    return sid;
  };

  const handleSend = async () => {
    if (!letterText.trim() || letterText.length < 10) return;
    setLoading(true);
    try {
      const data = await interactiveService.sendLetter(letterText, isEphemeral, language, getSessionId());
      setReply(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = () => {
    if (!reply) return;
    const fullText = `${reply.salutation}\n\n${reply.reply}\n\n${reply.closing}\n\nScripture: ${reply.verse_referenced}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'కృష్ణునికి లేఖ' : language === 'hi' ? 'श्रीकृष्ण को पत्र' : "Letter to Krishna"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'మీ అంతరంగాన్ని కృష్ణునికి విన్నవించండి' : language === 'hi' ? 'अपने अंतर्मन की बात श्रीकृष्ण से कहें' : "A Private Sanctuary for Your Soul"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'లోకంలో ఎవరికీ చెప్పలేని మీ కన్నీటిని, ఆశలను, సందేహాలను మీ ప్రియమిత్రుడైన కృష్ణునికి రాయండి.' : language === 'hi' ? 'संसार में जिसे किसी से न कह सकें, वह सब अपने सखा श्रीकृष्ण के चरणों में समर्पित कर दें।' : "Pour out your deepest unsaid tears, questions, or gratitude to your eternal Friend (Sakha)."}
        </p>
      </div>

      {!reply ? (
        <div className="krishna-card rounded-3xl p-6 sm:p-8 border border-[#F1B941]/35 shadow-2xl space-y-5">
          
          {/* Privacy Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#081225] border border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#F1B941]" />
              <span>Privacy Mode:</span>
            </span>

            <div className="flex bg-[#0B192C] p-1 rounded-xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setIsEphemeral(true)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  isEphemeral ? 'bg-[#F1B941] text-[#081225] font-bold shadow' : 'text-slate-400'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Burn After Guidance (Ephemeral)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEphemeral(false)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  !isEphemeral ? 'bg-[#1E3E62] text-[#F1B941] font-bold shadow' : 'text-slate-400'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Save to Sanctuary</span>
              </button>
            </div>
          </div>

          {/* Letter Area */}
          <div>
            <textarea
              rows={7}
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              placeholder={language === 'te' ? 'ప్రియమైన కృష్ణా, ఈరోజు నా మనస్సు ఎంతో భారంగా ఉంది...' : language === 'hi' ? 'हे कृष्ण, आज मेरा मन बहुत व्यथित है...' : "Dear Krishna, I am writing to you because my heart feels heavy today..."}
              className="w-full p-5 rounded-2xl bg-[#081225] border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:border-[#F1B941] focus:outline-none transition-all leading-relaxed font-serif"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400 italic">
              {isEphemeral ? '🔥 Ephemeral Mode: Your letter is processed in memory and never stored in any database.' : '🛡️ Private Mode: Saved securely to your personal history.'}
            </span>

            <button
              onClick={handleSend}
              disabled={loading || letterText.trim().length < 10}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all disabled:opacity-40 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Krishna is reading...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Letter</span>
                </>
              )}
            </button>
          </div>

        </div>
      ) : (
        /* Krishna's Letter Reply */
        <div className="krishna-card rounded-3xl p-8 sm:p-10 border border-[#F1B941]/45 shadow-2xl relative space-y-6 animate-fade-in bg-gradient-to-b from-[#0D2440]/90 to-[#081225]">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#F1B941]/20">
            <span className="text-xs font-bold text-[#F1B941] uppercase tracking-widest flex items-center space-x-1.5">
              <span>🦚</span>
              <span>Sri Krishna's Epistolary Counsel</span>
            </span>

            <button
              onClick={handleCopyReply}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center space-x-1.5 text-xs"
              title="Copy Letter"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Letter Body in Sacred Scroll Typography */}
          <div className="p-6 rounded-2xl bg-[#081225]/70 border border-[#F1B941]/20 space-y-4 font-serif text-slate-200 leading-relaxed text-sm sm:text-base">
            <p className="text-[#F1B941] font-bold text-lg">
              {reply.salutation}
            </p>
            
            <p className="whitespace-pre-line text-slate-200 leading-relaxed">
              {reply.reply}
            </p>

            <p className="text-amber-300 font-semibold italic text-right whitespace-pre-line pt-2">
              {reply.closing}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[#F1B941]">
              Anchored in: {reply.verse_referenced}
            </span>

            <button
              onClick={() => {
                setReply(null);
                setLetterText('');
              }}
              className="text-[#F1B941] hover:underline flex items-center space-x-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Write Another Letter</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

