import React from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Clock, 
  FileText,
  Filter
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { useNavigate } from 'react-router-dom';
import { ScenarioType } from '../../types';

export const GuidedTourModal: React.FC = () => {
  const { 
    guidedTourOpen, 
    setGuidedTourOpen, 
    tourStep, 
    setTourStep,
    setCurrentScenarioId,
    triggerTraceFlow
  } = useInvestigation();
  const navigate = useNavigate();

  if (!guidedTourOpen) return null;

  const steps = [
    {
      step: 1,
      title: 'Problem Statement BYT01 Overview',
      subtitle: 'Multi-Bank Transaction Monitoring & Network Forensics',
      desc: 'Traditional bank AML rules inspect accounts in isolation. FINGRAPH fuses cross-institutional transactions and temporal intervals to uncover coordinated money-laundering typologies.',
      route: '/dashboard',
      actionText: 'Inspect Overview',
      highlight: 'Ingest → Normalize → Map → Detect → Investigate → Explain → Report'
    },
    {
      step: 2,
      title: 'Detecting Coordinated Topologies',
      subtitle: 'Circular Layering & Round-Tripping (Scenario C)',
      desc: 'Notice Network #1042: Funds move across 4 banks (HDFC → ICICI → Axis → SBI) and return to the originator within 41 minutes with 94.3% value retention. In isolation, each bank only observes an ordinary wire.',
      route: '/investigations/FG-2026-001',
      scenario: 'scenario-c-circular',
      actionText: 'Open Workspace',
      highlight: 'A → B → C → D → A (41-minute cycle turnover)'
    },
    {
      step: 3,
      title: 'Temporal Dynamics & Trace Flow',
      subtitle: 'Rapid Pass-Through Mule Chains (Scenario B)',
      desc: 'In Scenario B, offshore funds move through 3 student and dormant intermediary accounts within 16 minutes (holding durations under 6 minutes) into an OTC crypto cashout desk.',
      route: '/timeline',
      scenario: 'scenario-b-rapid',
      actionText: 'View Timeline',
      highlight: 'Holding time < 6 minutes across all intermediaries'
    },
    {
      step: 4,
      title: 'Behavior Classification: High-Volume Exemption',
      subtitle: 'Eliminating Operational False Positives (Scenario A)',
      desc: 'Legitimate businesses also execute large transaction volumes. FINGRAPH evaluates counterparty stability, invoice reconciliation, and commercial cadence to classify Apex Wholesale as NORMAL BUSINESS ACTIVITY rather than flagging them.',
      route: '/detection',
      scenario: 'scenario-a-legitimate',
      actionText: 'View Classification',
      highlight: 'Stable counterparties + 14-30 day settlement cycles = Legitimate Commerce'
    },
    {
      step: 5,
      title: 'Audit-Ready Compliance Dossier',
      subtitle: 'Financial Intelligence Unit (FIU) Documentation',
      desc: 'Synthesizes graph topology, temporal logs, and investigator observations into an official 9-section compliance dossier ready for PDF, CSV, or JSON export.',
      route: '/reports',
      actionText: 'View Report Dossier',
      highlight: 'Evidentiary compliance documentation & audit trail'
    }
  ];

  const current = steps[tourStep - 1] || steps[0];

  const handleNext = () => {
    if (current.scenario) {
      setCurrentScenarioId(current.scenario as ScenarioType);
    }
    navigate(current.route);

    if (tourStep === 2) {
      setTimeout(() => triggerTraceFlow(), 500);
    }

    if (tourStep < steps.length) {
      setTourStep(tourStep + 1);
    } else {
      setGuidedTourOpen(false);
      setTourStep(1);
    }
  };

  const handlePrev = () => {
    if (tourStep > 1) {
      const prevStep = steps[tourStep - 2];
      if (prevStep.scenario) {
        setCurrentScenarioId(prevStep.scenario as ScenarioType);
      }
      navigate(prevStep.route);
      setTourStep(tourStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white border border-border w-full max-w-lg rounded-card shadow-modal overflow-hidden text-xs">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-border bg-surface-secondary flex items-center justify-between">
          <div className="font-semibold text-text-primary text-xs uppercase tracking-wider">
            Evaluation Walkthrough • Step {tourStep} of {steps.length}
          </div>
          <button 
            onClick={() => setGuidedTourOpen(false)}
            className="text-text-muted hover:text-text-primary p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-text-primary">{current.title}</h2>
            <p className="text-xs font-medium text-brand mt-0.5">{current.subtitle}</p>
            <p className="text-xs text-text-secondary mt-2.5 leading-relaxed">{current.desc}</p>
          </div>

          <div className="p-3 rounded bg-surface-secondary border border-border">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-text-muted block">KEY FINDING:</span>
            <span className="font-medium text-text-primary mt-0.5 block">{current.highlight}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border bg-surface-secondary flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={tourStep === 1}
            className={`px-3 py-1.5 rounded text-xs flex items-center gap-1 border border-border bg-white transition ${
              tourStep === 1 
                ? 'opacity-40 cursor-not-allowed text-text-muted' 
                : 'text-text-primary hover:bg-surface-secondary'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuidedTourOpen(false)}
              className="px-3 py-1.5 rounded text-xs text-text-muted hover:text-text-primary"
            >
              Close
            </button>
            <button
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded bg-brand hover:bg-brand-hover text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <span>{tourStep === steps.length ? 'Finish' : current.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
