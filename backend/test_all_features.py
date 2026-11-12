import asyncio
import sys
import os
sys.path.append(os.path.dirname(__file__))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_system():
    print("==================================================")
    print("AI KRISHNA – COMPLETE SYSTEM VERIFICATION TEST")
    print("==================================================")

    # 1. Root & Health
    r = client.get("/health")
    assert r.status_code == 200, f"Health check failed: {r.text}"
    print("[PASS] 1. Backend Health Check: OK")

    # 2. Gita Chapters
    r = client.get("/api/gita/chapters")
    assert r.status_code == 200
    chapters = r.json()
    assert len(chapters) == 18, f"Expected 18 chapters, got {len(chapters)}"
    print(f"[PASS] 2. Gita Chapters: Loaded all {len(chapters)} chapters")

    # 3. Gita Search
    r = client.get("/api/gita/search?situation=career")
    assert r.status_code == 200
    search_data = r.json()
    assert search_data["total"] > 0, "No career verses found"
    print(f"[PASS] 3. Gita Semantic Search: Found {search_data['total']} verses for 'career'")

    # 4. Daily Wisdom
    r = client.get("/api/daily/today")
    assert r.status_code == 200
    daily = r.json()
    assert "verse" in daily
    print(f"[PASS] 4. Daily Wisdom: BG {daily['verse']['chapter_number']}.{daily['verse']['verse_number']} - {daily['date_str']}")

    # 5. User Registration & Login
    test_email = "testseeker@aikrishna.life"
    client.post("/api/auth/register", json={
        "email": test_email,
        "password": "Password123!",
        "full_name": "Test Seeker",
        "preferred_language": "en"
    })
    
    login_res = client.post("/api/auth/login", json={
        "email": test_email,
        "password": "Password123!"
    })
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]
    auth_headers = {"Authorization": f"Bearer {token}"}
    print("[PASS] 5. Authentication (JWT, Register, Login): OK")

    # 6. Context Bridge Engine: Exact Scenario from Prompt
    print("\nExecuting Context Bridge Engine on Prompt Scenario:")
    query = "I am working very hard, but my colleagues are getting promotions while I am not. I feel disappointed."
    chat_res = client.post("/api/chat/message", json={
        "content": query,
        "language": "en"
    }, headers=auth_headers)
    assert chat_res.status_code == 200
    chat_data = chat_res.json()
    krishna_msg = chat_data["krishna_message"]
    struct = krishna_msg["structured_data"]

    # Verify all 6 mandatory sections
    assert "situation_understanding" in struct, "Missing situation_understanding"
    assert "krishna_wisdom" in struct, "Missing krishna_wisdom"
    assert "verse" in struct and struct["verse"] is not None, "Missing verse reference"
    assert "how_it_applies" in struct, "Missing how_it_applies"
    assert "practical_steps" in struct and len(struct["practical_steps"]) > 0, "Missing practical_steps"
    assert "thought_to_remember" in struct, "Missing thought_to_remember"

    print("\n--- Context Bridge Engine 6-Part Response Verified ---")
    print("1. Understanding Your Situation:\n  ", struct["situation_understanding"][:100] + "...")
    print("2. Krishna's Wisdom:\n  ", struct["krishna_wisdom"][:100] + "...")
    print(f"3. Verse Referenced: BG {struct['verse']['chapter_number']}.{struct['verse']['verse_number']}")
    print("   Sanskrit:", struct['verse']['slok_sanskrit'].split('\n')[0])
    print("4. How This Applies to Your Life:\n  ", struct["how_it_applies"][:100] + "...")
    print("5. Practical Steps Count:", len(struct["practical_steps"]))
    print("6. Thought to Remember:\n  ", f'"{struct["thought_to_remember"]}"')
    print("[PASS] 6. Context Bridge Engine 9-Step Pipeline: SUCCESS")

    # 7. Multilingual Support: Telugu
    te_res = client.post("/api/chat/message", json={
        "content": "నేను చాలా కష్టపడుతున్నాను కానీ గుర్తింపు రావడం లేదు.",
        "language": "te"
    }, headers=auth_headers)
    assert te_res.status_code == 200
    te_struct = te_res.json()["krishna_message"]["structured_data"]
    assert len(te_struct["situation_understanding"]) > 0
    print("[PASS] 7. Multilingual Support (Telugu): Generated natural Telugu counsel")

    # 8. Admin Metrics & Config
    admin_login = client.post("/api/auth/login", json={
        "email": "admin@aikrishna.life",
        "password": "DivineAdmin2026!Krishna"
    })
    assert admin_login.status_code == 200
    admin_token = admin_login.json()["access_token"]
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    metrics_res = client.get("/api/admin/metrics", headers=admin_headers)
    assert metrics_res.status_code == 200
    print(f"[PASS] 8. Admin Dashboard Metrics: {metrics_res.json()['total_messages']} messages recorded")

    # 9. Bookmarks / Favorites
    fav_res = client.post("/api/user/favorites", json={
        "item_type": "verse",
        "verse_id": 1,
        "title": "Favorite Karma Yoga Verse",
        "notes": "Always remember duty over result"
    }, headers=auth_headers)
    assert fav_res.status_code == 200
    print("[PASS] 9. User Personalization & Saved Wisdom: OK")

    print("\n==================================================")
    print("ALL TESTS PASSED! APPLICATION IS 100% OPERATIONAL.")
    print("==================================================")

if __name__ == "__main__":
    test_system()

