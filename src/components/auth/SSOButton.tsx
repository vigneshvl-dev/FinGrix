import React, { useState } from 'react';
import { Building2, ChevronDown, Check } from 'lucide-react';

interface SSOButtonProps {
  onSelectSSO: (institutionName: string) => void;
  disabled?: boolean;
}

export const SSOButton: React.FC<SSOButtonProps> = ({ onSelectSSO, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const institutions = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'ICICI Bank', code: 'ICIC' },
    { name: 'State Bank of India (SBI)', code: 'SBIN' },
    { name: 'Axis Bank', code: 'UTIB' },
    { name: 'Standard Chartered / Other Institution', code: 'EXT' },
  ];

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 px-4 rounded bg-white border border-border hover:bg-surface-secondary text-text-primary text-xs font-medium flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand disabled:opacity-50"
      >
        <Building2 className="w-4 h-4 text-text-muted" />
        <span>Sign in with organization SSO</span>
        <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-12 bg-white border border-border rounded shadow-card py-1.5 z-20 text-xs">
          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted border-b border-border mb-1">
            Select Organization Identity Provider
          </div>
          {institutions.map((inst) => (
            <button
              key={inst.code}
              type="button"
              onClick={() => {
                setIsOpen(false);
                onSelectSSO(inst.name);
              }}
              className="w-full px-3 py-2 text-left hover:bg-surface-secondary flex items-center justify-between text-text-primary transition-colors"
            >
              <span className="font-medium">{inst.name}</span>
              <span className="font-mono text-[10px] text-text-muted bg-surface-secondary px-1.5 py-0.2 rounded border border-border">
                SAML 2.0
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
