@echo off
echo =========================================================
echo  AgriVision AI - Crop Disease Detection Platform Launch
echo =========================================================

REM Check if .venv exists
if not exist ".venv\Scripts\python.exe" (
    echo [1/3] Creating virtual environment (.venv)...
    python -m venv .venv
)

echo [2/3] Activating virtual environment...
call .venv\Scripts\activate

echo [3/3] Checking dependencies and starting Flask server...
pip install -r requirements.txt --quiet
python backend/app.py

pause
