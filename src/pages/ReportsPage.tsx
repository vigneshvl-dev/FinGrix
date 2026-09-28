import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2
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
      platform: 'FINGRAPH — Financial Graph Intelligence & Forensics',
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
    <div className="p-8 space-y-6 max-w-5xl mx-auto select-none">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Investigation Report
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Audit-ready forensic dossier and compliance documentation for Case {c.id}.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-1.5 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded border border-border bg-white hover:bg-surface-secondary text-text-primary text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-text-muted" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-1.5 rounded border border-border bg-white hover:bg-surface-secondary text-text-primary text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-text-muted" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded bg-success-subtle border border-success-border text-success text-xs flex items-center gap-2 no-print font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Official Financial Investigation Report Document */}
      <div className="bg-white border border-border rounded-card p-8 shadow-card space-y-7 text-xs text-text-primary print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b-2 border-brand pb-4 flex justify-between items-start">
          <div>
            <div className="text-base font-bold text-text-primary font-sans">
              FINGRAPH — Financial Graph Intelligence & Forensics
            </div>
            <div className="text-xs text-text-secondary mt-0.5">
              Financial Crimes Compliance Dossier • Case Reference {c.id}
            </div>
            <div className="text-[11px] text-text-muted mt-1">
              Classification: STRICTLY CONFIDENTIAL // INTERNAL AUDIT & REGULATORY USE ONLY
            </div>
          </div>

          <div className="text-right text-xs">
            <div className="font-mono font-bold text-brand">{c.id}</div>
            <div className="text-text-muted">Date: 28 Sep 2026</div>
            <div className="text-warning font-medium">{c.status}</div>
          </div>
        </div>

        {/* Section 1: Case Information */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            1. Case Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3 rounded bg-surface-secondary border border-border">
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Case ID</span>
              <span className="font-mono font-semibold text-text-primary">{c.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Network ID</span>
              <span className="font-mono font-semibold text-text-primary">{c.networkId}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Lead Institution</span>
              <span className="font-medium text-text-primary">{c.leadInstitution}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Lead Investigator</span>
              <span className="font-medium text-text-primary">{c.assignedInvestigator}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Investigation Scope */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            2. Investigation Scope
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Multi-bank transaction monitoring investigation initiated to determine coordinate fund movement, intermediary pass-through velocity, and circular layering across participating institutions pursuant to regulatory transaction monitoring guidelines.
          </p>
        </div>

        {/* Section 3: Network Summary */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            3. Network Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded border border-border bg-surface-secondary">
              <span className="text-[10px] text-text-muted uppercase block">Total Transferred Volume</span>
              <span className="font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
              </span>
            </div>
            <div className="p-2.5 rounded border border-border bg-surface-secondary">
              <span className="text-[10px] text-text-muted uppercase block">Monitored Entities</span>
              <span className="font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                {scenario.accounts.length} Accounts
              </span>
            </div>
            <div className="p-2.5 rounded border border-border bg-surface-secondary">
              <span className="text-[10px] text-text-muted uppercase block">Average Holding Time</span>
              <span className="font-semibold text-warning font-mono-numbers mt-0.5 block">
                {scenario.stats.avgHoldingTime}
              </span>
            </div>
            <div className="p-2.5 rounded border border-border bg-surface-secondary">
              <span className="text-[10px] text-text-muted uppercase block">Flow Duration</span>
              <span className="font-semibold text-text-primary font-mono-numbers mt-0.5 block">
                {scenario.stats.flowDuration}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Flagged Entities */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            4. Flagged Entities
          </h2>
          <table className="w-full text-left text-xs border border-border rounded">
            <thead className="bg-surface-secondary text-[10px] uppercase font-semibold text-text-muted">
              <tr>
                <th className="py-2 px-3">Account ID</th>
                <th className="py-2 px-3">Entity Name</th>
                <th className="py-2 px-3">Institution</th>
                <th className="py-2 px-3">Position</th>
                <th className="py-2 px-3 font-mono-numbers">Risk Score</th>
                <th className="py-2 px-3">Holding Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scenario.accounts.map(acc => (
                <tr key={acc.id}>
                  <td className="py-2 px-3 font-mono font-medium text-brand">{acc.id}</td>
                  <td className="py-2 px-3 font-medium text-text-primary">{acc.label}</td>
                  <td className="py-2 px-3 text-text-secondary">{acc.institution}</td>
                  <td className="py-2 px-3 text-text-muted">{acc.networkPosition}</td>
                  <td className="py-2 px-3 font-mono-numbers font-medium text-risk">{acc.riskScore}</td>
                  <td className="py-2 px-3 text-text-secondary">
                    {acc.averageHoldingTimeMinutes > 60 ? `${(acc.averageHoldingTimeMinutes / 1440).toFixed(1)}d` : `${acc.averageHoldingTimeMinutes}m`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 5: Transaction Evidence */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            5. Transaction Evidence
          </h2>
          <table className="w-full text-left text-xs border border-border rounded">
            <thead className="bg-surface-secondary text-[10px] uppercase font-semibold text-text-muted">
              <tr>
                <th className="py-2 px-3">Transaction Reference</th>
                <th className="py-2 px-3">Timestamp</th>
                <th className="py-2 px-3">Source</th>
                <th className="py-2 px-3">Target</th>
                <th className="py-2 px-3 font-mono-numbers">Amount</th>
                <th className="py-2 px-3">Rail</th>
                <th className="py-2 px-3">Interval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {scenario.transactions.map(t => (
                <tr key={t.id}>
                  <td className="py-2 px-3 font-mono text-brand">{t.id}</td>
                  <td className="py-2 px-3 text-text-muted font-mono">{t.displayTime}</td>
                  <td className="py-2 px-3 font-mono text-text-primary">{t.source}</td>
                  <td className="py-2 px-3 font-mono text-text-primary">{t.target}</td>
                  <td className="py-2 px-3 font-mono-numbers font-semibold text-text-primary">₹{t.amount.toLocaleString('en-IN')}</td>
                  <td className="py-2 px-3 text-text-secondary">{t.method}</td>
                  <td className="py-2 px-3 text-warning">{t.holdingTimeMinutes ? `${t.holdingTimeMinutes} min` : 'Direct'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 6: Temporal Analysis */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            6. Temporal Analysis
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Temporal velocity analysis indicates high-speed forward routing. Average holding time across intermediaries is {scenario.stats.avgHoldingTime}, with 94.3% value retention across the cycle.
          </p>
        </div>

        {/* Section 7: Detected Patterns */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            7. Detected Patterns
          </h2>
          <div className="flex flex-wrap gap-2">
            {c.detectedPatterns.map(p => (
              <span key={p} className="px-2.5 py-1 rounded bg-surface-secondary text-text-primary border border-border text-xs">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Section 8: Investigator Observations */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            8. Investigator Observations
          </h2>
          <div className="space-y-2">
            {notes.map(n => (
              <div key={n.id} className="p-2.5 rounded bg-surface-secondary border border-border space-y-1">
                <div className="flex justify-between text-[11px] text-text-muted">
                  <span className="font-semibold text-text-primary">{n.author}</span>
                  <span>{n.timestamp}</span>
                </div>
                <p className="text-text-secondary">{n.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: Evidence References & Sign-off */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider border-b border-border pb-1">
            9. Evidence References & Sign-off
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs text-text-secondary">
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Report Hash</span>
              <span className="font-mono text-text-primary text-[10px]">SHA256: 7f3b89a1c...</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Certified Officer</span>
              <span className="font-medium text-text-primary">{c.assignedInvestigator}</span>
            </div>
            <div>
              <span className="text-[10px] text-text-muted uppercase block">Recommended Action</span>
              <span className="font-semibold text-risk">File Suspicious Activity Report (SAR)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
