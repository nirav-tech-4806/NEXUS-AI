import React from 'react';
import {
  AppMode,
  ClientScreen,
  AdminScreen,
  AuthSession,
} from '../../types/nexus.ts';
import {
  Network,
  GitBranch,
  Boxes,
  Compass,
  CreditCard,
  LayoutDashboard,
  Users as UsersIcon,
  Cpu,
  BarChart3,
  HelpCircle,
  FolderGit2,
  BookOpen,
  Settings as SettingsIcon,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  LogIn,
  UserPlus,
  Code,
} from 'lucide-react';

interface SidebarProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  clientScreen: ClientScreen;
  setClientScreen: (screen: ClientScreen) => void;
  adminScreen: AdminScreen;
  setAdminScreen: (screen: AdminScreen) => void;
  wireframeMode: boolean;
  authSession: AuthSession | null;
  onOpenAuth: (portal: AppMode, mode: 'login' | 'signup') => void;
  onOpenCodeModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  appMode,
  setAppMode,
  clientScreen,
  setClientScreen,
  adminScreen,
  setAdminScreen,
  wireframeMode,
  authSession,
  onOpenAuth,
  onOpenCodeModal,
}) => {
  return (
    <aside
      className={`w-64 shrink-0 flex flex-col border-r transition-colors duration-150 select-none ${
        wireframeMode
          ? 'bg-white border-neutral-900 text-neutral-900'
          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200'
      }`}
    >
      {/* Brand Header */}
      <div
        className={`px-6 py-5 border-b flex items-center justify-between ${
          wireframeMode
            ? 'border-neutral-900'
            : 'border-neutral-200 dark:border-neutral-800'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            {appMode === 'client' ? (
              <div
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-neutral-900 text-white'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                }`}
              >
                N
              </div>
            ) : (
              <div
                className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                  wireframeMode
                    ? 'border border-neutral-900 bg-neutral-100 text-neutral-900'
                    : 'bg-amber-600 text-white'
                }`}
              >
                A
              </div>
            )}
            <h1
              className={`font-bold tracking-tight text-base uppercase ${
                wireframeMode ? 'font-mono' : 'tracking-wide'
              }`}
            >
              {appMode === 'client' ? 'NEXUS AI' : 'ADMIN CONTROL'}
            </h1>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
            {appMode === 'client'
              ? 'Research Workspace'
              : 'Governance & Telemetry'}
          </p>
        </div>

        {wireframeMode && (
          <span className="text-[9px] font-mono px-1 py-0.5 border border-neutral-900 uppercase">
            Outline
          </span>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {appMode === 'client' ? (
          <>
            {/* Primary Screens */}
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Research Views
              </div>

              <button
                onClick={() => setClientScreen('landscape')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  clientScreen === 'landscape'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Network className="w-4 h-4 shrink-0" />
                  <span>Landscape</span>
                </div>
              </button>

              <button
                onClick={() => setClientScreen('thread')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  clientScreen === 'thread'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <GitBranch className="w-4 h-4 shrink-0" />
                  <span>Evolving Thread</span>
                </div>
              </button>

              <button
                onClick={() => setClientScreen('systems')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  clientScreen === 'systems'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="w-4 h-4 shrink-0" />
                  <span>Connected Systems</span>
                </div>
              </button>

              <button
                onClick={() => setClientScreen('exploration')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  clientScreen === 'exploration'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>Exploration</span>
                </div>
              </button>

              <button
                onClick={() => setClientScreen('tiers')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  clientScreen === 'tiers'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Tier Plan</span>
                </div>
              </button>
            </div>

            {/* Workspace Sub-Group */}
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Workspace
              </div>

              <button
                onClick={() => setClientScreen('landscape')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setClientScreen('systems')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Projects</span>
              </button>

              <button
                onClick={() => setClientScreen('exploration')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Research</span>
              </button>

              <button
                onClick={() => setClientScreen('tiers')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <SettingsIcon className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            </div>

            {/* Auth Portal Link */}
            <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="px-3 pb-1 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Authentication
              </div>
              <button
                onClick={() => onOpenAuth('client', 'login')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Researcher Login</span>
              </button>
              <button
                onClick={() => onOpenAuth('client', 'signup')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Register Account</span>
              </button>
              <button
                onClick={onOpenCodeModal}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded font-semibold transition-colors"
              >
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>HTML, CSS & JS Code</span>
              </button>
            </div>
          </>
        ) : (
          /* Admin Navigation */
          <>
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Governance
              </div>

              <button
                onClick={() => setAdminScreen('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'dashboard'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setAdminScreen('users')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'users'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UsersIcon className="w-4 h-4 shrink-0" />
                  <span>Users</span>
                </div>
              </button>

              <button
                onClick={() => setAdminScreen('models')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'models'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 shrink-0" />
                  <span>Neural Models</span>
                </div>
              </button>

              <button
                onClick={() => setAdminScreen('subscriptions')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'subscriptions'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Subscriptions</span>
                </div>
              </button>

              <button
                onClick={() => setAdminScreen('analytics')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'analytics'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  <span>Reports</span>
                </div>
              </button>

              <button
                onClick={() => setAdminScreen('support')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded transition-colors ${
                  adminScreen === 'support'
                    ? wireframeMode
                      ? 'bg-neutral-900 text-white font-medium'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>Support</span>
                </div>
              </button>
            </div>

            {/* Admin Auth Portal Link */}
            <div className="space-y-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <div className="px-3 pb-1 text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Admin Authentication
              </div>
              <button
                onClick={() => onOpenAuth('admin', 'login')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Login</span>
              </button>
              <button
                onClick={() => onOpenAuth('admin', 'signup')}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-600" />
                <span>Register Admin</span>
              </button>
              <button
                onClick={onOpenCodeModal}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded font-semibold transition-colors"
              >
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>HTML, CSS & JS Code</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer Profile & Role Switcher */}
      <div
        className={`p-3 border-t ${
          wireframeMode
            ? 'border-neutral-900 bg-neutral-50'
            : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50'
        }`}
      >
        <button
          onClick={() => setAppMode(appMode === 'client' ? 'admin' : 'client')}
          className={`w-full flex items-center justify-between p-2.5 rounded border text-xs transition-all ${
            wireframeMode
              ? 'border-neutral-900 bg-white hover:bg-neutral-100 font-mono'
              : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-xs'
          }`}
          title="Switch between User Research Workspace and Admin Control"
        >
          <div className="flex items-center gap-2">
            {appMode === 'client' ? (
              <UserCheck className="w-4 h-4 text-emerald-600" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-amber-600" />
            )}
            <div className="text-left">
              <div className="font-semibold leading-none">
                {appMode === 'client' ? 'User / Admin' : 'System Admin'}
              </div>
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                {appMode === 'client'
                  ? 'Switch to Admin Control'
                  : 'Switch to User Workspace'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>
    </aside>
  );
};
