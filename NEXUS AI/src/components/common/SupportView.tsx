import React, { useState } from 'react';
import {
  HelpCircle,
  FileText,
  Mail,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

interface SupportViewProps {
  wireframeMode: boolean;
}

export const SupportView: React.FC<SupportViewProps> = ({ wireframeMode }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Support & Documentation
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Technical support, research workspace guides, and administrator contact.
          </p>
        </div>

        {submitted && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded border border-emerald-200 dark:border-emerald-800 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Support Request Dispatched</span>
          </div>
        )}
      </div>

      <div className="p-8 space-y-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documentation Cards */}
          <div
            className={`p-6 rounded-lg border ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Faculty & Project Reference
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
              01CE1306 – Web Technology Project: NEXUS AI – Intelligent Research
              Workspace & Admin Control by Nirav Nimavat (92610103001).
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Client-side Suite:
                </span>{' '}
                Landscape, Evolving Thread, Connected Systems,
                Exploration, Tier Plan.
              </div>
              <div className="p-3 rounded border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                <span className="font-semibold text-neutral-900 dark:text-white">
                  Admin-side Suite:
                </span>{' '}
                Dashboard, Users Governance, Neural Models Workspace,
                Subscriptions, Analytics Telemetry.
              </div>
            </div>
          </div>

          {/* Contact Dispatch Form */}
          <div
            className={`p-6 rounded-lg border ${
              wireframeMode
                ? 'border-neutral-900 bg-white'
                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs'
            }`}
          >
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Dispatch Technical Ticket
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-500 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g. Invariance threshold calibration"
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Inquiry / Issue</label>
                <textarea
                  rows={3}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your inquiry or cluster request..."
                  className="w-full px-3 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 text-xs font-semibold rounded ${
                    wireframeMode
                      ? 'border border-neutral-900 bg-neutral-900 text-white font-mono'
                      : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                  }`}
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
