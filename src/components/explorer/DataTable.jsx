import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { formatPercent, formatDate } from '../../utils/formatters';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';

export const DataTable = ({
  data,
  onSelectRecord,
  sortField,
  sortDirection,
  onSort
}) => {
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-agro-600 dark:text-agro-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-agro-600 dark:text-agro-400" />
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 shadow-sm backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/75 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold select-none">
              <th
                onClick={() => onSort('id')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Sample ID</span>
                  {renderSortIcon('id')}
                </div>
              </th>

              <th
                onClick={() => onSort('crop')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Crop</span>
                  {renderSortIcon('crop')}
                </div>
              </th>

              <th
                onClick={() => onSort('disease')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Diagnosed Condition</span>
                  {renderSortIcon('disease')}
                </div>
              </th>

              <th
                onClick={() => onSort('status')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  {renderSortIcon('status')}
                </div>
              </th>

              <th
                onClick={() => onSort('severity')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Severity</span>
                  {renderSortIcon('severity')}
                </div>
              </th>

              <th
                onClick={() => onSort('confidence')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>AI Confidence</span>
                  {renderSortIcon('confidence')}
                </div>
              </th>

              <th
                onClick={() => onSort('split')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors hidden md:table-cell"
              >
                <div className="flex items-center gap-1.5">
                  <span>Split</span>
                  {renderSortIcon('split')}
                </div>
              </th>

              <th
                onClick={() => onSort('date')}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors hidden lg:table-cell"
              >
                <div className="flex items-center gap-1.5">
                  <span>Date</span>
                  {renderSortIcon('date')}
                </div>
              </th>

              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
            {data.map((row) => {
              const isHealthy = (row.status || '').toLowerCase() === 'healthy';
              const conf = row.confidence > 1 ? row.confidence / 100 : row.confidence;

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRecord(row)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Sample ID */}
                  <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-agro-500 transition-colors" />
                      <span>{row.id}</span>
                    </div>
                  </td>

                  {/* Crop */}
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                    {row.crop}
                  </td>

                  {/* Diagnosed Condition */}
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {row.disease}
                      </div>
                      {row.scientificName && (
                        <div className="text-[10px] italic text-slate-400 dark:text-slate-500 truncate max-w-[150px]">
                          {row.scientificName}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <Badge type="status" value={row.status}>
                      {row.status}
                    </Badge>
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-4">
                    <Badge type="severity" value={row.severity}>
                      {row.severity || (isHealthy ? 'None' : 'Moderate')}
                    </Badge>
                  </td>

                  {/* AI Confidence */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            conf > 0.95
                              ? 'bg-agro-500'
                              : conf > 0.88
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${conf * 100}%` }}
                        />
                      </div>
                      <span className="font-medium text-[11px] text-slate-600 dark:text-slate-300">
                        {formatPercent(conf)}
                      </span>
                    </div>
                  </td>

                  {/* Split */}
                  <td className="py-3 px-4 hidden md:table-cell">
                    <Badge type="split" value={row.split}>
                      {row.split}
                    </Badge>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4 hidden lg:table-cell text-slate-500 dark:text-slate-400">
                    {formatDate(row.date)}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRecord(row);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-agro-500 hover:text-white dark:hover:bg-agro-600 transition-all"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
