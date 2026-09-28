import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Scale
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { ScenarioType } from '../types';

export const DetectionCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentScenarioId, setSelectedCaseId } = useInvestigation();

  const handleLaunchScenario = (scId: ScenarioType, caseId: string) => {
    setCurrentScenarioId(scId);
    setSelectedCaseId(caseId);
    navigate(`/investigations/${caseId}`);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Detection Center
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Configured detection engines for cyclical fund flow, pass-through conduits, structuring, and commercial behavior filtering.
        </p>
      </div>

      {/* SECTION 1: CIRCULAR FLOW DETECTION */}
      <div className="bg-white rounded-card border border-border shadow-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-text-primary">
                Circular Flow Detection
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-risk-subtle text-risk border border-risk-border">
                12 active loops
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Identifies fund-flow cycles that depart from and return to the originating or affiliated accounts.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-c-circular', 'FG-2026-001')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 self-start"
          >
            Inspect network #1042 →
          </button>
        </div>

        {/* Directed Cycle Structure */}
        <div className="bg-surface-secondary rounded p-4 border border-border space-y-3">
          <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Detected Cycle Topology: A → B → C → D → A
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-1 rounded bg-white border border-border font-semibold text-text-primary">
              ACC-1042 (HDFC)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-text-primary">
              ACC-1043 (ICICI)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-text-primary">
              ACC-1044 (Axis)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-text-primary">
              ACC-1045 (SBI)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-risk-subtle border border-risk-border font-semibold text-risk">
              ACC-1042 (Returned)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-border text-xs">
            <div>
              <span className="text-text-muted text-[11px] block">Cycle length</span>
              <span className="font-semibold text-text-primary">4 accounts</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Cycle duration</span>
              <span className="font-semibold text-warning">41 minutes</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Amount similarity</span>
              <span className="font-semibold text-success">94.3% retained</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Repeated occurrences</span>
              <span className="font-semibold text-risk">3 sequences</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RAPID PASS-THROUGH DETECTION */}
      <div className="bg-white rounded-card border border-border shadow-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-text-primary">
                Rapid Pass-through Detection
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                27 active chains
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Identifies funds moving through multiple intermediary accounts within unusually brief holding windows.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-b-rapid', 'FG-2026-002')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 self-start"
          >
            Inspect mule chain #2041 →
          </button>
        </div>

        <div className="bg-surface-secondary rounded p-4 border border-border space-y-3">
          <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Detected Chain Topology: A → B → C → D → E
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-text-primary">
              Origin (ACC-2001)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-risk">
              Intermediary 1 (ACC-2002)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-risk">
              Intermediary 2 (ACC-2003)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-medium text-risk">
              Intermediary 3 (ACC-2004)
            </span>
            <span className="text-text-muted">→</span>
            <span className="px-2 py-1 rounded bg-white border border-border font-semibold text-text-primary">
              Terminal Sink (ACC-2005)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2 border-t border-border text-xs">
            <div>
              <span className="text-text-muted text-[11px] block">Total duration</span>
              <span className="font-semibold text-warning">16m 28s</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Average holding time</span>
              <span className="font-semibold text-risk">5.6 min / hop</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Number of intermediaries</span>
              <span className="font-semibold text-text-primary">3 accounts</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Flow amount</span>
              <span className="font-semibold text-text-primary font-mono-numbers">₹14.50L</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Pass-through ratio</span>
              <span className="font-semibold text-text-primary">98.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SMURFING DETECTION */}
      <div className="bg-white rounded-card border border-border shadow-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-text-primary">
                Smurfing Detection
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                18 active clusters
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Identifies multiple structured transfers just below statutory reporting limits aggregating into a collector account.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-d-smurfing', 'FG-2026-003')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 self-start"
          >
            Inspect cluster #3088 →
          </button>
        </div>

        <div className="bg-surface-secondary rounded p-4 border border-border space-y-3">
          <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            Detected Cluster Flow: Source Mules ↓ Multiple Sub-₹50k Transfers ↓ Aggregator Sink
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-1 text-xs">
            <div>
              <span className="text-text-muted text-[11px] block">Number of transactions</span>
              <span className="font-semibold text-text-primary">12 transfers</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Aggregate value</span>
              <span className="font-semibold text-text-primary font-mono-numbers">₹8.42 Lakh</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Time window</span>
              <span className="font-semibold text-warning">1h 40m</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Amount distribution</span>
              <span className="font-semibold text-text-primary font-mono-numbers">₹48k – ₹49.8k</span>
            </div>
            <div>
              <span className="text-text-muted text-[11px] block">Connected recipients</span>
              <span className="font-semibold text-text-primary">1 Bullion Entity</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: LEGITIMATE HIGH-VOLUME FILTER (BEHAVIOR CLASSIFICATION) */}
      <div className="bg-white rounded-card border-2 border-border shadow-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-text-primary">
                Behavior Classification: High Transaction Volume
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-success-subtle text-success border border-success-border">
                Legitimate Commerce Filter
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Distinguishes high-volume legitimate commercial accounts from coordinated financial crime networks.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-a-legitimate', 'FG-2026-004')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 self-start"
          >
            Inspect commercial exemption →
          </button>
        </div>

        {/* Side-by-Side Comparison Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Normal Business Activity */}
          <div className="border border-success-border rounded p-4 bg-success-subtle/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-success uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                NORMAL BUSINESS ACTIVITY
              </span>
              <span className="text-[11px] text-success font-medium bg-white px-2 py-0.5 rounded border border-success-border">
                Risk Score: 14/100
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Example: Apex Wholesale Logistics (₹34.2 Cr). High volume is reconciled against commercial baseline:
            </p>
            <ul className="space-y-2 text-xs text-text-primary">
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">✓</span>
                <span><strong>Stable counterparties:</strong> Recurring bilateral trade relationships with verified retail partners.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">✓</span>
                <span><strong>Repeated commercial relationships:</strong> Documented invoice settlement cycles over 36 months.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">✓</span>
                <span><strong>Regular timing:</strong> Predictable settlement intervals aligning with standard 14 to 30-day payment terms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">✓</span>
                <span><strong>Consistent transaction behavior:</strong> Predictable day-of-week cadence during business hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">✓</span>
                <span><strong>Normal transaction distribution:</strong> Variable order sizes matching physical inventory supply.</span>
              </li>
            </ul>
          </div>

          {/* Suspicious Network Activity */}
          <div className="border border-risk-border rounded p-4 bg-risk-subtle/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-risk uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-risk" />
                SUSPICIOUS NETWORK ACTIVITY
              </span>
              <span className="text-[11px] text-risk font-medium bg-white px-2 py-0.5 rounded border border-risk-border">
                Risk Score: 94/100
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Example: Global Horizon Trading Network (₹2.84 Cr). Flagged due to coordinated structural anomalies:
            </p>
            <ul className="space-y-2 text-xs text-text-primary">
              <li className="flex items-start gap-2">
                <span className="text-risk font-bold">✕</span>
                <span><strong>Unusual counterparties:</strong> Newly incorporated shell entities with no physical footprint.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-risk font-bold">✕</span>
                <span><strong>Rapid movement:</strong> Intermediary holding durations under 8 minutes across banking hops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-risk font-bold">✕</span>
                <span><strong>Circular relationships:</strong> Directed graph loops returning 94%+ of funds to the originator.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-risk font-bold">✕</span>
                <span><strong>Temporal clustering:</strong> Off-market execution within coordinated micro-windows.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-risk font-bold">✕</span>
                <span><strong>Repeated flow patterns:</strong> Exact multi-hop sequences recurring across discrete intervals.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
