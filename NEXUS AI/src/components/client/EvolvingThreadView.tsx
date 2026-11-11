import React, { useState } from 'react';
import { ThoughtStream, ThreadStep } from '../../types/nexus.ts';
import { initialThoughtStreams } from '../../data/mockData.ts';
import {
  Send,
  Plus,
  Sparkles,
  GitCommit,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
} from 'lucide-react';

interface EvolvingThreadViewProps {
  initialStreamId?: string;
  wireframeMode: boolean;
}

export const EvolvingThreadView: React.FC<EvolvingThreadViewProps> = ({
  initialStreamId,
  wireframeMode,
}) => {
  const [streams, setStreams] = useState<ThoughtStream[]>(initialThoughtStreams);
  const [selectedStreamId, setSelectedStreamId] = useState<string>(
    initialStreamId || 'quantum-cognition'
  );
  const [queryInput, setQueryInput] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const activeStream =
    streams.find((s) => s.id === selectedStreamId) || streams[0];

  const handleSelectStream = (id: string) => {
    setSelectedStreamId(id);
  };

  const handleAddStream = () => {
    const newId = `stream-${Date.now()}`;
    const newStream: ThoughtStream = {
      id: newId,
      title: `Topological Nexus ${streams.length + 1}`,
      selected: false,
      activeModel: 'NEXUS Core 4.2',
      relationalDependency: '91.8%',
      project: 'Aether Pipeline',
      state: 'Active',
      steps: [
        {
          stepNumber: 'STEP 01',
          title: 'Initial Convergence',
          content: 'Synthesized baseline hypothesis for high-order topological embeddings.',
          timestamp: 'Just now',
          confidence: 0.95,
        },
      ],
    };
    setStreams([...streams, newStream]);
    setSelectedStreamId(newId);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isSynthesizing) return;

    const userPrompt = queryInput.trim();
    setQueryInput('');
    setIsSynthesizing(true);

    setTimeout(() => {
      const stepIndex = activeStream.steps.length + 1;
      const stepPadded = stepIndex < 10 ? `0${stepIndex}` : `${stepIndex}`;

      const newStep: ThreadStep = {
        stepNumber: `STEP ${stepPadded}`,
        title:
          stepIndex === 4
            ? 'Dynamic Entanglement'
            : stepIndex === 5
            ? 'Manifold Projection'
            : 'Synthesized Resolution',
        content: `Inquiry "${userPrompt}": Analysis confirms convergent eigenvalues across non-linear manifold, reducing latent variance by 18.4%.`,
        timestamp: 'Just now',
        confidence: 0.96,
      };

      setStreams((prev) =>
        prev.map((stream) => {
          if (stream.id === activeStream.id) {
            return {
              ...stream,
              steps: [...stream.steps, newStep],
            };
          }
          return stream;
        })
      );
      setIsSynthesizing(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Evolving Thread
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Continuous thought evolution and hypothesis development.
          </p>
        </div>

        <button
          onClick={handleAddStream}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
            wireframeMode
              ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-medium'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-xs'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Thought Stream</span>
        </button>
      </div>

      {/* 3-Column Content */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Column 1: THOUGHT STREAMS */}
        <div
          className={`w-64 rounded-lg flex flex-col border ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          {/* Header */}
          <div
            className={`px-4 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>THOUGHT STREAMS</span>
            <span className="text-[10px] text-neutral-400 font-mono">
              {streams.length} Total
            </span>
          </div>

          {/* List of Streams matching wireframe rounded button boxes */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {streams.map((stream) => {
              const isSelected = stream.id === activeStream.id;
              return (
                <button
                  key={stream.id}
                  onClick={() => handleSelectStream(stream.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-md text-xs transition-all ${
                    isSelected
                      ? wireframeMode
                        ? 'border-2 border-neutral-900 bg-white font-bold text-neutral-900'
                        : 'border border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white shadow-xs'
                      : wireframeMode
                      ? 'border border-neutral-900/40 bg-white hover:border-neutral-900 text-neutral-700'
                      : 'border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{stream.title}</span>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-neutral-400">
                        {stream.steps.length} steps
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: TOPIC STREAM */}
        <div
          className={`flex-1 rounded-lg flex flex-col border overflow-hidden ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          {/* Header with Topic Name */}
          <div
            className={`px-6 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>TOPIC STREAM</span>
              <span className="text-neutral-400">·</span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {activeStream.title}
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Model: {activeStream.activeModel}
            </span>
          </div>

          {/* Timeline of Evolution Steps */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 dark:before:bg-neutral-800">
              {activeStream.steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Step node indicator on line */}
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      wireframeMode
                        ? 'border-neutral-900 bg-white'
                        : 'border-neutral-900 dark:border-white bg-white dark:bg-neutral-900'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        wireframeMode
                          ? 'bg-neutral-900'
                          : 'bg-neutral-900 dark:bg-white'
                      }`}
                    />
                  </div>

                  {/* Step Header */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400">
                      {step.stepNumber}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">·</span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {step.title}
                    </h4>
                    {step.timestamp && (
                      <span className="text-[10px] text-neutral-400 font-mono ml-auto">
                        {step.timestamp}
                      </span>
                    )}
                  </div>

                  {/* Step Content Box */}
                  <div
                    className={`p-3.5 rounded-md text-xs leading-relaxed ${
                      wireframeMode
                        ? 'border border-neutral-900 bg-neutral-50/50 text-neutral-800 font-mono'
                        : 'border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {step.content}
                  </div>
                </div>
              ))}

              {isSynthesizing && (
                <div className="relative pl-0">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 italic animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Synthesizing continuous hypothesis vector...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Input matching wireframe */}
          <div
            className={`p-4 border-t ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60'
            }`}
          >
            <form onSubmit={handleSubmitInquiry} className="flex gap-2">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Inquire further to evolve this thread..."
                disabled={isSynthesizing}
                className={`flex-1 px-4 py-2.5 text-xs rounded border outline-none transition-colors ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white focus:bg-neutral-50 font-mono'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-neutral-900 dark:focus:border-white'
                }`}
              />
              <button
                type="submit"
                disabled={!queryInput.trim() || isSynthesizing}
                className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors disabled:opacity-40 ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 font-mono'
                    : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900'
                }`}
              >
                <span>Evolve</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>

        {/* Column 3: ACTIVE INTELLIGENCE */}
        <div
          className={`w-72 rounded-lg flex flex-col border ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>ACTIVE INTELLIGENCE</span>
            <span className="text-[10px] font-mono text-emerald-600">● LIVE</span>
          </div>

          {/* Model Details */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {activeStream.activeModel}
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Multi-dimensional neuro-attractor solver
              </p>
            </div>

            {/* Wireframe Metric Block */}
            <div
              className={`rounded border text-xs divide-y ${
                wireframeMode
                  ? 'border-neutral-900 divide-neutral-900'
                  : 'border-neutral-200 dark:border-neutral-800 divide-neutral-100 dark:divide-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between px-3.5 py-3">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Relational Dependency
                </span>
                <span className="font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
                  {activeStream.relationalDependency}
                </span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-3">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Project
                </span>
                <span className="font-medium text-neutral-900 dark:text-white font-mono">
                  {activeStream.project}
                </span>
              </div>
              <div className="flex items-center justify-between px-3.5 py-3">
                <span className="text-neutral-500 dark:text-neutral-400">
                  State
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  {activeStream.state}
                </span>
              </div>
            </div>

            {/* Sub-info */}
            <div className="text-[11px] text-neutral-400 dark:text-neutral-500 space-y-1">
              <div>Continuous State Vector: Invariant</div>
              <div>Hypothesis Revision Cycle: Realtime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
