import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { formatPercent, formatDate } from '../../utils/formatters';
import {
  Calendar,
  MapPin,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  FileJson,
  Layers,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export const RecordDetailModal = ({ record, isOpen, onClose }) => {
  const [showRawJson, setShowRawJson] = useState(false);

  if (!record) return null;

  const isHealthy = (record.status || '').toLowerCase() === 'healthy';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Crop Record Details: ${record.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          {/* Leaf Thumbnail */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-700/50 flex items-center justify-center">
            {record.imageThumbnail ? (
              <img
                src={record.imageThumbnail}
                alt={`${record.crop} ${record.disease}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">🍃</span>
            )}
          </div>

          {/* Titles & taxonomy */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-agro-600 dark:text-agro-400">
                {record.crop}
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {record.id}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
              {record.disease}
            </h2>
            {record.scientificName && (
              <p className="text-xs italic text-slate-500 dark:text-slate-400">
                {record.scientificName}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge type="status" value={record.status}>
                {record.status}
              </Badge>
              {!isHealthy && (
                <Badge type="severity" value={record.severity}>
                  Severity: {record.severity}
                </Badge>
              )}
              <Badge type="split" value={record.split}>
                Split: {record.split}
              </Badge>
            </div>
          </div>
        </div>

        {/* AI Model Detection Confidence Meter */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-agro-500" />
              AI Model Prediction Confidence
            </span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {formatPercent(record.confidence)}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                record.confidence > 0.9
                  ? 'bg-agro-500'
                  : record.confidence > 0.8
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{
                width: `${Math.min(100, Math.max(5, (record.confidence > 1 ? record.confidence : record.confidence * 100)))}%`
              }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Probability evaluated by deep convolutional neural network classifier against PlantVillage validation benchmarks.
          </p>
        </div>

        {/* Symptoms & Treatment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Symptoms */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
              <Stethoscope className="w-4 h-4 text-blue-500" />
              Observable Symptoms
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {record.symptoms || 'No specific foliar lesions or abnormalities documented for this sample.'}
            </p>
          </div>

          {/* Treatment / Agronomic Protocol */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-800/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-agro-500" />
              Agronomic Recommendation
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {record.treatment || 'Maintain regular irrigation schedule and monitor foliage weekly.'}
            </p>
          </div>
        </div>

        {/* Metadata Footer: Date, Location, Resolution */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-slate-100 dark:border-slate-800/80 pt-4 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Captured: {formatDate(record.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{record.location || 'Greenhouse Sector'}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Resolution: {record.resolution || '256x256 RGB'}</span>
          </div>
        </div>

        {/* Raw JSON Inspector Accordion */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors"
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>{showRawJson ? 'Hide Raw JSON Record' : 'Inspect Raw JSON Record'}</span>
          </button>

          {showRawJson && (
            <pre className="mt-2.5 p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto max-h-48 border border-slate-800">
              {JSON.stringify(record, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </Modal>
  );
};
