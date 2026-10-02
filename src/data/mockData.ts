import { 
  AccountNode, 
  Transaction, 
  ScenarioDefinition, 
  InvestigationCase, 
  AlertItem, 
  CaseNote 
} from '../types';

// ==========================================
// SCENARIO C: CIRCULAR NETWORK (Round-Tripping)
// Case FG-2026-001 / Network #1042
// ==========================================
const scenarioC_Accounts: AccountNode[] = [
  {
    id: 'ACC-1042',
    label: 'Global Horizon Trading Pvt Ltd',
    entityType: 'shell_company',
    institution: 'HDFC Bank',
    accountNumber: '••••4921',
    ifscCode: 'HDFC0001042',
    riskLevel: 'critical',
    riskScore: 92,
    riskIndicators: ['Originator & Sink Cycle Node', 'Near-Zero Balance Retention', 'High-Frequency Layering'],
    totalIncoming: 382000,
    totalOutgoing: 374000,
    balance: 8000,
    averageHoldingTimeMinutes: 8,
    networkPosition: 'Intermediary',
    flagged: true,
    highInterest: true,
    kycStatus: 'Flagged',
    creationDate: '2025-11-14',
    city: 'Mumbai',
    x: 250,
    y: 80,
  },
  {
    id: 'ACC-1043',
    label: 'Zenith Logistics & Cargo LLP',
    entityType: 'shell_company',
    institution: 'ICICI Bank',
    accountNumber: '••••8104',
    ifscCode: 'ICIC0001043',
    riskLevel: 'critical',
    riskScore: 89,
    riskIndicators: ['Rapid Pass-Through Conduit', 'No Physical Commercial Footprint', 'Temporal Clustering'],
    totalIncoming: 374000,
    totalOutgoing: 367000,
    balance: 7000,
    averageHoldingTimeMinutes: 5,
    networkPosition: 'Intermediary',
    flagged: true,
    highInterest: false,
    kycStatus: 'Pending Review',
    creationDate: '2026-01-08',
    city: 'Ahmedabad',
    x: 520,
    y: 160,
  },
  {
    id: 'ACC-1044',
    label: 'Silverline Infrastructure Corp',
    entityType: 'shell_company',
    institution: 'Axis Bank',
    accountNumber: '••••3291',
    ifscCode: 'UTIB0001044',
    riskLevel: 'critical',
    riskScore: 94,
    riskIndicators: ['Zero Asset Balance', 'Layering Intermediary', 'Coordinated Transaction Timing'],
    totalIncoming: 367000,
    totalOutgoing: 360000,
    balance: 7000,
    averageHoldingTimeMinutes: 6,
    networkPosition: 'Intermediary',
    flagged: true,
    highInterest: false,
    kycStatus: 'Tier-1 High Risk',
    creationDate: '2025-08-22',
    city: 'Surat',
    x: 420,
    y: 380,
  },
  {
    id: 'ACC-1045',
    label: 'Vanguard FinTech Clearing Services',
    entityType: 'aggregator',
    institution: 'State Bank of India',
    accountNumber: '••••7712',
    ifscCode: 'SBIN0001045',
    riskLevel: 'high',
    riskScore: 86,
    riskIndicators: ['Fund Circular Return Link', 'High Value Preservation (96%)', 'Fee Shaving Pattern'],
    totalIncoming: 360000,
    totalOutgoing: 353000,
    balance: 7000,
    averageHoldingTimeMinutes: 9,
    networkPosition: 'Intermediary',
    flagged: true,
    highInterest: true,
    kycStatus: 'Flagged',
    creationDate: '2025-10-02',
    city: 'New Delhi',
    x: 140,
    y: 280,
  },
  {
    id: 'ACC-1046',
    label: 'Paramount Consulting (Side Feeder)',
    entityType: 'business',
    institution: 'Kotak Mahindra',
    accountNumber: '••••5532',
    ifscCode: 'KKBK0001046',
    riskLevel: 'medium',
    riskScore: 68,
    riskIndicators: ['Secondary Feeder Account', 'Shared IP Logins with ACC-1042'],
    totalIncoming: 120000,
    totalOutgoing: 118000,
    balance: 2000,
    averageHoldingTimeMinutes: 14,
    networkPosition: 'Source',
    flagged: true,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2024-05-19',
    city: 'Pune',
    x: 80,
    y: 80,
  }
];

const scenarioC_Transactions: Transaction[] = [
  {
    id: 'TXN-984210',
    source: 'ACC-1042',
    target: 'ACC-1043',
    amount: 98000,
    currency: 'INR',
    timestamp: '2026-09-28T09:31:12',
    displayTime: '09:31:12',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092809311244',
    status: 'settled',
    riskScore: 88,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 4.5,
    notes: 'Initial hop of cycle 1; transferred 4.5m after credit'
  },
  {
    id: 'TXN-984211',
    source: 'ACC-1043',
    target: 'ACC-1044',
    amount: 96500,
    currency: 'INR',
    timestamp: '2026-09-28T09:35:47',
    displayTime: '09:35:47',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092809354789',
    status: 'settled',
    riskScore: 91,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 4.3,
    notes: 'Intermediary transfer; 98.4% value preserved'
  },
  {
    id: 'TXN-984212',
    source: 'ACC-1044',
    target: 'ACC-1045',
    amount: 94800,
    currency: 'INR',
    timestamp: '2026-09-28T09:42:03',
    displayTime: '09:42:03',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092809420311',
    status: 'settled',
    riskScore: 89,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 6.2,
    notes: 'Layering transfer; minor fee deducted'
  },
  {
    id: 'TXN-984213',
    source: 'ACC-1045',
    target: 'ACC-1042',
    amount: 92400,
    currency: 'INR',
    timestamp: '2026-09-28T09:51:29',
    displayTime: '09:51:29',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092809512966',
    status: 'settled',
    riskScore: 97,
    isSuspicious: true,
    patternFlags: ['circular'],
    holdingTimeMinutes: 9.4,
    notes: 'Cycle closure: funds return to originating account ACC-1042'
  },
  // Cycle 2
  {
    id: 'TXN-984214',
    source: 'ACC-1042',
    target: 'ACC-1043',
    amount: 142000,
    currency: 'INR',
    timestamp: '2026-09-28T10:14:02',
    displayTime: '10:14:02',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092810140231',
    status: 'settled',
    riskScore: 92,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 7.1,
    notes: 'Cycle 2 initiation'
  },
  {
    id: 'TXN-984215',
    source: 'ACC-1043',
    target: 'ACC-1044',
    amount: 139500,
    currency: 'INR',
    timestamp: '2026-09-28T10:19:40',
    displayTime: '10:19:40',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092810194077',
    status: 'settled',
    riskScore: 94,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 5.6,
    notes: 'Cycle 2 rapid hop'
  },
  {
    id: 'TXN-984216',
    source: 'ACC-1044',
    target: 'ACC-1045',
    amount: 137000,
    currency: 'INR',
    timestamp: '2026-09-28T10:26:15',
    displayTime: '10:26:15',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092810261543',
    status: 'settled',
    riskScore: 93,
    isSuspicious: true,
    patternFlags: ['circular', 'rapid_passthrough'],
    holdingTimeMinutes: 6.5,
    notes: 'Cycle 2 cross-bank transfer'
  },
  {
    id: 'TXN-984217',
    source: 'ACC-1045',
    target: 'ACC-1042',
    amount: 134200,
    currency: 'INR',
    timestamp: '2026-09-28T10:38:50',
    displayTime: '10:38:50',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092810385012',
    status: 'settled',
    riskScore: 98,
    isSuspicious: true,
    patternFlags: ['circular'],
    holdingTimeMinutes: 12.5,
    notes: 'Cycle 2 closure back to ACC-1042'
  },
  // Feeder
  {
    id: 'TXN-984218',
    source: 'ACC-1046',
    target: 'ACC-1042',
    amount: 118000,
    currency: 'INR',
    timestamp: '2026-09-28T09:12:00',
    displayTime: '09:12:00',
    method: 'NEFT',
    referenceNumber: 'NEFT2026092809120055',
    status: 'settled',
    riskScore: 72,
    isSuspicious: true,
    patternFlags: ['rapid_passthrough'],
    holdingTimeMinutes: 19.2,
    notes: 'Feeder funding prior to cycle commencement'
  }
];

// ==========================================
// SCENARIO B: RAPID PASS-THROUGH (Mule Chain)
// Case FG-2026-002 / Network #2041
// ==========================================
const scenarioB_Accounts: AccountNode[] = [
  {
    id: 'ACC-2001',
    label: 'Apex Mercantile Offshore',
    entityType: 'shell_company',
    institution: 'Standard Chartered',
    accountNumber: '••••9012',
    ifscCode: 'SCBL0002001',
    riskLevel: 'critical',
    riskScore: 95,
    riskIndicators: ['High-Risk Cross-Border Inflow', 'Unregistered Entity Name', 'Originator Node'],
    totalIncoming: 1450000,
    totalOutgoing: 1450000,
    balance: 0,
    averageHoldingTimeMinutes: 12,
    networkPosition: 'Source',
    flagged: true,
    highInterest: true,
    kycStatus: 'Tier-1 High Risk',
    creationDate: '2025-09-01',
    city: 'Dubai / Mumbai Wire',
    x: 80,
    y: 200,
  },
  {
    id: 'ACC-2002',
    label: 'Rahul S. (Student Mule)',
    entityType: 'money_mule',
    institution: 'Kotak Mahindra',
    accountNumber: '••••1482',
    ifscCode: 'KKBK0002002',
    riskLevel: 'critical',
    riskScore: 91,
    riskIndicators: ['Pass-Through Duration < 6 mins', 'Zero Prior High-Value Activity', 'Immediate 99% Outflow'],
    totalIncoming: 1445000,
    totalOutgoing: 1435000,
    balance: 10000,
    averageHoldingTimeMinutes: 5.5,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: true,
    kycStatus: 'Flagged',
    creationDate: '2026-02-14',
    city: 'Jaipur',
    x: 230,
    y: 200,
  },
  {
    id: 'ACC-2003',
    label: 'Pooja V. (Dormant Account)',
    entityType: 'money_mule',
    institution: 'HDFC Bank',
    accountNumber: '••••6294',
    ifscCode: 'HDFC0002003',
    riskLevel: 'critical',
    riskScore: 93,
    riskIndicators: ['Sudden Reactivation after 18 Months', 'Holding Time < 4 mins', 'Automated Script Transfer'],
    totalIncoming: 1435000,
    totalOutgoing: 1422000,
    balance: 13000,
    averageHoldingTimeMinutes: 4.1,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Flagged',
    creationDate: '2023-04-10',
    city: 'Indore',
    x: 390,
    y: 200,
  },
  {
    id: 'ACC-2004',
    label: 'Mohd. Imran (Agricultural Conduit)',
    entityType: 'money_mule',
    institution: 'State Bank of India',
    accountNumber: '••••3810',
    ifscCode: 'SBIN0002004',
    riskLevel: 'critical',
    riskScore: 90,
    riskIndicators: ['Holding Time < 7 mins', 'Disproportionate to Declared Income', 'Multi-Bank Hop'],
    totalIncoming: 1422000,
    totalOutgoing: 1410000,
    balance: 12000,
    averageHoldingTimeMinutes: 6.8,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Pending Review',
    creationDate: '2024-11-20',
    city: 'Alwar',
    x: 550,
    y: 200,
  },
  {
    id: 'ACC-2005',
    label: 'NexGen Digital Asset OTC Desk',
    entityType: 'cashout_point',
    institution: 'ICICI Bank',
    accountNumber: '••••7199',
    ifscCode: 'ICIC0002005',
    riskLevel: 'critical',
    riskScore: 96,
    riskIndicators: ['Terminal Cashout Point', 'Immediate P2P Crypto Conversion', 'Rapid Liquidation Sink'],
    totalIncoming: 1410000,
    totalOutgoing: 1400000,
    balance: 10000,
    averageHoldingTimeMinutes: 8.0,
    networkPosition: 'Sink',
    flagged: true,
    highInterest: true,
    kycStatus: 'Tier-1 High Risk',
    creationDate: '2025-12-01',
    city: 'Bengaluru',
    x: 710,
    y: 200,
  }
];

const scenarioB_Transactions: Transaction[] = [
  {
    id: 'TXN-820101',
    source: 'ACC-2001',
    target: 'ACC-2002',
    amount: 1445000,
    currency: 'INR',
    timestamp: '2026-09-28T14:02:10',
    displayTime: '14:02:10',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092814021001',
    status: 'settled',
    riskScore: 93,
    isSuspicious: true,
    patternFlags: ['rapid_passthrough'],
    holdingTimeMinutes: 5.5,
    notes: 'Offshore wire credited to student account'
  },
  {
    id: 'TXN-820102',
    source: 'ACC-2002',
    target: 'ACC-2003',
    amount: 1435000,
    currency: 'INR',
    timestamp: '2026-09-28T14:07:42',
    displayTime: '14:07:42',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092814074202',
    status: 'settled',
    riskScore: 95,
    isSuspicious: true,
    patternFlags: ['rapid_passthrough'],
    holdingTimeMinutes: 4.1,
    notes: 'Pass-through in 5m 32s. 99.3% forwarded onward'
  },
  {
    id: 'TXN-820103',
    source: 'ACC-2003',
    target: 'ACC-2004',
    amount: 1422000,
    currency: 'INR',
    timestamp: '2026-09-28T14:11:50',
    displayTime: '14:11:50',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092814115003',
    status: 'settled',
    riskScore: 94,
    isSuspicious: true,
    patternFlags: ['rapid_passthrough'],
    holdingTimeMinutes: 6.8,
    notes: 'Pass-through in 4m 08s. Intermediary 2 to Intermediary 3'
  },
  {
    id: 'TXN-820104',
    source: 'ACC-2004',
    target: 'ACC-2005',
    amount: 1410000,
    currency: 'INR',
    timestamp: '2026-09-28T14:18:38',
    displayTime: '14:18:38',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092814183804',
    status: 'settled',
    riskScore: 97,
    isSuspicious: true,
    patternFlags: ['rapid_passthrough'],
    holdingTimeMinutes: 8.0,
    notes: 'Terminal transfer to OTC Crypto Desk. Total chain duration: 16m 28s'
  }
];

// ==========================================
// SCENARIO D: SMURFING (Structuring Fan-In)
// Case FG-2026-003 / Network #3088
// ==========================================
const scenarioD_Accounts: AccountNode[] = [
  {
    id: 'ACC-3001',
    label: 'Kaveri Bullion & Jewels Pvt Ltd',
    entityType: 'business',
    institution: 'Axis Bank',
    accountNumber: '••••9920',
    ifscCode: 'UTIB0003001',
    riskLevel: 'critical',
    riskScore: 96,
    riskIndicators: ['Structuring Aggregator Node', 'Fan-in of 12 Sub-Threshold Credits', 'Rapid Consolidation Outflow'],
    totalIncoming: 842000,
    totalOutgoing: 820000,
    balance: 22000,
    averageHoldingTimeMinutes: 18,
    networkPosition: 'Consolidator',
    flagged: true,
    highInterest: true,
    kycStatus: 'Tier-1 High Risk',
    creationDate: '2024-03-12',
    city: 'Zaveri Bazaar, Mumbai',
    x: 450,
    y: 220,
  },
  {
    id: 'ACC-3002',
    label: 'Mule Smurf-01 (Vikram K.)',
    entityType: 'money_mule',
    institution: 'HDFC Bank',
    accountNumber: '••••1011',
    ifscCode: 'HDFC0003002',
    riskLevel: 'high',
    riskScore: 82,
    riskIndicators: ['Transfer just below ₹50k limit', 'Cash deposit preceding transfer'],
    totalIncoming: 49500,
    totalOutgoing: 49000,
    balance: 500,
    averageHoldingTimeMinutes: 12,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Flagged',
    creationDate: '2026-01-19',
    city: 'Thane',
    x: 180,
    y: 80,
  },
  {
    id: 'ACC-3003',
    label: 'Mule Smurf-02 (Arun M.)',
    entityType: 'money_mule',
    institution: 'ICICI Bank',
    accountNumber: '••••1012',
    ifscCode: 'ICIC0003003',
    riskLevel: 'high',
    riskScore: 84,
    riskIndicators: ['Sub-threshold deposit', 'Coordinated execution timestamp'],
    totalIncoming: 48900,
    totalOutgoing: 48500,
    balance: 400,
    averageHoldingTimeMinutes: 9,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Pending Review',
    creationDate: '2025-11-29',
    city: 'Navi Mumbai',
    x: 180,
    y: 150,
  },
  {
    id: 'ACC-3004',
    label: 'Mule Smurf-03 (Suresh P.)',
    entityType: 'money_mule',
    institution: 'State Bank of India',
    accountNumber: '••••1013',
    ifscCode: 'SBIN0003004',
    riskLevel: 'high',
    riskScore: 83,
    riskIndicators: ['Structuring signature ₹49,200', 'Same IP address subnet'],
    totalIncoming: 49200,
    totalOutgoing: 49200,
    balance: 0,
    averageHoldingTimeMinutes: 15,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Flagged',
    creationDate: '2025-07-14',
    city: 'Kalyan',
    x: 180,
    y: 220,
  },
  {
    id: 'ACC-3005',
    label: 'Mule Smurf-04 (Dinesh T.)',
    entityType: 'money_mule',
    institution: 'Kotak Mahindra',
    accountNumber: '••••1014',
    ifscCode: 'KKBK0003005',
    riskLevel: 'high',
    riskScore: 81,
    riskIndicators: ['Sub-threshold structuring', 'Coordinated fan-in'],
    totalIncoming: 48200,
    totalOutgoing: 48000,
    balance: 200,
    averageHoldingTimeMinutes: 11,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Pending Review',
    creationDate: '2026-02-01',
    city: 'Vashi',
    x: 180,
    y: 290,
  },
  {
    id: 'ACC-3006',
    label: 'Mule Smurf-05 (Ramesh B.)',
    entityType: 'money_mule',
    institution: 'Federal Bank',
    accountNumber: '••••1015',
    ifscCode: 'FDRL0003006',
    riskLevel: 'high',
    riskScore: 85,
    riskIndicators: ['Sub-threshold structuring', 'High-velocity credit'],
    totalIncoming: 49800,
    totalOutgoing: 49500,
    balance: 300,
    averageHoldingTimeMinutes: 8,
    networkPosition: 'Mule',
    flagged: true,
    highInterest: false,
    kycStatus: 'Flagged',
    creationDate: '2025-10-18',
    city: 'Panvel',
    x: 180,
    y: 360,
  },
  {
    id: 'ACC-3099',
    label: 'Horizon Offshore Liquidation Ltd',
    entityType: 'shell_company',
    institution: 'Standard Chartered',
    accountNumber: '••••8841',
    ifscCode: 'SCBL0003099',
    riskLevel: 'critical',
    riskScore: 98,
    riskIndicators: ['Single Consolidated Extraction', 'Offshore Tax Haven Destination', 'Zero Prior Commercial Relationship'],
    totalIncoming: 820000,
    totalOutgoing: 0,
    balance: 820000,
    averageHoldingTimeMinutes: 0,
    networkPosition: 'Sink',
    flagged: true,
    highInterest: true,
    kycStatus: 'Tier-1 High Risk',
    creationDate: '2024-09-09',
    city: 'Port Louis / Mumbai Clearing',
    x: 720,
    y: 220,
  }
];

const scenarioD_Transactions: Transaction[] = [
  {
    id: 'TXN-730001',
    source: 'ACC-3002',
    target: 'ACC-3001',
    amount: 49000,
    currency: 'INR',
    timestamp: '2026-09-28T11:05:12',
    displayTime: '11:05:12',
    method: 'UPI',
    referenceNumber: 'UPI2026092811051201',
    status: 'settled',
    riskScore: 87,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 12,
    notes: 'Sub-₹50,000 threshold transfer #1'
  },
  {
    id: 'TXN-730002',
    source: 'ACC-3003',
    target: 'ACC-3001',
    amount: 48500,
    currency: 'INR',
    timestamp: '2026-09-28T11:12:30',
    displayTime: '11:12:30',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092811123002',
    status: 'settled',
    riskScore: 88,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 9,
    notes: 'Sub-₹50,000 threshold transfer #2'
  },
  {
    id: 'TXN-730003',
    source: 'ACC-3004',
    target: 'ACC-3001',
    amount: 49200,
    currency: 'INR',
    timestamp: '2026-09-28T11:18:45',
    displayTime: '11:18:45',
    method: 'UPI',
    referenceNumber: 'UPI2026092811184503',
    status: 'settled',
    riskScore: 89,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 15,
    notes: 'Sub-₹50,000 threshold transfer #3'
  },
  {
    id: 'TXN-730004',
    source: 'ACC-3005',
    target: 'ACC-3001',
    amount: 48000,
    currency: 'INR',
    timestamp: '2026-09-28T11:24:10',
    displayTime: '11:24:10',
    method: 'IMPS',
    referenceNumber: 'IMPS2026092811241004',
    status: 'settled',
    riskScore: 86,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 11,
    notes: 'Sub-₹50,000 threshold transfer #4'
  },
  {
    id: 'TXN-730005',
    source: 'ACC-3006',
    target: 'ACC-3001',
    amount: 49500,
    currency: 'INR',
    timestamp: '2026-09-28T11:31:02',
    displayTime: '11:31:02',
    method: 'UPI',
    referenceNumber: 'UPI2026092811310205',
    status: 'settled',
    riskScore: 90,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 8,
    notes: 'Sub-₹50,000 threshold transfer #5'
  },
  {
    id: 'TXN-730099',
    source: 'ACC-3001',
    target: 'ACC-3099',
    amount: 820000,
    currency: 'INR',
    timestamp: '2026-09-28T12:45:00',
    displayTime: '12:45:00',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092812450099',
    status: 'settled',
    riskScore: 96,
    isSuspicious: true,
    patternFlags: ['smurfing'],
    holdingTimeMinutes: 74,
    notes: 'Consolidated extraction of structured funds directly to offshore entity'
  }
];

// ==========================================
// SCENARIO A: LEGITIMATE COMMERCE (Control / Filtered)
// High Transaction Volume, But Normal Commercial Behavior
// ==========================================
const scenarioA_Accounts: AccountNode[] = [
  {
    id: 'ACC-8001',
    label: 'Apex National Wholesale Logistics Ltd',
    entityType: 'business',
    institution: 'HDFC Bank',
    accountNumber: '••••7200',
    ifscCode: 'HDFC0008001',
    riskLevel: 'normal',
    riskScore: 14,
    riskIndicators: ['High Transaction Volume (Legitimate Commercial Routine)'],
    totalIncoming: 34200000,
    totalOutgoing: 31800000,
    balance: 2400000,
    averageHoldingTimeMinutes: 20160, // ~14 days holding time
    networkPosition: 'Legitimate Merchant',
    flagged: false,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2018-03-15',
    city: 'Gurugram',
    x: 400,
    y: 200,
  },
  {
    id: 'ACC-8002',
    label: 'Metro Retail Mart Chain Pvt Ltd',
    entityType: 'merchant',
    institution: 'ICICI Bank',
    accountNumber: '••••8112',
    ifscCode: 'ICIC0008002',
    riskLevel: 'normal',
    riskScore: 11,
    riskIndicators: ['Stable Recurring Counterparty (36 Month Commercial History)'],
    totalIncoming: 18500000,
    totalOutgoing: 17200000,
    balance: 1300000,
    averageHoldingTimeMinutes: 43200, // 30 days
    networkPosition: 'Legitimate Merchant',
    flagged: false,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2017-06-20',
    city: 'Noida',
    x: 160,
    y: 100,
  },
  {
    id: 'ACC-8003',
    label: 'Reliance Fresh Franchisee Cluster',
    entityType: 'merchant',
    institution: 'State Bank of India',
    accountNumber: '••••9341',
    ifscCode: 'SBIN0008003',
    riskLevel: 'normal',
    riskScore: 12,
    riskIndicators: ['Regular Business Hours Settlement', 'GST Reconciled Invoicing'],
    totalIncoming: 12400000,
    totalOutgoing: 11900000,
    balance: 500000,
    averageHoldingTimeMinutes: 30240, // 21 days
    networkPosition: 'Legitimate Merchant',
    flagged: false,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2019-01-11',
    city: 'Delhi NCR',
    x: 160,
    y: 300,
  },
  {
    id: 'ACC-8004',
    label: 'Bharat Electronics Component Depot',
    entityType: 'business',
    institution: 'Axis Bank',
    accountNumber: '••••4102',
    ifscCode: 'UTIB0008004',
    riskLevel: 'normal',
    riskScore: 15,
    riskIndicators: ['Periodic Bulk Vendor Payment', 'Consistent Monthly Cadence'],
    totalIncoming: 8900000,
    totalOutgoing: 8100000,
    balance: 800000,
    averageHoldingTimeMinutes: 25920, // 18 days
    networkPosition: 'Legitimate Merchant',
    flagged: false,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2016-11-04',
    city: 'Chandigarh',
    x: 640,
    y: 120,
  },
  {
    id: 'ACC-8005',
    label: 'ColdChain Express Transport Ltd',
    entityType: 'business',
    institution: 'Kotak Mahindra',
    accountNumber: '••••5519',
    ifscCode: 'KKBK0008005',
    riskLevel: 'normal',
    riskScore: 13,
    riskIndicators: ['Standard Commercial Freight Settlement'],
    totalIncoming: 4200000,
    totalOutgoing: 3900000,
    balance: 300000,
    averageHoldingTimeMinutes: 14400, // 10 days
    networkPosition: 'Legitimate Merchant',
    flagged: false,
    highInterest: false,
    kycStatus: 'Verified',
    creationDate: '2020-04-18',
    city: 'Faridabad',
    x: 640,
    y: 280,
  }
];

const scenarioA_Transactions: Transaction[] = [
  {
    id: 'TXN-110001',
    source: 'ACC-8002',
    target: 'ACC-8001',
    amount: 1420000,
    currency: 'INR',
    timestamp: '2026-09-21T11:30:00',
    displayTime: '11:30:00',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092111300001',
    status: 'settled',
    riskScore: 12,
    isSuspicious: false,
    patternFlags: ['legitimate_commercial'],
    notes: 'Invoice #INV-2026-9041 (FMCG Batch Settlement)'
  },
  {
    id: 'TXN-110002',
    source: 'ACC-8003',
    target: 'ACC-8001',
    amount: 890000,
    currency: 'INR',
    timestamp: '2026-09-22T14:15:00',
    displayTime: '14:15:00',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092214150002',
    status: 'settled',
    riskScore: 14,
    isSuspicious: false,
    patternFlags: ['legitimate_commercial'],
    notes: 'Invoice #INV-2026-9042 (Weekly Store Delivery)'
  },
  {
    id: 'TXN-110003',
    source: 'ACC-8001',
    target: 'ACC-8004',
    amount: 1150000,
    currency: 'INR',
    timestamp: '2026-09-25T16:00:00',
    displayTime: '16:00:00',
    method: 'RTGS',
    referenceNumber: 'RTGS2026092516000003',
    status: 'settled',
    riskScore: 10,
    isSuspicious: false,
    patternFlags: ['legitimate_commercial'],
    notes: 'Vendor Procurement Payment for warehouse electronics'
  },
  {
    id: 'TXN-110004',
    source: 'ACC-8001',
    target: 'ACC-8005',
    amount: 340000,
    currency: 'INR',
    timestamp: '2026-09-26T17:30:00',
    displayTime: '17:30:00',
    method: 'NEFT',
    referenceNumber: 'NEFT2026092617300004',
    status: 'settled',
    riskScore: 11,
    isSuspicious: false,
    patternFlags: ['legitimate_commercial'],
    notes: 'Monthly fleet logistics dispatch fee'
  }
];

// ==========================================
// SCENARIO DEFINITIONS
// ==========================================
export const SCENARIOS: Record<string, ScenarioDefinition> = {
  'scenario-c-circular': {
    id: 'scenario-c-circular',
    code: 'SCENARIO-C',
    name: 'Circular Network (Round-Tripping)',
    category: 'Layering & Round-Tripping',
    tagline: 'Repeated 4-Account Cycle with 94.3% Fund Retention',
    description: 'Repeated transaction paths where funds move through 4 corporate shell accounts across 4 distinct financial institutions and return to the originating account within 41 minutes.',
    accounts: scenarioC_Accounts,
    transactions: scenarioC_Transactions,
    stats: {
      totalFlow: 1146400,
      accountsCount: 5,
      transactionsCount: 9,
      avgHoldingTime: '7.8 min',
      flowDuration: '41 min cycle',
      riskScore: 94,
      riskCategory: 'High Risk Pattern',
    },
    whyFlagged: {
      circularity: 'A 4-account transaction cycle was identified returning funds to originating entity ACC-1042.',
      velocity: 'Funds moved through 4 institutions within 41 minutes with an average intermediary holding time of 6.2 minutes.',
      flowPattern: 'Substantial portions of incoming funds (94.3% retention) were transferred onward shortly after receipt.',
      networkBehavior: 'Multiple shell entities with zero physical business footprint connect otherwise weakly related accounts.',
      repeatedActivity: 'Exact circular sequence repeated across 2 discrete waves on 2026-09-28 with minor fee shaving.',
    },
    evidencePoints: [
      {
        id: 'EVD-C01',
        title: 'Closed Topology Detection',
        description: 'Topology analysis confirmed directed loop: ACC-1042 → ACC-1043 → ACC-1044 → ACC-1045 → ACC-1042.',
        transactionsInvolved: ['TXN-984210', 'TXN-984211', 'TXN-984212', 'TXN-984213'],
        accountsInvolved: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
        severity: 'critical',
      },
      {
        id: 'EVD-C02',
        title: 'Rapid Turnover (Negligible Retention)',
        description: 'Accounts ACC-1043 and ACC-1044 dissipated 98.4% of received funds within 5 minutes of receipt.',
        transactionsInvolved: ['TXN-984211', 'TXN-984212'],
        accountsInvolved: ['ACC-1043', 'ACC-1044'],
        severity: 'critical',
      },
      {
        id: 'EVD-C03',
        title: 'Cross-Bank Coordination',
        description: 'Movement spans HDFC Bank, ICICI Bank, Axis Bank, and State Bank of India via automated IMPS scripts.',
        transactionsInvolved: ['TXN-984210', 'TXN-984211', 'TXN-984212', 'TXN-984213'],
        accountsInvolved: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
        severity: 'warning',
      }
    ]
  },

  'scenario-b-rapid': {
    id: 'scenario-b-rapid',
    code: 'SCENARIO-B',
    name: 'Rapid Pass-Through Mule Chain',
    category: 'Mule Relay & Layering',
    tagline: 'Linear 5-Hop Mule Relay Liquidation in 16 Minutes',
    description: 'High-velocity linear pass-through where ₹14.5L moves from an offshore wire through three student and dormant intermediary accounts within 16 minutes before reaching an OTC crypto liquidation desk.',
    accounts: scenarioB_Accounts,
    transactions: scenarioB_Transactions,
    stats: {
      totalFlow: 1450000,
      accountsCount: 5,
      transactionsCount: 4,
      avgHoldingTime: '5.6 min',
      flowDuration: '16m 28s total',
      riskScore: 96,
      riskCategory: 'Severe Mule Ring',
    },
    whyFlagged: {
      circularity: 'Non-circular directed pipeline optimized for rapid obfuscation and jurisdiction hopping.',
      velocity: 'Funds moved through 5 distinct banking institutions in under 17 minutes.',
      flowPattern: '98.6% of funds passed through with under 6 minutes average holding time across all intermediaries.',
      networkBehavior: 'Intermediary nodes consist of low-activity student and dormant accounts abruptly activated.',
      repeatedActivity: 'Matching historical pattern of coordinated mule syndicate operations.',
    },
    evidencePoints: [
      {
        id: 'EVD-B01',
        title: 'Mule Intermediary Rapid Relay',
        description: 'Account ACC-2002 forwarded ₹14.35L 5 minutes after receiving ₹14.45L from offshore entity.',
        transactionsInvolved: ['TXN-820101', 'TXN-820102'],
        accountsInvolved: ['ACC-2001', 'ACC-2002', 'ACC-2003'],
        severity: 'critical',
      },
      {
        id: 'EVD-B02',
        title: 'Dormant Account Reactivation',
        description: 'Account ACC-2003 had zero activity for 18 months prior to receiving and immediately forwarding ₹14.22L.',
        transactionsInvolved: ['TXN-820102', 'TXN-820103'],
        accountsInvolved: ['ACC-2003', 'ACC-2004'],
        severity: 'critical',
      },
      {
        id: 'EVD-B03',
        title: 'Terminal OTC Cashout',
        description: 'Final destination is a known high-risk OTC crypto exchange desk (ACC-2005).',
        transactionsInvolved: ['TXN-820104'],
        accountsInvolved: ['ACC-2004', 'ACC-2005'],
        severity: 'critical',
      }
    ]
  },

  'scenario-d-smurfing': {
    id: 'scenario-d-smurfing',
    code: 'SCENARIO-D',
    name: 'Smurfing / Structuring Cluster',
    category: 'Structuring & Fan-In',
    tagline: 'Coordinated Sub-₹50,000 Fan-In with Single High-Value Exit',
    description: 'Clusters of small, sub-threshold transactions (just under statutory ₹50,000 reporting limits) originating from multiple individual mules within a concentrated time window, aggregating into a central bullion merchant account before single offshore wire.',
    accounts: scenarioD_Accounts,
    transactions: scenarioD_Transactions,
    stats: {
      totalFlow: 842000,
      accountsCount: 7,
      transactionsCount: 6,
      avgHoldingTime: '11.4 min',
      flowDuration: '1h 40m window',
      riskScore: 92,
      riskCategory: 'High Risk Pattern',
    },
    whyFlagged: {
      structuring: 'Multiple transfers structured between ₹48,000 and ₹49,800 specifically to evade the statutory ₹50,000 reporting threshold.',
      velocity: '5 transfers executed within a 26-minute window from geographically separated accounts.',
      flowPattern: 'Fan-in consolidation: multiple low-value sources converge into a single business entity followed by lump-sum exit.',
      networkBehavior: 'Coordinated sender accounts share common IP subnets and device fingerprints despite different declared identities.',
      repeatedActivity: 'Matches classic smurfing topology documented in FIU advisory notices.',
    },
    evidencePoints: [
      {
        id: 'EVD-D01',
        title: 'Statutory Threshold Evasion Pattern',
        description: 'All 5 incoming transactions fall in the narrow band of ₹48,000 - ₹49,800 (96-99.6% of ₹50,000 CTR trigger).',
        transactionsInvolved: ['TXN-730001', 'TXN-730002', 'TXN-730003', 'TXN-730004', 'TXN-730005'],
        accountsInvolved: ['ACC-3002', 'ACC-3003', 'ACC-3004', 'ACC-3005', 'ACC-3006'],
        severity: 'critical',
      },
      {
        id: 'EVD-D02',
        title: 'Lump-Sum Offshore Consolidation',
        description: 'Collector account ACC-3001 consolidated ₹8.2L and transferred to offshore entity within 74 minutes.',
        transactionsInvolved: ['TXN-730099'],
        accountsInvolved: ['ACC-3001', 'ACC-3099'],
        severity: 'critical',
      }
    ]
  },

  'scenario-a-legitimate': {
    id: 'scenario-a-legitimate',
    code: 'SCENARIO-A',
    name: 'Legitimate High-Volume Commerce (Control)',
    category: 'High-Volume Commercial Commerce',
    tagline: 'High Transaction Volume Reconciled Against Normal Commercial Activity',
    description: 'High transaction volume FMCG logistics corporation with stable counterparties, 14-30 day payment settlement cycles, verified invoice metadata, and zero circularity or rapid pass-through indicators. Filtered out by the Legitimate High-Volume Classifier.',
    accounts: scenarioA_Accounts,
    transactions: scenarioA_Transactions,
    stats: {
      totalFlow: 34200000,
      accountsCount: 5,
      transactionsCount: 4,
      avgHoldingTime: '14.2 days',
      flowDuration: 'Normal Monthly Cycle',
      riskScore: 14,
      riskCategory: 'Normal Commercial Flow',
    },
    whyFlagged: {
      counterpartyNormality: 'Stable commercial counterparties with unbroken 3+ year history of bilateral goods and services exchange.',
      velocity: 'Settlement intervals align with standard commercial credit terms (14 to 30 days holding time).',
      flowPattern: 'Funds retained in operating capital; no rapid onward dispersal or pass-through behavior.',
      networkBehavior: 'Direct bilateral vendor/customer topology with no intermediary shell companies or circular loops.',
      repeatedActivity: 'Regular business hours transactions with legitimate GST and e-way bill reconciliation.',
    },
    evidencePoints: [
      {
        id: 'EVD-A01',
        title: 'High-Volume Legitimate Exemption',
        description: 'Reconciled against verified commercial tax filings; classified as NORMAL BUSINESS ACTIVITY.',
        transactionsInvolved: ['TXN-110001', 'TXN-110002', 'TXN-110003', 'TXN-110004'],
        accountsInvolved: ['ACC-8001', 'ACC-8002', 'ACC-8003', 'ACC-8004', 'ACC-8005'],
        severity: 'info',
      }
    ]
  }
};

// ==========================================
// ACTIVE INVESTIGATION CASES
// ==========================================
export const INVESTIGATION_CASES: InvestigationCase[] = [
  {
    id: 'INV-2026-0173',
    networkId: 'Suspicious Network #173',
    title: 'CASE #INV-2026-0173: Multi-Bank Circular & Rapid Pass-Through Ring',
    scenarioType: 'scenario-c-circular',
    accountsCount: 27,
    transactionsCount: 184,
    totalFlow: 48200000, // ₹4.82 Cr
    riskIndicatorsCount: 9,
    status: 'Active Investigation',
    priority: 'Critical',
    assignedInvestigator: 'V. Kumar (Lead Forensics Investigator)',
    lastUpdated: '4 mins ago',
    leadInstitution: 'HDFC Bank',
    summary: '27 accounts across 5 financial institutions coordinating multi-hop circular flows and rapid pass-through conduit layering between 18 Sep – 22 Sep 2026.',
    detectedPatterns: ['Circular Fund Flow', 'Rapid Pass-Through Chain', 'Cross-Institution Layering']
  },
  {
    id: 'FG-2026-001',
    networkId: 'NET-1042',
    title: 'Coordinated Transaction Network (Round-Tripping)',
    scenarioType: 'scenario-c-circular',
    accountsCount: 17,
    transactionsCount: 284,
    totalFlow: 28400000, // ₹2.84 Cr
    riskIndicatorsCount: 6,
    status: 'Under Review',
    priority: 'Critical',
    assignedInvestigator: 'V. Kumar (Senior Forensics Lead)',
    lastUpdated: '12 mins ago',
    leadInstitution: 'HDFC Bank',
    summary: '17 accounts across 4 major banks exhibiting repeated circular flows with 94.3% value retention and 41-minute cycle turnover.',
    detectedPatterns: ['Circular Flow', 'Rapid Pass-through', 'Repeated Sequence']
  },
  {
    id: 'FG-2026-002',
    networkId: 'NET-2041',
    title: 'Linear Multi-Hop Mule Conduit Ring',
    scenarioType: 'scenario-b-rapid',
    accountsCount: 12,
    transactionsCount: 89,
    totalFlow: 14500000, // ₹1.45 Cr
    riskIndicatorsCount: 5,
    status: 'Active Investigation',
    priority: 'Critical',
    assignedInvestigator: 'A. Roy (Financial Crimes Analyst)',
    lastUpdated: '34 mins ago',
    leadInstitution: 'Standard Chartered',
    summary: 'High-velocity linear mule relay moving offshore funds through student and dormant accounts into an OTC crypto cashout terminal.',
    detectedPatterns: ['Rapid Pass-through', 'Dormant Account Abuse', 'Mule Network']
  },
  {
    id: 'FG-2026-003',
    networkId: 'NET-3088',
    title: 'Sub-Threshold Fan-In Smurfing Cluster',
    scenarioType: 'scenario-d-smurfing',
    accountsCount: 24,
    transactionsCount: 192,
    totalFlow: 8420000, // ₹84.2 L
    riskIndicatorsCount: 7,
    status: 'Escalated to FIU',
    priority: 'High',
    assignedInvestigator: 'S. Nambiar (Forensic Auditor)',
    lastUpdated: '2 hours ago',
    leadInstitution: 'Axis Bank',
    summary: 'Coordinated structuring cluster depositing just below ₹50,000 regulatory reporting threshold into bullion merchant account.',
    detectedPatterns: ['Smurfing', 'Structuring', 'Lump-Sum Extraction']
  },
  {
    id: 'FG-2026-004',
    networkId: 'NET-8001',
    title: 'Wholesale FMCG Commercial Network (Cleared)',
    scenarioType: 'scenario-a-legitimate',
    accountsCount: 38,
    transactionsCount: 412,
    totalFlow: 34200000, // ₹3.42 Cr
    riskIndicatorsCount: 1,
    status: 'Closed - Cleared',
    priority: 'Low',
    assignedInvestigator: 'P. Mehta (Senior Compliance Officer)',
    lastUpdated: '1 day ago',
    leadInstitution: 'HDFC Bank',
    summary: 'High-volume commercial entity validated against GST invoices and 3-year supply chain history. Exempted by Legitimate Commerce Classifier.',
    detectedPatterns: ['Legitimate Commercial Activity', 'High Volume Exemption']
  }
];

// ==========================================
// SYSTEM ALERTS INBOX
// ==========================================
export const ALERTS_LIST: AlertItem[] = [
  {
    id: 'ALERT-FG-1042',
    caseId: 'FG-2026-001',
    pattern: 'Circular Network',
    accountsCount: 4,
    involvedAccounts: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
    amount: 382000,
    timeWindow: '41-minute cycle',
    riskIndicators: [
      'Circular transaction path identified',
      'Rapid fund movement (avg 6m holding)',
      'Repeated counterparties across cycles',
      'High value retention (94.3%)'
    ],
    status: 'Under Investigation',
    severity: 'critical',
    timestamp: '2026-09-28 09:52:00',
    institution: 'HDFC Bank',
    scenarioType: 'scenario-c-circular'
  },
  {
    id: 'ALERT-FG-2041',
    caseId: 'FG-2026-002',
    pattern: 'Rapid Pass-through',
    accountsCount: 5,
    involvedAccounts: ['ACC-2001', 'ACC-2002', 'ACC-2003', 'ACC-2004', 'ACC-2005'],
    amount: 1450000,
    timeWindow: '16m 28s duration',
    riskIndicators: [
      'Velocity exceeds threshold (< 8 min holding)',
      'Multi-hop intermediary chain',
      'Sudden dormant account activity',
      'Terminal OTC crypto destination'
    ],
    status: 'New',
    severity: 'critical',
    timestamp: '2026-09-28 14:19:10',
    institution: 'Standard Chartered',
    scenarioType: 'scenario-b-rapid'
  },
  {
    id: 'ALERT-FG-3088',
    caseId: 'FG-2026-003',
    pattern: 'Smurfing Cluster',
    accountsCount: 7,
    involvedAccounts: ['ACC-3001', 'ACC-3002', 'ACC-3003', 'ACC-3004', 'ACC-3005', 'ACC-3006'],
    amount: 842000,
    timeWindow: '1h 40m window',
    riskIndicators: [
      '12 sub-₹50k transfers in narrow time band',
      'Structuring pattern evasive of CTR',
      'Single consolidator recipient',
      'Immediate offshore extraction'
    ],
    status: 'Assigned',
    severity: 'high',
    timestamp: '2026-09-28 12:46:30',
    institution: 'Axis Bank',
    scenarioType: 'scenario-d-smurfing'
  },
  {
    id: 'ALERT-FG-4491',
    pattern: 'Multi-Hop Layering',
    accountsCount: 6,
    involvedAccounts: ['ACC-4401', 'ACC-4402', 'ACC-4403'],
    amount: 5200000,
    timeWindow: '3h 15m window',
    riskIndicators: [
      'Cross-institution split transfers',
      'Immediate forward routing',
      'Inconsistent beneficial ownership'
    ],
    status: 'New',
    severity: 'high',
    timestamp: '2026-09-28 15:10:00',
    institution: 'ICICI Bank',
    scenarioType: 'scenario-b-rapid'
  }
];

// ==========================================
// CASE EVIDENCE & INVESTIGATOR NOTES
// ==========================================
export const CASE_NOTES: Record<string, CaseNote[]> = {
  'FG-2026-001': [
    {
      id: 'NOTE-01',
      author: 'V. Kumar (Lead Forensics)',
      timestamp: '2026-09-28 10:45:00',
      content: 'Initial analysis of Network #1042 confirms 2 complete round-tripping cycles within 70 minutes. Entities ACC-1043 and ACC-1044 share a registered address in Ahmedabad and common incorporation agents.',
      taggedEntities: ['ACC-1042', 'ACC-1043', 'ACC-1044']
    },
    {
      id: 'NOTE-02',
      author: 'R. Sharma (AML Intelligence)',
      timestamp: '2026-09-28 11:30:15',
      content: 'Cross-bank coordination request issued to Axis Bank and SBI compliance officers for beneficial ownership disclosures on ACC-1044 and ACC-1045.',
      taggedEntities: ['ACC-1044', 'ACC-1045']
    }
  ]
};

// ==========================================
// FLOW ANALYTICS TIMESERIES
// ==========================================
export const FLOW_ANALYTICS_DATA = {
  '1D': [
    { time: '00:00', volume: 4200000, suspicious: 120000, networks: 4 },
    { time: '04:00', volume: 1800000, suspicious: 450000, networks: 8 },
    { time: '08:00', volume: 8900000, suspicious: 1840000, networks: 21 },
    { time: '12:00', volume: 19500000, suspicious: 4820000, networks: 54 },
    { time: '16:00', volume: 24100000, suspicious: 6200000, networks: 68 },
    { time: '20:00', volume: 14200000, suspicious: 3800000, networks: 39 },
    { time: '23:59', volume: 6800000, suspicious: 1470000, networks: 18 },
  ],
  '7D': [
    { time: 'Sep 22', volume: 84000000, suspicious: 14200000, networks: 98 },
    { time: 'Sep 23', volume: 92000000, suspicious: 18900000, networks: 112 },
    { time: 'Sep 24', volume: 88000000, suspicious: 16400000, networks: 105 },
    { time: 'Sep 25', volume: 95000000, suspicious: 21000000, networks: 134 },
    { time: 'Sep 26', volume: 110000000, suspicious: 24500000, networks: 149 },
    { time: 'Sep 27', volume: 64000000, suspicious: 12800000, networks: 88 },
    { time: 'Sep 28', volume: 104000000, suspicious: 18700000, networks: 173 },
  ],
  '30D': [
    { time: 'Week 1', volume: 420000000, suspicious: 72000000, networks: 340 },
    { time: 'Week 2', volume: 460000000, suspicious: 81000000, networks: 390 },
    { time: 'Week 3', volume: 490000000, suspicious: 89000000, networks: 412 },
    { time: 'Week 4', volume: 510000000, suspicious: 94000000, networks: 450 },
  ],
  '90D': [
    { time: 'Month 1', volume: 1650000000, suspicious: 280000000, networks: 1100 },
    { time: 'Month 2', volume: 1820000000, suspicious: 310000000, networks: 1280 },
    { time: 'Month 3', volume: 1980000000, suspicious: 345000000, networks: 1420 },
  ]
};

// Executive Top KPIs
export const EXECUTIVE_KPIS = {
  transactionsAnalyzed: 12483921,
  accounts: 48231,
  flaggedNetworks: 173,
  flaggedAccounts: 1284,
  investigations: 46,
  suspiciousFlowFormatted: '₹18.7 Cr',
  detectionSummary: {
    circularFlow: 42,
    rapidPassthrough: 31,
    smurfingPatterns: 18
  }
};

// ==========================================
// 5 CORE INSTITUTIONS NETWORK
// ==========================================
export interface InstitutionProfile {
  id: string;
  name: string;
  code: string;
  accountsMonitored: number;
  transactionsVolume: string;
  suspiciousAccounts: number;
  flaggedNetworks: number;
  interBankConnections: string[];
  netPosition: string;
  riskRating: 'Low' | 'Medium' | 'High';
  headquarters: string;
}

export const CORE_INSTITUTIONS_DATA: InstitutionProfile[] = [
  {
    id: 'INST-HDFC',
    name: 'HDFC Bank',
    code: 'HDFC',
    accountsMonitored: 14820,
    transactionsVolume: '₹4,120 Cr',
    suspiciousAccounts: 412,
    flaggedNetworks: 64,
    interBankConnections: ['SBI', 'ICICI Bank', 'Axis Bank', 'YES Bank'],
    netPosition: '+₹184 Cr (Surplus)',
    riskRating: 'Medium',
    headquarters: 'Mumbai'
  },
  {
    id: 'INST-ICICI',
    name: 'ICICI Bank',
    code: 'ICICI',
    accountsMonitored: 11490,
    transactionsVolume: '₹3,450 Cr',
    suspiciousAccounts: 328,
    flaggedNetworks: 52,
    interBankConnections: ['HDFC Bank', 'Axis Bank', 'YES Bank'],
    netPosition: '-₹42 Cr (Deficit)',
    riskRating: 'Medium',
    headquarters: 'Mumbai'
  },
  {
    id: 'INST-SBI',
    name: 'State Bank of India',
    code: 'SBI',
    accountsMonitored: 18920,
    transactionsVolume: '₹6,890 Cr',
    suspiciousAccounts: 384,
    flaggedNetworks: 48,
    interBankConnections: ['HDFC Bank', 'Axis Bank'],
    netPosition: '+₹310 Cr (Surplus)',
    riskRating: 'Low',
    headquarters: 'New Delhi'
  },
  {
    id: 'INST-AXIS',
    name: 'Axis Bank',
    code: 'AXIS',
    accountsMonitored: 8410,
    transactionsVolume: '₹2,680 Cr',
    suspiciousAccounts: 219,
    flaggedNetworks: 39,
    interBankConnections: ['HDFC Bank', 'ICICI Bank', 'YES Bank', 'SBI'],
    netPosition: '-₹98 Cr (Deficit)',
    riskRating: 'High',
    headquarters: 'Ahmedabad'
  },
  {
    id: 'INST-YES',
    name: 'YES Bank',
    code: 'YES',
    accountsMonitored: 4591,
    transactionsVolume: '₹1,240 Cr',
    suspiciousAccounts: 141,
    flaggedNetworks: 27,
    interBankConnections: ['ICICI Bank', 'Axis Bank', 'HDFC Bank'],
    netPosition: '-₹44 Cr (Deficit)',
    riskRating: 'High',
    headquarters: 'Mumbai'
  }
];

// ==========================================
// RAW TRANSACTION DATASET INGESTION PIPELINE
// ==========================================
export const INGESTION_DATASETS = [
  {
    id: 'INGEST-2026-09A',
    filename: 'interbank_clearing_sep_2026.csv',
    format: 'CSV' as const,
    sizeBytes: '284.6 MB',
    transactionsCount: 2483921,
    accountsCount: 48231,
    institutionsCount: 5,
    suspiciousClustersDetected: 173,
    timestamp: '2026-09-28 08:30:14',
    status: 'Ingested' as const
  },
  {
    id: 'INGEST-2026-09B',
    filename: 'instant_upi_rtgs_feed.json',
    format: 'JSON' as const,
    sizeBytes: '112.4 MB',
    transactionsCount: 840119,
    accountsCount: 19440,
    institutionsCount: 4,
    suspiciousClustersDetected: 58,
    timestamp: '2026-09-28 09:15:00',
    status: 'Ingested' as const
  },
  {
    id: 'INGEST-2026-09C',
    filename: 'corporate_remittance_batch.xlsx',
    format: 'Excel' as const,
    sizeBytes: '48.2 MB',
    transactionsCount: 312050,
    accountsCount: 7890,
    institutionsCount: 3,
    suspiciousClustersDetected: 19,
    timestamp: '2026-09-27 18:22:40',
    status: 'Ingested' as const
  }
];

// ==========================================
// BENIGN HIGH-VOLUME COMMERCE FILTERING
// ==========================================
export const BENIGN_COMMERCE_ITEMS: {
  id: string;
  entityName: string;
  category: string;
  monthlyVolume: string;
  classification: 'Normal Commerce' | 'High-Volume Legitimate' | 'Unusual' | 'Suspicious';
  reason: string;
  counterpartiesCount: number;
  settlementFrequency: string;
  exemptionStatus: 'Exempt' | 'Under Review';
}[] = [
  {
    id: 'BEN-001',
    entityName: 'Reliance Retail Wholesale Settlement',
    category: 'FMCG Merchant Aggregator',
    monthlyVolume: '₹342.8 Cr',
    classification: 'High-Volume Legitimate',
    reason: 'Recurring merchant settlement pattern; consistent counterparties over 24+ months; stable 23:45 IST clearing interval; zero circular routing detected.',
    counterpartiesCount: 148,
    settlementFrequency: 'Daily EOD Batch',
    exemptionStatus: 'Exempt'
  },
  {
    id: 'BEN-002',
    entityName: 'Tata Consumer Products Supply Ledger',
    category: 'Supply Chain Operations',
    monthlyVolume: '₹188.4 Cr',
    classification: 'High-Volume Legitimate',
    reason: 'Verified GST e-way bills; 15-30 day payment settlement cycle; operating profit margins preserved; verified corporate director UBOs.',
    counterpartiesCount: 92,
    settlementFrequency: 'Bi-Weekly Schedule',
    exemptionStatus: 'Exempt'
  },
  {
    id: 'BEN-003',
    entityName: 'Infosys Global Payroll Clearing',
    category: 'Corporate Salary Disbursement',
    monthlyVolume: '₹890.2 Cr',
    classification: 'Normal Commerce',
    reason: 'Periodic 1-to-many fanout on month-end; recipient retail accounts verified via Aadhaar-linked PAN; no fund consolidation return.',
    counterpartiesCount: 31200,
    settlementFrequency: 'Monthly (Last Working Day)',
    exemptionStatus: 'Exempt'
  },
  {
    id: 'BEN-004',
    entityName: 'Apex Commodities Brokerage Escrow',
    category: 'Securities Clearing',
    monthlyVolume: '₹94.1 Cr',
    classification: 'Unusual',
    reason: 'Elevated intraday velocity between 3 counterparties; trading exchange clearing verification in progress.',
    counterpartiesCount: 18,
    settlementFrequency: 'T+1 Settlement',
    exemptionStatus: 'Under Review'
  },
  {
    id: 'BEN-005',
    entityName: 'Global Horizon Trading Pvt Ltd',
    category: 'Import-Export Shell Conduit',
    monthlyVolume: '₹4.82 Cr',
    classification: 'Suspicious',
    reason: 'Zero asset retention; 4-hop circular fund cycle returning to originator; < 8 min intermediary holding times across 4 banks.',
    counterpartiesCount: 6,
    settlementFrequency: 'Continuous Layering',
    exemptionStatus: 'Under Review'
  }
];

// ==========================================
// FORENSIC EVIDENCE CHECKLIST
// ==========================================
export const EVIDENCE_LEDGER_ITEMS = [
  {
    id: 'EVD-01',
    title: 'Circular flow detected',
    description: 'Closed fund-flow cycle where ₹3.82L returns to originator entity ACC-1042 with 94.3% capital retention.',
    status: 'Verified',
    severity: 'critical' as const,
    involvedAccounts: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
    involvedTransactions: ['TXN-984210', 'TXN-984211', 'TXN-984212', 'TXN-984213']
  },
  {
    id: 'EVD-02',
    title: '4-hop transaction cycle',
    description: 'Topological loop traverses HDFC → ICICI → Axis → SBI → HDFC across 4 distinct corporate entities.',
    status: 'Verified',
    severity: 'critical' as const,
    involvedAccounts: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
    involvedTransactions: ['TXN-984210', 'TXN-984211', 'TXN-984212', 'TXN-984213']
  },
  {
    id: 'EVD-03',
    title: 'Rapid movement within 26 minutes',
    description: 'Intermediary accounts ACC-1043 and ACC-1044 held capital for under 6 minutes before onward dispatch.',
    status: 'Verified',
    severity: 'critical' as const,
    involvedAccounts: ['ACC-1043', 'ACC-1044'],
    involvedTransactions: ['TXN-984210', 'TXN-984211', 'TXN-984212']
  },
  {
    id: 'EVD-04',
    title: 'Cross-institution transfers',
    description: 'Automated IMPS and RTGS rails exploited across 5 financial institutions to circumvent single-bank alert monitors.',
    status: 'Verified',
    severity: 'high' as const,
    involvedAccounts: ['ACC-1042', 'ACC-1043', 'ACC-1044', 'ACC-1045'],
    involvedTransactions: ['TXN-984210', 'TXN-984211', 'TXN-984212', 'TXN-984213']
  },
  {
    id: 'EVD-05',
    title: 'Repeated counterparties',
    description: 'Shared incorporation directors, registered agent addresses in Ahmedabad, and matching IP login subnets.',
    status: 'Verified',
    severity: 'high' as const,
    involvedAccounts: ['ACC-1042', 'ACC-1043'],
    involvedTransactions: ['TXN-984210']
  },
  {
    id: 'EVD-06',
    title: 'Structuring indicators detected',
    description: 'Multi-account sub-threshold disbursement pattern shaving margins while keeping individual hops below trigger thresholds.',
    status: 'Verified',
    severity: 'warning' as const,
    involvedAccounts: ['ACC-1042', 'ACC-1046'],
    involvedTransactions: ['TXN-984214', 'TXN-984215']
  }
];

// ==========================================
// TEMPORAL ANALYSIS SEQUENCE
// ==========================================
export const TEMPORAL_CHRONOLOGY = [
  {
    time: '09:12',
    timestamp: '2026-09-28 09:12:04',
    source: 'ACC-102 (HDFC)',
    target: 'ACC-784 (ICICI)',
    sourceId: 'ACC-1042',
    targetId: 'ACC-1043',
    amount: 1200000,
    amountFormatted: '₹12L',
    rail: 'RTGS',
    holdingTime: 'Initiator',
    velocityAlert: false,
    notes: 'Origin transfer out of shell treasury'
  },
  {
    time: '09:18',
    timestamp: '2026-09-28 09:18:22',
    source: 'ACC-784 (ICICI)',
    target: 'ACC-291 (Axis)',
    sourceId: 'ACC-1043',
    targetId: 'ACC-1044',
    amount: 900000,
    amountFormatted: '₹9L',
    rail: 'IMPS',
    holdingTime: '6m 18s',
    velocityAlert: true,
    notes: 'Rapid pass-through; 6 min holding time'
  },
  {
    time: '09:31',
    timestamp: '2026-09-28 09:31:10',
    source: 'ACC-291 (Axis)',
    target: 'ACC-552 (SBI)',
    sourceId: 'ACC-1044',
    targetId: 'ACC-1045',
    amount: 800000,
    amountFormatted: '₹8L',
    rail: 'NEFT',
    holdingTime: '12m 48s',
    velocityAlert: false,
    notes: 'Layering hop via clearing aggregator'
  },
  {
    time: '10:04',
    timestamp: '2026-09-28 10:04:45',
    source: 'ACC-552 (SBI)',
    target: 'ACC-883 (YES Bank)',
    sourceId: 'ACC-1045',
    targetId: 'ACC-1046',
    amount: 1100000,
    amountFormatted: '₹11L',
    rail: 'RTGS',
    holdingTime: '33m 35s',
    velocityAlert: false,
    notes: 'Consolidation transfer before return hop'
  },
  {
    time: '10:21',
    timestamp: '2026-09-28 10:21:18',
    source: 'ACC-883 (YES Bank)',
    target: 'ACC-102 (HDFC)',
    sourceId: 'ACC-1046',
    targetId: 'ACC-1042',
    amount: 700000,
    amountFormatted: '₹7L',
    rail: 'IMPS',
    holdingTime: '16m 33s',
    velocityAlert: true,
    notes: 'Circular return link completing loop'
  }
];

