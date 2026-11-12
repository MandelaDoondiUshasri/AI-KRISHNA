import React, { useState, useRef } from 'react';
import { Download, Share2, Copy, Check, Sparkles, Palette, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const PRESET_CARDS = [
  {
    ref: "BG 2.47",
    ch_num: 2,
    v_num: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
    meaning_en: "You have a right only to work, but never to the fruits of work. Let not the fruits of action be your motive, nor let your attachment be to inaction.",
    meaning_hi: "तुम्हारा कर्म करने में ही अधिकार है, उसके फलों में कभी नहीं। इसलिए कर्म के फल की इच्छा मत करो, और अकर्म में आसक्ति न रखो।",
    meaning_te: "కర్మలను ఆచరించడానికే నీకు అధికారము కలదు గాని, వాటి ఫలితాలపై ఎన్నడూ లేదు. ఫలితాపేక్ష లేకుండా కర్తవ్యాన్ని నిర్వహించు."
  },
  {
    ref: "BG 2.48",
    ch_num: 2,
    v_num: 48,
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्यోః సమో భూత్వా సమత్వం యోగ ఉచ్యతే॥",
    transliteration: "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate",
    meaning_en: "Perform your duties established in Yoga, renouncing attachment. Remain equal in success and defeat; equanimity is called Yoga.",
    meaning_hi: "आसक्ति को त्यागकर सफलता और असफलता में समभाव रखते हुए अपने कर्तव्य का पालन करो। यही समत्व भाव योग कहलाता है।",
    meaning_te: "ఆసక్తిని వీడి, జయాపజయాలందు సమచిత్తుడవై కర్మలను ఆచరించుము. అటువంటి సమత్వ భావమే యోగమని చెప్పబడుతుంది."
  },
  {
    ref: "BG 6.5",
    ch_num: 6,
    v_num: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
    meaning_en: "Elevate yourself through the power of your own mind, and do not degrade yourself. For the mind can be the greatest friend of the self, or its worst enemy.",
    meaning_hi: "अपने द्वारा अपना उद्धार करो, अपना पतन न होने दो। क्योंकि मनुष्य स्वयं ही अपना मित्र है और स्वयं ही अपना शत्रु है।",
    meaning_te: "మీ మనస్సు ద్వారా మీరే ఉద్ధరించుకోవాలి గాని పతనం కాకూడదు. ఎవరికి వారే మిత్రులు, ఎవరికి వారే శత్రువులు."
  },
  {
    ref: "BG 18.78",
    ch_num: 18,
    v_num: 78,
    sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थో ధనుర్ధరః।\nతత్ర శ్రీర్విజయో భూతిర్ధ్రువా నీతిర్మతిర్మమ॥",
    transliteration: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ\ntatra śrīr vijayo bhūtir dhruvā nītir matir mama",
    meaning_en: "Wherever there is Sri Krishna, the Lord of Yoga, and wherever there is Arjuna, the resolute archer, there will certainly be opulence, victory, prosperity, and sound morality.",
    meaning_hi: "जहाँ योगेश्वर श्रीकृष्ण हैं और जहाँ गाण्डीवधारी अर्जुन हैं, वहीं विजय, वैभव, कल्याण और अटल न्याय निश्चित है।",
    meaning_te: "ఎక్కడ యోగేశ్వరుడైన శ్రీకృష్ణుడు, ఎక్కడ ధనుర్ధారియైన అర్జునుడు ఉంటారో అక్కడ ఐశ్వర్యం, విజయం, స్థిరమైన నీతి నిశ్చయముగా ఉంటాయి."
  }
];

const THEMES = [
  { id: 'gold', name: 'Royal Gold', border: 'border-[#F1B941]', bg: 'from-[#1A1305] via-[#0A1A2F] to-[#081225]', accent: '#F1B941' },
  { id: 'midnight', name: 'Midnight Kurukshetra', border: 'border-sky-400/50', bg: 'from-[#0A1F38] via-[#081225] to-[#040810]', accent: '#38BDF8' },
  { id: 'peacock', name: 'Peacock Dawn', border: 'border-teal-400/50', bg: 'from-[#06242B] via-[#091C28] to-[#081225]', accent: '#2DD4BF' },
  { id: 'vrindavan', name: 'Vrindavan Lotus', border: 'border-amber-300/40', bg: 'from-[#1E1B18] via-[#142328] to-[#081225]', accent: '#FBBF24' }
];

export const WisdomCardGenerator: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [themeId, setThemeId] = useState('gold');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const card = PRESET_CARDS[selectedCardIdx];
  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  const getMeaning = () => {
    if (language === 'te') return card.meaning_te;
    if (language === 'hi') return card.meaning_hi;
    return card.meaning_en;
  };

  const handleCopyText = () => {
    const text = `🦚 Bhagavad Gita Wisdom Card\n${card.ref}\n\n${card.sanskrit}\n\n${card.transliteration}\n\nMeaning:\n${getMeaning()}\n\n— AI KRISHNA (Your Life Companion)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    setDownloading(true);
    try {
      // Create offscreen canvas for high-resolution 1200x675 card image
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 750;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 1200, 750);
      if (themeId === 'gold') {
        grad.addColorStop(0, '#1E1402');
        grad.addColorStop(0.5, '#0B192C');
        grad.addColorStop(1, '#081225');
      } else if (themeId === 'midnight') {
        grad.addColorStop(0, '#0A1F38');
        grad.addColorStop(0.5, '#081225');
        grad.addColorStop(1, '#020617');
      } else if (themeId === 'peacock') {
        grad.addColorStop(0, '#062B2F');
        grad.addColorStop(0.5, '#091C28');
        grad.addColorStop(1, '#081225');
      } else {
        grad.addColorStop(0, '#1E1B18');
        grad.addColorStop(0.5, '#142328');
        grad.addColorStop(1, '#081225');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 750);

      // Gold Frame Borders
      ctx.strokeStyle = activeTheme.accent;
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, 1140, 690);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(40, 40, 1120, 670);

      // Header Brand
      ctx.fillStyle = activeTheme.accent;
      ctx.font = 'bold 22px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🦚  AI KRISHNA  •  TIMELESS WISDOM CARD', 600, 95);

      // Verse Citation Badge
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px serif';
      ctx.fillText(card.ref, 600, 150);

      // Sanskrit Sloka
      ctx.fillStyle = '#FDE68A';
      ctx.font = 'bold 28px serif';
      const slokaLines = card.sanskrit.split('\n');
      let startY = 230;
      slokaLines.forEach(line => {
        ctx.fillText(line, 600, startY);
        startY += 45;
      });

      // Transliteration
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'italic 20px serif';
      const transLines = card.transliteration.split('\n');
      transLines.forEach(line => {
        ctx.fillText(line, 600, startY);
        startY += 32;
      });

      startY += 20;
      // Divider
      ctx.strokeStyle = 'rgba(241, 185, 65, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(350, startY);
      ctx.lineTo(850, startY);
      ctx.stroke();

      startY += 50;
      // Meaning (Word Wrapped)
      ctx.fillStyle = '#F1F5F9';
      ctx.font = '24px sans-serif';
      const words = getMeaning().split(' ');
      let currentLine = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 950 && n > 0) {
          ctx.fillText(currentLine, 600, startY);
          currentLine = words[n] + ' ';
          startY += 36;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine, 600, startY);

      // Footer
      ctx.fillStyle = '#64748B';
      ctx.font = '16px sans-serif';
      ctx.fillText('aikrishna.life • When life gets confusing, find clarity through timeless wisdom.', 600, 680);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `krishna_wisdom_${card.ref.replace(' ', '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1E3E62]/80 border border-[#F1B941]/40 mb-3 text-xs text-[#F1B941]">
          <Palette className="w-3.5 h-3.5 text-amber-300" />
          <span>{language === 'te' ? 'జ్ఞాన పత్రాల రూపకర్త' : language === 'hi' ? 'सुंदर ज्ञान पत्र जनरेटर' : "Wisdom Card Generator"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
          {language === 'te' ? 'దివ్య గీతా కార్డులను తయారు చేయండి' : language === 'hi' ? 'साझा करने योग्य दिव्य गीता कार्ड बनाएं' : "Create & Download Aesthetic Wisdom Cards"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          {language === 'te' ? 'ప్రామాణిక శ్లోకాలతో అందమైన సోషల్ మీడియా కార్డులను రూపొందించి డౌన్‌లోడ్ లేదా షేర్ చేసుకోండి.' : language === 'hi' ? 'सोशल मीडिया पर साझा करने हेतु आकर्षक, शास्त्रीय गीता कार्ड तैयार करें।' : "Generate downloadable, shareable wisdom art cards with Sanskrit scriptures, transliteration, and authentic meaning."}
        </p>
      </div>

      {/* Control Bar: Verse Picker & Theme Picker */}
      <div className="krishna-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-4">
        
        {/* Verse Choice */}
        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            Select Bhagavad Gita Verse:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_CARDS.map((pc, idx) => (
              <button
                key={pc.ref}
                onClick={() => setSelectedCardIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCardIdx === idx
                    ? 'bg-[#F1B941] text-[#081225] shadow'
                    : 'bg-[#081225] text-slate-300 border border-slate-700 hover:border-slate-500'
                }`}
              >
                {pc.ref}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Choice */}
        <div>
          <span className="text-xs font-semibold text-slate-300 block mb-2">
            Choose Visual Aesthetic Theme:
          </span>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setThemeId(th.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  themeId === th.id
                    ? 'border-[#F1B941] bg-[#1E3E62] text-[#F1B941] shadow'
                    : 'bg-[#081225] border-slate-700 text-slate-300'
                }`}
              >
                {th.name}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Live Preview Card */}
      <div
        ref={cardRef}
        className={`rounded-3xl p-6 sm:p-10 border-2 ${activeTheme.border} bg-gradient-to-br ${activeTheme.bg} shadow-2xl relative overflow-hidden text-center space-y-6 transition-all duration-500`}
      >
        {/* Top Header Watermark */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
          <span className="font-serif font-bold text-[#F1B941] flex items-center space-x-1.5">
            <span>🦚</span>
            <span>AI KRISHNA</span>
          </span>
          <span className="text-slate-400 font-mono font-bold text-[11px]">
            {card.ref}
          </span>
        </div>

        {/* Sanskrit Devanagari */}
        <div className="my-4 py-4 px-3 bg-black/30 rounded-2xl border border-white/10">
          <p className="font-serif text-lg sm:text-2xl text-amber-200 leading-relaxed font-medium whitespace-pre-line">
            {card.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <p className="text-xs sm:text-sm italic text-slate-300 font-serif whitespace-pre-line max-w-xl mx-auto">
          {card.transliteration}
        </p>

        {/* Translation */}
        <div className="pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
          {getMeaning()}
        </div>

        {/* Card Footer */}
        <div className="pt-2 text-[10px] text-slate-400">
          aikrishna.life • Timeless Wisdom for Modern Life
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleDownloadImage}
          disabled={downloading}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F1B941] to-[#D4AF37] text-[#081225] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#F1B941]/20 transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating Image...' : 'Download Card as Image (PNG)'}</span>
        </button>

        <button
          onClick={handleCopyText}
          className="px-5 py-3 rounded-2xl bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold hover:border-slate-500 transition-all flex items-center space-x-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Card Text Copied!' : 'Copy Card Text'}</span>
        </button>
      </div>

    </div>
  );
};
