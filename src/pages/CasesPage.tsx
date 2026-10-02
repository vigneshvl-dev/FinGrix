import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send,
  ArrowRight,
  FolderKanban,
  FilePlus,
  ShieldCheck,
  CheckCircle2,
  Clock
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
    { id: 'overview', label: 'Dossier Overview' },
    { id: 'entities', label: `Entities (${scenario.accounts.length})` },
    { id: 'transactions', label: `Transactions (${scenario.transactions.length})` },
    { id: 'evidence', label: `Evidence Points (${scenario.evidencePoints.length})` },
    { id: 'notes', label: `Investigator Notes (${notes.length})` },
    { id: 'activity', label: 'Audit Trail' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Case Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold text-blue-400 neu-inset-sm px-2.5 py-1 rounded-lg border border-blue-500/20">
              {c.id}
            </span>
            <h1 className="text-xl font-bold text-white tracking-tight">{c.title}</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-2 flex-wrap">
            <span>Priority: <strong className="text-amber-400 font-semibold">{c.priority}</strong></span>
            <span>•</span>
            <span>Investigator: <strong className="text-white font-medium">{c.assignedInvestigator}</strong></span>
            <span>•</span>
            <span>Institution: <span className="text-slate-300">{c.leadInstitution}</span></span>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={c.id}
            onChange={(e) => {
              const found = cases.find(item => item.id === e.target.value);
              if (found) handleSelectCase(found);
            }}
            className="neu-input text-xs px-3 py-2 rounded-xl text-slate-200 cursor-pointer"
          >
            {cases.map(item => (
              <option key={item.id} value={item.id} className="bg-[#141A28] text-white">
                {item.id} — {item.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => navigate(`/investigations/${c.id}`)}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Case Status</div>
          <div className="text-lg font-extrabold text-amber-400 mt-1 font-mono">
            {c.status}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Priority: {c.priority}</div>
        </div>

        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Entities Involved</div>
          <div className="text-lg font-extrabold text-white mt-1 font-mono-numbers">
            {scenario.accounts.length} Accounts
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Across {new Set(scenario.accounts.map(a => a.institution)).size} clearing banks</div>
        </div>

        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Total Flow Volume</div>
          <div className="text-lg font-extrabold text-blue-400 mt-1 font-mono-numbers">
            ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">94.3% value retention</div>
        </div>

        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Last Dossier Update</div>
          <div className="text-lg font-extrabold text-white mt-1 font-mono">
            {c.lastUpdated}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">By {c.assignedInvestigator.split(' ')[0]}</div>
        </div>
      </div>

      {/* Neumorphic Case Management Tabs */}
      <div className="p-1 rounded-2xl neu-inset flex flex-wrap gap-1 text-xs font-semibold">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'neu-raised text-white font-bold shadow-[2px_2px_6px_rgba(0,0,0,0.6),-1px_-1px_4px_rgba(255,255,255,0.05)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="neu-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Investigative Dossier Summary
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
              {c.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400">Triggered Patterns:</span>
              {c.detectedPatterns.map(p => (
                <span key={p} className="neu-inset-sm px-2.5 py-1 rounded-lg text-slate-200 text-xs font-mono">
                  {p}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate(`/investigations/${c.id}`)}
              className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Inspect Topology Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ENTITIES */}
      {activeTab === 'entities' && (
        <div className="neu-card overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3 px-4 font-mono">Account ID</th>
                <th className="py-3 px-4">Entity Legal Name</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Topology Position</th>
                <th className="py-3 px-4 font-mono-numbers">Risk Score</th>
                <th className="py-3 px-4 font-mono-numbers">Incoming</th>
                <th className="py-3 px-4 font-mono-numbers">Outgoing</th>
                <th className="py-3 px-4">KYC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {scenario.accounts.map(acc => (
                <tr key={acc.id} className="hover:bg-white/[0.03]">
                  <td className="py-3 px-4 font-mono font-bold text-blue-400">{acc.id}</td>
                  <td className="py-3 px-4 font-semibold text-white">{acc.label}</td>
                  <td className="py-3 px-4 text-slate-300">{acc.institution}</td>
                  <td className="py-3 px-4 text-slate-400">{acc.networkPosition}</td>
                  <td className="py-3 px-4 font-mono-numbers">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      acc.riskScore >= 70 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {acc.riskScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono-numbers text-white font-medium">₹{(acc.totalIncoming / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4 font-mono-numbers text-white font-medium">₹{(acc.totalOutgoing / 1000).toFixed(0)}k</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-medium">{acc.kycStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: NOTES */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {/* Note Input */}
          <div className="neu-card p-4 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Append Evidentiary Observation
            </h3>
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Record forensic observation, subpoena status, or clearing coordination note..."
              rows={3}
              className="neu-input w-full p-3 rounded-xl text-xs text-white placeholder-slate-500 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddNote}
                className="neu-btn-primary px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save to Audit Ledger</span>
              </button>
            </div>
          </div>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="neu-card p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    {note.author} ({note.role})
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{note.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesPage;
