import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Building2, 
  User, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Play, 
  RotateCcw, 
  Lock, 
  CheckCircle2, 
  X,
  ExternalLink,
  Zap,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom Bank Node
const BankNodeComponent = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-2.5 rounded-xl bg-[#0F1626] border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.25),4px_4px_10px_rgba(0,0,0,0.6)] text-xs min-w-[170px] select-none text-center">
      <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-blue-400 !border-2 !border-[#0F1626]" />
      <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-blue-400 font-bold uppercase tracking-wider">
        <Building2 className="w-3.5 h-3.5" />
        <span>{data.bankCode}</span>
      </div>
      <div className="font-extrabold text-white text-xs mt-0.5">{data.label}</div>
      <div className="text-[9px] font-mono text-slate-400 mt-0.5">Core Clearing Node</div>
    </div>
  );
};

// Custom Account / Forensic Entity Node
const ForensicAccountNodeComponent = ({ data }: { data: any }) => {
  const isSuspicious = data.riskScore >= 70;
  return (
    <div
      className={`relative px-3.5 py-2.5 rounded-2xl bg-[#141A28] border transition-all text-xs min-w-[190px] select-none cursor-pointer ${
        data.isSelected
          ? 'border-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.6)] ring-2 ring-blue-500/50'
          : isSuspicious
          ? 'border-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3),4px_4px_10px_rgba(0,0,0,0.6)] hover:border-red-400'
          : 'border-white/[0.08] shadow-[4px_4px_10px_rgba(0,0,0,0.6)] hover:border-white/20'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-blue-400 !border-2 !border-[#141A28]" />
      <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-cyan-400 !border-2 !border-[#141A28]" />

      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="font-mono text-[11px] font-bold text-blue-400">{data.id}</span>
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
          isSuspicious 
            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        }`}>
          Risk {data.riskScore}
        </span>
      </div>

      <div className="font-bold text-white text-xs truncate">{data.label}</div>
      
      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1.5 border-t border-white/[0.06]">
        <span className="truncate max-w-[100px]">{data.institution}</span>
        <span className="font-mono text-slate-300 font-semibold">{data.turnover}</span>
      </div>
    </div>
  );
};

const heroNodeTypes = {
  bankNode: BankNodeComponent,
  accountNode: ForensicAccountNodeComponent,
};

export const HeroInvestigationGraph: React.FC = () => {
  const navigate = useNavigate();
  const [selectedNodeData, setSelectedNodeData] = useState<any | null>(null);
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [traceDirection, setTraceDirection] = useState<'source' | 'destination' | 'both'>('both');

  // Exact Topology from Prompt 4:
  // BANK A -> ACC-102 -> ACC-784 -> ACC-291 & ACC-552 -> ACC-102 (Return loop)
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'BANK-HDFC',
      type: 'bankNode',
      position: { x: 260, y: 15 },
      data: { label: 'HDFC Bank Ltd', bankCode: 'BANK A • HDFC' },
    },
    {
      id: 'ACC-102',
      type: 'accountNode',
      position: { x: 250, y: 100 },
      data: { 
        id: 'ACC-102', 
        label: 'Global Horizon Trading Pvt Ltd', 
        institution: 'HDFC Bank', 
        riskScore: 92, 
        turnover: '₹48.2L Flow',
        entityType: 'Shell Conduit',
        kycStatus: 'Flagged High-Risk',
        city: 'Mumbai',
        ifsc: 'HDFC0001042',
        role: 'Cycle Originator & Terminal Sink',
        isSelected: selectedNodeData?.id === 'ACC-102'
      },
    },
    {
      id: 'ACC-784',
      type: 'accountNode',
      position: { x: 250, y: 220 },
      data: { 
        id: 'ACC-784', 
        label: 'Zenith Logistics & Cargo LLP', 
        institution: 'ICICI Bank', 
        riskScore: 89, 
        turnover: '₹47.4L Flow',
        entityType: 'Pass-Through Conduit',
        kycStatus: 'Pending Review',
        city: 'Ahmedabad',
        ifsc: 'ICIC0001043',
        role: 'Layering Hop 1 (Holding 4.8m)',
        isSelected: selectedNodeData?.id === 'ACC-784'
      },
    },
    {
      id: 'ACC-291',
      type: 'accountNode',
      position: { x: 100, y: 350 },
      data: { 
        id: 'ACC-291', 
        label: 'Silverline Infrastructure Corp', 
        institution: 'Axis Bank', 
        riskScore: 94, 
        turnover: '₹24.0L Hop',
        entityType: 'Structuring Split',
        kycStatus: 'Tier-1 High Risk',
        city: 'Surat',
        ifsc: 'UTIB0001044',
        role: 'Layering Branch A',
        isSelected: selectedNodeData?.id === 'ACC-291'
      },
    },
    {
      id: 'ACC-552',
      type: 'accountNode',
      position: { x: 400, y: 350 },
      data: { 
        id: 'ACC-552', 
        label: 'Vanguard FinTech Clearing', 
        institution: 'State Bank of India', 
        riskScore: 86, 
        turnover: '₹23.4L Hop',
        entityType: 'Aggregator Escrow',
        kycStatus: 'Flagged',
        city: 'New Delhi',
        ifsc: 'SBIN0001045',
        role: 'Layering Branch B',
        isSelected: selectedNodeData?.id === 'ACC-552'
      },
    },
    {
      id: 'ACC-102-RETURN',
      type: 'accountNode',
      position: { x: 250, y: 480 },
      data: { 
        id: 'ACC-102', 
        label: 'Global Horizon Trading (Return Node)', 
        institution: 'HDFC Bank', 
        riskScore: 92, 
        turnover: '₹46.2L Re-deposited',
        entityType: 'Cycle Closed (94% Retention)',
        kycStatus: 'Flagged High-Risk',
        city: 'Mumbai',
        ifsc: 'HDFC0001042',
        role: 'Round-Tripping Completion Sink',
        isSelected: selectedNodeData?.id === 'ACC-102-RETURN'
      },
    }
  ], [selectedNodeData]);

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'E-BANK-ACC102',
      source: 'BANK-HDFC',
      target: 'ACC-102',
      animated: isTracing,
      style: { stroke: '#3B82F6', strokeWidth: 2 },
      label: 'Settlement Feed',
      labelStyle: { fill: '#94A3B8', fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    },
    {
      id: 'E-102-784',
      source: 'ACC-102',
      target: 'ACC-784',
      animated: isTracing,
      style: { stroke: '#EF4444', strokeWidth: 2.5 },
      label: '₹48,00,000 [RTGS]',
      labelStyle: { fill: '#EF4444', fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
    },
    {
      id: 'E-784-291',
      source: 'ACC-784',
      target: 'ACC-291',
      animated: isTracing,
      style: { stroke: '#F59E0B', strokeWidth: 2 },
      label: '₹24,00,000 [IMPS]',
      labelStyle: { fill: '#F59E0B', fontWeight: 600, fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' },
    },
    {
      id: 'E-784-552',
      source: 'ACC-784',
      target: 'ACC-552',
      animated: isTracing,
      style: { stroke: '#F59E0B', strokeWidth: 2 },
      label: '₹23,40,000 [NEFT]',
      labelStyle: { fill: '#F59E0B', fontWeight: 600, fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' },
    },
    {
      id: 'E-291-RETURN',
      source: 'ACC-291',
      target: 'ACC-102-RETURN',
      animated: isTracing,
      style: { stroke: '#EF4444', strokeWidth: 2 },
      label: '₹23,10,000 [RTGS]',
      labelStyle: { fill: '#EF4444', fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
    },
    {
      id: 'E-552-RETURN',
      source: 'ACC-552',
      target: 'ACC-102-RETURN',
      animated: isTracing,
      style: { stroke: '#EF4444', strokeWidth: 2 },
      label: '₹23,10,000 [IMPS]',
      labelStyle: { fill: '#EF4444', fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444' },
    },
  ], [isTracing]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data);
  }, []);

  const triggerTrace = () => {
    setIsTracing(true);
    setTimeout(() => setIsTracing(false), 4500);
  };

  return (
    <div className="relative w-full h-[460px] neu-card rounded-2xl overflow-hidden border border-white/[0.08] select-none">
      {/* Graph Toolbar Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 neu-card p-1.5 border border-white/10 shadow-[6px_6px_14px_rgba(0,0,0,0.7)] text-xs">
        <button
          onClick={triggerTrace}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
            isTracing 
              ? 'bg-amber-500 text-white shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse'
              : 'neu-btn-primary text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isTracing ? 'Tracing Active Flow...' : 'Trace Funds'}</span>
        </button>

        <div className="flex items-center gap-1 neu-inset p-0.5 rounded-xl text-[11px] font-mono">
          <button
            onClick={() => setTraceDirection('source')}
            className={`px-2 py-1 rounded-lg transition ${traceDirection === 'source' ? 'neu-raised text-white' : 'text-slate-400'}`}
          >
            &larr; Source
          </button>
          <button
            onClick={() => setTraceDirection('destination')}
            className={`px-2 py-1 rounded-lg transition ${traceDirection === 'destination' ? 'neu-raised text-white' : 'text-slate-400'}`}
          >
            &rarr; Dest
          </button>
          <button
            onClick={() => setTraceDirection('both')}
            className={`px-2 py-1 rounded-lg transition ${traceDirection === 'both' ? 'neu-raised text-white' : 'text-slate-400'}`}
          >
            &harr; Both
          </button>
        </div>

        <div className="neu-inset-sm px-2.5 py-1 rounded-xl text-[11px] font-mono text-slate-300">
          <span className="text-red-400 font-bold">Closed Cycle: </span>
          <span>4 Hops • ₹48L Total</span>
        </div>

        <button
          onClick={() => navigate('/investigations/INV-2026-0173')}
          className="neu-btn px-2.5 py-1 rounded-xl text-blue-400 font-semibold hover:text-blue-300 transition flex items-center gap-1"
        >
          <span>Full Workspace</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* React Flow Canvas */}
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={heroNodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1E283C" gap={20} size={1} variant={BackgroundVariant.Dots} />
        <Controls 
          className="!bg-[#141A28] !border !border-white/10 !rounded-xl !shadow-[6px_6px_14px_rgba(0,0,0,0.7)] !text-white overflow-hidden" 
          showInteractive={false}
        />
      </ReactFlow>

      {/* Forensic Node Profile Drawer (Slide-Over on Node Click) */}
      {selectedNodeData && selectedNodeData.id && (
        <div className="absolute right-3 top-3 bottom-3 w-80 neu-card p-4 border border-white/10 shadow-[0_0_24px_rgba(0,0,0,0.9)] z-20 flex flex-col justify-between overflow-y-auto animate-fade-in text-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
              <span className="font-mono font-bold text-xs text-blue-400">{selectedNodeData.id}</span>
              <button
                onClick={() => setSelectedNodeData(null)}
                className="w-6 h-6 rounded-lg neu-btn flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <div className="font-bold text-white text-sm">{selectedNodeData.label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{selectedNodeData.institution} • {selectedNodeData.city}</div>
            </div>

            <div className="neu-inset-sm p-3 rounded-xl space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Entity Type</span>
                <span className="font-semibold text-white">{selectedNodeData.entityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IFSC Routing</span>
                <span className="font-mono text-slate-200">{selectedNodeData.ifsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Risk Score</span>
                <span className="font-mono font-bold text-red-400">{selectedNodeData.riskScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Topological Role</span>
                <span className="font-medium text-amber-400 text-[11px]">{selectedNodeData.role}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Key AML Indicators:</span>
              <ul className="space-y-1 text-[11px] text-red-300">
                <li className="neu-inset-sm p-1.5 rounded-lg border border-red-500/20">• Circular fund loop return link</li>
                <li className="neu-inset-sm p-1.5 rounded-lg border border-red-500/20">• Rapid turnover interval (&lt; 5m)</li>
                <li className="neu-inset-sm p-1.5 rounded-lg border border-red-500/20">• 94.2% capital preservation ratio</li>
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] space-y-2">
            <button
              onClick={() => {
                navigate('/fund-flow');
              }}
              className="neu-btn-primary w-full py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Hop Fund Trace</span>
            </button>
            <button
              onClick={() => navigate('/investigations/INV-2026-0173')}
              className="neu-btn w-full py-2 rounded-xl text-slate-300 hover:text-white text-xs font-medium cursor-pointer"
            >
              Open Formal Case File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroInvestigationGraph;
