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
  Bot
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
    <header className="h-14 bg-white border-b border-border px-5 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left: Page Title Context */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <h2 className="text-sm font-semibold text-text-primary">
          {getPageTitle()}
        </h2>
      </div>

      {/* Center: Global Search */}
      <div className="relative flex-1 max-w-md" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-text-muted absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search accounts, transactions, entities..."
            className="w-full bg-surface-secondary border border-border rounded pl-9 pr-7 py-1.5 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 text-text-muted hover:text-text-primary text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchFocused && (searchResults.accounts.length > 0 || searchResults.txns.length > 0) && (
          <div className="absolute left-0 right-0 top-10 bg-white border border-border rounded shadow-card py-2 px-1 z-50 text-xs max-h-80 overflow-y-auto">
            {searchResults.accounts.length > 0 && (
              <div className="mb-2">
                <div className="px-2 py-1 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
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
                    className="px-2.5 py-1.5 rounded hover:bg-surface-secondary cursor-pointer flex items-center justify-between text-text-primary"
                  >
                    <div>
                      <div className="font-semibold text-text-primary flex items-center gap-1.5">
                        <span className="font-mono text-brand">{acc.id}</span>
                        <span className="text-text-secondary font-normal">· {acc.label}</span>
                      </div>
                      <div className="text-[11px] text-text-muted">
                        {acc.institution} · Risk Score: {acc.riskScore}/100
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                ))}
              </div>
            )}

            {searchResults.txns.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[11px] font-semibold text-text-muted uppercase tracking-wider border-t border-border pt-1.5">
                  Matching Transactions ({searchResults.txns.length})
                </div>
                {searchResults.txns.map(t => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSearchFocused(false);
                      navigate(`/timeline`);
                    }}
                    className="px-2.5 py-1.5 rounded hover:bg-surface-secondary cursor-pointer flex items-center justify-between text-text-primary"
                  >
                    <div>
                      <div className="font-mono text-brand font-medium">{t.id}</div>
                      <div className="text-[11px] text-text-secondary">
                        {t.source} → {t.target} · ₹{t.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <span className="text-[11px] text-text-muted font-mono">{t.displayTime}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Controls & Selectors */}
      <div className="flex items-center gap-2">
        {/* Dataset / Scenario Selector */}
        <div className="relative" ref={scenarioRef}>
          <button
            onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-surface-secondary border border-border hover:border-brand/40 text-xs text-text-primary transition"
          >
            <span className="text-text-muted font-normal">Dataset:</span>
            <span className="font-medium truncate max-w-[140px]">{scenario.name}</span>
            <ChevronDown className="w-3 h-3 text-text-muted ml-0.5" />
          </button>

          {scenarioDropdownOpen && (
            <div className="absolute right-0 top-10 w-72 bg-white border border-border rounded shadow-card py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted border-b border-border mb-1">
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
                    className={`px-3 py-2 cursor-pointer flex items-start justify-between transition ${
                      isSelected ? 'bg-brand-subtle text-brand font-medium' : 'hover:bg-surface-secondary text-text-primary'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs leading-snug">{sc.name}</div>
                      <div className="text-[11px] text-text-secondary mt-0.5 truncate max-w-[200px]">{sc.tagline}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />}
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white border border-border hover:border-brand/40 text-xs text-text-secondary hover:text-text-primary transition"
          >
            <Building2 className="w-3.5 h-3.5 text-text-muted" />
            <span className="truncate max-w-[100px]">
              {filterInstitution === 'all' ? 'All Institutions' : filterInstitution}
            </span>
            <ChevronDown className="w-3 h-3 text-text-muted" />
          </button>

          {instDropdownOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-border rounded shadow-card py-1 z-50 text-xs">
              {institutions.map(inst => (
                <div
                  key={inst}
                  onClick={() => {
                    setFilterInstitution(inst);
                    setInstDropdownOpen(false);
                  }}
                  className={`px-3 py-1.5 hover:bg-surface-secondary cursor-pointer flex items-center justify-between ${
                    filterInstitution === inst ? 'text-brand font-medium' : 'text-text-primary'
                  }`}
                >
                  <span>{inst === 'all' ? 'All Institutions' : inst}</span>
                  {filterInstitution === inst && <Check className="w-3 h-3 text-brand" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {alerts.filter(a => a.status === 'New').length > 0 && (
            <span className="w-2 h-2 rounded-full bg-risk absolute top-1.5 right-1.5"></span>
          )}
        </button>

        {/* Actions Dropdown for secondary features (Guided Demo, Forensics Copilot) */}
        <div className="relative" ref={actionsRef}>
          <button
            onClick={() => setActionsMenuOpen(!actionsMenuOpen)}
            className="p-1.5 rounded border border-border text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition"
            title="Investigation Actions & Tools"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {actionsMenuOpen && (
            <div className="absolute right-0 top-10 w-52 bg-white border border-border rounded shadow-card py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Investigation Tools
              </div>
              <button
                onClick={() => {
                  setGuidedTourOpen(true);
                  setActionsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2 text-text-primary"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Guided Investigation Tour</span>
              </button>
              <button
                onClick={() => {
                  setAssistantOpen(!assistantOpen);
                  setActionsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-surface-secondary flex items-center gap-2 text-text-primary"
              >
                <Bot className="w-3.5 h-3.5 text-brand" />
                <span>Forensics Assistant</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
