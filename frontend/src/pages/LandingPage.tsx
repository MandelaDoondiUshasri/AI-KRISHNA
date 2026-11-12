import React, { useState } from 'react';
import { 
  MessageSquare, Compass, ArrowRight, ShieldCheck, 
  Brain, Briefcase, Flame, HeartHandshake, ChevronDown, 
  ChevronUp, BookOpen, Check, Heart, Shield, Dices, 
  Target, Trophy, Mail, HelpCircle, Smile, Palette, Sword, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import krishnaDivineImg from '../assets/krishna_divine.jpg';

interface LandingPageProps {
  onStartChat: () => void;
  onExploreGita: () => void;
  onOpenInteractive?: (featureId?: string) => void;
}

const situationIcons = [Briefcase, Brain, Flame, HeartHandshake, ShieldCheck, Compass];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartChat, onExploreGita, onOpenInteractive }) => {
  const { t, language, setLanguage } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const interactiveFeaturesList = [
    {
      id: 'mood',
      title: language === 'te' ? "కృష్ణుని భావోద్వేగ అద్దం" : language === 'hi' ? "कृष्ण का मूड मिरर" : "Krishna's Mood Mirror",
      desc: language === 'te' ? "ఆందోళన, కోపం లేదా అయోమయంలో ఉన్నారా? మీ భావనను ఎంచుకుని శాంతి శ్లోకం మరియు ప్రాణాయామం పొందండి." : language === 'hi' ? "तनाव, क्रोध या असमंजस? अपनी मनोदशा चुनें और तुरंत मन शांत करने वाला श्लोक व प्राणायाम पाएं।" : "Select your current emotional state to receive targeted Gita wisdom and 4-7-8 Pranayama calmness.",
      badge: language === 'te' ? "భావోద్వేగ శాంతి" : language === 'hi' ? "मन की शांति" : "Emotional Calm",
      icon: Heart,
      color: "from-rose-500/20 to-amber-500/10 border-rose-500/30 text-rose-400"
    },
    {
      id: 'arjuna',
      title: language === 'te' ? "నీవే అర్జునుడివైతే" : language === 'hi' ? "यदि आप अर्जुन होते" : "If You Were Arjuna",
      desc: language === 'te' ? "వాస్తవ జీవిత ధర్మసంకటాలు: కెరీర్, కుటుంబం, నైతికతపై మీ నిర్ణయాన్ని ఎంచుకుని కృష్ణుని దృక్పథాన్ని తెలుసుకోండి." : language === 'hi' ? "करियर, परिवार व धर्मसंकट के वास्तविक परिदृश्यों में अपने विकल्प चुनें और कृष्ण का मार्गदर्शन जानें।" : "Step into moral crossroads: career, family, and duty. Choose your path and discover Krishna's counsel.",
      badge: language === 'te' ? "ధర్మ సంకటం" : language === 'hi' ? "धर्म संकट" : "Moral Crossroads",
      icon: Shield,
      color: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400"
    },
    {
      id: 'problem',
      title: language === 'te' ? "సమస్యను ఛేదించండి" : language === 'hi' ? "समस्या का विश्लेषण" : "Decode My Problem",
      desc: language === 'te' ? "మీ వ్యక్తిగత సమస్యను నమోదు చేయండి. AI దాని వెనుక ఉన్న భావోద్వేగం, మూల కారణం మరియు పరిష్కారాన్ని డీకోడ్ చేస్తుంది." : language === 'hi' ? "अपनी समस्या लिखें। एआई इसके पीछे की भावना, मूल कारण, गीता की सीख और समाधान का रोडमैप तैयार करेगा।" : "Submit your challenge. AI dissects root emotion, latent questions, Gita matches, and actionable steps.",
      badge: language === 'te' ? "డీప్ క్లారిటీ" : language === 'hi' ? "गहन स्पष्टता" : "Deep Clarity",
      icon: Brain,
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400"
    },
    {
      id: 'kurukshetra',
      title: language === 'te' ? "ఇంటరాక్టివ్ కురుక్షేత్రం" : language === 'hi' ? "संवादात्मक कुरुक्षेत्र" : "Interactive Kurukshetra",
      desc: language === 'te' ? "5-దశల యుద్ధ క్షేత్ర ప్రయాణం. ప్రతి నిర్ణయం మీ మానసిక సమతుల్యతను పరీక్షిస్తుంది. ధర్మ విజేత సర్టిఫికెట్ సాధించండి." : language === 'hi' ? "5-चरणीय कुरुक्षेत्र निर्णय यात्रा। प्रत्येक निर्णय से मन का संतुलन मापें और धर्म विजय प्रमाण पत्र प्राप्त करें।" : "5-stage epic moral battlefield. Make pivotal decisions under pressure and earn your Karma Yoga badge.",
      badge: language === 'te' ? "యుద్ధ తత్వశాస్త్రం" : language === 'hi' ? "युद्ध दर्शन" : "Battle of Duty",
      icon: Sword,
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400"
    },
    {
      id: 'quiz',
      title: language === 'te' ? "కృష్ణుని జ్ఞాన క్విజ్" : language === 'hi' ? "कृष्ण ज्ञान प्रश्नोत्तरी" : "Krishna's Wisdom Quiz",
      desc: language === 'te' ? "భగవద్గీత బోధనలపై మీ జ్ఞానాన్ని పరీక్షించండి. పాయింట్లు, స్థాయిలు మరియు ప్రత్యేక బ్యాడ్జ్‌లు గెలుచుకోండి." : language === 'hi' ? "भगवद्गीता के उपदेशों पर इंटरैक्टिव क्विज़ खेलें, अंक अर्जित करें और बैज अनलॉक करें।" : "Test your understanding of timeless philosophy with interactive quizzes, points, levels, and badges.",
      badge: language === 'te' ? "జ్ఞాన పరీక్ష" : language === 'hi' ? "ज्ञान परीक्षा" : "Interactive Quiz",
      icon: Trophy,
      color: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30 text-yellow-400"
    },
    {
      id: 'letter',
      title: language === 'te' ? "కృష్ణునికి ఒక లేఖ" : language === 'hi' ? "कृष्ण को एक पत्र" : "Letter to Krishna",
      desc: language === 'te' ? "మీ అంతరంగపు బాధలు లేదా ప్రార్థనలను గోప్యంగా రాసుకోండి. కృష్ణుని నుండి సాంత్వనతో కూడిన జవాబును అందుకోండి." : language === 'hi' ? "अपने मन की बात, पीड़ा या प्रार्थना निजी रूप से लिखें और कृष्ण से करुणामय मार्गदर्शन प्राप्त करें।" : "Pour out your deepest thoughts in complete privacy, and receive a compassionate epistolary reflection.",
      badge: language === 'te' ? "వ్యక్తిగత గోప్యత" : language === 'hi' ? "गोपनीय संवाद" : "Private Sanctuary",
      icon: Mail,
      color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400"
    },
    {
      id: 'daily_challenge',
      title: language === 'te' ? "నేడు నేను ఏమి చేయాలి?" : language === 'hi' ? "आज मैं क्या करूँ?" : "What Should I Do Today?",
      desc: language === 'te' ? "మీ వ్యక్తిగత లక్ష్యం ఆధారంగా ప్రతిరోజూ 3 చిన్న సాధనలు, చెక్‌లిస్ట్ మరియు నిరంతర స్ట్రీక్ ట్రాకింగ్." : language === 'hi' ? "अपने लक्ष्य के अनुसार दैनिक 3 सूक्ष्म साधनाएं, चेकलिस्ट और निरंतरता (Streak) ट्रैक करें।" : "Goal-based daily micro-sadhana challenges with checklist and streak tracking for mindful living.",
      badge: language === 'te' ? "దైనందిన సాధన" : language === 'hi' ? "दैनिक साधना" : "Daily Sadhana",
      icon: Target,
      color: "from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400"
    },
    {
      id: 'card_gen',
      title: language === 'te' ? "దివ్య జ్ఞాన కార్డులు" : language === 'hi' ? "विजडम कार्ड जनरेटर" : "Wisdom Card Generator",
      desc: language === 'te' ? "ప్రముఖ శ్లోకాలు, అనువాదాలతో అందమైన హెచ్‌డీ కార్డులను రూపొందించి డౌన్‌లోడ్ చేయండి లేదా షేర్ చేయండి." : language === 'hi' ? "सत्यापित श्लोकों और अर्थ के साथ आकर्षक सोशल कार्ड बनाएं और उच्च गुणवत्ता में डाउनलोड करें।" : "Generate aesthetic, downloadable high-res wisdom cards with authentic verses and themes to share.",
      badge: language === 'te' ? "డౌన్‌లోడ్ & షేర్" : language === 'hi' ? "साझा करें" : "Art & Sloka",
      icon: Palette,
      color: "from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400"
    },
    {
      id: 'eli10',
      title: language === 'te' ? "పిల్లల శైలిలో సులభంగా (ELI10)" : language === 'hi' ? "सरल बाल-बोध (ELI10)" : "Explain Like I'm 10",
      desc: language === 'te' ? "గీతలోని గంభీరమైన శ్లోకాలను పిల్లలకు, యువతకు సులభంగా అర్థమయ్యే కథలు మరియు ఉపమానాలతో తెలుసుకోండి." : language === 'hi' ? "गूढ़ श्लोकों को लेगो, अंतरिक्ष व खेल जैसे सरल बाल-सुलभ उदाहरणों और कहानियों के माध्यम से समझें।" : "Understand deep philosophical concepts simplified through engaging stories and kid-friendly analogies.",
      badge: language === 'te' ? "సులభ కథలు" : language === 'hi' ? "सरल उपमाएं" : "Story Wisdom",
      icon: Smile,
      color: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400"
    },
    {
      id: 'myths',
      title: language === 'te' ? "అపోహ vs వాస్తవం" : language === 'hi' ? "भ्रम बनाम सत्य" : "Myth vs Truth",
      desc: language === 'te' ? "గీత కేవలం సన్యాసులకేనా? ఇది యుద్ధాన్ని ప్రోత్సహిస్తుందా? ప్రామాణిక శ్లోకాలతో అపోహలను తొలగించుకోండి." : language === 'hi' ? "क्या गीता केवल संन्यासियों के लिए है? क्या यह युद्ध को बढ़ावा देती है? प्रमाण सहित सच जानें।" : "Debunk common misconceptions about the Bhagavad Gita with verified scriptural citations and facts.",
      badge: language === 'te' ? "శాస్త్రీయ సత్యాలు" : language === 'hi' ? "शास्त्रीय सत्य" : "Scriptural Proof",
      icon: HelpCircle,
      color: "from-indigo-500/20 to-violet-500/10 border-indigo-500/30 text-indigo-400"
    },
    {
      id: 'random',
      title: language === 'te' ? "కృష్ణుని ఆకస్మిక జ్ఞానం" : language === 'hi' ? "कृष्ण की अप्रत्याशित सीख" : "Krishna's Random Wisdom",
      desc: language === 'te' ? "'సర్ప్రైజ్ మీ' బటన్ నొక్కి ఈ క్షణానికి మీకు అవసరమైన ఆకస్మిక దివ్య శ్లోకం మరియు సూక్ష్మ కర్తవ్యాన్ని పొందండి." : language === 'hi' ? "'सरप्राइज मी' क्लिक करें और वर्तमान क्षण के लिए मार्गदर्शन, श्लोक व दैनिक सूक्ष्म संकल्प प्राप्त करें।" : "Divine oracle button delivering an authentic random verse with reflection question and micro-action.",
      badge: language === 'te' ? "దివ్య సంకల్పం" : language === 'hi' ? "दैवीय संकेत" : "Divine Oracle",
      icon: Dices,
      color: "from-violet-500/20 to-fuchsia-500/10 border-violet-500/30 text-violet-400"
    }
  ];

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

      {/* SECTION: 11 IMMERSIVE INTERACTIVE EXPERIENCES */}
      <section className="py-20 bg-gradient-to-b from-[#081225] via-[#050C18] to-[#060E1A] border-b border-[#F1B941]/20 relative overflow-hidden">
        {/* Divine background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#008DDA]/10 via-[#F1B941]/10 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 shadow-sm shadow-[#F1B941]/10 mb-3">
              <Sparkles className="w-4 h-4 text-[#F1B941]" />
              <span className="text-xs font-bold tracking-widest text-[#F1B941] uppercase">
                {language === 'te' ? 'సరికొత్త ఇంటరాక్టివ్ స్టూడియో' : language === 'hi' ? 'नवीनतम इंटरैक्टिव दिव्य अनुभव' : 'Interactive Wisdom Studio'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              {language === 'te' ? '11 వినూత్న ఆధ్యాత్మిక అనుభవాలు & సాధనలు' : language === 'hi' ? '11 नवीन संवादात्मक अनुभव एवं साधना' : '11 Interactive Spiritual Experiences'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'te' 
                ? 'భావోద్వేగ శాంతి, వాస్తవ నిర్ణయ సంకటాలు, నిత్య సాధన మరియు జ్ఞాన పరీక్షల కోసం రూపొందించబడిన ప్రత్యేక సాధనాలు.'
                : language === 'hi'
                ? 'मन की शांति, धर्मसंकट के निर्णय, दैनिक साधना और शास्त्रीय ज्ञान के लिए तैयार किए गए इंटरैक्टिव टूल्स।'
                : "Engage with Lord Krishna's teachings dynamically through emotional reflections, moral simulations, quizzes, private letters, and creative wisdom cards."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {interactiveFeaturesList.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => onOpenInteractive ? onOpenInteractive(feature.id) : null}
                  className="group relative bg-[#0B192C]/90 border border-slate-800 hover:border-[#F1B941]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#F1B941]/10 hover:-translate-y-1 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-[#F1B941]/40 group-hover:text-[#F1B941] transition-colors">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-100 group-hover:text-[#F1B941] transition-colors mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {feature.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#F1B941]">
                    <span>
                      {language === 'te' ? 'అనుభవించండి' : language === 'hi' ? 'अनुभव करें' : 'Explore Feature'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
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
