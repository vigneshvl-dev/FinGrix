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
  Activity,
  Repeat,
  Zap,
  Clock,
  CheckCircle2,
  FileText,
  Sliders,
  Share2,
  Database
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
import { FLOW_ANALYTICS_DATA, TEMPORAL_CHRONOLOGY, BENIGN_COMMERCE_ITEMS } from '../data/mockData';
import { ScenarioType } from '../types';
import { HeroInvestigationGraph } from '../components/network/HeroInvestigationGraph';

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
      {/* 1. Page Title and Context Bar (Requirement 1) */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Financial Crime Investigation Center</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Trace coordinated fund flows, detect laundering patterns, and build evidence across financial institutions.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/data-sources')}
              className="neu-btn px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>Data Ingestion</span>
            </button>
            <button
              onClick={() => handleOpenCase('scenario-c-circular', 'INV-2026-0173')}
              className="neu-btn-primary px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer text-white"
            >
              <span>Launch Graph Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Contextual metadata bar */}
        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400 neu-inset-sm px-4 py-2 rounded-xl">
          <span>Investigation Window: <strong className="text-slate-200 font-mono">18 Sep – 28 Sep 2026</strong></span>
          <span className="text-slate-600">•</span>
          <span>Federated Nodes: <strong className="text-blue-400 font-mono">5 Core Banks</strong></span>
          <span className="text-slate-600">•</span>
          <span>Active Pattern: <strong className="text-slate-200 font-medium">Circular + Rapid Pass-Through</strong></span>
          <span className="text-slate-600">•</span>
          <span>Heuristic Engine Sync: <strong className="text-emerald-400 font-mono">Real-time (18ms)</strong></span>
        </div>
      </div>

      {/* 2. Key Metrics Row - Exactly as Recommended in Prompt 3 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric 1: Transactions Processed */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Transactions Processed</span>
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

        {/* Metric 2: Entities Identified */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Entities Identified</span>
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono-numbers">
            48,231
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5">
            5 inter-bank ledgers
          </div>
        </div>

        {/* Metric 3: Suspicious Networks (Prompt: +12 detected today) */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all border-red-500/20">
          <div className="text-[11px] text-red-300 font-medium flex items-center justify-between">
            <span>Suspicious Networks</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold text-red-400 mt-1 font-mono-numbers">
            173
          </div>
          <div className="text-[11px] text-red-400 mt-1.5 font-semibold">
            +12 detected today
          </div>
        </div>

        {/* Metric 4: High-Risk Accounts (Prompt: 87 awaiting review) */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all border-amber-500/20">
          <div className="text-[11px] text-amber-300 font-medium flex items-center justify-between">
            <span>High-Risk Accounts</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono-numbers">
            1,284
          </div>
          <div className="text-[11px] text-amber-400 mt-1.5 font-semibold">
            87 awaiting review
          </div>
        </div>

        {/* Metric 5: Active Investigations */}
        <div className="neu-card p-4 hover:translate-y-[-2px] transition-all">
          <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
            <span>Active Investigations</span>
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white mt-1 font-mono-numbers">
            46
          </div>
          <div className="text-[11px] text-blue-400 mt-1.5 font-medium">
            14 escalated to FIU
          </div>
        </div>
      </div>

      {/* 3. HERO: Interactive Fund-Flow Graph (Requirement 4 & 14) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              <span>Interactive Fund-Flow Investigation Graph</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live directional topology showing cross-bank fund movement, shell intermediaries, and circular return cycles. Click any node to open its forensic profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/fund-flow')}
              className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Multi-Hop Fund Trace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Embedded Interactive Graph Canvas */}
        <HeroInvestigationGraph />
      </div>

      {/* 4. Middle Section: Detection Patterns & Investigation Timeline (Requirement 5, 6, 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Patterns Summary */}
        <div className="neu-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Detection Patterns Summary</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated multi-heuristic pattern recognition across 173 active networks.
              </p>
            </div>
            <button
              onClick={() => navigate('/detection')}
              className="text-xs text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Detection Center</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Pattern 1: Circular */}
            <div 
              onClick={() => handleOpenCase('scenario-c-circular', 'INV-2026-0173')}
              className="neu-btn p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:border-red-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-red-400">
                  <Repeat className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>Circular / Round-Tripping</span>
                    <span className="font-mono text-[10px] text-slate-400">A &rarr; B &rarr; C &rarr; D &rarr; A</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    4-hop closed cycle • 94.3% value retention • 26 min elapsed
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-red-400 font-mono-numbers block">42</span>
                <span className="text-[10px] font-mono text-slate-400">loops active</span>
              </div>
            </div>

            {/* Pattern 2: Mule / Rapid Pass-Through */}
            <div 
              onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
              className="neu-btn p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>Mule / Rapid Pass-Through</span>
                    <span className="font-mono text-[10px] text-slate-400">A &rarr; B &rarr; C &rarr; D &rarr; E</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    17 txns • 5 accounts • 4 banks • ₹82.4L in 3h 42m
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-amber-400 font-mono-numbers block">31</span>
                <span className="text-[10px] font-mono text-slate-400">conduits flagged</span>
              </div>
            </div>

            {/* Pattern 3: Smurfing */}
            <div 
              onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
              className="neu-btn p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-500/40 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs flex items-center gap-2">
                    <span>Potential Structuring / Smurfing</span>
                    <span className="font-mono text-[10px] text-slate-400">A &rarr; (B, C, D, E) &lt; ₹10L</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Sub-threshold fan-in structuring • 4 recipient accounts • 44m window
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-cyan-400 font-mono-numbers block">18</span>
                <span className="text-[10px] font-mono text-slate-400">clusters detected</span>
              </div>
            </div>

            {/* Benign High-Volume Commerce Filter */}
            <div 
              onClick={() => handleOpenCase('scenario-a-legitimate', 'FG-2026-004')}
              className="neu-btn p-3 rounded-xl flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition bg-emerald-500/5 border border-emerald-500/20"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-emerald-300 text-xs">Benign High-Volume Commerce Exemption</span>
                  <p className="text-[10px] text-slate-400">
                    64 legitimate merchant settlement & payroll networks exempted from false AML alerts
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">64 Exempt</span>
            </div>
          </div>
        </div>

        {/* Investigation Timeline (Requirement 6: Sequence with velocity & burst indicators) */}
        <div className="neu-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Investigation Timeline (Active Case #173)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Sequential fund movements, velocity intervals, and cross-bank transitions.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-400 neu-inset-sm px-2.5 py-0.5 rounded-lg">
              Avg Hop: 4.8 min
            </span>
          </div>

          <div className="space-y-2">
            {TEMPORAL_CHRONOLOGY.map((step, idx) => (
              <div 
                key={idx}
                className="neu-inset-sm p-2.5 rounded-xl flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cyan-400 text-[11px] w-10">{step.time}</span>
                  <div className="min-w-0">
                    <span className="font-semibold text-white">{step.source}</span>
                    <span className="text-slate-500 mx-1.5">&rarr;</span>
                    <span className="font-semibold text-white">{step.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-400 font-mono-numbers">{step.amountFormatted}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold ${
                    step.velocityAlert 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                      : 'bg-black/30 text-slate-400'
                  }`}>
                    {step.holdingTime}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Temporal Indicators Bar matching prompt */}
          <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono">
            <div className="neu-inset-sm p-2 rounded-lg">
              <span className="text-slate-500 block">VELOCITY</span>
              <span className="text-amber-400 font-bold">High (4.8m interval)</span>
            </div>
            <div className="neu-inset-sm p-2 rounded-lg">
              <span className="text-slate-500 block">BURST DETECTED</span>
              <span className="text-red-400 font-bold">5 txns in 69 min</span>
            </div>
            <div className="neu-inset-sm p-2 rounded-lg">
              <span className="text-slate-500 block">REPEATED CYCLES</span>
              <span className="text-white font-bold">2 Complete Loops</span>
            </div>
            <div className="neu-inset-sm p-2 rounded-lg">
              <span className="text-slate-500 block">CROSS-BANK HOPS</span>
              <span className="text-cyan-400 font-bold">4 Institutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Lower Section: Transaction Volume & Anomaly Flow Chart (Requirement 14) */}
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
                    ? 'neu-raised text-white shadow-sm'
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
            <option value="all">All Settlement Rails</option>
            <option value="rtgs">RTGS High-Value</option>
            <option value="neft">NEFT Standard</option>
            <option value="imps">IMPS Instant</option>
            <option value="wire">Cross-Border Wire</option>
          </select>

          <div className="ml-auto flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-1 bg-blue-500 inline-block rounded-full"></span>
              Gross Volume
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-3 h-1 bg-red-500 inline-block rounded-full"></span>
              Suspicious Flow
            </span>
          </div>
        </div>

        {/* Clean Line Chart */}
        <div className="neu-inset-sm p-4 rounded-xl h-60 w-full">
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
      </div>

      {/* 6. Benign Activity Classification (Requirement 8) */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Activity Classification & Benign Commerce Filtering</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Prevents high-volume legitimate businesses from being misclassified. Distinguishes normal commerce from layering rings.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 neu-inset-sm px-3 py-1 rounded-xl">
            Heuristic Rule: Not Every High-Volume Account Is Suspicious
          </span>
        </div>

        {/* 4 Classification Categories matching prompt 8 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="neu-inset-sm p-3 rounded-xl border border-emerald-500/20">
            <span className="text-emerald-400 font-bold block mb-1">1. Normal Commerce</span>
            <span className="text-slate-300 text-[11px] leading-relaxed">
              Standard retail UPI, salary fan-outs & verified consumer utility settlements.
            </span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl border border-cyan-500/20">
            <span className="text-cyan-400 font-bold block mb-1">2. High-Volume Legitimate</span>
            <span className="text-slate-300 text-[11px] leading-relaxed">
              Wholesale FMCG, merchant acquirers, corporate tax & supply chain batch settlements.
            </span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl border border-amber-500/20">
            <span className="text-amber-400 font-bold block mb-1">3. Unusual (Under Review)</span>
            <span className="text-slate-300 text-[11px] leading-relaxed">
              Temporary spikes in turnover, new counterparties, or sudden velocity increases.
            </span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl border border-red-500/20">
            <span className="text-red-400 font-bold block mb-1">4. Suspicious (Flagged AML)</span>
            <span className="text-slate-300 text-[11px] leading-relaxed">
              Closed circular loops, zero asset retention, and rapid pass-through conduits.
            </span>
          </div>
        </div>

        {/* Real Example from Prompt 8 */}
        <div className="neu-card p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Example: Benign High-Volume Commerce (Reliance Retail Settlement)</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              STATUS: EXEMPTED FROM AML ACTION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 text-[11px]">
            <div>
              <span className="text-slate-400 font-mono block">EXEMPTION REASONING:</span>
              <ul className="space-y-1 mt-1">
                <li>&bull; <strong className="text-white">Recurring merchant settlement pattern</strong> with regular EOD settlement cycles</li>
                <li>&bull; <strong className="text-white">Consistent counterparties</strong> with 24+ months of continuous trade history</li>
                <li>&bull; <strong className="text-white">Stable transaction intervals</strong> occurring on weekdays between 23:30–23:59 IST</li>
                <li>&bull; <strong className="text-white">No circular fund movement detected</strong> across all 5 federated inter-bank ledgers</li>
              </ul>
            </div>
            <div className="neu-inset-sm p-3 rounded-xl font-mono text-[10px] space-y-1 text-slate-400">
              <div>Entity: Reliance Retail Wholesale Settlement Ledgers</div>
              <div>Monthly Flow: ₹342.8 Cr • Direct Counterparties: 148 Verified Vendors</div>
              <div>Statutory KYC: Audited MCA Filings + GST E-Way Bill Cross-Validation</div>
              <div className="text-emerald-400 font-semibold pt-1">
                &check; Machine Learning Classifier Confidence: 99.1% Legitimate Commercial Flow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Active Investigation Dossiers (Featuring CASE #INV-2026-0173) */}
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
              {/* Highlighted Case #INV-2026-0173 from Prompt 9 */}
              <tr 
                onClick={() => handleOpenCase('scenario-c-circular', 'INV-2026-0173')}
                className="hover:bg-blue-500/10 cursor-pointer transition-colors bg-blue-500/5"
              >
                <td className="py-3 px-4 font-mono font-extrabold text-blue-400">INV-2026-0173</td>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Suspicious Network #173 (Circular + Rapid Pass-Through)</span>
                </td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">5 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">27 Accounts</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    CRITICAL (₹4.82 Cr)
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">Active Investigation</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">4 mins ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-bold hover:underline">Open Workspace &rarr;</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-blue-400">FG-2026-002</td>
                <td className="py-3 px-4 font-semibold text-white">Linear Multi-Hop Mule Conduit Ring</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">4 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">12 Entities</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    High Risk
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">Active Investigation</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">34 mins ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Open Workspace &rarr;</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
                className="hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-bold text-blue-400">FG-2026-003</td>
                <td className="py-3 px-4 font-semibold text-white">Sub-Threshold Fan-In Smurfing Cluster</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">3 Banks</td>
                <td className="py-3 px-4 font-mono-numbers text-slate-300">24 Entities</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    High Risk
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300">Escalated to FIU</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">2 hours ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-blue-400 font-semibold hover:underline">Open Workspace &rarr;</span>
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
