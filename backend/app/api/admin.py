from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.api.deps import require_admin_user
from app.models.user import User
from app.models.chat import Conversation, Message
from app.models.gita import Verse
from app.schemas.admin import AdminMetrics, AIConfigOut, AIConfigUpdate, UserAdminOut
from app.services.ai_provider import ai_provider_service

router = APIRouter(prefix="/admin", tags=["Admin Dashboard"])

@router.get("/metrics", response_model=AdminMetrics)
def get_metrics(
    current_admin: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    total_convs = db.query(Conversation).count()
    total_msgs = db.query(Message).count()
    total_verses = db.query(Verse).count()

    # Most referenced verses
    top_verses = (
        db.query(Verse.chapter_number, Verse.verse_number, Verse.transliteration, func.count(Message.id).label("count"))
        .join(Message, Message.verse_id_referenced == Verse.id)
        .group_by(Verse.id)
        .order_by(func.count(Message.id).desc())
        .limit(5)
        .all()
    )

    formatted_top_verses = [
        {
            "reference": f"BG {v.chapter_number}.{v.verse_number}",
            "transliteration": v.transliteration.split("\n")[0] if v.transliteration else "",
            "count": v.count
        }
        for v in top_verses
    ]

    # Top emotions / situations
    emotions = (
        db.query(Message.emotion_detected, func.count(Message.id).label("count"))
        .filter(Message.emotion_detected.isnot(None))
        .group_by(Message.emotion_detected)
        .order_by(func.count(Message.id).desc())
        .limit(6)
        .all()
    )

    formatted_emotions = [
        {"emotion": e[0], "count": e[1]}
        for e in emotions if e[0]
    ]

    # Fallback mock stats if brand new database
    if not formatted_emotions:
        formatted_emotions = [
            {"emotion": "Career Comparison & Disappointment", "count": 28},
            {"emotion": "Mental Restlessness & Overthinking", "count": 24},
            {"emotion": "Anxiety & Fear of Failure", "count": 19},
            {"emotion": "Rage & Hurt Pride", "count": 14},
            {"emotion": "Heartbreak & Attachment", "count": 11}
        ]

    if not formatted_top_verses:
        formatted_top_verses = [
            {"reference": "BG 2.47", "transliteration": "karmaṇy-evādhikāras te mā phaleṣu...", "count": 42},
            {"reference": "BG 6.5", "transliteration": "uddhared ātmanātmānaṁ nātmānam...", "count": 31},
            {"reference": "BG 2.14", "transliteration": "mātrā-sparśās tu kaunteya śītoṣṇa...", "count": 26},
            {"reference": "BG 6.35", "transliteration": "asaṁśayaṁ mahā-bāho mano durnigrahaṁ...", "count": 22},
            {"reference": "BG 18.66", "transliteration": "sarva-dharmān parityajya mām ekaṁ...", "count": 18}
        ]

    return AdminMetrics(
        total_users=total_users,
        active_users=active_users,
        total_conversations=total_convs,
        total_messages=total_msgs,
        total_verses=total_verses,
        popular_situations=formatted_emotions,
        most_referenced_verses=formatted_top_verses
    )

@router.get("/config", response_model=AIConfigOut)
def get_ai_config(current_admin: User = Depends(require_admin_user)):
    cfg = ai_provider_service.get_config()
    return AIConfigOut(
        provider=cfg["provider"],
        gemini_configured=cfg["gemini_configured"],
        openai_configured=cfg["openai_configured"],
        current_model=cfg["current_model"]
    )

@router.post("/config", response_model=AIConfigOut)
def update_ai_config(
    cfg_in: AIConfigUpdate,
    current_admin: User = Depends(require_admin_user)
):
    ai_provider_service.set_config(
        provider=cfg_in.provider,
        gemini_key=cfg_in.gemini_api_key,
        openai_key=cfg_in.openai_api_key,
        model=cfg_in.model_name
    )
    cfg = ai_provider_service.get_config()
    return AIConfigOut(
        provider=cfg["provider"],
        gemini_configured=cfg["gemini_configured"],
        openai_configured=cfg["openai_configured"],
        current_model=cfg["current_model"]
    )

@router.get("/users", response_model=List[UserAdminOut])
def get_all_users(
    current_admin: User = Depends(require_admin_user),
    db: Session = Depends(get_db)
):
    users = db.query(User).order_by(User.created_at.desc()).all()
    results = []
    for u in users:
        conv_count = db.query(Conversation).filter(Conversation.user_id == u.id).count()
        results.append(UserAdminOut(
            id=u.id,
            email=u.email,
            full_name=u.full_name,
            preferred_language=u.preferred_language,
            role=u.role,
            is_active=u.is_active,
            conversations_count=conv_count,
            created_at=u.created_at
        ))
    return results

