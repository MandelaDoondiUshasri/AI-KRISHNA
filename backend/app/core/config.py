from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI KRISHNA – Your Life Companion"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "ai_krishna_divine_wisdom_secret_jwt_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = "sqlite:///./krishna.db"

    # AI Provider: "builtin", "gemini", "openai"
    AI_PROVIDER: str = "builtin"
    GEMINI_API_KEY: Optional[str] = None
    OPENAI_API_KEY: Optional[str] = None
    LLM_MODEL: str = "gemini-1.5-flash"

    # Admin
    ADMIN_EMAIL: str = "admin@aikrishna.life"
    ADMIN_PASSWORD: str = "DivineAdmin2026!Krishna"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

