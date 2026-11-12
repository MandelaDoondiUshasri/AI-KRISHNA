from typing import Optional, List
from pydantic import BaseModel

class ChapterOut(BaseModel):
    id: int
    chapter_number: int
    name_sanskrit: str
    name_transliteration: str
    name_english: str
    verses_count: int
    summary_en: Optional[str] = None
    summary_hi: Optional[str] = None
    summary_te: Optional[str] = None
    key_themes: Optional[str] = None

    class Config:
        from_attributes = True

class VerseOut(BaseModel):
    id: int
    chapter_number: int
    verse_number: int
    slok_sanskrit: str
    transliteration: str
    translation_en: str
    translation_hi: Optional[str] = None
    translation_te: Optional[str] = None
    explanation: Optional[str] = None
    core_concepts: Optional[str] = None
    life_situations: Optional[str] = None
    chapter_title_en: Optional[str] = None

    class Config:
        from_attributes = True

class GitaSearchResponse(BaseModel):
    total: int
    results: List[VerseOut]

