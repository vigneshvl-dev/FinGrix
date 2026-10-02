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
    <div className="h-26 bg-[#0E131E] border-t border-white/[0.06] shadow-[0_-4px_16px_rgba(0,0,0,0.5)] px-5 py-2.5 flex flex-col justify-between select-none z-10 font-sans">
      {/* Top Controls & Status Bar */}
      <div className="flex items-center justify-between gap-4 text-xs">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTimelineScrubberIndex(Math.max(0, timelineScrubberIndex - 1))}
            disabled={timelineScrubberIndex === 0}
            className="neu-btn p-1.5 rounded-lg text-slate-300 disabled:opacity-30 cursor-pointer"
            title="Previous step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
            className="neu-btn-primary px-3 py-1 rounded-xl text-white font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            {isTimelinePlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Flow</span>
              </>
            )}
          </button>

          <button
            onClick={() => setTimelineScrubberIndex(Math.min(totalTxns - 1, timelineScrubberIndex + 1))}
            disabled={timelineScrubberIndex >= totalTxns - 1}
            className="neu-btn p-1.5 rounded-lg text-slate-300 disabled:opacity-30 cursor-pointer"
            title="Next step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-[11px] text-slate-400 ml-2">
            Step <strong className="text-white">{Math.min(timelineScrubberIndex + 1, totalTxns)}</strong> of {totalTxns}
          </span>
        </div>

        {/* Range Slider in Debossed Inset Well */}
        <div className="flex-1 max-w-lg mx-4 flex items-center gap-2.5">
          <span className="font-mono text-[10px] text-slate-400">
            {scenario.transactions[0]?.displayTime || '09:00:00'}
          </span>
          <div className="flex-1 neu-inset-sm px-2 py-1 rounded-lg flex items-center">
            <input
              type="range"
              min="0"
              max={Math.max(0, totalTxns - 1)}
              value={timelineScrubberIndex}
              onChange={(e) => setTimelineScrubberIndex(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-transparent cursor-pointer"
            />
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            {scenario.transactions[totalTxns - 1]?.displayTime || '18:00:00'}
          </span>
        </div>

        {/* Holding Duration */}
        {activeTxn && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Velocity Holding:</span>
            <span className="font-bold text-amber-400 neu-inset-sm px-2 py-0.5 rounded-md border border-amber-500/20">
              {activeTxn.holdingTimeMinutes ? `${activeTxn.holdingTimeMinutes} min` : 'Direct Hop'}
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
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl transition-all cursor-pointer text-xs select-none ${
                isActive
                  ? 'neu-inset text-blue-400 font-semibold border border-blue-500/40 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7)]'
                  : isPast
                    ? 'neu-btn text-slate-200 hover:text-white'
                    : 'bg-[#0A0D15]/60 border border-white/[0.03] text-slate-600 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[10px] mb-0.5 font-mono">
                <span className="font-bold">{t.displayTime}</span>
                <span className="text-slate-400">[{t.method}]</span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <span className="text-slate-300">{t.source}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="text-slate-300">{t.target}</span>
                <span className="ml-1 font-bold text-white">
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

export default TransactionTimelineScrubber;
