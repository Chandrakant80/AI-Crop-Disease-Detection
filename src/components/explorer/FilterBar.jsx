import React from 'react';
import { Search, X, Download, Filter, RefreshCw } from 'lucide-react';
import { CROP_CATEGORIES, SEVERITY_LEVELS } from '../../data/datasetInfo';
import { exportToCSV, exportToJSON } from '../../services/dataService';

export const FilterBar = ({
  filters,
  onUpdateFilter,
  onResetFilters,
  totalCount,
  filteredCount,
  currentFilteredData
}) => {
  const handleExportCSV = () => {
    exportToCSV(currentFilteredData, `crop_disease_export_${Date.now()}.csv`);
  };

  const handleExportJSON = () => {
    exportToJSON(currentFilteredData, `crop_disease_export_${Date.now()}.json`);
  };

  const hasActiveFilters =
    filters.search ||
    filters.crop !== 'All' ||
    filters.disease !== 'All' ||
    filters.severity !== 'All' ||
    filters.status !== 'All' ||
    filters.split !== 'All' ||
    filters.minConfidence > 0;

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-4 sm:p-5 backdrop-blur-md shadow-sm space-y-4">
      {/* Top row: Search input & export buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, crop, disease, symptom, or region..."
            value={filters.search}
            onChange={(e) => onUpdateFilter('search', e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-agro-500/40 focus:border-agro-500 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onUpdateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action buttons: Export & Reset */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Export Dropdown */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportCSV}
              title="Download filtered records as CSV"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              title="Download filtered records as JSON"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Selectors Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        {/* Crop Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            Crop
          </label>
          <select
            value={filters.crop}
            onChange={(e) => onUpdateFilter('crop', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-agro-500"
          >
            <option value="All">All Crops ({totalCount})</option>
            {CROP_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            Health Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onUpdateFilter('status', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-agro-500"
          >
            <option value="All">All Statuses</option>
            <option value="Healthy">Healthy Only</option>
            <option value="Infected">Infected Only</option>
          </select>
        </div>

        {/* Severity Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            Severity
          </label>
          <select
            value={filters.severity}
            onChange={(e) => onUpdateFilter('severity', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-agro-500"
          >
            <option value="All">All Severities</option>
            {SEVERITY_LEVELS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Split Select */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            ML Split
          </label>
          <select
            value={filters.split}
            onChange={(e) => onUpdateFilter('split', e.target.value)}
            className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-agro-500"
          >
            <option value="All">All Splits</option>
            <option value="Train">Train</option>
            <option value="Validation">Validation</option>
            <option value="Test">Test</option>
          </select>
        </div>

        {/* Min Confidence */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
            Min Confidence: {Math.round(filters.minConfidence * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="0.95"
            step="0.05"
            value={filters.minConfidence}
            onChange={(e) => onUpdateFilter('minConfidence', parseFloat(e.target.value))}
            className="w-full accent-agro-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Counter summary tag */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredCount}</strong> of{' '}
          <strong className="text-slate-800 dark:text-slate-200">{totalCount}</strong> records
        </span>
        {hasActiveFilters && (
          <span className="text-agro-600 dark:text-agro-400 font-medium">
            Active filters applied
          </span>
        )}
      </div>
    </div>
  );
};
