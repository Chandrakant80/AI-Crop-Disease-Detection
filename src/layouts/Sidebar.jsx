import React from 'react';
import {
  LayoutDashboard,
  Table,
  BarChart3,
  Microscope,
  FileCode2,
  Leaf,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useDataset } from '../context/DatasetContext';
import { formatPercent } from '../utils/formatters';

export const Sidebar = ({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) => {
  const { stats } = useDataset();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview KPIs & insights'
    },
    {
      id: 'explorer',
      label: 'Data Explorer',
      icon: Table,
      description: 'Filter, sort & paginate dataset'
    },
    {
      id: 'analytics',
      label: 'Analytics & Trends',
      icon: BarChart3,
      description: 'Charts & distributions'
    },
    {
      id: 'simulator',
      label: 'AI Diagnosis Demo',
      icon: Microscope,
      badge: 'Interactive',
      description: 'Simulate leaf pathology scan'
    },
    {
      id: 'docs',
      label: 'Dataset Integration',
      icon: FileCode2,
      description: 'Data contract & guide'
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 p-4 flex flex-col justify-between backdrop-blur-md transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Brand section in sidebar */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-agro-600 text-white shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                AgriVision AI
              </div>
              <div className="text-[11px] text-agro-600 dark:text-agro-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Crop Pathology Engine
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Main Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-agro-600 text-white shadow-sm shadow-agro-600/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-agro-500/10 text-agro-600 dark:text-agro-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dataset Quick Health widget at sidebar bottom */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-850/50 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-agro-500" />
              Healthy Ratio
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {formatPercent(stats.healthyPercent)}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stats.healthyPercent}%` }}
              title={`Healthy: ${formatPercent(stats.healthyPercent)}`}
            />
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${stats.infectedPercent}%` }}
              title={`Infected: ${formatPercent(stats.infectedPercent)}`}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> {stats.healthyCount} Healthy
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> {stats.infectedCount} Infected
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
