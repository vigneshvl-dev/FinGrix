import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  MarkerType,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useInvestigation } from '../../context/InvestigationContext';
import { CustomAccountNode } from './CustomAccountNode';
import { Play, RotateCcw } from 'lucide-react';

const nodeTypes = {
  accountNode: CustomAccountNode,
};

const NetworkGraphInternal: React.FC = () => {
  const {
    scenario,
    selectedAccount,
    setSelectedAccount,
    selectedTransaction,
    setSelectedTransaction,
    graphMode,
    isTracingFlow,
    triggerTraceFlow,
    filterInstitution,
    minAmountFilter,
    visibleTransactions
  } = useInvestigation();

  const { fitView, setCenter } = useReactFlow();

  // Filter accounts based on mode & institution
  const filteredAccounts = useMemo(() => {
    return scenario.accounts.filter(acc => {
      // Institution filter
      if (filterInstitution !== 'all' && acc.institution !== filterInstitution) {
        return false;
      }
      // Mode filters
      if (graphMode === 'suspicious_only' && acc.riskScore < 70) {
        return false;
      }
      if (graphMode === 'circular_paths' && !acc.riskIndicators.some(i => i.toLowerCase().includes('cycle') || i.toLowerCase().includes('circular') || i.toLowerCase().includes('return'))) {
        return false;
      }
      if (graphMode === 'rapid_flow' && acc.averageHoldingTimeMinutes > 10) {
        return false;
      }
      if (graphMode === 'smurfing_cluster' && acc.networkPosition === 'Legitimate Merchant') {
        return false;
      }
      return true;
    });
  }, [scenario.accounts, filterInstitution, graphMode]);

  // Neighbor accounts
  const neighborAccountIds = useMemo(() => {
    if (!selectedAccount) return new Set<string>();
    const neighbors = new Set<string>();
    scenario.transactions.forEach(t => {
      if (t.source === selectedAccount.id) neighbors.add(t.target);
      if (t.target === selectedAccount.id) neighbors.add(t.source);
    });
    return neighbors;
  }, [selectedAccount, scenario.transactions]);

  // Nodes with layout
  const initialNodes: Node[] = useMemo(() => {
    return filteredAccounts.map((acc, index) => {
      let x = acc.x ?? (100 + (index % 4) * 260);
      let y = acc.y ?? (100 + Math.floor(index / 4) * 220);

      if (scenario.id === 'scenario-c-circular') {
        const angle = (index / filteredAccounts.length) * 2 * Math.PI - Math.PI / 2;
        const radius = 210;
        x = 340 + radius * Math.cos(angle);
        y = 240 + radius * Math.sin(angle);
      } else if (scenario.id === 'scenario-b-rapid') {
        x = 60 + index * 240;
        y = 220 + (index % 2 === 0 ? 0 : 35);
      } else if (scenario.id === 'scenario-d-smurfing') {
        if (acc.id === 'ACC-3001') {
          x = 440;
          y = 200;
        } else if (acc.id === 'ACC-3099') {
          x = 760;
          y = 200;
        } else {
          x = 80;
          y = 40 + index * 90;
        }
      }

      const isSelected = selectedAccount?.id === acc.id;
      const isNeighbor = neighborAccountIds.has(acc.id);
      const isDimmed = selectedAccount !== null && !isSelected && !isNeighbor;

      return {
        id: acc.id,
        type: 'accountNode',
        position: { x, y },
        data: {
          account: acc,
          isSelected,
          isHighlighted: acc.highInterest,
          isDimmed,
          isNeighbor,
        },
      };
    });
  }, [filteredAccounts, selectedAccount, neighborAccountIds, scenario]);

  // Directed edges
  const initialEdges: Edge[] = useMemo(() => {
    return visibleTransactions
      .filter(t => {
        if (minAmountFilter > 0 && t.amount < minAmountFilter) return false;
        return (
          filteredAccounts.some(a => a.id === t.source) &&
          filteredAccounts.some(a => a.id === t.target)
        );
      })
      .map(t => {
        const isTxnSelected = selectedTransaction?.id === t.id;
        const isConnectedToSelected = 
          selectedAccount?.id === t.source || selectedAccount?.id === t.target;

        let strokeColor = '#64748B'; // neutral slate
        if (t.isSuspicious) strokeColor = '#D92D20'; // risk red
        if (isConnectedToSelected) strokeColor = '#1769E0'; // primary brand blue

        return {
          id: t.id,
          source: t.source,
          target: t.target,
          animated: isTracingFlow,
          style: {
            stroke: strokeColor,
            strokeWidth: isTxnSelected || isConnectedToSelected ? 2.5 : 1.5,
            opacity: selectedAccount && !isConnectedToSelected ? 0.25 : 1,
          },
          label: `₹${(t.amount / 1000).toLocaleString('en-IN')}k [${t.method}]`,
          labelStyle: {
            fill: '#172033',
            fontWeight: 500,
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
          },
          labelBgStyle: {
            fill: '#FFFFFF',
            fillOpacity: 0.95,
            stroke: '#D9E0E8',
            strokeWidth: 1,
            rx: 3,
            ry: 3,
          },
          labelBgBorderRadius: 3,
          labelBgPadding: [4, 2] as [number, number],
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 12,
            height: 12,
            color: strokeColor,
          },
        };
      });
  }, [visibleTransactions, filteredAccounts, selectedAccount, selectedTransaction, isTracingFlow, minAmountFilter]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    if (selectedAccount) {
      const node = initialNodes.find(n => n.id === selectedAccount.id);
      if (node) {
        setCenter(node.position.x + 100, node.position.y + 50, { zoom: 1.1, duration: 400 });
      }
    }
  }, [selectedAccount, initialNodes, setCenter]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const acc = scenario.accounts.find(a => a.id === node.id);
      if (acc) {
        setSelectedAccount(acc);
      }
    },
    [scenario.accounts, setSelectedAccount]
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const txn = scenario.transactions.find(t => t.id === edge.id);
      if (txn) {
        setSelectedTransaction(txn);
      }
    },
    [scenario.transactions, setSelectedTransaction]
  );

  return (
    <div className="relative w-full h-full bg-[#F8FAFC] graph-canvas-bg overflow-hidden select-none">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="#CBD5E1" 
          gap={20} 
          size={1} 
          variant={BackgroundVariant.Dots} 
        />
        

      </ReactFlow>

      {/* Clean Trace Flow & Canvas Counter */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <button
          onClick={triggerTraceFlow}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition active:scale-95 ${
            isTracingFlow
              ? 'bg-warning text-white'
              : 'bg-brand hover:bg-brand-hover text-white'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>{isTracingFlow ? 'Tracing flow...' : 'Trace flow'}</span>
        </button>

        <button
          onClick={() => fitView({ padding: 0.2, duration: 400 })}
          className="p-1.5 rounded bg-white border border-border text-text-secondary hover:text-text-primary text-xs flex items-center gap-1 shadow-sm"
          title="Reset zoom"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="px-2.5 py-1 rounded bg-white border border-border text-[11px] font-mono text-text-secondary flex items-center gap-2 shadow-sm">
          <span>{filteredAccounts.length} entities</span>
          <span>•</span>
          <span>{initialEdges.length} transfers</span>
        </div>
      </div>
    </div>
  );
};

export const NetworkGraphView: React.FC = () => {
  return (
    <ReactFlowProvider>
      <NetworkGraphInternal />
    </ReactFlowProvider>
  );
};
