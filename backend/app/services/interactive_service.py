import random
import json
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.gita import Verse, Chapter
from app.services.gita_knowledge import gita_knowledge_service

MOOD_DEFINITIONS = [
    {
        "id": "anxious",
        "emoji": "🌊",
        "title_en": "Anxious & Restless",
        "title_hi": "अशांत एवं व्याकुल",
        "title_te": "ఆందోళన & అశాంతి",
        "verse_ref": "6.26",
        "summary_en": "Your mind is racing into future what-ifs. Krishna reminds us that just as waves rise and fall, thoughts too settle when observed with quiet patience.",
        "summary_hi": "आपका मन भविष्य की चिंताओं में दौड़ रहा है। श्रीकृष्ण कहते हैं कि चंचल मन को धैर्यपूर्वक पुनः आत्म-स्वरूप में स्थिर करें।",
        "summary_te": "మీ మనస్సు భవిష్యత్తు గురించి అతిగా ఆందోళన చెందుతోంది. చంచలమైన మనస్సును అభ్యాసంతో తిరిగి అంతరంగం వైపు మరల్చాలని శ్రీకృష్ణుడు బోధిస్తున్నాడు.",
        "practice_en": "4-7-8 Mind-Stillness Pranayama: Inhale for 4 seconds, hold gently for 7 seconds, exhale slowly for 8 seconds. Repeat 3 times.",
        "practice_hi": "4-7-8 प्राणायाम: 4 सेकंड श्वास लें, 7 सेकंड रोकें, और 8 सेकंड में धीरे-धीरे छोड़ें। 3 बार दोहराएं।",
        "practice_te": "4-7-8 ప్రాణాయామం: 4 సెకన్లు శ్వాస తీసుకోండి, 7 సెకన్లు ఆపండి, 8 సెకన్లు నెమ్మదిగా వదలండి. 3 సార్లు చేయండి."
    },
    {
        "id": "angry",
        "emoji": "🔥",
        "title_en": "Angry & Hurt",
        "title_hi": "क्रोधित एवं आहत",
        "title_te": "కోపం & ఆవేశం",
        "verse_ref": "2.62",
        "summary_en": "Anger promises to defend you, but it destroys your intellect from within. When insulted, choose conscious silence over explosive reaction.",
        "summary_hi": "क्रोध आपकी बुद्धि का हरण कर लेता है। जब कोई आहत करे, तो तत्काल प्रतिक्रिया देने के बजाय मौन की शक्ति को चुनें।",
        "summary_te": "కోపం వలన బుద్ధి నశిస్తుంది. ఎవరైనా అవమానించినప్పుడు ఆవేశానికి లోనుకాకుండా, మౌనంతో అంతర్గత శాంతిని కాపాడుకోండి.",
        "practice_en": "Drink a cool glass of water, pause for 60 seconds, and remind yourself: 'Their insult is their karma; my response is mine.'",
        "practice_hi": "एक गिलास शीतल जल पिएं, 60 सेकंड रुकें और विचार करें: उनका अपमान उनका कर्म है, मेरा आचरण मेरा धर्म है।",
        "practice_te": "ఒక గ్లాసు మంచినీరు తాగి 60 సెకన్లు ఆగండి: 'వారి ప్రవర్తన వారి కర్మ, నా స్పందన నా ధర్మం' అని గుర్తుంచుకోండి."
    },
    {
        "id": "demotivated",
        "emoji": "🌱",
        "title_en": "Demotivated & Exhausted",
        "title_hi": "हताश एवं थका हुआ",
        "title_te": "నిరుత్సాహం & అలసట",
        "verse_ref": "2.47",
        "summary_en": "You feel tired because you carry the weight of expectations. Release the burden of the outcome; focus purely on the single task right in front of you.",
        "summary_hi": "आप परिणामों के भारी बोझ से थक गए हैं। फल की चिंता त्यागकर केवल अपने सम्मुख उपस्थित कर्म पर संपूर्ण ध्यान केंद्रित करें।",
        "summary_te": "ఫలితాల గురించిన చింత మీ శక్తిని హరించివేస్తోంది. ఫలితాన్ని ఈశ్వరునికి అర్పించి, ప్రస్తుత కర్తవ్యంపై మాత్రమే దృష్టి పెట్టండి.",
        "practice_en": "Choose just ONE micro-step today (even 10 minutes of sincere work). Treat it as a divine offering without seeking praise.",
        "practice_hi": "आज केवल एक छोटा कदम उठाएं (10 मिनट का एकाग्र कार्य)। इसे ईश्वर को समर्पित मानकर पूर्ण करें।",
        "practice_te": "ఈరోజు ఒకే ఒక్క చిన్న పనిని ఎన్నుకోండి (10 నిమిషాల ఏకాగ్రతతో). ఎలాంటి గుర్తింపును ఆశించకుండా సమర్పణ భావంతో చేయండి."
    },
    {
        "id": "confused",
        "emoji": "🧭",
        "title_en": "Confused at Crossroads",
        "title_hi": "असमंजस एवं दुविधा",
        "title_te": "గందరగోళం & సంశయం",
        "verse_ref": "2.7",
        "summary_en": "Like Arjuna in the chariot, feeling confused is the beginning of genuine wisdom. Ask yourself: 'Which choice serves the greater good and my authentic duty?'",
        "summary_hi": "अर्जुन की तरह असमंजस ही वास्तविक आत्मज्ञान की शुरुआत है। जो मार्ग धर्म और अंतरात्मा के अनुकूल हो, उसी का चयन करें।",
        "summary_te": "కురుక్షేత్రంలో అర్జునుడిలా గందరగోళం చెందడం ఆత్మ వికాసానికి ఆరంభం. ధర్మానికి, మీ అంతరాత్మకు నచ్చిన మార్గాన్ని ఎంచుకోండి.",
        "practice_en": "Write down both options. Ask: 'If I was not afraid of what others thought, which choice aligns with my Swadharma?'",
        "practice_hi": "दोनों विकल्पों को लिखें और विचार करें: यदि मुझे किसी का भय न हो, तो मेरी अंतरात्मा किस मार्ग का निर्देश देती है?",
        "practice_te": "రెండు మార్గాలను కాగితంపై రాయండి. ఇతరుల అభిప్రాయాల భయం లేకపోతే, మీ స్వధర్మానికి ఏది సరైనదో గ్రహించండి."
    },
    {
        "id": "grieving",
        "emoji": "🕊️",
        "title_en": "Grieving & Heartbroken",
        "title_hi": "शोकग्रस्त एवं व्यथित",
        "title_te": "దుఃఖం & శోకం",
        "verse_ref": "2.20",
        "summary_en": "The soul is beyond destruction, eternal and untouched by worldly endings. Honor your tears, but know that love is eternal, while physical forms are transient.",
        "summary_hi": "आत्मा अविनाशी और शाश्वत है। अपने आंसुओं को बहने दें, परन्तु यह भी स्मरण रखें कि आत्मा कभी नहीं मरती, केवल वस्त्र बदलती है।",
        "summary_te": "ఆత్మ శాశ్వతమైనది, దానికి చావు పుట్టుకలు లేవు. మీ దుఃఖాన్ని అనుమతించండి, కానీ ఆత్మ బంధం శాశ్వతమైనదని విశ్వసించండి.",
        "practice_en": "Place your hand on your heart, close your eyes, and send silent prayers of light and gratitude to the departed soul.",
        "practice_hi": "हृदय पर हाथ रखें, नेत्र बंद करें और उस जीवात्मा के लिए शांति और प्रकाश की प्रार्थना करें।",
        "practice_te": "గుండెపై చేయి ఉంచి, కళ్ళు మూసుకుని ఆ ఆత్మకు ప్రశాంతత కలగాలని హృదయపూర్వకంగా ప్రార్థించండి."
    },
    {
        "id": "grateful",
        "emoji": "🌸",
        "title_en": "Grateful & Blessed",
        "title_hi": "कृतज्ञ एवं आनंदित",
        "title_te": "కృతజ్ఞత & ఆనందం",
        "verse_ref": "9.26",
        "summary_en": "Gratitude connects us directly to the divine heart. Even the simplest leaf, flower, or sincere tear offered with devotion is received with immense joy.",
        "summary_hi": "कृतज्ञता हमें दिव्यता से जोड़ती है। प्रेमपूर्वक अर्पित किया गया एक पत्र, पुष्प अथवा जल भी श्रीकृष्ण को परम प्रिय है।",
        "summary_te": "కృతజ్ఞతా భావం మనలను నేరుగా దైవత్వంతో కలుపుతుంది. భక్తితో అర్పించే చిన్న ఆకు, పువ్వు లేదా నీరైనా శ్రీకృష్ణునికి అమూల్యం.",
        "practice_en": "Silently thank 3 people who helped you in life, and dedicate your day's peace to Krishna.",
        "practice_hi": "अपने जीवन में सहायता करने वाले 3 व्यक्तियों का स्मरण कर धन्यवाद दें और अपना दिन ईश्वर को अर्पित करें।",
        "practice_te": "మీ జీవితంలో సహాయం చేసిన ముగ్గురు వ్యక్తులకు మనస్సులోనే కృతజ్ఞతలు తెలుపుతూ, ఈ దినాన్ని సమర్పించండి."
    }
]

ARJUNA_SCENARIOS = [
    {
        "id": "corporate_integrity",
        "title": "The Corporate Battlefield: Audit Fraud",
        "context": "Your manager asks you to conceal an accounting discrepancy to guarantee the team's annual bonus. If you blow the whistle, you might lose your job and face team backlash.",
        "question": "What is the righteous path (Dharma) according to Krishna?",
        "options": [
            {
                "id": "A",
                "text": "Sign the document quietly. Preserving your family's livelihood comes first.",
                "is_gita_aligned": False,
                "feedback": "Arjuna initially thought preserving comfort was better than fighting adharma. But compromising truth brings long-term corrosion to your conscience."
            },
            {
                "id": "B",
                "text": "Refuse to forge the documents respectfully, report the anomaly through proper channels, and accept the consequences with composure.",
                "is_gita_aligned": True,
                "feedback": "Aligned with BG 2.38: 'Hold pleasure and pain, gain and loss, victory and defeat as equal, and fight for righteousness.' True dignity never bows to deception."
            },
            {
                "id": "C",
                "text": "Leak the documents anonymously to social media to ruin your manager's career.",
                "is_gita_aligned": False,
                "feedback": "Motivated by vindictiveness and anger (Krodha), this creates toxic karmic repercussions rather than righteous justice."
            },
            {
                "id": "D",
                "text": "Resign silently without mentioning anything to anyone.",
                "is_gita_aligned": False,
                "feedback": "Fleeing the battlefield out of fear was what Arjuna wanted in Chapter 1. Krishna called this 'Klaibyam' (unmanliness/evasion of duty)."
            }
        ],
        "verse_ref": "BG 2.38",
        "core_lesson": "Dharma demands standing firm on truth even when the temporary cost appears high."
    },
    {
        "id": "family_career",
        "title": "Swadharma vs Parental Pressure",
        "context": "Your parents insist you prepare for a safe government job that you feel completely empty doing. Your authentic genius and calling is in teaching underprivileged children and writing.",
        "question": "How does the Bhagavad Gita resolve this conflict of duties?",
        "options": [
            {
                "id": "A",
                "text": "Obey blindly and suffer internal misery your whole life to keep parents happy.",
                "is_gita_aligned": False,
                "feedback": "Living another's nature leads to spiritual stagnation. The Gita warns against adopting a role alien to your inherent nature."
            },
            {
                "id": "B",
                "text": "Rebel aggressively, cut ties with parents, and leave angrily.",
                "is_gita_aligned": False,
                "feedback": "Aggressive ego creates discord. Krishna teaches firmness without rancor or hatred."
            },
            {
                "id": "C",
                "text": "Honour your parents with love and patience, clearly communicate your authentic calling (Swadharma), and dedicate yourself diligently to your true field.",
                "is_gita_aligned": True,
                "feedback": "Aligned with BG 3.35: 'Better is one's own Swadharma, though performed imperfectly, than another's duty performed to perfection.' When you succeed with integrity, their doubts dissolve."
            },
            {
                "id": "D",
                "text": "Do both half-heartedly without excelling in either.",
                "is_gita_aligned": False,
                "feedback": "A divided mind is like a broken boat on water; it loses direction and clarity."
            }
        ],
        "verse_ref": "BG 3.35",
        "core_lesson": "Align with your authentic calling while treating family with steadfast love."
    },
    {
        "id": "forgiving_betrayal",
        "title": "Betrayal by a Business Partner",
        "context": "A close friend and business partner secretly siphoned intellectual property and launched a rival venture, leaving you broke and heartbroken.",
        "question": "What is Krishna's guidance on handling betrayal and seeking restitution?",
        "options": [
            {
                "id": "A",
                "text": "Take legal and practical steps to protect your rights without hatred or malice in your heart.",
                "is_gita_aligned": True,
                "feedback": "Aligned with BG 11.55: 'Work for Me, make Me your supreme goal... free from enmity towards all beings.' Krishna fought the Kauravas without personal malice."
            },
            {
                "id": "B",
                "text": "Consume yourself with revenge until you destroy their life.",
                "is_gita_aligned": False,
                "feedback": "Revenge burns the vessel that holds it. It chains your soul to their negativity."
            },
            {
                "id": "C",
                "text": "Pretend nothing happened and invite them to do it again.",
                "is_gita_aligned": False,
                "feedback": "Naivety is not spiritual detachment. Enabling adharma is itself unrighteous."
            },
            {
                "id": "D",
                "text": "Give up on all human relationships forever and become cynical.",
                "is_gita_aligned": False,
                "feedback": "Cynicism is the ego's armor. True wisdom stays open, discerning, and loving."
            }
        ],
        "verse_ref": "BG 11.55",
        "core_lesson": "Protect righteousness firmly without poisoning your own heart with venom."
    }
]

MYTH_VS_TRUTH_ITEMS = [
    {
        "id": "myth_violence",
        "statement": "The Bhagavad Gita promotes violence and justifies war.",
        "is_myth": True,
        "title": "Is the Gita a violent scripture?",
        "truth_en": "FALSE. Krishna exhausted every diplomatic peace mission, offering to avert war if the Pandavas were given merely five villages. The war was the last resort against tyrannical adharma. Symbolically, Kurukshetra represents the psychological battle inside every human heart between virtue and vice.",
        "truth_hi": "असत्य। श्रीकृष्ण ने युद्ध टालने हेतु शांतिदूत बनकर हर संभव प्रयास किया था। यह केवल धर्म की रक्षा हेतु अंतिम उपाय था। आध्यात्मिक रूप से, कुरुक्षेत्र हमारे अंतर्मन का धर्मक्षेत्र है।",
        "truth_te": "అసత్యం. శ్రీకృష్ణుడు యుద్ధాన్ని ఆపడానికి శాంతిదూతగా వెళ్ళి అన్ని ప్రయత్నాలు చేశాడు. అధర్మం అంతం చేయడానికి ఇది చివరి ప్రత్యామ్నాయం మాత్రమే. అంతరంగంలో కామక్రోధాలపై చేసే పోరాటమే కురుక్షేత్రం.",
        "verse_proof": "BG 4.7-8 & BG 11.32"
    },
    {
        "id": "myth_karma_destiny",
        "statement": "Karma means you are helpless and everything is predetermined by fate.",
        "is_myth": True,
        "title": "Does Karma mean fatalism?",
        "truth_en": "FALSE. Karma is the exact opposite of fatalism. It is the law of conscious agency and personal responsibility. While past karma presents your current battlefield, your present choices determine your future. You are the architect of your own destiny.",
        "truth_hi": "असत्य। कर्म भाग्यवादिता नहीं बल्कि व्यक्तिगत उत्तरदायित्व है। आपका वर्तमान पूर्व कर्मों का परिणाम हो सकता है, परन्तु आपका भविष्य आपके वर्तमान पुरुषार्थ पर निर्भर करता है।",
        "truth_te": "అసత్యం. కర్మ అంటే విధికి లొంగిపోవడం కాదు; అది బాధ్యతాయుతమైన కార్యాచరణ. మీ ప్రస్తుత సంకల్పమే మీ భవిష్యత్తును నిర్ణయిస్తుంది.",
        "verse_proof": "BG 6.5 ('Elevate yourself by yourself, do not degrade yourself')"
    },
    {
        "id": "myth_detachment_cold",
        "statement": "Detachment (Vairagya) means becoming cold, unloving, and emotionless.",
        "is_myth": True,
        "title": "Is detachment emotional numbness?",
        "truth_en": "FALSE. Vairagya is not absence of love—it is love freed from possessiveness, fear, and dependency. Detachment means loving fully without clinging to an outcome you cannot control.",
        "truth_hi": "असत्य। वैराग्य का अर्थ प्रेमहीन होना नहीं, बल्कि आसक्ति और भय से मुक्त होकर निस्वार्थ प्रेम करना है।",
        "truth_te": "అసత్యం. వైరాగ్యం అంటే భావశూన్యత కాదు; భయం మరియు స్వార్థం లేని నిస్వార్థ ప్రేమను సాధించడమే నిజమైన వైరాగ్యం.",
        "verse_proof": "BG 12.13-14 ('Friendly and compassionate to all, free from possessiveness')"
    },
    {
        "id": "myth_only_for_elderly",
        "statement": "The Gita is only for retired, elderly people or renunciates.",
        "is_myth": True,
        "title": "Is the Gita only for the elderly?",
        "truth_en": "FALSE. The Gita was not spoken in an old-age home or forest cave—it was delivered to a prime warrior on a dynamic battlefield amidst high-stakes decision making. It is a manual for peak worldly performance with inner peace.",
        "truth_hi": "असत्य। गीता किसी गुफा में नहीं बल्कि युद्धभूमि में कर्मशील अर्जुन को सुनाई गई थी। यह युवाओं और कार्यशीलों के लिए जीवन जीने की कला है।",
        "truth_te": "అసత్యం. గీత కేవలం వృద్ధులకు కాదు; జీవన సమరంలో విజయం సాధించాలనుకునే యువతకు, ప్రతి ఒక్కరికీ దివ్య మార్గదర్శిని.",
        "verse_proof": "BG 2.3 ('Do not yield to weakness, O Partha! Arise!')"
    }
]

QUIZ_QUESTIONS = [
    {
        "id": 1,
        "question_en": "In Bhagavad Gita 2.47, what does Lord Krishna state is within your right?",
        "question_hi": "भगवद्गीता 2.47 के अनुसार मनुष्य का अधिकार किस पर है?",
        "question_te": "భగవద్గీత 2.47 ప్రకారం మానవునికి దేనిపై అధికారం కలదు?",
        "options_en": ["The fruits of action", "The performance of action", "Controlling other people", "Deciding your birth"],
        "options_hi": ["कर्म के फल पर", "कर्म करने पर", "दूसरों को नियंत्रित करने पर", "अपने जन्म पर"],
        "options_te": ["కర్మ ఫలాలపై", "కర్మను ఆచరించడంపై", "ఇతరులను శాసించడంపై", "జన్మను ఎన్నుకోవడంపై"],
        "correct_index": 1,
        "explanation": "Karmanye vadhikaraste ma phaleshu kadachana — You have a right only to work, never to the fruits of work."
    },
    {
        "id": 2,
        "question_en": "What is the meaning of 'Samatvam Yoga Uchyate' (BG 2.48)?",
        "question_hi": "'समत्वं योग उच्यते' (2.48) का क्या अर्थ है?",
        "question_te": "'సమత్వం యోగ ఉచ్యతే' (2.48) అంటే ఏమిటి?",
        "options_en": ["Yoga is physical asana", "Equanimity in success and failure is Yoga", "Yoga means renouncing family", "Yoga is breath retention"],
        "options_hi": ["योग केवल शारीरिक आसन है", "सफलता और असफलता में समभाव ही योग है", "योग का अर्थ परिवार छोड़ना है", "योग केवल प्राणायाम है"],
        "options_te": ["యోగా అంటే ఆసనాలు", "గెలుపోటములలో సమచిత్తమే యోగం", "సంసారాన్ని వదలడమే యోగం", "కేవలం శ్వాస నియంత్రణ"],
        "correct_index": 1,
        "explanation": "Composure and balance in all circumstances—joy and sorrow, gain and loss—is called Yoga."
    },
    {
        "id": 3,
        "question_en": "According to Chapter 6, Verse 5, who is your own truest friend and worst enemy?",
        "question_hi": "अध्याय 6, श्लोक 5 के अनुसार आपका सच्चा मित्र और परम शत्रु कौन है?",
        "question_te": "6వ అధ్యాయం 5వ శ్లోకం ప్రకారం మీ నిజమైన మిత్రుడు మరియు శత్రువు ఎవరు?",
        "options_en": ["Your own mind", "Society", "Your competitors", "Destiny"],
        "options_hi": ["आपका अपना मन", "समाज", "आपके विरोधी", "भाग्य"],
        "options_te": ["మీ స్వంత మనస్సు", "సమాజం", "శత్రువులు", "విధి"],
        "correct_index": 0,
        "explanation": "Atmaiva hy atmano bandhur atmaiva ripur atmanah — The mind is the friend of the self when mastered, but its enemy when undisciplined."
    },
    {
        "id": 4,
        "question_en": "How many total chapters and verses comprise the Bhagavad Gita?",
        "question_hi": "भगवद्गीता में कुल कितने अध्याय और श्लोक हैं?",
        "question_te": "భగవద్గీతలో మొత్తం ఎన్ని అధ్యాయాలు, శ్లోకాలు ఉన్నాయి?",
        "options_en": ["12 Chapters & 500 Verses", "18 Chapters & 700 Verses", "24 Chapters & 1000 Verses", "10 Chapters & 400 Verses"],
        "options_hi": ["12 अध्याय और 500 श्लोक", "18 अध्याय और 700 श्लोक", "24 अध्याय और 1000 श्लोक", "10 अध्याय और 400 श्लोक"],
        "options_te": ["12 అధ్యాయాలు & 500 శ్లోకాలు", "18 అధ్యాయాలు & 700 శ్లోకాలు", "24 అధ్యాయాలు & 1000 శ్లోకాలు", "10 అధ్యాయాలు & 400 శ్లోకాలు"],
        "correct_index": 1,
        "explanation": "The Bhagavad Gita is nestled within the Bhishma Parva of the Mahabharata, consisting of exactly 18 chapters and 700 eternal verses."
    },
    {
        "id": 5,
        "question_en": "What did Arjuna drop in despair in the opening chapter of the Gita?",
        "question_hi": "प्रथम अध्याय में विषादग्रस्त होकर अर्जुन ने क्या त्याग दिया था?",
        "question_te": "మొదటి అధ్యాయంలో దుఃఖంతో అర్జునుడు దేనిని విడిచిపెట్టాడు?",
        "options_en": ["His crown", "His Gandiva bow and arrows", "His chariot wheel", "His royal cloak"],
        "options_hi": ["अपना मुकुट", "अपना गाण्डीव धनुष और बाण", "रथ का पहिया", "राजसी वस्त्र"],
        "options_te": ["కిరీటం", "గాండీవ ధనుస్సు మరియు బాణాలు", "రథ చక్రం", "రాజ వస్త్రాలు"],
        "correct_index": 1,
        "explanation": "Visrijya sa-sharam chapam — casting aside his divine bow Gandiva and arrows, Arjuna sat down on the chariot floor in grief."
    }
]

KURUKSHETRA_STAGES = [
    {
        "stage_num": 1,
        "title": "Stage 1: The Chariot Stops",
        "description": "You stand between two great forces: your comfort zone of old habits and attachments on one side, and the daunting battlefield of your true potential on the other. Your knees shake with fear of the unknown.",
        "choice_a": "Step down from the chariot and run back to familiar comfort.",
        "choice_b": "Ask the Divine Charioteer within: 'Guide me, for I know not what is right.'",
        "aligned_choice": "B",
        "lesson": "Surrendering ego and asking for wisdom is the necessary first step of all spiritual evolution (BG 2.7)."
    },
    {
        "stage_num": 2,
        "title": "Stage 2: The Slaying of Doubt",
        "description": "Your inner skeptic whispers: 'What if you work hard and fail? What if you are humiliated?' The arrow of doubt paralyzes your hands.",
        "choice_a": "Remember that failure in sincere duty is a badge of honour; only inaction is disgrace.",
        "choice_b": "Wait until someone guarantees 100% safety before making a move.",
        "aligned_choice": "A",
        "lesson": "Samsayatma vinasyati — Doubting the divine truth brings paralysis; resolute faith (Vyavasayatmika buddhi) brings triumph (BG 2.41)."
    },
    {
        "stage_num": 3,
        "title": "Stage 3: The Fortress of the Six Enemies",
        "description": "The enemy commander approaches: Anger, Jealousy, and Pride challenge your calm. Someone has just insulted you unjustly in public.",
        "choice_a": "Retaliate with tenfold cruelty to prove your power.",
        "choice_b": "Hold your composure like the deep ocean, responding firmly with truth rather than blind rage.",
        "aligned_choice": "B",
        "lesson": "Kama and Krodha are the all-devouring foes of wisdom; conquer them through dispassionate self-mastery (BG 3.37)."
    },
    {
        "stage_num": 4,
        "title": "Stage 4: The Vision of Cosmic Interconnection",
        "description": "Krishna reveals His universal form (Vishwaroopam). You see that all beings are woven into the single fabric of existence. Your petty rivalries suddenly seem microscopic.",
        "choice_a": "Realize that service to others is service to God, dissolving envy forever.",
        "choice_b": "Ignore the revelation and return to self-absorbed competition.",
        "aligned_choice": "A",
        "lesson": "He who sees Me in all things and all things in Me is never lost to Me (BG 6.30)."
    },
    {
        "stage_num": 5,
        "title": "Stage 5: The Victorious Bow (Gandiva Arises)",
        "description": "The battle is joined. Krishna turns and says: 'Arise, Partha! Fulfill your Swadharma without hesitation!'",
        "choice_a": "Take up your bow with joyful confidence: 'My doubts are destroyed, I shall act according to Your word.'",
        "choice_b": "Ask for more signs and procrastinate another day.",
        "aligned_choice": "A",
        "lesson": "Nashto mohah smritir labdha — Delusion is destroyed, memory is regained, I stand ready to act (BG 18.73)."
    }
]

class InteractiveService:
    def get_moods(self) -> List[Dict[str, Any]]:
        return MOOD_DEFINITIONS

    def get_mood_guidance(self, mood_id: str, db: Session, language: str = "en") -> Dict[str, Any]:
        mood = next((m for m in MOOD_DEFINITIONS if m["id"] == mood_id), MOOD_DEFINITIONS[0])
        ch_str, v_str = mood["verse_ref"].split(".")
        ch_num, v_num = int(ch_str), int(v_str)

        verse = db.query(Verse).filter(
            Verse.chapter_number == ch_num,
            Verse.verse_number == v_num
        ).first()

        verse_data = None
        if verse:
            verse_data = {
                "chapter_number": verse.chapter_number,
                "verse_number": verse.verse_number,
                "slok_sanskrit": verse.slok_sanskrit,
                "transliteration": verse.transliteration,
                "translation": (
                    verse.translation_te if language == "te" and verse.translation_te else
                    verse.translation_hi if language == "hi" and verse.translation_hi else
                    verse.translation_en
                ),
                "explanation": verse.explanation
            }

        return {
            "mood": mood,
            "verse": verse_data,
            "counsel": (
                mood["summary_te"] if language == "te" else
                mood["summary_hi"] if language == "hi" else
                mood["summary_en"]
            ),
            "practice": (
                mood["practice_te"] if language == "te" else
                mood["practice_hi"] if language == "hi" else
                mood["practice_en"]
            )
        }

    def get_random_wisdom(self, db: Session, language: str = "en") -> Dict[str, Any]:
        all_verses = db.query(Verse).all()
        if not all_verses:
            # Fallback to cache
            verse_dict = random.choice(gita_knowledge_service.verses_cache) if gita_knowledge_service.verses_cache else {}
            return {
                "chapter_number": verse_dict.get("chapter_number", 2),
                "verse_number": verse_dict.get("verse_number", 47),
                "slok_sanskrit": verse_dict.get("slok_sanskrit", "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।"),
                "transliteration": verse_dict.get("transliteration", "karmany evadhikaras te ma phaleshu kadachana"),
                "translation": verse_dict.get(f"translation_{language}", verse_dict.get("translation_en", "")),
                "explanation": verse_dict.get("explanation", ""),
                "divine_spark": "This verse was unveiled for you today as a mirror for your soul.",
                "micro_action": "Dedicate your very next action with total focus, free from the thirst for applause."
            }

        v = random.choice(all_verses)
        translation = (
            v.translation_te if language == "te" and v.translation_te else
            v.translation_hi if language == "hi" and v.translation_hi else
            v.translation_en
        )

        divine_sparks = {
            "en": "This verse appears before you not by mere chance, but as an oracle for your current circumstances.",
            "hi": "यह पावन श्लोक आज आपके समक्ष किसी संयोग से नहीं, बल्कि आपके आत्म-उत्थान हेतु प्रकट हुआ है।",
            "te": "ఈ శ్లోకం మీ అంతరంగ వికాసానికి, ప్రస్తుత పరిస్థితికి దివ్య మార్గదర్శిగా ప్రత్యక్షమైంది."
        }

        micro_actions = {
            "en": "Reflect on this truth for 60 seconds. Apply its principle to your very next decision today.",
            "hi": "60 सेकंड तक इस सत्य का मनन करें और आज के अपने अगले निर्णय में इसे उतारें।",
            "te": "ఒక నిమిషం పాటు ఈ సత్యాన్ని ధ్యానించి, నేటి మీ తదుపరి పనిలో దీనిని ఆచరించండి."
        }

        return {
            "id": v.id,
            "chapter_number": v.chapter_number,
            "verse_number": v.verse_number,
            "chapter_title_en": v.chapter_title_en,
            "slok_sanskrit": v.slok_sanskrit,
            "transliteration": v.transliteration,
            "translation": translation,
            "explanation": v.explanation,
            "divine_spark": divine_sparks.get(language, divine_sparks["en"]),
            "micro_action": micro_actions.get(language, micro_actions["en"])
        }

    def decode_problem(self, problem_text: str, db: Session, language: str = "en") -> Dict[str, Any]:
        """Deeply deconstructs a user problem into 4 psychological and spiritual tiers."""
        best_match, score = gita_knowledge_service.get_best_match(problem_text)
        
        verse_data = None
        if best_match:
            v_row = db.query(Verse).filter(
                Verse.chapter_number == best_match["chapter_number"],
                Verse.verse_number == best_match["verse_number"]
            ).first()
            if v_row:
                verse_data = {
                    "chapter_number": v_row.chapter_number,
                    "verse_number": v_row.verse_number,
                    "slok_sanskrit": v_row.slok_sanskrit,
                    "transliteration": v_row.transliteration,
                    "translation": (
                        v_row.translation_te if language == "te" and v_row.translation_te else
                        v_row.translation_hi if language == "hi" and v_row.translation_hi else
                        v_row.translation_en
                    ),
                    "explanation": v_row.explanation
                }

        # Emotion & Psychological extraction
        prob_lower = problem_text.lower()
        if any(w in prob_lower for w in ["angry", "rage", "insult", "disrespect", "cheat"]):
            root_emotion = "Wounded Pride & Expectation of External Validation"
            hidden_question = "How do I maintain my dignity without being poisoned by others' hostility?"
            mantra = "Their words are their dust; my heart is Krishna's temple."
        elif any(w in prob_lower for w in ["promote", "job", "career", "boss", "salary", "hard work"]):
            root_emotion = "Comparison Anxiety & Deferred Self-Worth"
            hidden_question = "If my sincere sweat is not rewarded by society, does my effort still matter?"
            mantra = "I am defined by the excellence of my craft, not the applause of spectators."
        elif any(w in prob_lower for w in ["fear", "fail", "scared", "risk", "exam"]):
            root_emotion = "Dread of Vulnerability & Outcome Obsession"
            hidden_question = "Can I survive if the outcome does not match my hopes?"
            mantra = "Action is my sacred privilege; outcomes rest in the hands of the cosmos."
        else:
            root_emotion = "Unsettled Attachment & Search for Grounding"
            hidden_question = "Where can I find an unshakeable anchor when life shifts around me?"
            mantra = "Within me lies an eternal calm that no circumstance can diminish."

        return {
            "root_emotion": root_emotion,
            "hidden_question": hidden_question,
            "core_teaching": "Nishkama Karma & Sthitaprajna (Composure in Action)",
            "verse": verse_data,
            "action_steps": [
                "Separate what is in your immediate control today from what belongs to other people or timing.",
                "Take 3 deliberate pauses before reacting to any trigger in this situation.",
                "Dedicate this specific struggle to Krishna as your inner training ground."
            ],
            "mantra": mantra
        }

    def get_arjuna_scenarios(self) -> List[Dict[str, Any]]:
        return ARJUNA_SCENARIOS

    def get_myths(self) -> List[Dict[str, Any]]:
        return MYTH_VS_TRUTH_ITEMS

    def get_quiz_questions(self, language: str = "en") -> List[Dict[str, Any]]:
        formatted = []
        for q in QUIZ_QUESTIONS:
            formatted.append({
                "id": q["id"],
                "question": q.get(f"question_{language}", q["question_en"]),
                "options": q.get(f"options_{language}", q["options_en"]),
                "correct_index": q["correct_index"],
                "explanation": q["explanation"]
            })
        return formatted

    def get_eli10_explanation(self, chapter: int, verse: int, db: Session, language: str = "en") -> Dict[str, Any]:
        """Generates simplified child-friendly storytelling explanation with metaphors."""
        v = db.query(Verse).filter(Verse.chapter_number == chapter, Verse.verse_number == verse).first()
        if not v:
            return {
                "title": "The Golden Chariot Story",
                "story": "Imagine your body is like a beautiful toy chariot. Your five senses are like five energetic horses...",
                "takeaway": "Drive your chariot gently with a wise smile!"
            }

        # Preset rich child-friendly metaphors for famous verses
        ref = f"{chapter}.{verse}"
        if ref == "2.47":
            return {
                "title": "The Joyful Toy Painter",
                "metaphor": "🎨 Painting Without Worrying About The Trophy",
                "story_en": "Imagine you are building a LEGO castle or painting a colorful picture. If you only think 'Will I get first prize in class?', your hands tremble and you feel stressed! But if you love every single brushstroke, painting becomes pure joy. Krishna tells us: Love the game, don't worry about the trophy!",
                "story_hi": "कल्पना करो कि तुम एक सुंदर चित्र बना रहे हो। यदि तुम केवल यह सोचते रहोगे कि मुझे पुरस्कार मिलेगा या नहीं, तो तुम्हारा चित्र बिगड़ जाएगा। जब तुम चित्र बनाने के हर रंग का आनंद लेते हो, तो वह सबसे सुंदर बनता है। श्रीकृष्ण कहते हैं: अपने खेल से प्रेम करो, पुरस्कार की चिंता छोड़ दो!",
                "story_te": "మీరు ఒక అందమైన బొమ్మను గీస్తున్నారనుకోండి. 'నాకు బహుమతి వస్తుందో రాదో' అని మాత్రమే ఆలోచిస్తే బొమ్మ సరిగ్గా రాదు. రంగులు వేయడాన్ని ప్రేమిస్తే ఆ బొమ్మ అద్భుతంగా వస్తుంది. ఫలితం కంటే మీరు చేసే పనిని ప్రేమించమని శ్రీకృష్ణుడు చెబుతున్నాడు!",
                "verse_ref": "BG 2.47",
                "kid_takeaway": "Do your best right now with a happy heart!"
            }
        elif ref == "6.5":
            return {
                "title": "Your Inner Superhero Friend",
                "metaphor": "🦸 The Friendly Mind vs The Grumpy Mind",
                "story_en": "Inside your head, your thoughts can be like your happiest best friend who cheers you up when you fall, OR like a grumpy bully who says 'You can't do it!' Krishna says you have the superpower to train your mind to be your kindest best friend forever.",
                "story_hi": "हमारे मन के अंदर दो आवाजें होती हैं: एक जो हमारा उत्साह बढ़ाती है, और दूसरी जो हमें डराती है। श्रीकृष्ण कहते हैं कि अपने मन को अपना सबसे अच्छा दोस्त बनाओ।",
                "story_te": "మన మనస్సు ఒక మంచి స్నేహితుడిలా మనల్ని ప్రోత్సహించగలదు. సాధనతో మన మనస్సును మనకు ప్రాణమిత్రుడిగా మార్చుకోవాలని శ్రీకృష్ణుడు చెబుతున్నాడు.",
                "verse_ref": "BG 6.5",
                "kid_takeaway": "Be kind to yourself and your mind will be your greatest ally!"
            }
        else:
            return {
                "title": f"Wisdom Story: Chapter {chapter}, Verse {verse}",
                "metaphor": "🦚 Lord Krishna's Loving Guidance",
                "story_en": f"Krishna spoke this wonderful secret to Prince Arjuna: Whenever you feel small or confused, remember that the Divine Spark is right inside your heart, guiding you like a gentle compass.",
                "story_hi": f"श्रीकृष्ण अर्जुन से कहते हैं कि जब भी मन घबराए, तो याद रखो कि सच्चा प्रकाश तुम्हारे अपने हृदय में विद्यमान है।",
                "story_te": f"శ్రీకృష్ణుడు అర్జునుడికి చెప్పిన దివ్య రహస్యం: ఎప్పుడు భయం వేసినా మీ హృదయంలోని దైవిక శక్తిని నమ్మి ముందడుగు వేయండి.",
                "verse_ref": f"BG {chapter}.{verse}",
                "kid_takeaway": "You are stronger, wiser, and braver than you think!"
            }

    def generate_letter_reply(self, letter_text: str, language: str = "en") -> Dict[str, Any]:
        """Crafts an intimate, deeply compassionate epistolary reply as Sri Krishna."""
        salutations = {
            "en": "My Dearest Soul,",
            "hi": "मेरे प्रिय आत्मन,",
            "te": "నా ప్రియమైన మిత్రమా,"
        }

        body_en = (
            "I have heard every word you wrote, and even more deeply, I hear the quiet tears and silent hopes your words could not express.\n\n"
            "Do not feel alone on this path. In the middle of Kurukshetra, Arjuna too felt that the weight of the world was greater than his strength. "
            "Yet, look closely: you have survived every storm that was supposed to break you. Your heart is resilient because the eternal Spark within you cannot be burnt by fire, wet by water, or withered by wind (BG 2.23).\n\n"
            "Lay your anxiety at My feet today. Do not try to solve all of tomorrow before tomorrow arrives. "
            "Take one gentle breath, perform your next duty with love, and trust that I am holding the reins of your chariot."
        )

        body_hi = (
            "मैंने तुम्हारे द्वारा लिखे गए प्रत्येक शब्द को सुना है, और उससे भी अधिक, मैंने तुम्हारी उन अनकही भावनाओं और मौन आंसुओं को जाना है।\n\n"
            "इस जीवन-यात्रा में स्वयं को कभी अकेला मत समझना। कुरुक्षेत्र के मध्य में अर्जुन भी इसी प्रकार व्यथित हुआ था। "
            "परन्तु स्मरण रखो: आत्मा को न शस्त्र काट सकते हैं, न अग्नि जला सकती है (2.23)। तुम अत्यंत सामर्थ्यवान हो।\n\n"
            "अपनी समस्त चिंताओं को मेरे चरणों में समर्पित कर दो। केवल आज के कर्तव्य को प्रेमपूर्वक पूरा करो, तुम्हारे जीवन-रथ की बागडोर मेरे हाथों में है।"
        )

        body_te = (
            "నీవు రాసిన ప్రతి అక్షరాన్ని నేను విన్నాను. అంతకంటే ఎక్కువగా నీ మాటలలో చెప్పలేని అంతరంగ వేదనను, ఆశలను నేను అర్థం చేసుకున్నాను.\n\n"
            "ఈ జీవన ప్రయాణంలో నీవు ఎన్నడూ ఒంటరివి కావు. కురుక్షేత్రంలో అర్జునుడు కూడా ఇలాగే దిక్కుతోచని స్థితిలో నిలిచాడు. "
            "కానీ ఆత్మ నాశనం లేనిది (2.23). నీ అంతరంగంలో అనంతమైన దివ్య శక్తి ఉంది.\n\n"
            "నీ భయాలను, చింతలను నా పాదాల చెంత సమర్పించు. భవిష్యత్తు గురించి ఆందోళన చెందకుండా, ప్రస్తుత క్షణంలో నీ కర్తవ్యాన్ని ప్రేమతో చెయ్యి. నీ రథ సారథిగా నేను ఎల్లప్పుడూ నీతోనే ఉన్నాను."
        )

        closings = {
            "en": "Forever walking beside you,\nSri Krishna",
            "hi": "सदा तुम्हारे साथ,\nश्रीकृष्ण",
            "te": "సదా నీ వెన్నంటి ఉండే,\nశ్రీకృష్ణుడు"
        }

        selected_body = body_te if language == "te" else body_hi if language == "hi" else body_en

        return {
            "salutation": salutations.get(language, salutations["en"]),
            "body": selected_body,
            "closing": closings.get(language, closings["en"]),
            "verse_referenced": "BG 2.23 & BG 18.66"
        }

    def get_kurukshetra_stages(self) -> List[Dict[str, Any]]:
        return KURUKSHETRA_STAGES

interactive_service = InteractiveService()
