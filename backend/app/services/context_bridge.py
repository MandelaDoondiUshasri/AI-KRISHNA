import re
import json
import logging
from typing import Dict, Any, List, Optional, Tuple
from app.services.gita_knowledge import gita_knowledge_service
from app.services.ai_provider import ai_provider_service

logger = logging.getLogger(__name__)

# Mental health & crisis triggers for empathetic safety handling
CRISIS_KEYWORDS = [
    "suicide", "kill myself", "end my life", "want to die", "self harm", 
    "cut myself", "cannot live anymore", "no reason to live", "hopeless life"
]

CRISIS_MESSAGE = {
    "en": (
        "I hear how much pain you are carrying right now, and I want you to know that your life is deeply sacred and meaningful. "
        "While the Bhagavad Gita teaches us that even the darkest grief can transform into inner strength, please reach out to dedicated human professionals who can support you right now:\n\n"
        "• India: Tele-MANAS at 14416 or Vandrevala Foundation at +91 9999 666 555 (24/7 Free)\n"
        "• United States: Call or text 988 (Suicide & Crisis Lifeline)\n"
        "• International: Find your local crisis line at findahelpline.com\n\n"
        "You do not have to fight this battle alone. Lord Krishna stood beside Arjuna in his most paralyzed hour of despair; please let someone stand beside you today."
    ),
    "hi": (
        "मैं अनुभव कर रहा हूँ कि आप इस समय अत्यंत गहरे दुःख से गुजर रहे हैं। आपका जीवन अमूल्य और पवित्र है। "
        "यद्यपि भगवद्गीता हमें सिखाती है कि घोर विषाद भी आत्म-ज्ञान का मार्ग बन सकता है, पर इस घड़ी में कृपया पेशेवर सहायता अवश्य लें:\n\n"
        "• भारत: Tele-MANAS (14416) या वंद्रेवाला फाउंडेशन (+91 9999 666 555 - 24 घंटे उपलब्ध)\n"
        "• अंतर्राष्ट्रीय: 988 या findahelpline.com\n\n"
        "आप इस संघर्ष में अकेले नहीं हैं। कृपया अभी किसी अपने या सहायता केंद्र से संपर्क करें।"
    ),
    "te": (
        "మీరు ఎంతటి తీవ్రమైన మానసిక వేదనను అనుభవిస్తున్నారో నేను గ్రహించగలను. మీ ప్రాణం ఎంతో అమూల్యమైనది, పవిత్రమైనది. "
        "భగవద్గీత మనకు విషాదం నుండి కూడా నూతన శక్తిని పొందవచ్చని బోధిస్తున్నప్పటికీ, దయచేసి వెంటనే నిపుణుల సహాయం తీసుకోండి:\n\n"
        "• భారతదేశం: టెలి-మానస్ 14416 లేదా వాండ్రేవాళా ఫౌండేషన్ +91 9999 666 555 (24 గంటలూ ఉచితం)\n"
        "• అంతర్జాతీయ హెల్ప్‌లైన్: findahelpline.com\n\n"
        "ఈ యుద్ధంలో మీరు ఒంటరిగా లేరు. దయచేసి వెంటనే సహాయం పొందండి."
    )
}

DISCLAIMER_TEXT = {
    "en": "Note: AI Krishna is an AI spiritual companion inspired by the teachings of the Bhagavad Gita. It does not replace professional medical, mental health, legal, or financial advice.",
    "hi": "सूचना: एआई कृष्ण भगवद्गीता की शिक्षाओं से प्रेरित एक आध्यात्मिक एआई साथी है। यह किसी पेशेवर चिकित्सा, मानसिक स्वास्थ्य, विधिक या वित्तीय परामर्श का विकल्प नहीं है।",
    "te": "గమనిక: AI కృష్ణ భగవద్గీత బోధనలతో రూపొందించబడిన ఆధ్యాత్మిక కృత్రిమ మేధ మార్గదర్శి మాత్రమే. ఇది వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక నిపుణుల సలహాలకు ప్రత్యామ్నాయం కాదు."
}

class ContextBridgeEngine:
    def __init__(self):
        self.gita_service = gita_knowledge_service
        self.ai_provider = ai_provider_service

    def analyze_situation_and_emotion(self, query: str) -> Dict[str, Any]:
        """
        Step 1, 2, 3:
        Deconstructs query into surface problem, emotional state, latent inquiry, and category.
        """
        q = query.lower()
        emotion = "Contemplation"
        situation_tag = "general"
        latent_question = "How should I navigate this life situation with clarity and peace?"

        # Emotion & Situation mapping
        if any(w in q for w in ["promotion", "colleague", "hard work", "boss", "appraisal", "hike", "office", "career", "job", "unemployed"]):
            situation_tag = "career"
            if any(w in q for w in ["promotion", "colleague", "working very hard", "getting promotion", "unfair", "disappointed", "jealous", "credit"]):
                emotion = "Disappointment, Career Comparison & Frustration"
                latent_question = "Why are my sincere efforts not yielding worldly recognition, and how can I maintain inner worth without bitter comparison?"
            elif any(w in q for w in ["switch", "confused", "which job", "passion", "path"]):
                emotion = "Career Paralysis & Confusion"
                latent_question = "What is my authentic duty (Swadharma), and how do I choose the right career path without fear?"

        elif any(w in q for w in ["fail", "failure", "startup", "exam", "loss", "lose", "risk", "fear of"]):
            situation_tag = "fear of failure"
            emotion = "Anxiety & Fear of Failure"
            latent_question = "How do I overcome the paralyzing dread of not succeeding, and what is true success according to eternal wisdom?"

        elif any(w in q for w in ["overthinking", "anxiety", "mind", "cannot sleep", "racing thoughts", "worry", "stress", "future", "restless"]):
            situation_tag = "overthinking"
            emotion = "Mental Restlessness & Overwhelm"
            latent_question = "How can I calm an untamed, racing mind and find stillness in the midst of uncertainty?"

        elif any(w in q for w in ["anger", "angry", "rage", "temper", "insult", "shouted", "hate"]):
            situation_tag = "anger control"
            emotion = "Rage & Hurt Pride"
            latent_question = "Why did an external trigger shatter my peace, and how can I halt the destructive chain reaction of anger before it ruins my life?"

        elif any(w in q for w in ["relationship", "breakup", "partner", "love", "divorce", "cheated", "marriage", "lonely", "family"]):
            situation_tag = "relationships"
            emotion = "Heartbreak, Attachment & Loneliness"
            latent_question = "How do I love genuinely without losing myself in possessive attachment and grief when expectations are unmet?"

        elif any(w in q for w in ["lost", "purpose", "why live", "empty", "meaning of life", "direction"]):
            situation_tag = "purpose"
            emotion = "Existential Despair & Emptiness"
            latent_question = "What is the true purpose of my existence, and how do I rediscover meaning when everything feels hollow?"

        return {
            "emotion": emotion,
            "situation_tag": situation_tag,
            "latent_question": latent_question
        }

    def check_crisis(self, text: str) -> bool:
        lower = text.lower()
        return any(k in lower for k in CRISIS_KEYWORDS)

    async def process_query(
        self,
        query: str,
        language: str = "en",
        conversation_history: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """
        Executes the 9-Step Context Bridge Engine.
        """
        lang = language if language in ["en", "te", "hi"] else "en"

        # Safety Check
        if self.check_crisis(query):
            crisis_reply = CRISIS_MESSAGE.get(lang, CRISIS_MESSAGE["en"])
            return {
                "situation_understanding": crisis_reply,
                "krishna_wisdom": "Your life is sacred. Please speak with someone who can offer immediate care and safety.",
                "verse": None,
                "is_direct_verse": False,
                "how_it_applies": "Compassion begins with protecting your own breath and existence.",
                "practical_steps": [
                    "Reach out immediately to the helpline numbers provided above.",
                    "Contact a trusted friend, family member, or healthcare provider.",
                    "Take deep, slow breaths and step into a safe, calm environment."
                ],
                "thought_to_remember": "You are never alone. Reach out for help today.",
                "emotion_detected": "Severe Distress",
                "disclaimer": DISCLAIMER_TEXT.get(lang, DISCLAIMER_TEXT["en"]),
                "is_crisis": True
            }

        # Step 1, 2, 3: Deconstruct Query
        analysis = self.analyze_situation_and_emotion(query)
        emotion = analysis["emotion"]
        situation_tag = analysis["situation_tag"]
        latent_question = analysis["latent_question"]

        # Step 4 & 5: Search Knowledge Base via Vector Retrieval
        best_verse, score = self.gita_service.get_best_match(query, situation=situation_tag)
        is_direct_verse = (score >= 0.25 and best_verse is not None)

        if not best_verse and self.gita_service.verses_cache:
            best_verse = self.gita_service.verses_cache[0]
            is_direct_verse = False

        # Step 6, 7, 8, 9: Response Generation
        # Try configured LLM first
        llm_response = await self._generate_with_llm(
            query=query,
            emotion=emotion,
            latent_question=latent_question,
            verse=best_verse,
            is_direct_verse=is_direct_verse,
            language=lang,
            history=conversation_history
        )

        if llm_response:
            llm_response["emotion_detected"] = emotion
            llm_response["disclaimer"] = DISCLAIMER_TEXT.get(lang, DISCLAIMER_TEXT["en"])
            return llm_response

        # Fallback to Built-in Context Bridge Wisdom Engine
        return self._generate_builtin_response(
            query=query,
            analysis=analysis,
            verse=best_verse,
            is_direct_verse=is_direct_verse,
            language=lang
        )

    async def _generate_with_llm(
        self,
        query: str,
        emotion: str,
        latent_question: str,
        verse: Optional[Dict[str, Any]],
        is_direct_verse: bool,
        language: str,
        history: Optional[List[Dict[str, str]]] = None
    ) -> Optional[Dict[str, Any]]:
        """Invokes external LLM (Gemini / OpenAI) with strict contextual prompt."""
        if not (self.ai_provider.gemini_key or self.ai_provider.openai_key):
            return None

        verse_str = ""
        if verse:
            verse_str = (
                f"Chapter {verse.get('chapter_number')}, Verse {verse.get('verse_number')}\n"
                f"Sanskrit: {verse.get('slok_sanskrit')}\n"
                f"Transliteration: {verse.get('transliteration')}\n"
                f"English Translation: {verse.get('translation_en')}\n"
                f"Hindi Translation: {verse.get('translation_hi')}\n"
                f"Telugu Translation: {verse.get('translation_te')}\n"
                f"Explanation: {verse.get('explanation')}\n"
            )

        lang_instruction = {
            "en": "Respond in warm, articulate, culturally respectful English.",
            "hi": "Respond in natural, expressive, respectful Hindi (शुद्ध एवं सहज हिंदी में).",
            "te": "Respond in natural, conversational, respectful Telugu (సహజమైన, సరళమైన మరియు గౌరవప్రదమైన తెలుగులో). Do NOT use stiff literal machine translation."
        }.get(language, "Respond in English.")

        system_instruction = (
            "You are AI Krishna – Your Life Companion, an intelligent spiritual guidance system inspired by Lord Krishna's timeless teachings in the Bhagavad Gita.\n"
            "SAFETY & IDENTITY DIRECTIVES:\n"
            "- You are an AI companion inspired by Krishna's wisdom; you must never claim to literally be God or the historical deity.\n"
            "- Never judge, shame, or dismiss the user's real-world pain.\n"
            "- Embody Krishna's divine friend (Sakha) and guide demeanor: compassionate, deeply understanding, philosophical yet practical.\n"
            "- If drawing a broader philosophical connection rather than an exact scriptural answer, clearly state so.\n"
            "- You must return a valid JSON object matching the exact 6-part response structure.\n"
        )

        prompt = f"""
USER'S SITUATION & QUERY:
"{query}"

DETECTED EMOTIONS: {emotion}
UNDERLYING QUESTION: {latent_question}
TARGET LANGUAGE: {language} ({lang_instruction})

RETRIEVED BHAGAVAD GITA SCRIPTURE:
{verse_str}
Direct verse match: {is_direct_verse}

Generate a response adhering strictly to the 9-Step Context Bridge Engine.
Return ONLY a valid JSON object with these exact keys:
{{
  "situation_understanding": "Deep, empathetic reflection acknowledging their emotional pain, comparison, disappointment, or struggle (2-3 sentences)",
  "krishna_wisdom": "The philosophical teaching explaining why this happens and what eternal perspective transforms it (3-4 sentences)",
  "how_it_applies": "Practical bridge connecting the Kurukshetra dialogue to their modern daily life, career, or relationship (3-4 sentences)",
  "practical_steps": [
    "Step 1: Specific, immediately actionable micro-action",
    "Step 2: Mindset or habit adjustment",
    "Step 3: Reframing or long-term practice"
  ],
  "thought_to_remember": "A memorable, powerful golden sentence for the user to keep in their heart"
}}
"""

        try:
            raw_text = await self.ai_provider.generate_response(prompt, system_instruction=system_instruction)
            if not raw_text:
                return None

            clean_json = raw_text.strip()
            if "```json" in clean_json:
                clean_json = clean_json.split("```json")[1].split("```")[0].strip()
            elif "```" in clean_json:
                clean_json = clean_json.split("```")[1].split("```")[0].strip()

            parsed = json.loads(clean_json)

            v_obj = None
            if verse:
                trans_key = f"translation_{language}"
                translation_text = verse.get(trans_key) or verse.get("translation_en")
                v_obj = {
                    "id": verse.get("id"),
                    "chapter_number": verse.get("chapter_number"),
                    "verse_number": verse.get("verse_number"),
                    "slok_sanskrit": verse.get("slok_sanskrit"),
                    "transliteration": verse.get("transliteration"),
                    "translation": translation_text,
                    "chapter_title": verse.get("chapter_title_en") or f"Chapter {verse.get('chapter_number')}"
                }

            return {
                "situation_understanding": parsed.get("situation_understanding", ""),
                "krishna_wisdom": parsed.get("krishna_wisdom", ""),
                "verse": v_obj,
                "is_direct_verse": is_direct_verse,
                "how_it_applies": parsed.get("how_it_applies", ""),
                "practical_steps": parsed.get("practical_steps", []),
                "thought_to_remember": parsed.get("thought_to_remember", "")
            }
        except Exception as e:
            logger.warning(f"Error parsing LLM response: {e}")
            return None

    def _generate_builtin_response(
        self,
        query: str,
        analysis: Dict[str, Any],
        verse: Optional[Dict[str, Any]],
        is_direct_verse: bool,
        language: str
    ) -> Dict[str, Any]:
        """High quality deterministic fallback synthesized using the 9-step engine."""
        situation_tag = analysis["situation_tag"]
        emotion = analysis["emotion"]

        # Select verse translation for chosen language
        v_obj = None
        if verse:
            trans_key = f"translation_{language}"
            translation_text = verse.get(trans_key) or verse.get("translation_en")
            v_obj = {
                "id": verse.get("id"),
                "chapter_number": verse.get("chapter_number"),
                "verse_number": verse.get("verse_number"),
                "slok_sanskrit": verse.get("slok_sanskrit"),
                "transliteration": verse.get("transliteration"),
                "translation": translation_text,
                "chapter_title": f"Chapter {verse.get('chapter_number')}"
            }

        # Language specific contextual templates
        if language == "te":
            return self._builtin_telugu(query, situation_tag, emotion, v_obj, is_direct_verse)
        elif language == "hi":
            return self._builtin_hindi(query, situation_tag, emotion, v_obj, is_direct_verse)
        else:
            return self._builtin_english(query, situation_tag, emotion, v_obj, is_direct_verse)

    def _builtin_english(self, query, situation_tag, emotion, verse_obj, is_direct_verse) -> Dict[str, Any]:
        if situation_tag == "career":
            understanding = (
                "I deeply understand your disappointment. You have invested your heart, late hours, and sincere sweat into your work, "
                "yet you see colleagues receiving promotions and accolades while your efforts feel overlooked. It is completely natural to experience "
                "frustration, comparison, and a feeling that fairness has been denied to you."
            )
            wisdom = (
                "In the Bhagavad Gita, Lord Krishna addresses this exact human ache with Arjuna. When we surrender our peace of mind to external recognition—promotions, "
                "titles, or praise—we inadvertently hand our happiness over to factors we cannot control. True spiritual sovereignty (Nishkama Karma) means knowing that your hard work "
                "builds lasting internal mastery that no corporate decision or oversight can ever take away."
            )
            applies = (
                "Your colleagues' advancement does not diminish your competence or inherent dignity. In corporate life, promotions often hinge on visibility, politics, "
                "or timing that are outside your immediate sphere of influence. When you untangle your self-esteem from another person's trajectory and focus relentlessly "
                "on mastering your craft, your value becomes undeniable and your mind remains unshakeable."
            )
            steps = [
                "Separate Craft from Recognition: Dedicate the coming month to perfecting your skills with joy, treating your craft as an offering of excellence rather than a desperate bid for applause.",
                "Have an Objective Conversation: Schedule a calm, constructive alignment with your manager to ask: 'What specific measurable milestones will bridge my path to the next level?'",
                "Release Resentment: Bless your colleagues for their journey. Bitterness drains the cognitive energy you need to engineer your own breakthrough."
            ]
            thought = "Your worth is defined by the integrity of your effort, not by the applause of the crowd."

        elif situation_tag == "overthinking":
            understanding = (
                "I hear the noise and exhaustion in your mind. Overthinking is not a lack of intelligence; it is an active, creative mind trapped in "
                "cycles of future dread, hypothetical scenarios, and the agonizing need to control every outcome."
            )
            wisdom = (
                "Arjuna himself confessed to Lord Krishna that controlling the mind felt as impossible as holding back a hurricane (Ch 6.34). "
                "Krishna replied not with scolding, but with profound gentleness: 'Through patient, repeated practice (Abhyasa) and the art of letting go (Vairagya), "
                "the restless mind is tamed.' You do not need to silence every thought; you only need to stop believing everything the mind whispers."
            )
            applies = (
                "Most of the catastrophes you are replaying in your mind will never occur. Right now, your physical body is in the present moment, "
                "while your mind is running frantic marathons in an imaginary future. Bring your attention back to the breath, to this single task before you, "
                "and trust the unfolding of your life."
            )
            steps = [
                "Practice the 5-Minute Anchor: When thoughts spin out of control, pause, feel your feet firmly planted on the ground, and take 10 slow, conscious breaths.",
                "Write Down the Fear: Transfer your worries onto paper. Looking at them objectively robs them of their subconscious menace.",
                "Focus on the Next Right Step: Ask yourself: 'What is the single constructive action I can take in the next 15 minutes?' and do only that."
            ]
            thought = "Peace is not the absence of mental noise, but the decision to anchor yourself deeper than the storm."

        elif situation_tag == "anger control":
            understanding = (
                "I can sense the sharp sting of hurt and anger you are holding. When someone insults, betrays, or disrespects you, a surge of adrenaline "
                "demands retaliation to protect your self-esteem."
            )
            wisdom = (
                "In Chapter 2 (Verses 62-63), Krishna reveals the psychological anatomy of anger: expectation leads to attachment, attachment obstructed "
                "turns to fury, and unchecked fury destroys discrimination (Buddhi), leading to self-ruin. Anger is a fire that burns the vessel carrying it long before it touches anyone else."
            )
            applies = (
                "When someone insults or attacks you, their behavior reflects their own wounded consciousness, not your true identity. "
                "By reacting impulsively in rage, you allow their weakness to dictate your character. Responding with dignified silence or firm, measured calm "
                "preserves your energy and keeps your moral power intact."
            )
            steps = [
                "The 24-Hour Rule: Never send a message, email, or deliver a confrontation while your blood is hot. Step away until heart rate normalizes.",
                "Dismantle the Trigger: Ask yourself: 'Which fragile ego expectation was punctured here, and why does this person's opinion hold power over me?'",
                "Channel Energy into Constructive Action: Transform the fiery heat of anger into rigorous workout, deep study, or solving a practical problem."
            ]
            thought = "He who conquers his own anger wins a thousand battles without striking a single blow."

        elif situation_tag == "fear of failure":
            understanding = (
                "I recognize the paralyzing fear weighing upon you. You are on the precipice of an endeavor—a venture, exam, or ambition—and the dread of failing, "
                "being judged, or losing what you have invested is clouding your clarity."
            )
            wisdom = (
                "Krishna reminds us in Chapter 2, Verse 48 to remain 'Siddhy-asiddhyoḥ samo bhūtvā'—balanced in both triumph and defeat. "
                "In the cosmic perspective, worldly success and failure are merely passing ripples on the ocean of consciousness. An earnest effort undertaken with pure intention is never wasted."
            )
            applies = (
                "Failure is not an indictment of your existence; it is simply feedback on your method. When you reframe failure as data rather than identity, "
                "the suffocating pressure lifts. Your purpose is to play your role with courage and devotion; the universe handles the unfolding."
            )
            steps = [
                "Redefine Success: Measure success not by final applause, but by whether you gave your honest best and stood by your values today.",
                "Premortem Planning: Look realistically at the worst-case scenario and write down three practical ways you would recover if it happened.",
                "Take One Bold Step: Defeat paralysis by taking one tangible, imperfect step forward before the sun sets."
            ]
            thought = "Do not fear failure; fear only the stagnation of never having dared to answer your calling."

        else:
            understanding = (
                "I hear the depth of what you are sharing. Life frequently presents moments where our roadmap dissolves, our heart feels heavy, "
                "and the answers we seek cannot be found in conventional surface advice."
            )
            wisdom = (
                "The Bhagavad Gita is not a book of rigid dogma; it is an intimate conversation between a seeking soul and Divine Grace on a battlefield. "
                "Krishna assures us that every crisis is an invitation to shed an outdated illusion and discover an eternal reservoir of inner peace."
            )
            applies = (
                "Whatever challenge is currently testing you, know that you carry the strength within your soul to meet it. "
                "Ground yourself in righteousness, release the burden of over-controlling outcomes, and walk forward step by step with quiet trust."
            )
            steps = [
                "Breathe and Center: Spend 10 minutes in silence every morning connecting with your inner sanctuary.",
                "Identify Your Immediate Duty: Do the most urgent, righteous task with complete presence and dedication.",
                "Surrender the Anxiety: Remind yourself that a greater intelligence sustains the stars and will sustain you too."
            ]
            thought = "Stand firm like the eternal mountain; life's storms come only to wash away the dust."

        return {
            "situation_understanding": understanding,
            "krishna_wisdom": wisdom,
            "verse": verse_obj,
            "is_direct_verse": is_direct_verse,
            "how_it_applies": applies,
            "practical_steps": steps,
            "thought_to_remember": thought,
            "emotion_detected": emotion,
            "disclaimer": DISCLAIMER_TEXT["en"]
        }

    def _builtin_hindi(self, query, situation_tag, emotion, verse_obj, is_direct_verse) -> Dict[str, Any]:
        if situation_tag == "career":
            understanding = (
                "मैं आपकी निराशा और व्यथा को गहराई से समझ सकता हूँ। आपने अपने कार्य में निष्ठा, रात-दिन की मेहनत और पसीना बहाया है, "
                "परन्तु जब आप देखते हैं कि सहकर्मियों को पदोन्नति मिल रही है और आपके श्रम की उपेक्षा हो रही है, तो मन में तुलना, हताशा और अन्याय की भावना आना अत्यंत स्वाभाविक है।"
            )
            wisdom = (
                "भगवद्गीता में भगवान श्रीकृष्ण अर्जुन को इसी मानवीय पीड़ा का समाधान देते हैं। जब हम अपने मन की शांति को बाह्य परिणामों—जैसे पद, प्रशंसा या दूसरों की स्वीकृति—पर निर्भर कर देते हैं, "
                "तो हम अपनी प्रसन्नता की चाबी दूसरों के हाथों में सौंप देते हैं। निष्काम कर्मयोग हमें सिखाता है कि आपकी मेहनत से जो आत्म-सामर्थ्य और कौशल आपने अर्जित किया है, उसे कोई भी प्रबंधन या निर्णय आपसे नहीं छीन सकता।"
            )
            applies = (
                "दूसरों की उन्नति आपकी क्षमता को कम नहीं करती। कार्यक्षेत्र में कई बार पदोन्नति ऐसे कारकों पर निर्भर करती है जो आपके नियंत्रण से परे होते हैं। "
                "जब आप दूसरों से अपनी तुलना छोड़कर केवल अपने कर्म की गुणवत्ता को निखारने में प्राण लगा देते हैं, तो आपका प्रभाव अटल हो जाता है।"
            )
            steps = [
                "कर्म को पुरस्कार से अलग करें: अगले एक महीने तक अपने कार्य को एक पूजा और कला की तरह करें, न कि केवल प्रशंसा पाने की होड़ में।",
                "स्पष्ट संवाद करें: अपने वरिष्ठ अधिकारी से शांत और गरिमापूर्ण भाव से पूछें कि अगले स्तर तक पहुँचने के लिए आपको किन विशिष्ट पैमानों पर काम करना होगा।",
                "ईर्ष्या से मुक्त हों: सहकर्मियों को उनके मार्ग के लिए शुभकामना दें। नकारात्मकता में ऊर्जा नष्ट न करें, उसे अपनी उन्नति में लगाएं।"
            ]
            thought = "आपका वास्तविक मूल्य आपके कर्म की सत्यता में है, संसार की तालियों में नहीं।"

        elif situation_tag == "overthinking":
            understanding = (
                "मैं आपके मन की थकावट और अनवरत विचारों के भंवर को समझ सकता हूँ। आवश्यकता से अधिक सोचना कोई दुर्बलता नहीं, "
                "बल्कि एक सक्रिय मन की वह स्थिति है जो भविष्य की अनिश्चितताओं को अभी से नियंत्रित करने के फेर में उलझ गया है।"
            )
            wisdom = (
                "अर्जुन ने भी श्रीकृष्ण से यही कहा था कि इस चंचल मन को रोकना वायु को मुट्ठी में बांधने के समान कठिन है। "
                "तब भगवान ने स्नेहपूर्वक कहा था: 'अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते'—धैर्यपूर्ण निरंतर अभ्यास और अनावश्यक चिंताओं से विरक्ति के द्वारा ही मन शांत होता है।"
            )
            applies = (
                "जिन विपत्तियों की आप अपने मन में कल्पना कर रहे हैं, उनमें से अधिकांश कभी घटित नहीं होंगी। वर्तमान क्षण में आपका शरीर सुरक्षित है, "
                "परन्तु मन काल्पनिक भविष्य में भटक रहा है। अपनी चेतना को अपनी श्वास और इस क्षण के कर्तव्य पर वापस ले आइए।"
            )
            steps = [
                "5 मिनट का मौन: जब विचार अत्यधिक घूमने लगें, तो आँखें बंद करके अपनी नासिका से आती-जाती श्वास पर 10 बार ध्यान केंद्रित करें।",
                "चिंताओं को कागज़ पर लिखें: मन के भय को जब आप शब्दों में लिख देते हैं, तो उनका अज्ञात आतंक समाप्त हो जाता है।",
                "अगला छोटा कदम: अपने आप से पूछें: 'इस समय मैं कौन सा एक सार्थक काम कर सकता हूँ?' और उसी में लग जाएँ।"
            ]
            thought = "शांति विचारों के अभाव में नहीं, बल्कि अपने आपको आत्मा के गहरे सरोवर में स्थिर करने में है।"

        else:
            understanding = (
                "मैं आपके हृदय की बात को आदरपूर्वक समझ रहा हूँ। जीवन के इस मोड़ पर जो संशय, भय या उलझन आपको घेरे हुए है, "
                "उसमें स्वयं को अकेला या असहाय मत समझिए।"
            )
            wisdom = (
                "कुरुक्षेत्र का युद्ध केवल एक ऐतिहासिक घटना नहीं, हमारे भीतर चलने वाले प्रतिदिन के द्वंद्वों का प्रतीक है। "
                "श्रीकृष्ण हमें स्मरण कराते हैं कि आत्मा अविनाशी है और हमारे भीतर समस्त अंधकार को चीरने वाला प्रकाश पहले से उपस्थित है।"
            )
            applies = (
                "परिस्थितियाँ कितनी भी कठिन क्यों न दिखें, वे अनित्य हैं और बीत जाएँगी। सत्य, धैर्य और अपने स्वाभाविक धर्म के साथ डटे रहिए।"
            )
            steps = [
                "प्रातःकाल कुछ क्षण शांत ध्यान करें।",
                "फल की अत्यधिक चिंता किए बिना आज के मुख्य कर्तव्य को पूरा करें।",
                "ईश्वर पर पूर्ण विश्वास रखें; धर्म के मार्ग पर चलने वाले का कभी पतन नहीं होता।"
            ]
            thought = "संशय छोड़ो और विश्वास के साथ अपने कर्म में अग्रसर होओ; विजय धर्म की ही होती है।"

        return {
            "situation_understanding": understanding,
            "krishna_wisdom": wisdom,
            "verse": verse_obj,
            "is_direct_verse": is_direct_verse,
            "how_it_applies": applies,
            "practical_steps": steps,
            "thought_to_remember": thought,
            "emotion_detected": emotion,
            "disclaimer": DISCLAIMER_TEXT["hi"]
        }

    def _builtin_telugu(self, query, situation_tag, emotion, verse_obj, is_direct_verse) -> Dict[str, Any]:
        if situation_tag == "career":
            understanding = (
                "మీ మనస్సులోని బాధను, నిరాశను నేను హృదయపూర్వకంగా అర్థం చేసుకోగలను. మీరు మీ పనిలో అంకితభావాన్ని, చెమటను ధారపోశారు. "
                "అయినప్పటికీ తోటి ఉద్యోగులకు ప్రమోషన్లు లభిస్తూ, మీ కష్టానికి తగిన గుర్తింపు లభించలేదన్న భావన కలిగినప్పుడు నిరాశ, అసూయ మరియు మనోవేదన కలగడం సహజమే."
            )
            wisdom = (
                "భగవద్గీతలో శ్రీకృష్ణుడు అర్జునునికి చెప్పిన పరమ సత్యం 'కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన'. మన సంతోషాన్ని బాహ్య ఫలితాలపై, ప్రమోషన్లు లేదా ఇతరుల ప్రశంసలపై ఆధారపడేలా చేసినప్పుడు, "
                "మనం నియంత్రించలేని విషయాలకు బానిసలవుతాము. నిష్కామ కర్మయోగం అంటే మీ ప్రతిభను, నైపుణ్యాన్ని మీరు అంతర్గతంగా పెంపొందించుకోవడమే. ఆ జ్ఞానాన్ని ఏ బాస్ లేదా కంపెనీ నిర్ణయం కూడా లాక్కోలేదు."
            )
            applies = (
                "ఇతరుల విజయం మీ సామర్థ్యాన్ని ఏమాత్రం తగ్గించదు. ఉద్యోగ ప్రపంచంలో ప్రమోషన్లు కేవలం ప్రతిభపైనే కాక అనేక ఇతర పరిస్థితులపై ఆధారపడి ఉంటాయి. "
                "మీరు ఇతరులతో పోల్చుకోవడం మాని, మీ పనిని ఒక యజ్ఞంలా అత్యుత్తమంగా నిర్వహించడం కొనసాగిస్తే, మీ విలువ ఎవరికీ కాదనలేని విధంగా ప్రకాశిస్తుంది."
            )
            steps = [
                "పనిని ప్రశంసలతో ముడిపెట్టవద్దు: రాబోయే నెల రోజుల పాటు మీ పనిని కేవలం బాహ్య గుర్తింపు కోసం కాకుండా, మీ నైపుణ్యాన్ని పెంచుకునే సాధనగా భావించి చేయండి.",
                "స్పష్టమైన సంభాషణ: మీ మేనేజర్‌తో ప్రశాంతంగా మాట్లాడి, భవిష్యత్ ప్రమోషన్ కోసం మీరు ఏ అంశాలలో మెరుగుపడవలెనో నిర్దిష్టంగా తెలుసుకోండి.",
                "ద్వేషాన్ని విడనాడండి: మీ సహోద్యోగుల ప్రమోషన్‌ను చూసి అసూయ చెందకుండా వారిని ఆశీర్వదించండి. మీ శక్తిని ఇతరులను ద్వేషించడంలో వృథా చేయకండి."
            ]
            thought = "మీ విలువ మీరు చేసే నిష్కల్మషమైన కర్మలో ఉంది, ప్రపంచం ఇచ్చే చప్పట్లలో కాదు."

        elif situation_tag == "overthinking":
            understanding = (
                "మీ మనస్సులో సాగుతున్న ఆలోచనల తుఫానును నేను అనుభవిస్తున్నాను. అతిగా ఆలోచించడం బలహీనత కాదు, కానీ అది నియంత్రణ కోల్పోయిన మనస్సు యొక్క అస్థిరత."
            )
            wisdom = (
                "అర్జునుడు కూడా 'మనస్సును నిగ్రహించడం గాలిని ఆపడం కంటే కష్టం' అని వాపోయినప్పుడు, శ్రీకృష్ణుడు 'అభ్యాసం మరియు వైరాగ్యం ద్వారానే మనస్సు ప్రశాంతతను పొందుతుంది' అని ఓదార్పునిచ్చాడు. "
                "అన్ని ఆలోచనలను అణచివేయవలసిన అవసరం లేదు, వాటిలో ఏవి అనవసరమైనవో గుర్తించి వదిలివేయడమే వివేకం."
            )
            applies = (
                "మీరు భయపడుతున్న ఊహాజనిత కష్టాలలో తొంభై శాతం ఎన్నడూ జరగవు. మీ శరీరం వర్తమానంలో ఉంది, కానీ మనస్సు ఊహాత్మక భవిష్యత్తులో పరుగులు తీస్తోంది. "
                "మీ దృష్టిని ప్రస్తుత క్షణంలోకి, మీ శ్వాసలోకి తీసుకురండి."
            )
            steps = [
                "5 నిమిషాల శ్వాస సాధన: ఆలోచనలు ఎక్కువైనప్పుడు ప్రశాంతంగా కూర్చుని 10 సార్లు దీర్ఘ శ్వాస తీసుకోండి.",
                "భయాలను డైరీలో రాయండి: ఆలోచనలను కాగితంపై పెట్టినప్పుడు వాటి తీవ్రత క్రమంగా తగ్గిపోతుంది.",
                "చేయగలిగిన చిన్న పని: 'ఈ క్షణంలో నేను చేయగల ప్రయోజనకరమైన పని ఏమిటి?' అని ప్రశ్నించుకుని ఆ ఒక్క పనిని పూర్తి చేయండి."
            ]
            thought = "శాంతి అనేది ఆలోచనలు లేకపోవడం కాదు, మనస్సును ఆత్మయందు స్థిరపరచడం."

        else:
            understanding = (
                "మీరు ఎదుర్కొంటున్న సందిగ్ధతను నేను గౌరవంతో స్వీకరిస్తున్నాను. జీవితంలో మార్గం అస్పష్టంగా తోచినప్పుడు నిరాశ చెందవలసిన పనిలేదు."
            )
            wisdom = (
                "భగవద్గీత మనకు నేర్పేది ఏమిటంటే—ధర్మాన్ని ఆశ్రయించి నడిచే వ్యక్తికి దైవానుగ్రహం ఎల్లప్పుడూ తోడుగా ఉంటుంది. ఆత్మ నిత్యమైనది, అజేయమైనది."
            )
            applies = (
                "ప్రస్తుత కష్టాలు తాత్కాలికమైనవి. మీ అంతరంగంలోని వివేకాన్ని మేల్కొలిపి, ధైర్యంతో అడుగు ముందుకు వేయండి."
            )
            steps = [
                "రోజూ కొద్దిసేపు మనస్సును నిశ్శబ్దంగా ఉంచండి.",
                "ఫలితాన్ని దైవానికి వదిలి మీ కర్తవ్యాన్ని శ్రద్ధతో నిర్వర్తించండి.",
                "ఆత్మవిశ్వాసంతో ధర్మమార్గాన పయనించండి."
            ]
            thought = "భయపడకు, నీ కర్తవ్యాన్ని నిర్వహించు; ధర్మం నిన్ను సదా రక్షిస్తుంది."

        return {
            "situation_understanding": understanding,
            "krishna_wisdom": wisdom,
            "verse": verse_obj,
            "is_direct_verse": is_direct_verse,
            "how_it_applies": applies,
            "practical_steps": steps,
            "thought_to_remember": thought,
            "emotion_detected": emotion,
            "disclaimer": DISCLAIMER_TEXT["te"]
        }

context_bridge_engine = ContextBridgeEngine()

