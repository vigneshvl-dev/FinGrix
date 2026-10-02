import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Save, 
  Check, 
  Lock, 
  Server, 
  Cpu, 
  Bell
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useInvestigation();
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Heuristic Thresholds
  const [smurfingThreshold, setSmurfingThreshold] = useState<number>(1000000); // ₹10 Lakhs
  const [velocityHoldingMinutes, setVelocityHoldingMinutes] = useState<number>(10);
  const [circularCycleLength, setCircularCycleLength] = useState<number>(6);
  const [minRetentionRate, setMinRetentionRate] = useState<number>(85);

  const handleSave = () => {
    setSaveStatus('Threshold configurations applied across all federated nodes');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>SYSTEM & HEURISTIC ENGINE SETTINGS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Forensic Engine Configuration</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure AML topology thresholds, rapid pass-through velocity windows, smurfing limits, and benign commerce exemptions.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="neu-btn-primary px-4 py-2 rounded-xl text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm transition"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {saveStatus && (
        <div className="neu-card p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Heuristic Thresholds Card */}
      <div className="neu-card p-6 space-y-5">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span>AML Heuristic Parameters & Trigger Thresholds</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Smurfing / Structuring Limit */}
          <div className="neu-inset-sm p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Sub-Threshold Structuring (Smurfing)</span>
              <span className="font-mono text-cyan-400 font-bold">₹{(smurfingThreshold / 100000).toFixed(0)} Lakhs</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Transactions structured just beneath this statutory threshold will be aggregated and flagged if fan-in patterns exist.
            </p>
            <input
              type="range"
              min={200000}
              max={2000000}
              step={100000}
              value={smurfingThreshold}
              onChange={(e) => setSmurfingThreshold(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Velocity Window */}
          <div className="neu-inset-sm p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Rapid Pass-Through Holding Window</span>
              <span className="font-mono text-amber-400 font-bold">&le; {velocityHoldingMinutes} Minutes</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Accounts retaining funds for less than this duration before onward transfer will be flagged as conduit mule accounts.
            </p>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={velocityHoldingMinutes}
              onChange={(e) => setVelocityHoldingMinutes(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Max Circular Cycle Hops */}
          <div className="neu-inset-sm p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Circular Loop Max Traversal Depth</span>
              <span className="font-mono text-blue-400 font-bold">{circularCycleLength} Hops</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Maximum path length for Tarjan graph cycle detection algorithm to identify round-tripping return loops.
            </p>
            <input
              type="range"
              min={3}
              max={10}
              step={1}
              value={circularCycleLength}
              onChange={(e) => setCircularCycleLength(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Minimum Retention Ratio */}
          <div className="neu-inset-sm p-4 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Capital Value Preservation Ratio</span>
              <span className="font-mono text-emerald-400 font-bold">&ge; {minRetentionRate}%</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Percentage of funds returning to origin account (allowing for shaving fees / layering commissions).
            </p>
            <input
              type="range"
              min={70}
              max={99}
              step={1}
              value={minRetentionRate}
              onChange={(e) => setMinRetentionRate(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Investigator Credential Profile */}
      <div className="neu-card p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Investigator Workstation Session Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
          <div className="neu-inset-sm p-3 rounded-xl">
            <span className="text-slate-400 block text-[10px]">CURRENT INVESTIGATOR</span>
            <span className="text-white font-bold text-xs mt-0.5 block">{currentUser.name}</span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl">
            <span className="text-slate-400 block text-[10px]">HOME INSTITUTION</span>
            <span className="text-blue-400 font-bold text-xs mt-0.5 block">{currentUser.institution}</span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl">
            <span className="text-slate-400 block text-[10px]">ASSIGNED ROLE</span>
            <span className="text-emerald-400 font-bold text-xs mt-0.5 block">{currentUser.role}</span>
          </div>
          <div className="neu-inset-sm p-3 rounded-xl">
            <span className="text-slate-400 block text-[10px]">CLEARANCE ACCESS</span>
            <span className="text-amber-400 font-bold text-xs mt-0.5 block">Level 4 (Cross-Institutional FIU)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
