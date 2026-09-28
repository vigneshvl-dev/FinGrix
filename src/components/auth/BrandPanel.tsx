import React from 'react';
import { Share2, Shield, Network, FileCheck, Layers } from 'lucide-react';

export const BrandPanel: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[42%] bg-surface-secondary border-r border-border flex-col justify-between p-10 select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-brand text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-text-primary block font-sans">
              FINGRAPH
            </span>
            <p className="text-xs text-text-secondary">
              Financial Graph Intelligence & Forensics
            </p>
          </div>
        </div>

        {/* Short Statement */}
        <div className="mt-12 space-y-1.5">
          <p className="text-sm font-semibold text-text-primary">
            Trace financial relationships.
          </p>
          <p className="text-sm font-semibold text-text-primary">
            Investigate transaction networks.
          </p>
          <p className="text-sm font-semibold text-brand">
            Build evidence.
          </p>
        </div>
      </div>

      {/* Subtle Abstract Financial Network Visualization (Monochromatic, Clean SVG) */}
      <div className="my-8 py-6 px-4 bg-white/70 border border-border rounded-card">
        <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-4">
          Directed Graph Model
        </div>
        
        {/* Monochromatic SVG Topology */}
        <svg 
          viewBox="0 0 360 160" 
          className="w-full h-auto text-text-secondary"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Directed connecting lines */}
          <path d="M 60 80 L 140 45" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 60 80 L 140 115" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 140 45 L 220 80" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 140 115 L 220 80" stroke="#CBD5E1" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <path d="M 220 80 L 300 80" stroke="#1769E0" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow-blue)" />

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#1769E0" />
            </marker>
          </defs>

          {/* Node 1: Origin */}
          <g>
            <circle cx="60" cy="80" r="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <circle cx="60" cy="80" r="4" fill="#64748B" />
            <text x="60" y="105" textAnchor="middle" fill="#667085" fontSize="9" fontFamily="Inter">Entity A</text>
          </g>

          {/* Node 2: Intermediary 1 */}
          <g>
            <circle cx="140" cy="45" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="140" y="48" textAnchor="middle" fill="#667085" fontSize="9" fontFamily="Inter">B1</text>
            <text x="140" y="27" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Inter">HDFC</text>
          </g>

          {/* Node 3: Intermediary 2 */}
          <g>
            <circle cx="140" cy="115" r="13" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <text x="140" y="118" textAnchor="middle" fill="#667085" fontSize="9" fontFamily="Inter">B2</text>
            <text x="140" y="137" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Inter">ICICI</text>
          </g>

          {/* Node 4: Aggregator */}
          <g>
            <circle cx="220" cy="80" r="15" fill="#FFFFFF" stroke="#1769E0" strokeWidth="1.5" />
            <circle cx="220" cy="80" r="5" fill="#1769E0" />
            <text x="220" y="107" textAnchor="middle" fill="#172033" fontSize="9" fontWeight="600" fontFamily="Inter">Hub ACC</text>
          </g>

          {/* Node 5: Destination */}
          <g>
            <circle cx="300" cy="80" r="14" fill="#FFFFFF" stroke="#D92D20" strokeWidth="1.5" />
            <circle cx="300" cy="80" r="4" fill="#D92D20" />
            <text x="300" y="105" textAnchor="middle" fill="#D92D20" fontSize="9" fontWeight="500" fontFamily="Inter">Sink</text>
          </g>
        </svg>

        <div className="mt-3 flex items-center justify-between text-[11px] text-text-muted border-t border-border/80 pt-2 font-mono">
          <span>Multi-institution routing</span>
          <span>Temporal topology</span>
        </div>
      </div>

      {/* Platform Features Footer Section */}
      <div className="space-y-3">
        <div className="text-[11px] font-bold text-text-primary uppercase tracking-wider">
          Secure Investigation Platform
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Transaction intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Network analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            <span>Evidence management</span>
          </div>
        </div>
      </div>
    </div>
  );
};
