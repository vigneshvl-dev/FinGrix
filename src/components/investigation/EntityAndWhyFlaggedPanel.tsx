import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  ArrowRight, 
  Clock, 
  Share2, 
  FilePlus, 
  ArrowDownLeft, 
  ArrowUpRight,
  ChevronRight,
  Info,
  ShieldAlert,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const EntityAndWhyFlaggedPanel: React.FC = () => {
  const { 
    selectedAccount, 
    setSelectedAccount, 
    scenario, 
    triggerTraceFlow,
    addNote
  } = useInvestigation();

  const [activeTab, setActiveTab] = useState<'entity' | 'why_flagged'>('entity');
  const [caseNoteAdded, setCaseNoteAdded] = useState(false);

  const acc = selectedAccount || scenario.accounts[0];

  // Connected accounts
  const connectedCounterparties = React.useMemo(() => {
    if (!acc) return [];
    const connectedTxns = scenario.transactions.filter(
      t => t.source === acc.id || t.target === acc.id
    );
    const counterpartyIds = Array.from(
      new Set(connectedTxns.flatMap(t => [t.source, t.target]))
    ).filter(id => id !== acc.id);

    return counterpartyIds.map(id => {
      const counterpart = scenario.accounts.find(a => a.id === id);
      const txnsCount = connectedTxns.filter(t => t.source === id || t.target === id).length;
      return { account: counterpart, id, txnsCount };
    });
  }, [acc, scenario]);

  if (!acc) return null;

  const handleAddToCase = () => {
    addNote(`Entity ${acc.id} (${acc.label}) added to formal evidence dossier. Risk score: ${acc.riskScore}/100.`, [acc.id]);
    setCaseNoteAdded(true);
    setTimeout(() => setCaseNoteAdded(false), 2500);
  };

  return (
    <div className="w-[340px] h-full bg-[#0E131E] border-l border-white/[0.06] shadow-[-4px_0_16px_rgba(0,0,0,0.5)] flex flex-col select-none overflow-hidden text-xs">
      {/* Neumorphic Segmented Tab Header */}
      <div className="p-3 border-b border-white/[0.06]">
        <div className="p-1 rounded-xl neu-inset grid grid-cols-2 gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('entity')}
            className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'entity'
                ? 'neu-raised text-white font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.6),-1px_-1px_4px_rgba(255,255,255,0.05)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entity Details
          </button>

          <button
            onClick={() => setActiveTab('why_flagged')}
            className={`py-2 px-3 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'why_flagged'
                ? 'neu-raised text-white font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.6),-1px_-1px_4px_rgba(255,255,255,0.05)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Why Flagged?</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Entity Details */}
      {activeTab === 'entity' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top Account Identity Card */}
          <div className="neu-card p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold text-blue-400">
                {acc.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                acc.riskScore >= 70 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {acc.riskScore >= 70 ? `Risk Score: ${acc.riskScore}/100` : 'Verified KYC'}
              </span>
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                {acc.label}
              </div>
              <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-500 inline" />
                <span>{acc.institution} • {acc.city}</span>
              </div>
            </div>
          </div>

          {/* Properties Table */}
          <div className="neu-inset-sm rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Account Classification</span>
              <span className="font-semibold text-white">
                {acc.entityType === 'business' || acc.entityType === 'shell_company' ? 'Commercial Entity' : 'Individual Retail'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Number</span>
              <span className="font-mono text-slate-200">{acc.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Routing IFSC</span>
              <span className="font-mono text-slate-200">{acc.ifscCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Compliance Status</span>
              <span className="font-medium text-emerald-400">{acc.kycStatus}</span>
            </div>
          </div>

          {/* Financial Flow Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Incoming Total</span>
              <span className="text-sm font-bold text-white font-mono-numbers mt-1 block">
                ₹{(acc.totalIncoming / 100000).toFixed(2)}L
              </span>
            </div>

            <div className="p-2.5 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Outgoing Total</span>
              <span className="text-sm font-bold text-white font-mono-numbers mt-1 block">
                ₹{(acc.totalOutgoing / 100000).toFixed(2)}L
              </span>
            </div>

            <div className="p-2.5 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Connected Nodes</span>
              <span className="text-sm font-bold text-blue-400 font-mono-numbers mt-1 block">
                {connectedCounterparties.length} Counterparties
              </span>
            </div>

            <div className="p-2.5 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Avg Velocity</span>
              <span className="text-sm font-bold text-amber-400 font-mono-numbers mt-1 block">
                {acc.averageHoldingTimeMinutes > 60 
                  ? `${(acc.averageHoldingTimeMinutes / 1440).toFixed(1)} days`
                  : `${acc.averageHoldingTimeMinutes} min`
                }
              </span>
            </div>
          </div>

          {/* Detected Indicators Checklist */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              Flagged AML Signatures ({acc.riskIndicators.length})
            </div>
            <ul className="space-y-1.5 text-xs">
              {acc.riskIndicators.map((ind, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl neu-inset-sm border border-red-500/20 text-red-300">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Entities List */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              Topology Neighbors ({connectedCounterparties.length})
            </div>
            <div className="space-y-1.5">
              {connectedCounterparties.map(({ account: cp, id, txnsCount }) => (
                <div
                  key={id}
                  onClick={() => cp && setSelectedAccount(cp)}
                  className="p-2.5 rounded-xl neu-btn cursor-pointer flex items-center justify-between transition-all"
                >
                  <div>
                    <div className="font-mono text-blue-400 font-bold text-xs">{id}</div>
                    <div className="text-[10px] text-slate-400">{cp?.label || 'External Node'}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-black/30 px-2 py-0.5 rounded-md border border-white/5">
                    {txnsCount} txns
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/[0.06] space-y-2">
            <button
              onClick={triggerTraceFlow}
              className="neu-btn-primary w-full py-2.5 px-3 rounded-xl text-xs font-semibold shadow-[4px_4px_12px_rgba(0,0,0,0.6),0_0_16px_rgba(37,99,235,0.4)] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trace Dynamic Flow</span>
            </button>

            <button
              onClick={handleAddToCase}
              className="neu-btn w-full py-2 px-3 rounded-xl text-slate-200 hover:text-white text-xs font-medium transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FilePlus className="w-3.5 h-3.5 text-blue-400" />
              <span>{caseNoteAdded ? 'Snapshot Added to Dossier ✓' : 'Add Entity to Case Ledger'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Why Was This Flagged? (Evidence-Based) */}
      {activeTab === 'why_flagged' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs text-white">
          <div className="p-3 rounded-xl neu-inset-sm border border-white/5">
            <div className="font-bold text-white mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Topology Anomaly Heuristics</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Cross-institutional surveillance flags triggered by multi-graph heuristics:
            </p>
          </div>

          {/* Point 1: Circularity */}
          {scenario.whyFlagged.circularity && (
            <div className="p-3 rounded-xl neu-card space-y-1 border-l-2 border-l-red-500">
              <span className="font-bold text-red-300 block text-xs">
                • Circular Fund-Flow Loop Detected
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {scenario.whyFlagged.circularity}
              </p>
            </div>
          )}

          {/* Point 2: Velocity */}
          {scenario.whyFlagged.velocity && (
            <div className="p-3 rounded-xl neu-card space-y-1 border-l-2 border-l-amber-500">
              <span className="font-bold text-amber-300 block text-xs">
                • High Fund Velocity / Pass-Through
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {scenario.whyFlagged.velocity}
              </p>
            </div>
          )}

          {/* Point 3: Flow Pattern */}
          {scenario.whyFlagged.flowPattern && (
            <div className="p-3 rounded-xl neu-card space-y-1 border-l-2 border-l-blue-500">
              <span className="font-bold text-blue-300 block text-xs">
                • Dispersal & Layering Ratio
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {scenario.whyFlagged.flowPattern}
              </p>
            </div>
          )}

          {/* Point 4: Structuring */}
          {scenario.whyFlagged.structuring && (
            <div className="p-3 rounded-xl neu-card space-y-1 border-l-2 border-l-amber-500">
              <span className="font-bold text-amber-300 block text-xs">
                • Sub-Threshold Smurfing
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {scenario.whyFlagged.structuring}
              </p>
            </div>
          )}

          {/* Supporting evidence transactions */}
          <div className="pt-2 border-t border-white/[0.06]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
              Supporting Transaction Ledger
            </span>
            <div className="space-y-1.5">
              {scenario.transactions.slice(0, 4).map(t => (
                <div key={t.id} className="p-2 rounded-xl neu-inset-sm font-mono text-[11px] flex justify-between items-center">
                  <span className="text-slate-300">{t.id}: {t.source} → {t.target}</span>
                  <span className="font-bold text-blue-400">₹{(t.amount / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntityAndWhyFlaggedPanel;
