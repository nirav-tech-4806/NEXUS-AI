/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppMode, ClientScreen, AdminScreen, AuthSession } from './types/nexus.ts';
import { Sidebar } from './components/layout/Sidebar.tsx';
import { Header } from './components/layout/Header.tsx';
import { LandscapeView } from './components/client/LandscapeView.tsx';
import { EvolvingThreadView } from './components/client/EvolvingThreadView.tsx';
import { ConnectedSystemsView } from './components/client/ConnectedSystemsView.tsx';
import { ExplorationView } from './components/client/ExplorationView.tsx';
import { TierPlanView } from './components/client/TierPlanView.tsx';
import { AdminDashboardView } from './components/admin/AdminDashboardView.tsx';
import { UsersView } from './components/admin/UsersView.tsx';
import { NeuralModelsView } from './components/admin/NeuralModelsView.tsx';
import { SubscriptionsView } from './components/admin/SubscriptionsView.tsx';
import { AnalyticsWorkspaceView } from './components/admin/AnalyticsWorkspaceView.tsx';
import { SupportView } from './components/common/SupportView.tsx';
import { AuthPage } from './components/auth/AuthPage.tsx';
import { CodeSubmissionModal } from './components/common/CodeSubmissionModal.tsx';

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('client');
  const [clientScreen, setClientScreen] = useState<ClientScreen>('landscape');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('dashboard');
  const [selectedThreadTopic, setSelectedThreadTopic] = useState<string>('quantum-cognition');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  // Authentication State
  const [showAuthPage, setShowAuthPage] = useState<boolean>(false);
  const [authPortal, setAuthPortal] = useState<AppMode>('client');
  const [authFormMode, setAuthFormMode] = useState<'login' | 'signup'>('login');
  const [authSession, setAuthSession] = useState<AuthSession | null>({
    isAuthenticated: true,
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@nexus.ai',
    phone: '+1 (555) 234-5678',
    role: 'Principal Investigator',
    portal: 'client',
    plan: 'PROFESSIONAL',
  });

  // Sync dark class with document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenThoughtStream = (topicId: string) => {
    setSelectedThreadTopic(topicId);
    setAppMode('client');
    setClientScreen('thread');
  };

  const handleOpenAuth = (portal: AppMode, mode: 'login' | 'signup') => {
    setAuthPortal(portal);
    setAuthFormMode(mode);
    setShowAuthPage(true);
  };

  const handleLoginSuccess = (session: AuthSession) => {
    setAuthSession(session);
    setAppMode(session.portal);
    setShowAuthPage(false);
  };

  const handleLogout = () => {
    setAuthSession(null);
    setAuthPortal(appMode);
    setAuthFormMode('login');
    setShowAuthPage(true);
  };

  // If Auth Page is active, render the dedicated Login / Signup experience
  if (showAuthPage) {
    return (
      <AuthPage
        initialPortal={authPortal}
        initialMode={authFormMode}
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setShowAuthPage(false)}
        wireframeMode={wireframeMode}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-150 ${
        wireframeMode
          ? 'bg-neutral-100 text-neutral-900'
          : 'bg-neutral-100/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100'
      }`}
    >
      {/* Main Viewport Container */}
      <div className="flex-1 flex overflow-hidden h-screen">
        {/* Left Sidebar */}
        <Sidebar
          appMode={appMode}
          setAppMode={setAppMode}
          clientScreen={clientScreen}
          setClientScreen={setClientScreen}
          adminScreen={adminScreen}
          setAdminScreen={setAdminScreen}
          wireframeMode={wireframeMode}
          authSession={authSession}
          onOpenAuth={handleOpenAuth}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
        />

        {/* Right Workspace Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <Header
            appMode={appMode}
            setAppMode={setAppMode}
            clientScreen={clientScreen}
            setClientScreen={setClientScreen}
            adminScreen={adminScreen}
            setAdminScreen={setAdminScreen}
            wireframeMode={wireframeMode}
            setWireframeMode={setWireframeMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            authSession={authSession}
            onOpenAuth={handleOpenAuth}
            onLogout={handleLogout}
            onOpenCodeModal={() => setIsCodeModalOpen(true)}
          />

          {/* Active View Router */}
          <main className="flex-1 flex flex-col overflow-hidden relative">
            {appMode === 'client' ? (
              <>
                {clientScreen === 'landscape' && (
                  <LandscapeView
                    onOpenThoughtStream={handleOpenThoughtStream}
                    wireframeMode={wireframeMode}
                  />
                )}
                {clientScreen === 'thread' && (
                  <EvolvingThreadView
                    initialStreamId={selectedThreadTopic}
                    wireframeMode={wireframeMode}
                  />
                )}
                {clientScreen === 'systems' && (
                  <ConnectedSystemsView
                    wireframeMode={wireframeMode}
                    onNavigateToProjects={() => setClientScreen('exploration')}
                  />
                )}
                {clientScreen === 'exploration' && (
                  <ExplorationView wireframeMode={wireframeMode} />
                )}
                {clientScreen === 'tiers' && (
                  <TierPlanView wireframeMode={wireframeMode} />
                )}
                {/* Secondary mapped items */}
                {clientScreen === 'overview' && (
                  <LandscapeView
                    onOpenThoughtStream={handleOpenThoughtStream}
                    wireframeMode={wireframeMode}
                  />
                )}
                {clientScreen === 'projects' && (
                  <ConnectedSystemsView
                    wireframeMode={wireframeMode}
                    onNavigateToProjects={() => setClientScreen('exploration')}
                  />
                )}
                {clientScreen === 'research' && (
                  <ExplorationView wireframeMode={wireframeMode} />
                )}
                {clientScreen === 'settings' && (
                  <TierPlanView wireframeMode={wireframeMode} />
                )}
              </>
            ) : (
              <>
                {adminScreen === 'dashboard' && (
                  <AdminDashboardView wireframeMode={wireframeMode} />
                )}
                {adminScreen === 'users' && (
                  <UsersView wireframeMode={wireframeMode} />
                )}
                {adminScreen === 'models' && (
                  <NeuralModelsView wireframeMode={wireframeMode} />
                )}
                {adminScreen === 'subscriptions' && (
                  <SubscriptionsView wireframeMode={wireframeMode} />
                )}
                {adminScreen === 'analytics' && (
                  <AnalyticsWorkspaceView wireframeMode={wireframeMode} />
                )}
                {adminScreen === 'support' && (
                  <SupportView wireframeMode={wireframeMode} />
                )}
              </>
            )}
          </main>

          {/* Clean Bottom Project Information Footer without fig numbers */}
          <footer
            className={`px-6 py-2 border-t flex items-center justify-between text-[11px] select-none ${
              wireframeMode
                ? 'bg-white border-neutral-900 text-neutral-600 font-mono'
                : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                NEXUS AI
              </span>
              <span>—</span>
              <span>Intelligent Research Workspace & Admin Control</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Web Technology Platform</span>
              <span>·</span>
              <span className="font-mono">Nirav Nimavat (92610103001)</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Standalone HTML, CSS & JavaScript Code Viewer Modal */}
      <CodeSubmissionModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        wireframeMode={wireframeMode}
      />
    </div>
  );
}
