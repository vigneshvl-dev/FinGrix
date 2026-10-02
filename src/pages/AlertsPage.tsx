import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  X, 
  ArrowRight, 
  Filter,
  ShieldAlert,
  Bell
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { AlertItem } from '../types';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, setCurrentScenarioId, setSelectedCaseId } = useInvestigation();
  const [alertList, setAlertList] = useState<AlertItem[]>(alerts);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, status: 'Dismissed' } : a));
  };

  const handleAssign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, status: 'Assigned' } : a));
  };

  const handleInvestigate = (alert: AlertItem) => {
    setCurrentScenarioId(alert.scenarioType);
    if (alert.caseId) {
      setSelectedCaseId(alert.caseId);
      navigate(`/investigations/${alert.caseId}`);
    } else {
      navigate('/investigations');
    }
  };

  const filtered = alertList.filter(a => {
    if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-blue-400" />
            <span>Compliance Surveillance Alerts</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time heuristic alerts generated across multi-bank cross-clearing channels.
          </p>
        </div>

        {/* Filter Controls with Neumorphic styling */}
        <div className="flex items-center gap-2.5 text-xs">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="neu-input px-3 py-1.5 rounded-xl text-slate-200 cursor-pointer"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">High / Critical</option>
            <option value="high">Medium-High</option>
            <option value="warning">Warning / Low</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="neu-input px-3 py-1.5 rounded-xl text-slate-200 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="New">Open</option>
            <option value="Under Investigation">Investigating</option>
            <option value="Assigned">Assigned</option>
            <option value="Dismissed">Resolved / Dismissed</option>
          </select>
        </div>
      </div>

      {/* Neumorphic Compliance Inbox Table */}
      <div className="neu-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3.5 px-4">Alert Ref</th>
                <th className="py-3.5 px-4">Pattern Signature</th>
                <th className="py-3.5 px-4">Involved Accounts</th>
                <th className="py-3.5 px-4 font-mono-numbers">Flagged Value</th>
                <th className="py-3.5 px-4">Origin Node</th>
                <th className="py-3.5 px-4">Threat Level</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((alert) => (
                <tr
                  key={alert.id}
                  onClick={() => handleInvestigate(alert)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-400 whitespace-nowrap">
                    {alert.id}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                    {alert.pattern}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                    {alert.involvedAccounts[0]} ({alert.accountsCount} nodes)
                  </td>

                  <td className="py-3.5 px-4 font-mono-numbers font-bold text-white whitespace-nowrap">
                    ₹{(alert.amount / 100000).toFixed(2)}L
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {alert.institution}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {alert.severity === 'critical' ? 'Critical' : 'Medium'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 font-mono whitespace-nowrap">
                    {alert.timestamp.split(' ')[1]}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="text-slate-300 font-medium">
                      {alert.status === 'New' ? 'Open' : alert.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleInvestigate(alert)}
                        className="neu-btn px-2.5 py-1 rounded-lg text-blue-400 hover:text-blue-300 text-xs font-semibold cursor-pointer"
                      >
                        Investigate
                      </button>
                      <button
                        onClick={(e) => handleDismiss(alert.id, e)}
                        className="neu-btn px-2 py-1 rounded-lg text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
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

export default AlertsPage;
