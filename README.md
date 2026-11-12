# AI KRISHNA – YOUR LIFE COMPANION
### *When life gets confusing, find clarity through timeless wisdom.*

![Platform](https://img.shields.io/badge/Platform-AI%20KRISHNA-0A192F?style=for-the-badge&logo=lotus&logoColor=F1B941)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Intelligence](https://img.shields.io/badge/AI%20Engine-Context%20Bridge%20v1.0-F1B941?style=for-the-badge)

---

## 1. Vision & Overview
**AI KRISHNA – Your Life Companion** is a spiritual guidance platform inspired by the eternal teachings of Lord Krishna in the **Bhagavad Gita**. 

Modern life presents immense psychological and emotional storms: workplace comparison, burnout, career confusion, anxiety about the future, fear of failure, relationship conflicts, and existential directionlessness. 

Rather than serving as a basic quote chatbot, **AI Krishna** deploys the proprietary **CONTEXT BRIDGE ENGINE**:
1. Deeply understands the seeker's real-life predicament.
2. Identifies the latent emotion, fear, and core inquiry.
3. Retrieves authentic Bhagavad Gita scripture (all 18 chapters and key curated verses).
4. Bridges ancient battlefield philosophy with contemporary life.
5. Formulates a personalized, 6-part empathetic roadmap with concrete actionable steps.

---

## 2. Technology Stack

### Frontend:
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Divine royal navy `#0B192C`, peacock blue `#008DDA`, golden amber `#F1B941`, warm ivory `#FAF8F5`)
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS keyframe glows

### Backend:
- **Framework**: Python 3.13, FastAPI (REST APIs)
- **Database**: SQLite (default out-of-the-box) / PostgreSQL (production ready via SQLAlchemy)
- **Vector Search & RAG**: Scikit-Learn TF-IDF Cosine Similarity & FAISS vector embeddings
- **Authentication**: JWT Bearer tokens with bcrypt password hashing
- **AI Orchestration**: Configurable Multi-provider adapter:
  - **Built-in Wisdom Engine** (Offline, high-precision deterministic synthesis)
  - **Google Gemini API** (`gemini-1.5-flash` / `pro`)
  - **OpenAI API** (`gpt-4o-mini` / `gpt-4o`)

---

## 3. The 9-Step Context Bridge Engine Pipeline

```
[Step 1: User Problem Ingestion]
                ↓
[Step 2: Emotion & Context Extraction] (e.g., Disappointment, comparison, overwhelm)
                ↓
[Step 3: Latent Inquiry Pinpointed] ("Why did my sincere effort fail to yield worldly recognition?")
                ↓
[Step 4: Semantic Gita Search] (Vector cosine ranking across 18 chapters)
                ↓
[Step 5: Verse & Chapter Identification] (e.g. Chapter 2, Verse 47 - Nishkama Karma)
                ↓
[Step 6: Classical Scriptural Grounding] (Original dialogue between Krishna and Arjuna)
                ↓
[Step 7: Real-Life Contextual Bridge] (Translating battlefield metaphor to workplace/relationship)
                ↓
[Step 8: 6-Part Structured Response Synthesis] (EN / HI / TE)
                ↓
[Step 9: Micro-Action Roadmap & Thought to Remember]
```

### The 6-Part Response Format:
1. **Understanding Your Situation**: Empathetic acknowledgment of the seeker's pain, disappointment, or anxiety.
2. **Krishna's Wisdom**: The core philosophical truth explaining why this occurs and what perspective transforms it.
3. **Relevant Bhagavad Gita Verse**: Devanagari Sanskrit + Roman transliteration + Chapter:Verse reference + translation in selected language.
4. **How This Applies to Your Life**: Direct, practical translation to the modern situation.
5. **Practical Steps You Can Take**: Micro-actions with interactive check-off capabilities.
6. **A Thought to Remember**: A golden aphorism to carry throughout the day.

---

## 4. Key Features & Application Modules

### 1. Landing Page
- Divine hero section with royal peacock aesthetics and golden gradients.
- "How AI Krishna Works" visualizer detailing the 9-step engine.
- "Wisdom for Everyday Life" interactive cards for career, overthinking, anger, relationships, and purpose.
- Interactive showcase for all 18 Chapters and 700 Verses.
- Multilingual interactive live preview switcher.
- FAQ accordion and respectful disclaimer footer.

### 2. Conversational Chat Interface
- Real-time conversation thread with Krishna and seeker speech bubbles.
- Typing animations with glowing aura indicators.
- Quick suggested question chips:
  - *"I am working very hard, but my colleagues are getting promotions while I am not. I feel disappointed."*
  - *"I am confused about my career."*
  - *"I am afraid of failure."*
  - *"I cannot stop overthinking."*
  - *"I am facing relationship problems."*
  - *"I feel lost in life."*
  - *"How can I control my anger?"*
- Interactive 6-part response cards with verse copying, regenerative wisdom, and one-click bookmarking.
- Sidebar with conversation history, new dialogue creation, and deletion.

### 3. Bhagavad Gita Explorer
- Browse all 18 chapters with Sanskrit titles, transliteration, English names, verse counts, and summaries.
- Search verses by keyword, life situation tag (Career, Anxiety, Anger, Relationships, Purpose, Grief, Focus), or Chapter number.
- Detailed Verse Modal with Devanagari, IAST transliteration, English/Hindi/Telugu translations, and full philosophical purports.

### 4. Daily Wisdom
- Today's verse of the day based on cosmic calendar rotation.
- Devanagari Sanskrit + Roman transliteration.
- Multilingual translation toggle.
- "Why This Matters Today" and "Today's Practical Focus".
- One-click share and bookmark capabilities.
- 14-day contemplation archive.

### 5. User Personalization & Saved Wisdom
- User registration, login, and secure session management.
- Personal treasury of saved verses and dialogues.
- Preferred language persistence (English, हिन्दी, తెలుగు).

### 6. Control Tower & Admin Dashboard
- Metrics KPI cards: Total registered users, active sessions, total messages, Gita corpus statistics.
- Most frequent life predicaments consulted breakdown.
- Most cited Bhagavad Gita verses counter.
- Dynamic AI Provider switcher (Built-in, Gemini, OpenAI) with live key updates.
- Registered users management table.

---

## 5. Quick Start & Local Setup Instructions

### Prerequisites
- **Python**: 3.10+ (tested on Python 3.13)
- **Node.js**: v18+ (tested on Node v24)
- **npm** or **npm.cmd**

### 1. Launching the Backend

From the repository root:
```powershell
# Option A: Double-click or run the batch script
.\run_backend.bat

# Option B: Run via PowerShell
.\run_backend.ps1

# Option C: Direct terminal command
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The FastAPI backend will start at: **`http://localhost:8000`**
- Interactive Swagger API Documentation: **`http://localhost:8000/docs`**
- ReDoc API Documentation: **`http://localhost:8000/redoc`**

### 2. Launching the Frontend

In a separate terminal:
```powershell
# Option A: Double-click or run the batch script
.\run_frontend.bat

# Option B: Run via PowerShell
.\run_frontend.ps1

# Option C: Direct terminal command
cd frontend
npm.cmd run dev
```
The React frontend will be accessible at: **`http://localhost:5173`**

---

## 6. Pre-configured Credentials

The application automatically seeds initial accounts for instant testing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@aikrishna.life` | `DivineAdmin2026!Krishna` |
| **Demo Seeker** | `arjuna@pandava.org` | `ParthaGita2026!` |

*(You can also click the "Demo Seeker" or "Demo Admin" buttons inside the Sign In modal for 1-click auto-fill).*

---

## 7. Running Verification Tests

To execute the automated end-to-end verification suite:
```powershell
cd backend
python test_all_features.py
```
This tests:
- Backend Health Check
- All 18 Gita Chapters and verse counts
- Semantic Gita Search across life situations
- Daily Wisdom generation
- JWT registration and authentication
- Context Bridge Engine on the exact career comparison scenario
- Telugu and Hindi multilingual outputs
- Admin metrics and configuration
- User bookmarks and personalization

---

## 8. REST API Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account.
- `POST /api/auth/login` - Authenticate and return JWT token.
- `GET /api/auth/me` - Fetch profile for authenticated user.

### Chat & Context Bridge (`/api/chat`)
- `GET /api/chat/conversations` - List conversations for user/guest.
- `POST /api/chat/conversations` - Create new conversation thread.
- `GET /api/chat/conversations/{id}` - Retrieve message history.
- `DELETE /api/chat/conversations/{id}` - Delete conversation.
- `POST /api/chat/message` - Send message, triggers 9-step Context Bridge Engine.
- `POST /api/chat/message/regenerate` - Regenerate last Krishna response.

### Bhagavad Gita Knowledge Base (`/api/gita`)
- `GET /api/gita/chapters` - List all 18 chapters.
- `GET /api/gita/chapters/{chapter_number}` - Details and verses for chapter.
- `GET /api/gita/verses/{chapter_number}/{verse_number}` - Detailed verse view.
- `GET /api/gita/search?q=...&situation=...` - Hybrid semantic search.
- `GET /api/gita/situations` - Predefined life situation categories.

### Daily Wisdom (`/api/daily`)
- `GET /api/daily/today` - Today's contemplation verse and focus.
- `GET /api/daily/archive` - Past 14 days archive.

### Personalization (`/api/user`)
- `PUT /api/user/preferences` - Update user name and language.
- `GET /api/user/favorites` - Retrieve saved bookmarks.
- `POST /api/user/favorites` - Save verse or reflection.
- `DELETE /api/user/favorites/{id}` - Remove bookmark.

### Admin Dashboard (`/api/admin`)
- `GET /api/admin/metrics` - Platform stats, popular predicaments, top verses.
- `GET /api/admin/config` - Active AI provider settings.
- `POST /api/admin/config` - Update AI provider and API keys.
- `GET /api/admin/users` - Registered seekers list.

---

## 9. Spiritual Integrity & Safety Guardrails
1. **Clear Identity**: AI Krishna explicitly identifies as an AI spiritual companion inspired by the Bhagavad Gita and never claims to be God or the historical deity.
2. **Authentic Attribution**: Scripture is strictly drawn from authentic sources across all 18 chapters. If no direct verse exists, the system honestly indicates that it is drawing a broader philosophical connection.
3. **Compassionate Non-Judgment**: The companion communicates with the warmth, patience, and elevate-minded counsel Krishna demonstrated to Arjuna.
4. **Crisis Care**: Keyword triggers for self-harm or deep psychological despair immediately display emergency helpline numbers (Tele-MANAS `14416`, Vandrevala Foundation `+91 9999 666 555`, US `988`).

