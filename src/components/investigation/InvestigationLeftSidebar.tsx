import React from 'react';
import { 
  Filter, 
  Search, 
  Calendar, 
  Building2, 
  Check,
  ChevronDown,
  Layers
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
    { id: 'full', label: 'Full Topology', desc: 'All entities & transactions' },
    { id: 'suspicious_only', label: 'Suspicious Only', desc: 'Entities with risk score ≥ 70' },
    { id: 'circular_paths', label: 'Circular Loops', desc: 'Closed fund-flow cycles' },
    { id: 'rapid_flow', label: 'Rapid Flow', desc: 'Holding duration ≤ 10 min' },
    { id: 'smurfing_cluster', label: 'Smurfing Cluster', desc: 'Sub-threshold fan-in' },
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
    <div className="w-[264px] h-full bg-[#0E131E] border-r border-white/[0.06] shadow-[4px_0_16px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto select-none p-4 space-y-4 text-xs">
      {/* Title */}
      <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Filter className="w-3 h-3 text-blue-400" />
          Topology Filters
        </h3>
        <span className="text-[10px] font-mono text-blue-400">{scenario.accounts.length} Nodes</span>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-300 block">
          Surveillance Window
        </label>
        <div className="flex items-center gap-2 p-2 rounded-xl neu-inset-sm text-slate-200 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          <span>22 Sep – 28 Sep 2026</span>
        </div>
      </div>

      {/* Institution Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-300 block">
          Clearing Institution
        </label>
        <select
          value={filterInstitution}
          onChange={(e) => setFilterInstitution(e.target.value)}
          className="neu-input w-full px-3 py-2 rounded-xl text-xs text-slate-200 cursor-pointer"
        >
          {institutions.map(inst => (
            <option key={inst} value={inst} className="bg-[#141A28] text-white">
              {inst === 'all' ? 'All Institutions' : inst}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction Amount Filter */}
      <div className="space-y-1.5 neu-card p-3">
        <div className="flex items-center justify-between text-[11px]">
          <label className="font-semibold text-slate-300">Min Transaction Value</label>
          <span className="font-mono text-blue-400 font-bold">
            {minAmountFilter === 0 ? 'All Values' : `≥ ₹${(minAmountFilter / 1000).toLocaleString('en-IN')}k`}
          </span>
        </div>
        <div className="neu-inset-sm p-1 rounded-lg">
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={minAmountFilter}
            onChange={(e) => setMinAmountFilter(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer h-1.5 bg-transparent"
          />
        </div>
      </div>

      {/* Transaction Type Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-300 block">
          Settlement Channel
        </label>
        <select
          className="neu-input w-full px-3 py-2 rounded-xl text-xs text-slate-200 cursor-pointer"
        >
          <option value="all">All Channels (RTGS, NEFT, IMPS)</option>
          <option value="rtgs">RTGS Real-Time Gross</option>
          <option value="imps">IMPS Instant Payment</option>
          <option value="neft">NEFT Standard Batch</option>
        </select>
      </div>

      {/* Risk Level Filter */}
      <div className="space-y-1">
        <label className="text-[11px] font-semibold text-slate-300 block">
          Minimum Risk Score
        </label>
        <select
          className="neu-input w-full px-3 py-2 rounded-xl text-xs text-slate-200 cursor-pointer"
        >
          <option value="all">All Classifications</option>
          <option value="critical">Critical Risk (≥ 85)</option>
          <option value="high">High Risk (≥ 70)</option>
          <option value="medium">Medium Flagged (≥ 50)</option>
          <option value="normal">Normal Monitored (&lt; 50)</option>
        </select>
      </div>

      {/* Graph Display Modes with Neumorphic buttons */}
      <div className="pt-2 border-t border-white/[0.06] space-y-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-cyan-400" />
          Graph Projection Mode
        </div>
        <div className="space-y-1.5">
          {graphModes.map((m) => {
            const isActive = graphMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setGraphMode(m.id)}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'neu-inset border border-blue-500/40 text-blue-400 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7)] font-semibold'
                    : 'neu-btn text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{m.label}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-normal">
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

export default InvestigationLeftSidebar;
