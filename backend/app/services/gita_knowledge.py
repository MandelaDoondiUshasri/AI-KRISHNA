import json
import os
from typing import List, Dict, Any, Optional, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.orm import Session
from app.models.gita import Chapter, Verse

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

class GitaKnowledgeService:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
        self.verses_cache: List[Dict[str, Any]] = []
        self.tfidf_matrix = None
        self._load_local_data()

    def _load_local_data(self):
        verses_path = os.path.join(DATA_DIR, "gita_verses.json")
        if os.path.exists(verses_path):
            with open(verses_path, "r", encoding="utf-8") as f:
                self.verses_cache = json.load(f)
            self._fit_vectorizer()

    def _fit_vectorizer(self):
        if not self.verses_cache:
            return
        corpus = []
        for v in self.verses_cache:
            # Combine all rich textual dimensions for robust semantic retrieval
            text = f"{v.get('translation_en', '')} {v.get('explanation', '')} {v.get('core_concepts', '')} {v.get('life_situations', '')} {v.get('chapter_title_en', '')}"
            corpus.append(text)
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)

    def search_verses(
        self,
        query: str,
        situation: Optional[str] = None,
        chapter_number: Optional[int] = None,
        top_k: int = 5
    ) -> List[Tuple[Dict[str, Any], float]]:
        if not self.verses_cache or self.tfidf_matrix is None:
            return []

        # Vector cosine similarity
        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix)[0]

        scored_results = []
        q_lower = query.lower()

        for idx, score in enumerate(similarities):
            verse = self.verses_cache[idx]
            final_score = float(score)

            # Boost if chapter matches
            if chapter_number and verse.get("chapter_number") == chapter_number:
                final_score += 0.4

            # Boost if life situation tag matches
            life_tags = (verse.get("life_situations") or "").lower()
            if situation and situation.lower() in life_tags:
                final_score += 0.35

            # Keyword boosting
            for tag in life_tags.split(","):
                tag_clean = tag.strip()
                if tag_clean and tag_clean in q_lower:
                    final_score += 0.25

            # Concept boost
            concepts = (verse.get("core_concepts") or "").lower()
            for c in concepts.split(","):
                c_clean = c.strip()
                if c_clean and c_clean in q_lower:
                    final_score += 0.2

            scored_results.append((verse, final_score))

        scored_results.sort(key=lambda x: x[1], reverse=True)
        return scored_results[:top_k]

    def get_best_match(self, query: str, situation: Optional[str] = None) -> Tuple[Optional[Dict[str, Any]], float]:
        results = self.search_verses(query, situation=situation, top_k=1)
        if results:
            return results[0]
        return None, 0.0

    def seed_database(self, db: Session):
        """Seeds SQLite/Postgres with chapters and verses from JSON data."""
        # Seed Chapters
        chapters_path = os.path.join(DATA_DIR, "gita_chapters.json")
        if os.path.exists(chapters_path):
            with open(chapters_path, "r", encoding="utf-8") as f:
                chapters_data = json.load(f)
                for ch in chapters_data:
                    existing = db.query(Chapter).filter(Chapter.chapter_number == ch["chapter_number"]).first()
                    if not existing:
                        chapter = Chapter(
                            chapter_number=ch["chapter_number"],
                            name_sanskrit=ch["name_sanskrit"],
                            name_transliteration=ch["name_transliteration"],
                            name_english=ch["name_english"],
                            verses_count=ch["verses_count"],
                            summary_en=ch.get("summary_en"),
                            summary_hi=ch.get("summary_hi"),
                            summary_te=ch.get("summary_te"),
                            key_themes=ch.get("key_themes")
                        )
                        db.add(chapter)
                db.commit()

        # Seed Verses
        verses_path = os.path.join(DATA_DIR, "gita_verses.json")
        if os.path.exists(verses_path):
            with open(verses_path, "r", encoding="utf-8") as f:
                verses_data = json.load(f)
                for v in verses_data:
                    existing = db.query(Verse).filter(
                        Verse.chapter_number == v["chapter_number"],
                        Verse.verse_number == v["verse_number"]
                    ).first()
                    if not existing:
                        verse = Verse(
                            chapter_number=v["chapter_number"],
                            verse_number=v["verse_number"],
                            slok_sanskrit=v["slok_sanskrit"],
                            transliteration=v["transliteration"],
                            translation_en=v["translation_en"],
                            translation_hi=v.get("translation_hi"),
                            translation_te=v.get("translation_te"),
                            explanation=v.get("explanation"),
                            core_concepts=v.get("core_concepts"),
                            life_situations=v.get("life_situations"),
                            chapter_title_en=v.get("chapter_title_en")
                        )
                        db.add(verse)
                db.commit()

gita_knowledge_service = GitaKnowledgeService()

