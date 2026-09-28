import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvestigation } from '../context/InvestigationContext';
import { InvestigationLeftSidebar } from '../components/investigation/InvestigationLeftSidebar';
import { NetworkGraphView } from '../components/network/NetworkGraphView';
import { EntityAndWhyFlaggedPanel } from '../components/investigation/EntityAndWhyFlaggedPanel';
import { TransactionTimelineScrubber } from '../components/investigation/TransactionTimelineScrubber';
import { Save, FileCheck, FileText, Check } from 'lucide-react';

export const NetworkInvestigationWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cases, setSelectedCaseId, setCurrentScenarioId, currentCase, addNote } = useInvestigation();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setSelectedCaseId(id);
      const match = cases.find(c => c.id === id);
      if (match) {
        setCurrentScenarioId(match.scenarioType);
      }
    }
  }, [id, cases, setSelectedCaseId, setCurrentScenarioId]);

  const handleSave = () => {
    addNote('Workspace state saved by investigator.');
    setSaveStatus('Investigation saved');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleAddEvidence = () => {
    addNote('Topological graph snapshot recorded to formal case ledger.');
    setSaveStatus('Evidence snapshot recorded');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] w-full overflow-hidden select-none bg-page">
      {/* Workspace Context Header Bar */}
      <div className="h-12 bg-white border-b border-border px-5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-brand bg-brand-subtle px-2 py-0.5 rounded border border-brand/20">
            {currentCase.id}
          </span>
          <h1 className="text-sm font-semibold text-text-primary">
            {currentCase.title}
          </h1>
          <span className="text-xs text-text-muted">•</span>
          <span className="text-xs font-medium text-warning bg-warning-subtle px-2 py-0.5 rounded border border-warning-border">
            Status: {currentCase.status}
          </span>
        </div>

        {/* Header Actions: Save, Add evidence, Generate report */}
        <div className="flex items-center gap-2 text-xs">
          {saveStatus && (
            <span className="text-success text-xs font-medium flex items-center gap-1 mr-2">
              <Check className="w-3.5 h-3.5" />
              {saveStatus}
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded border border-border hover:bg-surface-secondary text-text-primary font-medium transition"
          >
            Save
          </button>

          <button
            onClick={handleAddEvidence}
            className="px-3 py-1.5 rounded border border-border hover:bg-surface-secondary text-text-primary font-medium transition"
          >
            Add evidence
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="px-3 py-1.5 rounded bg-brand hover:bg-brand-hover text-white font-medium shadow-sm transition"
          >
            Generate report
          </button>
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Left Column: Filters */}
        <InvestigationLeftSidebar />

        {/* Center Column: Interactive Graph */}
        <div className="flex-1 relative h-full min-w-0">
          <NetworkGraphView />
        </div>

        {/* Right Column: Entity Details & Why Flagged */}
        <EntityAndWhyFlaggedPanel />
      </div>

      {/* Bottom Area: Transaction Timeline */}
      <TransactionTimelineScrubber />
    </div>
  );
};
