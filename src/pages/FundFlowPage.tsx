import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  ArrowLeftRight, 
  Search, 
  Layers, 
  ShieldAlert, 
  Building2, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Filter,
  RefreshCw,
  Zap
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const FundFlowPage: React.FC = () => {
  const navigate = useNavigate();
  const { scenario, setSelectedAccount } = useInvestigation();

  const [selectedAccountId, setSelectedAccountId] = useState<string>('ACC-1042');
  const [traceDirection, setTraceDirection] = useState<'source' | 'destination' | 'both'>('both');
  const [traceDepth, setTraceDepth] = useState<number>(3);
  const [isExpanding, setIsExpanding] = useState<boolean>(false);
  const [expansionStep, setExpansionStep] = useState<number>(3);

  const activeAccount = scenario.accounts.find(a => a.id === selectedAccountId) || scenario.accounts[0];

  const handleRunTrace = (dir: 'source' | 'destination' | 'both') => {
    setTraceDirection(dir);
    setIsExpanding(true);
    setExpansionStep(1);

    setTimeout(() => setExpansionStep(2), 600);
    setTimeout(() => setExpansionStep(3), 1200);
    setTimeout(() => {
      setIsExpanding(false);
    }, 1800);
  };

  const handleLaunchInGraph = () => {
    setSelectedAccount(activeAccount);
    navigate('/investigations/INV-2026-0173');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>DIRECTIONAL FUND RECONSTRUCTION</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Fund Flow & Multi-Hop Tracer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Reconstruct upstream source origins and downstream beneficiary disbursement pathways with dynamic topological expansion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLaunchInGraph}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer shadow-sm transition"
          >
            <span>Open Graph Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Account Selector & Trace Controls */}
      <div className="neu-card p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl neu-raised flex items-center justify-center text-blue-400 font-mono font-bold text-sm shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
              {activeAccount.id.slice(-4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-blue-400">{activeAccount.id}</span>
                <span className="text-slate-500">•</span>
                <span className="font-bold text-white text-sm">{activeAccount.label}</span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {activeAccount.institution} • {activeAccount.ifscCode} • Balance: ₹{(activeAccount.balance / 1000).toFixed(0)}k
              </p>
            </div>
          </div>

          {/* Account Picker */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Select Entity:</span>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="neu-input px-3 py-1.5 rounded-xl text-slate-200 cursor-pointer font-mono"
            >
              {scenario.accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.id} — {acc.label.slice(0, 24)} ({acc.institution})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directional Action Buttons Matching Prompt */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">
              Trace Mode:
            </span>

            <button
              onClick={() => handleRunTrace('source')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                traceDirection === 'source'
                  ? 'neu-raised text-white border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                  : 'neu-btn text-slate-300 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
              <span>← Trace Source</span>
            </button>

            <button
              onClick={() => handleRunTrace('destination')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                traceDirection === 'destination'
                  ? 'neu-raised text-white border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                  : 'neu-btn text-slate-300 hover:text-white'
              }`}
            >
              <span>→ Trace Destination</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>

            <button
              onClick={() => handleRunTrace('both')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition ${
                traceDirection === 'both'
                  ? 'neu-raised text-white border border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                  : 'neu-btn text-slate-300 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
              <span>↔ Trace Both Directions</span>
            </button>
          </div>

          {/* Depth Controller */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Max Hops:</span>
            <div className="flex items-center gap-1 neu-inset p-1 rounded-xl">
              {[1, 2, 3, 4].map(d => (
                <button
                  key={d}
                  onClick={() => setTraceDepth(d)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    traceDepth === d
                      ? 'neu-raised text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Expansion Pipeline Flow (Exact Prompt Requirement 11) */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Dynamic Multi-Hop Expansion Result</span>
          </h2>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            {isExpanding ? (
              <span className="flex items-center gap-1 text-blue-400 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Expanding Topology...</span>
              </span>
            ) : (
              <span>Resolved 2 Suspicious Clusters</span>
            )}
          </div>
        </div>

        {/* Dynamic Step-by-Step Flow Cards matching prompt */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {/* Node 1: Origin */}
          <div className="neu-raised p-4 rounded-2xl border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-center space-y-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Target Entity</div>
            <div className="font-mono text-sm font-extrabold text-white">{activeAccount.id}</div>
            <div className="text-[10px] text-blue-400 truncate">{activeAccount.institution}</div>
            <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-white/[0.06]">
              Origin Anchor
            </div>
          </div>

          <div className="hidden md:flex justify-center text-slate-500">
            <ArrowRight className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>

          {/* Node 2: 3 Connected Accounts */}
          <div className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
            expansionStep >= 1 ? 'neu-card border-white/10 text-white' : 'neu-inset-sm opacity-40'
          }`}>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Layer (1-Hop)</div>
            <div className="text-lg font-extrabold text-cyan-400 font-mono-numbers">3 Accounts</div>
            <div className="text-[10px] text-slate-400">Immediate Counterparties</div>
            <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-white/[0.06]">
              Flow: ₹3.82 Cr
            </div>
          </div>

          <div className="hidden md:flex justify-center text-slate-500">
            <ArrowRight className="w-5 h-5 text-cyan-400" />
          </div>

          {/* Node 3: 11 Connected Accounts */}
          <div className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
            expansionStep >= 2 ? 'neu-card border-white/10 text-white' : 'neu-inset-sm opacity-40'
          }`}>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Expanded Layer (2-Hop)</div>
            <div className="text-lg font-extrabold text-amber-400 font-mono-numbers">11 Accounts</div>
            <div className="text-[10px] text-slate-400">Conduit Intermediaries</div>
            <div className="pt-2 text-[10px] font-mono text-slate-500 border-t border-white/[0.06]">
              Flow: ₹4.82 Cr
            </div>
          </div>
        </div>

        {/* Second Row of Expansion matching prompt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/[0.06]">
          {/* 4 Financial Institutions */}
          <div className="neu-inset-sm p-4 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-blue-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">4 Financial Institutions Involved</span>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                  HDFC Bank • ICICI Bank • Axis Bank • State Bank of India
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full font-mono font-bold text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Cross-Bank Layering
            </span>
          </div>

          {/* 2 Suspicious Clusters */}
          <div className="neu-inset-sm p-4 rounded-xl flex items-center justify-between text-xs border border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-red-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-red-400 text-sm">2 Suspicious Clusters Detected</span>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">
                  Cluster #173 (Circular Loop) • Cluster #142 (Rapid Mule Funnel)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full font-mono font-bold text-[10px] bg-red-500/20 text-red-400 border border-red-500/30">
              Critical AML Alert
            </span>
          </div>
        </div>
      </div>

      {/* Traced Counterparties Ledger */}
      <div className="neu-card p-6 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <h2 className="text-base font-bold text-white tracking-tight">
            Detailed Trace Path Log for {activeAccount.id}
          </h2>
          <span className="text-[11px] font-mono text-slate-400">
            Ordered by Temporal Hop
          </span>
        </div>

        <div className="neu-inset-sm rounded-xl overflow-hidden">
          <table className="w-full text-left font-mono">
            <thead className="border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase">
              <tr>
                <th className="py-2.5 px-3">Hop</th>
                <th className="py-2.5 px-3">Origin Entity</th>
                <th className="py-2.5 px-3">Direction</th>
                <th className="py-2.5 px-3">Target Entity</th>
                <th className="py-2.5 px-3">Transfer Value</th>
                <th className="py-2.5 px-3">Transit Interval</th>
                <th className="py-2.5 px-3 text-right">Workspace Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-[11px] text-slate-300">
              {scenario.transactions.slice(0, 5).map((txn, idx) => (
                <tr key={txn.id} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-3 font-bold text-cyan-400">#{idx + 1}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{txn.source}</td>
                  <td className="py-2.5 px-3 text-blue-400">→ [ {txn.method} ] →</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{txn.target}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">₹{(txn.amount / 1000).toLocaleString('en-IN')}k</td>
                  <td className="py-2.5 px-3 text-slate-400">{txn.holdingTimeMinutes || 5.2} mins</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={handleLaunchInGraph}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      Trace in Graph →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FundFlowPage;
