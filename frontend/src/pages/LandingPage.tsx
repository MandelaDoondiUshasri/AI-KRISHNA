import React, { useState } from 'react';
import { 
  MessageSquare, Compass, ArrowRight, ShieldCheck, 
  Brain, Briefcase, Flame, HeartHandshake, ChevronDown, 
  ChevronUp, BookOpen, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import krishnaDivineImg from '../assets/krishna_divine.jpg';

interface LandingPageProps {
  onStartChat: () => void;
  onExploreGita: () => void;
}

const situationIcons = [Briefcase, Brain, Flame, HeartHandshake, ShieldCheck, Compass];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onExploreGita }) => {
  const { t, language, setLanguage } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-[#F1B941] selection:text-black">
      
      {/* HERO SECTION WITH DIVINE KRISHNA VISUAL */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-[#F1B941]/20">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#008DDA]/15 via-[#F1B941]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Divine Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 shadow-md shadow-[#F1B941]/10">
                <span className="text-base">🦚</span>
                <span className="text-xs font-semibold tracking-wider text-[#F1B941] uppercase whitespace-nowrap">
                  {t.heroBadge}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
                  {t.appName}
                </h1>
                <p className="gold-gradient-text text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">
                  {t.tagline}
                </p>
              </div>

              {/* Subtitle / Quote */}
              <blockquote className="border-l-2 border-[#F1B941] pl-4 py-1">
                <p className="text-base sm:text-lg text-amber-100 font-serif italic leading-relaxed">
                  "{t.heroQuote}"
                </p>
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {t.heroSubheadline}
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartChat}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F1B941] via-[#E5A93C] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#F1B941]/25 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-[#081225]" />
                  <span>{t.startChat}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreGita}
                  className="px-6 py-3.5 rounded-2xl bg-[#0B192C] hover:bg-[#1E3E62] text-slate-200 hover:text-white border border-[#F1B941]/40 font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 text-[#F1B941]" />
                  <span>{t.exploreGita}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.trustChapters}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.trustVerses}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.trustLanguages}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Divine Krishna Artwork Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Glowing halo behind card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#008DDA]/20 via-[#F1B941]/30 to-amber-500/20 rounded-3xl blur-2xl transform scale-105 pointer-events-none"></div>

                {/* Card Container */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-[#F1B941]/40 bg-[#0B192C] shadow-2xl">
                  
                  {/* Krishna Artwork */}
                  <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={krishnaDivineImg} 
                      alt="Lord Krishna Divine Presence"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-transparent"></div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-serif font-bold text-[#F1B941] flex items-center space-x-1.5">
                        <span>🦚</span>
                        <span>{t.heroCardTitle}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
                        {t.heroCardSub}
                      </span>
                    </div>

                    <p className="font-serif italic text-xs sm:text-sm text-slate-200 leading-relaxed">
                      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्यోః సమో భూత్వా సమత్వం యోగ ఉచ్యతే॥"
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{t.heroCardMeaning}</span>
                      <span className="text-[#F1B941] font-mono">BG 2.48</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 1: HOW AI KRISHNA WORKS (CONTEXT BRIDGE ENGINE) */}
      <section className="py-20 bg-[#060E1A] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
              {t.howItWorksBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              {t.howItWorksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.howItWorksDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.engineSteps.map((step) => (
              <div 
                key={step.num}
                className="krishna-card rounded-2xl p-6 border border-slate-800 hover:border-[#F1B941]/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-bold text-[#F1B941]/70 group-hover:text-[#F1B941] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#1E3E62]/40 flex items-center justify-center text-xs text-sky-300">
                    ✓
                  </div>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-100 mb-2 group-hover:text-[#F1B941] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: WISDOM FOR EVERYDAY LIFE */}
      <section className="py-20 bg-[#081225] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
              {t.everydayBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              {t.everydayTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.everydayDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.situations.map((sit, i) => {
              const Icon = situationIcons[i] || Compass;
              return (
                <div 
                  key={i}
                  onClick={onStartChat}
                  className="krishna-card rounded-2xl p-6 hover:border-[#F1B941]/60 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1E3E62]/70 border border-[#F1B941]/30 flex items-center justify-center mb-4 text-[#F1B941] group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-100 mb-2 group-hover:text-[#F1B941] transition-colors">
                    {sit.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {sit.desc}
                  </p>
                  <span className="text-xs font-semibold text-[#F1B941] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>{t.seekGuidance}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: BHAGAVAD GITA KNOWLEDGE BASE PREVIEW */}
      <section className="py-20 bg-[#060E1A] border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
                {t.corpusBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
                {t.corpusTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {t.corpusDesc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">18</span>
                  <span className="text-xs text-slate-400">{t.statChapters}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">700</span>
                  <span className="text-xs text-slate-400">{t.statVerses}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">3</span>
                  <span className="text-xs text-slate-400">{t.statLanguages}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">100%</span>
                  <span className="text-xs text-slate-400">{t.statIntegrity}</span>
                </div>
              </div>

              <button
                onClick={onExploreGita}
                className="px-6 py-3 rounded-xl bg-[#1E3E62] hover:bg-[#28527A] text-[#F1B941] border border-[#F1B941]/40 font-semibold text-xs tracking-wider uppercase transition-all"
              >
                {t.browseAllBtn}
              </button>
            </div>

            {/* Featured Verse Showcase */}
            <div className="krishna-card rounded-2xl p-6 sm:p-8 border border-[#F1B941]/40 shadow-2xl relative">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1B941]/20 text-[#F1B941] border border-[#F1B941]/40 mb-3 inline-block">
                Mahavākya • Chapter 2, Verse 47
              </span>
              <p className="font-serif text-lg text-amber-200 leading-relaxed mb-3">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
              </p>
              <p className="text-xs italic text-slate-400 font-serif mb-4">
                karmaṇy-evādhikāras te mā phaleṣu kadācana |<br />
                mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||
              </p>
              <div className="pt-4 border-t border-slate-700/80 text-xs text-slate-200 leading-relaxed">
                {language === 'te' 
                  ? '"కర్మలను ఆచరించడానికే నీకు అధికారము కలదు గాని, వాటి ఫలితాలపై ఎన్నడూ లేదు. కర్మఫలానికి నీవే కారణమనుకోకు, అలాగని కర్మలను చేయడం మానవద్దు."'
                  : language === 'hi'
                  ? '"तेरा कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं। इसलिए तू कर्मों के फल का हेतु मत बन तथा तेरी अकर्मण्यता में भी आसक्ति न हो।"'
                  : '"You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction."'
                }
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: MULTILINGUAL SUPPORT SHOWCASE */}
      <section className="py-20 bg-[#081225] border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
            {t.multiBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            {t.multiTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
            {t.multiDesc}
          </p>

          {/* Interactive Lang Switcher */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setLanguage('en')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                language === 'en'
                  ? 'bg-[#F1B941] text-[#081225] shadow-lg shadow-[#F1B941]/20'
                  : 'bg-[#0B192C] text-slate-300 border border-slate-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                language === 'hi'
                  ? 'bg-[#F1B941] text-[#081225] shadow-lg shadow-[#F1B941]/20'
                  : 'bg-[#0B192C] text-slate-300 border border-slate-700'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                language === 'te'
                  ? 'bg-[#F1B941] text-[#081225] shadow-lg shadow-[#F1B941]/20'
                  : 'bg-[#0B192C] text-slate-300 border border-slate-700'
              }`}
            >
              తెలుగు (Telugu)
            </button>
          </div>

          {/* Live Snippet Box */}
          <div className="krishna-card rounded-2xl p-6 text-left max-w-xl mx-auto border border-[#F1B941]/30">
            <span className="text-[11px] font-semibold text-[#F1B941] block mb-2">
              {t.sampleGreetingLabel}
            </span>
            <p className="text-xs sm:text-sm text-slate-100 font-serif leading-relaxed italic">
              "{t.welcomeMessage}"
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#060E1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
              {t.faqBadge}
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              {t.faqTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {t.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#0B192C] border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-[#F1B941] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F1B941] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Call to Action */}
          <div className="mt-16 text-center">
            <button
              onClick={onStartChat}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all"
            >
              {t.startChat}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
