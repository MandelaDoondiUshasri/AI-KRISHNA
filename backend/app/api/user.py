from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import require_current_user
from app.models.user import User
from app.models.favorite import Favorite
from app.models.gita import Verse
from app.schemas.auth import UserOut, UserUpdatePreferences
from app.schemas.daily import FavoriteCreate, FavoriteOut
from app.schemas.gita import VerseOut

router = APIRouter(prefix="/user", tags=["User Personalization"])

@router.put("/preferences", response_model=UserOut)
def update_preferences(
    pref_in: UserUpdatePreferences,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    if pref_in.full_name is not None:
        current_user.full_name = pref_in.full_name
    if pref_in.preferred_language is not None:
        current_user.preferred_language = pref_in.preferred_language
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/favorites", response_model=List[FavoriteOut])
def get_favorites(
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    favs = db.query(Favorite).filter(Favorite.user_id == current_user.id).order_by(Favorite.created_at.desc()).all()
    out = []
    for f in favs:
        v_out = None
        if f.verse_id:
            v_row = db.query(Verse).filter(Verse.id == f.verse_id).first()
            if v_row:
                v_out = VerseOut.model_validate(v_row)
        out.append(FavoriteOut(
            id=f.id,
            user_id=f.user_id,
            item_type=f.item_type,
            verse_id=f.verse_id,
            message_id=f.message_id,
            title=f.title,
            notes=f.notes,
            verse=v_out,
            created_at=f.created_at
        ))
    return out

@router.post("/favorites", response_model=FavoriteOut)
def add_favorite(
    fav_in: FavoriteCreate,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    # Check if already favorited
    existing = db.query(Favorite).filter(
        Favorite.user_id == current_user.id,
        Favorite.item_type == fav_in.item_type,
        Favorite.verse_id == fav_in.verse_id
    ).first()
    if existing:
        return FavoriteOut(
            id=existing.id,
            user_id=existing.user_id,
            item_type=existing.item_type,
            verse_id=existing.verse_id,
            message_id=existing.message_id,
            title=existing.title,
            notes=existing.notes,
            created_at=existing.created_at
        )

    fav = Favorite(
        user_id=current_user.id,
        item_type=fav_in.item_type,
        verse_id=fav_in.verse_id,
        message_id=fav_in.message_id,
        title=fav_in.title,
        notes=fav_in.notes
    )
    db.add(fav)
    db.commit()
    db.refresh(fav)

    v_out = None
    if fav.verse_id:
        v_row = db.query(Verse).filter(Verse.id == fav.verse_id).first()
        if v_row:
            v_out = VerseOut.model_validate(v_row)

    return FavoriteOut(
        id=fav.id,
        user_id=fav.user_id,
        item_type=fav_in.item_type,
        verse_id=fav.verse_id,
        message_id=fav.message_id,
        title=fav.title,
        notes=fav.notes,
        verse=v_out,
        created_at=fav.created_at
    )

@router.delete("/favorites/{favorite_id}")
def delete_favorite(
    favorite_id: int,
    current_user: User = Depends(require_current_user),
    db: Session = Depends(get_db)
):
    fav = db.query(Favorite).filter(
        Favorite.id == favorite_id,
        Favorite.user_id == current_user.id
    ).first()
    if not fav:
        raise HTTPException(status_code=404, detail="Favorite not found")

    db.delete(fav)
    db.commit()
    return {"status": "success", "message": "Favorite removed"}

