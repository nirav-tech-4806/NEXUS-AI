import React, { useState } from 'react';
import { GraphNode, GraphEdge } from '../../types/nexus.ts';
import { initialLandscapeNodes, initialLandscapeEdges } from '../../data/mockData.ts';
import {
  RotateCcw,
  Plus,
  Maximize2,
  ExternalLink,
  Share2,
  Info,
} from 'lucide-react';

interface LandscapeViewProps {
  onOpenThoughtStream: (topicId: string) => void;
  wireframeMode: boolean;
}

export const LandscapeView: React.FC<LandscapeViewProps> = ({
  onOpenThoughtStream,
  wireframeMode,
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialLandscapeNodes);
  const [edges] = useState<GraphEdge[]>(initialLandscapeEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('quantum-cognition');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleAddNode = () => {
    const newNode: GraphNode = {
      id: `node-${Date.now()}`,
      name: `Synthesized Node ${nodes.length + 1}`,
      type: 'Idea',
      x: 350 + (Math.random() * 80 - 40),
      y: 220 + (Math.random() * 80 - 40),
      inference: 'Nexus Core 4.2',
      linkedCount: 2,
      updated: 'Just now',
      description: 'Newly synthesized exploratory node in active continuous state mapping.',
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
  };

  const handleReset = () => {
    setNodes(initialLandscapeNodes);
    setSelectedNodeId('quantum-cognition');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* View Header */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Landscape
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Ideas and research points connected across disciplines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddNode}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
              wireframeMode
                ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-medium'
                : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-xs'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Idea Node</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
            title="Reset layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace: 2-column layout */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Container: INFORMATION LANDSCAPE */}
        <div
          className={`flex-1 rounded-lg flex flex-col relative overflow-hidden border ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 shadow-xs'
          }`}
        >
          {/* Box Header Label */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>INFORMATION LANDSCAPE</span>
            <span className="text-[11px] text-neutral-400 font-normal">
              {nodes.length} Active Nodes · Interactive Canvas
            </span>
          </div>

          {/* Interactive SVG Network Canvas */}
          <div className="flex-1 relative w-full h-full min-h-[420px]">
            {/* Grid Background Pattern */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <svg
              className="w-full h-full"
              viewBox="0 0 750 480"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Edges */}
              <g className="edges">
                {edges.map((edge, idx) => {
                  const src = nodes.find((n) => n.id === edge.source);
                  const tgt = nodes.find((n) => n.id === edge.target);
                  if (!src || !tgt) return null;

                  const isHighlighted =
                    selectedNodeId === src.id || selectedNodeId === tgt.id;

                  return (
                    <line
                      key={`edge-${idx}`}
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={
                        wireframeMode
                          ? isHighlighted
                            ? '#171717'
                            : '#737373'
                          : isHighlighted
                          ? '#0284c7'
                          : '#94a3b8'
                      }
                      strokeWidth={isHighlighted ? 2.5 : 1.5}
                      strokeDasharray={isHighlighted ? 'none' : '4,2'}
                      className="transition-all duration-200"
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {nodes.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isHovered = node.id === hoveredNodeId;

                  // Circle radius matching wireframe style
                  const radius =
                    node.id === 'nexus-core'
                      ? 26
                      : node.id === 'quantum-cognition'
                      ? 24
                      : 22;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => handleNodeClick(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId(null)}
                      className="cursor-pointer group"
                    >
                      {/* Selection Ring */}
                      {isSelected && (
                        <circle
                          r={radius + 6}
                          fill="none"
                          stroke={wireframeMode ? '#171717' : '#0284c7'}
                          strokeWidth="2"
                          strokeDasharray="3,3"
                          className="animate-spin-slow origin-center"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={radius}
                        fill={
                          wireframeMode
                            ? isSelected
                              ? '#ffffff'
                              : '#f5f5f5'
                            : isSelected
                            ? '#0284c7'
                            : '#ffffff'
                        }
                        stroke={
                          wireframeMode
                            ? '#171717'
                            : isSelected
                            ? '#0369a1'
                            : '#475569'
                        }
                        strokeWidth={wireframeMode ? (isSelected ? 3 : 2) : 2}
                        className="transition-transform duration-150 group-hover:scale-105"
                      />

                      {/* Inner dot or icon for high fidelity */}
                      {!wireframeMode && (
                        <circle
                          r={4}
                          fill={isSelected ? '#ffffff' : '#64748b'}
                        />
                      )}

                      {/* Label Text below node - exact match with wireframe font */}
                      <text
                        y={radius + 16}
                        textAnchor="middle"
                        className={`text-[12px] font-medium transition-colors select-none ${
                          isSelected
                            ? 'font-bold fill-neutral-900 dark:fill-white'
                            : 'fill-neutral-600 dark:fill-neutral-300'
                        }`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Canvas Hint */}
            <div className="absolute bottom-3 left-4 text-[11px] text-neutral-400 dark:text-neutral-500">
              Click any node to inspect attributes and open associated thought streams
            </div>
          </div>
        </div>

        {/* Right Container: SELECTED ENTITY */}
        <div
          className={`w-80 rounded-lg flex flex-col border ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>SELECTED ENTITY</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                wireframeMode
                  ? 'border border-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {selectedNode.type}
            </span>
          </div>

          {/* Entity Content */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {selectedNode.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Attributes Table matching wireframe */}
              <div
                className={`rounded border text-xs divide-y ${
                  wireframeMode
                    ? 'border-neutral-900 divide-neutral-900'
                    : 'border-neutral-200 dark:border-neutral-800 divide-neutral-100 dark:divide-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Type</span>
                  <span className="font-medium text-neutral-900 dark:text-white font-mono">
                    {selectedNode.type}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Inference</span>
                  <span className="font-medium text-neutral-900 dark:text-white font-mono">
                    {selectedNode.inference}
                  </span>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Linked</span>
                  <span className="font-medium text-neutral-900 dark:text-white font-mono">
                    {selectedNode.linkedCount} nodes
                  </span>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2.5">
                  <span className="text-neutral-500 dark:text-neutral-400">Updated</span>
                  <span className="font-medium text-neutral-900 dark:text-white font-mono">
                    {selectedNode.updated}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button matching wireframe */}
            <div className="pt-6">
              <button
                onClick={() => onOpenThoughtStream(selectedNode.id)}
                className={`w-full py-2.5 px-4 text-xs font-semibold rounded text-center transition-colors flex items-center justify-center gap-2 ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 font-mono'
                    : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                }`}
              >
                <span>Open Thought Stream</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
