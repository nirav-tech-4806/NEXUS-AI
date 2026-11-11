import React, { useState } from 'react';
import { GraphNode, GraphEdge } from '../../types/nexus.ts';
import {
  initialConnectedSystemsNodes,
  initialConnectedSystemsEdges,
} from '../../data/mockData.ts';
import {
  Layers,
  ExternalLink,
  Plus,
  RefreshCw,
  FolderKanban,
  Database,
  User,
  Cpu,
} from 'lucide-react';

interface ConnectedSystemsViewProps {
  wireframeMode: boolean;
  onNavigateToProjects?: () => void;
}

export const ConnectedSystemsView: React.FC<ConnectedSystemsViewProps> = ({
  wireframeMode,
  onNavigateToProjects,
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>(initialConnectedSystemsNodes);
  const [edges] = useState<GraphEdge[]>(initialConnectedSystemsEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('nexus-neural-core');
  const [activeWorkspace, setActiveWorkspace] = useState<string>('Project Aether');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const correlatedWorkspaces = [
    { id: 'ws-1', name: 'Project Aether', activeNodes: 8, status: 'Active' },
    { id: 'ws-2', name: 'BioNeuron V4', activeNodes: 6, status: 'Converging' },
    { id: 'ws-3', name: 'Topological Convergence', activeNodes: 4, status: 'Mapped' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Connected Systems
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Relational information map — ideas, projects, people and data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
            <span>Topology: Mesh</span>
            <span>·</span>
            <span>Density: 0.82</span>
          </div>
        </div>
      </div>

      {/* 2-Column Content */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* Left Container: INFORMATION MAP TOPOLOGY */}
        <div
          className={`flex-1 rounded-lg flex flex-col relative overflow-hidden border ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 shadow-xs'
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3 border-b flex items-center justify-between ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900 font-mono font-bold text-xs'
                : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>INFORMATION MAP TOPOLOGY</span>
            <span className="text-[11px] text-neutral-400 font-mono">
              Inter-system Topology Matrix
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="flex-1 relative w-full h-full min-h-[420px]">
            <svg
              className="w-full h-full"
              viewBox="0 0 720 460"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Topology Edges */}
              <g className="edges">
                {edges.map((edge, idx) => {
                  const src = nodes.find((n) => n.id === edge.source);
                  const tgt = nodes.find((n) => n.id === edge.target);
                  if (!src || !tgt) return null;

                  const isConnected =
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
                          ? '#171717'
                          : isConnected
                          ? '#2563eb'
                          : '#94a3b8'
                      }
                      strokeWidth={isConnected ? 2.5 : 1.5}
                      strokeDasharray={isConnected ? 'none' : '3,3'}
                    />
                  );
                })}
              </g>

              {/* Topology Nodes */}
              <g className="nodes">
                {nodes.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const radius = node.id === 'nexus-neural-core' ? 26 : 22;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer group"
                    >
                      {/* Selection Ring */}
                      {isSelected && (
                        <circle
                          r={radius + 6}
                          fill="none"
                          stroke={wireframeMode ? '#171717' : '#2563eb'}
                          strokeWidth="2"
                          strokeDasharray="4,2"
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
                            ? '#2563eb'
                            : '#ffffff'
                        }
                        stroke={
                          wireframeMode
                            ? '#171717'
                            : isSelected
                            ? '#1d4ed8'
                            : '#475569'
                        }
                        strokeWidth={wireframeMode ? 2.5 : 2}
                        className="transition-transform group-hover:scale-105"
                      />

                      {/* Node Label exactly as in wireframe */}
                      <text
                        y={radius + 18}
                        textAnchor="middle"
                        className={`text-[12px] font-medium select-none ${
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

            <div className="absolute bottom-3 left-4 text-[11px] text-neutral-400 dark:text-neutral-500">
              Select systems to inspect relational density and correlated workspaces
            </div>
          </div>
        </div>

        {/* Right Container: SYSTEM NODE INSPECTOR */}
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
            <span>SYSTEM NODE INSPECTOR</span>
            <span className="text-[10px] font-mono text-neutral-400">
              SYS-01
            </span>
          </div>

          {/* Inspector Body */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div>
              {/* Selected Node Name */}
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {selectedNode.name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                {selectedNode.description}
              </p>

              {/* RELATIONAL DENSITY matching wireframe */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  RELATIONAL DENSITY
                </div>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                  {selectedNode.linkedCount} linked nodes
                </div>
              </div>

              {/* CORRELATED WORKSPACES matching wireframe buttons */}
              <div className="mt-6">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                  CORRELATED WORKSPACES
                </div>
                <div className="space-y-2">
                  {correlatedWorkspaces.map((ws) => {
                    const isCurrent = activeWorkspace === ws.name;
                    return (
                      <button
                        key={ws.id}
                        onClick={() => setActiveWorkspace(ws.name)}
                        className={`w-full text-left p-3 rounded-md text-xs transition-all ${
                          isCurrent
                            ? wireframeMode
                              ? 'border-2 border-neutral-900 bg-white font-bold text-neutral-900'
                              : 'border border-neutral-900 dark:border-white bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-900 dark:text-white shadow-xs'
                            : wireframeMode
                            ? 'border border-neutral-900/50 bg-white hover:border-neutral-900 text-neutral-800'
                            : 'border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{ws.name}</span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            {ws.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Status Callout */}
            <div
              className={`p-3 rounded text-[11px] font-mono ${
                wireframeMode
                  ? 'border border-neutral-900 text-neutral-800'
                  : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              Active Workspace: <span className="font-bold">{activeWorkspace}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
