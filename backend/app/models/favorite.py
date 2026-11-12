from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    item_type = Column(String(50), nullable=False)  # "verse" or "message"
    verse_id = Column(Integer, ForeignKey("verses.id"), nullable=True)
    message_id = Column(Integer, ForeignKey("messages.id"), nullable=True)
    title = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="favorites")
    verse = relationship("Verse")
    message = relationship("Message")

