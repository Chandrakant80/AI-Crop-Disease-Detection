import React from 'react';
import { Database, FilterX } from 'lucide-react';

export const EmptyState = ({
  title = 'No records found',
  description = 'Try adjusting your search query or removing active filters to see more results.',
  actionText = 'Reset All Filters',
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-sm">
        <FilterX className="w-7 h-7" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-5">
        {description}
      </p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-agro-600 hover:bg-agro-700 text-white shadow-sm transition-all duration-200"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
