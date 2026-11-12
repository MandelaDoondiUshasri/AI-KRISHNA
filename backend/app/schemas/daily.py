from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from app.schemas.gita import VerseOut

class DailyWisdomOut(BaseModel):
    id: int
    date_str: str
    verse: VerseOut
    reflection_en: str
    reflection_hi: Optional[str] = None
    reflection_te: Optional[str] = None
    practical_focus: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class FavoriteCreate(BaseModel):
    item_type: str  # "verse" or "message"
    verse_id: Optional[int] = None
    message_id: Optional[int] = None
    title: Optional[str] = None
    notes: Optional[str] = None

class FavoriteOut(BaseModel):
    id: int
    user_id: int
    item_type: str
    verse_id: Optional[int] = None
    message_id: Optional[int] = None
    title: Optional[str] = None
    notes: Optional[str] = None
    verse: Optional[VerseOut] = None
    created_at: datetime

    class Config:
        from_attributes = True

