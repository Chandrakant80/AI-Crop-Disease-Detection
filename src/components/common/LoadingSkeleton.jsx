import React from 'react';

export const LoadingSkeleton = ({ type = 'cards' }) => {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-5 space-y-4 animate-pulse"
          >
            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
            <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full space-y-3 p-4 animate-pulse">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/60 rounded-lg w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-slate-100 dark:bg-slate-800/60 rounded-2xl animate-pulse flex items-center justify-center">
      <div className="h-6 w-36 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );
};
