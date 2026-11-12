from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel

class AdminMetrics(BaseModel):
    total_users: int
    active_users: int
    total_conversations: int
    total_messages: int
    total_verses: int
    popular_situations: List[Dict[str, Any]]
    most_referenced_verses: List[Dict[str, Any]]

class AIConfigOut(BaseModel):
    provider: str
    gemini_configured: bool
    openai_configured: bool
    current_model: str

class AIConfigUpdate(BaseModel):
    provider: str  # "builtin", "gemini", "openai"
    gemini_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None
    model_name: Optional[str] = None

class UserAdminOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    preferred_language: str
    role: str
    is_active: bool
    conversations_count: int
    created_at: datetime

    class Config:
        from_attributes = True

