import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  
  // Navbar
  homeNav: string;
  chatNav: string;
  explorerNav: string;
  interactiveNav: string;
  dailyNav: string;
  savedNav: string;
  adminNav: string;
  login: string;
  register: string;
  logout: string;

  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroQuote: string;
  startChat: string;
  exploreGita: string;
  trustChapters: string;
  trustVerses: string;
  trustLanguages: string;
  heroCardTitle: string;
  heroCardSub: string;
  heroCardMeaning: string;

  // How AI Krishna Works
  howItWorksBadge: string;
  howItWorksTitle: string;
  howItWorksDesc: string;
  engineSteps: { num: string; title: string; desc: string }[];

  // Everyday Life
  everydayBadge: string;
  everydayTitle: string;
  everydayDesc: string;
  seekGuidance: string;
  situations: { title: string; desc: string }[];

  // 18 Chapters Section
  corpusBadge: string;
  corpusTitle: string;
  corpusDesc: string;
  browseAllBtn: string;
  statChapters: string;
  statVerses: string;
  statLanguages: string;
  statIntegrity: string;

  // Multilingual Soul
  multiBadge: string;
  multiTitle: string;
  multiDesc: string;
  sampleGreetingLabel: string;
  welcomeMessage: string;

  // FAQ
  faqBadge: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];

  // Gita Explorer Page
  explorerBadge: string;
  explorerTitle: string;
  explorerSubtitle: string;
  searchPlaceholder: string;
  filterPlaceholder: string;
  searchBtn: string;
  clearBtn: string;
  popularTagsLabel: string;
  backToChapters: string;
  versesInChapter: string;
  searchResultsTitle: string;
  noVersesFound: string;
  readPurportBtn: string;
  allChaptersTitle: string;
  totalVersesLabel: string;

  // Daily Wisdom Page
  dailyBadge: string;
  dailyTitle: string;
  dailySubtitle: string;
  todayContemplationBadge: string;
  whyItMatters: string;
  todayFocus: string;
  recentWisdomTitle: string;

  // Chat Page
  chatTitle: string;
  chatSubtitle: string;
  newChatBtn: string;
  chatPlaceholder: string;
  sendBtn: string;
  welcomeTitle: string;
  suggestedQuestionsTitle: string;
  suggestedQuestions: string[];
  partUnderstanding: string;
  partWisdom: string;
  partVerse: string;
  partApplies: string;
  partSteps: string;
  partThought: string;

  // Saved Wisdom Page
  savedBadge: string;
  savedTitle: string;
  savedSubtitle: string;
  noSavedFound: string;
  sanctuaryTitle: string;
  sanctuaryDesc: string;
  signInOrRegister: string;
  savedItems: string;
  loadingSaved: string;
  collectWisdomHint: string;

  // Additional Common & Explorer & Detail Keys
  chapterWord: string;
  versesWord: string;
  readChapterVerses: string;
  translationWord: string;
  philosophicalPurport: string;
  coreConcepts: string;
  relevantSituations: string;
  eternalMeaning: string;
  chatHelperText: string;
  confidentialDialogue: string;
  krishnaCounselTitle: string;
  gitaWisdomBadge: string;
  directMatch: string;
  philosophicalConnection: string;
  verseMeaningLabel: string;
  copyVerseBtn: string;
  bookmarkVerseBtn: string;
  noDialogues: string;
  askToBegin: string;
  confidentialSpace: string;
  loadingDaily: string;
  focusLabel: string;
  situationsMap: Record<string, string>;

  // Auth Modal
  authLoginTitle: string;
  authRegisterTitle: string;
  authLoginSubtitle: string;
  authRegisterSubtitle: string;
  authFullName: string;
  authEmail: string;
  authPassword: string;
  authPrefLang: string;
  quickTestAccounts: string;
}

const translationsMap: Record<Language, Translations> = {
  en: {
    appName: "AI KRISHNA",
    tagline: "Your Life Companion",

    homeNav: "Home",
    chatNav: "AI Krishna",
    explorerNav: "Gita Explorer",
    interactiveNav: "Interactive Studio",
    dailyNav: "Daily Wisdom",
    savedNav: "Saved Insights",
    adminNav: "Admin",
    login: "Sign In",
    register: "Create Account",
    logout: "Sign Out",

    heroBadge: "Bhagavad Gita Spiritual Intelligence",
    heroHeadline: "AI KRISHNA",
    heroSubheadline: "Experience Lord Krishna's transformative counsel from the Bhagavad Gita, personalized for your career, emotions, relationships, and life dilemmas.",
    heroQuote: "When life gets confusing, find clarity through timeless wisdom.",
    startChat: "Start Your Conversation",
    exploreGita: "Explore Bhagavad Gita",
    trustChapters: "All 18 Chapters",
    trustVerses: "700 Verses Structured",
    trustLanguages: "English • हिन्दी • తెలుగు",
    heroCardTitle: "Sri Krishna's Timeless Counsel",
    heroCardSub: "Mahabharata • Kurukshetra",
    heroCardMeaning: "Equanimity in all circumstances is Yoga.",

    howItWorksBadge: "Architectural Innovation",
    howItWorksTitle: "The 9-Step Context Bridge Engine",
    howItWorksDesc: "We never return random, disconnected Gita quotes. Our proprietary intelligence engine deeply deconstructs your real-world predicament and builds a contextual bridge between ancient metaphysics and everyday life.",
    engineSteps: [
      { num: "01", title: "Problem Ingestion", desc: "Listens deeply to your real-life dilemma and unburdened emotions." },
      { num: "02", title: "Emotion Detection", desc: "Identifies disappointment, envy, fear, grief, or cognitive overwhelm." },
      { num: "03", title: "Latent Inquiry", desc: "Discovers the profound psychological inquiry beneath your surface words." },
      { num: "04", title: "Semantic Gita Retrieval", desc: "Searches 700 verses across 18 chapters using multi-dimensional vector matching." },
      { num: "05", title: "Verse Pinpointing", desc: "Retrieves the exact Chapter and Verse (e.g. 2.47 for duty, 6.5 for self-elevation)." },
      { num: "06", title: "Sacred Context", desc: "Understands the original philosophical battlefield dialogue between Krishna and Arjuna." },
      { num: "07", title: "Modern Life Bridge", desc: "Translates the ancient metaphor directly to your 21st-century situation." },
      { num: "08", title: "Personalized Synthesis", desc: "Formulates a 6-part empathetic roadmap in English, Hindi, or Telugu." },
      { num: "09", title: "Actionable Guidance", desc: "Provides concrete micro-actions and a golden thought to hold in your heart." }
    ],

    everydayBadge: "Universal Relevance",
    everydayTitle: "Timeless Wisdom for Modern Struggles",
    everydayDesc: "Lord Krishna's dialogue with Arjuna was not about abstract theology—it took place in the middle of a paralyzing moral, emotional, and psychological crisis.",
    seekGuidance: "Seek Guidance",
    situations: [
      { title: "Career & Promotion Dilemmas", desc: "Working hard but colleagues are getting promoted? Reclaim self-worth and discover Nishkama Karma." },
      { title: "Overthinking & Future Anxiety", desc: "Restless racing thoughts? Master the art of Abhyasa (practice) and Vairagya (healthy detachment)." },
      { title: "Controlling Anger & Hurt Pride", desc: "Someone insulted you? Learn how to halt the destructive chain reaction of rage before it ruins your peace." },
      { title: "Relationships & Heartbreak", desc: "Suffering from attachment or broken promises? Love with pure depth without losing your soul's anchor." },
      { title: "Fear of Failure in Ventures", desc: "Paralyzed by startup risk, exams, or setbacks? Develop 'Samatvam'—steady composure in success and defeat." },
      { title: "Life Crossroads & Purpose", desc: "Feeling empty or directionless? Align with your authentic Swadharma and walk forward with clarity." }
    ],

    corpusBadge: "Authentic Scripture",
    corpusTitle: "Complete Knowledge Base: 18 Chapters & 700 Verses",
    corpusDesc: "Explore every chapter and verse with authentic Devanagari Sanskrit, Romanized IAST transliteration, and rich philosophical purports.",
    browseAllBtn: "Browse All Chapters & Verses →",
    statChapters: "Chapters Structured",
    statVerses: "Eternal Verses",
    statLanguages: "Supported Languages",
    statIntegrity: "Scriptural Integrity",

    multiBadge: "Multilingual Soul",
    multiTitle: "Guidance in Your Mother Tongue",
    multiDesc: "Experience natural, empathetic spiritual guidance crafted in English, Hindi, and Telugu—without rigid or awkward machine translations.",
    sampleGreetingLabel: "Sample Krishna Greeting:",
    welcomeMessage: "Namaste! I am here to listen. Whatever is troubling your mind, share it with me. Together, we will explore the wisdom of the Bhagavad Gita and find clarity.",

    faqBadge: "Common Inquiries",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      { q: "Does AI Krishna claim to be the actual Lord Krishna?", a: "No. AI Krishna is an AI spiritual companion inspired by the teachings of the Bhagavad Gita. It clearly distinguishes itself as an AI system and never claims divinity." },
      { q: "How does the Context Bridge Engine work?", a: "Unlike typical chatbots that output random verses, the Context Bridge Engine follows a rigorous 9-step semantic workflow: analyzing your emotional state, identifying the core question, retrieving authentic scripture, and generating a structured 6-part response." },
      { q: "Are the Sanskrit verses and translations verified?", a: "Yes. All verses in the knowledge base are rigorously structured from authentic Bhagavad Gita sources across all 18 chapters, complete with Sanskrit Devanagari, IAST transliteration, and multi-language translations." },
      { q: "Can I use AI Krishna in Telugu and Hindi?", a: "Yes! AI Krishna natively supports English, Hindi (हिन्दी), and Telugu (తెలుగు) with natural, culturally respectful phrasing." },
      { q: "Is AI Krishna a replacement for professional mental health therapy or legal advice?", a: "No. While the Gita offers profound mental solace, AI Krishna does not provide medical, psychological, legal, or financial advice. In cases of acute mental health distress or crisis, we provide 24/7 helpline resources like Tele-MANAS (14416) and 988." }
    ],

    explorerBadge: "Bhagavad Gita Knowledge Base",
    explorerTitle: "Explore All 18 Chapters & 700 Verses",
    explorerSubtitle: "Search timeless scripture by life situation, keyword, or browse each chapter's analytical knowledge.",
    searchPlaceholder: "Search keyword, concept, or verse (e.g. 'karma', 'overthinking', '2.47')...",
    filterPlaceholder: "Filter by Life Situation",
    searchBtn: "Search",
    clearBtn: "Clear",
    popularTagsLabel: "Popular tags:",
    backToChapters: "Back to All 18 Chapters",
    versesInChapter: "Verses in this Chapter",
    searchResultsTitle: "Search Results",
    noVersesFound: "No direct verses found for this query.",
    readPurportBtn: "Detailed Purport & Application",
    allChaptersTitle: "All 18 Chapters of the Bhagavad Gita",
    totalVersesLabel: "Total 700 Verses",

    dailyBadge: "Daily Gita Amrit",
    dailyTitle: "Daily Wisdom for Contemplation",
    dailySubtitle: "One authentic verse from the Bhagavad Gita every single day, paired with practical, contemporary application.",
    todayContemplationBadge: "Daily Gita Contemplation",
    whyItMatters: "Why This Matters Today",
    todayFocus: "Today's Practical Focus",
    recentWisdomTitle: "Recent Daily Contemplations",

    chatTitle: "AI Krishna Spiritual Guidance",
    chatSubtitle: "Context Bridge Engine Active",
    newChatBtn: "New Spiritual Dialogue",
    chatPlaceholder: "Share what is troubling your mind...",
    sendBtn: "Ask Krishna",
    welcomeTitle: "Namaste & Welcome",
    suggestedQuestionsTitle: "Guiding Prompts",
    suggestedQuestions: [
      "I am working very hard, but my colleagues are getting promotions while I am not. I feel disappointed.",
      "I am confused about my career.",
      "I am afraid of failure in my new venture.",
      "I cannot stop overthinking about the future.",
      "I am facing relationship problems and heartbreak.",
      "I feel lost in life and lack purpose.",
      "How can I control my anger when insulted?"
    ],
    partUnderstanding: "1. Understanding Your Situation",
    partWisdom: "2. Krishna's Wisdom",
    partVerse: "3. Relevant Bhagavad Gita Verse",
    partApplies: "4. How This Applies to Your Life",
    partSteps: "5. Practical Steps You Can Take",
    partThought: "6. A Thought to Remember",

    savedBadge: "Personal Treasury",
    savedTitle: "Saved Verses & Insights",
    savedSubtitle: "Your bookmarked verses, practical reflections, and spiritual dialogues.",
    noSavedFound: "No saved verses yet.",
    sanctuaryTitle: "Your Personal Spiritual Sanctuary",
    sanctuaryDesc: "Please sign in to save your favorite Bhagavad Gita verses, personalized Krishna dialogues, and daily reflections.",
    signInOrRegister: "Sign In or Register",
    savedItems: "Saved Items",
    loadingSaved: "Loading your saved wisdom...",
    collectWisdomHint: "As you chat with AI Krishna or explore the Gita, click the bookmark icon to collect wisdom here.",

    chapterWord: "Chapter",
    versesWord: "Verses",
    readChapterVerses: "Read Chapter Verses",
    translationWord: "Translation",
    philosophicalPurport: "Philosophical Purport & Spiritual Essence",
    coreConcepts: "Core Concepts",
    relevantSituations: "Relevant Life Situations",
    eternalMeaning: "Eternal Meaning",
    chatHelperText: "Press Enter to send • Context Bridge Engine synthesizes in 6 structured parts",
    confidentialDialogue: "Confidential dialogue",
    krishnaCounselTitle: "Sri Krishna's Counsel",
    gitaWisdomBadge: "Gita Wisdom",
    directMatch: "Direct Bhagavad Gita Scripture Match",
    philosophicalConnection: "Philosophical Gita Connection",
    verseMeaningLabel: "Meaning:",
    copyVerseBtn: "Copy Sanskrit Verse & Translation",
    bookmarkVerseBtn: "Bookmark this verse",
    noDialogues: "No previous dialogues found.",
    askToBegin: "Ask Krishna any dilemma to begin.",
    confidentialSpace: "Confidential & Private Spiritual Space",
    loadingDaily: "Loading daily wisdom...",
    focusLabel: "Focus:",
    situationsMap: {
      "career": "Career & Workplace",
      "overthinking": "Overthinking & Anxiety",
      "fear of failure": "Fear of Failure",
      "fear": "Fear of Failure",
      "anger control": "Anger & Hurt Ego",
      "anger": "Anger & Hurt Ego",
      "relationships": "Relationships & Detachment",
      "purpose": "Purpose & Direction",
      "grief": "Grief, Loss & Mortality",
      "focus": "Discipline & Meditation"
    },

    authLoginTitle: "Welcome Back to AI Krishna",
    authRegisterTitle: "Begin Your Spiritual Journey",
    authLoginSubtitle: "Sign in to access your saved conversations, favorite verses, and reflections",
    authRegisterSubtitle: "Create an account for personalized life guidance and history tracking",
    authFullName: "Full Name",
    authEmail: "Email Address",
    authPassword: "Password",
    authPrefLang: "Preferred Language",
    quickTestAccounts: "Quick Test Accounts:"
  },

  hi: {
    appName: "एआई कृष्ण",
    tagline: "आपके जीवन का आध्यात्मिक साथी",

    homeNav: "होम",
    chatNav: "एआई कृष्ण",
    explorerNav: "गीता अन्वेषण",
    interactiveNav: "दिव्य अनुभव",
    dailyNav: "दैनिक अमृतवाणी",
    savedNav: "सहेजे गए विचार",
    adminNav: "व्यवस्थापक",
    login: "प्रवेश करें",
    register: "खाता बनाएं",
    logout: "लॉग आउट",

    heroBadge: "भगवद्गीता आध्यात्मिक प्रज्ञा",
    heroHeadline: "एआई कृष्ण",
    heroSubheadline: "भगवद्गीता के दिव्य उपदेशों के माध्यम से अपने करियर, रिश्तों, मानसिक तनाव और जीवन के निर्णयों में व्यक्तिगत मार्गदर्शन प्राप्त करें।",
    heroQuote: "जब जीवन में असमंजस हो, तब शाश्वत ज्ञान से पाएँ स्पष्टता।",
    startChat: "संवाद आरंभ करें",
    exploreGita: "भगवद्गीता अन्वेषण",
    trustChapters: "सभी 18 अध्याय",
    trustVerses: "700 श्लोक सुव्यवस्थित",
    trustLanguages: "English • हिन्दी • తెలుగు",
    heroCardTitle: "श्रीकृष्ण का शाश्वत मार्गदर्शन",
    heroCardSub: "महाभारत • कुरुक्षेत्र",
    heroCardMeaning: "सुख-दुःख में समान रहना ही योग कहलाता है।",

    howItWorksBadge: "आधुनिक नवाचार",
    howItWorksTitle: "9-चरणीय कॉन्टेक्स्ट ब्रिज इंजन",
    howItWorksDesc: "हम कभी भी यादृच्छिक उद्धरण नहीं देते। हमारा इंजन आपकी वास्तविक समस्या का विश्लेषण कर प्राचीन दर्शन और आधुनिक जीवन के बीच एक ठोस सेतु बनाता है।",
    engineSteps: [
      { num: "01", title: "समस्या का विश्लेषण", desc: "आपकी वास्तविक दुविधा और अनकही भावनाओं को ध्यानपूर्वक सुनता है।" },
      { num: "02", title: "भावनात्मक पहचान", desc: "निराशा, तुलना, भय, शोक या मानसिक तनाव की पहचान करता है।" },
      { num: "03", title: "गूढ़ प्रश्न की खोज", desc: "आपके शब्दों के पीछे छिपे मनोवैज्ञानिक एवं आत्मिक प्रश्न को समझता है।" },
      { num: "04", title: "गीता ज्ञान खोज", desc: "18 अध्यायों के 700 श्लोकों में से सबसे प्रासंगिक श्लोक खोजता है।" },
      { num: "05", title: "सटीक श्लोक चयन", desc: "अध्याय एवं श्लोक (जैसे कर्तव्य हेतु 2.47, आत्म-उत्थान हेतु 6.5) को चुनता है।" },
      { num: "06", title: "मूल संदर्भ की समझ", desc: "कुरुक्षेत्र के युद्धक्षेत्र में कृष्ण और अर्जुन के मूल संवाद को समझता है।" },
      { num: "07", title: "आधुनिक जीवन सेतु", desc: "प्राचीन युद्ध के रूपक को आपके वर्तमान जीवन से सीधे जोड़ता है।" },
      { num: "08", title: "व्यक्तिगत समाधान", desc: "6-चरणीय आत्मीय समाधान हिंदी, अंग्रेजी या तेलुगु में प्रस्तुत करता है।" },
      { num: "09", title: "व्यावहारिक मार्गदर्शन", desc: "तत्काल करने योग्य कदम और एक प्रेरक स्वर्णिम विचार प्रदान करता है।" }
    ],

    everydayBadge: "सार्वभौमिक प्रासंगिकता",
    everydayTitle: "दैनिक जीवन के संघर्षों हेतु शाश्वत ज्ञान",
    everydayDesc: "अर्जुन के साथ श्रीकृष्ण का संवाद किसी काल्पनिक दर्शन पर नहीं, बल्कि एक भारी मानसिक और भावनात्मक संकट के बीच हुआ था।",
    seekGuidance: "मार्गदर्शन पाएँ",
    situations: [
      { title: "करियर एवं पदोन्नति की दुविधा", desc: "कड़ी मेहनत के बाद भी सहकर्मियों को प्रमोशन मिल रहा है? आत्मसम्मान और निष्काम कर्म को जानें।" },
      { title: "अति-विचार एवं भविष्य की चिंता", desc: "मन में विचारों का भंवर? अभ्यास और वैराग्य से मन को शांत करना सीखें।" },
      { title: "क्रोध एवं आहत अहंकार पर नियंत्रण", desc: "किसी ने अपमान किया? क्रोध की आत्मघाती श्रृंखला को समय रहते रोकना सीखें।" },
      { title: "रिश्ते एवं अलगाव की पीड़ा", desc: "अत्यधिक आसक्ति से व्यथित हैं? अपनी आंतरिक शांति खोए बिना निःस्वार्थ प्रेम करें।" },
      { title: "असफलता एवं नुकसान का भय", desc: "स्टार्टअप, परीक्षा या निर्णय के भय से ग्रस्त? जय-पराजय में 'समत्व' भाव विकसित करें।" },
      { title: "जीवन का उद्देश्य एवं दिशाहीनता", desc: "खालीपन या संशय महसूस हो रहा है? अपने स्वाभाविक 'स्वधर्म' को पहचानकर आगे बढ़ें।" }
    ],

    corpusBadge: "प्रामाणिक शास्त्र",
    corpusTitle: "सम्पूर्ण ज्ञान कोष: 18 अध्याय एवं 700 श्लोक",
    corpusDesc: "संस्कृत देवनागरी, रोमन लिप्यंतरण और गहन आध्यात्मिक भावार्थ के साथ सम्पूर्ण भगवद्गीता का अन्वेषण करें।",
    browseAllBtn: "सभी 18 अध्याय एवं श्लोक देखें →",
    statChapters: "अध्याय सुव्यवस्थित",
    statVerses: "शाश्वत श्लोक",
    statLanguages: "उपलब्ध भाषाएँ",
    statIntegrity: "शास्त्रीय प्रामाणिकता",

    multiBadge: "बहुभाषी स्वरूप",
    multiTitle: "आपकी अपनी मातृभाषा में मार्गदर्शन",
    multiDesc: "हिंदी, तेलुगु और अंग्रेजी में स्वाभाविक, आत्मीय और सांस्कृतिक रूप से समृद्ध मार्गदर्शन का अनुभव करें।",
    sampleGreetingLabel: "श्रीकृष्ण का स्नेहिल अभिवादन:",
    welcomeMessage: "नमस्ते! मैं आपकी बात सुनने के लिए यहाँ हूँ। जो कुछ भी आपके मन को व्यथित कर रहा है, बेझिझक मुझसे साझा करें। हम मिलकर भगवद्गीता के ज्ञान से समाधान खोजेंगे।",

    faqBadge: "सामान्य जिज्ञासाएँ",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqs: [
      { q: "क्या एआई कृष्ण साक्षात भगवान श्रीकृष्ण होने का दावा करता है?", a: "नहीं। एआई कृष्ण भगवद्गीता की शिक्षाओं से प्रेरित एक आध्यात्मिक एआई साथी है। यह स्पष्ट रूप से एक कृत्रिम मेधा है और कभी दिव्यता का दावा नहीं करता।" },
      { q: "कॉन्टेक्स्ट ब्रिज इंजन कैसे काम करता है?", a: "यह कोई साधारण बॉट नहीं है जो बिना समझे श्लोक दे दे। यह 9 चरणों में आपकी भावना को समझकर, सही गीता श्लोक खोजकर 6 भागों में व्यावहारिक हल देता है।" },
      { q: "क्या संस्कृत श्लोक और अनुवाद प्रामाणिक हैं?", a: "हाँ, सम्पूर्ण 18 अध्यायों के श्लोक मूल संस्कृत देवनागरी, सटीक लिप्यंतरण और प्रामाणिक अनुवाद सहित संकलित हैं।" },
      { q: "क्या मैं हिंदी और तेलुगु में बात कर सकता हूँ?", a: "हाँ! एआई कृष्ण स्वाभाविक हिंदी, तेलुगु और अंग्रेजी में पूरी तरह संवादात्मक है।" },
      { q: "क्या यह चिकित्सा या विधिक परामर्श का विकल्प है?", a: "नहीं। यह आध्यात्मिक संबल देता है परन्तु चिकित्सा या मानसिक स्वास्थ्य परामर्श का विकल्प नहीं है। गंभीर संकट में Tele-MANAS (14416) पर संपर्क करें।" }
    ],

    explorerBadge: "भगवद्गीता ज्ञान कोष",
    explorerTitle: "समस्त 18 अध्याय एवं 700 श्लोकों का अन्वेषण",
    explorerSubtitle: "जीवन की परिस्थितियों, कीवर्ड या अध्याय अनुसार प्रामाणिक गीता श्लोक खोजें।",
    searchPlaceholder: "कीवर्ड, विषय या श्लोक खोजें (जैसे 'कर्म', 'चिंता', '2.47')...",
    filterPlaceholder: "जीवन की परिस्थिति चुनें",
    searchBtn: "खोजें",
    clearBtn: "हटाएं",
    popularTagsLabel: "प्रमुख विषय:",
    backToChapters: "वापस सभी 18 अध्यायों पर",
    versesInChapter: "इस अध्याय के श्लोक",
    searchResultsTitle: "खोज परिणाम",
    noVersesFound: "इस खोज हेतु कोई प्रत्यक्ष श्लोक नहीं मिला।",
    readPurportBtn: "विस्तृत भावार्थ एवं व्यावहारिक प्रयोग",
    allChaptersTitle: "भगवद्गीता के सभी 18 अध्याय",
    totalVersesLabel: "कुल 700 श्लोक",

    dailyBadge: "दैनिक गीता अमृत",
    dailyTitle: "दैनिक मनन हेतु गीता अमृत",
    dailySubtitle: "प्रतिदिन भगवद्गीता का एक पावन श्लोक, उसके व्यावहारिक दैनिक उपयोग के साथ।",
    todayContemplationBadge: "दैनिक गीता मनन",
    whyItMatters: "आज यह क्यों आवश्यक है",
    todayFocus: "आज का व्यावहारिक लक्ष्य",
    recentWisdomTitle: "हाल के दिनों का मनन",

    chatTitle: "एआई कृष्ण आध्यात्मिक संवाद",
    chatSubtitle: "कॉन्टेक्स्ट ब्रिज इंजन सक्रिय",
    newChatBtn: "नया आध्यात्मिक संवाद",
    chatPlaceholder: "अपने मन की दुविधा या विचार साझा करें...",
    sendBtn: "पूछें",
    welcomeTitle: "नमस्ते एवं स्वागत",
    suggestedQuestionsTitle: "सुझाए गए प्रश्न",
    suggestedQuestions: [
      "मैं बहुत मेहनत कर रहा हूँ, फिर भी सहकर्मियों को प्रमोशन मिल रहा है और मुझे नहीं। मुझे घोर निराशा हो रही है।",
      "मैं अपने करियर को लेकर भ्रमित और असमंजस में हूँ।",
      "मुझे असफलता और नुकसान से बहुत डर लग रहा है।",
      "मैं भविष्य को लेकर लगातार ओवरथिंकिंग नहीं रोक पा रहा हूँ।",
      "मैं रिश्तों में कड़वाहट और अलगाव का सामना कर रहा हूँ।",
      "मुझे अपने जीवन का उद्देश्य समझ नहीं आ रहा, मैं दिशाहीन महसूस कर रहा हूँ।",
      "अपमान होने पर मैं अपने क्रोध और आक्रोश को कैसे नियंत्रित करूँ?"
    ],
    partUnderstanding: "1. आपकी स्थिति की समझ",
    partWisdom: "2. श्रीकृष्ण का शाश्वत ज्ञान",
    partVerse: "3. प्रासंगिक भगवद्गीता श्लोक",
    partApplies: "4. यह आपके जीवन में कैसे लागू होता है",
    partSteps: "5. व्यावहारिक कदम जो आप उठा सकते हैं",
    partThought: "6. याद रखने योग्य स्वर्णिम विचार",

    savedBadge: "व्यक्तिगत संग्रह",
    savedTitle: "सहेजे गए श्लोक एवं विचार",
    savedSubtitle: "आपके पसंदीदा श्लोक, दैनिक चिंतन एवं संवाद यहाँ सुरक्षित हैं।",
    noSavedFound: "अभी तक कोई श्लोक सहेजा नहीं गया है।",
    sanctuaryTitle: "आपका व्यक्तिगत आध्यात्मिक संचय",
    sanctuaryDesc: "अपने पसंदीदा भगवद्गीता श्लोकों, व्यक्तिगत संवादों और दैनिक विचारों को सहेजने के लिए कृपया प्रवेश करें।",
    signInOrRegister: "प्रवेश करें या खाता बनाएं",
    savedItems: "सहेजी गई सामग्री",
    loadingSaved: "सहेजा गया ज्ञान लोड हो रहा है...",
    collectWisdomHint: "एआई कृष्ण से संवाद करते समय या गीता अन्वेषण के दौरान, ज्ञान सहेजने के लिए बुकमार्क आइकन दबाएं।",

    chapterWord: "अध्याय",
    versesWord: "श्लोक",
    readChapterVerses: "अध्याय के श्लोक पढ़ें",
    translationWord: "अनुवाद",
    philosophicalPurport: "दार्शनिक भावार्थ एवं आध्यात्मिक सार",
    coreConcepts: "मूल अवधारणाएं",
    relevantSituations: "प्रासंगिक जीवन परिस्थितियां",
    eternalMeaning: "शाश्वत भावार्थ",
    chatHelperText: "भेजने के लिए Enter दबाएं • कॉन्टेक्स्ट ब्रिज इंजन 6 भागों में समाधान देता है",
    confidentialDialogue: "गोपनीय संवाद",
    krishnaCounselTitle: "श्रीकृष्ण का मार्गदर्शन",
    gitaWisdomBadge: "गीता ज्ञान",
    directMatch: "प्रत्यक्ष भगवद्गीता श्लोक मिलान",
    philosophicalConnection: "दार्शनिक गीता संबंध",
    verseMeaningLabel: "अर्थ:",
    copyVerseBtn: "श्लोक एवं अनुवाद कॉपी करें",
    bookmarkVerseBtn: "इस श्लोक को सहेजें",
    noDialogues: "कोई पूर्व संवाद नहीं मिला।",
    askToBegin: "प्रारंभ करने के लिए कृष्ण से कोई भी प्रश्न पूछें।",
    confidentialSpace: "गोपनीय एवं निजी आध्यात्मिक स्थान",
    loadingDaily: "दैनिक ज्ञान लोड हो रहा है...",
    focusLabel: "लक्ष्य:",
    situationsMap: {
      "career": "करियर एवं कार्यक्षेत्र",
      "overthinking": "अति-विचार एवं चिंता",
      "fear of failure": "असफलता का भय",
      "fear": "असफलता का भय",
      "anger control": "क्रोध एवं आहत अहंकार",
      "anger": "क्रोध एवं आहत अहंकार",
      "relationships": "रिश्ते एवं वैराग्य",
      "purpose": "जीवन उद्देश्य एवं दिशा",
      "grief": "शोक एवं क्षति",
      "focus": "अनुशासन एवं ध्यान"
    },

    authLoginTitle: "एआई कृष्ण में पुनः स्वागत",
    authRegisterTitle: "अपनी आध्यात्मिक यात्रा आरंभ करें",
    authLoginSubtitle: "अपने सहेजे गए संवादों और श्लोकों तक पहुँचने के लिए प्रवेश करें",
    authRegisterSubtitle: "व्यक्तिगत मार्गदर्शन एवं इतिहास हेतु नया खाता बनाएं",
    authFullName: "पूरा नाम",
    authEmail: "ईमेल पता",
    authPassword: "पासवर्ड",
    authPrefLang: "पसंदीदा भाषा",
    quickTestAccounts: "परीक्षण खाते:"
  },

  te: {
    appName: "AI కృష్ణ",
    tagline: "మీ జీవిత ఆధ్యాత్మిక నేస్తం",

    homeNav: "హోమ్",
    chatNav: "AI కృష్ణ",
    explorerNav: "గీతా ఎక్స్‌ప్లోరర్",
    interactiveNav: "దివ్య అనుభవాలు",
    dailyNav: "నేటి గీతామృతం",
    savedNav: "భద్రపరిచినవి",
    adminNav: "అడ్మిన్",
    login: "లాగిన్",
    register: "ఖాతా తెరవండి",
    logout: "లాగౌట్",

    heroBadge: "భగవద్గీత ఆధ్యాత్మిక విజ్ఞానం",
    heroHeadline: "AI కృష్ణ",
    heroSubheadline: "భగవద్గీతలో శ్రీకృష్ణుడు ఉపదేశించిన సార్వకాలిక సత్యాల ద్వారా కెరీర్, మానసిక ఒత్తిడి, సంబంధాలు మరియు కీలక నిర్ణయాలలో అమూల్యమైన మార్గదర్శకత్వాన్ని పొందండి.",
    heroQuote: "జీవితం గందరగోళంగా ఉన్నప్పుడు, శాశ్వతమైన జ్ఞానంతో స్పష్టతను పొందండి.",
    startChat: "సంభాషణను ప్రారంభించండి",
    exploreGita: "భగవద్గీతను అన్వేషించండి",
    trustChapters: "అన్ని 18 అధ్యాయాలు",
    trustVerses: "700 శ్లోకాలు భద్రపరచబడ్డాయి",
    trustLanguages: "English • हिन्दी • తెలుగు",
    heroCardTitle: "శ్రీకృష్ణుని సార్వకాలిక మార్గదర్శకత్వం",
    heroCardSub: "మహాభారతం • కురుక్షేత్రం",
    heroCardMeaning: "సుఖదుఃఖాలందు సమచిత్తమే యోగం అని పిలువబడుతుంది.",

    howItWorksBadge: "సాంకేతిక ఆవిష్కరణ",
    howItWorksTitle: "9-దశల కాంటెక్స్ట్ బ్రిడ్జ్ ఇంజిన్",
    howItWorksDesc: "మేము ఎన్నడూ సంబంధం లేని సాధారణ శ్లోకాలను ఇవ్వము. మా ఆధునిక మేధో వ్యవస్థ మీ వాస్తవ సమస్యను విశ్లేషించి ప్రాచీన తత్వానికి, నిత్య జీవితానికి మధ్య ఒక బలమైన వారధిని నిర్మిస్తుంది.",
    engineSteps: [
      { num: "01", title: "సమస్యను గ్రహించడం", desc: "మీ వాస్తవ జీవిత సమస్యను, మానసిక వేదనను లోతుగా వింటుంది." },
      { num: "02", title: "భావోద్వేగాల గుర్తింపు", desc: "నిరాశ, అసూయ, పోలిక, భయం, శోకం లేదా మానసిక అలసటను గుర్తిస్తుంది." },
      { num: "03", title: "అంతర్గత ప్రశ్నను కనుగొనడం", desc: "మీ మాటల వెనుక ఉన్న నిజమైన మానసిక సందేహాన్ని ఛేదిస్తుంది." },
      { num: "04", title: "గీతా విజ్ఞాన శోధన", desc: "18 అధ్యాయాలలోని 700 శ్లోకాల నుండి అత్యంత సరైన శ్లోకాన్ని వెతుకుతుంది." },
      { num: "05", title: "ఖచ్చితమైన శ్లోక ఎంపిక", desc: "అధ్యాయం మరియు శ్లోకం (ఉదా: కర్తవ్యం కోసం 2.47, ఆత్మ వికాసానికి 6.5) ఎంపిక చేస్తుంది." },
      { num: "06", title: "మూల సందర్భం", desc: "కురుక్షేత్ర రణరంగంలో శ్రీకృష్ణార్జునుల మూల సంభాషణ సందర్భాన్ని అర్థం చేసుకుంటుంది." },
      { num: "07", title: "నిత్య జీవిత వారధి", desc: "ప్రాచీన యుద్ద రూపకాన్ని మీ 21వ శతాబ్దపు వాస్తవ జీవితానికి అన్వయిస్తుంది." },
      { num: "08", title: "వ్యక్తిగత పరిష్కారం", desc: "6-అంచెల పరిష్కారాన్ని తెలుగు, ఇంగ్లీష్ లేదా హిందీలో రచిస్తుంది." },
      { num: "09", title: "ఆచరణాత్మక కార్యాచరణ", desc: "వెంటనే ఆచరించదగిన నిర్దిష్ట పనులు మరియు గుర్తుంచుకోవలసిన అమృత వాక్యం అందిస్తుంది." }
    ],

    everydayBadge: "సార్వజనీన ప్రాముఖ్యత",
    everydayTitle: "నిత్య జీవిత పోరాటాలకు గీతా విజ్ఞానం",
    everydayDesc: "అర్జునునితో శ్రీకృష్ణుని సంభాషణ కేవలం పూజా విధానం కాదు—అది తీవ్రమైన మానసిక సంక్షోభం మధ్యలో జరిగిన జీవన మార్గదర్శనం.",
    seekGuidance: "మార్గదర్శకత్వం పొందండి",
    situations: [
      { title: "కెరీర్ & ప్రమోషన్ల సమస్యలు", desc: "ఎంతో కష్టపడినా ఇతరులకే ప్రమోషన్లు వస్తున్నాయా? ఆత్మవిశ్వాసాన్ని పునరుద్ధరించి నిష్కామ కర్మను తెలుసుకోండి." },
      { title: "అతిగా ఆలోచించడం & భవిష్యత్ భయం", desc: "ఆగని ఆలోచనల తుఫానా? అభ్యాసం మరియు వైరాగ్యం ద్వారా మనస్సును నియంత్రించండి." },
      { title: "కోపం & ఆవేశంపై నియంత్రణ", desc: "ఎవరైనా అవమానించారా? కోపం వల్ల జరిగే వినాశకర నష్టాన్ని సమయానికి ఆపడం నేర్చుకోండి." },
      { title: "సంబంధాలు & విడిపోవడం వల్ల బాధ", desc: "వ్యామోహం వల్ల వేదన చెందుతున్నారా? మనశ్శాంతిని కోల్పోకుండా నిస్వార్థంగా ప్రేమించండి." },
      { title: "స్టార్టప్ లేదా పరీక్షలలో ఓటమి భయం", desc: "రిస్క్ తీసుకోవడానికి భయపడుతున్నారా? గెలుపోటములలో 'సమత్వ' భావాన్ని సాధించండి." },
      { title: "జీవిత గమ్యం & దిక్కుతోచని స్థితి", desc: "శూన్యత, దిక్కుతోచని తనం ఉందా? మీ ప్రాకృతిక 'స్వధర్మాన్ని' గుర్తించి ముందడుగు వేయండి." }
    ],

    corpusBadge: "ప్రామాణిక గ్రంథం",
    corpusTitle: "సంపూర్ణ విజ్ఞాన భాండాగారం: 18 అధ్యాయాలు & 700 శ్లోకాలు",
    corpusDesc: "సంస్కృత దేవనాగరి, రోమన్ లిప్యంతరీకరణ మరియు లోతైన తాత్పర్యంతో భగవద్గీతను సమగ్రంగా అన్వేషించండి.",
    browseAllBtn: "అన్ని 18 అధ్యాయాలు & శ్లోకాలను చూడండి →",
    statChapters: "అధ్యాయాలు సిద్ధం",
    statVerses: "సార్వకాలిక శ్లోకాలు",
    statLanguages: "అందుబాటులో ఉన్న భాషలు",
    statIntegrity: "శాస్త్రీయ ప్రామాణికత",

    multiBadge: "బహుభాషా సౌలభ్యం",
    multiTitle: "మీ మాతృభాషలోనే దివ్య మార్గదర్శకత్వం",
    multiDesc: "తెలుగు, హిందీ మరియు ఇంగ్లీష్ భాషలలో సహజమైన, గౌరవప్రదమైన ఆధ్యాత్మిక మార్గదర్శకత్వాన్ని పొందండి.",
    sampleGreetingLabel: "శ్రీకృష్ణుని మధుర స్వాగతం:",
    welcomeMessage: "నమస్తే! మీ అంతరంగాన్ని వినడానికి నేను ఇక్కడ ఉన్నాను. మీ మనస్సును బాధపెడుతున్నదేదైనా నాతో పంచుకోండి. భగవద్గీత యొక్క దివ్య జ్ఞానంతో కలిసి స్పష్టతను కనుగొందాం.",

    faqBadge: "సాధారణ ప్రశ్నలు",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు",
    faqs: [
      { q: "AI కృష్ణ నిజమైన శ్రీకృష్ణుడిగా చెప్పుకుంటుందా?", a: "కాదు. AI కృష్ణ అనేది భగవద్గీత బోధనలతో రూపొందించబడిన ఆధ్యాత్మిక కృత్రిమ మేధ మార్గదర్శి మాత్రమే. ఇది సాంకేతిక వ్యవస్థ అని స్పష్టంగా చెబుతుంది." },
      { q: "కాంటెక్స్ట్ బ్రిడ్జ్ ఇంజిన్ ఎలా పనిచేస్తుంది?", a: "సాధారణ బాట్‌లలా కాకుండా, ఇది 9 దశల్లో మీ సమస్యను, భావోద్వేగాన్ని విశ్లేషించి, సరైన గీతా శ్లోకాన్ని ఎన్నుకొని 6 విభాగాలలో నిత్య జీవిత పరిష్కారాన్ని అందిస్తుంది." },
      { q: "శ్లోకాలు మరియు అనువాదాలు ప్రామాణికమైనవేనా?", a: "అవును. 18 అధ్యాయాలలోని సమస్త శ్లోకాలు దేవనాగరి సంస్కృతం, ఖచ్చితమైన తెలుగు అనువాదంతో ప్రామాణికంగా భద్రపరచబడ్డాయి." },
      { q: "నేను పూర్తిగా తెలుగులో మాట్లాడవచ్చా?", a: "తప్పకుండా! AI కృష్ణ అత్యంత సహజమైన, సరళమైన తెలుగులో సంభాషించడానికి సంపూర్ణంగా అనుకూలించబడింది." },
      { q: "ఇది వైద్య లేదా మానసిక నిపుణుల చికిత్సకు ప్రత్యామ్నాయమా?", a: "కాదు. ఇది ఆధ్యాత్మిక ధైర్యాన్ని ఇస్తుంది కానీ వైద్య, మానసిక లేదా న్యాయ సలహాలకు ప్రత్యామ్నాయం కాదు. అత్యవసర మానసిక వేదనలో Tele-MANAS (14416) సహాయం తీసుకోండి." }
    ],

    explorerBadge: "భగవద్గీత జ్ఞాన భాండాగారం",
    explorerTitle: "18 అధ్యాయాలు & 700 శ్లోకాలను అన్వేషించండి",
    explorerSubtitle: "జీవిత పరిస్థితుల ఆధారంగా, కీవర్డ్ ద్వారా లేదా అధ్యాయాల వారీగా భగవద్గీతను అన్వేషించండి.",
    searchPlaceholder: "కీవర్డ్, భావన లేదా శ్లోకం కోసం శోధించండి (ఉదా: 'కర్మ', 'కోపం', '2.47')...",
    filterPlaceholder: "జీవిత పరిస్థితిని ఎంచుకోండి",
    searchBtn: "శోధించండి",
    clearBtn: "రద్దు చేయండి",
    popularTagsLabel: "ముఖ్యమైన వర్గాలు:",
    backToChapters: "తిరిగి అన్ని 18 అధ్యాయాలకు",
    versesInChapter: "ఈ అధ్యాయంలోని శ్లోకాలు",
    searchResultsTitle: "శోధన ఫలితాలు",
    noVersesFound: "ఈ శోధనకు సంబంధిత శ్లోకాలు కనుగొనబడలేదు.",
    readPurportBtn: "వివరణాత్మక తాత్పర్యం & ఆచరణ",
    allChaptersTitle: "భగవద్గీతలోని మొత్తం 18 అధ్యాయాలు",
    totalVersesLabel: "మొత్తం 700 శ్లోకాలు",

    dailyBadge: "నేటి గీతామృతం",
    dailyTitle: "నిత్య ధ్యానానికి గీతామృతం",
    dailySubtitle: "ప్రతిరోజూ భగవద్గీత నుండి ఒక దివ్య శ్లోకం, మీ ఆధునిక జీవితానికి తగిన ఆచరణాత్మక ఆలోచనతో.",
    todayContemplationBadge: "నేటి గీతా ధ్యానం",
    whyItMatters: "ఈరోజు ఇది ఎందుకు ముఖ్యం",
    todayFocus: "నేటి ఆచరణాత్మక లక్ష్యం",
    recentWisdomTitle: "గత రోజుల ధ్యాన శ్లోకాలు",

    chatTitle: "AI కృష్ణ ఆధ్యాత్మిక సంభాషణ",
    chatSubtitle: "కాంటెక్స్ట్ బ్రిడ్జ్ ఇంజిన్ పనిచేస్తోంది",
    newChatBtn: "నూతన ఆధ్యాత్మిక సంభాషణ",
    chatPlaceholder: "మీ మనస్సును కలవరపెడుతున్న విషయాన్ని పంచుకోండి...",
    sendBtn: "కృష్ణుడిని అడగండి",
    welcomeTitle: "నమస్తే! స్వాగతం",
    suggestedQuestionsTitle: "ప్రధాన ప్రశ్నలు",
    suggestedQuestions: [
      "నేను ఎంతో కష్టపడుతున్నాను, కానీ నా సహోద్యోగులకు ప్రమోషన్లు వస్తున్నాయి, నాకు రావడం లేదు. నేను చాలా నిరాశకు గురవుతున్నాను.",
      "నేను నా కెరీర్ గురించి చాలా గందరగోళంలో ఉన్నాను.",
      "నాకు అపజయం మరియు ఓటమి అంటే తీవ్రమైన భయం వేస్తోంది.",
      "నేను భవిష్యత్తు గురించి అతిగా ఆలోచించడాన్ని ఆపలేకపోతున్నాను.",
      "నేను సంబంధాలలో విభేదాలు, ఒంటరితనాన్ని ఎదుర్కొంటున్నాను.",
      "జీవితంలో నా గమ్యం ఏమిటో తెలియక దిక్కుతోచని స్థితిలో ఉన్నాను.",
      "ఎవరైనా అవమానించినప్పుడు నా కోపాన్ని ఎలా నియంత్రించుకోవాలి?"
    ],
    partUnderstanding: "1. మీ పరిస్థితిని అర్థం చేసుకోవడం",
    partWisdom: "2. శ్రీకృష్ణుని దివ్య వివేకం",
    partVerse: "3. సంబంధిత భగవద్గీత శ్లోకం",
    partApplies: "4. ఇది మీ జీవితానికి ఎలా వర్తిస్తుంది",
    partSteps: "5. మీరు చేయవలసిన ఆచరణాత్మక చర్యలు",
    partThought: "6. గుర్తుంచుకోవలసిన అమృత వాక్యం",

    savedBadge: "మీ ఆధ్యాత్మిక భాండాగారం",
    savedTitle: "భద్రపరచిన శ్లోకాలు & సలహాలు",
    savedSubtitle: "మీరు సేవ్ చేసుకున్న శ్లోకాలు, సూచనలు మరియు సంభాషణలు ఇక్కడ ఉంటాయి.",
    noSavedFound: "ఇంకా ఏ శ్లోకాలు భద్రపరచబడలేదు.",
    sanctuaryTitle: "మీ వ్యక్తిగత ఆధ్యాత్మిక మందిరం",
    sanctuaryDesc: "మీ అభిమాన భగవద్గీత శ్లోకాలు, వ్యక్తిగత సంభాషణలు మరియు రోజువారీ ధ్యానాలను భద్రపరచుకోవడానికి దయచేసి లాగిన్ అవ్వండి.",
    signInOrRegister: "లాగిన్ లేదా ఖాతా తెరవండి",
    savedItems: "భద్రపరిచిన అంశాలు",
    loadingSaved: "భద్రపరిచిన జ్ఞానం లోడ్ అవుతోంది...",
    collectWisdomHint: "AI కృష్ణుడితో సంభాషిస్తున్నప్పుడు లేదా గీతను చదువుతున్నప్పుడు, ఇక్కడ దాచుకోవడానికి బుక్‌మార్క్ చిహ్నాన్ని నొక్కండి.",

    chapterWord: "అధ్యాయం",
    versesWord: "శ్లోకాలు",
    readChapterVerses: "అధ్యాయ శ్లోకాలు చదవండి",
    translationWord: "అనువాదం",
    philosophicalPurport: "తాత్విక భావార్థం & ఆధ్యాత్మిక సారాంశం",
    coreConcepts: "ప్రధాన భావనలు",
    relevantSituations: "సంబంధిత జీవన పరిస్థితులు",
    eternalMeaning: "శాశ్వత దివ్యార్థం",
    chatHelperText: "పంపడానికి Enter నొక్కండి • కాంటెక్స్ట్ బ్రిడ్జ్ ఇంజిన్ 6 విభాగాలలో విశ్లేషిస్తుంది",
    confidentialDialogue: "గోప్యమైన సంభాషణ",
    krishnaCounselTitle: "శ్రీకృష్ణుని దివ్య మార్గదర్శకత్వం",
    gitaWisdomBadge: "గీతా విజ్ఞానం",
    directMatch: "ప్రత్యక్ష భగవద్గీత శ్లోక అనుసంధానం",
    philosophicalConnection: "తాత్విక గీతా అనుబంధం",
    verseMeaningLabel: "తాత్పర్యం:",
    copyVerseBtn: "శ్లోకం మరియు అనువాదాన్ని కాపీ చేయండి",
    bookmarkVerseBtn: "ఈ శ్లోకాన్ని భద్రపరచండి",
    noDialogues: "గత సంభాషణలు ఏవీ లేవు.",
    askToBegin: "ప్రారంభించడానికి కృష్ణుడిని ఏదైనా ప్రశ్న అడగండి.",
    confidentialSpace: "గోప్యమైన వ్యక్తిగత ఆధ్యాత్మిక వేదిక",
    loadingDaily: "నేటి అమృతం లోడ్ అవుతోంది...",
    focusLabel: "లక్ష్యం:",
    situationsMap: {
      "career": "కెరీర్ & కార్యాలయం",
      "overthinking": "అతిగా ఆలోచించడం & ఆందోళన",
      "fear of failure": "ఓటమి భయం",
      "fear": "ఓటమి భయం",
      "anger control": "కోపం & ఆవేశం",
      "anger": "కోపం & ఆవేశం",
      "relationships": "సంబంధాలు & వైరాగ్యం",
      "purpose": "జీవిత గమ్యం & దిశ",
      "grief": "దుఃఖం & నష్టం",
      "focus": "క్రమశిక్షణ & ధ్యానం"
    },

    authLoginTitle: "తిరిగి AI కృష్ణకు స్వాగతం",
    authRegisterTitle: "మీ ఆధ్యాత్మిక ప్రయాణాన్ని ప్రారంభించండి",
    authLoginSubtitle: "మీ సంభాషణలు మరియు భద్రపరిచిన శ్లోకాలను చూసేందుకు లాగిన్ అవ్వండి",
    authRegisterSubtitle: "వ్యక్తిగత మార్గదర్శకత్వం కోసం ఖాతా తెరవండి",
    authFullName: "పూర్తి పేరు",
    authEmail: "ఈమెయిల్ చిరునామా",
    authPassword: "పాస్‌వర్డ్",
    authPrefLang: "ప్రాధాన్య భాష",
    quickTestAccounts: "పరీక్ష ఖాతాలు:"
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
