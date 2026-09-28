import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send,
  ArrowRight
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { InvestigationCase } from '../types';

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentCase, 
    cases, 
    setSelectedCaseId, 
    setCurrentScenarioId, 
    scenario,
    notes,
    addNote
  } = useInvestigation();

  const [activeTab, setActiveTab] = useState<'overview' | 'entities' | 'transactions' | 'evidence' | 'notes' | 'activity'>('overview');
  const [newNoteContent, setNewNoteContent] = useState('');

  const c = currentCase || cases[0];

  const handleSelectCase = (targetCase: InvestigationCase) => {
    setSelectedCaseId(targetCase.id);
    setCurrentScenarioId(targetCase.scenarioType);
  };

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;
    addNote(newNoteContent);
    setNewNoteContent('');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'entities', label: `Entities (${scenario.accounts.length})` },
    { id: 'transactions', label: `Transactions (${scenario.transactions.length})` },
    { id: 'evidence', label: `Evidence (${scenario.evidencePoints.length})` },
    { id: 'notes', label: `Notes (${notes.length})` },
    { id: 'activity', label: 'Activity' },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Case Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-brand bg-brand-subtle px-2 py-0.5 rounded border border-brand/20">
              {c.id}
            </span>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">{c.title}</h1>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Priority: <strong className="text-text-primary font-medium">{c.priority}</strong> • Assigned Investigator: <strong className="text-text-primary font-medium">{c.assignedInvestigator}</strong> • Lead Institution: {c.leadInstitution}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={c.id}
            onChange={(e) => {
              const found = cases.find(item => item.id === e.target.value);
              if (found) handleSelectCase(found);
            }}
            className="bg-white border border-border text-text-primary text-xs rounded px-3 py-1.5 focus:outline-none focus:border-brand"
          >
            {cases.map(item => (
              <option key={item.id} value={item.id}>
                {item.id} — {item.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => navigate(`/investigations/${c.id}`)}
            className="px-3.5 py-1.5 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-sm transition"
          >
            Open workspace
          </button>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Status</div>
          <div className="text-lg font-bold text-warning mt-1">
            {c.status}
          </div>
          <div className="text-xs text-text-muted mt-0.5">Priority: {c.priority}</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Entities involved</div>
          <div className="text-lg font-bold text-text-primary mt-1 font-mono-numbers">
            {scenario.accounts.length} accounts
          </div>
          <div className="text-xs text-text-muted mt-0.5">Across {new Set(scenario.accounts.map(a => a.institution)).size} banks</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Total flow volume</div>
          <div className="text-lg font-bold text-text-primary mt-1 font-mono-numbers">
            ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-text-muted mt-0.5">94.3% value retention</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Last updated</div>
          <div className="text-lg font-bold text-text-primary mt-1">
            {c.lastUpdated}
          </div>
          <div className="text-xs text-text-muted mt-0.5">By {c.assignedInvestigator.split(' ')[0]}</div>
        </div>
      </div>

      {/* Case Management Tabs */}
      <div className="flex border-b border-border text-xs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-4 font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-brand text-brand font-semibold'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="bg-white p-5 rounded-card border border-border shadow-card space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">
              Investigation Summary
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mt-1">
              {c.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Detected patterns:</span>
              {c.detectedPatterns.map(p => (
                <span key={p} className="px-2 py-0.5 rounded bg-surface-secondary text-text-secondary border border-border text-xs">
                  {p}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate(`/investigations/${c.id}`)}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              Examine network topology <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ENTITIES */}
      {activeTab === 'entities' && (
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-semibold text-text-muted uppercase">
              <tr>
                <th className="py-2.5 px-4 font-mono">Account ID</th>
                <th className="py-2.5 px-4">Entity Name</th>
                <th className="py-2.5 px-4">Institution</th>
                <th className="py-2.5 px-4">Position</th>
                <th className="py-2.5 px-4 font-mono-numbers">Risk Score</th>
                <th className="py-2.5 px-4 font-mono-numbers">Incoming</th>
                <th className="py-2.5 px-4 font-mono-numbers">Outgoing</th>
                <th className="py-2.5 px-4">KYC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scenario.accounts.map(acc => (
                <tr key={acc.id} className="hover:bg-surface-hover">
                  <td className="py-3 px-4 font-mono font-semibold text-brand">{acc.id}</td>
                  <td className="py-3 px-4 font-medium text-text-primary">{acc.label}</td>
                  <td className="py-3 px-4 text-text-secondary">{acc.institution}</td>
                  <td className="py-3 px-4 text-text-muted">{acc.networkPosition}</td>
                  <td className="py-3 px-4 font-mono-numbers">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      acc.riskScore >= 70 ? 'bg-risk-subtle text-risk border-risk-border' : 'bg-success-subtle text-success border-success-border'
                    }`}>
                      {acc.riskScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono-numbers text-text-primary">₹{(acc.totalIncoming / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 font-mono-numbers text-text-primary">₹{(acc.totalOutgoing / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 text-text-secondary">{acc.kycStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-semibold text-text-muted uppercase">
              <tr>
                <th className="py-2.5 px-4 font-mono">TXN ID</th>
                <th className="py-2.5 px-4">Time</th>
                <th className="py-2.5 px-4">Source</th>
                <th className="py-2.5 px-4">Target</th>
                <th className="py-2.5 px-4 font-mono-numbers">Amount</th>
                <th className="py-2.5 px-4">Rail</th>
                <th className="py-2.5 px-4 font-mono-numbers">Holding Time</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scenario.transactions.map(t => (
                <tr key={t.id} className="hover:bg-surface-hover">
                  <td className="py-3 px-4 font-mono font-semibold text-brand">{t.id}</td>
                  <td className="py-3 px-4 text-text-muted font-mono">{t.displayTime}</td>
                  <td className="py-3 px-4 font-mono text-text-primary">{t.source}</td>
                  <td className="py-3 px-4 font-mono text-text-primary">{t.target}</td>
                  <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary">₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-text-secondary">{t.method}</td>
                  <td className="py-3 px-4 font-mono-numbers text-warning">{t.holdingTimeMinutes ? `${t.holdingTimeMinutes} min` : 'Direct'}</td>
                  <td className="py-3 px-4">
                    <span className="text-success text-xs font-medium">Settled</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: EVIDENCE */}
      {activeTab === 'evidence' && (
        <div className="space-y-3">
          {scenario.evidencePoints.map(evd => (
            <div key={evd.id} className="bg-white p-4 rounded-card border border-border shadow-card space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-brand">{evd.id}</span>
                <span className="px-2 py-0.5 rounded bg-surface-secondary text-text-secondary border border-border text-[11px] font-medium">
                  {evd.severity}
                </span>
              </div>
              <h4 className="font-semibold text-text-primary text-xs">{evd.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{evd.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-card border border-border shadow-card space-y-2">
            <span className="text-xs font-semibold text-text-primary block">
              Add Investigator Note
            </span>
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Record investigation notes, beneficial ownership inquiries, or evidence references..."
              rows={3}
              className="w-full bg-surface-secondary border border-border rounded p-2.5 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand focus:bg-white transition-colors"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddNote}
                className="px-3.5 py-1.5 rounded bg-brand hover:bg-brand-hover text-white font-medium text-xs shadow-sm"
              >
                Save note
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {notes.map(n => (
              <div key={n.id} className="bg-white p-4 rounded-card border border-border shadow-card space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-text-primary">{n.author}</span>
                  <span className="text-text-muted font-mono">{n.timestamp}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ACTIVITY */}
      {activeTab === 'activity' && (
        <div className="bg-white p-4 rounded-card border border-border shadow-card space-y-3 text-xs">
          <div className="flex items-center gap-3 border-l-2 border-brand pl-3 py-1">
            <span className="font-mono text-text-muted">19:30:00</span>
            <span className="text-text-primary">Case file opened from Alert #FG-1042</span>
          </div>
          <div className="flex items-center gap-3 border-l-2 border-border pl-3 py-1">
            <span className="font-mono text-text-muted">19:32:15</span>
            <span className="text-text-primary">Circular fund flow algorithm flagged 4-account loop</span>
          </div>
          <div className="flex items-center gap-3 border-l-2 border-border pl-3 py-1">
            <span className="font-mono text-text-muted">19:40:00</span>
            <span className="text-text-primary">Investigator recorded preliminary KYC review notes</span>
          </div>
        </div>
      )}
    </div>
  );
};
