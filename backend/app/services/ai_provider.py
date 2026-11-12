import logging
from typing import Optional, Dict, Any
from app.core.config import settings

logger = logging.getLogger(__name__)

class AIProviderService:
    def __init__(self):
        self.provider = settings.AI_PROVIDER
        self.gemini_key = settings.GEMINI_API_KEY
        self.openai_key = settings.OPENAI_API_KEY
        self.model_name = settings.LLM_MODEL

    def set_config(self, provider: str, gemini_key: Optional[str] = None, openai_key: Optional[str] = None, model: Optional[str] = None):
        self.provider = provider
        if gemini_key is not None:
            self.gemini_key = gemini_key
        if openai_key is not None:
            self.openai_key = openai_key
        if model is not None:
            self.model_name = model

    def get_config(self) -> Dict[str, Any]:
        return {
            "provider": self.provider,
            "gemini_configured": bool(self.gemini_key),
            "openai_configured": bool(self.openai_key),
            "current_model": self.model_name
        }

    async def generate_response(self, prompt: str, system_instruction: Optional[str] = None) -> Optional[str]:
        # 1. Gemini
        if self.provider == "gemini" and self.gemini_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.gemini_key)
                model = genai.GenerativeModel(
                    model_name=self.model_name or "gemini-1.5-flash",
                    system_instruction=system_instruction
                )
                response = model.generate_content(prompt)
                if response and response.text:
                    return response.text
            except Exception as e:
                logger.warning(f"Gemini API call failed: {e}. Falling back to internal engine.")

        # 2. OpenAI
        elif self.provider == "openai" and self.openai_key:
            try:
                from openai import OpenAI
                client = OpenAI(api_key=self.openai_key)
                messages = []
                if system_instruction:
                    messages.append({"role": "system", "content": system_instruction})
                messages.append({"role": "user", "content": prompt})

                response = client.chat.completions.create(
                    model=self.model_name or "gpt-4o-mini",
                    messages=messages,
                    temperature=0.7
                )
                if response.choices and response.choices[0].message.content:
                    return response.choices[0].message.content
            except Exception as e:
                logger.warning(f"OpenAI API call failed: {e}. Falling back to internal engine.")

        # Built-in or fallback is handled by Context Bridge Engine
        return None

ai_provider_service = AIProviderService()

