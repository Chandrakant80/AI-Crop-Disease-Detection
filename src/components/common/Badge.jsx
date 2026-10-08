import React from 'react';
import { getSeverityBadgeStyle, getStatusBadgeStyle, getSplitBadgeStyle } from '../../utils/formatters';

export const Badge = ({ children, type = 'default', value, className = '' }) => {
  let style = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';

  if (type === 'severity') {
    style = getSeverityBadgeStyle(value || children);
  } else if (type === 'status') {
    style = getStatusBadgeStyle(value || children);
  } else if (type === 'split') {
    style = getSplitBadgeStyle(value || children);
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      {children}
    </span>
  );
};
