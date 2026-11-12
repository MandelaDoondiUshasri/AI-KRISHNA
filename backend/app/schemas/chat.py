from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel

class VerseReference(BaseModel):
    id: Optional[int] = None
    chapter_number: int
    verse_number: int
    slok_sanskrit: str
    transliteration: str
    translation: str
    chapter_title: str

class StructuredResponse(BaseModel):
    situation_understanding: str
    krishna_wisdom: str
    verse: Optional[VerseReference] = None
    is_direct_verse: bool = True
    how_it_applies: str
    practical_steps: List[str]
    thought_to_remember: str
    emotion_detected: Optional[str] = None
    disclaimer: Optional[str] = None

class MessageCreate(BaseModel):
    conversation_id: Optional[int] = None
    content: str
    language: Optional[str] = "en"  # "en", "te", "hi"

class MessageOut(BaseModel):
    id: int
    conversation_id: int
    sender: str
    content: str
    emotion_detected: Optional[str] = None
    verse_id_referenced: Optional[int] = None
    structured_data: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ConversationCreate(BaseModel):
    title: Optional[str] = "Spiritual Dialogue"
    language: Optional[str] = "en"

class ConversationOut(BaseModel):
    id: int
    title: str
    language: str
    created_at: datetime
    updated_at: datetime
    messages: Optional[List[MessageOut]] = []

    class Config:
        from_attributes = True

