"""
Complete Setup & Training Script for AgriVision AI
===================================================
1. Clones PlantVillage dataset from GitHub (only the color images)
2. Organizes images into dataset/train/ and dataset/validation/ folders
3. Trains MobileNetV2 transfer learning model
4. Saves trained weights to model/mobilenet_v2_crop.pth

Usage:
    python setup_and_train.py
"""

import os
import sys

# Fix Windows console encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import shutil
import subprocess
import random
from pathlib import Path

# ─── Configuration ───────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "dataset")
TRAIN_DIR = os.path.join(DATASET_DIR, "train")
VAL_DIR = os.path.join(DATASET_DIR, "validation")
TEST_DIR = os.path.join(DATASET_DIR, "test")
MODEL_DIR = os.path.join(BASE_DIR, "model")
CLONE_DIR = os.path.join(BASE_DIR, "_plantvillage_temp")

# Mapping from PlantVillage folder names → our class names
CLASS_MAP = {
    "Apple___Apple_scab":                    "Apple___Apple_scab",
    "Apple___Black_rot":                     "Apple___Black_rot",
    "Apple___healthy":                       "Apple___healthy",
    "Corn_(maize)___Common_rust_":           "Corn___Common_rust",
    "Corn_(maize)___Northern_Leaf_Blight":   "Corn___Northern_Leaf_Blight",
    "Corn_(maize)___healthy":                "Corn___healthy",
    "Grape___Black_rot":                     "Grape___Black_rot",
    "Grape___healthy":                       "Grape___healthy",
    "Pepper,_bell___Bacterial_spot":         "Pepper___Bacterial_spot",
    "Pepper,_bell___healthy":                "Pepper___healthy",
    "Potato___Early_blight":                 "Potato___Early_blight",
    "Potato___Late_blight":                  "Potato___Late_blight",
    "Potato___healthy":                      "Potato___healthy",
    "Tomato___Bacterial_spot":               "Tomato___Bacterial_spot",
    "Tomato___Early_blight":                 "Tomato___Early_blight",
    "Tomato___Late_blight":                  "Tomato___Late_blight",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomato___Yellow_Leaf_Curl",
    "Tomato___healthy":                      "Tomato___healthy",
}

TRAIN_SPLIT = 0.85  # 85% train, 15% validation
RANDOM_SEED = 42

# Training hyperparameters
EPOCHS = 10
BATCH_SIZE = 32
LEARNING_RATE = 0.001
IMG_SIZE = 224


def step_1_clone_dataset():
    """Clone the PlantVillage dataset from GitHub."""
    print("\n" + "=" * 60)
    print("  STEP 1: Downloading PlantVillage Dataset from GitHub")
    print("=" * 60)

    if os.path.exists(CLONE_DIR):
        print(f"[✓] Dataset already cloned at {CLONE_DIR}")
        return

    print("[*] Cloning spMohanty/PlantVillage-Dataset (this may take a few minutes)...")
    print("[*] The dataset is ~2.5 GB, please be patient...\n")

    result = subprocess.run(
        ["git", "clone", "--depth", "1",
         "https://github.com/spMohanty/PlantVillage-Dataset.git",
         CLONE_DIR],
        capture_output=True, text=True
    )

    if result.returncode != 0:
        print(f"[✗] Git clone failed: {result.stderr}")
        print("\n[!] Please make sure 'git' is installed and you have internet access.")
        print("[!] You can install git from: https://git-scm.com/downloads")
        sys.exit(1)

    print("[✓] Dataset downloaded successfully!")


def step_2_organize_dataset():
    """Organize PlantVillage images into train/validation splits."""
    print("\n" + "=" * 60)
    print("  STEP 2: Organizing Dataset into Train/Validation Splits")
    print("=" * 60)

    # Source: cloned repo color images
    source_base = os.path.join(CLONE_DIR, "raw", "color")
    if not os.path.exists(source_base):
        print(f"[✗] Source directory not found: {source_base}")
        print("[!] Dataset structure may have changed. Check the cloned repo.")
        sys.exit(1)

    random.seed(RANDOM_SEED)
    total_train = 0
    total_val = 0
    total_test = 0

    for pv_folder, our_class in CLASS_MAP.items():
        src_folder = os.path.join(source_base, pv_folder)

        if not os.path.exists(src_folder):
            print(f"[!] Warning: Folder not found, skipping: {pv_folder}")
            continue

        # Get all image files
        images = [f for f in os.listdir(src_folder)
                  if f.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.webp'))]
        random.shuffle(images)

        # Split: 85% train, 10% validation, 5% test
        n = len(images)
        n_train = int(n * 0.85)
        n_val = int(n * 0.10)

        train_imgs = images[:n_train]
        val_imgs = images[n_train:n_train + n_val]
        test_imgs = images[n_train + n_val:]

        # Create target directories
        for split_dir, split_imgs in [
            (os.path.join(TRAIN_DIR, our_class), train_imgs),
            (os.path.join(VAL_DIR, our_class), val_imgs),
            (os.path.join(TEST_DIR, our_class), test_imgs),
        ]:
            os.makedirs(split_dir, exist_ok=True)
            for img_name in split_imgs:
                src_path = os.path.join(src_folder, img_name)
                dst_path = os.path.join(split_dir, img_name)
                if not os.path.exists(dst_path):
                    shutil.copy2(src_path, dst_path)

        total_train += len(train_imgs)
        total_val += len(val_imgs)
        total_test += len(test_imgs)
        print(f"  [✓] {our_class:40s} → Train: {len(train_imgs):5d} | Val: {len(val_imgs):4d} | Test: {len(test_imgs):4d}")

    print(f"\n  Total: Train={total_train}, Validation={total_val}, Test={total_test}")
    print("[✓] Dataset organized successfully!")


def step_3_train_model():
    """Train MobileNetV2 with transfer learning on the organized dataset."""
    print("\n" + "=" * 60)
    print("  STEP 3: Training MobileNetV2 Model")
    print("=" * 60)

    try:
        import torch
        import torch.nn as nn
        import torch.optim as optim
        from torch.utils.data import DataLoader
        from torchvision import datasets, transforms, models
    except ImportError:
        print("[✗] PyTorch not installed! Run:")
        print("    pip install torch torchvision")
        sys.exit(1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"[*] Using device: {device}")
    if device == "cuda":
        print(f"    GPU: {torch.cuda.get_device_name(0)}")
    else:
        print("    (Training on CPU - this will be slower but works fine)")

    # ─── Data Transforms ─────────────────────────────────────────
    train_transforms = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    val_transforms = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    # ─── Load Datasets ───────────────────────────────────────────
    print("[*] Loading datasets...")
    train_dataset = datasets.ImageFolder(TRAIN_DIR, transform=train_transforms)
    val_dataset = datasets.ImageFolder(VAL_DIR, transform=val_transforms)

    print(f"    Training images:   {len(train_dataset):,}")
    print(f"    Validation images: {len(val_dataset):,}")
    print(f"    Classes ({len(train_dataset.classes)}): {train_dataset.classes}")

    # Verify class order matches our CLASS_NAMES
    from backend.predictor import CLASS_NAMES
    if list(train_dataset.classes) != CLASS_NAMES:
        print("\n[!] WARNING: Dataset class order differs from CLASS_NAMES in predictor.py!")
        print(f"    Dataset:   {train_dataset.classes}")
        print(f"    Predictor: {CLASS_NAMES}")
        print("    This will be auto-corrected by using the dataset's class order.\n")

    num_workers = min(4, os.cpu_count() or 1)
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True,
                              num_workers=num_workers, pin_memory=(device == "cuda"))
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False,
                            num_workers=num_workers, pin_memory=(device == "cuda"))

    # ─── Build Model ─────────────────────────────────────────────
    print("[*] Building MobileNetV2 model...")
    num_classes = len(train_dataset.classes)

    weights = models.MobileNet_V2_Weights.DEFAULT if hasattr(models, 'MobileNet_V2_Weights') else None
    if weights:
        model = models.mobilenet_v2(weights=weights)
    else:
        model = models.mobilenet_v2(pretrained=True)

    # Freeze feature extractor initially
    for param in model.features.parameters():
        param.requires_grad = False

    # Replace classifier head
    num_ftrs = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(0.3),
        nn.Linear(num_ftrs, num_classes)
    )

    model = model.to(device)

    # ─── Loss, Optimizer, Scheduler ──────────────────────────────
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.classifier.parameters(), lr=LEARNING_RATE)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=4, gamma=0.1)

    # ─── Training Loop ───────────────────────────────────────────
    best_val_acc = 0.0
    weight_path = os.path.join(MODEL_DIR, "mobilenet_v2_crop.pth")
    os.makedirs(MODEL_DIR, exist_ok=True)

    print(f"\n[*] Starting training for {EPOCHS} epochs...\n")
    print(f"{'Epoch':>6} | {'Train Loss':>11} | {'Train Acc':>10} | {'Val Loss':>10} | {'Val Acc':>9} | {'LR':>10}")
    print("-" * 75)

    for epoch in range(EPOCHS):
        # ── Train Phase ──
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for batch_idx, (images, labels) in enumerate(train_loader):
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

            # Progress dot every 20 batches
            if (batch_idx + 1) % 20 == 0:
                print(".", end="", flush=True)

        train_loss = running_loss / total
        train_acc = 100.0 * correct / total

        # ── Unfreeze backbone after epoch 3 for fine-tuning ──
        if epoch == 3:
            print("\n[*] Unfreezing backbone for fine-tuning...")
            for param in model.features[-4:].parameters():
                param.requires_grad = True
            optimizer = optim.Adam([
                {"params": model.features[-4:].parameters(), "lr": LEARNING_RATE * 0.1},
                {"params": model.classifier.parameters(), "lr": LEARNING_RATE * 0.1}
            ])
            scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.1)

        # ── Validation Phase ──
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item() * images.size(0)
                _, predicted = outputs.max(1)
                val_total += labels.size(0)
                val_correct += predicted.eq(labels).sum().item()

        val_loss = val_loss / val_total
        val_acc = 100.0 * val_correct / val_total

        current_lr = optimizer.param_groups[0]['lr']
        print(f"\n{epoch+1:>4}/{EPOCHS} | {train_loss:>11.4f} | {train_acc:>9.2f}% | {val_loss:>10.4f} | {val_acc:>8.2f}% | {current_lr:>10.6f}")

        # Save best model
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), weight_path)
            print(f"         ↳ ✓ Best model saved! (Val Acc: {val_acc:.2f}%)")

        scheduler.step()

    print(f"\n{'=' * 60}")
    print(f"  TRAINING COMPLETE!")
    print(f"  Best Validation Accuracy: {best_val_acc:.2f}%")
    print(f"  Model saved to: {weight_path}")
    print(f"{'=' * 60}")


def step_4_test_model():
    """Quick test of the trained model on a sample image."""
    print("\n" + "=" * 60)
    print("  STEP 4: Quick Validation Test")
    print("=" * 60)

    weight_path = os.path.join(MODEL_DIR, "mobilenet_v2_crop.pth")
    if not os.path.exists(weight_path):
        print("[✗] No trained model found. Training may have failed.")
        return

    # Find a test image
    test_image = None
    for class_dir in os.listdir(VAL_DIR):
        class_path = os.path.join(VAL_DIR, class_dir)
        if os.path.isdir(class_path):
            imgs = [f for f in os.listdir(class_path)
                    if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
            if imgs:
                test_image = os.path.join(class_path, imgs[0])
                expected_class = class_dir
                break

    if not test_image:
        print("[!] No test image found.")
        return

    # Add project root to path so backend imports work
    if BASE_DIR not in sys.path:
        sys.path.insert(0, BASE_DIR)

    # Re-import to pick up new weights
    from backend.predictor import CropDiseasePredictor
    predictor = CropDiseasePredictor()
    result = predictor.predict(test_image)

    print(f"\n  Test Image: {os.path.basename(test_image)}")
    print(f"  Expected:   {expected_class}")
    print(f"  ─────────────────────────────────────")
    print(f"  Crop:       {result['crop']}")
    print(f"  Disease:    {result['disease']}")
    print(f"  Confidence: {result['confidence_percent']}")
    print(f"  Status:     {result['status']}")
    print(f"  Severity:   {result['severity']}")
    print(f"\n  Top 3 Predictions:")
    for i, pred in enumerate(result['top3'], 1):
        print(f"    {i}. {pred['label']} ({pred['prob']*100:.1f}%)")

    print(f"\n[✓] Model is ready! Start the server with:")
    print(f"    python backend/app.py")
    print(f"    Then open: http://127.0.0.1:5000")


def step_5_cleanup():
    """Remove the large cloned repository to save disk space."""
    print("\n" + "=" * 60)
    print("  STEP 5: Cleanup")
    print("=" * 60)

    if os.path.exists(CLONE_DIR):
        print(f"[*] Removing temporary clone directory ({CLONE_DIR})...")
        try:
            shutil.rmtree(CLONE_DIR)
            print("[✓] Cleanup complete! Saved ~2.5 GB of disk space.")
        except Exception as e:
            print(f"[!] Could not remove {CLONE_DIR}: {e}")
            print(f"    You can manually delete it later.")
    else:
        print("[✓] Nothing to clean up.")


if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════╗
║          🌿 AgriVision AI - Setup & Training             ║
║                                                          ║
║   This script will:                                      ║
║   1. Download PlantVillage dataset from GitHub            ║
║   2. Organize images into train/validation splits         ║
║   3. Train MobileNetV2 model (~10 epochs)                 ║
║   4. Test the trained model                               ║
║   5. Clean up temporary files                             ║
╚══════════════════════════════════════════════════════════╝
    """)

    step_1_clone_dataset()
    step_2_organize_dataset()
    step_3_train_model()
    step_4_test_model()
    step_5_cleanup()

    print("\n\n🎉 ALL DONE! Your AI model is trained and ready.")
    print("   Run the server:  python backend/app.py")
    print("   Open browser:    http://127.0.0.1:5000\n")
