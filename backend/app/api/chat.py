import json
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.deps import get_current_user, require_current_user
from app.models.user import User
from app.models.chat import Conversation, Message
from app.models.gita import Verse
from app.schemas.chat import (
    ConversationCreate, ConversationOut,
    MessageCreate, MessageOut, StructuredResponse
)
from app.services.context_bridge import context_bridge_engine

router = APIRouter(prefix="/chat", tags=["Chat"])

def get_or_create_guest_user(db: Session) -> User:
    guest = db.query(User).filter(User.email == "guest@aikrishna.life").first()
    if not guest:
        from app.core.security import get_password_hash
        guest = User(
            email="guest@aikrishna.life",
            hashed_password=get_password_hash("guestPass123!"),
            full_name="Seeker",
            preferred_language="en",
            role="user"
        )
        db.add(guest)
        db.commit()
        db.refresh(guest)
    return guest

@router.get("/conversations", response_model=List[ConversationOut])
def list_conversations(
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)
    convs = db.query(Conversation).filter(Conversation.user_id == user.id).order_by(Conversation.updated_at.desc()).all()
    
    results = []
    for c in convs:
        # load messages
        msgs = db.query(Message).filter(Message.conversation_id == c.id).order_by(Message.created_at.asc()).all()
        msg_outs = []
        for m in msgs:
            s_data = json.loads(m.structured_data) if m.structured_data else None
            msg_outs.append(MessageOut(
                id=m.id,
                conversation_id=m.conversation_id,
                sender=m.sender,
                content=m.content,
                emotion_detected=m.emotion_detected,
                verse_id_referenced=m.verse_id_referenced,
                structured_data=s_data,
                created_at=m.created_at
            ))
        c_out = ConversationOut(
            id=c.id,
            title=c.title,
            language=c.language,
            created_at=c.created_at,
            updated_at=c.updated_at,
            messages=msg_outs
        )
        results.append(c_out)
    return results

@router.post("/conversations", response_model=ConversationOut)
def create_conversation(
    conv_in: ConversationCreate,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)
    conv = Conversation(
        user_id=user.id,
        title=conv_in.title or "Spiritual Dialogue",
        language=conv_in.language or user.preferred_language or "en"
    )
    db.add(conv)
    db.commit()
    db.refresh(conv)

    return ConversationOut(
        id=conv.id,
        title=conv.title,
        language=conv.language,
        created_at=conv.created_at,
        updated_at=conv.updated_at,
        messages=[]
    )

@router.get("/conversations/{conversation_id}", response_model=ConversationOut)
def get_conversation(
    conversation_id: int,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == user.id
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    msgs = db.query(Message).filter(Message.conversation_id == conv.id).order_by(Message.created_at.asc()).all()
    msg_outs = []
    for m in msgs:
        s_data = json.loads(m.structured_data) if m.structured_data else None
        msg_outs.append(MessageOut(
            id=m.id,
            conversation_id=m.conversation_id,
            sender=m.sender,
            content=m.content,
            emotion_detected=m.emotion_detected,
            verse_id_referenced=m.verse_id_referenced,
            structured_data=s_data,
            created_at=m.created_at
        ))

    return ConversationOut(
        id=conv.id,
        title=conv.title,
        language=conv.language,
        created_at=conv.created_at,
        updated_at=conv.updated_at,
        messages=msg_outs
    )

@router.delete("/conversations/{conversation_id}")
def delete_conversation(
    conversation_id: int,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == user.id
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    db.delete(conv)
    db.commit()
    return {"status": "success", "message": "Conversation deleted"}

@router.post("/message")
async def send_message(
    msg_in: MessageCreate,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)

    # 1. Get or create conversation
    conv = None
    if msg_in.conversation_id:
        conv = db.query(Conversation).filter(
            Conversation.id == msg_in.conversation_id,
            Conversation.user_id == user.id
        ).first()

    if not conv:
        # Generate initial title from user query
        short_title = msg_in.content[:40] + ("..." if len(msg_in.content) > 40 else "")
        conv = Conversation(
            user_id=user.id,
            title=short_title,
            language=msg_in.language or user.preferred_language or "en"
        )
        db.add(conv)
        db.commit()
        db.refresh(conv)
    else:
        conv.updated_at = datetime.utcnow()
        db.commit()

    # 2. Save User Message
    user_msg = Message(
        conversation_id=conv.id,
        sender="user",
        content=msg_in.content
    )
    db.add(user_msg)
    db.commit()
    db.refresh(user_msg)

    # 3. Fetch past messages for context
    past_msgs = db.query(Message).filter(Message.conversation_id == conv.id).order_by(Message.created_at.asc()).all()
    history = []
    for pm in past_msgs[:-1]:  # exclude the newly added user message
        history.append({"sender": pm.sender, "content": pm.content})

    # 4. Trigger Context Bridge Engine
    bridge_output = await context_bridge_engine.process_query(
        query=msg_in.content,
        language=msg_in.language or conv.language or "en",
        conversation_history=history
    )

    # 5. Extract verse ID if matched
    verse_id_ref = None
    if bridge_output.get("verse"):
        ch_num = bridge_output["verse"].get("chapter_number")
        v_num = bridge_output["verse"].get("verse_number")
        matched_verse_row = db.query(Verse).filter(
            Verse.chapter_number == ch_num,
            Verse.verse_number == v_num
        ).first()
        if matched_verse_row:
            verse_id_ref = matched_verse_row.id
            bridge_output["verse"]["id"] = matched_verse_row.id

    # 6. Save Krishna Message
    # Plain text summary for easy reading
    summary_content = (
        f"{bridge_output.get('situation_understanding')}\n\n"
        f"{bridge_output.get('krishna_wisdom')}\n\n"
        f"{bridge_output.get('how_it_applies')}"
    )

    krishna_msg = Message(
        conversation_id=conv.id,
        sender="krishna",
        content=summary_content,
        emotion_detected=bridge_output.get("emotion_detected"),
        verse_id_referenced=verse_id_ref,
        structured_data=json.dumps(bridge_output)
    )
    db.add(krishna_msg)
    db.commit()
    db.refresh(krishna_msg)

    return {
        "conversation_id": conv.id,
        "user_message": MessageOut(
            id=user_msg.id,
            conversation_id=user_msg.conversation_id,
            sender=user_msg.sender,
            content=user_msg.content,
            created_at=user_msg.created_at
        ),
        "krishna_message": MessageOut(
            id=krishna_msg.id,
            conversation_id=krishna_msg.conversation_id,
            sender=krishna_msg.sender,
            content=krishna_msg.content,
            emotion_detected=krishna_msg.emotion_detected,
            verse_id_referenced=krishna_msg.verse_id_referenced,
            structured_data=bridge_output,
            created_at=krishna_msg.created_at
        )
    }

@router.post("/message/regenerate")
async def regenerate_message(
    conversation_id: int,
    language: Optional[str] = "en",
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = current_user or get_or_create_guest_user(db)
    conv = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == user.id
    ).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Find the last user message
    last_user_msg = db.query(Message).filter(
        Message.conversation_id == conv.id,
        Message.sender == "user"
    ).order_by(Message.created_at.desc()).first()

    if not last_user_msg:
        raise HTTPException(status_code=400, detail="No user message found to regenerate")

    # Re-run Context Bridge Engine
    bridge_output = await context_bridge_engine.process_query(
        query=last_user_msg.content,
        language=language or conv.language or "en"
    )

    verse_id_ref = None
    if bridge_output.get("verse"):
        ch_num = bridge_output["verse"].get("chapter_number")
        v_num = bridge_output["verse"].get("verse_number")
        matched_verse_row = db.query(Verse).filter(
            Verse.chapter_number == ch_num,
            Verse.verse_number == v_num
        ).first()
        if matched_verse_row:
            verse_id_ref = matched_verse_row.id
            bridge_output["verse"]["id"] = matched_verse_row.id

    summary_content = (
        f"{bridge_output.get('situation_understanding')}\n\n"
        f"{bridge_output.get('krishna_wisdom')}\n\n"
        f"{bridge_output.get('how_it_applies')}"
    )

    krishna_msg = Message(
        conversation_id=conv.id,
        sender="krishna",
        content=summary_content,
        emotion_detected=bridge_output.get("emotion_detected"),
        verse_id_referenced=verse_id_ref,
        structured_data=json.dumps(bridge_output)
    )
    db.add(krishna_msg)
    db.commit()
    db.refresh(krishna_msg)

    return {
        "conversation_id": conv.id,
        "krishna_message": MessageOut(
            id=krishna_msg.id,
            conversation_id=krishna_msg.conversation_id,
            sender=krishna_msg.sender,
            content=krishna_msg.content,
            emotion_detected=krishna_msg.emotion_detected,
            verse_id_referenced=krishna_msg.verse_id_referenced,
            structured_data=bridge_output,
            created_at=krishna_msg.created_at
        )
    }

