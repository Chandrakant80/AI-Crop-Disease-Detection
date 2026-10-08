"""
Database module for AI Crop Disease Detection.
Handles SQLite storage of diagnoses, recommendations, and analytics.
"""

import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'database', 'crop_disease.db')


def get_connection():
    """Returns a SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initializes the SQLite database schema if not already present."""
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS diagnoses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            crop TEXT NOT NULL,
            disease TEXT NOT NULL,
            confidence REAL NOT NULL,
            status TEXT NOT NULL,
            severity TEXT NOT NULL,
            symptoms TEXT,
            treatment TEXT,
            prevention TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


def save_diagnosis(filename, crop, disease, confidence, status, severity, symptoms="", treatment="", prevention=""):
    """Saves a new diagnosis record to the database."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO diagnoses (
            filename, crop, disease, confidence, status, severity, symptoms, treatment, prevention
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (filename, crop, disease, float(confidence), status, severity, symptoms, treatment, prevention))
    record_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return record_id


def get_recent_diagnoses(limit=20):
    """Retrieves recent diagnoses ordered by most recent first."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM diagnoses ORDER BY id DESC LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_stats():
    """Returns aggregated stats from diagnoses."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total FROM diagnoses")
    total = cursor.fetchone()['total']

    cursor.execute("SELECT COUNT(*) as healthy FROM diagnoses WHERE status = 'Healthy'")
    healthy = cursor.fetchone()['healthy']

    cursor.execute("SELECT COUNT(*) as infected FROM diagnoses WHERE status = 'Infected'")
    infected = cursor.fetchone()['infected']

    cursor.execute("SELECT AVG(confidence) as avg_conf FROM diagnoses")
    avg_conf = cursor.fetchone()['avg_conf'] or 0.0

    conn.close()
    return {
        "total_scans": total,
        "healthy_count": healthy,
        "infected_count": infected,
        "avg_confidence": round(avg_conf, 3)
    }


if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
