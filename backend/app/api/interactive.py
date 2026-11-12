import json
import datetime
from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.interactive import UserQuizProgress, UserDailyChallenge, UserLetter
from app.api.deps import get_current_user
from app.services.interactive_service import interactive_service
from app.schemas.interactive import (
    DecodeProblemRequest, QuizSubmitRequest, LetterRequest, ChallengeToggleRequest
)

router = APIRouter(prefix="/interactive", tags=["Interactive Features"])

DEFAULT_CHALLENGES = {
    "focus": [
        {"id": 1, "title": "5-minute breath observance (Abhyasa) before touching phone", "completed": False},
        {"id": 2, "title": "45 minutes of single-task work without distraction", "completed": False},
        {"id": 3, "title": "Clean your workstation as a sacred altar", "completed": False}
    ],
    "peace": [
        {"id": 1, "title": "Take 3 deep breaths before replying when provoked", "completed": False},
        {"id": 2, "title": "Let someone else have the last word in a discussion", "completed": False},
        {"id": 3, "title": "10-minute mindful walk observing nature without judgment", "completed": False}
    ],
    "service": [
        {"id": 1, "title": "Offer an unprompted sincere appreciation to a coworker", "completed": False},
        {"id": 2, "title": "Perform one secret helpful deed with zero expectation", "completed": False},
        {"id": 3, "title": "Listen to a friend for 5 minutes without giving advice", "completed": False}
    ],
    "courage": [
        {"id": 1, "title": "Make the phone call or send the email you have been dreading", "completed": False},
        {"id": 2, "title": "Speak your honest, respectful truth where you normally stay quiet", "completed": False},
        {"id": 3, "title": "Reframe your biggest current obstacle as Krishna's training", "completed": False}
    ],
    "clarity": [
        {"id": 1, "title": "Write down 3 things outside your control and mentally surrender them", "completed": False},
        {"id": 2, "title": "Journal about your authentic Swadharma for 10 minutes", "completed": False},
        {"id": 3, "title": "End the day thanking 3 people who helped you in life", "completed": False}
    ]
}

# 1. MOOD MIRROR
@router.get("/moods")
def get_moods():
    return interactive_service.get_moods()

@router.get("/mood/{mood_id}")
def get_mood_guidance(
    mood_id: str,
    language: str = Query("en", description="Preferred language (en, hi, te)"),
    db: Session = Depends(get_db)
):
    return interactive_service.get_mood_guidance(mood_id, db, language)

# 2. RANDOM WISDOM
@router.get("/random-wisdom")
def get_random_wisdom(
    language: str = Query("en", description="Preferred language (en, hi, te)"),
    db: Session = Depends(get_db)
):
    return interactive_service.get_random_wisdom(db, language)

# 3. DECODE MY PROBLEM
@router.post("/decode-problem")
def decode_problem(
    req: DecodeProblemRequest,
    db: Session = Depends(get_db)
):
    if not req.problem_text or len(req.problem_text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Please provide a brief description of your situation.")
    return interactive_service.decode_problem(req.problem_text, db, req.language or "en")

# 4. IF YOU WERE ARJUNA
@router.get("/arjuna-scenarios")
def get_arjuna_scenarios():
    return interactive_service.get_arjuna_scenarios()

# 5. MYTH VS TRUTH
@router.get("/myths")
def get_myths():
    return interactive_service.get_myths()

# 6. KRISHNA'S WISDOM QUIZ
@router.get("/quiz")
def get_quiz(
    language: str = Query("en", description="Preferred language (en, hi, te)")
):
    return interactive_service.get_quiz_questions(language)

@router.post("/quiz/submit")
def submit_quiz_score(
    req: QuizSubmitRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user.id if current_user else None
    
    # Query or create progress
    progress = None
    if user_id:
        progress = db.query(UserQuizProgress).filter(UserQuizProgress.user_id == user_id).first()
    elif req.session_id:
        progress = db.query(UserQuizProgress).filter(UserQuizProgress.session_id == req.session_id).first()

    if not progress:
        progress = UserQuizProgress(
            user_id=user_id,
            session_id=req.session_id,
            total_score=0,
            quizzes_taken=0,
            badges="[]",
            level="Seeker (जिज्ञासु)"
        )
        db.add(progress)

    progress.total_score += req.score
    progress.quizzes_taken += 1

    # Badges calculation
    try:
        current_badges = json.loads(progress.badges)
    except Exception:
        current_badges = []

    if progress.quizzes_taken >= 1 and "First Step (आरंभ)" not in current_badges:
        current_badges.append("First Step (आरंभ)")
    if progress.total_score >= 30 and "Gita Disciple (शिष्य)" not in current_badges:
        current_badges.append("Gita Disciple (शिष्य)")
    if progress.total_score >= 50 and "Karma Yogi (कर्मयोगी)" not in current_badges:
        current_badges.append("Karma Yogi (कर्मयोगी)")
        progress.level = "Karma Yogi (కర్మయోగి)"
    if progress.total_score >= 100 and "Stitha-Prajna (स्थितप्रज्ञ)" not in current_badges:
        current_badges.append("Stitha-Prajna (स्थितप्रज्ञ)")
        progress.level = "Wisdom Master (స్థితప్రజ్ఞుడు)"

    progress.badges = json.dumps(current_badges)
    db.commit()
    db.refresh(progress)

    return {
        "total_score": progress.total_score,
        "quizzes_taken": progress.quizzes_taken,
        "badges": current_badges,
        "level": progress.level
    }

# 7. EXPLAIN LIKE I'M 10 (ELI10)
@router.get("/eli10/{chapter}/{verse}")
def get_eli10(
    chapter: int,
    verse: int,
    language: str = Query("en", description="Preferred language (en, hi, te)"),
    db: Session = Depends(get_db)
):
    return interactive_service.get_eli10_explanation(chapter, verse, db, language)

# 8. LETTER TO KRISHNA
@router.post("/letter")
def send_letter(
    req: LetterRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not req.letter_text or len(req.letter_text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please pour at least a couple of sentences into your letter.")

    reply_data = interactive_service.generate_letter_reply(req.letter_text, req.language or "en")

    # If user requests persistence and is logged in / has session
    saved_id = None
    if not req.is_ephemeral:
        letter_record = UserLetter(
            user_id=current_user.id if current_user else None,
            session_id=req.session_id,
            title=req.title or "Letter to Krishna",
            letter_content=req.letter_text,
            reply_content=reply_data["body"],
            verse_referenced=reply_data.get("verse_referenced"),
            is_ephemeral=False
        )
        db.add(letter_record)
        db.commit()
        db.refresh(letter_record)
        saved_id = letter_record.id

    return {
        "letter_id": saved_id,
        "salutation": reply_data["salutation"],
        "reply": reply_data["body"],
        "closing": reply_data["closing"],
        "verse_referenced": reply_data.get("verse_referenced"),
        "is_ephemeral": req.is_ephemeral
    }

@router.get("/letters/my")
def get_my_letters(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        return []
    letters = db.query(UserLetter).filter(
        UserLetter.user_id == current_user.id,
        UserLetter.is_ephemeral == False
    ).order_by(UserLetter.created_at.desc()).all()
    return [
        {
            "id": l.id,
            "title": l.title,
            "letter_content": l.letter_content,
            "reply_content": l.reply_content,
            "verse_referenced": l.verse_referenced,
            "created_at": l.created_at.isoformat()
        }
        for l in letters
    ]

# 9. INTERACTIVE KURUKSHETRA
@router.get("/kurukshetra")
def get_kurukshetra():
    return interactive_service.get_kurukshetra_stages()

# 10. WHAT SHOULD I DO TODAY? (DAILY CHALLENGES)
@router.get("/daily-challenges")
def get_daily_challenges(
    goal: str = Query("focus", description="Goal type: focus, peace, service, courage, clarity"),
    session_id: Optional[str] = Query(None),
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    today_str = datetime.date.today().isoformat()
    user_id = current_user.id if current_user else None

    # Find today's challenge
    record = None
    if user_id:
        record = db.query(UserDailyChallenge).filter(
            UserDailyChallenge.user_id == user_id,
            UserDailyChallenge.date_str == today_str
        ).first()
    elif session_id:
        record = db.query(UserDailyChallenge).filter(
            UserDailyChallenge.session_id == session_id,
            UserDailyChallenge.date_str == today_str
        ).first()

    if not record:
        tasks = DEFAULT_CHALLENGES.get(goal, DEFAULT_CHALLENGES["focus"])
        record = UserDailyChallenge(
            user_id=user_id,
            session_id=session_id,
            date_str=today_str,
            goal_type=goal,
            challenges=json.dumps(tasks),
            streak_count=1,
            is_completed=False
        )
        db.add(record)
        db.commit()
        db.refresh(record)

    tasks_list = json.loads(record.challenges)
    return {
        "date": record.date_str,
        "goal_type": record.goal_type,
        "challenges": tasks_list,
        "streak_count": record.streak_count,
        "is_completed": record.is_completed
    }

@router.post("/daily-challenges/toggle")
def toggle_challenge_task(
    req: ChallengeToggleRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    today_str = datetime.date.today().isoformat()
    user_id = current_user.id if current_user else None

    record = None
    if user_id:
        record = db.query(UserDailyChallenge).filter(
            UserDailyChallenge.user_id == user_id,
            UserDailyChallenge.date_str == today_str
        ).first()
    elif req.session_id:
        record = db.query(UserDailyChallenge).filter(
            UserDailyChallenge.session_id == req.session_id,
            UserDailyChallenge.date_str == today_str
        ).first()

    if not record:
        tasks = DEFAULT_CHALLENGES.get(req.goal_type, DEFAULT_CHALLENGES["focus"])
        record = UserDailyChallenge(
            user_id=user_id,
            session_id=req.session_id,
            date_str=today_str,
            goal_type=req.goal_type,
            challenges=json.dumps(tasks),
            streak_count=1,
            is_completed=False
        )
        db.add(record)

    tasks_list = json.loads(record.challenges)
    for t in tasks_list:
        if t["id"] == req.task_id:
            t["completed"] = not t["completed"]
            break

    record.challenges = json.dumps(tasks_list)
    all_done = all(t["completed"] for t in tasks_list)
    record.is_completed = all_done
    db.commit()
    db.refresh(record)

    return {
        "date": record.date_str,
        "goal_type": record.goal_type,
        "challenges": tasks_list,
        "streak_count": record.streak_count,
        "is_completed": record.is_completed
    }
