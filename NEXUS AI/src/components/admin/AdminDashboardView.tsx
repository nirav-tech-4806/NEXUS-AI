import React, { useState } from 'react';
import { initialSystemActivities } from '../../data/mockData.ts';
import {
  Activity,
  Server,
  Users,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Plus,
} from 'lucide-react';

interface AdminDashboardViewProps {
  wireframeMode: boolean;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  wireframeMode,
}) => {
  const [activities, setActivities] = useState(initialSystemActivities);

  const kpis = [
    { label: 'AI Models', value: '99.9%', sub: 'Cluster Uptime' },
    { label: 'Users Registered', value: '1,482', sub: '+18% this month' },
    { label: 'Core Services', value: 'ONLINE', sub: 'All nodes healthy' },
    { label: 'Compute Usage', value: '62%', sub: 'Allocated 14.8 TFLOPS' },
  ];

  const healthItems = [
    { name: 'AI Models', status: 'Healthy', badgeColor: 'text-emerald-600' },
    { name: 'Users', status: 'Healthy', badgeColor: 'text-emerald-600' },
    { name: 'Core Services', status: 'Online', badgeColor: 'text-emerald-600' },
    { name: 'Security', status: 'Zero Breaches', badgeColor: 'text-emerald-600' },
  ];

  const handleSimulateActivity = () => {
    const newActivity = {
      id: `act-${Date.now()}`,
      title: 'Neural Node Synced',
      detail: 'BioNeuron Attractor Convergence',
      category: 'model' as const,
      timestamp: 'Just now',
    };
    setActivities([newActivity, ...activities]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            System overview • global telemetry monitoring & compute governance.
          </p>
        </div>

        <button
          onClick={handleSimulateActivity}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-colors ${
            wireframeMode
              ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-medium font-mono'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-xs'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Simulate Stream Event</span>
        </button>
      </div>

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-lg border flex flex-col justify-between ${
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
                {kpi.label}
              </div>
              <div className="my-2">
                <div className="text-2xl font-extrabold tracking-tight font-mono tabular-nums text-neutral-900 dark:text-white">
                  {kpi.value}
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-Column Content matching wireframe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column (2/3 width): SYSTEM ACTIVITY STREAM */}
          <div
            className={`md:col-span-2 rounded-lg border flex flex-col ${
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
              <span>SYSTEM ACTIVITY STREAM</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                Real-time Audit
              </span>
            </div>

            {/* List matching wireframe horizontal stream bars */}
            <div className="p-5 space-y-3 flex-1">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className={`p-3.5 rounded-md border flex items-center justify-between text-xs transition-all ${
                    wireframeMode
                      ? 'border-neutral-900 bg-white hover:bg-neutral-50'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {act.title}
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-600 dark:text-neutral-300">
                      {act.detail}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono shrink-0">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (1/3 width): SYSTEM HEALTH STATUS */}
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
              <span>SYSTEM HEALTH STATUS</span>
              <span className="text-[10px] font-mono text-emerald-600">
                100% OK
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1">
              {healthItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-md border flex items-center justify-between text-xs ${
                    wireframeMode
                      ? 'border-neutral-900 bg-white'
                      : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40'
                  }`}
                >
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                    {item.name}
                  </span>
                  <span className={`font-semibold font-mono ${item.badgeColor}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono text-center">
              Autonomous Health Prober Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
