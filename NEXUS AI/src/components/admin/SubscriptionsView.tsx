import React, { useState } from 'react';
import { SubscriberAudit } from '../../types/nexus.ts';
import { initialSubscriberAudits } from '../../data/mockData.ts';
import { CreditCard, Download, Search, Filter } from 'lucide-react';

interface SubscriptionsViewProps {
  wireframeMode: boolean;
}

export const SubscriptionsView: React.FC<SubscriptionsViewProps> = ({
  wireframeMode,
}) => {
  const [subscribers] = useState<SubscriberAudit[]>(initialSubscriberAudits);
  const [searchQuery, setSearchQuery] = useState('');

  const plansOverview = [
    { name: 'Starter Plan', price: '$0 / mo', stat: '840 Users' },
    { name: 'Professional Research', price: '$49 / mo', stat: '522 Users' },
    { name: 'Enterprise Node', price: '$299 / mo', stat: '120 Nodes' },
  ];

  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Subscriptions
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Subscription overview • plan distribution and billing cycle governance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>MRR: $61,458</span>
          <span>·</span>
          <span>Active Nodes: 1,482</span>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-7xl">
        {/* Top 3 Plan Distribution Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plansOverview.map((plan, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border flex flex-col justify-between ${
                wireframeMode
                  ? 'border-neutral-900 bg-white'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
              }`}
            >
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {plan.name}
                </h3>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-neutral-900 dark:text-white mt-2">
                  {plan.price}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                <span className="text-neutral-400">Total Allocated</span>
                <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">
                  {plan.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* SUBSCRIBER AUDIT REGISTRY matching wireframe */}
        <div
          className={`rounded-lg border overflow-hidden ${
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
                : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300'
            }`}
          >
            <span>SUBSCRIBER AUDIT REGISTRY</span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Audit Verified
            </span>
          </div>

          {/* Table matching wireframe */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                  wireframeMode
                    ? 'border-neutral-900 bg-white text-neutral-900 font-mono'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <tr>
                  <th className="py-3 px-5">USER</th>
                  <th className="py-3 px-5">PLAN</th>
                  <th className="py-3 px-5">STATUS</th>
                  <th className="py-3 px-5">START DATE</th>
                  <th className="py-3 px-5">RENEWAL DATE</th>
                  <th className="py-3 px-5 text-right">MONTHLY RATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
                {filteredSubscribers.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-5 font-sans font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.userName}
                    </td>
                    <td className="py-3.5 px-5 font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                      {item.plan}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-bold ${
                          item.status === 'ACTIVE'
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                      {item.startDate}
                    </td>
                    <td className="py-3.5 px-5 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                      {item.renewalDate}
                    </td>
                    <td className="py-3.5 px-5 text-right font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.monthlyRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
