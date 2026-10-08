# Crop Disease Dataset Repository

This folder organizes the image datasets for training, validating, and testing deep learning models (such as MobileNetV2 / CNNs).

## Directory Structure

```
dataset/
├── train/
│   ├── Tomato___Early_blight/
│   ├── Tomato___Late_blight/
│   ├── Tomato___healthy/
│   ├── Potato___Early_blight/
│   ├── Potato___Late_blight/
│   ├── Potato___healthy/
│   ├── Corn___Common_rust/
│   ├── Corn___healthy/
│   ├── Apple___Apple_scab/
│   └── Apple___healthy/
├── validation/
│   ├── ... (same class subfolders for validation split)
└── test/
    ├── ... (test specimens for model evaluation)
```

## Supported Datasets

1. **PlantVillage Dataset**: Widely used benchmark for 38 classes across 14 crop species.
2. **Kaggle New Plant Diseases Dataset**: 87,000+ augmented and RGB leaf images.
3. Custom agricultural drone / smartphone leaf field captures.

Images placed inside these directories can be directly trained using `notebooks/training.ipynb` or loaded via `torchvision.datasets.ImageFolder`.
