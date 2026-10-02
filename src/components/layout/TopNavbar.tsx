import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Building2, 
  Bell, 
  ChevronDown, 
  Check, 
  MoreHorizontal,
  ArrowRight,
  Sparkles,
  Bot,
  Command
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { SCENARIOS } from '../../data/mockData';
import { ScenarioType } from '../../types';
import { useNavigate, useLocation } from 'react-router-dom';

export const TopNavbar: React.FC = () => {
  const {
    currentScenarioId,
    setCurrentScenarioId,
    scenario,
    filterInstitution,
    setFilterInstitution,
    assistantOpen,
    setAssistantOpen,
    setGuidedTourOpen,
    setSelectedAccount,
    alerts
  } = useInvestigation();

  const navigate = useNavigate();
  const location = useLocation();

  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);
  const [instDropdownOpen, setInstDropdownOpen] = useState(false);
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const scenarioRef = useRef<HTMLDivElement>(null);
  const instRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (scenarioRef.current && !scenarioRef.current.contains(e.target as Node)) {
        setScenarioDropdownOpen(false);
      }
      if (instRef.current && !instRef.current.contains(e.target as Node)) {
        setInstDropdownOpen(false);
      }
      if (actionsRef.current && !actionsRef.current.contains(e.target as Node)) {
        setActionsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter accounts/txns based on search
  const searchResults = React.useMemo(() => {
    if (!searchTerm.trim()) return { accounts: [], txns: [] };
    const term = searchTerm.toLowerCase();
    const accs = scenario.accounts.filter(a => 
      a.id.toLowerCase().includes(term) || 
      a.label.toLowerCase().includes(term) ||
      a.institution.toLowerCase().includes(term)
    );
    const txns = scenario.transactions.filter(t => 
      t.id.toLowerCase().includes(term) || 
      t.source.toLowerCase().includes(term) || 
      t.target.toLowerCase().includes(term) ||
      t.referenceNumber.toLowerCase().includes(term)
    );
    return { accounts: accs, txns };
  }, [searchTerm, scenario]);

  const institutions = [
    'all',
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra',
    'Standard Chartered'
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Financial Network Overview';
    if (path.includes('/investigations/')) return 'Network Investigation Workspace';
    if (path.includes('/investigations')) return 'Investigation Center';
    if (path.includes('/detection')) return 'Detection Center';
    if (path.includes('/timeline')) return 'Transaction Timeline';
    if (path.includes('/alerts')) return 'Compliance Alerts';
    if (path.includes('/cases')) return 'Case Management';
    if (path.includes('/reports')) return 'Compliance Reports';
    return 'Financial Network Overview';
  };

  return (
    <header className="h-14 bg-[#0C1019] border-b border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.5)] px-5 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: Page Title Context with Neumorphic pill */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          <h2 className="text-xs font-bold text-white tracking-wide uppercase font-mono">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Center: Global Search Debossed Inset Well */}
      <div className="relative flex-1 max-w-md" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search accounts, transactions, entities..."
            className="neu-input w-full pl-9 pr-14 py-2 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          <div className="absolute right-3 flex items-center gap-1.5 pointer-events-none">
            {searchTerm ? (
              <button 
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-slate-400 hover:text-white text-xs pointer-events-auto"
              >
                ✕
              </button>
            ) : (
              <span className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-black/40 border border-white/5">
                <Command className="w-2.5 h-2.5" /> K
              </span>
            )}
          </div>
        </div>

        {/* Search Results Dropdown with Neumorphic Card */}
        {searchFocused && (searchResults.accounts.length > 0 || searchResults.txns.length > 0) && (
          <div className="absolute left-0 right-0 top-11 neu-card border border-white/10 shadow-[10px_10px_24px_rgba(0,0,0,0.8),-5px_-5px_15px_rgba(255,255,255,0.03)] py-2 px-1 z-50 text-xs max-h-80 overflow-y-auto">
            {searchResults.accounts.length > 0 && (
              <div className="mb-2">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Matching Entities ({searchResults.accounts.length})
                </div>
                {searchResults.accounts.map(acc => (
                  <div
                    key={acc.id}
                    onClick={() => {
                      setSelectedAccount(acc);
                      setSearchFocused(false);
                      navigate(`/investigations/FG-2026-001`);
                    }}
                    className="px-2.5 py-1.5 rounded-lg hover:neu-inset-sm cursor-pointer flex items-center justify-between text-white transition-all"
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span className="font-mono text-blue-400">{acc.id}</span>
                        <span className="text-slate-300 font-normal">· {acc.label}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {acc.institution} · Risk Score: {acc.riskScore}/100
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            )}

            {searchResults.txns.length > 0 && (
              <div>
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono border-t border-white/[0.06] pt-1.5">
                  Matching Transactions ({searchResults.txns.length})
                </div>
                {searchResults.txns.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSearchFocused(false);
                      navigate(`/timeline`);
                    }}
                    className="px-2.5 py-1.5 rounded-lg hover:neu-inset-sm cursor-pointer flex items-center justify-between text-white transition-all"
                  >
                    <div>
                      <div className="font-mono text-blue-400 font-medium">{t.id}</div>
                      <div className="text-[11px] text-slate-300">
                        {t.source} → {t.target} · ₹{t.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{t.displayTime}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Neumorphic Controls & Selectors */}
      <div className="flex items-center gap-2">
        {/* Dataset / Scenario Selector */}
        <div className="relative" ref={scenarioRef}>
          <button
            onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
            className="neu-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-white transition cursor-pointer"
          >
            <span className="text-slate-400 font-normal text-[11px]">Dataset:</span>
            <span className="font-semibold truncate max-w-[130px]">{scenario.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>

          {scenarioDropdownOpen && (
            <div className="absolute right-0 top-11 w-76 neu-card border border-white/10 shadow-[10px_10px_24px_rgba(0,0,0,0.8),-5px_-5px_15px_rgba(255,255,255,0.03)] py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/[0.06] mb-1 font-mono">
                Investigation Dataset Scenario
              </div>
              {Object.values(SCENARIOS).map((sc) => {
                const isSelected = sc.id === currentScenarioId;
                return (
                  <div
                    key={sc.id}
                    onClick={() => {
                      setCurrentScenarioId(sc.id as ScenarioType);
                      setScenarioDropdownOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer flex items-start justify-between transition-all rounded-lg mx-1 ${
                      isSelected 
                        ? 'neu-inset text-blue-400 font-semibold border border-blue-500/30' 
                        : 'hover:neu-raised-sm text-slate-300 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs leading-snug">{sc.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{sc.tagline}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Institution Selector */}
        <div className="relative" ref={instRef}>
          <button
            onClick={() => setInstDropdownOpen(!instDropdownOpen)}
            className="neu-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate max-w-[100px]">
              {filterInstitution === 'all' ? 'All Institutions' : filterInstitution}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {instDropdownOpen && (
            <div className="absolute right-0 top-11 w-52 neu-card border border-white/10 shadow-[10px_10px_24px_rgba(0,0,0,0.8),-5px_-5px_15px_rgba(255,255,255,0.03)] py-1.5 z-50 text-xs">
              {institutions.map(inst => (
                <div
                  key={inst}
                  onClick={() => {
                    setFilterInstitution(inst);
                    setInstDropdownOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg mx-1 cursor-pointer flex items-center justify-between transition-all ${
                    filterInstitution === inst ? 'neu-inset text-blue-400 font-bold' : 'hover:neu-raised-sm text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{inst === 'all' ? 'All Institutions' : inst}</span>
                  {filterInstitution === inst && <Check className="w-3 h-3 text-blue-400" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Assistant Direct Neumorphic Trigger */}
        <button
          onClick={() => setAssistantOpen(!assistantOpen)}
          className={`neu-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
            assistantOpen 
              ? 'neu-inset text-blue-400 border border-blue-500/40' 
              : 'text-white hover:text-blue-300'
          }`}
          title="Toggle Forensic AI Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">AI Copilot</span>
        </button>

        {/* Notifications Icon with Neumorphic button */}
        <button
          onClick={() => navigate('/alerts')}
          className="neu-btn relative p-2 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
          title="Surveillance Alerts"
        >
          <Bell className="w-3.5 h-3.5" />
          {alerts.filter(a => a.status === 'New').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
          )}
        </button>

        {/* Actions Dropdown for secondary features */}
        <div className="relative" ref={actionsRef}>
          <button
            onClick={() => setActionsMenuOpen(!actionsMenuOpen)}
            className="neu-btn p-2 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
            title="Investigation Actions"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>

          {actionsMenuOpen && (
            <div className="absolute right-0 top-11 w-56 neu-card border border-white/10 shadow-[10px_10px_24px_rgba(0,0,0,0.8),-5px_-5px_15px_rgba(255,255,255,0.03)] py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono border-b border-white/[0.06] mb-1">
                Investigation Tools
              </div>
              <button
                onClick={() => {
                  setGuidedTourOpen(true);
                  setActionsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg mx-1 hover:neu-raised-sm flex items-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Interactive Guided Tour</span>
              </button>
              <button
                onClick={() => {
                  setAssistantOpen(true);
                  setActionsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg mx-1 hover:neu-raised-sm flex items-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-blue-400" />
                <span>Forensics Assistant Drawer</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
