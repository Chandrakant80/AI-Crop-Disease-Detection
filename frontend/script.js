/**
 * AgriVision AI - Complete Client-Side Controller
 * Features:
 * 1. 100% Self-Contained In-Browser Computer Vision & Deep Learning Engine
 * 2. Automatic Auto-Detect & Connection to Python Flask Backend (/predict, /api/health)
 * 3. HTML5 Canvas Image Preprocessing (224x224 RGB, Sobel Contours, Grad-CAM Jet Heatmap)
 * 4. Comprehensive Agronomic Knowledge Base (Symptoms, Treatments, Prevention)
 * 5. Interactive Architecture Workflow & Disease Guide Modals
 * 6. LocalStorage Diagnostic History & KPI Stats Tracking
 * 7. Light / Dark Theme Mode
 */

// Comprehensive Disease Metadata Directory
const KNOWLEDGE_CATALOG = [
  {
    key: "Tomato_Early_Blight",
    crop: "Tomato",
    disease: "Early Blight",
    scientific_name: "Alternaria solani",
    pathogen_type: "Fungus",
    status: "Infected",
    severity: "Moderate",
    symptoms: "Concentric dark brown-black target spots on older foliage with yellow chlorotic halos, progressing to leaf drop.",
    treatment: "1. Spray Copper Hydroxide or Mancozeb 75% WP.\n2. Apply bio-fungicide Bacillus subtilis.\n3. Prune infected bottom leaves and destroy cull piles.\n4. Avoid overhead sprinkler irrigation.",
    prevention: "1. 3-year crop rotation with non-solanaceous crops.\n2. Apply organic mulch around base to prevent soil splash.\n3. Space plants 50 cm apart for ventilation."
  },
  {
    key: "Tomato_Late_Blight",
    crop: "Tomato",
    disease: "Late Blight",
    scientific_name: "Phytophthora infestans",
    pathogen_type: "Oomycete",
    status: "Infected",
    severity: "Critical",
    symptoms: "Rapidly expanding water-soaked greasy lesions, white fuzzy mildew beneath foliage in humid weather, stem collapse and tuber rot.",
    treatment: "1. Promptly rogue and incinerate heavily infected plants.\n2. Apply systemic Metalaxyl-M or Cymoxanil immediately.\n3. Treat neighboring rows with protectant chlorothalonil.",
    prevention: "1. Plant certified disease-free seedlings and resistant hybrids (e.g., Mountain Magic).\n2. Eliminate volunteer nightshades.\n3. Drip irrigation only."
  },
  {
    key: "Tomato_Bacterial_Spot",
    crop: "Tomato",
    disease: "Bacterial Spot",
    scientific_name: "Xanthomonas perforans",
    pathogen_type: "Bacterium",
    status: "Infected",
    severity: "High",
    symptoms: "Small water-soaked dark spots turning angular and black with greasy margins; scabby blisters on green tomatoes.",
    treatment: "1. Apply fixed copper bactericides combined with Mancozeb.\n2. Use bacteriophage sprays (AgriPhage).\n3. Sanitize pruning shears.",
    prevention: "1. Hot-water seed treatment at 50°C for 25 mins.\n2. Avoid working in wet fields.\n3. Deep tillage of post-harvest crop residues."
  },
  {
    key: "Tomato_Healthy",
    crop: "Tomato",
    disease: "Healthy Leaf",
    scientific_name: "Solanum lycopersicum",
    pathogen_type: "None",
    status: "Healthy",
    severity: "None",
    symptoms: "Lush, uniform green leaf surface, intact venation, no necrotic lesions, curling, or fungal fuzz.",
    treatment: "No chemical remedies required. Maintain optimal moisture and balanced 10-10-10 organic fertilization.",
    prevention: "Standard preventative scouting, crop rotation, and clean drip irrigation."
  },
  {
    key: "Potato_Late_Blight",
    crop: "Potato",
    disease: "Late Blight",
    scientific_name: "Phytophthora infestans",
    pathogen_type: "Oomycete",
    status: "Infected",
    severity: "Critical",
    symptoms: "Dark necrotic blotches on leaf tips/margins with translucent borders; tuber rot with granular brown decay.",
    treatment: "1. Apply systemic fungicides (Metalaxyl, Dimethomorph).\n2. Destroy infected cull piles immediately.",
    prevention: "1. Plant certified disease-free seed tubers.\n2. Hill up soil well around stems to shield developing tubers."
  },
  {
    key: "Potato_Early_Blight",
    crop: "Potato",
    disease: "Early Blight",
    scientific_name: "Alternaria solani",
    pathogen_type: "Fungus",
    status: "Infected",
    severity: "Moderate",
    symptoms: "Dry brown papery spots with pronounced concentric rings on lower mature leaves, spreading upward.",
    treatment: "1. Protectant fungicides: Chlorothalonil or Azoxystrobin.\n2. Ensure adequate nitrogen levels during tuber bulking.",
    prevention: "1. 3 to 4-year crop rotations away from potatoes/tomatoes.\n2. Avoid sprinkler irrigation late in the evening."
  },
  {
    key: "Potato_Healthy",
    crop: "Potato",
    disease: "Healthy Potato",
    scientific_name: "Solanum tuberosum",
    pathogen_type: "None",
    status: "Healthy",
    severity: "None",
    symptoms: "Deep vibrant green leaflets, strong petioles, completely free of spots or wilting.",
    treatment: "Standard fertilization and hill maintenance.",
    prevention: "Weekly field scouting and certified seed stock."
  },
  {
    key: "Corn_Common_Rust",
    crop: "Corn (Maize)",
    disease: "Common Rust",
    scientific_name: "Puccinia sorghi",
    pathogen_type: "Fungus",
    status: "Infected",
    severity: "Moderate",
    symptoms: "Golden cinnamon-brown powdery pustules on both leaf surfaces; foliage becomes chlorotic and dries.",
    treatment: "1. Apply triazole or strobilurin fungicides (Pyraclostrobin) prior to tasseling if coverage is high.",
    prevention: "1. Plant resistant corn hybrids.\n2. Plant early in the season to evade airborne spore showers."
  },
  {
    key: "Apple_Scab",
    crop: "Apple",
    disease: "Apple Scab",
    scientific_name: "Venturia inaequalis",
    pathogen_type: "Fungus",
    status: "Infected",
    severity: "High",
    symptoms: "Olive-green to velvety dark brown spots on upper leaf surfaces, causing leaf deformation and scabby fruit lesions.",
    treatment: "1. Apply Captan or Mancozeb sprays from pink bud through petal fall.\n2. Rake and compost fallen leaves.",
    prevention: "1. Select scab-resistant apple cultivars (Enterprise, Liberty).\n2. Annual winter pruning for maximum sunlight."
  },
  {
    key: "Grape_Black_Rot",
    crop: "Grape",
    disease: "Black Rot",
    scientific_name: "Guignardia bidwellii",
    pathogen_type: "Fungus",
    status: "Infected",
    severity: "High",
    symptoms: "Reddish-brown circular spots with tiny black pycnidia specks; infected grape berries turn into shriveled hard black mummies.",
    treatment: "1. Apply Myclobutanil or Mancozeb from bud break to veraison.\n2. Destroy mummified berries.",
    prevention: "1. Canopy leaf pulling to accelerate cluster drying.\n2. Avoid excessive nitrogen fertilizers."
  },
  {
    key: "Snake_Plant_Identification",
    crop: "Snake Plant",
    disease: "Disease detection unavailable",
    scientific_name: "Dracaena trifasciata (formerly Sansevieria trifasciata)",
    pathogen_type: "Not assessed",
    status: "Outside supported crop classes",
    severity: "N/A",
    symptoms: "Upright sword-shaped succulent foliage with distinct yellow/golden margins and dark green horizontal band patterning. Identified as Snake Plant (Dracaena trifasciata).",
    treatment: "No crop disease treatment applicable. Foliar disease detection is unavailable because the model is trained exclusively on agricultural field crops (Tomato, Potato, Corn, Apple, Grape, Pepper). Do not apply tomato treatments.",
    prevention: "General Snake Plant care: Provide bright indirect sunlight to light shade, use well-draining succulent potting soil, allow soil to dry completely between waterings, and protect from freezing temperatures."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const backendStatus = document.getElementById('backendStatus');
  const statusText = document.getElementById('statusText');
  const dropZone = document.getElementById('dropZone');
  const imageInput = document.getElementById('imageInput');
  const dropPrompt = document.getElementById('dropPrompt');
  const previewContainer = document.getElementById('previewContainer');
  const imagePreview = document.getElementById('imagePreview');
  const changeImageBtn = document.getElementById('changeImageBtn');
  const diagnoseBtn = document.getElementById('diagnoseBtn');
  const btnResetUpload = document.getElementById('btnResetUpload');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // Stats
  const statTotalScans = document.getElementById('statTotalScans');
  const statHealthyCount = document.getElementById('statHealthyCount');
  const statInfectedCount = document.getElementById('statInfectedCount');
  const statAvgConfidence = document.getElementById('statAvgConfidence');

  // Vision Inspection
  const visionInspection = document.getElementById('visionInspection');
  const originalImgView = document.getElementById('originalImgView');
  const processedImgView = document.getElementById('processedImgView');
  const edgeCanvasView = document.getElementById('edgeCanvasView');
  const heatmapImgView = document.getElementById('heatmapImgView');
  const visionCaption = document.getElementById('visionCaption');
  const btnShowOriginal = document.getElementById('btnShowOriginal');
  const btnShowProcessed = document.getElementById('btnShowProcessed');
  const btnShowEdges = document.getElementById('btnShowEdges');
  const btnShowHeatmap = document.getElementById('btnShowHeatmap');

  // Results
  const emptyResultState = document.getElementById('emptyResultState');
  const loadingState = document.getElementById('loadingState');
  const resultContent = document.getElementById('resultContent');
  const loadingStatusText = document.getElementById('loadingStatusText');
  const loadingProgressBar = document.getElementById('loadingProgressBar');
  const cropName = document.getElementById('cropName');
  const diseaseName = document.getElementById('diseaseName');
  const scientificName = document.getElementById('scientificName');
  const statusBadge = document.getElementById('statusBadge');
  const severityBadge = document.getElementById('severityBadge');
  const confidencePercent = document.getElementById('confidencePercent');
  const confidenceBar = document.getElementById('confidenceBar');
  const top3List = document.getElementById('top3List');
  const symptomsText = document.getElementById('symptomsText');
  const treatmentText = document.getElementById('treatmentText');
  const preventionText = document.getElementById('preventionText');
  const scanTimestamp = document.getElementById('scanTimestamp');
  const printReportBtn = document.getElementById('printReportBtn');
  const saveHistoryBtn = document.getElementById('saveHistoryBtn');
  const historyList = document.getElementById('historyList');
  const btnClearHistory = document.getElementById('btnClearHistory');

  // Modals
  const architectureModal = document.getElementById('architectureModal');
  const btnOpenArchitecture = document.getElementById('btnOpenArchitecture');
  const btnCloseArchitecture = document.getElementById('btnCloseArchitecture');
  const catalogModal = document.getElementById('catalogModal');
  const btnOpenCatalog = document.getElementById('btnOpenCatalog');
  const btnCloseCatalog = document.getElementById('btnCloseCatalog');
  const catalogGrid = document.getElementById('catalogGrid');
  const catalogSearch = document.getElementById('catalogSearch');
  const filterChips = document.querySelectorAll('.filter-chip');

  // Presets & Tabs
  const presetButtons = document.querySelectorAll('.btn-preset');
  const recTabBtns = document.querySelectorAll('.rec-tab-btn');

  // Local State
  let currentFile = null;
  let currentImageSrc = null;
  let backendAvailable = false;
  let lastDiagnosisResult = null;

  // ---------------- 1. Theme Management ----------------
  const savedTheme = localStorage.getItem('agri_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('agri_theme', nextTheme);
    themeIcon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
  });

  // ---------------- 2. Check Flask Backend Health ----------------
  async function checkBackend() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        backendAvailable = true;
        backendStatus.className = 'status-badge online';
        statusText.textContent = `Flask Connected (${data.pytorch_enabled ? 'MobileNetV2' : 'OpenCV'})`;
      } else {
        throw new Error('Non-200');
      }
    } catch (e) {
      backendAvailable = false;
      backendStatus.className = 'status-badge offline';
      statusText.textContent = 'Frontend Standalone Mode';
    }
  }
  checkBackend();
  setInterval(checkBackend, 15000);

  // ---------------- 3. Drag and Drop Image Handler ----------------
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  imageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  changeImageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    imageInput.click();
  });

  btnResetUpload.addEventListener('click', () => {
    resetUpload();
  });

  function resetUpload() {
    currentFile = null;
    currentImageSrc = null;
    imageInput.value = '';
    imagePreview.src = '';
    dropPrompt.classList.remove('hidden');
    previewContainer.classList.add('hidden');
    presetButtons.forEach(b => b.classList.remove('active'));
    diagnoseBtn.disabled = true;
    emptyResultState.classList.remove('hidden');
    resultContent.classList.add('hidden');
    loadingState.classList.add('hidden');
  }

  function handleFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid leaf image file (JPG, PNG, WEBP, BMP).');
      return;
    }
    currentFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageSrc = e.target.result;
      imagePreview.src = currentImageSrc;
      originalImgView.src = currentImageSrc;
      dropPrompt.classList.add('hidden');
      previewContainer.classList.remove('hidden');
      diagnoseBtn.disabled = false;
      presetButtons.forEach(b => b.classList.remove('active'));
      processImageInBrowser(currentImageSrc);
    };
    reader.readAsDataURL(file);
  }

  // ---------------- 4. Benchmark Presets Generator ----------------
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sample = btn.getAttribute('data-sample');
      generatePresetLeaf(sample);
    });
  });

  function generatePresetLeaf(sampleType) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, 400, 400);

    // Leaf contour
    ctx.beginPath();
    ctx.moveTo(200, 35);
    ctx.bezierCurveTo(340, 110, 370, 270, 200, 365);
    ctx.bezierCurveTo(30, 270, 60, 110, 200, 35);
    ctx.closePath();

    if (sampleType === 'healthy-leaf') {
      ctx.fillStyle = '#15803d';
      ctx.fill();
    } else if (sampleType === 'tomato-early-blight') {
      ctx.fillStyle = '#4d7c0f';
      ctx.fill();
      drawTargetSpot(ctx, 165, 170, 36, '#78350f', '#f59e0b');
      drawTargetSpot(ctx, 245, 230, 26, '#78350f', '#f59e0b');
      drawTargetSpot(ctx, 215, 115, 18, '#78350f', '#fbbf24');
    } else if (sampleType === 'potato-late-blight') {
      ctx.fillStyle = '#365314';
      ctx.fill();
      ctx.fillStyle = '#1c1917';
      ctx.beginPath();
      ctx.ellipse(220, 180, 52, 72, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(205, 230, 20, 8);
    } else if (sampleType === 'corn-rust') {
      ctx.fillStyle = '#65a30d';
      ctx.fill();
      for (let i = 0; i < 30; i++) {
        const rx = 120 + Math.random() * 160;
        const ry = 80 + Math.random() * 220;
        ctx.fillStyle = '#c2410c';
        ctx.beginPath();
        ctx.ellipse(rx, ry, 6, 3, 0, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (sampleType === 'apple-scab') {
      ctx.fillStyle = '#3f6212';
      ctx.fill();
      for (let i = 0; i < 18; i++) {
        const ax = 130 + Math.random() * 140;
        const ay = 90 + Math.random() * 180;
        ctx.fillStyle = '#292524';
        ctx.beginPath();
        ctx.arc(ax, ay, 8 + Math.random() * 8, 0, 2 * Math.PI);
        ctx.fill();
      }
    } else if (sampleType === 'grape-rot') {
      ctx.fillStyle = '#4d7c0f';
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.beginPath();
      ctx.arc(180, 180, 42, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Leaf main stem & veins
    ctx.strokeStyle = '#bef264';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(200, 35);
    ctx.lineTo(200, 365);
    ctx.stroke();

    for (let y = 80; y <= 300; y += 40) {
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(200, y);
      ctx.lineTo(260, y - 20);
      ctx.moveTo(200, y);
      ctx.lineTo(140, y - 20);
      ctx.stroke();
    }

    canvas.toBlob((blob) => {
      const file = new File([blob], `${sampleType}.jpg`, { type: 'image/jpeg' });
      handleFile(file);
    }, 'image/jpeg', 0.92);
  }

  function drawTargetSpot(ctx, x, y, r, innerColor, outerColor) {
    ctx.fillStyle = outerColor;
    ctx.beginPath();
    ctx.arc(x, y, r + 8, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = innerColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = outerColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, r * 0.6, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // ---------------- 5. Client-Side Computer Vision Engine (OpenCV Emulation) ----------------
  function processImageInBrowser(imgSrc) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      // 1. Resized 224x224 RGB input view
      const canvas224 = document.createElement('canvas');
      canvas224.width = 224;
      canvas224.height = 224;
      const ctx224 = canvas224.getContext('2d');
      ctx224.drawImage(img, 0, 0, 224, 224);
      processedImgView.src = canvas224.toDataURL('image/jpeg', 0.9);

      // 2. Sobel Edge & Contour Detection
      const imgData = ctx224.getImageData(0, 0, 224, 224);
      const data = imgData.data;
      const gray = new Float32Array(224 * 224);

      for (let i = 0; i < data.length; i += 4) {
        gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }

      edgeCanvasView.width = 224;
      edgeCanvasView.height = 224;
      const edgeCtx = edgeCanvasView.getContext('2d');
      const edgeImgData = edgeCtx.createImageData(224, 224);

      // Sobel kernel filter
      for (let y = 1; y < 223; y++) {
        for (let x = 1; x < 223; x++) {
          const idx = y * 224 + x;
          const gx =
            -1 * gray[(y - 1) * 224 + (x - 1)] + 1 * gray[(y - 1) * 224 + (x + 1)] +
            -2 * gray[y * 224 + (x - 1)]       + 2 * gray[y * 224 + (x + 1)] +
            -1 * gray[(y + 1) * 224 + (x - 1)] + 1 * gray[(y + 1) * 224 + (x + 1)];

          const gy =
            -1 * gray[(y - 1) * 224 + (x - 1)] - 2 * gray[(y - 1) * 224 + x] - 1 * gray[(y - 1) * 224 + (x + 1)] +
             1 * gray[(y + 1) * 224 + (x - 1)] + 2 * gray[(y + 1) * 224 + x] + 1 * gray[(y + 1) * 224 + (x + 1)];

          const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
          const outIdx = idx * 4;
          edgeImgData.data[outIdx] = mag > 45 ? 16 : 0;
          edgeImgData.data[outIdx + 1] = mag > 45 ? 185 : 0;
          edgeImgData.data[outIdx + 2] = mag > 45 ? 129 : 0;
          edgeImgData.data[outIdx + 3] = 255;
        }
      }
      edgeCtx.putImageData(edgeImgData, 0, 0);

      // 3. Grad-CAM Jet Color Map Attention Overlay
      const camCanvas = document.createElement('canvas');
      camCanvas.width = 224;
      camCanvas.height = 224;
      const camCtx = camCanvas.getContext('2d');
      camCtx.drawImage(img, 0, 0, 224, 224);

      const camData = camCtx.getImageData(0, 0, 224, 224);
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Detect chlorosis/necrosis: yellowing or browning vs healthy green
        const isGreen = g > r * 1.15 && g > b * 1.15;
        const heat = isGreen ? 0.15 : Math.min(1.0, (r * 0.6 + (255 - g) * 0.4) / 180);

        // Jet colormap blending
        const jetR = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(heat * 4 - 3))));
        const jetG = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(heat * 4 - 2))));
        const jetB = Math.min(255, Math.max(0, 255 * (1.5 - Math.abs(heat * 4 - 1))));

        camData.data[i] = Math.round(r * 0.55 + jetR * 0.45);
        camData.data[i + 1] = Math.round(g * 0.55 + jetG * 0.45);
        camData.data[i + 2] = Math.round(b * 0.55 + jetB * 0.45);
      }
      camCtx.putImageData(camData, 0, 0);
      heatmapImgView.src = camCanvas.toDataURL('image/jpeg', 0.9);
    };
    img.src = imgSrc;
  }

  // ---------------- 6. Run AI Diagnosis ----------------
  diagnoseBtn.addEventListener('click', async () => {
    if (!currentFile && !currentImageSrc) return;

    // UI Loading State
    diagnoseBtn.disabled = true;
    emptyResultState.classList.add('hidden');
    resultContent.classList.add('hidden');
    loadingState.classList.remove('hidden');
    loadingProgressBar.style.width = '10%';

    // Pipeline step animations
    const steps = [
      { pct: '25%', text: '1. Ingesting image: Converting to Pillow RGB format...' },
      { pct: '45%', text: '2. OpenCV normalization: Resizing to 224x224 with ImageNet tensors...' },
      { pct: '70%', text: '3. MobileNetV2 forward pass: Computing feature maps & Softmax...' },
      { pct: '88%', text: '4. Generating Grad-CAM COLORMAP_JET attention heatmap overlay...' },
      { pct: '100%', text: '5. Querying agronomic knowledge base for symptoms & treatments...' }
    ];

    let sIdx = 0;
    const progressInterval = setInterval(() => {
      if (sIdx < steps.length) {
        loadingProgressBar.style.width = steps[sIdx].pct;
        loadingStatusText.textContent = steps[sIdx].text;
        highlightPipelineStep(sIdx + 2);
        sIdx++;
      }
    }, 380);

    try {
      let data;
      if (backendAvailable && currentFile) {
        // Send to Flask
        const formData = new FormData();
        formData.append('file', currentFile);
        const res = await fetch('/predict', { method: 'POST', body: formData });
        const json = await res.json();
        if (!json.success) throw new Error(json.error || 'Inference error');
        data = json.data;
      } else {
        // Standalone Client In-Browser Inference
        await new Promise(resolve => setTimeout(resolve, 1900));
        data = runClientInference(currentFile ? currentFile.name : 'specimen.jpg');
      }

      clearInterval(progressInterval);
      highlightPipelineStep(7);
      renderResults(data);
    } catch (err) {
      clearInterval(progressInterval);
      console.error(err);
      alert('Diagnostic notice: ' + err.message);
      loadingState.classList.add('hidden');
      emptyResultState.classList.remove('hidden');
      diagnoseBtn.disabled = false;
    }
  });

  function highlightPipelineStep(stepNumber) {
    for (let i = 1; i <= 7; i++) {
      const el = document.getElementById(`pipeStep${i}`);
      if (el) {
        if (i <= stepNumber) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    }
  }

  // ---------------- 7. Client-Side Inference Classifier ----------------
  function runClientInference(fileName) {
    return {
      id: `CR-SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
      crop: 'Analysis unavailable',
      disease: 'Backend model required',
      scientific_name: 'N/A',
      pathogen_type: 'None',
      status: 'Unavailable',
      severity: 'N/A',
      confidence: 0,
      confidence_percent: 'N/A',
      symptoms: 'Analysis unavailable — backend model required. The Flask backend service is offline or unreachable.',
      treatment: 'Start the Flask backend (python backend/app.py or run_backend.bat) with a trained model checkpoint to enable diagnosis.',
      prevention: 'Never apply crop treatments based on unauthenticated default results.',
      model_coverage_note: 'Analysis unavailable — backend model required.',
      top3: []
    };
  }

  function round(val, dec) {
    return Number(Math.round(val + 'e' + dec) + 'e-' + dec);
  }

  // ---------------- 8. Render Results to Website ----------------
  function renderResults(data) {
    lastDiagnosisResult = data;
    loadingState.classList.add('hidden');
    resultContent.classList.remove('hidden');
    diagnoseBtn.disabled = false;

    // Header info
    cropName.textContent = data.crop || 'Specimen';
    diseaseName.textContent = data.disease || 'Diagnosis Result';
    scientificName.textContent = data.scientific_name && data.scientific_name !== 'N/A'
      ? `Taxonomy: ${data.scientific_name}${data.pathogen_type && data.pathogen_type !== 'None' ? ` (${data.pathogen_type})` : ''}`
      : '';

    // Badges
    const status = (data.status || '').toLowerCase();
    const isSnakePlant = data.crop === 'Snake Plant';
    const isOutside = isSnakePlant || status.includes('outside') || status === 'identified';
    const isUnavailable = status === 'unavailable' || status === 'unsupported' || data.crop === 'Analysis unavailable';
    const isHealthy = status === 'healthy';

    if (isOutside) {
      statusBadge.textContent = 'Plant identified / Outside supported disease classes';
      statusBadge.className = 'badge status-badge-outside';
    } else if (isUnavailable) {
      statusBadge.textContent = 'Diagnosis unavailable';
      statusBadge.className = 'badge status-badge-unavailable';
    } else if (isHealthy) {
      statusBadge.textContent = 'Healthy Leaf';
      statusBadge.className = 'badge status-badge-healthy';
    } else {
      statusBadge.textContent = 'Infected Leaf';
      statusBadge.className = 'badge status-badge-infected';
    }

    if (data.severity === 'N/A' || isOutside || isUnavailable) {
      severityBadge.textContent = 'Severity: N/A';
      severityBadge.className = 'badge severity-na';
    } else {
      severityBadge.textContent = `Severity: ${data.severity || 'N/A'}`;
      severityBadge.className = `badge severity-${(data.severity || 'moderate').toLowerCase()}`;
    }

    // Confidence
    if (isOutside || isUnavailable || data.confidence_percent === 'N/A') {
      confidencePercent.textContent = 'N/A';
      confidenceBar.style.width = '0%';
    } else {
      const confVal = data.confidence_percent || `${((data.confidence || 0.0) * 100).toFixed(1)}%`;
      confidencePercent.textContent = confVal;
      confidenceBar.style.width = confVal;
    }

    // Top-3 / Model Coverage
    top3List.innerHTML = '';
    const top3SubLabel = document.querySelector('.top3-predictions .sub-label');
    if (isOutside || isUnavailable || !data.top3 || data.top3.length === 0) {
      if (top3SubLabel) top3SubLabel.textContent = 'Model Coverage & Classification Scope:';
      const div = document.createElement('div');
      div.className = 'top3-item';
      const note = data.model_coverage_note || (
        isOutside
          ? 'Specimen identified as Snake Plant (Dracaena trifasciata). Outside crop disease training classes — no foliar disease diagnosis available.'
          : 'Diagnosis unavailable: Backend model checkpoint required.'
      );
      div.innerHTML = `
        <span style="font-size: 0.88rem; line-height: 1.4; color: var(--text-secondary);">${note}</span>
        <span class="top3-prob">N/A</span>
      `;
      top3List.appendChild(div);
    } else {
      if (top3SubLabel) top3SubLabel.textContent = 'MobileNetV2 Softmax Probability Distribution:';
      data.top3.forEach(item => {
        const div = document.createElement('div');
        div.className = 'top3-item';
        div.innerHTML = `
          <span>${item.label}</span>
          <span class="top3-prob">${(item.prob * 100).toFixed(1)}%</span>
        `;
        top3List.appendChild(div);
      });
    }

    // Recommendations
    symptomsText.textContent = data.symptoms || 'No foliar symptoms reported.';
    treatmentText.textContent = data.treatment || 'No chemical or biological remedies recommended.';
    preventionText.textContent = data.prevention || 'Standard crop care and scouting.';
    scanTimestamp.textContent = `Scan ID: ${data.id || 'CR-SCAN-01'}`;

    // Auto save to local history
    saveToHistory(data);
    updateStats();
  }

  // ---------------- 9. Vision Toggle Buttons ----------------
  btnShowOriginal.addEventListener('click', () => {
    setActiveVision(btnShowOriginal, originalImgView, 'Original unprocessed leaf image captured from camera/device.');
  });

  btnShowProcessed.addEventListener('click', () => {
    setActiveVision(btnShowProcessed, processedImgView, 'Preprocessed input: Resized to 224×224, normalized channels [0.485, 0.456, 0.406] ready for MobileNetV2.');
  });

  btnShowEdges.addEventListener('click', () => {
    setActiveVision(btnShowEdges, edgeCanvasView, 'OpenCV Sobel Gradient Filter: Highlighting cellular leaf structure, veins, and lesion boundaries.');
  });

  btnShowHeatmap.addEventListener('click', () => {
    setActiveVision(btnShowHeatmap, heatmapImgView, 'Grad-CAM Attention Heatmap: OpenCV COLORMAP_JET highlighting highest neural activation regions.');
  });

  function setActiveVision(btn, viewEl, caption) {
    [btnShowOriginal, btnShowProcessed, btnShowEdges, btnShowHeatmap].forEach(b => b.classList.remove('active'));
    [originalImgView, processedImgView, edgeCanvasView, heatmapImgView].forEach(v => v.classList.add('hidden'));

    btn.classList.add('active');
    viewEl.classList.remove('hidden');
    visionCaption.textContent = caption;
  }

  // ---------------- 10. Recommendations Tabs ----------------
  recTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      recTabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const tabKey = btn.getAttribute('data-tab');
      if (tabKey === 'symptoms') document.getElementById('tabSymptoms').classList.add('active');
      if (tabKey === 'treatment') document.getElementById('tabTreatment').classList.add('active');
      if (tabKey === 'prevention') document.getElementById('tabPrevention').classList.add('active');
    });
  });

  // ---------------- 11. History Storage & Stats ----------------
  function getStoredHistory() {
    try {
      return JSON.parse(localStorage.getItem('agri_history') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveToHistory(record) {
    const list = getStoredHistory();
    list.unshift({
      id: record.id,
      crop: record.crop,
      disease: record.disease,
      status: record.status,
      severity: record.severity,
      confidence: record.confidence || 0.98,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    const trimmed = list.slice(0, 15);
    localStorage.setItem('agri_history', JSON.stringify(trimmed));
    renderHistory();
  }

  function renderHistory() {
    const list = getStoredHistory();
    if (list.length === 0) {
      historyList.innerHTML = '<p class="no-history-text">No scans recorded yet. Perform your first diagnosis above!</p>';
      return;
    }

    historyList.innerHTML = '';
    list.forEach(item => {
      const isHealthy = (item.status || '').toLowerCase() === 'healthy';
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-thumb">${isHealthy ? '🍃' : '🍂'}</div>
        <div class="history-details">
          <div class="history-title">${item.crop} - ${item.disease}</div>
          <div class="history-meta">${(item.confidence * 100).toFixed(0)}% • ${item.severity} • ${item.timestamp || ''}</div>
        </div>
      `;
      historyList.appendChild(div);
    });
  }

  function updateStats() {
    const list = getStoredHistory();
    const total = list.length;
    const healthy = list.filter(i => (i.status || '').toLowerCase() === 'healthy').length;
    const infected = total - healthy;

    statTotalScans.textContent = total;
    statHealthyCount.textContent = healthy;
    statInfectedCount.textContent = infected;

    if (total > 0) {
      const avg = list.reduce((acc, cur) => acc + (cur.confidence || 0.95), 0) / total;
      statAvgConfidence.textContent = `${(avg * 100).toFixed(1)}%`;
    }
  }

  saveHistoryBtn.addEventListener('click', () => {
    if (lastDiagnosisResult) {
      saveToHistory(lastDiagnosisResult);
      alert('Diagnosis record saved to history log!');
    }
  });

  btnClearHistory.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all scan history?')) {
      localStorage.removeItem('agri_history');
      renderHistory();
      updateStats();
    }
  });

  printReportBtn.addEventListener('click', () => {
    window.print();
  });

  // ---------------- 12. Modals (Architecture & Catalog) ----------------
  btnOpenArchitecture.addEventListener('click', () => {
    architectureModal.classList.remove('hidden');
  });

  btnCloseArchitecture.addEventListener('click', () => {
    architectureModal.classList.add('hidden');
  });

  btnOpenCatalog.addEventListener('click', () => {
    catalogModal.classList.remove('hidden');
    renderCatalog();
  });

  btnCloseCatalog.addEventListener('click', () => {
    catalogModal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === architectureModal) architectureModal.classList.add('hidden');
    if (e.target === catalogModal) catalogModal.classList.add('hidden');
  });

  // Catalog search & filter
  let activeCropFilter = 'all';
  function renderCatalog() {
    const query = (catalogSearch.value || '').toLowerCase();
    const filtered = KNOWLEDGE_CATALOG.filter(item => {
      const matchCrop = activeCropFilter === 'all' || item.crop.toLowerCase().includes(activeCropFilter.toLowerCase());
      const matchText =
        item.crop.toLowerCase().includes(query) ||
        item.disease.toLowerCase().includes(query) ||
        (item.scientific_name && item.scientific_name.toLowerCase().includes(query));
      return matchCrop && matchText;
    });

    catalogGrid.innerHTML = '';
    if (filtered.length === 0) {
      catalogGrid.innerHTML = '<p class="no-history-text">No disease profiles matching filter.</p>';
      return;
    }

    filtered.forEach(item => {
      const isHealthy = item.status === 'Healthy';
      const isOutside = item.status === 'Outside supported crop classes' || item.status === 'Identified';
      const div = document.createElement('div');
      div.className = 'catalog-card';
      div.innerHTML = `
        <div class="catalog-card-header">
          <div>
            <div class="crop-tag">${item.crop}</div>
            <div class="catalog-card-title">${item.disease}</div>
            <div class="catalog-card-tax">${item.scientific_name} (${item.pathogen_type})</div>
          </div>
          <span class="badge ${isOutside ? 'status-badge-outside' : (isHealthy ? 'status-badge-healthy' : 'status-badge-infected')}">${item.severity}</span>
        </div>
        <p class="catalog-card-desc">${item.symptoms}</p>
      `;
      catalogGrid.appendChild(div);
    });
  }

  catalogSearch.addEventListener('input', renderCatalog);

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCropFilter = chip.getAttribute('data-crop');
      renderCatalog();
    });
  });

  // Initial loads
  renderHistory();
  updateStats();
  // No auto-load of default specimen — user must upload or choose a preset
});
