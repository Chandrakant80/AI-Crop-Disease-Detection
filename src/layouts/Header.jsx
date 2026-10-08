import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useDataset } from '../context/DatasetContext';
import {
  Sun,
  Moon,
  Database,
  Sprout,
  Menu,
  UploadCloud,
  RotateCcw
} from 'lucide-react';

export const Header = ({ onToggleMobileSidebar, onOpenUploader }) => {
  const { theme, toggleTheme } = useTheme();
  const { datasetMeta, stats, restoreDefaultDataset } = useDataset();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 px-4 sm:px-6 backdrop-blur-md transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo and title */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-agro-600 to-agro-400 text-white shadow-md shadow-agro-500/20">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                AgriVision <span className="text-agro-600 dark:text-agro-400 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-agro-500/10 text-agro-700 dark:text-agro-300 border border-agro-500/20">
                BTech Final Year Demo
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400">
              Automated Crop Disease Diagnostic & Analytics Platform
            </p>
          </div>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dataset source badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/50 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agro-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-agro-500"></span>
          </span>
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate max-w-[170px]">
            {datasetMeta.name}
          </span>
          <span className="text-slate-400 text-[11px]">
            ({stats.totalRecords} records)
          </span>
        </div>

        {/* Custom Dataset Uploader Button */}
        <button
          onClick={onOpenUploader}
          title="Import custom CSV or JSON dataset"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <UploadCloud className="w-4 h-4 text-agro-600 dark:text-agro-400" />
          <span className="hidden sm:inline">Load Custom Data</span>
        </button>

        {/* Reset button if custom dataset active */}
        {datasetMeta.isCustom && (
          <button
            onClick={restoreDefaultDataset}
            title="Restore default benchmark dataset"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}

        {/* Dark/Light mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark / Light theme"
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>
      </div>
    </header>
  );
};
