import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { InvestigationCase } from '../types';

export const InvestigationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, setCurrentScenarioId, setSelectedCaseId } = useInvestigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredCases = cases.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && c.priority !== priorityFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        c.id.toLowerCase().includes(term) ||
        c.title.toLowerCase().includes(term) ||
        c.networkId.toLowerCase().includes(term) ||
        c.leadInstitution.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const handleOpenCase = (c: InvestigationCase) => {
    setCurrentScenarioId(c.scenarioType);
    setSelectedCaseId(c.id);
    navigate(`/investigations/${c.id}`);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Investigation Center
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Active forensic investigation dossiers and cross-institution financial networks.
          </p>
        </div>

        <button 
          onClick={() => handleOpenCase(cases[0])}
          className="px-3.5 py-2 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold shadow-sm transition self-start"
        >
          Open active workspace
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-border shadow-card flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Case ID, network, or institution..."
            className="w-full bg-surface-secondary border border-border rounded pl-9 pr-3 py-1.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-border text-text-secondary rounded px-3 py-1.5 focus:outline-none focus:border-brand"
          >
            <option value="all">All statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Active Investigation">Active Investigation</option>
            <option value="Escalated to FIU">Escalated to FIU</option>
            <option value="Closed - Cleared">Closed - Cleared</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-white border border-border text-text-secondary rounded px-3 py-1.5 focus:outline-none focus:border-brand"
          >
            <option value="all">All priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Professional Cases Table */}
      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-semibold text-text-muted uppercase">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Network</th>
                <th className="py-3 px-4">Investigation Title</th>
                <th className="py-3 px-4 font-mono-numbers">Accounts</th>
                <th className="py-3 px-4 font-mono-numbers">Transactions</th>
                <th className="py-3 px-4 font-mono-numbers">Flow Volume</th>
                <th className="py-3 px-4">Risk Indicators</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleOpenCase(c)}
                  className="hover:bg-surface-hover cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-semibold text-brand whitespace-nowrap">
                    {c.id}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-mono text-text-primary font-medium">{c.networkId}</span>
                    <span className="block text-[11px] text-text-muted">{c.leadInstitution}</span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-medium text-text-primary truncate">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-text-secondary truncate mt-0.5">
                      {c.summary}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono-numbers text-text-secondary whitespace-nowrap">
                    {c.accountsCount}
                  </td>
                  <td className="py-3 px-4 font-mono-numbers text-text-secondary whitespace-nowrap">
                    {c.transactionsCount}
                  </td>
                  <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary whitespace-nowrap">
                    ₹{(c.totalFlow / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      c.riskIndicatorsCount > 3
                        ? 'bg-risk-subtle text-risk border-risk-border'
                        : 'bg-success-subtle text-success border-success-border'
                    }`}>
                      {c.riskIndicatorsCount} indicators
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      c.status === 'Under Review'
                        ? 'bg-warning-subtle text-warning border-warning-border'
                        : c.status === 'Escalated to FIU'
                          ? 'bg-risk-subtle text-risk border-risk-border'
                          : 'bg-success-subtle text-success border-success-border'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-text-muted whitespace-nowrap">
                    {c.lastUpdated}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span className="text-brand font-medium hover:underline inline-flex items-center gap-1">
                      Workspace <ChevronRight className="w-3.5 h-3.5" />
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
