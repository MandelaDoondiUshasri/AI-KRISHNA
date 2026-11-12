import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelect }) => {
  const { language, t } = useLanguage();

  const questionsByLang: Record<string, string[]> = {
    en: [
      "I am working very hard, but my colleagues are getting promotions while I am not. I feel disappointed.",
      "I am confused about my career.",
      "I am afraid of failure in my new venture.",
      "I cannot stop overthinking about the future.",
      "I am facing relationship problems and heartbreak.",
      "I feel lost in life and lack purpose.",
      "How can I control my anger when insulted?"
    ],
    hi: [
      "मैं बहुत मेहनत कर रहा हूँ, फिर भी सहकर्मियों को प्रमोशन मिल रहा है और मुझे नहीं। मुझे घोर निराशा हो रही है।",
      "मैं अपने करियर को लेकर भ्रमित और असमंजस में हूँ।",
      "मुझे असफलता और नुकसान से बहुत डर लग रहा है।",
      "मैं भविष्य को लेकर लगातार ओवरथिंकिंग नहीं रोक पा रहा हूँ।",
      "मैं रिश्तों में कड़वाहट और अलगाव का सामना कर रहा हूँ।",
      "मुझे अपने जीवन का उद्देश्य समझ नहीं आ रहा, मैं दिशाहीन महसूस कर रहा हूँ।",
      "अपमान होने पर मैं अपने क्रोध और आक्रोश को कैसे नियंत्रित करूँ?"
    ],
    te: [
      "నేను ఎంతో కష్టపడుతున్నాను, కానీ నా సహోద్యోగులకు ప్రమోషన్లు వస్తున్నాయి, నాకు రావడం లేదు. నేను చాలా నిరాశకు గురవుతున్నాను.",
      "నేను నా కెరీర్ గురించి చాలా గందరగోళంలో ఉన్నాను.",
      "నాకు అపజయం మరియు ఓటమి అంటే తీవ్రమైన భయం వేస్తోంది.",
      "నేను భవిష్యత్తు గురించి అతిగా ఆలోచించడాన్ని ఆపలేకపోతున్నాను.",
      "నేను సంబంధాలలో విభేదాలు, ఒంటరితనాన్ని ఎదుర్కొంటున్నాను.",
      "జీవితంలో నా గమ్యం ఏమిటో తెలియక దిక్కుతోచని స్థితిలో ఉన్నాను.",
      "ఎవరైనా అవమానించినప్పుడు నా కోపాన్ని ఎలా నియంత్రించుకోవాలి?"
    ]
  };

  const currentQuestions = questionsByLang[language] || questionsByLang.en;

  return (
    <div className="py-2">
      <div className="flex items-center space-x-1.5 mb-2 text-xs font-semibold text-[#F1B941]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t.suggestedQuestionsTitle}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {currentQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="text-left text-xs px-3 py-2 rounded-xl bg-[#0B192C]/90 hover:bg-[#1E3E62] border border-[#F1B941]/25 hover:border-[#F1B941]/60 text-slate-200 hover:text-white transition-all shadow-sm hover:shadow-[#F1B941]/10"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

