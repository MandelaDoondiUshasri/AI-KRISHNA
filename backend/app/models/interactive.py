import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from app.core.database import Base

class UserQuizProgress(Base):
    __tablename__ = "user_quiz_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    total_score = Column(Integer, default=0)
    quizzes_taken = Column(Integer, default=0)
    badges = Column(Text, default="[]")  # JSON string
    level = Column(String(50), default="Seeker")
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)


class UserDailyChallenge(Base):
    __tablename__ = "user_daily_challenges"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    date_str = Column(String(20), index=True)
    goal_type = Column(String(50), default="focus")
    challenges = Column(Text, default="[]")  # JSON string of tasks [{id, title, completed}]
    streak_count = Column(Integer, default=1)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class UserLetter(Base):
    __tablename__ = "user_letters"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    session_id = Column(String(100), nullable=True, index=True)
    title = Column(String(255), default="Letter to Krishna")
    letter_content = Column(Text, nullable=False)
    reply_content = Column(Text, nullable=False)
    verse_referenced = Column(String(50), nullable=True)
    is_ephemeral = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
