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
      {/* Login Screen (Public) */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />

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
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="investigations" element={<InvestigationsPage />} />
        <Route path="investigations/:id" element={<NetworkInvestigationWorkspacePage />} />
        <Route path="detection" element={<DetectionCenterPage />} />
        <Route path="timeline" element={<TimelinePage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="reports" element={<ReportsPage />} />
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
