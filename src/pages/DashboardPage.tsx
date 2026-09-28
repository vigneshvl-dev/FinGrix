import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ChevronRight, 
  ArrowRight
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
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* 1. Page Title and Context Bar */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Financial Network Overview
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Monitor transaction activity, detected patterns, and active investigations.
        </p>

        {/* Contextual metadata bar */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted border-t border-border pt-2.5">
          <span>Data period: <strong className="text-text-secondary font-medium">22 Sep – 28 Sep 2026</strong></span>
          <span>•</span>
          <span>Institutions: <strong className="text-text-secondary font-medium">5</strong></span>
          <span>•</span>
          <span>Dataset: <strong className="text-text-secondary font-medium">{scenario.name}</strong></span>
          <span>•</span>
          <span>Last analysis: <strong className="text-text-secondary font-medium">2 minutes ago</strong></span>
        </div>
      </div>

      {/* 2. Key Metrics Row (4-5 Clean Metric Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">
            Transactions analyzed
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1 font-mono-numbers">
            12.48M
          </div>
          <div className="text-xs text-success mt-1.5 font-medium">
            +4.2% this period
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">
            Accounts analyzed
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1 font-mono-numbers">
            48,231
          </div>
          <div className="text-xs text-text-muted mt-1.5">
            Multi-bank coverage
          </div>
        </div>

        {/* Metric 3: Flagged Networks (Risk Red) */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">
            Flagged networks
          </div>
          <div className="text-2xl font-bold text-risk mt-1 font-mono-numbers">
            173
          </div>
          <div className="text-xs text-risk mt-1.5 font-medium">
            +12 this period
          </div>
        </div>

        {/* Metric 4: Flagged Accounts (Warning Amber) */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">
            Flagged accounts
          </div>
          <div className="text-2xl font-bold text-warning mt-1 font-mono-numbers">
            1,284
          </div>
          <div className="text-xs text-warning mt-1.5 font-medium">
            Requires review
          </div>
        </div>

        {/* Metric 5: Open Investigations */}
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">
            Open investigations
          </div>
          <div className="text-2xl font-bold text-text-primary mt-1 font-mono-numbers">
            46
          </div>
          <div className="text-xs text-text-secondary mt-1.5">
            Active case files
          </div>
        </div>
      </div>

      {/* 3. Main Analytics Section: Transaction Activity */}
      <div className="bg-white rounded-card border border-border shadow-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Transaction Activity
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Comparison of total transaction volume against flagged suspicious flow.
            </p>
          </div>

          {/* Time range controls */}
          <div className="flex items-center gap-1 bg-surface-secondary p-0.5 rounded border border-border text-xs">
            {(['7D', '30D', '90D'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  timeRange === r
                    ? 'bg-white text-text-primary shadow-sm font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {r === '7D' ? '7 days' : r === '30D' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 py-3 border-b border-border text-xs">
          <span className="text-text-muted text-[11px] font-semibold uppercase tracking-wider">Filters:</span>
          
          <select
            value={instFilter}
            onChange={(e) => setInstFilter(e.target.value)}
            className="bg-white border border-border rounded px-2.5 py-1 text-text-secondary focus:outline-none focus:border-brand"
          >
            <option value="all">All institutions</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="axis">Axis Bank</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-white border border-border rounded px-2.5 py-1 text-text-secondary focus:outline-none focus:border-brand"
          >
            <option value="all">All transaction types</option>
            <option value="rtgs">RTGS</option>
            <option value="neft">NEFT</option>
            <option value="imps">IMPS</option>
            <option value="wire">Wire</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-white border border-border rounded px-2.5 py-1 text-text-secondary focus:outline-none focus:border-brand"
          >
            <option value="all">All risk levels</option>
            <option value="critical">High / Critical</option>
            <option value="medium">Medium</option>
            <option value="normal">Normal</option>
          </select>

          <div className="ml-auto flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-3 h-0.5 bg-brand inline-block rounded"></span>
              Total transaction volume
            </span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <span className="w-3 h-0.5 bg-risk inline-block rounded"></span>
              Flagged transaction volume
            </span>
          </div>
        </div>

        {/* Clean Line Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={{ stroke: '#D9E0E8' }} />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: '#D9E0E8' }}
                tickFormatter={(val) => `₹${(val / 10000000).toFixed(0)}Cr`} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  borderColor: '#D9E0E8', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  color: '#172033'
                }}
                formatter={(val: any, name: any) => [
                  `₹${(Number(val) / 10000000).toFixed(2)} Cr`,
                  name === 'volume' ? 'Total Volume' : 'Flagged Volume'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="volume" 
                stroke="#1769E0" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="suspicious" 
                stroke="#D92D20" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Professional Insight text */}
        <div className="mt-3 pt-3 border-t border-border text-xs text-text-secondary flex items-center justify-between">
          <span>Insight: Flagged transaction activity increased during the final 24-hour period.</span>
          <span className="text-[11px] text-text-muted">Standard 15-minute settlement aggregation</span>
        </div>
      </div>

      {/* 4. Detection Summary (Clean Table) */}
      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Detected Patterns
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Summary of automated topological and temporal detection engines.
            </p>
          </div>
          <button 
            onClick={() => navigate('/detection')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
          >
            Detection center <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-semibold text-text-muted uppercase">
              <tr>
                <th className="py-2.5 px-4">Pattern</th>
                <th className="py-2.5 px-4 font-mono-numbers">Networks</th>
                <th className="py-2.5 px-4 font-mono-numbers">Accounts</th>
                <th className="py-2.5 px-4 font-mono-numbers">Transaction Value</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Last Detected</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr 
                onClick={() => handleOpenCase('scenario-c-circular', 'FG-2026-001')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-medium text-text-primary">
                  Circular flow
                </td>
                <td className="py-3 px-4 font-mono-numbers text-text-primary">12</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">84</td>
                <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary">₹4.2 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                    Review
                  </span>
                </td>
                <td className="py-3 px-4 text-text-secondary">12 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium hover:underline">View network →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-medium text-text-primary">
                  Rapid pass-through
                </td>
                <td className="py-3 px-4 font-mono-numbers text-text-primary">27</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">146</td>
                <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary">₹7.8 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                    Review
                  </span>
                </td>
                <td className="py-3 px-4 text-text-secondary">34 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium hover:underline">View network →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-medium text-text-primary">
                  Smurfing pattern
                </td>
                <td className="py-3 px-4 font-mono-numbers text-text-primary">18</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">231</td>
                <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary">₹2.1 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                    Review
                  </span>
                </td>
                <td className="py-3 px-4 text-text-secondary">1 hour ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium hover:underline">View network →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-a-legitimate', 'FG-2026-004')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-medium text-text-primary">
                  Legitimate high-volume activity
                </td>
                <td className="py-3 px-4 font-mono-numbers text-text-primary">42</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">612</td>
                <td className="py-3 px-4 font-mono-numbers font-semibold text-text-primary">₹31.4 Cr</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-success-subtle text-success border border-success-border">
                    Monitored
                  </span>
                </td>
                <td className="py-3 px-4 text-text-secondary">5 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-text-secondary font-medium hover:text-text-primary">View details →</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Recent Investigations (Clean Table) */}
      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-text-primary">
              Recent Investigations
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Active forensic case files assigned to investigators.
            </p>
          </div>
          <button 
            onClick={() => navigate('/investigations')}
            className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
          >
            All investigations <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary border-b border-border text-[11px] font-semibold text-text-muted uppercase">
              <tr>
                <th className="py-2.5 px-4 font-mono">Case ID</th>
                <th className="py-2.5 px-4">Description</th>
                <th className="py-2.5 px-4 font-mono-numbers">Institutions</th>
                <th className="py-2.5 px-4 font-mono-numbers">Accounts</th>
                <th className="py-2.5 px-4">Risk Level</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Updated</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr 
                onClick={() => handleOpenCase('scenario-c-circular', 'FG-2026-001')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-semibold text-brand">FG-2026-0142</td>
                <td className="py-3 px-4 font-medium text-text-primary">Circular fund movement</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">3</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">8</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-risk-subtle text-risk border border-risk-border">
                    High
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-text-secondary">Under Review</span>
                </td>
                <td className="py-3 px-4 text-text-muted">12 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium">Open workspace →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-b-rapid', 'FG-2026-002')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-semibold text-brand">FG-2026-0138</td>
                <td className="py-3 px-4 font-medium text-text-primary">Rapid pass-through activity</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">4</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">15</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                    Medium
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-text-secondary">Open</span>
                </td>
                <td className="py-3 px-4 text-text-muted">34 min ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium">Open workspace →</span>
                </td>
              </tr>

              <tr 
                onClick={() => handleOpenCase('scenario-d-smurfing', 'FG-2026-003')}
                className="hover:bg-surface-hover cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-semibold text-brand">FG-2026-0131</td>
                <td className="py-3 px-4 font-medium text-text-primary">Multiple small-value transfers</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">2</td>
                <td className="py-3 px-4 font-mono-numbers text-text-secondary">27</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-warning-subtle text-warning border border-warning-border">
                    Medium
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-text-secondary">Open</span>
                </td>
                <td className="py-3 px-4 text-text-muted">2 hours ago</td>
                <td className="py-3 px-4 text-right">
                  <span className="text-brand font-medium">Open workspace →</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
