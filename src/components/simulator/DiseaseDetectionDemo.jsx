import React, { useState } from 'react';
import { useDataset } from '../../context/DatasetContext';
import { DISEASE_CATALOG } from '../../data/datasetInfo';
import { formatPercent } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import {
  Sparkles,
  Upload,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  PlusCircle,
  Eye,
  RefreshCw
} from 'lucide-react';

const SAMPLE_LEAF_SPECIMENS = [
  {
    id: 'sample-tom-eb',
    name: 'Tomato Leaf (Suspected Blight)',
    crop: 'Tomato',
    catalogKey: 'Tomato_Early_Blight',
    colorHex: '#f59e0b',
    pattern: 'concentric-spots',
    top3: [
      { label: 'Tomato Early Blight', prob: 0.984 },
      { label: 'Tomato Late Blight', prob: 0.012 },
      { label: 'Tomato Septoria Leaf Spot', prob: 0.004 }
    ]
  },
  {
    id: 'sample-pot-lb',
    name: 'Potato Leaf (Dark Lesion)',
    crop: 'Potato',
    catalogKey: 'Potato_Late_Blight',
    colorHex: '#ef4444',
    pattern: 'dark-blotch',
    top3: [
      { label: 'Potato Late Blight', prob: 0.978 },
      { label: 'Potato Early Blight', prob: 0.018 },
      { label: 'Healthy Potato', prob: 0.004 }
    ]
  },
  {
    id: 'sample-crn-cr',
    name: 'Corn Leaf (Rust Pustules)',
    crop: 'Corn (Maize)',
    catalogKey: 'Corn_Common_Rust',
    colorHex: '#f97316',
    pattern: 'rust-pustules',
    top3: [
      { label: 'Corn Common Rust', prob: 0.965 },
      { label: 'Northern Leaf Blight', prob: 0.026 },
      { label: 'Healthy Corn', prob: 0.009 }
    ]
  },
  {
    id: 'sample-apl-scb',
    name: 'Apple Leaf (Scab Specks)',
    crop: 'Apple',
    catalogKey: 'Apple_Scab',
    colorHex: '#ea580c',
    pattern: 'velvet-scab',
    top3: [
      { label: 'Apple Scab', prob: 0.952 },
      { label: 'Apple Black Rot', prob: 0.038 },
      { label: 'Cedar Apple Rust', prob: 0.010 }
    ]
  },
  {
    id: 'sample-tom-hl',
    name: 'Tomato Leaf (Healthy Specimen)',
    crop: 'Tomato',
    catalogKey: 'Tomato_Healthy',
    colorHex: '#10b981',
    pattern: 'healthy-clean',
    top3: [
      { label: 'Tomato Healthy', prob: 0.993 },
      { label: 'Tomato Early Blight', prob: 0.005 },
      { label: 'Tomato Leaf Mold', prob: 0.002 }
    ]
  }
];

export const DiseaseDetectionDemo = () => {
  const { addDiagnosticRecord } = useDataset();

  const [selectedSpecimen, setSelectedSpecimen] = useState(SAMPLE_LEAF_SPECIMENS[0]);
  const [customImageUri, setCustomImageUri] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showGradCam, setShowGradCam] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectSample = (sample) => {
    setSelectedSpecimen(sample);
    setCustomImageUri(null);
    setResult(null);
    setSavedSuccess(false);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomImageUri(event.target.result);
      // Pick a realistic prediction
      setSelectedSpecimen({
        id: `custom-${Date.now()}`,
        name: file.name,
        crop: 'Tomato',
        catalogKey: 'Tomato_Early_Blight',
        colorHex: '#f59e0b',
        pattern: 'custom',
        top3: [
          { label: 'Tomato Early Blight', prob: 0.961 },
          { label: 'Tomato Bacterial Spot', prob: 0.029 },
          { label: 'Healthy Tomato', prob: 0.010 }
        ]
      });
      setResult(null);
      setSavedSuccess(false);
    };
    reader.readAsDataURL(file);
  };

  const runDiagnosis = () => {
    setIsAnalyzing(true);
    setResult(null);
    setSavedSuccess(false);
    setAnalysisStep(1);

    setTimeout(() => setAnalysisStep(2), 600);
    setTimeout(() => setAnalysisStep(3), 1200);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStep(4);
      const catalogInfo = DISEASE_CATALOG[selectedSpecimen.catalogKey] || DISEASE_CATALOG['Tomato_Early_Blight'];
      const topPrediction = selectedSpecimen.top3[0];

      setResult({
        ...catalogInfo,
        confidence: topPrediction.prob,
        top3: selectedSpecimen.top3,
        date: new Date().toISOString().split('T')[0],
        id: `DIAG-${Math.floor(1000 + Math.random() * 9000)}`
      });
    }, 1800);
  };

  const handleSaveToDataset = () => {
    if (!result) return;
    const isHealthy = result.disease.toLowerCase().includes('healthy');

    const newRecord = {
      id: result.id,
      crop: result.crop,
      disease: result.disease,
      scientificName: result.scientificName,
      status: isHealthy ? 'Healthy' : 'Infected',
      severity: isHealthy ? 'None' : (result.riskLevel === 'Critical' ? 'Critical' : result.severityDefault),
      confidence: result.confidence,
      split: 'Test',
      date: result.date,
      location: 'Live AI Simulator Scan',
      symptoms: result.symptoms,
      treatment: result.treatment,
      resolution: '256x256 RGB',
      datasetSource: 'Live Model Inference Demo'
    };

    addDiagnosticRecord(newRecord);
    setSavedSuccess(true);
  };

  return (
    <div className="space-y-6">
      {/* Introduction banner */}
      <div className="rounded-2xl border border-agro-500/20 bg-gradient-to-r from-agro-500/10 via-emerald-500/5 to-transparent p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-agro-600 dark:text-agro-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Deep Learning Model Inference Simulator
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Test real-time disease detection with pre-extracted crop leaf samples or upload any test image.
              Simulates a Convolutional Neural Network (CNN / Vision Transformer) classification pipeline with Grad-CAM visual attention overlays and treatment prognosis.
            </p>
          </div>

          <button
            onClick={runDiagnosis}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-agro-600 hover:bg-agro-700 text-white shadow-lg shadow-agro-600/30 disabled:opacity-50 transition-all self-start md:self-auto"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Leaf...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Run AI Diagnosis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main interactive workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Specimen Selection & Visualizer */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              1. Select Test Leaf Specimen
            </h3>

            {/* Specimen Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_LEAF_SPECIMENS.map((specimen) => {
                const isSelected = selectedSpecimen.id === specimen.id && !customImageUri;
                return (
                  <button
                    key={specimen.id}
                    onClick={() => handleSelectSample(specimen)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition-all border ${
                      isSelected
                        ? 'border-agro-600 bg-agro-500/10 text-slate-900 dark:text-white font-semibold shadow-sm'
                        : 'border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: specimen.colorHex }}
                    />
                    <span className="truncate">{specimen.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Upload Custom Leaf Button */}
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-slate-400" />
              <span>Or Upload Custom Leaf Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomUpload}
                className="hidden"
              />
            </label>

            {/* Simulated Leaf Screen / Camera View */}
            <div className="relative w-full aspect-square max-h-72 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
              {/* Leaf graphic representation */}
              {customImageUri ? (
                <img
                  src={customImageUri}
                  alt="Custom Leaf Specimen"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full p-6 transition-all duration-300"
                >
                  <defs>
                    <radialGradient id="grad-cam-heat" cx="55%" cy="45%" r="45%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Leaf Silhouette */}
                  <path
                    d="M150 40 C210 80 230 170 165 240 C100 170 120 80 150 40 Z"
                    fill={selectedSpecimen.colorHex}
                    fillOpacity="0.25"
                    stroke={selectedSpecimen.colorHex}
                    strokeWidth="4"
                  />
                  {/* Veins */}
                  <path d="M150 45 L150 240" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.7" strokeLinecap="round" />
                  <path d="M150 90 L185 75" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
                  <path d="M150 120 L115 105" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
                  <path d="M150 150 L190 135" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />
                  <path d="M150 180 L110 168" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.5" strokeLinecap="round" />

                  {/* Simulated Disease Lesion Spots */}
                  {selectedSpecimen.catalogKey !== 'Tomato_Healthy' && (
                    <>
                      <circle cx="170" cy="110" r="18" fill="#450a0a" stroke="#b91c1c" strokeWidth="2" fillOpacity="0.8" />
                      <circle cx="170" cy="110" r="8" fill="#000000" />
                      <circle cx="135" cy="165" r="14" fill="#450a0a" stroke="#b91c1c" strokeWidth="2" fillOpacity="0.8" />
                      <circle cx="155" cy="195" r="10" fill="#450a0a" stroke="#b91c1c" strokeWidth="2" fillOpacity="0.8" />
                    </>
                  )}

                  {/* Grad-CAM Heatmap overlay */}
                  {showGradCam && selectedSpecimen.catalogKey !== 'Tomato_Healthy' && (
                    <circle cx="160" cy="130" r="85" fill="url(#grad-cam-heat)" />
                  )}
                </svg>
              )}

              {/* Scanning laser beam animation when analyzing */}
              {isAnalyzing && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-agro-400 to-transparent shadow-[0_0_15px_#22c55e] animate-bounce" />
              )}

              {/* Bounding box simulation */}
              {result && !isAnalyzing && (
                <div className="absolute inset-8 border-2 border-dashed border-agro-400/80 rounded-xl pointer-events-none flex items-start justify-between p-2">
                  <span className="bg-agro-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    ROI: {result.crop} Leaf
                  </span>
                  <span className="bg-slate-900/90 text-agro-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
                    {formatPercent(result.confidence)}
                  </span>
                </div>
              )}
            </div>

            {/* Grad-CAM Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Grad-CAM Activation Map
              </span>
              <button
                onClick={() => setShowGradCam(!showGradCam)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  showGradCam
                    ? 'bg-agro-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {showGradCam ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Model Diagnosis Output */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Neural Network Classification Results
                </h3>
                {result && (
                  <span className="text-[11px] font-mono text-slate-400">
                    ID: {result.id}
                  </span>
                )}
              </div>

              {/* If analyzing */}
              {isAnalyzing && (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-agro-500/10 border border-agro-500/30 flex items-center justify-center text-agro-600 dark:text-agro-400 animate-spin">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {analysisStep === 1 && 'Extracting ResNet50 Deep Feature Maps...'}
                    {analysisStep === 2 && 'Computing Grad-CAM Visual Heatmap...'}
                    {analysisStep === 3 && 'Evaluating Softmax Class Probabilities...'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Performing inference against multi-crop pathology database.
                  </p>
                </div>
              )}

              {/* Before diagnosis */}
              {!isAnalyzing && !result && (
                <div className="py-14 flex flex-col items-center justify-center space-y-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    No active inference output
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                    Select a leaf specimen from the left panel and click &quot;Run AI Diagnosis&quot; to test the model.
                  </p>
                </div>
              )}

              {/* Diagnosis Results Display */}
              {!isAnalyzing && result && (
                <div className="space-y-5 animate-fade-in">
                  {/* Primary Diagnosis Banner */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase text-agro-600 dark:text-agro-400">
                          {result.crop}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-xs italic text-slate-500 dark:text-slate-400">
                          {result.scientificName}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {result.disease}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge type="severity" value={result.severityDefault}>
                        Risk: {result.riskLevel}
                      </Badge>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Confidence</div>
                        <div className="text-lg font-bold text-agro-600 dark:text-agro-400">
                          {formatPercent(result.confidence)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top-3 Prediction Softmax Probabilities */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Top-3 Predicted Class Probabilities
                    </div>
                    {result.top3.map((pred, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-600 dark:text-slate-400">{pred.label}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {formatPercent(pred.prob)}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${i === 0 ? 'bg-agro-500' : 'bg-slate-400 dark:bg-slate-500'}`}
                            style={{ width: `${pred.prob * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Observable Symptoms & Treatment Advice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                      <span className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Diagnostic Symptoms
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {result.symptoms}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-agro-500/10 border border-agro-500/20 space-y-1">
                      <span className="text-[11px] font-bold uppercase text-agro-700 dark:text-agro-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Treatment Action
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {result.treatment}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Action to add to Data Explorer */}
            {result && !isAnalyzing && (
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {savedSuccess
                    ? '✓ Successfully added to Data Explorer table!'
                    : 'Log this simulated diagnosis into the dataset.'}
                </span>

                <button
                  onClick={handleSaveToDataset}
                  disabled={savedSuccess}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    savedSuccess
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-agro-600 dark:hover:bg-agro-500 dark:hover:text-white'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Explorer</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Add to Dataset</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
