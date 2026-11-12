from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine, SessionLocal
from app.api import auth, chat, gita, daily, user, admin, interactive
from app.services.gita_knowledge import gita_knowledge_service
from app.models.user import User
from app.core.security import get_password_hash

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Intelligent spiritual guidance platform inspired by Lord Krishna in the Bhagavad Gita.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(chat.router, prefix=settings.API_V1_STR)
app.include_router(gita.router, prefix=settings.API_V1_STR)
app.include_router(daily.router, prefix=settings.API_V1_STR)
app.include_router(user.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(interactive.router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def on_startup():
    # 1. Create tables
    Base.metadata.create_all(bind=engine)

    # 2. Seed Gita Data (Chapters & Verses)
    db = SessionLocal()
    try:
        gita_knowledge_service.seed_database(db)

        # 3. Create default Admin user
        admin_user = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin_user:
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
                full_name="Divine Administrator",
                preferred_language="en",
                role="admin"
            )
            db.add(admin_user)
            db.commit()

        # 4. Create demo user
        demo_user = db.query(User).filter(User.email == "arjuna@pandava.org").first()
        if not demo_user:
            demo_user = User(
                email="arjuna@pandava.org",
                hashed_password=get_password_hash("ParthaGita2026!"),
                full_name="Arjuna (Seeker)",
                preferred_language="en",
                role="user"
            )
            db.add(demo_user)
            db.commit()

    finally:
        db.close()

@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "message": "Namaste! Welcome to AI Krishna API. Find clarity through timeless wisdom.",
        "status": "online",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "service": "AI Krishna Backend"}

