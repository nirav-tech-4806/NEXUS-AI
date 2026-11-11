import React from 'react';
import {
  AppMode,
  ClientScreen,
  AdminScreen,
  AuthSession,
} from '../../types/nexus.ts';
import {
  Sun,
  Moon,
  Layers,
  ArrowRightLeft,
  User,
  LogOut,
  Shield,
  LogIn,
  Code,
} from 'lucide-react';

interface HeaderProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  clientScreen: ClientScreen;
  setClientScreen: (screen: ClientScreen) => void;
  adminScreen: AdminScreen;
  setAdminScreen: (screen: AdminScreen) => void;
  wireframeMode: boolean;
  setWireframeMode: (val: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  authSession: AuthSession | null;
  onOpenAuth: (portal: AppMode, mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenCodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  clientScreen,
  setClientScreen,
  adminScreen,
  setAdminScreen,
  wireframeMode,
  setWireframeMode,
  darkMode,
  setDarkMode,
  authSession,
  onOpenAuth,
  onLogout,
  onOpenCodeModal,
}) => {
  const currentViewTitle =
    appMode === 'client'
      ? {
          landscape: 'Knowledge Landscape',
          thread: 'Evolving Thought Streams',
          systems: 'Connected Systems Topology',
          exploration: 'Discovery & Exploration',
          tiers: 'Intelligence Tier Plan',
          overview: 'Workspace Overview',
          projects: 'Active Projects',
          research: 'Research Ingestion',
          settings: 'Workspace Settings',
        }[clientScreen]
      : {
          dashboard: 'System Telemetry Dashboard',
          users: 'User Governance Directory',
          models: 'Neural Models Management',
          subscriptions: 'Subscription & Plan Audit',
          analytics: 'Analytics & Compute Telemetry',
          support: 'Support & Documentation',
        }[adminScreen];

  return (
    <header
      className={`h-14 px-6 border-b flex items-center justify-between gap-4 select-none ${
        wireframeMode
          ? 'bg-white border-neutral-900 text-neutral-900'
          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100'
      }`}
    >
      {/* Zone 1: Current Breadcrumb without any fig references */}
      <div className="flex items-center gap-3">
        <span
          className={`text-xs px-2.5 py-0.5 rounded font-mono font-medium ${
            wireframeMode
              ? 'border border-neutral-900 bg-neutral-100'
              : appMode === 'client'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
          }`}
        >
          {appMode === 'client' ? 'Researcher Workspace' : 'Administrative Governance'}
        </span>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-neutral-400 dark:text-neutral-500">/</span>
          <span className="font-semibold">{currentViewTitle}</span>
        </div>
      </div>

      {/* Zone 2: Navigation Quick View Links */}
      <div className="hidden xl:flex items-center gap-1 text-xs">
        {appMode === 'client' ? (
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-md">
            <button
              onClick={() => setClientScreen('landscape')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                clientScreen === 'landscape'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Landscape
            </button>
            <button
              onClick={() => setClientScreen('thread')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                clientScreen === 'thread'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Evolving Thread
            </button>
            <button
              onClick={() => setClientScreen('systems')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                clientScreen === 'systems'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Connected Systems
            </button>
            <button
              onClick={() => setClientScreen('exploration')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                clientScreen === 'exploration'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Exploration
            </button>
            <button
              onClick={() => setClientScreen('tiers')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                clientScreen === 'tiers'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Tier Plan
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-md">
            <button
              onClick={() => setAdminScreen('dashboard')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                adminScreen === 'dashboard'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setAdminScreen('users')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                adminScreen === 'users'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setAdminScreen('models')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                adminScreen === 'models'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Models
            </button>
            <button
              onClick={() => setAdminScreen('subscriptions')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                adminScreen === 'subscriptions'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setAdminScreen('analytics')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                adminScreen === 'analytics'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Reports
            </button>
          </div>
        )}
      </div>

      {/* Zone 3: Controls (Auth Buttons, Wireframe Toggle, Theme Toggle, Mode Switcher) */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Auth State Button */}
        {authSession ? (
          <div className="flex items-center gap-2 border-r border-neutral-200 dark:border-neutral-800 pr-2.5">
            <div className="flex items-center gap-2 text-xs">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  authSession.portal === 'admin'
                    ? 'bg-amber-600 text-white'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                }`}
              >
                {authSession.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-semibold text-[11px] leading-tight truncate max-w-[120px]">
                  {authSession.name}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {authSession.portal === 'admin' ? 'Admin Portal' : 'Researcher'}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 text-neutral-400 hover:text-rose-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 border-r border-neutral-200 dark:border-neutral-800 pr-2.5">
            <button
              onClick={() => onOpenAuth(appMode, 'login')}
              className="px-2.5 py-1 text-xs font-medium rounded border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenAuth(appMode, 'signup')}
              className="px-2.5 py-1 text-xs font-medium rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}

        {/* HTML, CSS, JS Code Viewer Button */}
        <button
          onClick={onOpenCodeModal}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 font-semibold transition-colors"
          title="View & Download standalone HTML, CSS, and JS Validation code"
        >
          <Code className="w-3.5 h-3.5 text-emerald-600" />
          <span>HTML/CSS/JS Source</span>
        </button>

        {/* Wireframe Style Toggle */}
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-colors ${
            wireframeMode
              ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
          }`}
          title="Toggle blueprint outline style"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Blueprint Mode</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-1.5 rounded border transition-colors ${
            wireframeMode
              ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-100'
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
          }`}
          title="Toggle light/dark theme"
        >
          {darkMode ? (
            <Sun className="w-3.5 h-3.5" />
          ) : (
            <Moon className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Mode Switcher */}
        <button
          onClick={() => setAppMode(appMode === 'client' ? 'admin' : 'client')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded transition-colors ${
            wireframeMode
              ? 'border border-neutral-900 bg-neutral-100 hover:bg-neutral-200 font-medium'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100'
          }`}
        >
          <ArrowRightLeft className="w-3 h-3" />
          <span>{appMode === 'client' ? 'Admin Portal' : 'User Portal'}</span>
        </button>
      </div>
    </header>
  );
};
