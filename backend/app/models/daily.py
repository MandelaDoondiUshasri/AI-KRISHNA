from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class DailyWisdom(Base):
    __tablename__ = "daily_wisdom"

    id = Column(Integer, primary_key=True, index=True)
    date_str = Column(String(20), unique=True, index=True, nullable=False)  # YYYY-MM-DD
    verse_id = Column(Integer, ForeignKey("verses.id"), nullable=False)
    reflection_en = Column(Text, nullable=False)
    reflection_hi = Column(Text, nullable=True)
    reflection_te = Column(Text, nullable=True)
    practical_focus = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    verse = relationship("Verse")

