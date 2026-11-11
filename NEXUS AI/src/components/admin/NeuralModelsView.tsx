import React, { useState } from 'react';
import { NeuralModel } from '../../types/nexus.ts';
import { initialNeuralModels } from '../../data/mockData.ts';
import {
  Cpu,
  Activity,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
  Gauge,
} from 'lucide-react';

interface NeuralModelsViewProps {
  wireframeMode: boolean;
}

export const NeuralModelsView: React.FC<NeuralModelsViewProps> = ({
  wireframeMode,
}) => {
  const [models, setModels] = useState<NeuralModel[]>(initialNeuralModels);
  const [selectedModelId, setSelectedModelId] = useState<string>('gpt-nexus-core');

  // Modals
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);

  const selectedModel =
    models.find((m) => m.id === selectedModelId) || models[0];

  // Parameters form state
  const [temp, setTemp] = useState(selectedModel.temperature);
  const [maxTokens, setMaxTokens] = useState(selectedModel.maxTokens);

  const handleUpdateParameters = (e: React.FormEvent) => {
    e.preventDefault();
    setModels((prev) =>
      prev.map((m) => {
        if (m.id === selectedModel.id) {
          return {
            ...m,
            temperature: temp,
            maxTokens: maxTokens,
            lastUpdated: 'Just now (Configured)',
          };
        }
        return m;
      })
    );
    setIsConfigureOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Neural Models Workspace
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Model management workspace & performance telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>Cluster Engine: Kubernetes GPU v2</span>
        </div>
      </div>

      {/* 3-Column Content */}
      <div className="p-8 flex-1 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1 (3 cols): AVAILABLE MODELS */}
          <div
            className={`lg:col-span-3 rounded-lg border flex flex-col ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <div
              className={`px-4 py-3 border-b flex items-center justify-between ${
                wireframeMode
                  ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                  : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <span>AVAILABLE MODELS</span>
            </div>

            <div className="p-3 space-y-2">
              {models.map((model) => {
                const isSelected = model.id === selectedModel.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModelId(model.id);
                      setTemp(model.temperature);
                      setMaxTokens(model.maxTokens);
                    }}
                    className={`w-full text-left p-3 rounded-md text-xs transition-all ${
                      isSelected
                        ? wireframeMode
                          ? 'border-2 border-neutral-900 bg-white font-bold text-neutral-900'
                          : 'border border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white shadow-xs'
                        : wireframeMode
                        ? 'border border-neutral-900/40 bg-white hover:border-neutral-900 text-neutral-700'
                        : 'border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{model.name}</span>
                      <span
                        className={`text-[10px] font-mono shrink-0 ml-1 font-bold ${
                          model.status === 'ACTIVE'
                            ? 'text-emerald-600'
                            : model.status === 'MAINT'
                            ? 'text-amber-600'
                            : 'text-neutral-400'
                        }`}
                      >
                        • {model.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2 (6 cols): Selected Model Details */}
          <div
            className={`lg:col-span-6 rounded-lg border p-6 flex flex-col justify-between space-y-6 ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <div>
              {/* Model Header */}
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                {selectedModel.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {selectedModel.description}
              </p>

              {/* Box: CONFIGURATION OVERVIEW matching wireframe */}
              <div
                className={`mt-6 p-5 rounded-md border ${
                  wireframeMode
                    ? 'border-neutral-900 bg-neutral-50/30'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <div
                  className={`text-[10px] font-semibold uppercase tracking-wider mb-4 ${
                    wireframeMode
                      ? 'font-mono text-neutral-900'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                >
                  CONFIGURATION OVERVIEW
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Context Window
                    </span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-white">
                      {selectedModel.contextWindow}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Weights Version
                    </span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-white">
                      {selectedModel.weightsVersion}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      Last Updated
                    </span>
                    <span className="font-mono font-medium text-neutral-900 dark:text-white">
                      {selectedModel.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons matching wireframe: View Telemetry & Configure Parameters */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => setIsTelemetryOpen(true)}
                className={`py-2 px-3 text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-1.5 ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-mono'
                    : 'border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                }`}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>View Telemetry</span>
              </button>

              <button
                onClick={() => setIsConfigureOpen(true)}
                className={`py-2 px-3 text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-1.5 ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-neutral-900 hover:bg-neutral-800 text-white font-mono'
                    : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure Parameters</span>
              </button>
            </div>
          </div>

          {/* Column 3 (3 cols): MODEL PERFORMANCE */}
          <div
            className={`lg:col-span-3 rounded-lg border flex flex-col ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <div
              className={`px-4 py-3 border-b flex items-center justify-between ${
                wireframeMode
                  ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                  : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <span>MODEL PERFORMANCE</span>
            </div>

            {/* 3 Metric Cards matching wireframe */}
            <div className="p-4 space-y-4">
              {/* Daily Inferences */}
              <div
                className={`p-4 rounded-md border ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Daily Inferences
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                  {selectedModel.dailyInferences}
                </div>
              </div>

              {/* Inference Latency */}
              <div
                className={`p-4 rounded-md border ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Inference Latency
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-white mt-1">
                  {selectedModel.latency}
                </div>
              </div>

              {/* Cluster Health */}
              <div
                className={`p-4 rounded-md border ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40'
                }`}
              >
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Cluster Health
                </div>
                <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
                  {selectedModel.clusterUptime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Telemetry Modal */}
      {isTelemetryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setIsTelemetryOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold mb-1">
              Live Telemetry — {selectedModel.name}
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Real-time hardware accelerator saturation and request latency stream.
            </p>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="text-neutral-500 text-[10px]">CURRENT THROUGHPUT</div>
                <div className="text-base font-bold text-neutral-900 dark:text-white">
                  1,840 tokens / sec
                </div>
              </div>

              <div className="p-3 rounded bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="text-neutral-500 text-[10px]">P99 LATENCY</div>
                <div className="text-base font-bold text-neutral-900 dark:text-white">
                  182ms
                </div>
              </div>

              <div className="p-3 rounded bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="text-neutral-500 text-[10px]">VRAM SATURATION</div>
                <div className="text-base font-bold text-neutral-900 dark:text-white">
                  74.2% (59.4 GB / 80 GB)
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsTelemetryOpen(false)}
                className="px-4 py-1.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Configure Parameters Modal */}
      {isConfigureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setIsConfigureOpen(false)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold mb-4">
              Configure Model Parameters
            </h3>

            <form onSubmit={handleUpdateParameters} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-neutral-500 mb-1">
                  <span>Temperature</span>
                  <span className="font-mono">{temp}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={temp}
                  onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Max Generation Tokens</label>
                <input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConfigureOpen(false)}
                  className="px-3 py-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold"
                >
                  Apply Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
