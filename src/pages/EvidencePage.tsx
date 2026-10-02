import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileCheck, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Hash, 
  Clock, 
  Share2, 
  Building2, 
  User, 
  Download, 
  FileText,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { EVIDENCE_LEDGER_ITEMS } from '../data/mockData';
import { useInvestigation } from '../context/InvestigationContext';

export const EvidencePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentCase, setSelectedAccount, setSelectedTransaction, scenario } = useInvestigation();
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('EVD-01');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedEvidence = EVIDENCE_LEDGER_ITEMS.find(e => e.id === selectedEvidenceId) || EVIDENCE_LEDGER_ITEMS[0];

  const handleInspectInGraph = (accId?: string, txnId?: string) => {
    if (accId) {
      const match = scenario.accounts.find(a => a.id === accId);
      if (match) setSelectedAccount(match);
    }
    if (txnId) {
      const matchTxn = scenario.transactions.find(t => t.id === txnId);
      if (matchTxn) setSelectedTransaction(matchTxn);
    }
    navigate(`/investigations/INV-2026-0173`);
  };

  const filteredEvidence = EVIDENCE_LEDGER_ITEMS.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <FileCheck className="w-3.5 h-3.5" />
            <span>FORENSIC EVIDENTIARY VAULT</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Evidence Ledger & Chain of Custody</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cryptographically sealed evidentiary artifacts, topological cycle proofs, and multi-bank transaction ledgers verified for FIU/LEA prosecution.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/reports')}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer shadow-sm transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Compile into Dossier</span>
          </button>
        </div>
      </div>

      {/* Case Context Alert Bar */}
      <div className="neu-inset-sm px-4 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-blue-400">ACTIVE CASE: INV-2026-0173</span>
          <span className="text-slate-600">•</span>
          <span className="text-white font-medium">Suspicious Network #173 (Multi-Bank Circular Loop)</span>
          <span className="text-slate-600">•</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            6 Core Proofs Verified
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span>SHA-256 Chain Sealed</span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: List of 6 Core Evidence Items */}
        <div className="space-y-4">
          <div className="neu-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Verified Evidentiary Findings
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                100% Admissible
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter evidence proofs..."
                className="neu-input w-full pl-8 pr-3 py-1.5 rounded-xl text-xs text-white"
              />
            </div>

            <div className="space-y-2 pt-1">
              {filteredEvidence.map((item) => {
                const isSelected = item.id === selectedEvidenceId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEvidenceId(item.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border text-xs ${
                      isSelected
                        ? 'neu-raised border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'neu-btn border-white/[0.04] text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-[11px] text-blue-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.id}</span>
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.severity === 'critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {item.severity.toUpperCase()}
                      </span>
                    </div>

                    <div className="font-bold text-xs text-white flex items-center gap-1.5">
                      <span>✓</span>
                      <span>{item.title}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                      <span>{item.involvedAccounts.length} entities</span>
                      <span>•</span>
                      <span>{item.involvedTransactions.length} txns</span>
                      <span className="ml-auto text-blue-400 font-semibold flex items-center gap-0.5">
                        Inspect →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Evidence Dossier Card & Graph Drilldown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="neu-card p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-400 neu-inset-sm px-2.5 py-1 rounded-lg">
                    {selectedEvidence.id}
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>STATUS: VERIFIED ADMISSIBLE</span>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1.5">
                  {selectedEvidence.title}
                </h2>
              </div>

              <button
                onClick={() => handleInspectInGraph(selectedEvidence.involvedAccounts[0], selectedEvidence.involvedTransactions[0])}
                className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer shadow-sm self-start transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Highlight in Graph Workspace</span>
              </button>
            </div>

            {/* Findings Description */}
            <div className="neu-inset-sm p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Forensic Finding Narrative
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedEvidence.description}
              </p>
            </div>

            {/* Cryptographic Chain-of-Custody Integrity Tile */}
            <div className="p-4 rounded-xl neu-card space-y-3 text-xs border border-emerald-500/20">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chain of Custody & Audit Integrity</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">HMAC-SHA256 Valid</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono text-slate-300">
                <div className="neu-inset-sm p-2 rounded-lg">
                  <span className="text-slate-500 block text-[9px]">BLOCK HASH</span>
                  <span className="text-blue-400 truncate block">0x8f4c91a382e7b1029c4f...d891</span>
                </div>
                <div className="neu-inset-sm p-2 rounded-lg">
                  <span className="text-slate-500 block text-[9px]">RECORDING TIMESTAMP</span>
                  <span className="text-white block">2026-09-28 09:58:14 IST</span>
                </div>
                <div className="neu-inset-sm p-2 rounded-lg">
                  <span className="text-slate-500 block text-[9px]">VERIFYING INVESTIGATOR</span>
                  <span className="text-white block">V. Kumar (Lead Forensics)</span>
                </div>
                <div className="neu-inset-sm p-2 rounded-lg">
                  <span className="text-slate-500 block text-[9px]">REGULATORY ADMISSIBILITY</span>
                  <span className="text-emerald-400 block">PMLA Sec 12 / Evidence Act 65B</span>
                </div>
              </div>
            </div>

            {/* Linked Entity Accounts */}
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                Involved Entity Nodes ({selectedEvidence.involvedAccounts.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedEvidence.involvedAccounts.map((accId) => {
                  const node = scenario.accounts.find(a => a.id === accId);
                  return (
                    <div
                      key={accId}
                      onClick={() => handleInspectInGraph(accId)}
                      className="neu-btn p-3 rounded-xl cursor-pointer hover:border-blue-500/40 transition flex items-center justify-between"
                    >
                      <div className="min-w-0">
                        <div className="font-mono text-blue-400 font-bold">{accId}</div>
                        <div className="text-white font-semibold truncate text-[11px]">{node?.label || 'Target Account'}</div>
                        <div className="text-[10px] text-slate-400">{node?.institution || 'Core Bank'}</div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        Risk {node?.riskScore || 85}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Linked Transactions */}
            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono block mb-2">
                Supporting Transaction Edges ({selectedEvidence.involvedTransactions.length})
              </span>
              <div className="neu-inset-sm rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left font-mono">
                  <thead className="border-b border-white/[0.06] text-[10px] text-slate-400 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Transaction ID</th>
                      <th className="py-2.5 px-3">Origin → Target</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Rail</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-[11px] text-slate-300">
                    {selectedEvidence.involvedTransactions.map((txnId) => {
                      const t = scenario.transactions.find(x => x.id === txnId) || scenario.transactions[0];
                      return (
                        <tr key={txnId} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 px-3 font-bold text-blue-400">{txnId}</td>
                          <td className="py-2.5 px-3 text-white">{t?.source || 'ACC-1042'} → {t?.target || 'ACC-1043'}</td>
                          <td className="py-2.5 px-3 font-bold text-white">₹{((t?.amount || 98000) / 1000).toLocaleString('en-IN')}k</td>
                          <td className="py-2.5 px-3 text-slate-400">{t?.method || 'IMPS'}</td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => handleInspectInGraph(undefined, txnId)}
                              className="text-blue-400 hover:underline font-semibold"
                            >
                              Inspect →
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidencePage;
