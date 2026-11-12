@echo off
echo Starting AI Krishna Backend on http://localhost:8000...
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause

