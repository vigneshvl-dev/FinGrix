import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  ScenarioType, 
  ScenarioDefinition, 
  AccountNode, 
  Transaction, 
  InvestigationCase, 
  AlertItem, 
  CaseNote,
  InvestigatorQueryResponse 
} from '../types';
import { 
  SCENARIOS, 
  INVESTIGATION_CASES, 
  ALERTS_LIST, 
  CASE_NOTES,
  EXECUTIVE_KPIS 
} from '../data/mockData';

export type GraphMode = 
  | 'full' 
  | 'suspicious_only' 
  | 'shortest_path' 
  | 'circular_paths' 
  | 'rapid_flow' 
  | 'smurfing_cluster';

interface InvestigationContextType {
  // Scenario state
  currentScenarioId: ScenarioType;
  setCurrentScenarioId: (id: ScenarioType) => void;
  scenario: ScenarioDefinition;
  
  // Cases & Alerts
  cases: InvestigationCase[];
  alerts: AlertItem[];
  selectedCaseId: string;
  setSelectedCaseId: (id: string) => void;
  currentCase: InvestigationCase;
  
  // Selection state
  selectedAccount: AccountNode | null;
  setSelectedAccount: (account: AccountNode | null) => void;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (txn: Transaction | null) => void;
  
  // Graph controls
  graphMode: GraphMode;
  setGraphMode: (mode: GraphMode) => void;
  isTracingFlow: boolean;
  triggerTraceFlow: () => void;
  filterInstitution: string;
  setFilterInstitution: (inst: string) => void;
  minAmountFilter: number;
  setMinAmountFilter: (amt: number) => void;
  
  // Temporal timeline scrubber
  timelineScrubberIndex: number;
  setTimelineScrubberIndex: React.Dispatch<React.SetStateAction<number>>;
  isTimelinePlaying: boolean;
  setIsTimelinePlaying: (playing: boolean) => void;
  visibleTransactions: Transaction[];
  
  // Assistant
  assistantOpen: boolean;
  setAssistantOpen: (open: boolean) => void;
  askAssistant: (query: string) => InvestigatorQueryResponse;
  
  // Guided Tour
  guidedTourOpen: boolean;
  setGuidedTourOpen: (open: boolean) => void;
  tourStep: number;
  setTourStep: (step: number) => void;
  
  // Case Notes
  notes: CaseNote[];
  addNote: (content: string, taggedEntities?: string[]) => void;
  
  // Global search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Authentication
  isAuthenticated: boolean;
  currentUser: {
    name: string;
    email: string;
    role: string;
    institution: string;
  };
  login: (email?: string, institution?: string, role?: string) => void;
  logout: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScenarioId, setCurrentScenarioId] = useState<ScenarioType>('scenario-c-circular');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('FG-2026-001');
  const [cases] = useState<InvestigationCase[]>(INVESTIGATION_CASES);
  const [alerts, setAlerts] = useState<AlertItem[]>(ALERTS_LIST);
  
  const [selectedAccount, setSelectedAccount] = useState<AccountNode | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const [graphMode, setGraphMode] = useState<GraphMode>('full');
  const [isTracingFlow, setIsTracingFlow] = useState<boolean>(false);
  const [filterInstitution, setFilterInstitution] = useState<string>('all');
  const [minAmountFilter, setMinAmountFilter] = useState<number>(0);
  
  const [timelineScrubberIndex, setTimelineScrubberIndex] = useState<number>(999);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState<boolean>(false);
  
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [guidedTourOpen, setGuidedTourOpen] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notesState, setNotesState] = useState<Record<string, CaseNote[]>>(CASE_NOTES);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fingraph_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: string;
    institution: string;
  }>(() => {
    const saved = localStorage.getItem('fingraph_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'V. Kumar',
      email: 'investigator@bank.com',
      role: 'Investigator',
      institution: 'HDFC Bank',
    };
  });

  const login = (
    email: string = 'investigator@organization.com', 
    institution: string = 'HDFC Bank',
    role?: string
  ) => {
    let name = 'V. Kumar';
    if (email && email.includes('@')) {
      const prefix = email.split('@')[0];
      name = prefix.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    }

    // Role determined by backend authentication
    let assignedRole = role;
    if (!assignedRole) {
      const lower = email.toLowerCase();
      if (lower.includes('compliance') || lower.includes('aml')) {
        assignedRole = 'AML / Compliance Officer';
      } else if (lower.includes('fraud')) {
        assignedRole = 'Fraud Analyst';
      } else if (lower.includes('risk')) {
        assignedRole = 'Risk Analyst';
      } else if (lower.includes('audit')) {
        assignedRole = 'Auditor';
      } else if (lower.includes('admin')) {
        assignedRole = 'Administrator';
      } else {
        assignedRole = 'Investigator';
      }
    }

    const user = {
      name,
      email,
      role: assignedRole,
      institution,
    };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('fingraph_auth', 'true');
    localStorage.setItem('fingraph_user', JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fingraph_auth');
    localStorage.removeItem('fingraph_user');
  };

  const scenario = useMemo(() => {
    return SCENARIOS[currentScenarioId] || SCENARIOS['scenario-c-circular'];
  }, [currentScenarioId]);

  const currentCase = useMemo(() => {
    return cases.find(c => c.id === selectedCaseId) || cases[0];
  }, [cases, selectedCaseId]);

  // Set default selected account when scenario changes
  React.useEffect(() => {
    if (scenario.accounts.length > 0) {
      setSelectedAccount(scenario.accounts[0]);
    }
    setTimelineScrubberIndex(scenario.transactions.length - 1);
  }, [scenario]);

  // Dynamic visible transactions based on timeline scrubber
  const visibleTransactions = useMemo(() => {
    const sorted = [...scenario.transactions].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    const sliceEnd = Math.min(timelineScrubberIndex + 1, sorted.length);
    return sorted.slice(0, Math.max(1, sliceEnd));
  }, [scenario.transactions, timelineScrubberIndex]);

  const triggerTraceFlow = () => {
    setIsTracingFlow(true);
    setTimeout(() => {
      setIsTracingFlow(false);
    }, 4500);
  };

  const notes = useMemo(() => {
    return notesState[selectedCaseId] || [];
  }, [notesState, selectedCaseId]);

  const addNote = (content: string, taggedEntities?: string[]) => {
    const newNote: CaseNote = {
      id: `NOTE-${Date.now()}`,
      author: 'V. Kumar (Lead Forensics)',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      content,
      taggedEntities: taggedEntities || (selectedAccount ? [selectedAccount.id] : [])
    };
    setNotesState(prev => ({
      ...prev,
      [selectedCaseId]: [newNote, ...(prev[selectedCaseId] || [])]
    }));
  };

  // Structured, Evidence-Based Investigator Assistant
  const askAssistant = (query: string): InvestigatorQueryResponse => {
    const q = query.toLowerCase();

    if (q.includes('why') && (q.includes('flagged') || q.includes('flag'))) {
      const why = scenario.whyFlagged;
      const primaryReason = why.circularity || why.velocity || why.structuring || why.flowPattern || 'Pattern flagged based on risk indicators';
      return {
        answer: `Network ${scenario.code} was flagged primarily due to: "${primaryReason}". Detailed topological scan reveals an average intermediary holding time of ${scenario.stats.avgHoldingTime}, with total flow volume of ₹${(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh across ${scenario.stats.accountsCount} accounts.`,
        suggestedAction: 'Review the high-interest entity nodes in the Network Graph and inspect the 4-hop transaction timeline.',
        referencedTransactions: scenario.transactions.slice(0, 3).map(t => t.id),
        referencedAccounts: scenario.accounts.slice(0, 4).map(a => a.id),
        confidence: 0.98
      };
    }

    if (q.includes('shortest') && q.includes('path')) {
      const source = scenario.accounts[0];
      const target = scenario.accounts[scenario.accounts.length - 1];
      return {
        answer: `Shortest suspicious path traverses ${scenario.accounts.length} entities: ${scenario.accounts.map(a => a.id).join(' → ')}. Total elapsed movement time is ${scenario.stats.flowDuration}.`,
        suggestedAction: 'Execute "Trace Flow" on the workspace graph to visualize directional propagation.',
        referencedTransactions: scenario.transactions.map(t => t.id),
        referencedAccounts: scenario.accounts.map(a => a.id),
        confidence: 0.99
      };
    }

    if (q.includes('connected') || q.includes('acc-') || q.includes('account')) {
      const targetAcc = selectedAccount || scenario.accounts[0];
      const connectedTxns = scenario.transactions.filter(t => t.source === targetAcc.id || t.target === targetAcc.id);
      const connectedAccountIds = Array.from(new Set(connectedTxns.flatMap(t => [t.source, t.target]))).filter(id => id !== targetAcc.id);
      
      return {
        answer: `Entity ${targetAcc.id} (${targetAcc.label}) maintains direct transactional edges with ${connectedAccountIds.length} counterparties: ${connectedAccountIds.join(', ')}. Net incoming: ₹${(targetAcc.totalIncoming / 100000).toFixed(2)}L, Net outgoing: ₹${(targetAcc.totalOutgoing / 100000).toFixed(2)}L.`,
        suggestedAction: 'Inspect counterparties for common incorporation addresses or shared IFSC prefixes.',
        referencedTransactions: connectedTxns.map(t => t.id),
        referencedAccounts: [targetAcc.id, ...connectedAccountIds],
        confidence: 0.96
      };
    }

    if (q.includes('10 minutes') || q.includes('within') || q.includes('rapid')) {
      const rapidTxns = scenario.transactions.filter(t => (t.holdingTimeMinutes || 0) <= 10);
      return {
        answer: `Identified ${rapidTxns.length} high-velocity transactions executed within 10 minutes of preceding credit: ${rapidTxns.map(t => `${t.id} (${t.source} → ${t.target}, ₹${t.amount.toLocaleString('en-IN')})`).join('; ')}. Average interval: ${scenario.stats.avgHoldingTime}.`,
        suggestedAction: 'Highlight rapid pass-through edges in the Temporal Analysis scrubber.',
        referencedTransactions: rapidTxns.map(t => t.id),
        referencedAccounts: Array.from(new Set(rapidTxns.flatMap(t => [t.source, t.target]))),
        confidence: 0.97
      };
    }

    if (q.includes('summarize') || q.includes('summary')) {
      return {
        answer: `CASE ${currentCase.id} SUMMARY: Investigation covers ${scenario.stats.accountsCount} entities and ${scenario.stats.transactionsCount} transactions with aggregate flow of ₹${(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh. Primary risk indicator: ${scenario.tagline}. Regulatory status: ${currentCase.status}.`,
        suggestedAction: 'Proceed to Compliance Dossier Generator (/reports) to produce audit-ready evidence pack.',
        referencedTransactions: scenario.transactions.map(t => t.id),
        referencedAccounts: scenario.accounts.map(a => a.id),
        confidence: 0.95
      };
    }

    if (q.includes('dossier') || q.includes('report') || q.includes('case report')) {
      return {
        answer: `Dossier prepared for ${currentCase.id}. Includes 12 forensic sections: Network topology, temporal analysis, holding time calculations, SAR narrative draft, and verified entity KYC snapshots. Ready for FIU / LEA export.`,
        suggestedAction: 'Click "Generate Investigation Dossier" in the Reports module.',
        referencedTransactions: scenario.transactions.map(t => t.id),
        referencedAccounts: scenario.accounts.map(a => a.id),
        confidence: 0.99
      };
    }

    // Default institutional response
    return {
      answer: `Query matched against active dataset ${scenario.code} (${scenario.name}). Total flow analyzed: ₹${(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh across ${scenario.accounts.length} accounts. Active risk level: ${scenario.stats.riskCategory}.`,
      suggestedAction: 'Select an entity node on the graph or inspect detected cycles in the Detection Center.',
      referencedTransactions: scenario.transactions.slice(0, 2).map(t => t.id),
      referencedAccounts: scenario.accounts.slice(0, 2).map(a => a.id),
      confidence: 0.88
    };
  };

  return (
    <InvestigationContext.Provider
      value={{
        currentScenarioId,
        setCurrentScenarioId,
        scenario,
        cases,
        alerts,
        selectedCaseId,
        setSelectedCaseId,
        currentCase,
        selectedAccount,
        setSelectedAccount,
        selectedTransaction,
        setSelectedTransaction,
        graphMode,
        setGraphMode,
        isTracingFlow,
        triggerTraceFlow,
        filterInstitution,
        setFilterInstitution,
        minAmountFilter,
        setMinAmountFilter,
        timelineScrubberIndex,
        setTimelineScrubberIndex,
        isTimelinePlaying,
        setIsTimelinePlaying,
        visibleTransactions,
        assistantOpen,
        setAssistantOpen,
        askAssistant,
        guidedTourOpen,
        setGuidedTourOpen,
        tourStep,
        setTourStep,
        notes,
        addNote,
        searchQuery,
        setSearchQuery,
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
