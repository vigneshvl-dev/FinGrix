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

  const getBorderColor = () => {
    if (isSelected) return 'border-brand ring-2 ring-brand/20 shadow-sm';
    if (account.flagged || account.riskLevel === 'critical') return 'border-risk ring-1 ring-risk/20';
    if (account.riskLevel === 'high') return 'border-warning';
    if (isNeighbor) return 'border-brand/60';
    return 'border-border hover:border-text-secondary';
  };

  const getBadgeStyle = () => {
    if (account.riskLevel === 'critical' || account.flagged) {
      return 'bg-risk-subtle text-risk border-risk-border';
    }
    if (account.riskLevel === 'high' || account.riskLevel === 'medium') {
      return 'bg-warning-subtle text-warning border-warning-border';
    }
    return 'bg-success-subtle text-success border-success-border';
  };

  return (
    <div
      className={`
        relative px-3 py-2.5 rounded bg-white border min-w-[200px] max-w-[230px] text-xs transition-all select-none shadow-card cursor-pointer
        ${getBorderColor()}
        ${isDimmed ? 'opacity-35 grayscale' : 'opacity-100'}
      `}
    >
      {/* Handles */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-2 !h-2 !bg-brand !border !border-white -ml-1" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-2 !h-2 !bg-text-secondary !border !border-white -mr-1" 
      />

      {/* Top Header: ID & Risk Badge */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <div className="font-mono text-[11px] font-bold text-text-primary flex items-center gap-1.5 truncate">
          {account.entityType === 'business' || account.entityType === 'shell_company' ? (
            <Building2 className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          ) : (
            <User className="w-3.5 h-3.5 text-text-muted flex-shrink-0" />
          )}
          <span className="truncate">{account.id}</span>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-medium flex-shrink-0 ${getBadgeStyle()}`}>
          {account.riskScore >= 70 ? `Risk ${account.riskScore}` : 'Normal'}
        </span>
      </div>

      {/* Label / Name */}
      <div className="font-semibold text-text-primary text-[11px] truncate mb-0.5">
        {account.label}
      </div>

      {/* Institution & Network Position */}
      <div className="flex items-center justify-between text-[11px] text-text-secondary pb-1.5 mb-1.5 border-b border-border">
        <span className="truncate max-w-[110px]">{account.institution}</span>
        <span className="font-mono text-text-muted text-[10px] bg-surface-secondary px-1 py-0.2 rounded">
          {account.networkPosition}
        </span>
      </div>

      {/* Financial metrics */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-numbers">
        <div>
          <span className="text-text-muted block text-[9px] uppercase">Incoming</span>
          <span className="text-text-primary font-medium flex items-center">
            <ArrowDownLeft className="w-2.5 h-2.5 mr-0.5 text-success" />
            ₹{(account.totalIncoming / 1000).toFixed(0)}k
          </span>
        </div>
        <div>
          <span className="text-text-muted block text-[9px] uppercase">Outgoing</span>
          <span className="text-text-primary font-medium flex items-center">
            <ArrowUpRight className="w-2.5 h-2.5 mr-0.5 text-text-secondary" />
            ₹{(account.totalOutgoing / 1000).toFixed(0)}k
          </span>
        </div>
      </div>
    </div>
  );
});

CustomAccountNode.displayName = 'CustomAccountNode';
