import React, { useState } from 'react';
import { pricingPlans } from '../../data/mockData.ts';
import { Check, Sparkles, CheckCircle2 } from 'lucide-react';

interface TierPlanViewProps {
  wireframeMode: boolean;
}

export const TierPlanView: React.FC<TierPlanViewProps> = ({ wireframeMode }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('professional');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectPlan = (planId: string, planName: string) => {
    setSelectedPlanId(planId);
    setNotification(`Successfully switched workspace allocation to ${planName}.`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header matching wireframe */}
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Tier Plan
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Intelligence capacity and compute allocation for the research workspace.
          </p>
        </div>

        {notification && (
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}
      </div>

      {/* 3 Pricing Cards */}
      <div className="p-8 flex-1 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => {
            const isCurrent = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-6 flex flex-col justify-between transition-all ${
                  wireframeMode
                    ? isCurrent
                      ? 'border-2 border-neutral-900 bg-white'
                      : 'border border-neutral-900 bg-white'
                    : isCurrent
                    ? 'border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 shadow-md ring-1 ring-neutral-900/5'
                    : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-400'
                }`}
              >
                <div>
                  {/* Wireframe top tiny label */}
                  <div
                    className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${
                      wireframeMode
                        ? 'font-mono text-neutral-900'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  >
                    TIER
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white font-mono tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {plan.period}
                    </span>
                  </div>

                  {plan.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      {plan.description}
                    </p>
                  )}

                  {/* Features List matching wireframe checkmarks */}
                  <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                    {plan.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300"
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 ${
                            wireframeMode
                              ? 'text-neutral-900'
                              : 'text-neutral-900 dark:text-white'
                          }`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Button matching wireframe "Current / Select Plan" */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleSelectPlan(plan.id, plan.name)}
                    className={`w-full py-2.5 px-4 text-xs font-semibold rounded text-center transition-all ${
                      isCurrent
                        ? wireframeMode
                          ? 'border border-neutral-900 bg-neutral-900 text-white font-mono'
                          : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                        : wireframeMode
                        ? 'border border-neutral-900 bg-white hover:bg-neutral-100 text-neutral-900 font-mono'
                        : 'border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : 'Current / Select Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
