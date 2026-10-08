import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  colorScheme = 'emerald'
}) => {
  const schemeStyles = {
    emerald: {
      bgIcon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      accent: 'from-emerald-500/10 to-transparent'
    },
    blue: {
      bgIcon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      accent: 'from-blue-500/10 to-transparent'
    },
    amber: {
      bgIcon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      accent: 'from-amber-500/10 to-transparent'
    },
    rose: {
      bgIcon: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      accent: 'from-rose-500/10 to-transparent'
    },
    purple: {
      bgIcon: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      accent: 'from-purple-500/10 to-transparent'
    }
  };

  const scheme = schemeStyles[colorScheme] || schemeStyles.emerald;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
      <div className={`absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl ${scheme.accent} rounded-full blur-2xl pointer-events-none`} />
      
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${scheme.bgIcon}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={`font-semibold flex items-center ${
                trendPositive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {trend}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
