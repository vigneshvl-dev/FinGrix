import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftRight, 
  Search, 
  Filter, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Download,
  Building2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { Transaction } from '../types';

export const TransactionExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const { scenario, setSelectedTransaction } = useInvestigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [railFilter, setRailFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = scenario.transactions.filter(t => {
    if (railFilter !== 'all' && t.method.toLowerCase() !== railFilter.toLowerCase()) return false;
    if (statusFilter === 'suspicious' && !t.isSuspicious) return false;
    if (statusFilter === 'normal' && t.isSuspicious) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        t.id.toLowerCase().includes(term) ||
        t.source.toLowerCase().includes(term) ||
        t.target.toLowerCase().includes(term) ||
        t.referenceNumber.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleInspectTxn = (txn: Transaction) => {
    setSelectedTransaction(txn);
    navigate('/investigations/INV-2026-0173');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>INTER-BANK CLEARING EXPLORER</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Transaction Ledger Explorer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, filter, and inspect individual settlement transactions across RTGS, NEFT, IMPS, and UPI rails with risk scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="neu-inset-sm px-3 py-1.5 rounded-xl text-xs font-mono text-slate-300">
            Total Ingested: <strong className="text-white font-mono-numbers">12.48M</strong>
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="neu-card p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Txn ID, source, target, or UTR..."
            className="neu-input w-full pl-9 pr-3 py-2 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={railFilter}
            onChange={(e) => setRailFilter(e.target.value)}
            className="neu-input px-3 py-2 rounded-xl text-slate-200 cursor-pointer font-mono"
          >
            <option value="all">All Payment Rails</option>
            <option value="imps">IMPS Instant</option>
            <option value="rtgs">RTGS High-Value</option>
            <option value="neft">NEFT Batch</option>
            <option value="upi">UPI Retail</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neu-input px-3 py-2 rounded-xl text-slate-200 cursor-pointer font-mono"
          >
            <option value="all">All Risk Categories</option>
            <option value="suspicious">Flagged Suspicious Only</option>
            <option value="normal">Normal Cleared</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="neu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase">
              <tr>
                <th className="py-3 px-4">Transaction UTR</th>
                <th className="py-3 px-4">Source Entity</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Settlement Rail</th>
                <th className="py-3 px-4">Amount (INR)</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Risk Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTransactions.map((t) => (
                <tr 
                  key={t.id}
                  onClick={() => handleInspectTxn(t)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-blue-400">{t.id}</td>
                  <td className="py-3 px-4 text-white font-semibold">{t.source}</td>
                  <td className="py-3 px-4 text-white font-semibold">{t.target}</td>
                  <td className="py-3 px-4 text-slate-300">
                    <span className="neu-inset-sm px-2 py-0.5 rounded-md text-[10px] text-cyan-400">
                      {t.method}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white font-mono-numbers">
                    ₹{(t.amount / 1000).toLocaleString('en-IN')}k
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">{t.displayTime} IST</td>
                  <td className="py-3 px-4">
                    {t.isSuspicious ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span>Suspicious</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 w-fit">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-blue-400 font-semibold hover:underline">
                      Graph Drilldown →
                    </span>
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

export default TransactionExplorerPage;
