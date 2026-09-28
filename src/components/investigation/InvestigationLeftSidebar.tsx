import React from 'react';
import { 
  Filter, 
  Search, 
  Calendar, 
  Building2, 
  Check,
  ChevronDown
} from 'lucide-react';
import { useInvestigation, GraphMode } from '../../context/InvestigationContext';

export const InvestigationLeftSidebar: React.FC = () => {
  const { 
    scenario, 
    currentCase, 
    graphMode, 
    setGraphMode, 
    minAmountFilter, 
    setMinAmountFilter,
    filterInstitution,
    setFilterInstitution
  } = useInvestigation();

  const graphModes: { id: GraphMode; label: string; desc: string }[] = [
    { id: 'full', label: 'Full network', desc: 'All entities and connections' },
    { id: 'suspicious_only', label: 'Suspicious only', desc: 'Risk score ≥ 70' },
    { id: 'circular_paths', label: 'Circular paths', desc: 'Closed fund-flow loops' },
    { id: 'rapid_flow', label: 'Rapid flow', desc: 'Holding duration ≤ 10 min' },
    { id: 'smurfing_cluster', label: 'Smurfing cluster', desc: 'Sub-threshold fan-in' },
  ];

  const institutions = [
    'all',
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra',
    'Standard Chartered'
  ];

  return (
    <div className="w-[260px] h-full bg-white border-r border-border flex flex-col overflow-y-auto select-none p-4 space-y-4 text-xs">
      {/* Title */}
      <div>
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Investigation Filters
        </h3>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-text-secondary block">
          Date range
        </label>
        <div className="flex items-center gap-2 p-1.5 rounded border border-border bg-surface-secondary text-text-primary text-xs">
          <Calendar className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          <span>22 Sep – 28 Sep 2026</span>
        </div>
      </div>

      {/* Institution Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-text-secondary block">
          Institution
        </label>
        <select
          value={filterInstitution}
          onChange={(e) => setFilterInstitution(e.target.value)}
          className="w-full bg-white border border-border rounded px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:border-brand"
        >
          {institutions.map(inst => (
            <option key={inst} value={inst}>
              {inst === 'all' ? 'All institutions' : inst}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction Amount Filter */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-text-secondary">
          <label className="font-medium">Transaction amount</label>
          <span className="font-mono text-text-primary">
            {minAmountFilter === 0 ? 'All' : `≥ ₹${(minAmountFilter / 1000).toLocaleString('en-IN')}k`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={minAmountFilter}
          onChange={(e) => setMinAmountFilter(Number(e.target.value))}
          className="w-full accent-brand cursor-pointer h-1.5 bg-border rounded"
        />
      </div>

      {/* Transaction Type Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-text-secondary block">
          Transaction type
        </label>
        <select
          className="w-full bg-white border border-border rounded px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:border-brand"
        >
          <option value="all">All types (RTGS, NEFT, IMPS)</option>
          <option value="rtgs">RTGS</option>
          <option value="imps">IMPS</option>
          <option value="neft">NEFT</option>
        </select>
      </div>

      {/* Risk Level Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-medium text-text-secondary block">
          Risk level
        </label>
        <select
          className="w-full bg-white border border-border rounded px-2.5 py-1.5 text-xs text-text-primary focus:outline-none focus:border-brand"
        >
          <option value="all">All risk levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="normal">Normal</option>
        </select>
      </div>

      {/* Graph Display Modes */}
      <div className="pt-2 border-t border-border space-y-2">
        <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
          Graph Mode
        </div>
        <div className="space-y-1">
          {graphModes.map((m) => {
            const isActive = graphMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setGraphMode(m.id)}
                className={`w-full text-left p-2 rounded border text-xs transition ${
                  isActive
                    ? 'bg-brand-subtle border-brand text-brand font-medium'
                    : 'bg-white border-border text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{m.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-brand" />}
                </div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-normal">
                  {m.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
