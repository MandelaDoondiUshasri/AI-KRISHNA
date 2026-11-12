from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.daily import DailyWisdom
from app.models.gita import Verse
from app.schemas.daily import DailyWisdomOut
from app.schemas.gita import VerseOut

router = APIRouter(prefix="/daily", tags=["Daily Wisdom"])

@router.get("/today", response_model=DailyWisdomOut)
def get_daily_wisdom(db: Session = Depends(get_db)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    daily = db.query(DailyWisdom).filter(DailyWisdom.date_str == today_str).first()
    
    if not daily:
        # Dynamically rotate based on day of year
        day_of_year = datetime.utcnow().timetuple().tm_yday
        verses = db.query(Verse).order_by(Verse.id.asc()).all()
        if not verses:
            raise HTTPException(status_code=404, detail="No verses available in knowledge base")
        
        selected_verse = verses[day_of_year % len(verses)]

        daily = DailyWisdom(
            date_str=today_str,
            verse_id=selected_verse.id,
            reflection_en=(
                f"Today, contemplate on Chapter {selected_verse.chapter_number}, Verse {selected_verse.verse_number}. "
                f"Bring your awareness to the present action. Whatever task lies before you, execute it with purity and calm devotion, "
                f"unshackled from anxiety regarding future rewards."
            ),
            reflection_hi=(
                f"आज अध्याय {selected_verse.chapter_number}, श्लोक {selected_verse.verse_number} पर मनन करें। "
                f"अपने कर्म में पूर्ण उपस्थिति और निष्ठा रखें। परिणामों के भय से मुक्त होकर कर्तव्य पालन ही शांति का मार्ग है।"
            ),
            reflection_te=(
                f"ఈరోజు అధ్యాయం {selected_verse.chapter_number}, శ్లోకం {selected_verse.verse_number} పై ధ్యానం చేయండి. "
                f"మీ ముందున్న కర్తవ్యాన్ని శ్రద్ధతో, నిష్కామ భావంతో నిర్వర్తించండి. ఫలితం గురించిన ఆందోళనలను వదిలివేయండి."
            ),
            practical_focus="Practice mindful action without comparing yourself to others."
        )
        db.add(daily)
        db.commit()
        db.refresh(daily)

    verse_row = db.query(Verse).filter(Verse.id == daily.verse_id).first()
    return DailyWisdomOut(
        id=daily.id,
        date_str=daily.date_str,
        verse=VerseOut.model_validate(verse_row),
        reflection_en=daily.reflection_en,
        reflection_hi=daily.reflection_hi,
        reflection_te=daily.reflection_te,
        practical_focus=daily.practical_focus,
        created_at=daily.created_at
    )

@router.get("/archive")
def get_daily_archive(db: Session = Depends(get_db)):
    entries = db.query(DailyWisdom).order_by(DailyWisdom.date_str.desc()).limit(14).all()
    out = []
    for d in entries:
        verse_row = db.query(Verse).filter(Verse.id == d.verse_id).first()
        out.append({
            "id": d.id,
            "date_str": d.date_str,
            "verse": VerseOut.model_validate(verse_row) if verse_row else None,
            "reflection_en": d.reflection_en,
            "reflection_hi": d.reflection_hi,
            "reflection_te": d.reflection_te,
            "practical_focus": d.practical_focus,
            "created_at": d.created_at
        })
    return out

