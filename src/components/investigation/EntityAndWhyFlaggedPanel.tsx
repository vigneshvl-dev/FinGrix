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
  Info
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
    <div className="w-[340px] h-full bg-white border-l border-border flex flex-col select-none overflow-hidden text-xs">
      {/* Header Tabs */}
      <div className="flex border-b border-border bg-surface-secondary">
        <button
          onClick={() => setActiveTab('entity')}
          className={`flex-1 py-2.5 px-3 font-medium text-center transition ${
            activeTab === 'entity'
              ? 'bg-white text-text-primary border-b-2 border-brand font-semibold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Entity Details
        </button>

        <button
          onClick={() => setActiveTab('why_flagged')}
          className={`flex-1 py-2.5 px-3 font-medium text-center transition ${
            activeTab === 'why_flagged'
              ? 'bg-white text-text-primary border-b-2 border-brand font-semibold'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Why Flagged?
        </button>
      </div>

      {/* Tab 1: Entity Details */}
      {activeTab === 'entity' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top Account Identity */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-text-primary">
                {acc.id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                acc.riskScore >= 70 
                  ? 'bg-risk-subtle text-risk border-risk-border' 
                  : 'bg-success-subtle text-success border-success-border'
              }`}>
                {acc.riskScore >= 70 ? `Risk Score: ${acc.riskScore}` : 'Verified'}
              </span>
            </div>
            <div className="font-semibold text-text-primary text-sm">
              {acc.label}
            </div>
            <div className="text-text-secondary text-xs">
              {acc.institution} • {acc.city}
            </div>
          </div>

          {/* Properties Table */}
          <div className="bg-surface-secondary rounded p-3 border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-muted">Account type</span>
              <span className="font-medium text-text-primary">
                {acc.entityType === 'business' || acc.entityType === 'shell_company' ? 'Commercial Business' : 'Individual'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Account number</span>
              <span className="font-mono text-text-primary">{acc.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">IFSC / Routing</span>
              <span className="font-mono text-text-primary">{acc.ifscCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">KYC status</span>
              <span className="font-medium text-text-primary">{acc.kycStatus}</span>
            </div>
          </div>

          {/* Financial Flow Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-surface-secondary border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Incoming</span>
              <span className="text-sm font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                ₹{(acc.totalIncoming / 100000).toFixed(2)}L
              </span>
            </div>

            <div className="p-2.5 rounded bg-surface-secondary border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Outgoing</span>
              <span className="text-sm font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                ₹{(acc.totalOutgoing / 100000).toFixed(2)}L
              </span>
            </div>

            <div className="p-2.5 rounded bg-surface-secondary border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Connected Entities</span>
              <span className="text-sm font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                {connectedCounterparties.length}
              </span>
            </div>

            <div className="p-2.5 rounded bg-surface-secondary border border-border">
              <span className="text-[10px] text-text-muted uppercase block">Avg Holding Time</span>
              <span className="text-sm font-semibold text-warning font-mono-numbers mt-0.5 block">
                {acc.averageHoldingTimeMinutes > 60 
                  ? `${(acc.averageHoldingTimeMinutes / 1440).toFixed(1)} days`
                  : `${acc.averageHoldingTimeMinutes} min`
                }
              </span>
            </div>
          </div>

          {/* Detected Indicators Checklist */}
          <div>
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              Detected Indicators
            </div>
            <ul className="space-y-1.5 text-xs text-text-primary">
              {acc.riskIndicators.map((ind, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded bg-risk-subtle border border-risk-border text-risk">
                  <span className="font-bold">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Entities List */}
          <div>
            <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              Connected Entities ({connectedCounterparties.length})
            </div>
            <div className="space-y-1">
              {connectedCounterparties.map(({ account: cp, id, txnsCount }) => (
                <div
                  key={id}
                  onClick={() => cp && setSelectedAccount(cp)}
                  className="p-2 rounded border border-border hover:bg-surface-secondary cursor-pointer flex items-center justify-between transition"
                >
                  <div>
                    <div className="font-mono text-brand font-medium">{id}</div>
                    <div className="text-[11px] text-text-muted">{cp?.label || 'External Entity'}</div>
                  </div>
                  <span className="text-[11px] text-text-secondary">{txnsCount} txns</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-border space-y-1.5">
            <button
              onClick={triggerTraceFlow}
              className="w-full py-1.5 px-3 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-sm transition"
            >
              Trace Flow
            </button>

            <button
              onClick={handleAddToCase}
              className="w-full py-1.5 px-3 rounded border border-border hover:bg-surface-secondary text-text-primary text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <FilePlus className="w-3.5 h-3.5 text-text-muted" />
              <span>{caseNoteAdded ? 'Added to case file ✓' : 'Add to case'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Why Was This Flagged? (Evidence-Based) */}
      {activeTab === 'why_flagged' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-text-primary">
          <div className="p-3 rounded bg-surface-secondary border border-border">
            <div className="font-semibold text-text-primary mb-1">
              Topological Findings
            </div>
            <p className="text-text-secondary leading-relaxed">
              Automated graph detection flagged this network for the following verified reasons:
            </p>
          </div>

          {/* Point 1: Circularity */}
          {scenario.whyFlagged.circularity && (
            <div className="p-3 rounded border border-border bg-white space-y-1">
              <span className="font-semibold text-text-primary block">
                • Circular flow detected
              </span>
              <p className="text-text-secondary leading-relaxed">
                {scenario.whyFlagged.circularity}
              </p>
            </div>
          )}

          {/* Point 2: Velocity */}
          {scenario.whyFlagged.velocity && (
            <div className="p-3 rounded border border-border bg-white space-y-1">
              <span className="font-semibold text-text-primary block">
                • High fund velocity
              </span>
              <p className="text-text-secondary leading-relaxed">
                {scenario.whyFlagged.velocity}
              </p>
            </div>
          )}

          {/* Point 3: Flow Pattern */}
          {scenario.whyFlagged.flowPattern && (
            <div className="p-3 rounded border border-border bg-white space-y-1">
              <span className="font-semibold text-text-primary block">
                • Pass-through dispersal ratio
              </span>
              <p className="text-text-secondary leading-relaxed">
                {scenario.whyFlagged.flowPattern}
              </p>
            </div>
          )}

          {/* Point 4: Structuring */}
          {scenario.whyFlagged.structuring && (
            <div className="p-3 rounded border border-border bg-white space-y-1">
              <span className="font-semibold text-text-primary block">
                • Sub-threshold structuring
              </span>
              <p className="text-text-secondary leading-relaxed">
                {scenario.whyFlagged.structuring}
              </p>
            </div>
          )}

          {/* Supporting evidence transactions */}
          <div className="pt-2 border-t border-border">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block mb-2">
              Supporting Transactions
            </span>
            <div className="space-y-1">
              {scenario.transactions.slice(0, 4).map(t => (
                <div key={t.id} className="p-2 rounded bg-surface-secondary border border-border font-mono text-[11px] flex justify-between">
                  <span>{t.id}: {t.source} → {t.target}</span>
                  <span className="font-bold text-text-primary">₹{(t.amount / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
