import React from 'react';
import { DiseaseDetectionDemo } from '../components/simulator/DiseaseDetectionDemo';
import { Microscope, BrainCircuit, Scan, ShieldCheck } from 'lucide-react';

export const SimulatorPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <Microscope className="w-6 h-6 text-agro-600 dark:text-agro-400" />
          AI Leaf Pathology Diagnostic Simulator
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Interactive evaluation module for BTech project demonstration and real-time model inference testing
        </p>
      </div>

      <DiseaseDetectionDemo />

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <BrainCircuit className="w-4 h-4 text-blue-500" />
            Transfer Learning Backbone
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Trained on multi-spectral leaf imagery using ResNet50 and Vision Transformer architectures fine-tuned on the PlantVillage pathology benchmark.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Scan className="w-4 h-4 text-amber-500" />
            Grad-CAM Interpretability
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Gradient-weighted Class Activation Mapping (Grad-CAM) highlights exact foliar lesion loci guiding the model&apos;s decision boundary.
          </p>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-agro-500" />
            Agronomic Treatment Logic
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Maps detected fungal, bacterial, and viral conditions directly to curated bio-rational and chemical crop protection guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
