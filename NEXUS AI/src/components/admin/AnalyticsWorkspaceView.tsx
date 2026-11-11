import React, { useState } from 'react';
import { initialTelemetryPoints, generatedReportsList } from '../../data/mockData.ts';
import {
  Download,
  Calendar,
  Activity,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';

interface AnalyticsWorkspaceViewProps {
  wireframeMode: boolean;
}

export const AnalyticsWorkspaceView: React.FC<AnalyticsWorkspaceViewProps> = ({
  wireframeMode,
}) => {
  const [dateRange, setDateRange] = useState<string>('30');
  const [points] = useState(initialTelemetryPoints);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // SVG dimensions for Primary Compute Telemetry chart
  const width = 640;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const maxCompute = 100;
  const minCompute = 0;

  // Compute SVG coordinates
  const svgCoords = points.map((p, idx) => {
    const x =
      paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
    const y =
      height -
      paddingY -
      ((p.computeLoad - minCompute) / (maxCompute - minCompute)) *
        (height - paddingY * 2);
    return { x, y, point: p };
  });

  const pathD = svgCoords.reduce((acc, coord, idx) => {
    return idx === 0 ? `M ${coord.x} ${coord.y}` : `${acc} L ${coord.x} ${coord.y}`;
  }, '');

  // CSV Export Handler
  const handleDownloadCSV = () => {
    const headers = 'Date,ComputeLoadPercent,TokensAllocatedMillions,LatencyMs\n';
    const rows = points
      .map(
        (p) => `${p.date},${p.computeLoad}%,${p.tokensMillion}M,${p.latencyMs}ms`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Nexus_Compute_Telemetry_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Analytics Workspace
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            System reports • activity analysis, AI telemetry and downloadable audits.
          </p>
        </div>

        {downloadSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-200 dark:border-emerald-800 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CSV Report Exported</span>
          </div>
        )}
      </div>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Date Filter Bar matching wireframe */}
        <div
          className={`p-3.5 rounded-lg border flex items-center gap-3 ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            Date Filter:
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={`text-xs px-3 py-1 rounded border outline-none font-mono ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white'
            }`}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">Year to Date</option>
          </select>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width): PRIMARY COMPUTE TELEMETRY */}
          <div
            className={`lg:col-span-2 rounded-lg border flex flex-col ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <div
              className={`px-5 py-3 border-b flex items-center justify-between ${
                wireframeMode
                  ? 'border-neutral-900 text-neutral-900 font-mono font-bold text-xs'
                  : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <span>PRIMARY COMPUTE TELEMETRY</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                Real-time GPU Load Stream
              </span>
            </div>

            {/* Interactive Telemetry Chart */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="relative w-full h-[240px]">
                <svg
                  className="w-full h-full"
                  viewBox={`0 0 ${width} ${height}`}
                  preserveAspectRatio="none"
                >
                  {/* Grid Lines */}
                  {[25, 50, 75].map((level) => {
                    const y =
                      height -
                      paddingY -
                      (level / 100) * (height - paddingY * 2);
                    return (
                      <line
                        key={level}
                        x1={paddingX}
                        y1={y}
                        x2={width - paddingX}
                        y2={y}
                        stroke={wireframeMode ? '#e5e5e5' : '#e2e8f0'}
                        strokeDasharray="2,2"
                        className="dark:stroke-neutral-800"
                      />
                    );
                  })}

                  {/* Telemetry Line matching wireframe */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={wireframeMode ? '#171717' : '#0f172a'}
                    strokeWidth={wireframeMode ? '2' : '2.5'}
                    className="dark:stroke-white"
                  />

                  {/* Telemetry Points matching wireframe circles */}
                  {svgCoords.map((coord, idx) => {
                    const isHovered = hoveredPointIndex === idx;
                    return (
                      <g
                        key={idx}
                        onMouseEnter={() => setHoveredPointIndex(idx)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={coord.x}
                          cy={coord.y}
                          r={isHovered ? 6 : 4}
                          fill={wireframeMode ? '#171717' : '#0284c7'}
                          stroke={wireframeMode ? '#ffffff' : '#ffffff'}
                          strokeWidth="2"
                        />
                        {/* X-axis date label */}
                        <text
                          x={coord.x}
                          y={height - 8}
                          textAnchor="middle"
                          className="text-[10px] font-mono fill-neutral-400"
                        >
                          {coord.point.date}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip on hover */}
                {hoveredPointIndex !== null && (
                  <div
                    className={`absolute z-10 p-2.5 rounded border text-[11px] font-mono shadow-md pointer-events-none ${
                      wireframeMode
                        ? 'border-neutral-900 bg-white text-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white'
                    }`}
                    style={{
                      left: `${svgCoords[hoveredPointIndex].x - 40}px`,
                      top: `${svgCoords[hoveredPointIndex].y - 50}px`,
                    }}
                  >
                    <div>{points[hoveredPointIndex].date}</div>
                    <div className="font-bold">
                      Load: {points[hoveredPointIndex].computeLoad}%
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      Tokens: {points[hoveredPointIndex].tokensMillion}M
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-between text-xs text-neutral-500 font-mono">
                <span>Peak Load: 85% (Nov 06)</span>
                <span>Average Invariant: 61.8%</span>
              </div>
            </div>
          </div>

          {/* Right Column (1/3 width): 2 Metric Cards matching wireframe */}
          <div className="space-y-6 flex flex-col justify-between">
            {/* User Activity Index Card */}
            <div
              className={`p-6 rounded-lg border flex-1 flex flex-col justify-between ${
                wireframeMode
                  ? 'border-neutral-900 bg-white'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  wireframeMode
                    ? 'font-mono text-neutral-900'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                User Activity Index
              </div>
              <div className="my-3">
                <div className="text-3xl font-extrabold font-mono tabular-nums text-neutral-900 dark:text-white">
                  94.8%
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Aggregated active research sessions, canvas revisions, and hypothesis iterations.
              </p>
            </div>

            {/* AI Compute Efficiency Card */}
            <div
              className={`p-6 rounded-lg border flex-1 flex flex-col justify-between ${
                wireframeMode
                  ? 'border-neutral-900 bg-white'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  wireframeMode
                    ? 'font-mono text-neutral-900'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                AI Compute Efficiency
              </div>
              <div className="my-3">
                <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                  99.2%
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Zero pipeline starvation. Tensor allocation maintained at nominal saturation.
              </p>
            </div>
          </div>
        </div>

        {/* GENERATED REPORTS REGISTRY matching wireframe */}
        <div
          className={`rounded-lg border p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          <div>
            <div
              className={`text-[10px] font-semibold uppercase tracking-wider mb-1 ${
                wireframeMode
                  ? 'font-mono text-neutral-900'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              GENERATED REPORTS REGISTRY
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Download sanitized system logs, hardware telemetry metrics, and user activity records.
            </p>
          </div>

          {/* Download CSV button matching wireframe */}
          <button
            onClick={handleDownloadCSV}
            className={`px-4 py-2.5 text-xs font-semibold rounded flex items-center gap-2 transition-colors shrink-0 ${
              wireframeMode
                ? 'border border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 font-mono'
                : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
