import React from 'react';
import { useDataset } from '../context/DatasetContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { formatPercent, formatDate } from '../utils/formatters';
import {
  FileText,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Leaf,
  Activity,
  Calendar
} from 'lucide-react';
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
  AreaChart,
  Area,
  Legend
} from 'recharts';

export const DashboardPage = ({ onNavigateToExplorer, onSelectRecord }) => {
  const { stats, chartData, rawData, isLoading } = useDataset();

  const recentRecords = rawData.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner / Project Headline */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-r from-agro-900/10 via-agro-500/5 to-transparent p-6 sm:p-8 backdrop-blur-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-agro-500/10 text-agro-700 dark:text-agro-300 border border-agro-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Plant Pathology Intelligence System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Crop Health & Disease Surveillance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Real-time monitoring and diagnostic metrics for 8 agricultural crop varieties across 18 foliar disease conditions.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Samples"
          value={stats.totalRecords}
          subtitle="Across benchmark collection"
          icon={FileText}
          trend="+100% active"
          colorScheme="emerald"
        />
        <StatCard
          title="Infection Rate"
          value={formatPercent(stats.infectedPercent)}
          subtitle={`${stats.infectedCount} infected / ${stats.healthyCount} healthy`}
          icon={AlertTriangle}
          trend={`${stats.severeCriticalCount} severe/critical`}
          trendPositive={false}
          colorScheme="rose"
        />
        <StatCard
          title="Mean AI Confidence"
          value={formatPercent(stats.avgConfidence)}
          subtitle="CNN classification accuracy"
          icon={Sparkles}
          trend="Validated model"
          colorScheme="blue"
        />
        <StatCard
          title="Prevalent Pathogen"
          value={stats.mostPrevalentDisease}
          subtitle={`Highest risk crop: ${stats.highestRiskCrop}`}
          icon={ShieldCheck}
          trend="Action required"
          colorScheme="amber"
        />
      </div>

      {/* Primary Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Crop Health Breakdown (Stacked Bar) */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Crop Health Distribution (Healthy vs Infected)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sample distribution across evaluated crop categories
              </p>
            </div>
            <span className="text-xs text-agro-600 dark:text-agro-400 font-semibold">
              8 Crops Analyzed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.cropHealthData}
                margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="healthy" name="Healthy Samples" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="infected" name="Infected Samples" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Severity Distribution (Donut Chart) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Disease Severity Spread
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Breakdown by agronomic damage level
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.severityData.map((entry, index) => (
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

          {/* Custom Severity Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            {chartData.severityData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name}:</span>
                <strong className="text-slate-900 dark:text-white">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Timeline Area Chart & Recent Diagnoses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Detection Timeline */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Temporal Incidence Trends
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly diagnostic volume across collection period
              </p>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-agro-500" />
              Monthly Aggregation
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData.timelineTrendData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorInfected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} />
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
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Recorded"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
                <Area
                  type="monotone"
                  dataKey="infected"
                  name="Infected Samples"
                  stroke="#ef4444"
                  fillOpacity={1}
                  fill="url(#colorInfected)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Diagnoses Feed */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 p-5 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Diagnoses
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest records in active dataset
              </p>
            </div>
            <button
              onClick={onNavigateToExplorer}
              className="text-xs text-agro-600 dark:text-agro-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {recentRecords.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectRecord(item)}
                className="py-3 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-850/60 -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs flex-shrink-0 overflow-hidden">
                    {item.imageThumbnail ? (
                      <img src={item.imageThumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      '🌿'
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-slate-900 dark:text-white group-hover:text-agro-600 dark:group-hover:text-agro-400 transition-colors">
                      {item.crop} - {item.disease}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.id} • {formatDate(item.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge type="status" value={item.status}>
                    {item.status}
                  </Badge>
                  <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {formatPercent(item.confidence)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
