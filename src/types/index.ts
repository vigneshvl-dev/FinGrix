// FINGRAPH - Financial Graph Intelligence & Forensics Data Types
// Compliant with Hackathon Problem Statement BYT01

export type EntityType = 
  | 'individual' 
  | 'business' 
  | 'merchant' 
  | 'shell_company' 
  | 'money_mule' 
  | 'aggregator' 
  | 'cashout_point';

export type NetworkPosition = 
  | 'Source' 
  | 'Intermediary' 
  | 'Mule' 
  | 'Sink' 
  | 'Consolidator' 
  | 'Legitimate Merchant';

export type RiskLevel = 'normal' | 'low' | 'medium' | 'high' | 'critical';

export type InstitutionName = 
  | 'HDFC Bank' 
  | 'ICICI Bank' 
  | 'State Bank of India' 
  | 'Axis Bank' 
  | 'Kotak Mahindra' 
  | 'Standard Chartered' 
  | 'Federal Bank'
  | 'YES Bank';

export interface AccountNode {
  id: string; // e.g. "ACC-1042"
  label: string; // Name or Entity
  entityType: EntityType;
  institution: InstitutionName;
  accountNumber: string; // Masked e.g. "••••4921"
  ifscCode: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  riskIndicators: string[];
  totalIncoming: number;
  totalOutgoing: number;
  balance: number;
  averageHoldingTimeMinutes: number;
  networkPosition: NetworkPosition;
  flagged: boolean;
  highInterest: boolean;
  kycStatus: 'Verified' | 'Flagged' | 'Pending Review' | 'Tier-1 High Risk';
  creationDate: string;
  city: string;
  x?: number;
  y?: number;
  nodeCategory?: 'account' | 'bank' | 'company';
}

export interface Transaction {
  id: string; // e.g. "TXN-984210"
  source: string; // source account ID
  target: string; // target account ID
  amount: number;
  currency: string;
  timestamp: string; // ISO
  displayTime: string; // e.g. "09:31:12"
  method: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI' | 'WIRE';
  referenceNumber: string;
  status: 'settled' | 'cleared';
  riskScore: number;
  isSuspicious: boolean;
  patternFlags: ('circular' | 'rapid_passthrough' | 'smurfing' | 'legitimate_commercial')[];
  holdingTimeMinutes?: number;
  notes?: string;
}

export type ScenarioType = 
  | 'scenario-c-circular'
  | 'scenario-b-rapid'
  | 'scenario-d-smurfing'
  | 'scenario-a-legitimate';

export interface ScenarioDefinition {
  id: ScenarioType;
  code: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  accounts: AccountNode[];
  transactions: Transaction[];
  stats: {
    totalFlow: number;
    accountsCount: number;
    transactionsCount: number;
    avgHoldingTime: string;
    flowDuration: string;
    riskScore: number;
    riskCategory: 'High Risk Pattern' | 'Normal Commercial Flow' | 'Severe Mule Ring';
  };
  whyFlagged: {
    circularity?: string;
    velocity?: string;
    flowPattern?: string;
    networkBehavior?: string;
    repeatedActivity?: string;
    structuring?: string;
    counterpartyNormality?: string;
  };
  evidencePoints: {
    id: string;
    title: string;
    description: string;
    transactionsInvolved: string[];
    accountsInvolved: string[];
    severity: 'critical' | 'warning' | 'info';
  }[];
}

export interface InvestigationCase {
  id: string; // e.g. "FG-2026-001" or "INV-2026-0173"
  networkId: string; // e.g. "NET-1042" or "Network #173"
  title: string;
  scenarioType: ScenarioType;
  accountsCount: number;
  transactionsCount: number;
  totalFlow: number;
  riskIndicatorsCount: number;
  status: 'Under Review' | 'Active Investigation' | 'Escalated to FIU' | 'Closed - Cleared';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assignedInvestigator: string;
  lastUpdated: string;
  leadInstitution: InstitutionName;
  summary: string;
  detectedPatterns: string[];
}

export interface AlertItem {
  id: string; // e.g. "ALERT-FG-1042"
  caseId?: string;
  pattern: 'Circular Network' | 'Rapid Pass-through' | 'Smurfing Cluster' | 'Multi-Hop Layering';
  accountsCount: number;
  involvedAccounts: string[];
  amount: number;
  timeWindow: string;
  riskIndicators: string[];
  status: 'New' | 'Under Investigation' | 'Assigned' | 'Dismissed';
  severity: 'critical' | 'high' | 'warning';
  timestamp: string;
  institution: InstitutionName;
  scenarioType: ScenarioType;
}

export interface CaseNote {
  id: string;
  author: string;
  role?: string;
  timestamp: string;
  content: string;
  taggedEntities?: string[];
}

export interface InvestigatorQueryResponse {
  answer: string;
  suggestedAction?: string;
  referencedTransactions?: string[];
  referencedAccounts?: string[];
  confidence: number;
}

export interface RawDatasetIngestionSummary {
  id: string;
  filename: string;
  format: 'CSV' | 'JSON' | 'Excel' | 'API';
  sizeBytes: string;
  transactionsCount: number;
  accountsCount: number;
  institutionsCount: number;
  suspiciousClustersDetected: number;
  timestamp: string;
  status: 'Ingested' | 'Validating' | 'Failed';
}

export interface BenignCommerceItem {
  id: string;
  entityName: string;
  category: string;
  monthlyVolume: number;
  classification: 'Normal Commerce' | 'High-Volume Legitimate' | 'Unusual' | 'Suspicious';
  reason: string;
  counterpartiesCount: number;
  settlementFrequency: string;
  exemptionStatus: 'Exempt' | 'Under Observation';
}
