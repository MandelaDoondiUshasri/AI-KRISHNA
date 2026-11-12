import React from 'react';
import { Sparkles, Heart, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#050B14] border-t border-[#F1B941]/20 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Divine Sanskrit Inscription */}
        <div className="text-center mb-10 pb-8 border-b border-slate-800/80">
          <p className="text-lg sm:text-xl font-serif text-[#F1B941] italic tracking-wide mb-2">
            "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          </p>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            {language === 'te' 
              ? '"ధర్మానికి హాని కలిగి అధర్మం పెచ్చురిల్లినప్పుడు, మార్గాన్ని ప్రకాశింపజేయడానికి శాశ్వత జ్ఞానం మేల్కొంటుంది." — భగవద్గీత 4.7'
              : language === 'hi'
              ? '"जब-जब धर्म की ग्लानि होती है और अधर्म का उत्थान होता है, तब-तब मार्ग प्रकाशित करने हेतु शाश्वत ज्ञान जाग्रत होता है।" — भगवद्गीता 4.7'
              : '"Whenever righteousness declines and purpose falters, timeless wisdom awakens to illuminate the path." — Bhagavad Gita 4.7'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦚</span>
              <span className="font-serif font-bold text-lg text-slate-100">{t.appName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'te'
                ? 'భగవద్గీతలో శ్రీకృష్ణుని సార్వకాలిక దివ్య బోధనలను ఆధునిక సాంకేతిక కృత్రిమ మేధతో అనుసంధానించే ఆధ్యాత్మిక వేదిక.'
                : language === 'hi'
                ? 'भगवद्गीता के दिव्य उपदेशों को आधुनिक कृत्रिम मेधा से जोड़कर जीवन के निर्णयों में स्पष्टता देने वाला आध्यात्मिक मंच।'
                : "An intelligent spiritual guidance platform combining Lord Krishna's eternal counsel in the Bhagavad Gita with context-aware AI."
              }
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#F1B941]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Context Bridge Engine v1.0</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              {language === 'te' ? 'అన్వేషించండి' : language === 'hi' ? 'अन्वेषण' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('chat')} className="hover:text-[#F1B941] transition-colors">
                  {t.chatNav}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('interactive')} className="hover:text-[#F1B941] text-[#F1B941] transition-colors flex items-center space-x-1">
                  <span>✨</span>
                  <span>{t.interactiveNav}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('explorer')} className="hover:text-[#F1B941] transition-colors">
                  {t.explorerNav}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('daily')} className="hover:text-[#F1B941] transition-colors">
                  {t.dailyNav}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('saved')} className="hover:text-[#F1B941] transition-colors">
                  {t.savedNav}
                </button>
              </li>
            </ul>
          </div>

          {/* Life Situations */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              {language === 'te' ? 'జీవన సమస్యలు' : language === 'hi' ? 'जीवन की दुविधाएं' : 'Guidance Areas'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {t.situations.map((s, idx) => (
                <li key={idx} className="truncate">{s.title}</li>
              ))}
            </ul>
          </div>

          {/* Safety & Respect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-1.5 text-amber-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'ఆధ్యాత్మిక నైతికత' : language === 'hi' ? 'शास्त्रीय प्रामाणिकता' : 'Spiritual Integrity'}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'te'
                ? 'AI కృష్ణ అనేది భగవద్గీత బోధనలతో కూడిన ఒక కృత్రిమ మేధ మార్గదర్శి. ఇది ప్రామాణిక గ్రంథాన్ని వివరిస్తుంది మరియు వైద్య, మానసిక లేదా న్యాయ సలహాలకు ప్రత్యామ్నాయం కాదు.'
                : language === 'hi'
                ? 'एआई कृष्ण भगवद्गीता से प्रेरित एक एआई आध्यात्मिक साथी है। यह शास्त्रों के मूल स्वरूप का सम्मान करता है और किसी भी चिकित्सा, विधिक या वित्तीय सलाह का विकल्प नहीं है।'
                : 'AI Krishna is an AI spiritual companion inspired by the Bhagavad Gita. It distinguishes authentic scripture from interpretation and does not replace medical, mental health, legal, or financial counseling.'
              }
            </p>
            <p className="text-[11px] text-slate-400">
              Tele-MANAS (14416) • 988
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {t.appName} – {t.tagline}</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>{language === 'te' ? 'భక్తి మరియు సమర్పణ భావంతో రూపొందించబడింది' : language === 'hi' ? 'श्रद्धा एवं समर्पण से निर्मित' : 'Crafted with reverence for seekers worldwide'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

