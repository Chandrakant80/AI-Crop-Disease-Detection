import React from 'react';
import {
  FileCode2,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Copy,
  Terminal
} from 'lucide-react';

export const DocsPage = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <FileCode2 className="w-6 h-6 text-agro-600 dark:text-agro-400" />
          Dataset Integration Guide & Architecture
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Instructions on how to seamlessly connect your extracted crop disease dataset
        </p>
      </div>

      {/* Quick Summary Card */}
      <div className="p-5 rounded-2xl border border-agro-500/20 bg-agro-500/5 backdrop-blur-md space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-agro-600" />
          Decoupled Frontend Architecture
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          The user interface does <strong>not</strong> contain any hardcoded dataset values or rigid structures. All aggregations, KPI statistics, filtering, search, and chart series are computed dynamically inside <code className="font-mono text-agro-700 dark:text-agro-300">src/services/dataService.js</code>.
        </p>
      </div>

      {/* Two Ways to Connect Real Dataset */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          How to Connect Your Real Dataset
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Method 1 */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Instant Live Upload (No Code Needed)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Click the <strong>&quot;Load Custom Data&quot;</strong> button in the top navigation bar. Drag and drop your extracted <code className="font-mono">.csv</code> or <code className="font-mono">.json</code> file, or paste raw text. The dashboard, explorer table, and analytics charts will instantly reload with your real data!
            </p>
          </div>

          {/* Method 2 */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-agro-500/10 text-agro-600 dark:text-agro-400 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Permanent Code Replacement
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Place your extracted JSON dataset directly at <code className="font-mono text-slate-800 dark:text-slate-200">src/data/mockData.js</code> by replacing the exported <code className="font-mono">mockDataset</code> array. Alternatively, put <code className="font-mono">dataset.json</code> in <code className="font-mono">public/</code> and fetch it.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippet Example */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Code Snippet: Switching to an External Local File in <code>src/services/dataService.js</code>
        </h3>
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
          <pre className="leading-relaxed">
{`// src/services/dataService.js

export const loadDataset = async () => {
  // To load from your public/ folder:
  const response = await fetch('/my_extracted_dataset.json');
  const data = await response.json();
  return data;
};`}
          </pre>
        </div>
      </div>

      {/* Target Schema Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Expected Dataset Field Schema
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-semibold">
                <th className="py-2.5 px-4">Field Name</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Required</th>
                <th className="py-2.5 px-4">Example Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">id</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-emerald-600">Yes</td>
                <td className="py-2 px-4">&quot;CR-TOM-0104&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">crop</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-emerald-600">Yes</td>
                <td className="py-2 px-4">&quot;Tomato&quot;, &quot;Potato&quot;, &quot;Corn (Maize)&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">disease</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-emerald-600">Yes</td>
                <td className="py-2 px-4">&quot;Early Blight&quot;, &quot;Late Blight&quot;, &quot;Healthy Leaf&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">status</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-emerald-600">Yes</td>
                <td className="py-2 px-4">&quot;Healthy&quot; | &quot;Infected&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">severity</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">&quot;None&quot;, &quot;Low&quot;, &quot;Moderate&quot;, &quot;High&quot;, &quot;Critical&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">confidence</td>
                <td className="py-2 px-4">number</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">0.965 (or 96.5)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">split</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">&quot;Train&quot; | &quot;Validation&quot; | &quot;Test&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">scientificName</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">&quot;Alternaria solani&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">symptoms</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">&quot;Concentric dark brown target spots...&quot;</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-agro-600 dark:text-agro-400">treatment</td>
                <td className="py-2 px-4">string</td>
                <td className="py-2 px-4 text-slate-400">Optional</td>
                <td className="py-2 px-4">&quot;Apply copper hydroxide fungicide...&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
