from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Chapter(Base):
    __tablename__ = "chapters"

    id = Column(Integer, primary_key=True, index=True)
    chapter_number = Column(Integer, unique=True, index=True, nullable=False)
    name_sanskrit = Column(String(255), nullable=False)
    name_transliteration = Column(String(255), nullable=False)
    name_english = Column(String(255), nullable=False)
    verses_count = Column(Integer, default=0)
    summary_en = Column(Text, nullable=True)
    summary_hi = Column(Text, nullable=True)
    summary_te = Column(Text, nullable=True)
    key_themes = Column(Text, nullable=True)  # Comma separated or JSON string

    verses = relationship("Verse", back_populates="chapter", cascade="all, delete-orphan")


class Verse(Base):
    __tablename__ = "verses"

    id = Column(Integer, primary_key=True, index=True)
    chapter_number = Column(Integer, ForeignKey("chapters.chapter_number"), nullable=False, index=True)
    verse_number = Column(Integer, nullable=False, index=True)
    slok_sanskrit = Column(Text, nullable=False)
    transliteration = Column(Text, nullable=False)
    translation_en = Column(Text, nullable=False)
    translation_hi = Column(Text, nullable=True)
    translation_te = Column(Text, nullable=True)
    explanation = Column(Text, nullable=True)
    core_concepts = Column(Text, nullable=True)  # comma separated
    life_situations = Column(Text, nullable=True)  # comma separated e.g. "career,overthinking,fear"
    chapter_title_en = Column(String(255), nullable=True)

    chapter = relationship("Chapter", back_populates="verses")

