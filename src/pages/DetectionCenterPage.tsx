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
  Layers
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
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-blue-400" />
          <span>Heuristic Detection Center</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Automated multi-graph heuristics for cyclical fund routing, rapid mule pass-throughs, smurfing rings, and legitimate commerce exemptions.
        </p>
      </div>

      {/* SECTION 1: CIRCULAR FLOW DETECTION */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Repeat className="w-4 h-4 text-red-400" />
                Circular Flow & Round-Tripping Engine
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                12 active loops
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies closed fund-flow cycles that depart from and return to the originating or affiliated accounts.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-c-circular', 'FG-2026-001')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Network #1042</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Directed Cycle Structure */}
        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Detected Cycle Topology: A → B → C → D → A
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="neu-btn px-2.5 py-1 rounded-lg text-white font-semibold">
              ACC-1042 (HDFC)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1043 (ICICI)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1044 (Axis)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-slate-200">
              ACC-1045 (SBI)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 border border-red-500/30 font-bold">
              ACC-1042 (Returned)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-3 border-t border-white/[0.06] text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Cycle Length</span>
              <span className="font-bold text-white mt-0.5 block">4 Entities</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Cycle Duration</span>
              <span className="font-bold text-amber-400 mt-0.5 block">41 Minutes</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Value Retention</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">94.3% Retained</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Occurrences</span>
              <span className="font-bold text-red-400 mt-0.5 block">3 Sequences</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: RAPID PASS-THROUGH DETECTION */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Rapid Pass-through & Mule Chain Engine
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                27 active chains
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies funds moving through multiple intermediary accounts within unusually brief holding windows.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-b-rapid', 'FG-2026-002')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Mule Chain #2041</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Detected Chain Topology: A → B → C → D → E
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="neu-btn px-2.5 py-1 rounded-lg text-white font-medium">
              Origin (ACC-2001)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 border border-red-500/30">
              Intermediary 1 (ACC-2002)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 border border-red-500/30">
              Intermediary 2 (ACC-2003)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-red-400 border border-red-500/30">
              Intermediary 3 (ACC-2004)
            </span>
            <span className="text-slate-500">→</span>
            <span className="neu-btn px-2.5 py-1 rounded-lg text-cyan-400 font-bold border border-cyan-500/30">
              Terminal Sink (ACC-2005)
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-3 border-t border-white/[0.06] text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Total Duration</span>
              <span className="font-bold text-amber-400 mt-0.5 block">16m 28s</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Avg Holding Time</span>
              <span className="font-bold text-red-400 mt-0.5 block">5.6 min / hop</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Intermediaries</span>
              <span className="font-bold text-white mt-0.5 block">3 Mules</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Gross Volume</span>
              <span className="font-bold text-white font-mono-numbers mt-0.5 block">₹14.50 Lakh</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Pass-Through Ratio</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">98.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SMURFING DETECTION */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Smurfing & Structuring Aggregator
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                18 active clusters
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Identifies multiple structured transfers just below statutory reporting limits aggregating into a collector account.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-d-smurfing', 'FG-2026-003')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Cluster #3088</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="neu-inset-sm rounded-xl p-4 space-y-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Detected Cluster Flow: Source Mules ↓ Multiple Sub-₹50k Transfers ↓ Aggregator Sink
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-1 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Structured Transfers</span>
              <span className="font-bold text-white mt-0.5 block">12 transfers</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Aggregate Value</span>
              <span className="font-bold text-white font-mono-numbers mt-0.5 block">₹8.42 Lakh</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Execution Window</span>
              <span className="font-bold text-amber-400 mt-0.5 block">1h 40m</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Value Band</span>
              <span className="font-bold text-white font-mono-numbers mt-0.5 block">₹48k – ₹49.8k</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block font-mono">Collector Account</span>
              <span className="font-bold text-cyan-400 mt-0.5 block">1 Bullion Entity</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: LEGITIMATE HIGH-VOLUME FILTER (BEHAVIOR CLASSIFICATION) */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Behavior Classification: High Transaction Volume Exemption
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                False Positive Eliminator
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Distinguishes high-volume legitimate commercial accounts from coordinated financial crime networks.
            </p>
          </div>

          <button
            onClick={() => handleLaunchScenario('scenario-a-legitimate', 'FG-2026-004')}
            className="neu-btn px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer self-start"
          >
            <span>Inspect Exemption #1010</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Side-by-Side Comparison Neumorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Normal Business Activity */}
          <div className="border border-emerald-500/30 rounded-2xl p-4 bg-emerald-950/20 space-y-3 neu-inset-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                NORMAL BUSINESS ACTIVITY
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-[#141A28] px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                Risk Score: 14/100
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Example: Apex Wholesale Logistics (₹34.2 Cr). High volume is reconciled against commercial baseline:
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Stable counterparties:</strong> Recurring bilateral trade relationships with verified retail partners.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Commercial contracts:</strong> Documented invoice settlement cycles over 36 months.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Regular timing:</strong> Predictable settlement intervals aligning with standard 14 to 30-day payment terms.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Consistent transaction behavior:</strong> Predictable day-of-week cadence during business hours.</span>
              </li>
            </ul>
          </div>

          {/* Suspicious Network Activity */}
          <div className="border border-red-500/30 rounded-2xl p-4 bg-red-950/20 space-y-3 neu-inset-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                SUSPICIOUS NETWORK ACTIVITY
              </span>
              <span className="text-[10px] text-red-400 font-bold bg-[#141A28] px-2.5 py-0.5 rounded-full border border-red-500/30 font-mono">
                Risk Score: 94/100
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Example: Global Horizon Trading Network (₹2.84 Cr). Flagged due to coordinated structural anomalies:
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Unusual counterparties:</strong> Newly incorporated shell entities with no physical footprint.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Rapid velocity:</strong> Intermediary holding durations under 8 minutes across banking hops.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Circular relationships:</strong> Directed graph loops returning 94%+ of funds to the originator.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Temporal clustering:</strong> Off-market execution within coordinated micro-windows.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionCenterPage;
