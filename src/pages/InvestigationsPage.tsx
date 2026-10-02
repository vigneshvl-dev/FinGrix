import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowRight,
  Plus,
  Briefcase
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
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Investigation Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Active cross-institution case dossiers, evidentiary networks, and AML forensic graph topologies.
          </p>
        </div>

        <button 
          onClick={() => handleOpenCase(cases[0])}
          className="neu-btn-primary px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-sm transition self-start flex items-center gap-2 cursor-pointer"
        >
          <span>Open Lead Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter and Search Bar in Neumorphic Card */}
      <div className="neu-card p-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Case ID, network, or institution..."
            className="neu-input w-full pl-9 pr-3 py-2 rounded-xl text-xs text-white placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neu-input px-3 py-2 rounded-xl text-slate-200 cursor-pointer"
          >
            <option value="all">All Case Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Active Investigation">Active Investigation</option>
            <option value="Escalated to FIU">Escalated to FIU</option>
            <option value="Closed - Cleared">Closed - Cleared</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="neu-input px-3 py-2 rounded-xl text-slate-200 cursor-pointer"
          >
            <option value="all">All Threat Priorities</option>
            <option value="Critical">Critical Priority</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Neumorphic Cases Table */}
      <div className="neu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Case Dossier</th>
                <th className="py-3.5 px-4">Network Ref</th>
                <th className="py-3.5 px-4">Investigation Title & Scope</th>
                <th className="py-3.5 px-4 font-mono-numbers">Accounts</th>
                <th className="py-3.5 px-4 font-mono-numbers">Transfers</th>
                <th className="py-3.5 px-4 font-mono-numbers">Gross Flow</th>
                <th className="py-3.5 px-4">Indicators</th>
                <th className="py-3.5 px-4">Case Status</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCases.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleOpenCase(c)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-400 whitespace-nowrap">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono text-white font-medium">{c.networkId}</span>
                    <span className="block text-[10px] text-slate-400">{c.leadInstitution}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-white truncate">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {c.summary}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono-numbers text-slate-300 whitespace-nowrap">
                    {c.accountsCount} nodes
                  </td>
                  <td className="py-3.5 px-4 font-mono-numbers text-slate-300 whitespace-nowrap">
                    {c.transactionsCount} txns
                  </td>
                  <td className="py-3.5 px-4 font-mono-numbers font-bold text-white whitespace-nowrap">
                    ₹{(c.totalFlow / 10000000).toFixed(2)} Cr
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      c.riskIndicatorsCount > 3
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {c.riskIndicatorsCount} flagged
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      c.status === 'Under Review'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : c.status === 'Escalated to FIU'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap">
                    {c.lastUpdated}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span className="neu-btn px-2.5 py-1 rounded-lg text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 cursor-pointer">
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

export default InvestigationsPage;
