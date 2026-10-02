import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  User, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  MapPin, 
  ExternalLink,
  Briefcase,
  Share2
} from 'lucide-react';
import { useInvestigation } from '../context/InvestigationContext';

export const EntityIntelligencePage: React.FC = () => {
  const navigate = useNavigate();
  const { scenario, setSelectedAccount } = useInvestigation();
  const [searchTerm, setSearchTerm] = useState('');

  const entities = [
    {
      id: 'ACC-1042',
      name: 'Global Horizon Trading Pvt Ltd',
      type: 'Shell Company',
      pan: 'AAACG1924K',
      gstn: '24AAACG1924K1Z5',
      directors: ['Ramesh P. Patel', 'Kunal M. Shah'],
      registeredAddress: 'Unit 402, Trade Square, Ellisbridge, Ahmedabad, Gujarat',
      riskScore: 92,
      riskLevel: 'Critical',
      flags: ['Zero physical footprint', 'Shared director with ACC-1043', 'Origin & Sink cycle node'],
      kycStatus: 'Flagged High-Risk',
      turnover: '₹48.2 Cr (Reported: ₹12L)',
      institution: 'HDFC Bank'
    },
    {
      id: 'ACC-1043',
      name: 'Zenith Logistics & Cargo LLP',
      type: 'Shell Conduit',
      pan: 'AABFZ4412L',
      gstn: '24AABFZ4412L1Z9',
      directors: ['Kunal M. Shah', 'Jitendra V. Joshi'],
      registeredAddress: 'Unit 402, Trade Square, Ellisbridge, Ahmedabad, Gujarat',
      riskScore: 89,
      riskLevel: 'Critical',
      flags: ['Common registered address', 'Rapid fund velocity < 6m', 'Zero operating inventory'],
      kycStatus: 'Pending Revocation',
      turnover: '₹34.5 Cr',
      institution: 'ICICI Bank'
    },
    {
      id: 'ACC-1044',
      name: 'Silverline Infrastructure Corp',
      type: 'Layering Entity',
      pan: 'AACCS8819Q',
      gstn: '24AACCS8819Q1Z2',
      directors: ['Harish B. Desai'],
      registeredAddress: 'Ring Road Commercial Hub, Surat, Gujarat',
      riskScore: 94,
      riskLevel: 'Critical',
      flags: ['Zero tax filings in FY25', 'Offshore intermediary links', 'Fee shaving retention'],
      kycStatus: 'Tier-1 High Risk',
      turnover: '₹61.2 Cr',
      institution: 'Axis Bank'
    },
    {
      id: 'ACC-8001',
      name: 'Reliance Retail Wholesale Settlement',
      type: 'Legitimate Merchant',
      pan: 'AABCR1120M',
      gstn: '27AABCR1120M1Z8',
      directors: ['Authorized Corporate Board'],
      registeredAddress: 'Maker Chambers IV, Nariman Point, Mumbai, Maharashtra',
      riskScore: 12,
      riskLevel: 'Normal',
      flags: ['Audited corporate financials', 'GST e-way bills verified', 'Exempted benign entity'],
      kycStatus: 'Verified Legitimate',
      turnover: '₹4,120 Cr',
      institution: 'HDFC Bank'
    }
  ];

  const filtered = entities.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.directors.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInspectEntity = (accId: string) => {
    const acc = scenario.accounts.find(a => a.id === accId);
    if (acc) setSelectedAccount(acc);
    navigate('/investigations/INV-2026-0173');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>BENEFICIAL OWNERSHIP & ENTITY RESOLUTION</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Entity Intelligence & Corporate Profiling</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Unmask ultimate beneficial owners (UBOs), identify common incorporation addresses, and detect shell corporation networks.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by entity, PAN, or director..."
            className="neu-input w-full pl-9 pr-3 py-1.5 rounded-xl text-xs text-white placeholder-slate-500 font-mono"
          />
        </div>
      </div>

      {/* Entity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="neu-card p-5 space-y-4 hover:border-blue-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-blue-400 neu-inset-sm px-2.5 py-1 rounded-lg">
                  {item.id}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  item.riskLevel === 'Critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.type} • Risk {item.riskScore}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{item.institution}</span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">{item.name}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                <span>PAN: <strong className="text-slate-200">{item.pan}</strong></span>
                <span>•</span>
                <span>GSTN: <strong className="text-slate-200">{item.gstn}</strong></span>
              </div>
            </div>

            <div className="neu-inset-sm p-3 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-start gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">{item.registeredAddress}</span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-white/[0.04] text-[11px]">
                <span className="text-slate-400 font-mono">Directors:</span>
                <span className="text-blue-400 font-medium">{item.directors.join(', ')}</span>
              </div>
            </div>

            {/* Red Flags */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Forensic Indicators:</span>
              <div className="flex flex-wrap gap-1.5">
                {item.flags.map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-md neu-inset-sm text-red-300 border border-red-500/20"
                  >
                    • {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
              <span className="text-slate-400 text-[11px] font-mono">KYC: {item.kycStatus}</span>
              <button
                onClick={() => handleInspectEntity(item.id)}
                className="text-blue-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Inspect in Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntityIntelligencePage;
