import React, { useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const TransactionTimelineScrubber: React.FC = () => {
  const {
    scenario,
    timelineScrubberIndex,
    setTimelineScrubberIndex,
    isTimelinePlaying,
    setIsTimelinePlaying,
    setSelectedTransaction
  } = useInvestigation();

  const totalTxns = scenario.transactions.length;
  const activeTxn = scenario.transactions[timelineScrubberIndex] || scenario.transactions[totalTxns - 1];

  // Auto-play timer
  useEffect(() => {
    let interval: any;
    if (isTimelinePlaying) {
      interval = setInterval(() => {
        setTimelineScrubberIndex((prev) => {
          if (prev >= totalTxns - 1) {
            setIsTimelinePlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isTimelinePlaying, totalTxns, setTimelineScrubberIndex, setIsTimelinePlaying]);

  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamRef.current) {
      const activeElement = streamRef.current.children[timelineScrubberIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [timelineScrubberIndex]);

  return (
    <div className="h-24 bg-white border-t border-border px-5 py-2 flex flex-col justify-between select-none">
      {/* Top Controls & Status Bar */}
      <div className="flex items-center justify-between gap-4 text-xs">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTimelineScrubberIndex(Math.max(0, timelineScrubberIndex - 1))}
            disabled={timelineScrubberIndex === 0}
            className="p-1 rounded border border-border bg-white hover:bg-surface-secondary text-text-secondary disabled:opacity-30"
            title="Previous step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
            className="px-2.5 py-1 rounded bg-brand hover:bg-brand-hover text-white font-medium flex items-center gap-1.5 shadow-sm active:scale-95 transition"
          >
            {isTimelinePlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={() => setTimelineScrubberIndex(Math.min(totalTxns - 1, timelineScrubberIndex + 1))}
            disabled={timelineScrubberIndex >= totalTxns - 1}
            className="p-1 rounded border border-border bg-white hover:bg-surface-secondary text-text-secondary disabled:opacity-30"
            title="Next step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[11px] text-text-secondary ml-2">
            Step {Math.min(timelineScrubberIndex + 1, totalTxns)} of {totalTxns}
          </span>
        </div>

        {/* Range Slider */}
        <div className="flex-1 max-w-lg mx-4 flex items-center gap-2">
          <span className="font-mono text-[11px] text-text-muted">
            {scenario.transactions[0]?.displayTime || '09:00:00'}
          </span>
          <input
            type="range"
            min="0"
            max={Math.max(0, totalTxns - 1)}
            value={timelineScrubberIndex}
            onChange={(e) => setTimelineScrubberIndex(Number(e.target.value))}
            className="flex-1 accent-brand h-1.5 bg-border rounded cursor-pointer"
          />
          <span className="font-mono text-[11px] text-text-muted">
            {scenario.transactions[totalTxns - 1]?.displayTime || '18:00:00'}
          </span>
        </div>

        {/* Holding Duration */}
        {activeTxn && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-text-muted">Holding duration:</span>
            <span className="font-semibold text-warning">
              {activeTxn.holdingTimeMinutes ? `${activeTxn.holdingTimeMinutes} min` : 'Direct hop'}
            </span>
          </div>
        )}
      </div>

      {/* Horizontal Sequential Timeline Stream */}
      <div 
        ref={streamRef}
        className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin"
      >
        {scenario.transactions.map((t, idx) => {
          const isActive = idx === timelineScrubberIndex;
          const isPast = idx <= timelineScrubberIndex;

          return (
            <div
              key={t.id}
              onClick={() => {
                setTimelineScrubberIndex(idx);
                setSelectedTransaction(t);
              }}
              className={`flex-shrink-0 px-2.5 py-1.5 rounded border transition-colors cursor-pointer text-xs select-none ${
                isActive
                  ? 'bg-brand-subtle border-brand text-brand font-medium shadow-sm'
                  : isPast
                    ? 'bg-white border-border text-text-primary hover:bg-surface-secondary'
                    : 'bg-surface-secondary border-border/50 text-text-muted opacity-45'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px] mb-0.5 font-mono">
                <span className="font-semibold">{t.displayTime}</span>
                <span className="text-text-muted">[{t.method}]</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span>{t.source}</span>
                <ArrowRight className="w-3 h-3 text-text-muted" />
                <span>{t.target}</span>
                <span className="ml-1 font-semibold text-text-primary">
                  ₹{(t.amount / 1000).toLocaleString('en-IN')}k
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
