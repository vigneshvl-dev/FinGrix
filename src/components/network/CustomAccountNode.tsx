import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { 
  Building2, 
  User, 
  ArrowUpRight, 
  ArrowDownLeft,
} from 'lucide-react';
import { AccountNode } from '../../types';

interface CustomNodeProps {
  data: {
    account: AccountNode;
    isSelected: boolean;
    isHighlighted: boolean;
    isDimmed: boolean;
    isNeighbor: boolean;
  };
}

export const CustomAccountNode = memo(({ data }: CustomNodeProps) => {
  const { account, isSelected, isDimmed, isNeighbor } = data;

  const getBorderAndShadow = () => {
    if (isSelected) {
      return 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6),6px_6px_14px_rgba(0,0,0,0.8)] ring-2 ring-blue-500/50';
    }
    if (account.flagged || account.riskLevel === 'critical') {
      return 'border-red-500/60 shadow-[0_0_14px_rgba(239,68,68,0.4),6px_6px_14px_rgba(0,0,0,0.7)]';
    }
    if (account.riskLevel === 'high') {
      return 'border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.35),6px_6px_14px_rgba(0,0,0,0.7)]';
    }
    if (isNeighbor) {
      return 'border-blue-400/50 shadow-[0_0_12px_rgba(59,130,246,0.3),6px_6px_14px_rgba(0,0,0,0.7)]';
    }
    return 'border-white/[0.08] shadow-[5px_5px_12px_rgba(0,0,0,0.65),-3px_-3px_8px_rgba(255,255,255,0.03)] hover:border-white/20';
  };

  const getBadgeStyle = () => {
    if (account.riskLevel === 'critical' || account.flagged) {
      return 'bg-red-500/20 text-red-400 border border-red-500/30';
    }
    if (account.riskLevel === 'high' || account.riskLevel === 'medium') {
      return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
    }
    return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
  };

  return (
    <div
      className={`
        relative px-3.5 py-3 rounded-2xl bg-[#141A28] border min-w-[210px] max-w-[240px] text-xs transition-all select-none cursor-pointer
        ${getBorderAndShadow()}
        ${isDimmed ? 'opacity-35 grayscale' : 'opacity-100'}
      `}
    >
      {/* Handles */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-2.5 !h-2.5 !bg-blue-500 !border-2 !border-[#141A28] -ml-1.5 shadow-[0_0_6px_rgba(59,130,246,0.8)]" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-2.5 !h-2.5 !bg-cyan-400 !border-2 !border-[#141A28] -mr-1.5 shadow-[0_0_6px_rgba(6,182,212,0.8)]" 
      />

      {/* Top Header: ID & Risk Badge */}
      <div className="flex items-center justify-between gap-1 mb-1.5">
        <div className="font-mono text-[11px] font-bold text-white flex items-center gap-1.5 truncate">
          {account.entityType === 'business' || account.entityType === 'shell_company' ? (
            <Building2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
          ) : (
            <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          )}
          <span className="truncate">{account.id}</span>
        </div>
        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${getBadgeStyle()}`}>
          {account.riskScore >= 70 ? `Risk ${account.riskScore}` : 'Verified'}
        </span>
      </div>

      {/* Label / Name */}
      <div className="font-bold text-white text-xs truncate mb-1">
        {account.label}
      </div>

      {/* Institution & Network Position */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 mb-2 border-b border-white/[0.06]">
        <span className="truncate max-w-[110px] font-medium">{account.institution}</span>
        <span className="font-mono text-slate-300 text-[9px] neu-inset-sm px-1.5 py-0.5 rounded-md">
          {account.networkPosition}
        </span>
      </div>

      {/* Financial metrics */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-numbers">
        <div className="neu-inset-sm p-1.5 rounded-lg">
          <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Incoming</span>
          <span className="text-white font-bold flex items-center mt-0.5">
            <ArrowDownLeft className="w-2.5 h-2.5 mr-0.5 text-emerald-400" />
            ₹{(account.totalIncoming / 1000).toFixed(0)}k
          </span>
        </div>
        <div className="neu-inset-sm p-1.5 rounded-lg">
          <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Outgoing</span>
          <span className="text-white font-bold flex items-center mt-0.5">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5 text-amber-400" />
            ₹{(account.totalOutgoing / 1000).toFixed(0)}k
          </span>
        </div>
      </div>
    </div>
  );
});

CustomAccountNode.displayName = 'CustomAccountNode';
