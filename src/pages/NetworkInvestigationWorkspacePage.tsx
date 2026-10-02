import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvestigation } from '../context/InvestigationContext';
import { InvestigationLeftSidebar } from '../components/investigation/InvestigationLeftSidebar';
import { NetworkGraphView } from '../components/network/NetworkGraphView';
import { EntityAndWhyFlaggedPanel } from '../components/investigation/EntityAndWhyFlaggedPanel';
import { TransactionTimelineScrubber } from '../components/investigation/TransactionTimelineScrubber';
import { Save, FileCheck, FileText, Check, ShieldCheck, ArrowRight } from 'lucide-react';

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
    setSaveStatus('Evidence recorded');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] w-full overflow-hidden select-none bg-[#0C1019] font-sans">
      {/* Neumorphic Workspace Context Header Bar */}
      <div className="bg-[#0E131E] border-b border-white/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.5)] px-5 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 flex-shrink-0 z-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-xs font-extrabold text-blue-400 neu-inset-sm px-2.5 py-1 rounded-lg border border-blue-500/30">
            CASE #{currentCase.id}
          </span>
          <h1 className="text-xs sm:text-sm font-bold text-white tracking-tight">
            {currentCase.title}
          </h1>
          <span className="text-slate-600">•</span>
          <span className="text-[10px] font-mono font-bold text-red-400 neu-pill px-2.5 py-0.5 border border-red-500/30 bg-red-500/10">
            Risk Level: HIGH / CRITICAL
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-[10px] font-mono font-semibold text-amber-400 neu-pill px-2.5 py-0.5 border border-amber-500/30">
            Pattern: Circular + Rapid Pass-Through
          </span>
        </div>

        {/* Header Actions: Neumorphic buttons */}
        <div className="flex items-center gap-2 text-xs">
          {saveStatus && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5 mr-2 animate-pulse font-mono">
              <Check className="w-3.5 h-3.5" />
              {saveStatus}
            </span>
          )}

          <button
            onClick={handleSave}
            className="neu-btn px-3 py-1.5 rounded-xl text-slate-200 hover:text-white font-medium transition cursor-pointer"
          >
            Save State
          </button>

          <button
            onClick={handleAddEvidence}
            className="neu-btn px-3 py-1.5 rounded-xl text-slate-200 hover:text-white font-medium transition cursor-pointer"
          >
            Add Evidence
          </button>

          <button
            onClick={() => navigate('/reports')}
            className="neu-btn-primary px-3.5 py-1.5 rounded-xl text-white font-semibold transition cursor-pointer flex items-center gap-1.5"
          >
            <span>Generate Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Case Quick Metadata Bar (Requirement 9) */}
      <div className="bg-[#0A0D15] border-b border-white/[0.04] px-5 py-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] font-mono text-slate-400">
        <div>Amount: <strong className="text-white">₹4.82 Cr</strong></div>
        <span className="text-slate-700">•</span>
        <div>Accounts: <strong className="text-cyan-400">27</strong></div>
        <span className="text-slate-700">•</span>
        <div>Institutions: <strong className="text-blue-400">5 Banks</strong></div>
        <span className="text-slate-700">•</span>
        <div>Transactions: <strong className="text-white">184</strong></div>
        <span className="text-slate-700">•</span>
        <div>Time Window: <strong className="text-amber-400">18 Sep – 22 Sep 2026</strong></div>
        <span className="text-slate-700">•</span>
        <div>Lead Institution: <strong className="text-slate-200">{currentCase.leadInstitution}</strong></div>
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

export default NetworkInvestigationWorkspacePage;
