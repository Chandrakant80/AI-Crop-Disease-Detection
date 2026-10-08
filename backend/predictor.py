import os
import io
import base64
import numpy as np
from PIL import Image

try:
    import cv2
    OPENCV_AVAILABLE = True
except ImportError:
    OPENCV_AVAILABLE = False

try:
    import torch
    import torch.nn as nn
    import torchvision.transforms as transforms
    from torchvision import models
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False

from .recommendations import get_recommendation, DISEASE_RECOMMENDATIONS

import json
# Provide authoritative class mapping as requested
CLASS_NAMES = []
class_mapping_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "model", "class_names.json")
try:
    with open(class_mapping_path, "r") as f:
        CLASS_MAPPING = json.load(f)
        CLASS_NAMES = [CLASS_MAPPING[str(i)] for i in range(len(CLASS_MAPPING))]
except Exception as e:
    print(f"Error loading class mapping: {e}")

CONFIDENCE_THRESHOLD = 0.70
MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'model')

class CropDiseasePredictor:
    def __init__(self):
        self.device = "cuda" if TORCH_AVAILABLE and torch.cuda.is_available() else "cpu"
        self.classes = CLASS_NAMES
        self.model = None
        self.transforms = None
        self.has_trained_weights = False
        self._init_model()

    def _init_model(self):
        if not TORCH_AVAILABLE:
            return

        try:
            self.transforms = transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406],
                    std=[0.229, 0.224, 0.225]
                )
            ])

            weight_path = os.path.join(MODEL_DIR, 'mobilenet_v2_crop.pth')
            if os.path.exists(weight_path):
                self.crop_model = models.mobilenet_v2(weights=None)
                num_ftrs = self.crop_model.classifier[1].in_features
                self.crop_model.classifier = nn.Sequential(
                    nn.Dropout(0.2),
                    nn.Linear(num_ftrs, len(self.classes))
                )
                self.crop_model.load_state_dict(torch.load(weight_path, map_location=self.device))
                self.crop_model.to(self.device)
                self.crop_model.eval()
                self.has_trained_weights = True
            else:
                self.crop_model = None
                self.has_trained_weights = False

        except Exception as e:
            print(f"[Predictor] Model initialization notice: {e}")
            self.crop_model = None
            self.has_trained_weights = False

    def _generate_processed_preview(self, pil_image):
        img_resized = pil_image.resize((224, 224))
        buffered = io.BytesIO()
        img_resized.save(buffered, format="JPEG", quality=90)
        b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        return f"data:image/jpeg;base64,{b64}"

    def predict(self, image_input):
        if isinstance(image_input, (str, os.PathLike)):
            pil_img = Image.open(image_input).convert('RGB')
        elif isinstance(image_input, bytes):
            pil_img = Image.open(io.BytesIO(image_input)).convert('RGB')
        elif isinstance(image_input, io.BytesIO):
            pil_img = Image.open(image_input).convert('RGB')
        else:
            pil_img = image_input.convert('RGB')

        processed_preview = self._generate_processed_preview(pil_img)

        if not self.has_trained_weights or getattr(self, 'crop_model', None) is None:
            return {
                "crop": "Analysis unavailable",
                "plant": "Analysis unavailable",
                "disease": "Trained model checkpoint required",
                "scientific_name": "N/A",
                "pathogen_type": "None",
                "status": "Unavailable",
                "severity": "N/A",
                "confidence": 0.0,
                "confidence_percent": 0.0,
                "supported": False,
                "symptoms": "No fine-tuned crop disease checkpoint.",
                "treatment": "Please train or install 'model/mobilenet_v2_crop.pth'.",
                "prevention": "N/A",
                "top_predictions": [],
                "top3": [],
                "model_coverage_note": "Diagnosis unavailable: No trained checkpoint found.",
                "processed_image": processed_preview,
                "heatmap_image": processed_preview
            }

        input_tensor = self.transforms(pil_img).unsqueeze(0).to(self.device)
        with torch.no_grad():
            logits = self.crop_model(input_tensor)
            probs = torch.softmax(logits, dim=1)[0].cpu().numpy()

        top_indices = np.argsort(probs)[::-1]
        best_idx = top_indices[0]
        best_prob = float(probs[best_idx])
        
        top3_list = []
        for idx in top_indices[:3]:
            raw_name = self.classes[idx]
            formatted = raw_name.replace("___", " ").replace("_", " ")
            top3_list.append({
                "label": formatted,
                "confidence": float(probs[idx]),
                "prob": float(probs[idx])
            })

        print(f"Image shape: {np.array(pil_img).shape}")
        print(f"Model output shape: {probs.shape}")
        print(f"Predicted class index: {best_idx}")
        print(f"Predicted raw class: {self.classes[best_idx]}")
        print(f"Confidence: {best_prob}")

        if best_prob < CONFIDENCE_THRESHOLD:
            return {
                "crop": "Unknown",
                "plant": "Unsupported Plant",
                "disease": "Detection unavailable",
                "scientific_name": "N/A",
                "pathogen_type": "None",
                "status": "OUTSIDE_SUPPORTED_CLASSES",
                "severity": "N/A",
                "confidence": 0.0,
                "confidence_percent": 0.0,
                "supported": False,
                "symptoms": "This plant is outside the supported crop/disease classes of the current AI model.",
                "treatment": "No treatment recommended without an authenticated diagnosis.",
                "prevention": "Never treat crops based on unverified default classifications.",
                "top_predictions": top3_list,
                "top3": top3_list,
                "message": "Disease detection unavailable for this plant.",
                "processed_image": processed_preview,
                "heatmap_image": processed_preview
            }

        best_class = self.classes[best_idx]
        parts = best_class.split("___")
        crop_parsed = parts[0].replace("_", " ") if len(parts) > 1 else "Unknown"
        disease_parsed = parts[1].replace("_", " ") if len(parts) > 1 else "Unknown"

        clean_key = best_class.replace("___", "_")
        rec = get_recommendation(clean_key)

        return {
            "crop": crop_parsed,
            "plant": crop_parsed,
            "disease": disease_parsed,
            "scientific_name": rec.get("scientific_name", "N/A"),
            "pathogen_type": rec.get("pathogen_type", "Fungus"),
            "status": rec["status"],
            "severity": rec["severity"],
            "confidence": round(best_prob, 4),
            "confidence_percent": round(best_prob * 100, 2),
            "supported": True,
            "symptoms": rec["symptoms"],
            "treatment": rec["treatment"],
            "prevention": rec["prevention"],
            "top_predictions": top3_list,
            "top3": top3_list,
            "processed_image": processed_preview,
            "heatmap_image": processed_preview
        }

_predictor_instance = None
def get_predictor():
    global _predictor_instance
    if _predictor_instance is None:
        _predictor_instance = CropDiseasePredictor()
    return _predictor_instance


