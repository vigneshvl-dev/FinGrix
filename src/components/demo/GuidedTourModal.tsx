import React from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Share2, 
  Clock, 
  FileText,
  Filter,
  Sparkles
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 select-none font-sans">
      <div className="neu-card border border-white/10 w-full max-w-lg overflow-hidden text-xs shadow-[16px_16px_40px_rgba(0,0,0,0.85),-8px_-8px_24px_rgba(255,255,255,0.035)]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06] bg-[#111724] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Evaluation Walkthrough • Step {tourStep} of {steps.length}
            </span>
          </div>
          <button 
            onClick={() => setGuidedTourOpen(false)}
            className="neu-btn text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-[#0E131E]">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">{current.title}</h2>
            <p className="text-xs font-semibold text-blue-400 mt-0.5">{current.subtitle}</p>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{current.desc}</p>
          </div>

          <div className="p-3.5 rounded-xl neu-inset-sm border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block font-mono">
              KEY FORENSIC FINDING:
            </span>
            <span className="font-medium text-white leading-snug block">{current.highlight}</span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 pt-1">
            {steps.map((s, idx) => (
              <span
                key={s.step}
                className={`h-1.5 rounded-full transition-all ${
                  idx === tourStep - 1
                    ? 'w-6 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/[0.06] bg-[#111724] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={tourStep === 1}
            className={`neu-btn px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition ${
              tourStep === 1 
                ? 'opacity-40 cursor-not-allowed text-slate-600' 
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setGuidedTourOpen(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white transition cursor-pointer"
            >
              Skip
            </button>
            <button
              onClick={handleNext}
              className="neu-btn-primary px-4 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-[4px_4px_10px_rgba(0,0,0,0.6)]"
            >
              <span>{tourStep === steps.length ? 'Complete Tour' : current.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedTourModal;
