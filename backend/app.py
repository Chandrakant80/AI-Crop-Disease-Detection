"""
Flask Backend Application for AI Crop Disease Detection.
"""

import os
import sys
import uuid
from datetime import datetime

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.predictor import get_predictor, TORCH_AVAILABLE, OPENCV_AVAILABLE
from backend.recommendations import get_all_diseases, get_recommendation
from database.db import init_db, save_diagnosis, get_recent_diagnoses, get_stats

app = Flask(
    __name__,
    static_folder=os.path.join(BASE_DIR, 'frontend'),
    static_url_path=''
)
CORS(app)

UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp', 'bmp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return send_from_directory(os.path.join(BASE_DIR, 'frontend'), 'index.html')

@app.route('/api/health', methods=['GET'])
def health():
    predictor = get_predictor()
    return jsonify({
        "status": "online",
        "service": "AI Crop Disease Detection API",
        "version": "1.0.0",
        "pytorch_enabled": TORCH_AVAILABLE,
        "opencv_enabled": OPENCV_AVAILABLE,
        "has_trained_weights": predictor.has_trained_weights,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/predict', methods=['POST'])
@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files and 'image' not in request.files:
        return jsonify({"success": False, "error": "No image file provided in request."}), 400

    file = request.files.get('file') or request.files.get('image')
    if file.filename == '':
        return jsonify({"success": False, "error": "No file selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"success": False, "error": f"Unsupported file extension."}), 400

    try:
        original_name = secure_filename(file.filename)
        unique_prefix = uuid.uuid4().hex[:8]
        saved_filename = f"{unique_prefix}_{original_name}"
        saved_path = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
        file.save(saved_path)

        predictor = get_predictor()
        result = predictor.predict(saved_path)

        if result.get("supported", False):
            record_id = save_diagnosis(
                filename=saved_filename,
                crop=result["crop"],
                disease=result["disease"],
                confidence=result["confidence"],
                status=result["status"],
                severity=result["severity"],
                symptoms=result["symptoms"],
                treatment=result["treatment"],
                prevention=result["prevention"]
            )
            result["id"] = f"CR-SCAN-{record_id}"
        
        result["filename"] = saved_filename
        result["file_url"] = f"/uploads/{saved_filename}"
        result["success"] = True

        # Combine response so it maps cleanly to the root level while preserving the "data" key for backwards compatibility
        response = {"success": True, "data": result}
        response.update(result)
        return jsonify(response)

    except Exception as e:
        print(f"[App] Prediction error: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/diseases', methods=['GET'])
def list_diseases():
    return jsonify({
        "count": len(get_all_diseases()),
        "diseases": get_all_diseases()
    })

@app.route('/api/history', methods=['GET'])
def history():
    limit = request.args.get('limit', default=15, type=int)
    recent = get_recent_diagnoses(limit)
    return jsonify({
        "count": len(recent),
        "history": recent
    })

@app.route('/api/stats', methods=['GET'])
def stats():
    return jsonify(get_stats())

if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5000))
    print(f"==================================================")
    print(f"[*] AI Crop Disease Detection Backend Running")
    print(f"[*] Serving Web Interface at: http://127.0.0.1:{port}")
    print(f"[*] API Healthcheck:          http://127.0.0.1:{port}/api/health")
    print(f"==================================================")
    app.run(host='0.0.0.0', port=port, debug=False)
