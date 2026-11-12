from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.gita import Chapter, Verse
from app.schemas.gita import ChapterOut, VerseOut, GitaSearchResponse
from app.services.gita_knowledge import gita_knowledge_service

router = APIRouter(prefix="/gita", tags=["Bhagavad Gita Knowledge Base"])

LIFE_SITUATIONS = [
    {
        "id": "career",
        "title": "Career & Workplace",
        "title_en": "Career & Workplace",
        "title_hi": "करियर एवं कार्यक्षेत्र",
        "title_te": "కెరీర్ & కార్యాలయం",
        "icon": "briefcase",
        "description": "Navigating office politics, comparison, delayed appraisals, and authentic calling (Swadharma)."
    },
    {
        "id": "overthinking",
        "title": "Overthinking & Anxiety",
        "title_en": "Overthinking & Anxiety",
        "title_hi": "अति-विचार एवं चिंता",
        "title_te": "అతిగా ఆలోచించడం & ఆందోళన",
        "icon": "brain",
        "description": "Quieting a racing mind, future dread, sleeplessness, and finding inner stillness."
    },
    {
        "id": "fear of failure",
        "title": "Fear of Failure",
        "title_en": "Fear of Failure",
        "title_hi": "असफलता का भय",
        "title_te": "ఓటమి భయం",
        "icon": "shield-alert",
        "description": "Overcoming the paralyzing dread of setbacks, startup risk, and exam stress."
    },
    {
        "id": "anger control",
        "title": "Anger & Hurt Ego",
        "title_en": "Anger & Hurt Ego",
        "title_hi": "क्रोध एवं आहत अहंकार",
        "title_te": "కోపం & ఆవేశం",
        "icon": "flame",
        "description": "Cooling impulsive fury, handling insults, and breaking the destructive chain reaction of rage."
    },
    {
        "id": "relationships",
        "title": "Relationships & Detachment",
        "title_en": "Relationships & Detachment",
        "title_hi": "रिश्ते एवं वैराग्य",
        "title_te": "సంబంధాలు & వైరాగ్యం",
        "icon": "heart-handshake",
        "description": "Loving unconditionally without possessive attachment, heartbreak, and managing toxic ties."
    },
    {
        "id": "purpose",
        "title": "Purpose & Direction",
        "title_en": "Purpose & Direction",
        "title_hi": "जीवन उद्देश्य एवं दिशा",
        "title_te": "జీవిత గమ్యం & దిశ",
        "icon": "compass",
        "description": "Rediscovering meaning when feeling empty, lost, or facing monumental life crossroads."
    },
    {
        "id": "grief",
        "title": "Grief, Loss & Mortality",
        "title_en": "Grief, Loss & Mortality",
        "title_hi": "शोक एवं क्षति",
        "title_te": "దుఃఖం & నష్టం",
        "icon": "feather",
        "description": "Coping with the loss of loved ones, impermanence, and recognizing the eternal nature of the soul."
    },
    {
        "id": "focus",
        "title": "Discipline & Meditation",
        "title_en": "Discipline & Meditation",
        "title_hi": "अनुशासन एवं ध्यान",
        "title_te": "క్రమశిక్షణ & ధ్యానం",
        "icon": "target",
        "description": "Overcoming procrastination, addictions, distractions, and building relentless consistency."
    }
]

@router.get("/chapters", response_model=List[ChapterOut])
def get_chapters(db: Session = Depends(get_db)):
    chapters = db.query(Chapter).order_by(Chapter.chapter_number.asc()).all()
    return chapters

@router.get("/chapters/{chapter_number}")
def get_chapter_detail(chapter_number: int, db: Session = Depends(get_db)):
    chapter = db.query(Chapter).filter(Chapter.chapter_number == chapter_number).first()
    if not chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
    verses = db.query(Verse).filter(Verse.chapter_number == chapter_number).order_by(Verse.verse_number.asc()).all()
    return {
        "chapter": ChapterOut.model_validate(chapter),
        "verses": [VerseOut.model_validate(v) for v in verses]
    }

@router.get("/verses/{chapter_number}/{verse_number}", response_model=VerseOut)
def get_verse(chapter_number: int, verse_number: int, db: Session = Depends(get_db)):
    verse = db.query(Verse).filter(
        Verse.chapter_number == chapter_number,
        Verse.verse_number == verse_number
    ).first()
    if not verse:
        raise HTTPException(status_code=404, detail="Verse not found")
    return verse

@router.get("/search", response_model=GitaSearchResponse)
def search_verses(
    q: Optional[str] = Query(None, description="Search keyword or query"),
    situation: Optional[str] = Query(None, description="Filter by life situation"),
    chapter: Optional[int] = Query(None, description="Filter by chapter number"),
    db: Session = Depends(get_db)
):
    query_str = q or ""
    
    # If query is provided, use our hybrid vector + keyword service
    if query_str.strip() or situation:
        results = gita_knowledge_service.search_verses(
            query=query_str,
            situation=situation,
            chapter_number=chapter,
            top_k=20
        )
        # Load from DB for consistency
        db_verses = []
        for v_dict, score in results:
            v_row = db.query(Verse).filter(
                Verse.chapter_number == v_dict["chapter_number"],
                Verse.verse_number == v_dict["verse_number"]
            ).first()
            if v_row:
                db_verses.append(v_row)
        return GitaSearchResponse(total=len(db_verses), results=[VerseOut.model_validate(v) for v in db_verses])

    # Otherwise browse by chapter or list all
    db_query = db.query(Verse)
    if chapter:
        db_query = db_query.filter(Verse.chapter_number == chapter)
    verses = db_query.order_by(Verse.chapter_number.asc(), Verse.verse_number.asc()).all()
    return GitaSearchResponse(total=len(verses), results=[VerseOut.model_validate(v) for v in verses])

@router.get("/situations")
def get_situations():
    return LIFE_SITUATIONS

