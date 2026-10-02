import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  ShieldAlert, 
  ArrowRight, 
  Building2, 
  User, 
  TrendingUp, 
  Search, 
  Share2, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const AccountClustersPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedCaseId, setCurrentScenarioId } = useInvestigation();
  const [filterType, setFilterType] = useState<string>('all');

  const clusters = [
    {
      id: 'CLUSTER-173',
      name: 'Suspicious Network #173 (Multi-Bank Circular Loop)',
      caseId: 'INV-2026-0173',
      scenarioType: 'scenario-c-circular' as const,
      riskLevel: 'Critical',
      riskScore: 94,
      accountsCount: 27,
      institutionsCount: 5,
      totalVolume: '₹4.82 Cr',
      pattern: 'Circular Round-Tripping',
      density: 0.88,
      leadBank: 'HDFC Bank',
      status: 'Active Investigation'
    },
    {
      id: 'CLUSTER-142',
      name: 'Rapid Multi-Hop Shell Conduit Syndicate',
      caseId: 'FG-2026-002',
      scenarioType: 'scenario-b-rapid' as const,
      riskLevel: 'Critical',
      riskScore: 91,
      accountsCount: 12,
      institutionsCount: 4,
      totalVolume: '₹1.45 Cr',
      pattern: 'Linear Pass-Through',
      density: 0.76,
      leadBank: 'ICICI Bank',
      status: 'Active Investigation'
    },
    {
      id: 'CLUSTER-088',
      name: 'Sub-Threshold Micro-Smurfing Mule Ring',
      caseId: 'FG-2026-003',
      scenarioType: 'scenario-d-smurfing' as const,
      riskLevel: 'High',
      riskScore: 86,
      accountsCount: 24,
      institutionsCount: 3,
      totalVolume: '₹84.2 Lakh',
      pattern: 'Structuring / Fan-In',
      density: 0.82,
      leadBank: 'Axis Bank',
      status: 'Under Review'
    },
    {
      id: 'CLUSTER-054',
      name: 'Dormant Student Account Funneling Network',
      caseId: 'FG-2026-002',
      scenarioType: 'scenario-b-rapid' as const,
      riskLevel: 'High',
      riskScore: 82,
      accountsCount: 16,
      institutionsCount: 3,
      totalVolume: '₹62.8 Lakh',
      pattern: 'Mule Funneling',
      density: 0.69,
      leadBank: 'State Bank of India',
      status: 'Quarantined'
    }
  ];

  const handleOpenCluster = (cluster: typeof clusters[0]) => {
    setSelectedCaseId(cluster.caseId);
    setCurrentScenarioId(cluster.scenarioType);
    navigate(`/investigations/${cluster.caseId}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>TOPOLOGICAL GRAPH CLUSTERING</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Account Clusters & Syndicates</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            High-density graph communities, coordinated mule rings, and shell company clusters identified via Louvain community detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="neu-inset-sm px-3 py-1.5 rounded-xl text-xs font-mono text-red-400 font-bold border border-red-500/30">
            173 Suspicious Clusters Active
          </span>
        </div>
      </div>

      {/* Cluster Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map((c) => (
          <div
            key={c.id}
            onClick={() => handleOpenCluster(c)}
            className="neu-card p-5 space-y-4 hover:border-blue-500/40 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-blue-400 neu-inset-sm px-2.5 py-1 rounded-lg">
                  {c.id}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {c.riskLevel} Risk ({c.riskScore}/100)
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{c.leadBank}</span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition">
                {c.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Pattern: {c.pattern} • Louvain Density: {c.density}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-white/[0.06]">
              <div className="neu-inset-sm p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] font-mono block">Volume</span>
                <span className="font-bold text-white font-mono-numbers mt-0.5 block">{c.totalVolume}</span>
              </div>
              <div className="neu-inset-sm p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] font-mono block">Accounts</span>
                <span className="font-bold text-cyan-400 font-mono-numbers mt-0.5 block">{c.accountsCount} nodes</span>
              </div>
              <div className="neu-inset-sm p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] font-mono block">Banks</span>
                <span className="font-bold text-amber-400 font-mono-numbers mt-0.5 block">{c.institutionsCount} institutions</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-400 text-[11px] font-mono">Case: {c.caseId}</span>
              <span className="text-blue-400 font-semibold flex items-center gap-1 hover:underline">
                <span>Inspect Cluster Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountClustersPage;
