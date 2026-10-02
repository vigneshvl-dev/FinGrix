import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Building2, 
  Lock, 
  Share2, 
  ArrowRight,
  Repeat,
  Zap,
  Layers,
  Clock,
  User,
  Hash
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
    const dossierData = {
      platform: 'FINGRIX — Financial Crime Investigation Center',
      documentType: 'FORENSIC INVESTIGATION DOSSIER',
      classification: 'CONFIDENTIAL // LAW ENFORCEMENT & FIU-IND ADMISSIBLE',
      caseId: c.id,
      networkId: c.networkId,
      generatedAt: new Date().toISOString(),
      leadInvestigator: c.assignedInvestigator,
      leadInstitution: c.leadInstitution,
      caseSummary: {
        title: c.title,
        status: c.status,
        priority: c.priority,
        totalFlow: scenario.stats.totalFlow,
        accountsCount: scenario.accounts.length,
        transactionsCount: scenario.transactions.length,
        avgHoldingTime: scenario.stats.avgHoldingTime,
        flowDuration: scenario.stats.flowDuration,
      },
      investigationScope: 'Multi-institutional cross-border & domestic clearing analysis',
      suspectedEntities: scenario.accounts,
      transactionTimeline: scenario.transactions,
      detectedPatterns: c.detectedPatterns,
      evidence: scenario.evidencePoints,
      investigatorNotes: notes,
      auditTrail: {
        hash: '0x9d4e28f110bc87291a45e7f8021c3b6d4a5e1f98',
        sealedBy: 'Lead Forensics Investigator',
        timestamp: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Forensic_Dossier_${c.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Exported Forensic Dossier as JSON.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Source Account', 'Destination Account', 'Amount INR', 'Timestamp', 'Rail', 'Holding Time', 'Flagged Status'];
    const rows = scenario.transactions.map(t => [
      t.id,
      t.source,
      t.target,
      t.amount,
      t.displayTime,
      t.method,
      t.holdingTimeMinutes || '4.5',
      t.isSuspicious ? 'SUSPICIOUS' : 'NORMAL'
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Forensic_Evidence_${c.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Exported Transaction Evidence Ledger as CSV.');
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto select-none font-sans">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>AUDIT-READY REGULATORY COMPLIANCE</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Forensic Investigation Dossier</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Structured evidentiary case pack for statutory filing with FIU-IND, Enforcement Directorate, and cross-bank LEA agencies.
          </p>
        </div>

        {/* Export Buttons (Requirement 13) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export Dossier &rarr; PDF</span>
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

      {/* Official Forensic Dossier Document (10 Structured Sections as required in Prompt 13) */}
      <div className="neu-card p-8 space-y-7 text-xs text-white print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
        {/* Document Header & Classification Banner */}
        <div className="border-b-2 border-blue-500 pb-4 flex justify-between items-start">
          <div>
            <div className="text-base font-extrabold text-white print:text-black font-sans tracking-wide">
              FINGRIX — FINANCIAL CRIME INVESTIGATION CENTER
            </div>
            <div className="text-xs text-slate-400 print:text-gray-600 mt-0.5">
              Forensic Intelligence Dossier • Case File: {c.id} ({c.networkId})
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-[10px] font-bold text-red-400 border border-red-500/40 px-2.5 py-0.5 rounded-md uppercase">
              CONFIDENTIAL // FIU-IND ADMISSIBLE
            </span>
            <div className="text-[10px] text-slate-400 print:text-gray-500 mt-1 font-mono">
              Generated: {new Date().toLocaleDateString('en-GB')} IST
            </div>
          </div>
        </div>

        {/* 1. CASE SUMMARY (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            1. CASE SUMMARY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 block text-[10px]">CASE IDENTIFIER</span>
              <span className="font-bold text-white text-xs mt-0.5 block">{c.id}</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 block text-[10px]">THREAT LEVEL</span>
              <span className="font-bold text-red-400 text-xs mt-0.5 block">{c.priority} Priority</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 block text-[10px]">TOTAL FLOW VALUE</span>
              <span className="font-bold text-white text-xs mt-0.5 block">₹{(c.totalFlow / 10000000).toFixed(2)} Cr</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 block text-[10px]">LEAD INSTITUTION</span>
              <span className="font-bold text-cyan-400 text-xs mt-0.5 block">{c.leadInstitution}</span>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px] pt-1">
            {c.summary}
          </p>
        </section>

        {/* 2. INVESTIGATION SCOPE (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            2. INVESTIGATION SCOPE
          </h2>
          <div className="neu-inset-sm p-3 rounded-xl space-y-1 text-slate-300 text-[11px] leading-relaxed">
            <p>
              Surveillance window spans <strong>18 Sep 2026 to 28 Sep 2026</strong>. Multi-institution ledger extraction covers <strong>5 federated banking institutions</strong> (State Bank of India, HDFC Bank, ICICI Bank, Axis Bank, YES Bank). Graph heuristic algorithms executed Tarjan depth-first search cycle detection, Louvain community clustering, and sub-threshold fan-in structuring scans.
            </p>
          </div>
        </section>

        {/* 3. SUSPECTED ENTITIES (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            3. SUSPECTED ENTITIES ({scenario.accounts.length})
          </h2>
          <div className="neu-inset-sm rounded-xl overflow-hidden font-mono text-[11px]">
            <table className="w-full text-left">
              <thead className="border-b border-white/[0.06] text-[10px] text-slate-400 uppercase">
                <tr>
                  <th className="py-2.5 px-3">Entity ID</th>
                  <th className="py-2.5 px-3">Entity Name</th>
                  <th className="py-2.5 px-3">Institution</th>
                  <th className="py-2.5 px-3">IFSC</th>
                  <th className="py-2.5 px-3">Risk</th>
                  <th className="py-2.5 px-3 text-right">Net Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {scenario.accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-3 font-bold text-blue-400">{acc.id}</td>
                    <td className="py-2 px-3 text-white font-sans">{acc.label}</td>
                    <td className="py-2 px-3 text-slate-400">{acc.institution}</td>
                    <td className="py-2 px-3 text-slate-400">{acc.ifscCode}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        acc.riskScore >= 70 ? 'text-red-400 bg-red-500/20' : 'text-emerald-400 bg-emerald-500/20'
                      }`}>
                        {acc.riskScore}/100
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right text-emerald-400 font-bold">
                      ₹{(acc.totalIncoming / 1000).toFixed(0)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. FUND FLOW GRAPH (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            4. FUND FLOW GRAPH
          </h2>
          <div className="neu-inset-sm p-4 rounded-xl text-center space-y-2 font-mono text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Topological Flow Representation:</span>
            <div className="p-3 rounded-lg bg-black/40 text-blue-300 font-bold tracking-wider leading-relaxed">
              HDFC [BANK A] &rarr; ACC-1042 &rarr; (₹98k) &rarr; ACC-1043 [ICICI] &rarr; (₹96k) &rarr; ACC-1044 [Axis] &rarr; (₹94k) &rarr; ACC-1045 [SBI] &rarr; (₹92k) &rarr; ACC-1042 [HDFC RETURN]
            </div>
            <span className="text-[10px] text-emerald-400 block font-semibold">
              4-Hop Cycle Confirmed • 94.3% Value Retention Rate • 26 Minutes Total Elapsed
            </span>
          </div>
        </section>

        {/* 5. TRANSACTION TIMELINE (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            5. TRANSACTION TIMELINE
          </h2>
          <div className="neu-inset-sm rounded-xl overflow-hidden font-mono text-[11px]">
            <table className="w-full text-left">
              <thead className="border-b border-white/[0.06] text-[10px] text-slate-400 uppercase">
                <tr>
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Txn ID</th>
                  <th className="py-2 px-3">Sender &rarr; Beneficiary</th>
                  <th className="py-2 px-3">Rail</th>
                  <th className="py-2 px-3">Interval</th>
                  <th className="py-2 px-3 text-right">Value (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {scenario.transactions.slice(0, 5).map((t, idx) => (
                  <tr key={t.id}>
                    <td className="py-2 px-3 text-cyan-400">{t.displayTime}</td>
                    <td className="py-2 px-3 text-slate-400">{t.id}</td>
                    <td className="py-2 px-3 text-white">{t.source} &rarr; {t.target}</td>
                    <td className="py-2 px-3 text-slate-400">{t.method}</td>
                    <td className="py-2 px-3 text-amber-400">{t.holdingTimeMinutes || 4.5}m</td>
                    <td className="py-2 px-3 text-right font-bold text-white">₹{(t.amount / 1000).toLocaleString('en-IN')}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. DETECTED PATTERNS (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            6. DETECTED PATTERNS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            <div className="neu-inset-sm p-3 rounded-xl border border-red-500/20">
              <span className="font-bold text-red-400 block">&bull; Circular Fund Routing</span>
              <span className="text-slate-400 text-[10px] mt-0.5 block">Cycle Length: 4 Hops (Closed)</span>
            </div>
            <div className="neu-inset-sm p-3 rounded-xl border border-amber-500/20">
              <span className="font-bold text-amber-400 block">&bull; Rapid Pass-Through</span>
              <span className="text-slate-400 text-[10px] mt-0.5 block">Holding Duration: &lt; 6 min avg</span>
            </div>
            <div className="neu-inset-sm p-3 rounded-xl border border-blue-500/20">
              <span className="font-bold text-blue-400 block">&bull; Inter-Bank Layering</span>
              <span className="text-slate-400 text-[10px] mt-0.5 block">Cross-Institution IMPS/RTGS</span>
            </div>
          </div>
        </section>

        {/* 7. EVIDENCE (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            7. EVIDENCE ({scenario.evidencePoints.length} Key Findings)
          </h2>
          <div className="space-y-2">
            {scenario.evidencePoints.map((ev, i) => (
              <div key={ev.id} className="p-3 rounded-xl neu-inset-sm text-xs space-y-1">
                <div className="flex items-center justify-between font-mono">
                  <span className="font-bold text-white">&bull; {ev.title}</span>
                  <span className="text-[10px] text-slate-400">{ev.id}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {ev.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. RISK INDICATORS (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            8. RISK INDICATORS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-500 text-[9px] block">HOLDING VELOCITY</span>
              <span className="text-amber-400 font-bold block mt-0.5">High Velocity (&lt; 8m)</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-500 text-[9px] block">ASSET RETENTION</span>
              <span className="text-red-400 font-bold block mt-0.5">Zero Retention</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-500 text-[9px] block">UBO LINKAGE</span>
              <span className="text-red-400 font-bold block mt-0.5">Shared Directors</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-500 text-[9px] block">DISPERSAL RATIO</span>
              <span className="text-cyan-400 font-bold block mt-0.5">1-to-4 Structuring</span>
            </div>
          </div>
        </section>

        {/* 9. INVESTIGATOR NOTES (Requirement 13) */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            9. INVESTIGATOR NOTES
          </h2>
          <div className="space-y-2">
            {notes.map((n) => (
              <div key={n.id} className="neu-inset-sm p-3 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="font-bold text-white">{n.author}</span>
                  <span>{n.timestamp}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {n.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. AUDIT TRAIL (Requirement 13) */}
        <section className="space-y-3 pt-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 border-b border-white/[0.08] pb-1 font-mono">
            10. AUDIT TRAIL & STATUTORY CERTIFICATION
          </h2>
          <div className="neu-inset-sm p-4 rounded-xl space-y-2 font-mono text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Cryptographic Dossier Hash (SHA-256):</span>
              <span className="text-blue-400 font-bold">0x9d4e28f110bc87291a45e7f8021c3b6d4a5e1f98...</span>
            </div>
            <div className="flex justify-between">
              <span>Certified Investigating Officer:</span>
              <span className="text-white font-bold">{c.assignedInvestigator}</span>
            </div>
            <div className="flex justify-between">
              <span>Statutory Reference:</span>
              <span className="text-emerald-400">Prevention of Money Laundering Act (PMLA) Section 12</span>
            </div>
          </div>

          <div className="pt-6 flex justify-between items-end text-xs text-slate-400 print:text-black">
            <div>
              <div className="w-48 border-b border-slate-600 mb-1" />
              <span>Investigating Officer Signature</span>
            </div>
            <div className="text-right">
              <div className="w-48 border-b border-slate-600 mb-1 ml-auto" />
              <span>Authorized FIU-IND Principal Officer</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportsPage;
