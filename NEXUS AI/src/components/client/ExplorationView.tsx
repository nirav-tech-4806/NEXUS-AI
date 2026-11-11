import React, { useState } from 'react';
import { ExplorationItem } from '../../types/nexus.ts';
import { initialExplorationItems } from '../../data/mockData.ts';
import {
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  BookOpen,
  FolderGit2,
  Users,
  X,
} from 'lucide-react';

interface ExplorationViewProps {
  wireframeMode: boolean;
}

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  wireframeMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  const filterButtons = [
    { id: 'all', label: 'All Content' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' },
    { id: 'concepts', label: 'Concepts' },
    { id: 'people', label: 'People' },
  ];

  // Filter items
  const filteredItems = initialExplorationItems.filter((item) => {
    const matchesFilter =
      activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const deepResearchItems = filteredItems.filter(
    (item) => item.category === 'research'
  );
  const activeProjectsItems = filteredItems.filter(
    (item) => item.category === 'projects'
  );
  const peopleNodesItems = filteredItems.filter(
    (item) => item.category === 'people'
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Exploration
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Curated discovery — islands of knowledge across the intelligence space.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exploration space..."
            className={`w-full pl-9 pr-3 py-1.5 text-xs rounded border outline-none transition-colors ${
              wireframeMode
                ? 'border-neutral-900 bg-white font-mono'
                : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:border-neutral-900 dark:focus:border-white'
            }`}
          />
        </div>
      </div>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* FEATURED PRINCIPLE Banner matching wireframe */}
        <div
          className={`p-6 rounded-lg border relative ${
            wireframeMode
              ? 'border-neutral-900 bg-white'
              : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
          }`}
        >
          <div
            className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
              wireframeMode
                ? 'font-mono text-neutral-900'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            FEATURED PRINCIPLE
          </div>
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white max-w-2xl">
            Designing intelligence around human thinking.
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Featured research, connected ideas and active pipelines.
          </p>
        </div>

        {/* Filter Buttons matching wireframe */}
        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id)}
                className={`px-3.5 py-1.5 text-xs rounded transition-all font-medium ${
                  isActive
                    ? wireframeMode
                      ? 'border border-neutral-900 bg-neutral-900 text-white font-mono'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                    : wireframeMode
                    ? 'border border-neutral-900 bg-white text-neutral-800 hover:bg-neutral-100 font-mono'
                    : 'border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400'
                }`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: DEEP RESEARCH */}
          <div
            className={`rounded-lg border flex flex-col ${
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
              <span>DEEP RESEARCH</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {deepResearchItems.length}
              </span>
            </div>

            <div className="p-4 space-y-4 flex-1">
              {deepResearchItems.length > 0 ? (
                deepResearchItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-md border text-xs flex flex-col justify-between transition-all ${
                      wireframeMode
                        ? 'border-neutral-900 bg-white hover:bg-neutral-50'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/40 dark:bg-neutral-800/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 truncate max-w-[150px]">
                        {item.metadata}
                      </span>
                      <button
                        onClick={() => setSelectedItem(item)}
                        className={`font-semibold flex items-center gap-1 hover:underline ${
                          wireframeMode ? 'font-mono text-neutral-900' : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-neutral-400 py-8 text-center">
                  No research items matching criteria
                </div>
              )}
            </div>
          </div>

          {/* Column 2: ACTIVE PROJECTS */}
          <div
            className={`rounded-lg border flex flex-col ${
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
              <span>ACTIVE PROJECTS</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {activeProjectsItems.length}
              </span>
            </div>

            <div className="p-4 space-y-4 flex-1">
              {activeProjectsItems.length > 0 ? (
                activeProjectsItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-md border text-xs flex flex-col justify-between transition-all ${
                      wireframeMode
                        ? 'border-neutral-900 bg-white hover:bg-neutral-50'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/40 dark:bg-neutral-800/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 truncate max-w-[150px]">
                        {item.metadata}
                      </span>
                      <button
                        onClick={() => setSelectedItem(item)}
                        className={`font-semibold flex items-center gap-1 hover:underline ${
                          wireframeMode ? 'font-mono text-neutral-900' : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-neutral-400 py-8 text-center">
                  No active projects matching criteria
                </div>
              )}
            </div>
          </div>

          {/* Column 3: PEOPLE NODES */}
          <div
            className={`rounded-lg border flex flex-col ${
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
              <span>PEOPLE NODES</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {peopleNodesItems.length}
              </span>
            </div>

            <div className="p-4 space-y-4 flex-1">
              {peopleNodesItems.length > 0 ? (
                peopleNodesItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-md border text-xs flex flex-col justify-between transition-all ${
                      wireframeMode
                        ? 'border-neutral-900 bg-white hover:bg-neutral-50'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 bg-neutral-50/40 dark:bg-neutral-800/40'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400 truncate max-w-[150px]">
                        {item.metadata}
                      </span>
                      <button
                        onClick={() => setSelectedItem(item)}
                        className={`font-semibold flex items-center gap-1 hover:underline ${
                          wireframeMode ? 'font-mono text-neutral-900' : 'text-neutral-900 dark:text-white'
                        }`}
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-neutral-400 py-8 text-center">
                  No people nodes matching criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-lg border p-6 shadow-xl relative ${
              wireframeMode
                ? 'border-neutral-900 bg-white text-neutral-900'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white'
            }`}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Category: {selectedItem.category}
            </div>
            <h3 className="text-lg font-bold">{selectedItem.title}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="mt-4 p-3 rounded bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Metadata:</span>
                <span className="font-mono">{selectedItem.metadata}</span>
              </div>
              {selectedItem.authorOrLead && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Lead / Contact:</span>
                  <span className="font-mono">{selectedItem.authorOrLead}</span>
                </div>
              )}
              {selectedItem.status && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status:</span>
                  <span className="font-mono text-emerald-600">{selectedItem.status}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className={`px-4 py-2 text-xs font-semibold rounded ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-white hover:bg-neutral-900 hover:text-white'
                    : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900'
                }`}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
