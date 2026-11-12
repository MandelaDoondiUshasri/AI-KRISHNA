import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.core.database import Base, engine, SessionLocal
from app.services.gita_knowledge import gita_knowledge_service
from app.models.user import User
from app.core.security import get_password_hash
from app.core.config import settings

def main():
    print("Initializing Database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        print("Seeding Bhagavad Gita Chapters and Verses...")
        gita_knowledge_service.seed_database(db)

        print(f"Ensuring Admin account exists ({settings.ADMIN_EMAIL})...")
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin:
            admin = User(
                email=settings.ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                full_name="Divine Administrator",
                preferred_language="en",
                role="admin"
            )
            db.add(admin)
            db.commit()
            print("Admin account created.")
        else:
            print("Admin account already exists.")

        print("Database initialization complete!")
    finally:
        db.close()

if __name__ == "__main__":
    main()

