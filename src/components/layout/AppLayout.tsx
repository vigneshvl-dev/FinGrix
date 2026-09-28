import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { InvestigatorAssistantDrawer } from '../assistant/InvestigatorAssistantDrawer';
import { GuidedTourModal } from '../demo/GuidedTourModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-page text-text-primary font-sans antialiased">
      {/* Enterprise Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dynamic Route Pages */}
        <main className="flex-1 overflow-y-auto bg-page relative">
          <Outlet />
        </main>
      </div>

      {/* Forensic Assistant Drawer */}
      <InvestigatorAssistantDrawer />

      {/* Guided Tour Modal */}
      <GuidedTourModal />
    </div>
  );
};
