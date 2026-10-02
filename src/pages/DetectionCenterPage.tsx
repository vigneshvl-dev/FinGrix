import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Repeat,
  Zap,
  Layers,
  Clock,
  TrendingDown,
  Building2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';
import { ScenarioType } from '../types';

export const DetectionCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentScenarioId, setSelectedCaseId } = useInvestigation();

  const handleLaunchScenario = (scId: ScenarioType, caseId: string) => {
    setCurrentScenarioId(scId);
    setSelectedCaseId(caseId);
    navigate(`/investigations/${caseId}`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>MULTI-GRAPH TOPOLOGICAL HEURISTICS</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <span>Pattern Detection & AML Typologies</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Automated multi-graph algorithms for circular fund round-tripping, linear rapid pass-through conduits, and sub-threshold smurfing funnels.
        </p>
      </div>

      {/* PATTERN 1: CIRCULAR / ROUND-TRIPPING (Requirement 5) */}
      <div className="neu-card p-6 space-y-4 border-l-4 border-l-red-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Repeat className="w-4 h-4 text-red-400" />
                <span>Circular Fund Flow Detected</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                Confidence: 98.4%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Closed loop fund movement that departs from and returns to the originating entity with fee shaving and minimal capital retention.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-c-circular', 'INV-2026-0173')}
            className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Case #INV-2026-0173</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Directed Cycle Structure */}
        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Detected Cycle Topology: A &rarr; B &rarr; C &rarr; D &rarr; A
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="neu-btn px-2.5 py-1 rounded-lg text-white font-semibold">
              ACC-1042 (HDFC Bank)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1043 (ICICI Bank)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1044 (Axis Bank)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1045 (State Bank of India)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 border border-red-500/30 font-bold">
              ACC-1042 (Returned Originator)
            </span>
          </div>

          {/* Key Metrics Required in Prompt 5 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06] text-xs">
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Total Amount</span>
              <span className="font-extrabold text-white text-sm font-mono-numbers mt-0.5 block">₹4.82 Cr</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Number of Hops</span>
              <span className="font-extrabold text-cyan-400 text-sm font-mono-numbers mt-0.5 block">4 Hops</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Time Taken</span>
              <span className="font-extrabold text-amber-400 text-sm font-mono-numbers mt-0.5 block">26 Minutes</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Institutions Involved</span>
              <span className="font-extrabold text-blue-400 text-sm font-mono-numbers mt-0.5 block">4 Core Banks</span>
            </div>
          </div>

          {/* Secondary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 pt-1">
            <div>First Transaction: <strong className="text-white">09:31:12 IST</strong></div>
            <div>Last Transaction: <strong className="text-white">09:57:33 IST</strong></div>
            <div>Capital Value Return: <strong className="text-emerald-400">94.3% (Fee Shaved)</strong></div>
          </div>
        </div>
      </div>

      {/* PATTERN 2: MULE / RAPID PASS-THROUGH (Requirement 5) */}
      <div className="neu-card p-6 space-y-4 border-l-4 border-l-amber-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Rapid Pass-Through Chain</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                17 Transactions Detected
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Rapid onward dispatch of incoming funds where intermediary accounts maintain near-zero balances and holding time &lt; 8 minutes.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-b-rapid', 'FG-2026-002')}
            className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Linear Chain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Directed Chain Topology */}
        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Detected Relay Topology: A &rarr; B &rarr; C &rarr; D &rarr; E
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="neu-btn px-2.5 py-1 rounded-lg text-white font-semibold">
              ACC-2001 (Source)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-amber-300">
              ACC-2002 (Mule 1)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-amber-300">
              ACC-2003 (Mule 2)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-amber-300">
              ACC-2004 (Mule 3)
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 font-bold">
              ACC-2005 (Cashout Terminal)
            </span>
          </div>

          {/* Metrics Required in Prompt 5 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-white/[0.06] text-xs">
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Transactions</span>
              <span className="font-extrabold text-white text-sm font-mono-numbers mt-0.5 block">17 txns</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Accounts</span>
              <span className="font-extrabold text-cyan-400 text-sm font-mono-numbers mt-0.5 block">5 accounts</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Institutions</span>
              <span className="font-extrabold text-blue-400 text-sm font-mono-numbers mt-0.5 block">4 banks</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Aggregate Volume</span>
              <span className="font-extrabold text-emerald-400 text-sm font-mono-numbers mt-0.5 block">₹82.4L</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Elapsed Duration</span>
              <span className="font-extrabold text-amber-400 text-sm font-mono-numbers mt-0.5 block">3h 42m</span>
            </div>
          </div>
        </div>
      </div>

      {/* PATTERN 3: SMURFING / STRUCTURING (Requirement 5) */}
      <div className="neu-card p-6 space-y-4 border-l-4 border-l-cyan-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Potential Structuring / Smurfing Pattern</span>
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Sub-Threshold Dispersal
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Origin account splits large value into multiple sub-₹10 Lakh tranches to avoid mandatory regulatory currency reporting.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-d-smurfing', 'FG-2026-003')}
            className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Smurfing Ring</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ASCII Topology matching prompt */}
        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Fan-Out Structuring Topology
          </div>

          <div className="font-mono text-xs text-cyan-400 space-y-1">
            <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`       ┌→ ACC-3011 (ICICI)   ₹9.2L  [4m interval]
       ├→ ACC-3012 (Axis)    ₹8.8L  [8m interval]
ACC-3001 ──┼→ ACC-3013 (SBI)     ₹9.5L  [14m interval]
       └→ ACC-3014 (YES Bank) ₹8.9L  [18m interval]`}
            </pre>
          </div>

          {/* Metrics Required in Prompt 5 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06] text-xs">
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Origin Account</span>
              <span className="font-extrabold text-white text-xs font-mono mt-0.5 block">ACC-3001 (Zenith Holdings)</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Recipients</span>
              <span className="font-extrabold text-cyan-400 text-sm font-mono-numbers mt-0.5 block">4 Mule Accounts</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Amounts</span>
              <span className="font-extrabold text-amber-400 text-xs font-mono mt-0.5 block">All &lt; ₹10L Threshold</span>
            </div>
            <div className="neu-inset-sm p-2.5 rounded-xl">
              <span className="text-slate-400 text-[10px] block font-mono">Spread</span>
              <span className="font-extrabold text-blue-400 text-xs font-mono mt-0.5 block">4 Banks • 3 States</span>
            </div>
          </div>
        </div>
      </div>

      {/* BENIGN COMMERCE SECTION (Requirement 8) */}
      <div className="neu-card p-6 space-y-4 border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Benign Commerce Exemption Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Distinguishes high-volume legitimate businesses from money laundering rings using business metadata and counterparty stability.
            </p>
          </div>
          <button
            onClick={() => handleLaunchScenario('scenario-a-legitimate', 'FG-2026-004')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            <span>View Exemption Ledger</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="neu-inset-sm p-3.5 rounded-xl space-y-2">
            <span className="text-emerald-400 font-bold block">Why Legitimate Volume Is Exempted:</span>
            <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
              <li>&bull; <strong className="text-white">Recurring merchant settlement pattern:</strong> Predictable daily batches at commercial clearing hours.</li>
              <li>&bull; <strong className="text-white">Consistent counterparties:</strong> Long-term vendor relationships verified via commercial invoices.</li>
              <li>&bull; <strong className="text-white">Stable transaction intervals:</strong> 15–30 day normal commercial holding periods.</li>
              <li>&bull; <strong className="text-white">Zero circular fund movement:</strong> Proceeds remain in operational capital or shareholder dividends.</li>
            </ul>
          </div>

          <div className="neu-inset-sm p-3.5 rounded-xl space-y-2 font-mono text-[11px]">
            <span className="text-slate-400 font-bold block uppercase">Exempted Control Network:</span>
            <div className="text-white font-bold">Reliance Retail Wholesale & FMCG Logistics</div>
            <div className="text-slate-400">Monthly Volume: ₹342.8 Cr • Counterparties: 148 Verified Suppliers</div>
            <div className="text-slate-400">Tax Audits: Verified GST e-way bills + MCA director disclosures</div>
            <div className="text-emerald-400 font-semibold pt-1">
              &check; Classifier Decision: EXEMPT (Risk Score: 12/100)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionCenterPage;
