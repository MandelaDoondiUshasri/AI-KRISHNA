from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class DecodeProblemRequest(BaseModel):
    problem_text: str
    language: Optional[str] = "en"

class QuizSubmitRequest(BaseModel):
    score: int
    total_questions: int
    session_id: Optional[str] = None

class LetterRequest(BaseModel):
    letter_text: str
    title: Optional[str] = "Letter to Krishna"
    is_ephemeral: Optional[bool] = False
    language: Optional[str] = "en"
    session_id: Optional[str] = None

class ChallengeToggleRequest(BaseModel):
    task_id: int
    goal_type: str
    session_id: Optional[str] = None

