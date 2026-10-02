import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Share2, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Lock, 
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { CORE_INSTITUTIONS_DATA, InstitutionProfile } from '../data/mockData';
import { useInvestigation } from '../context/InvestigationContext';

export const InstitutionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setFilterInstitution } = useInvestigation();
  const [selectedInstId, setSelectedInstId] = useState<string>('INST-HDFC');

  const selectedBank = CORE_INSTITUTIONS_DATA.find(b => b.id === selectedInstId) || CORE_INSTITUTIONS_DATA[0];

  const handleInspectBankInGraph = (instName: string) => {
    setFilterInstitution(instName);
    navigate('/investigations/INV-2026-0173');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>FEDERATED BANKING NETWORK</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Core Institution Clearing Network</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inter-institutional clearing topology connecting 5 Core Banks, net bilateral exposure, quarantined accounts, and cross-bank ring detection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleInspectBankInGraph(selectedBank.name)}
            className="neu-btn-primary px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 cursor-pointer shadow-sm transition"
          >
            <span>Filter Graph for {selectedBank.code}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Inter-Bank Topology Matrix Layout */}
      <div className="neu-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              5 Core Banks Topology Network
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any bank node to inspect institutional flow, quarantined accounts, and cross-clearing links.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 neu-inset-sm px-3 py-1 rounded-xl">
            Real-Time Settlement Relay Active
          </span>
        </div>

        {/* Tactical 5-Bank Visual Network Map */}
        <div className="relative neu-inset rounded-2xl p-6 min-h-[260px] flex items-center justify-center overflow-x-auto">
          {/* Visual connections diagram representation */}
          <div className="w-full max-w-2xl py-4">
            <div className="grid grid-cols-2 gap-y-12 gap-x-8 md:grid-cols-5 items-center justify-items-center">
              {CORE_INSTITUTIONS_DATA.map((bank) => {
                const isSelected = bank.id === selectedInstId;
                return (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedInstId(bank.id)}
                    className={`group flex flex-col items-center text-center p-3.5 rounded-2xl transition-all cursor-pointer w-full max-w-[150px] ${
                      isSelected
                        ? 'neu-raised border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-105'
                        : 'neu-btn hover:border-white/20'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl neu-raised flex items-center justify-center font-mono font-bold text-sm mb-2 ${
                      isSelected ? 'text-blue-400' : 'text-slate-300'
                    }`}>
                      {bank.code}
                    </div>
                    <span className="font-bold text-white text-xs truncate w-full">{bank.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">{bank.headquarters}</span>
                    <span className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                      {bank.flaggedNetworks} Rings
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Topology ASCII Diagram banner matching prompt */}
            <div className="mt-8 pt-4 border-t border-white/[0.06] text-center">
              <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider">
                SBI ──── HDFC &nbsp;&nbsp;&nbsp;&nbsp; ICICI ──── AXIS ──── YES BANK
              </span>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                Cross-institution settlement paths monitored across RTGS, NEFT, IMPS & clearing houses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Bank Profile & Bilateral Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Bilateral Connections */}
        <div className="lg:col-span-2 space-y-6">
          <div className="neu-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl neu-inset-sm flex items-center justify-center text-blue-400 font-mono font-bold">
                  {selectedBank.code}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedBank.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">Institutional ID: {selectedBank.id} • {selectedBank.headquarters}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Threat Level: {selectedBank.riskRating}
              </span>
            </div>

            {/* Key Bank Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="neu-inset-sm p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Gross Volume</span>
                <span className="text-lg font-extrabold text-white font-mono-numbers mt-1 block">
                  {selectedBank.transactionsVolume}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">24h settlement</span>
              </div>

              <div className="neu-inset-sm p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Accounts Monitored</span>
                <span className="text-lg font-extrabold text-cyan-400 font-mono-numbers mt-1 block">
                  {selectedBank.accountsMonitored.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Active KYC ledgers</span>
              </div>

              <div className="neu-inset-sm p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Quarantined Accounts</span>
                <span className="text-lg font-extrabold text-amber-400 font-mono-numbers mt-1 block">
                  {selectedBank.suspiciousAccounts}
                </span>
                <span className="text-[10px] text-amber-400/80 mt-0.5 block">Suspicious AML flag</span>
              </div>

              <div className="neu-inset-sm p-3 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Flagged Rings</span>
                <span className="text-lg font-extrabold text-red-400 font-mono-numbers mt-1 block">
                  {selectedBank.flaggedNetworks}
                </span>
                <span className="text-[10px] text-red-400/80 mt-0.5 block">Circular & mule loops</span>
              </div>
            </div>

            {/* Bilateral Settlement Exposure Matrix */}
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono mb-2">
                Connected Core Institutions & Net Settlement
              </div>
              <div className="neu-inset-sm rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left font-mono">
                  <thead className="border-b border-white/[0.06] text-[10px] text-slate-400 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Counterparty Institution</th>
                      <th className="py-2.5 px-3">Daily Flow</th>
                      <th className="py-2.5 px-3">Suspicious Inter-Bank Rings</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-[11px] text-slate-300">
                    {selectedBank.interBankConnections.map((peer) => (
                      <tr key={peer} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{peer}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-mono-numbers">
                          ₹{(Math.random() * 800 + 200).toFixed(0)} Cr
                        </td>
                        <td className="py-2.5 px-3 text-red-400 font-bold">
                          {Math.floor(Math.random() * 12 + 4)} Detected Loops
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            onClick={() => handleInspectBankInGraph(selectedBank.name)}
                            className="text-blue-400 hover:underline font-semibold"
                          >
                            Trace Flow →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quarantined Accounts in this Institution */}
        <div className="space-y-6">
          <div className="neu-card p-5 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Flagged Accounts in {selectedBank.code}</span>
            </h3>
            <p className="text-slate-400 text-[11px]">
              High-risk entities under quarantine observation for circular routing or rapid pass-through conduit activity.
            </p>

            <div className="space-y-2">
              {[
                { id: 'ACC-1042', name: 'Global Horizon Trading', type: 'Shell Conduit', risk: 92, amount: '₹3.82 Cr' },
                { id: 'ACC-7841', name: 'Kavita M. (Mule Account)', type: 'Rapid Relay', risk: 88, amount: '₹94.2L' },
                { id: 'ACC-2910', name: 'Falcon Agro Services LLP', type: 'Smurfing Sink', risk: 84, amount: '₹1.14 Cr' },
                { id: 'ACC-5528', name: 'Vanguard Escrow Depot', type: 'Layering Hop', risk: 79, amount: '₹62.5L' }
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/investigations/INV-2026-0173')}
                  className="neu-btn p-2.5 rounded-xl cursor-pointer hover:border-red-500/40 transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-mono text-blue-400 font-bold text-xs">{item.id}</div>
                    <div className="text-white text-xs font-semibold truncate max-w-[140px]">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.type}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30 block mb-1">
                      Risk {item.risk}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-white">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleInspectBankInGraph(selectedBank.name)}
              className="neu-btn w-full py-2 rounded-xl text-blue-400 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>View All In Network Graph</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionsPage;
