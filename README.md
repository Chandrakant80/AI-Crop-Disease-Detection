# 🌿 AgriVision AI - Crop Disease Detection & Recommendation System

An end-to-end Deep Learning and Computer Vision platform designed for automated crop foliar disease diagnosis, pathogen taxonomy, and prescriptive agronomic treatment recommendations.

```
                    AI CROP DISEASE PROJECT
                            │
                            ▼
                  ┌───────────────────┐
                  │   Web Interface   │
                  │ HTML/CSS/JS       │
                  └─────────┬─────────┘
                            │
                     Upload Image
                            │
                            ▼
                  ┌───────────────────┐
                  │   Flask Backend   │
                  │     Python        │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Image Processing  │
                  │ OpenCV / Pillow   │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │   AI Model        │
                  │ MobileNetV2/CNN   │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Disease Detection │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Recommendation    │
                  │ Symptoms/Treatment│
                  │ Prevention        │
                  └─────────┬─────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │ Result on Website │
                  └───────────────────┘
```

---

## 📁 Project Architecture & Directory Layout

```
AI-Crop-Disease-Detection/
│
├── .venv/                      # Python virtual environment
│
├── dataset/                    # Training and benchmarking datasets
│   ├── train/                  # Training set organized by crop disease class
│   ├── validation/             # Validation set for model hyperparameter tuning
│   └── test/                   # Unseen test specimens for evaluation
│
├── model/                      # Saved trained models and checkpoints
│   ├── mobilenet_v2_crop.pth   # Exported PyTorch model weights
│   └── .gitkeep
│
├── backend/                    # Python Flask backend service
│   ├── app.py                  # Flask REST API, routing & static asset server
│   ├── predictor.py            # OpenCV/Pillow image processing & MobileNetV2 inference
│   └── recommendations.py      # Domain database of symptoms, treatments & prevention
│
├── frontend/                   # Standalone Web Interface (HTML/CSS/JS)
│   ├── index.html              # Responsive diagnostic workbench & visualizer
│   ├── style.css               # Clean modern styles, badges, and progress meters
│   └── script.js               # Dynamic AJAX client for real-time model inference
│
├── uploads/                    # Temporary storage for uploaded leaf specimens
│   └── .gitkeep
│
├── database/                   # Persistent diagnosis logs & analytics
│   ├── db.py                   # SQLite schema & database connection layer
│   ├── crop_disease.db         # SQLite database file
│   └── .gitkeep
│
├── notebooks/                  # Model development & experiments
│   └── training.ipynb          # Transfer learning training notebook (MobileNetV2)
│
├── .vscode/                    # VS Code launch & debugging configurations
│   ├── launch.json             # F5 one-click debug runner for Flask
│   └── settings.json           # Automatic .venv interpreter selection
│
├── requirements.txt            # Python dependencies (Flask, PyTorch, OpenCV, Pillow)
├── run_backend.bat             # One-click Windows launch script
├── .gitignore                  # Git exclude rules
└── README.md                   # Project documentation
```

---

## 🚀 How to Run in VS Code

### Method 1: One-Click Run in VS Code (F5)

1. Open VS Code in this directory:
   ```bash
   code .
   ```
2. Open the **Run and Debug** view (`Ctrl + Shift + D` on Windows / Linux).
3. Select **`Python: Run backend/app.py directly`** or **`Python: Flask Backend (app.py)`**.
4. Press **`F5`** or click the green **Play** button.
5. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

---

### Method 2: Command Line / Terminal

#### 1. Activate the Virtual Environment
- **Windows (PowerShell)**:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```
- **Windows (CMD)**:
  ```cmd
  .venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  source .venv/bin/activate
  ```

#### 2. Install Required Dependencies (Already in `.venv`)
```bash
pip install -r requirements.txt
```

#### 3. Start the Flask Backend Server
```bash
python backend/app.py
```

#### 4. Open the Web Application
Open your web browser and navigate to:
👉 **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## ⚡ API Specifications

| Method | Endpoint | Description | Request Payload | Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/` | Serves the HTML/CSS/JS frontend | None | HTML page |
| `GET` | `/api/health` | Healthcheck & environment diagnostics | None | `{ status: "online", pytorch_enabled: true, opencv_enabled: true }` |
| `POST`| `/predict` or `/api/predict` | Main disease classification endpoint | `multipart/form-data` with `file` or `image` | JSON with crop, disease, confidence, symptoms, treatment, prevention, Grad-CAM heatmap |
| `GET` | `/api/history` | Retrieves logged scan records | Query param `?limit=15` | Array of recent diagnoses from SQLite |
| `GET` | `/api/diseases` | Complete catalogue of supported crop diseases | None | JSON array of 18+ disease profiles |
| `GET` | `/api/stats` | Aggregated analytics (total, healthy, infected, avg confidence) | None | JSON metrics |

---

## 🧠 Deep Learning Architecture (MobileNetV2)

The system utilizes an inverted residual bottleneck architecture (**MobileNetV2**):
- **Input Resolution**: $224 \times 224 \times 3$ (RGB)
- **Feature Extractor**: Pre-trained convolutional layers leveraging Depthwise Separable Convolutions.
- **Classifier Head**: Dropout ($p=0.3$) $\rightarrow$ Linear projection to target disease classes.
- **Visual Attention**: Grad-CAM attention heatmap generated via OpenCV (`cv2.applyColorMap` with `COLORMAP_JET`) to highlight foliar lesions and chlorosis.

To train or fine-tune your own weights on custom dataset images:
1. Place dataset images into `dataset/train/` and `dataset/validation/`.
2. Open `notebooks/training.ipynb` in VS Code.
3. Select `.venv` as your Jupyter Kernel and run all cells.
4. The trained weights are saved to `model/mobilenet_v2_crop.pth` and automatically loaded by the backend.

---

## 🌾 Supported Crops & Pathologies

- **Tomato**: Early Blight (*Alternaria solani*), Late Blight (*Phytophthora infestans*), Bacterial Spot (*Xanthomonas perforans*), Yellow Leaf Curl Virus, Healthy.
- **Potato**: Early Blight, Late Blight, Healthy.
- **Corn (Maize)**: Common Rust (*Puccinia sorghi*), Northern Leaf Blight, Healthy.
- **Apple**: Apple Scab (*Venturia inaequalis*), Black Rot (*Botryosphaeria obtusa*), Healthy.
- **Grape**: Black Rot (*Guignardia bidwellii*), Healthy.
- **Bell Pepper**: Bacterial Spot (*Xanthomonas campestris*), Healthy.
