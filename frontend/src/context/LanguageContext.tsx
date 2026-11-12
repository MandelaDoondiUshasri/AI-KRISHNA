import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  appName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  startChat: string;
  exploreGita: string;
  dailyWisdom: string;
  savedWisdom: string;
  admin: string;
  login: string;
  register: string;
  logout: string;
  chatPlaceholder: string;
  send: string;
  suggestedQuestions: string;
  howItWorks: string;
  everydayWisdom: string;
  availableLanguages: string;
  faq: string;
  welcomeMessage: string;
}

const translationsMap: Record<Language, Translations> = {
  en: {
    appName: "AI KRISHNA",
    tagline: "Your Life Companion",
    heroHeadline: "When life gets confusing, find clarity through timeless wisdom.",
    heroSubheadline: "Experience Lord Krishna's transformative counsel from the Bhagavad Gita, personalized for your career, relationships, emotions, and life dilemmas.",
    startChat: "Start Your Conversation",
    exploreGita: "Explore Bhagavad Gita",
    dailyWisdom: "Daily Wisdom",
    savedWisdom: "Saved Insights",
    admin: "Admin",
    login: "Sign In",
    register: "Create Account",
    logout: "Sign Out",
    chatPlaceholder: "Share what is troubling your mind...",
    send: "Ask Krishna",
    suggestedQuestions: "Guiding Prompts",
    howItWorks: "How AI Krishna Works",
    everydayWisdom: "Wisdom for Everyday Life",
    availableLanguages: "Available Languages",
    faq: "Frequently Asked Questions",
    welcomeMessage: "Namaste! I am here to listen. Whatever is troubling your mind, share it with me. Together, we will explore the wisdom of the Bhagavad Gita and find clarity."
  },
  hi: {
    appName: "एआई कृष्ण",
    tagline: "आपके जीवन का आध्यात्मिक साथी",
    heroHeadline: "जब जीवन में संशय और असमंजस हो, तब शाश्वत ज्ञान से पाएँ स्पष्टता।",
    heroSubheadline: "भगवद्गीता के दिव्य उपदेशों के माध्यम से अपने करियर, रिश्तों, मानसिक तनाव और जीवन के निर्णयों में मार्गदर्शन प्राप्त करें।",
    startChat: "संवाद आरंभ करें",
    exploreGita: "भगवद्गीता अन्वेषण",
    dailyWisdom: "दैनिक अमृतवाणी",
    savedWisdom: "सहेजे गए विचार",
    admin: "व्यवस्थापक",
    login: "प्रवेश करें",
    register: "खाता बनाएं",
    logout: "लॉग आउट",
    chatPlaceholder: "अपने मन की दुविधा या विचार साझा करें...",
    send: "पूछें",
    suggestedQuestions: "सुझाए गए प्रश्न",
    howItWorks: "एआई कृष्ण कैसे काम करता है",
    everydayWisdom: "दैनिक जीवन के लिए ज्ञान",
    availableLanguages: "उपलब्ध भाषाएँ",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    welcomeMessage: "नमस्ते! मैं आपकी बात सुनने के लिए यहाँ हूँ। जो कुछ भी आपके मन को व्यथित कर रहा है, बेझिझक मुझसे साझा करें। हम मिलकर भगवद्गीता के ज्ञान से समाधान खोजेंगे।"
  },
  te: {
    appName: "AI కృష్ణ",
    tagline: "మీ జీవిత ఆధ్యాత్మిక నేస్తం",
    heroHeadline: "జీవితం గందరగోళంగా ఉన్నప్పుడు, శాశ్వతమైన జ్ఞానంతో స్పష్టతను పొందండి.",
    heroSubheadline: "భగవద్గీతలో శ్రీకృష్ణుడు ఉపదేశించిన సార్వకాలిక సత్యాల ద్వారా కెరీర్, మానసిక ఒత్తిడి, సంబంధాలు మరియు కీలక నిర్ణయాలలో అమూల్యమైన మార్గదర్శకత్వాన్ని పొందండి.",
    startChat: "సంభాషణను ప్రారంభించండి",
    exploreGita: "భగవద్గీతను అన్వేషించండి",
    dailyWisdom: "నేటి గీతామృతం",
    savedWisdom: "భద్రపరిచిన అంశాలు",
    admin: "అడ్మిన్",
    login: "లాగిన్",
    register: "ఖాతా తెరవండి",
    logout: "లాగౌట్",
    chatPlaceholder: "మీ మనస్సును కలవరపెడుతున్న విషయాన్ని పంచుకోండి...",
    send: "సందేహం అడగండి",
    suggestedQuestions: "ప్రధాన ప్రశ్నలు",
    howItWorks: "AI కృష్ణ ఎలా పనిచేస్తుంది",
    everydayWisdom: "నిత్య జీవితానికి గీతా విజ్ఞానం",
    availableLanguages: "అందుబాటులో ఉన్న భాషలు",
    faq: "తరచుగా అడిగే ప్రశ్నలు",
    welcomeMessage: "నమస్తే! మీ అంతరంగాన్ని వినడానికి నేను ఇక్కడ ఉన్నాను. మీ మనస్సును బాధపెడుతున్నదేదైనా నాతో పంచుకోండి. భగవద్గీత యొక్క దివ్య జ్ఞానంతో కలిసి స్పష్టతను కనుగొందాం."
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('aikrishna_lang') as Language;
    return saved && ['en', 'hi', 'te'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aikrishna_lang', lang);
  };

  const t = translationsMap[language] || translationsMap.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

