import React from 'react';
import { useDataset } from '../context/DatasetContext';
import { formatPercent } from '../utils/formatters';
import { Badge } from '../components/common/Badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  BarChart3,
  PieChart as PieIcon,
  Layers,
  AlertOctagon,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { chartData, stats } = useDataset();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Pathology Analytics & Statistical Visualizations
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          In-depth distribution patterns, neural model confidence ranges, and crop vulnerability metrics
        </p>
      </div>

      {/* Row 1: Disease Prevalence & Confidence Bins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Disease Prevalence */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-agro-600 dark:text-agro-400" />
                Top Diagnosed Crop Pathogens
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Frequency count of specific identified disease conditions
              </p>
            </div>
            <span className="text-xs text-agro-600 dark:text-agro-400 font-semibold">
              Top 8 Diseases
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.diseasePrevalenceData}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" name="Identified Cases" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Confidence Bins */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-agro-600 dark:text-agro-400" />
                AI Model Confidence Histogram
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribution of prediction confidence scores
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Mean: {formatPercent(stats.avgConfidence)}
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.confidenceBinsData}
                margin={{ top: 15, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="bin" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" name="Samples" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: ML Split Distribution & Crop Vulnerability Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ML Split Pie */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              Dataset ML Partition Ratio
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Training / Validation / Test benchmark splits
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.splitDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.splitDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-around text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
            {chartData.splitDistributionData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name}: <strong>{s.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Vulnerability Ranking Matrix */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500" />
                Crop Vulnerability & Risk Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Infection rates calculated across all crop categories
              </p>
            </div>
            <span className="text-xs text-slate-400">
              Sorted by infection percentage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 pb-2">
                  <th className="py-2.5 px-3">Crop Name</th>
                  <th className="py-2.5 px-3">Total Samples</th>
                  <th className="py-2.5 px-3">Infected</th>
                  <th className="py-2.5 px-3">Healthy</th>
                  <th className="py-2.5 px-3">Infection Rate</th>
                  <th className="py-2.5 px-3 text-right">Risk Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {chartData.cropRiskRanking.map((row) => (
                  <tr key={row.crop} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                      {row.crop}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">
                      {row.total}
                    </td>
                    <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-medium">
                      {row.infected}
                    </td>
                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      {row.healthy}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.infectionRate > 70
                                ? 'bg-rose-500'
                                : row.infectionRate > 40
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                            style={{ width: `${row.infectionRate}%` }}
                          />
                        </div>
                        <span className="font-semibold">{row.infectionRate}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Badge type="severity" value={row.riskLevel}>
                        {row.riskLevel} Risk
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
