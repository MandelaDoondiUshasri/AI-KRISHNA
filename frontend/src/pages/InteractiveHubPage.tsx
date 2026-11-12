import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Brain, Dices, Target, Trophy, 
  Mail, HelpCircle, Smile, Palette, Sword, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MoodMirror } from '../components/interactive/MoodMirror';
import { IfYouWereArjuna } from '../components/interactive/IfYouWereArjuna';
import { DecodeMyProblem } from '../components/interactive/DecodeMyProblem';
import { RandomWisdom } from '../components/interactive/RandomWisdom';
import { WhatShouldIDoToday } from '../components/interactive/WhatShouldIDoToday';
import { WisdomQuiz } from '../components/interactive/WisdomQuiz';
import { LetterToKrishna } from '../components/interactive/LetterToKrishna';
import { MythVsTruth } from '../components/interactive/MythVsTruth';
import { ExplainLikeIm10 } from '../components/interactive/ExplainLikeIm10';
import { WisdomCardGenerator } from '../components/interactive/WisdomCardGenerator';
import { InteractiveKurukshetra } from '../components/interactive/InteractiveKurukshetra';

export interface InteractiveHubPageProps {
  initialFeature?: string;
}

export const InteractiveHubPage: React.FC<InteractiveHubPageProps> = ({ initialFeature }) => {
  const { language, t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState<string>(initialFeature || 'mood');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (initialFeature) {
      setActiveFeature(initialFeature);
    }
  }, [initialFeature]);

  const features = [
    {
      id: 'mood',
      name_en: "Krishna's Mood Mirror",
      name_hi: "मन की स्थिति का दर्पण",
      name_te: "భావోద్వేగ అద్దం",
      icon: Heart,
      category: 'heart',
      badge: 'Emotional Calm'
    },
    {
      id: 'arjuna',
      name_en: "If You Were Arjuna",
      name_hi: "यदि आप अर्जुन होते",
      name_te: "నీవే అర్జునుడివైతే",
      icon: Shield,
      category: 'battle',
      badge: 'Ethical Choices'
    },
    {
      id: 'decode',
      name_en: "Decode My Problem",
      name_hi: "समस्या का विश्लेषण",
      name_te: "సమస్య విశ్లేషణ",
      icon: Brain,
      category: 'heart',
      badge: 'Deep Clarity'
    },
    {
      id: 'random',
      name_en: "Krishna's Random Wisdom",
      name_hi: "दिव्य संकेत / सरप्राइज",
      name_te: "దివ్య సంకల్ప శ్లోకం",
      icon: Dices,
      category: 'tools',
      badge: 'Surprise Me'
    },
    {
      id: 'challenges',
      name_en: "What Should I Do Today?",
      name_hi: "आज का कर्म संकल्प",
      name_te: "నేటి సాధన సవాలు",
      icon: Target,
      category: 'tools',
      badge: 'Streaks & Goals'
    },
    {
      id: 'quiz',
      name_en: "Krishna's Wisdom Quiz",
      name_hi: "गीता ज्ञान प्रश्नोत्तरी",
      name_te: "గీతా విజ్ఞాన క్విజ్",
      icon: Trophy,
      category: 'battle',
      badge: 'Badges & Points'
    },
    {
      id: 'letter',
      name_en: "Letter to Krishna",
      name_hi: "श्रीकृष्ण को पत्र",
      name_te: "కృష్ణునికి లేఖ",
      icon: Mail,
      category: 'heart',
      badge: 'Private Sanctuary'
    },
    {
      id: 'myths',
      name_en: "Myth vs Truth",
      name_hi: "भ्रम बनाम शाश्वत सत्य",
      name_te: "అపోహలు vs వాస్తవాలు",
      icon: HelpCircle,
      category: 'tools',
      badge: 'Fact-Check'
    },
    {
      id: 'eli10',
      name_en: "Explain Like I'm 10",
      name_hi: "बाल-सुलभ गीता",
      name_te: "పిల్లల కోసం గీతా కథలు",
      icon: Smile,
      category: 'tools',
      badge: 'Simple Stories'
    },
    {
      id: 'card',
      name_en: "Wisdom Card Generator",
      name_hi: "ज्ञान पत्र जनरेटर",
      name_te: "జ్ఞాన పత్రాల రూపకర్త",
      icon: Palette,
      category: 'tools',
      badge: 'Download Art'
    },
    {
      id: 'kurukshetra',
      name_en: "Interactive Kurukshetra",
      name_hi: "कुरुक्षेत्र युद्धक्षेत्र",
      name_te: "కురుక్షేత్ర రణరంగం",
      icon: Sword,
      category: 'battle',
      badge: '5-Stage Epic'
    }
  ];

  const categories = [
    { id: 'all', label_en: 'All 11 Experiences', label_hi: 'सभी 11 अनुभव', label_te: 'అన్ని 11 అనుభవాలు' },
    { id: 'heart', label_en: 'Heart & Emotions', label_hi: 'हृदय एवं भावनाएं', label_te: 'హృదయం & భావోద్వేగాలు' },
    { id: 'battle', label_en: 'Dilemmas & Battlefield', label_hi: 'धर्मसंकट एवं युद्धक्षेत्र', label_te: 'ధర్మసంక్షోభాలు & రణరంగం' },
    { id: 'tools', label_en: 'Daily Growth & Tools', label_hi: 'दैनिक प्रगति एवं साधन', label_te: 'నిత్య వికాసం & ఉపకరణాలు' }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  const getFeatureName = (f: typeof features[0]) => {
    if (language === 'te') return f.name_te;
    if (language === 'hi') return f.name_hi;
    return f.name_en;
  };

  return (
    <div className="min-h-screen bg-[#081225] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Hub Top Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 text-xs text-[#F1B941] shadow-md shadow-[#F1B941]/10">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-bold tracking-wider uppercase whitespace-nowrap">
              {language === 'te' ? 'దివ్య అనుభవాల వేదిక' : language === 'hi' ? 'दिव्य इंटरएक्टिव मंच' : "Interactive Wisdom Studio"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            {language === 'te' ? 'భగవద్గీత ఇంటరాక్టివ్ అనుభవాలు' : language === 'hi' ? 'भगवद्गीता के 11 सजीव आध्यात्मिक अनुभव' : "11 Interactive Spiritual Experiences"}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === 'te' ? 'భావోద్వేగాల శాంతి, క్లిష్టమైన నిర్ణయాలు, రోజువారీ సాధనలు, పిల్లల కోసం కథలు మరియు గేమ్స్ ద్వారా గీతా జ్ఞానాన్ని ఆస్వాదించండి.' : language === 'hi' ? 'भावनात्मक संतुलन, नैतिक निर्णय, दैनिक संकल्प, बाल-कहानियों और जीवन-खेलों के माध्यम से भगवद्गीता को अपने जीवन में उतारें।' : "Step beyond passive reading. Engage your emotions, test your decisions, embark on daily sadhanas, and explore the Gita through interactive living experiences."}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            const catLabel = language === 'te' ? cat.label_te : language === 'hi' ? cat.label_hi : cat.label_en;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isCatActive
                    ? 'bg-[#F1B941] text-[#081225] font-bold shadow-md shadow-[#F1B941]/20'
                    : 'bg-[#0B192C] text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {catLabel}
              </button>
            );
          })}
        </div>

        {/* Feature Selector Carousel / Horizontal Scroll */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="flex items-center space-x-2.5 min-w-max mx-auto px-1">
            {filteredFeatures.map((f) => {
              const Icon = f.icon;
              const isSelected = activeFeature === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(f.id)}
                  className={`px-4 py-3 rounded-2xl border text-xs font-semibold transition-all flex items-center space-x-2 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1E3E62] to-[#0A1A2F] border-[#F1B941] text-[#F1B941] shadow-lg shadow-[#F1B941]/20 scale-105'
                      : 'bg-[#0B192C] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#F1B941]' : 'text-slate-400'}`} />
                  <span className="whitespace-nowrap">{getFeatureName(f)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Active Canvas */}
        <div className="pt-2">
          {activeFeature === 'mood' && <MoodMirror />}
          {activeFeature === 'arjuna' && <IfYouWereArjuna />}
          {activeFeature === 'decode' && <DecodeMyProblem />}
          {activeFeature === 'random' && <RandomWisdom />}
          {activeFeature === 'challenges' && <WhatShouldIDoToday />}
          {activeFeature === 'quiz' && <WisdomQuiz />}
          {activeFeature === 'letter' && <LetterToKrishna />}
          {activeFeature === 'myths' && <MythVsTruth />}
          {activeFeature === 'eli10' && <ExplainLikeIm10 />}
          {activeFeature === 'card' && <WisdomCardGenerator />}
          {activeFeature === 'kurukshetra' && <InteractiveKurukshetra />}
        </div>

      </div>
    </div>
  );
};

