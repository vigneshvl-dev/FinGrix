import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const ReportsPage: React.FC = () => {
  const { currentCase, scenario, notes } = useInvestigation();
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const c = currentCase;

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const reportData = {
      platform: 'FINGRIX — Forensic Financial Network Intelligence',
      classification: 'CONFIDENTIAL // BANKING COMPLIANCE & INVESTIGATION USE ONLY',
      caseId: c.id,
      generatedAt: new Date().toISOString(),
      leadInvestigator: c.assignedInvestigator,
      leadInstitution: c.leadInstitution,
      networkSummary: {
        totalFlow: scenario.stats.totalFlow,
        accountsCount: scenario.accounts.length,
        transactionsCount: scenario.transactions.length,
        avgHoldingTime: scenario.stats.avgHoldingTime,
        flowDuration: scenario.stats.flowDuration,
      },
      flaggedAccounts: scenario.accounts,
      transactionEvidence: scenario.transactions,
      evidencePoints: scenario.evidencePoints,
      investigatorNotes: notes,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Investigation_Report_${c.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Exported investigation dossier as structured JSON.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Source', 'Target', 'Amount (INR)', 'Timestamp', 'Rail', 'Holding Duration (min)', 'Flagged'];
    const rows = scenario.transactions.map(t => [
      t.id,
      t.source,
      t.target,
      t.amount,
      t.displayTime,
      t.method,
      t.holdingTimeMinutes || '0',
      t.isSuspicious ? 'FLAGGED' : 'NORMAL'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transaction_Evidence_${c.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Exported transaction evidence ledger as CSV.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto select-none font-sans">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>Evidentiary Compliance Dossier</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit-ready forensic dossier and statutory SAR reporting documentation for Case {c.id}.
          </p>
        </div>

        {/* Neumorphic Export Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Official PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="neu-btn px-3.5 py-2 rounded-xl text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="neu-btn px-3.5 py-2 rounded-xl text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 no-print font-medium shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6)]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Official Financial Investigation Report Document */}
      <div className="neu-card p-8 space-y-7 text-xs text-white print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="border-b-2 border-blue-500 pb-4 flex justify-between items-start">
          <div>
            <div className="text-base font-extrabold text-white print:text-black font-sans tracking-wide">
              FINGRIX — FORENSIC FINANCIAL NETWORK INTELLIGENCE
            </div>
            <div className="text-xs text-slate-400 print:text-gray-600 mt-0.5">
              Financial Crimes Compliance Dossier • Case Reference {c.id}
            </div>
            <div className="text-[10px] text-slate-500 print:text-gray-500 mt-1 font-mono uppercase">
              Classification: STRICTLY CONFIDENTIAL // INTERNAL AUDIT & REGULATORY USE ONLY
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-mono font-bold text-blue-400 print:text-blue-600 text-sm">{c.id}</div>
            <div className="text-slate-400 print:text-gray-600 font-mono text-[11px]">28 Sep 2026</div>
            <div className="text-amber-400 print:text-amber-600 font-semibold">{c.status}</div>
          </div>
        </div>

        {/* Section 1: Case Information */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            1. Case Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3.5 rounded-xl neu-inset-sm">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Case ID</span>
              <span className="font-mono font-bold text-blue-400">{c.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Network ID</span>
              <span className="font-mono font-bold text-white">{c.networkId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Lead Institution</span>
              <span className="font-medium text-slate-200">{c.leadInstitution}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Lead Investigator</span>
              <span className="font-medium text-slate-200">{c.assignedInvestigator}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Investigation Scope */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            2. Investigation Scope
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Multi-bank transaction monitoring investigation initiated to determine coordinate fund movement, intermediary pass-through velocity, and circular layering across participating institutions pursuant to regulatory transaction monitoring guidelines.
          </p>
        </div>

        {/* Section 3: Network Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            3. Network Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Total Transferred</span>
              <span className="font-bold text-blue-400 font-mono-numbers mt-1 block text-sm">
                ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
              </span>
            </div>
            <div className="p-3 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Monitored Entities</span>
              <span className="font-bold text-white font-mono-numbers mt-1 block text-sm">
                {scenario.accounts.length} Accounts
              </span>
            </div>
            <div className="p-3 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Average Holding Time</span>
              <span className="font-bold text-amber-400 font-mono-numbers mt-1 block text-sm">
                {scenario.stats.avgHoldingTime}
              </span>
            </div>
            <div className="p-3 rounded-xl neu-card">
              <span className="text-[10px] text-slate-400 uppercase block font-mono">Flow Duration</span>
              <span className="font-bold text-white font-mono-numbers mt-1 block text-sm">
                {scenario.stats.flowDuration}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Flagged Entities */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            4. Flagged Entities
          </h2>
          <div className="neu-card overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="neu-inset-sm text-[10px] uppercase font-bold text-slate-400 font-mono">
                <tr>
                  <th className="py-2.5 px-3">Account ID</th>
                  <th className="py-2.5 px-3">Entity Name</th>
                  <th className="py-2.5 px-3">Institution</th>
                  <th className="py-2.5 px-3">Position</th>
                  <th className="py-2.5 px-3 font-mono-numbers">Risk Score</th>
                  <th className="py-2.5 px-3">Holding Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {scenario.accounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-400">{acc.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">{acc.label}</td>
                    <td className="py-2.5 px-3 text-slate-300">{acc.institution}</td>
                    <td className="py-2.5 px-3 text-slate-400">{acc.networkPosition}</td>
                    <td className="py-2.5 px-3 font-mono-numbers font-bold text-red-400">{acc.riskScore}</td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {acc.averageHoldingTimeMinutes > 60 ? `${(acc.averageHoldingTimeMinutes / 1440).toFixed(1)}d` : `${acc.averageHoldingTimeMinutes}m`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 8: Investigator Observations */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            8. Investigator Observations & Audit Log
          </h2>
          <div className="space-y-2">
            {notes.map(n => (
              <div key={n.id} className="p-3 rounded-xl neu-inset-sm space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    {n.author} ({n.role})
                  </span>
                  <span className="font-mono">{n.timestamp}</span>
                </div>
                <p className="text-slate-300">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: Evidence References & Sign-off */}
        <div className="space-y-4 pt-4 border-t border-white/[0.06]">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-1 font-mono">
            9. Evidence References & Cryptographic Sign-off
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs text-slate-400">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Report Hash</span>
              <span className="font-mono text-cyan-400 text-[10px]">SHA256: 7f3b89a1c89f02e...</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Certified Officer</span>
              <span className="font-medium text-white">{c.assignedInvestigator}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono">Recommended Action</span>
              <span className="font-bold text-red-400">File Suspicious Activity Report (SAR)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
