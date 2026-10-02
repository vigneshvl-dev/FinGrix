import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ChevronRight, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Layers,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useInvestigation } from '../context/InvestigationContext';
import { FLOW_ANALYTICS_DATA } from '../data/mockData';
import { ScenarioType } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentScenarioId, setSelectedCaseId, scenario } = useInvestigation();
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D'>('7D');
  const [instFilter, setInstFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const chartData = FLOW_ANALYTICS_DATA[timeRange];

  const handleOpenCase = (scenarioId: ScenarioType, caseId: string) => {
    setCurrentScenarioId(scenarioId);
    setSelectedCaseId(caseId);
    navigate(`/investigations/${caseId}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* 1. Page Title and Context Bar */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Financial Network Surveillance</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Cross-institutional surveillance ledger, automated topology heuristics, and active multi-bank cases.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/investigations/FG-2026-001')}
              className="neu-btn-primary px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Launch Graph Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Contextual metadata bar */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 neu-inset-sm px-4 py-2 rounded-xl">
          <span>Surveillance Window: <strong className="text-slate-200 font-mono">22 Sep – 28 Sep 2026</strong></span>
          <span className="text-slate-600">•</span>
          <span>Federated Nodes: <strong className="text-blue-400 font-mono">5 Core Banks</strong></span>
          <span className="text-slate-600">•</span>
          <span>Active Heuristic: <strong className="text-slate-200 font-medium">{scenario.name}</strong></span>
          <span className="text-slate-600">•</span>
          <span>Engine Sync: <strong className="text-emerald-400 font-mono">Real-time (18ms)</strong></span>
        </div>
      </div>

      {/* 2. Key Metrics Row (Neumorphic Cards with Tactile Elevation) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Txns Analyzed</span>
            <Activity className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono-numbers">
            12.48M
          </div>
          <div className="text-[11px] text-emerald-400 mt-1.5 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+4.2% volume</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Accounts Monitored</span>
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono-numbers">
            48,231
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5">
            5 inter-bank ledgers
          </div>
        </div>

        {/* Metric 3: Flagged Networks (Risk Red) */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all border-red-500/20">
          <div className="text-[11px] text-red-300 font-medium flex items-center justify-between">
            <span>Flagged Rings</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-red-400 mt-1 font-mono-numbers">
            173
          </div>
          <div className="text-[11px] text-red-400 mt-1.5 font-semibold">
            +12 high confidence
          </div>
        </div>

        {/* Metric 4: Flagged Accounts (Warning Amber) */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all border-amber-500/20">
          <div className="text-[11px] text-amber-300 font-medium flex items-center justify-between">
            <span>Flagged Accounts</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono-numbers">
            1,284
          </div>
          <div className="text-[11px] text-amber-400 mt-1.5 font-semibold">
            Quarantine review
          </div>
        </div>

        {/* Metric 5: Open Investigations */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Active Cases</span>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono-numbers">
            46
          </div>
          <div className="text-[11px] text-blue-400 mt-1.5 font-medium">
            Forensic ledgers active
          </div>
        </div>
      </div>

      {/* 3. Main Analytics Section: Transaction Activity */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Transaction Volume & Anomaly Flow
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Differential comparison of gross clearing volume versus flagged anomalous transactions.
            </p>
          </div>

          {/* Neumorphic Segmented Time Range Switch */}
          <div className="flex items-center gap-1 neu-inset p-1 rounded-xl text-xs font-medium">
            {(['7D', '30D', '90D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeRange === r
                    ? 'neu-raised text-white shadow-[2px_2px_6px_rgba(0,0,0,0.6),-1px_-1px_4px_rgba(255,255,255,0.05)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === '7D' ? '7 Days' : r === '30D' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 py-2 border-b border-white/[0.06] text-xs">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider font-mono">Filters:</span>
          
          <select
            value={instFilter}
            onChange={(e) => setInstFilter(e.target.value)}
            className="neu-input px-3 py-1.5 rounded-xl text-xs text-slate-200 cursor-pointer"
          >
            <option value="all">All Institutions</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="axis">Axis Bank</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="neu-input px-3 py-1.5 rounded-xl text-xs text-slate-200 cursor-pointer"
          >
            <option value="all">All Settlement Types</option>
            <option value="rtgs">RTGS High-Value</option>
            <option value="neft">NEFT Standard</option>
            <option value="imps">IMPS Instant</option>
            <option value="wire">Cross-Border Wire</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="neu-input px-3 py-1.5 rounded-xl text-xs text-slate-200 cursor-pointer"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical / High Severity</option>
            <option value="medium">Medium Flagged</option>
            <option value="normal">Normal Monitored</option>
          </select>

          <div className="ml-auto flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-1 bg-blue-500 inline-block rounded-full shadow-[0_0_6px_rgba(59,130,246,0.8)]"></span>
              Gross Volume
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-3 h-1 bg-red-500 inline-block rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]"></span>
              Suspicious Flow
            </span>
          </div>
        </div>

        {/* Clean Line Chart with Neumorphic Inset Frame */}
        <div className="neu-inset-sm p-4 rounded-xl h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }} />
              <YAxis 
                stroke="#64748B" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
                tickFormatter={(val) => `₹${(val / 10000000).toFixed(0)}Cr`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#141A28', 
                  borderColor: 'rgba(255, 255, 255, 0.12)', 
                  borderRadius: '12px',
                  fontSize: '12px',
                  boxShadow: '10px 10px 24px rgba(0, 0, 0, 0.8), -4px -4px 10px rgba(255, 255, 255, 0.04)',
                  color: '#F8FAFC'
                }}
                formatter={(val: any, name: any) => [
                  `₹${(Number(val) / 10000000).toFixed(2)} Cr`,
                  name === 'volume' ? 'Gross Volume' : 'Suspicious Flow'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#3B82F6" 
                strokeWidth={2.5}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="suspicious" 
                stroke="#EF4444" 
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Professional Insight text */}
        <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Forensic Heuristic: Concentrated velocity spike observed between 18:00–22:00 IST across private clearing hubs.</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500">15-minute inter-bank settlement</span>
        </div>
      </div>

      {/* 4. Detection Summary (Neumorphic Card Table) */}
      <div className="neu-card overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Detected Topology Patterns
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live automated graph analysis detecting smurfing rings, circular layering, and rapid funneling.
            </p>
          </div>
          <button 
            onClick={() => navigate('/detection')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Detection Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3 px-4">Pattern Signature</th>
                <th className="py-3 px-4 font-mono-numbers">Networks</th>
                <th className="py-3 px-4 font-mono-numbers">Accounts</th>
                <th className="py-3 px-4 font-mono-numbers">Aggregated Value</th>
                <th className="py-3 px-4">Surveillance Status</th>
                <th className="py-3 px-4">Last Detected</th>
                <th className="py-3 px-4 text-right">Workspace Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr 
                onClick={() => handleOpenCase('scenario-c-circular', 'FG-2026-001')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                  Circular Layering Loop
                </td>
                <td className="py-3 px-4 font-mono-numbers text-white">12</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">84</td>
                <td className="py-3 px-4 font-mono-numbers font-bold text-white">₹4.2 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Review Required
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">12 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Inspect Graph →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  Rapid Pass-Through Flow
                </td>
                <td className="py-3 px-4 font-mono-numbers text-white">27</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">146</td>
                <td className="py-3 px-4 font-mono-numbers font-bold text-white">₹7.8 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Review Required
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">34 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Inspect Graph →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  Smurfing Sub-Threshold Ring
                </td>
                <td className="py-3 px-4 font-mono-numbers text-white">18</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">231</td>
                <td className="py-3 px-4 font-mono-numbers font-bold text-white">₹2.1 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Review Required
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">1 hour ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Inspect Graph →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-a-legitimate', 'FG-2026-004')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  Corporate Payroll Settlement
                </td>
                <td className="py-3 px-4 font-mono-numbers text-white">42</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">612</td>
                <td className="py-3 px-4 font-mono-numbers font-bold text-white">₹31.4 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Monitored Normal
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">5 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-slate-400 font-semibold hover:text-white">View Details →</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Recent Active Investigations */}
      <div className="neu-card overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Active Investigation Dossiers
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned case files with collaborative multi-bank notes and evidence ledger snapshots.
            </p>
          </div>
          <button 
            onClick={() => navigate('/investigations')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>All Dossiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="neu-inset-sm border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3 px-4 font-mono">Case ID</th>
                <th className="py-3 px-4">Investigation Focus</th>
                <th className="py-3 px-4 font-mono-numbers">Institutions</th>
                <th className="py-3 px-4 font-mono-numbers">Accounts</th>
                <th className="py-3 px-4">Threat Level</th>
                <th className="py-3 px-4">Case Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr 
                onClick={() => handleOpenCase('scenario-c-circular', 'FG-2026-001')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-blue-400">FG-2026-0142</td>
                <td className="py-3 px-4 font-semibold text-white">Circular Fund Routing & Tax Avoidance</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">3 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">8 Entities</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
                    High Risk
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">Under Review</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">12 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Open Workspace →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-blue-400">FG-2026-0138</td>
                <td className="py-3 px-4 font-semibold text-white">Rapid Pass-Through Shell Network</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">4 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">15 Entities</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Medium Risk
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">Open Case</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">34 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Open Workspace →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-blue-400">FG-2026-0131</td>
                <td className="py-3 px-4 font-semibold text-white">Multiple Small-Value Mule Funnels</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">2 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">27 Entities</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Medium Risk
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">Open Case</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">2 hours ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Open Workspace →</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
