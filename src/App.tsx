import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InvestigationProvider, useInvestigation } from './context/InvestigationContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { InvestigationsPage } from './pages/InvestigationsPage';
import { NetworkInvestigationWorkspacePage } from './pages/NetworkInvestigationWorkspacePage';
import { DetectionCenterPage } from './pages/DetectionCenterPage';
import { TimelinePage } from './pages/TimelinePage';
import { AlertsPage } from './pages/AlertsPage';
import { CasesPage } from './pages/CasesPage';
import { ReportsPage } from './pages/ReportsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { InstitutionsPage } from './pages/InstitutionsPage';
import { EvidencePage } from './pages/EvidencePage';
import { FundFlowPage } from './pages/FundFlowPage';
import { TransactionExplorerPage } from './pages/TransactionExplorerPage';
import { AccountClustersPage } from './pages/AccountClustersPage';
import { EntityIntelligencePage } from './pages/EntityIntelligencePage';
import { SettingsPage } from './pages/SettingsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useInvestigation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useInvestigation();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication Navigation (Public) */}
      <Route path="/login" element={<PublicRoute><LoginPage initialView="sign-in" /></PublicRoute>} />
      <Route path="/auth" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/auth/sign-in" element={<PublicRoute><LoginPage initialView="sign-in" /></PublicRoute>} />
      <Route path="/auth/request-access" element={<PublicRoute><LoginPage initialView="request-access" /></PublicRoute>} />
      <Route path="/auth/forgot-password" element={<PublicRoute><LoginPage initialView="forgot-password" /></PublicRoute>} />
      <Route path="/auth/verify" element={<PublicRoute><LoginPage initialView="verify" /></PublicRoute>} />
      <Route path="/auth/pending-approval" element={<PublicRoute><LoginPage initialView="admin-approval" /></PublicRoute>} />
      <Route path="/auth/sso" element={<PublicRoute><LoginPage initialView="sso-flow" /></PublicRoute>} />

      {/* Protected Enterprise Workspace Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* WORKSPACE */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="investigations" element={<InvestigationsPage />} />
        <Route path="investigations/:id" element={<NetworkInvestigationWorkspacePage />} />
        <Route path="graph" element={<Navigate to="/investigations/INV-2026-0173" replace />} />
        <Route path="transactions" element={<TransactionExplorerPage />} />
        <Route path="alerts" element={<AlertsPage />} />

        {/* FORENSIC ANALYSIS */}
        <Route path="detection" element={<DetectionCenterPage />} />
        <Route path="patterns" element={<DetectionCenterPage />} />
        <Route path="temporal" element={<TimelinePage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="fund-flow" element={<FundFlowPage />} />
        <Route path="account-clusters" element={<AccountClustersPage />} />
        <Route path="entity-intelligence" element={<EntityIntelligencePage />} />

        {/* CASE MANAGEMENT */}
        <Route path="cases" element={<CasesPage />} />
        <Route path="evidence" element={<EvidencePage />} />
        <Route path="reports" element={<ReportsPage />} />

        {/* SYSTEM */}
        <Route path="data-sources" element={<DataSourcesPage />} />
        <Route path="institutions" element={<InstitutionsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <InvestigationProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </InvestigationProvider>
  );
}

export default App;
