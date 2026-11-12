import React, { useState } from 'react';
import { 
  Sparkles, MessageSquare, Compass, ArrowRight, ShieldCheck, 
  Brain, Briefcase, Flame, HeartHandshake, ChevronDown, 
  ChevronUp, BookOpen, Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import krishnaDivineImg from '../assets/krishna_divine.jpg';

interface LandingPageProps {
  onStartChat: () => void;
  onExploreGita: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onExploreGita }) => {
  const { t, language, setLanguage } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const situations = [
    {
      title: "Career & Promotion Dilemmas",
      icon: Briefcase,
      desc: "Working hard but colleagues are getting promoted? Reclaim self-worth and discover Nishkama Karma."
    },
    {
      title: "Overthinking & Future Anxiety",
      icon: Brain,
      desc: "Restless racing thoughts? Master the art of Abhyasa (practice) and Vairagya (healthy detachment)."
    },
    {
      title: "Controlling Anger & Hurt Pride",
      icon: Flame,
      desc: "Someone insulted you? Learn how to halt the destructive chain reaction of rage before it ruins your peace."
    },
    {
      title: "Relationships & Heartbreak",
      icon: HeartHandshake,
      desc: "Suffering from attachment or broken promises? Love with pure depth without losing your soul's anchor."
    },
    {
      title: "Fear of Failure in Ventures",
      icon: ShieldCheck,
      desc: "Paralyzed by startup risk, exams, or setbacks? Develop 'Samatvam'—steady composure in success and defeat."
    },
    {
      title: "Life Crossroads & Purpose",
      icon: Compass,
      desc: "Feeling empty or directionless? Align with your authentic Swadharma and walk forward with clarity."
    }
  ];

  const engineSteps = [
    { num: "01", title: "Problem Ingestion", desc: "Listens deeply to your real-life dilemma and unburdened emotions." },
    { num: "02", title: "Emotion Detection", desc: "Identifies disappointment, envy, fear, grief, or cognitive overwhelm." },
    { num: "03", title: "Latent Inquiry", desc: "Discovers the profound psychological inquiry beneath your surface words." },
    { num: "04", title: "Semantic Gita Retrieval", desc: "Searches 700 verses across 18 chapters using multi-dimensional vector matching." },
    { num: "05", title: "Verse Pinpointing", desc: "Retrieves the exact Chapter and Verse (e.g. 2.47 for duty, 6.5 for self-elevation)." },
    { num: "06", title: "Sacred Context", desc: "Understands the original philosophical battlefield dialogue between Krishna and Arjuna." },
    { num: "07", title: "Modern Life Bridge", desc: "Translates the ancient metaphor directly to your 21st-century situation." },
    { num: "08", title: "Personalized Synthesis", desc: "Formulates a 6-part empathetic roadmap in English, Hindi, or Telugu." },
    { num: "09", title: "Actionable Guidance", desc: "Provides concrete micro-actions and a golden thought to hold in your heart." }
  ];

  const faqs = [
    {
      q: "Does AI Krishna claim to be the actual Lord Krishna?",
      a: "No. AI Krishna is an AI spiritual companion inspired by the teachings of the Bhagavad Gita. It clearly distinguishes itself as an AI system and never claims divinity. Its purpose is to make timeless spiritual philosophy accessible and applicable to modern challenges."
    },
    {
      q: "How does the Context Bridge Engine work?",
      a: "Unlike typical chatbots that output random verses, the Context Bridge Engine follows a rigorous 9-step semantic workflow: analyzing your emotional state, identifying the core question, retrieving authentic Gita scripture, bridging the ancient context to modern life, and generating a structured 6-part response."
    },
    {
      q: "Are the Sanskrit verses and translations verified?",
      a: "Yes. All verses in the knowledge base are rigorously structured from authentic Bhagavad Gita sources across all 18 chapters, complete with Devanagari Sanskrit, IAST transliteration, and translations in English, Telugu, and Hindi."
    },
    {
      q: "Can I use AI Krishna in Telugu and Hindi?",
      a: "Yes! AI Krishna natively supports English, Hindi (हिन्दी), and Telugu (తెలుగు). It generates natural, conversational, and culturally respectful responses rather than robotic machine translations."
    },
    {
      q: "Is AI Krishna a replacement for professional mental health therapy or legal advice?",
      a: "No. While the Gita offers profound mental solace, AI Krishna does not provide medical, psychological, legal, or financial advice. In cases of acute mental health distress or crisis, we provide 24/7 helpline resources like Tele-MANAS (14416) and 988."
    }
  ];

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
                  Bhagavad Gita Spiritual Intelligence
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
                  AI KRISHNA
                </h1>
                <p className="gold-gradient-text text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">
                  Your Life Companion
                </p>
              </div>

              {/* Subtitle / Quote */}
              <blockquote className="border-l-2 border-[#F1B941] pl-4 py-1">
                <p className="text-base sm:text-lg text-amber-100 font-serif italic leading-relaxed">
                  "When life gets confusing, find clarity through timeless wisdom."
                </p>
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                {t.heroSubheadline}
              </p>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onStartChat}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F1B941] via-[#E5A93C] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl shadow-[#F1B941]/25 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#081225]" />
                  <span>{t.startChat}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onExploreGita}
                  className="px-6 py-3.5 rounded-2xl bg-[#0B192C] hover:bg-[#1E3E62] text-slate-200 hover:text-white border border-[#F1B941]/40 font-semibold text-xs tracking-wide transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-4 h-4 text-[#F1B941]" />
                  <span>{t.exploreGita}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>All 18 Chapters</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>700 Verses Structured</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>English • हिन्दी • తెలుగు</span>
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
                        <span>Sri Krishna's Timeless Counsel</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#F1B941]/10 text-[#F1B941] border border-[#F1B941]/30">
                        Mahabharata • Kurukshetra
                      </span>
                    </div>

                    <p className="font-serif italic text-xs sm:text-sm text-slate-200 leading-relaxed">
                      "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्यోః సమో భూత్వా సమత్వం యోగ ఉచ్యతే॥"
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Equanimity in all circumstances is Yoga.</span>
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
              Architectural Innovation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              The 9-Step Context Bridge Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We never return random, disconnected Gita quotes. Our proprietary intelligence engine deeply deconstructs your real-world predicament and builds a contextual bridge between ancient metaphysics and everyday life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineSteps.map((step) => (
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
              Universal Relevance
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Timeless Wisdom for Modern Struggles
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lord Krishna's dialogue with Arjuna was not about abstract theology—it took place in the middle of a paralyzing moral, emotional, and psychological crisis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {situations.map((sit, i) => {
              const Icon = sit.icon;
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
                    <span>Seek Guidance</span>
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
                Authentic Scripture
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
                Complete Knowledge Base: 18 Chapters & 700 Verses
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Explore every chapter and verse with authentic Devanagari Sanskrit, Romanized IAST transliteration, and rich philosophical purports.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">18</span>
                  <span className="text-xs text-slate-400">Chapters Structured</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">700</span>
                  <span className="text-xs text-slate-400">Eternal Verses</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">3</span>
                  <span className="text-xs text-slate-400">Supported Languages</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0B192C] border border-slate-800">
                  <span className="text-2xl font-serif font-bold text-[#F1B941] block">100%</span>
                  <span className="text-xs text-slate-400">Scriptural Integrity</span>
                </div>
              </div>

              <button
                onClick={onExploreGita}
                className="px-6 py-3 rounded-xl bg-[#1E3E62] hover:bg-[#28527A] text-[#F1B941] border border-[#F1B941]/40 font-semibold text-xs tracking-wider uppercase transition-all"
              >
                Browse All Chapters & Verses →
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
                "You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction."
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: MULTILINGUAL SUPPORT SHOWCASE */}
      <section className="py-20 bg-[#081225] border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-bold uppercase tracking-widest text-[#F1B941] block mb-2">
            Multilingual Soul
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Guidance in Your Mother Tongue
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-8">
            Experience natural, empathetic spiritual guidance crafted in English, Hindi, and Telugu—without rigid or awkward machine translations.
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
              Sample Krishna Greeting:
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
              Common Inquiries
            </span>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              {t.faq}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
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
              Begin Your Dialogue with AI Krishna
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
