import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useDataset } from '../../context/DatasetContext';
import { parseCustomDataset } from '../../services/dataService';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  Code,
  FileSpreadsheet
} from 'lucide-react';

export const DatasetUploaderModal = ({ isOpen, onClose }) => {
  const { loadCustomDataset } = useDataset();
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'paste'
  const [fileType, setFileType] = useState('json'); // 'json' | 'csv'
  const [pastedText, setPastedText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [parsedPreview, setParsedPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    setErrorMsg(null);
    const isCsv = file.name.endsWith('.csv');
    const type = isCsv ? 'csv' : 'json';
    setFileType(type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      processText(text, type, file.name);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read the selected file.');
    };
    reader.readAsText(file);
  };

  const handlePastedParse = () => {
    if (!pastedText.trim()) {
      setErrorMsg('Please paste your CSV or JSON data first.');
      return;
    }
    setErrorMsg(null);
    processText(pastedText, fileType, 'Pasted Data Batch');
  };

  const processText = (text, type, sourceName) => {
    const res = parseCustomDataset(text, type);
    if (res.success) {
      setParsedPreview({
        sourceName,
        count: res.count,
        sample: res.data.slice(0, 3),
        allData: res.data
      });
      setErrorMsg(null);
    } else {
      setErrorMsg(`Parsing error: ${res.error}`);
      setParsedPreview(null);
    }
  };

  const handleApplyDataset = () => {
    if (parsedPreview && parsedPreview.allData) {
      loadCustomDataset(parsedPreview.allData, parsedPreview.sourceName);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Load Real or Custom Crop Dataset"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Load your extracted crop disease dataset directly into the browser to test visualizations and data exploration in real time.
        </p>

        {/* Tab selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { setActiveMode('upload'); setErrorMsg(null); }}
            className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeMode === 'upload'
                ? 'border-agro-600 text-agro-600 dark:text-agro-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Upload File (.json / .csv)
          </button>
          <button
            onClick={() => { setActiveMode('paste'); setErrorMsg(null); }}
            className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeMode === 'paste'
                ? 'border-agro-600 text-agro-600 dark:text-agro-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Paste JSON or CSV Text
          </button>
        </div>

        {/* Upload Mode */}
        {activeMode === 'upload' && (
          <div className="space-y-4">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-agro-500 dark:hover:border-agro-500 rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-800/30 transition-colors p-4 text-center">
              <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Click to browse or drop your dataset file here
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports .json (array of records) or .csv with header row
              </p>
              <input
                type="file"
                accept=".json,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {selectedFileName && (
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <FileText className="w-4 h-4 text-agro-500" />
                <span>Selected: <strong>{selectedFileName}</strong></span>
              </div>
            )}
          </div>
        )}

        {/* Paste Mode */}
        {activeMode === 'paste' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Format:</span>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={fileType === 'json'}
                  onChange={() => setFileType('json')}
                  className="text-agro-600"
                />
                JSON Array
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={fileType === 'csv'}
                  onChange={() => setFileType('csv')}
                  className="text-agro-600"
                />
                CSV Text
              </label>
            </div>

            <textarea
              rows={6}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder={
                fileType === 'json'
                  ? '[\n  {\n    "id": "REC-01",\n    "crop": "Tomato",\n    "disease": "Early Blight",\n    "status": "Infected",\n    "severity": "Moderate",\n    "confidence": 0.95\n  }\n]'
                  : 'id,crop,disease,status,severity,confidence\nREC-01,Tomato,Early Blight,Infected,Moderate,0.95'
              }
              className="w-full p-3 rounded-xl font-mono text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-agro-500"
            />

            <button
              onClick={handlePastedParse}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900 transition-colors"
            >
              Parse Data Preview
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Parsed Preview */}
        {parsedPreview && (
          <div className="p-4 rounded-xl bg-agro-50 dark:bg-agro-950/30 border border-agro-200 dark:border-agro-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-agro-800 dark:text-agro-300 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-agro-600" />
                <span>Successfully parsed {parsedPreview.count} records!</span>
              </div>
              <span className="text-[11px] text-slate-500">Ready to load</span>
            </div>

            {/* Quick preview of first record */}
            <div className="text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Sample Row 1: </span>
              <span className="text-slate-500">
                {parsedPreview.sample[0]?.crop} - {parsedPreview.sample[0]?.disease} ({parsedPreview.sample[0]?.status}, Severity: {parsedPreview.sample[0]?.severity})
              </span>
            </div>

            <button
              onClick={handleApplyDataset}
              className="w-full py-2.5 rounded-xl bg-agro-600 hover:bg-agro-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Apply This Dataset To All Dashboard Pages
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
