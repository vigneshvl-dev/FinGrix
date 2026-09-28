import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';
import { useInvestigation } from '../context/InvestigationContext';

export const TimelinePage: React.FC = () => {
  const { 
    scenario, 
    timelineScrubberIndex, 
    setTimelineScrubberIndex,
    isTimelinePlaying,
    setIsTimelinePlaying,
    setSelectedTransaction
  } = useInvestigation();

  const totalTxns = scenario.transactions.length;

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
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isTimelinePlaying, totalTxns, setTimelineScrubberIndex, setIsTimelinePlaying]);

  const holdingTimeData = scenario.transactions.map((t, idx) => ({
    step: `#${idx + 1}`,
    time: t.displayTime,
    holdingTime: t.holdingTimeMinutes || 5,
    amount: t.amount / 1000,
  }));

  let cumulative = 0;
  const cumulativeData = scenario.transactions.map((t, idx) => {
    cumulative += t.amount;
    return {
      step: `#${idx + 1}`,
      time: t.displayTime,
      total: cumulative / 100000,
    };
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Transaction Timeline
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Chronological reconstruction of fund movements, intermediary holding durations, and transfer intervals.
        </p>
      </div>

      {/* Analytical Velocity Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Transaction velocity</div>
          <div className="text-xl font-bold text-text-primary mt-1 font-mono-numbers">
            {scenario.stats.avgHoldingTime}
          </div>
          <div className="text-xs text-text-muted mt-1">Average per transfer hop</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Time between transfers</div>
          <div className="text-xl font-bold text-warning mt-1 font-mono-numbers">
            4.8 min
          </div>
          <div className="text-xs text-warning mt-1">High-frequency dispersal</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Holding duration</div>
          <div className="text-xl font-bold text-text-primary mt-1 font-mono-numbers">
            {scenario.stats.flowDuration}
          </div>
          <div className="text-xs text-text-muted mt-1">Entire network traversal</div>
        </div>

        <div className="bg-white p-4 rounded-card border border-border shadow-card">
          <div className="text-xs text-text-secondary font-medium">Total flow analyzed</div>
          <div className="text-xl font-bold text-text-primary mt-1 font-mono-numbers">
            ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-text-muted mt-1">{scenario.transactions.length} transfers recorded</div>
        </div>
      </div>

      {/* Controls & Master Timeline Bar */}
      <div className="bg-white rounded-card border border-border shadow-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimelineScrubberIndex(Math.max(0, timelineScrubberIndex - 1))}
              disabled={timelineScrubberIndex === 0}
              className="p-1.5 rounded border border-border bg-white hover:bg-surface-secondary text-text-secondary disabled:opacity-30"
              title="Previous transfer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
              className="px-3.5 py-1.5 rounded bg-brand hover:bg-brand-hover text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95"
            >
              {isTimelinePlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play flow</span>
                </>
              )}
            </button>

            <button
              onClick={() => setTimelineScrubberIndex(Math.min(totalTxns - 1, timelineScrubberIndex + 1))}
              disabled={timelineScrubberIndex >= totalTxns - 1}
              className="p-1.5 rounded border border-border bg-white hover:bg-surface-secondary text-text-secondary disabled:opacity-30"
              title="Next transfer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsTimelinePlaying(false);
                setTimelineScrubberIndex(0);
              }}
              className="p-1.5 rounded border border-border bg-white hover:bg-surface-secondary text-text-secondary ml-1"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-xs text-text-secondary ml-2">
              Step {Math.min(timelineScrubberIndex + 1, totalTxns)} of {totalTxns}
            </span>
          </div>

          <div className="text-xs text-text-secondary font-mono">
            Timestamp: <strong className="text-text-primary">{scenario.transactions[timelineScrubberIndex]?.displayTime}</strong>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max={Math.max(0, totalTxns - 1)}
          value={timelineScrubberIndex}
          onChange={(e) => setTimelineScrubberIndex(Number(e.target.value))}
          className="w-full accent-brand h-1.5 bg-border rounded cursor-pointer"
        />
      </div>

      {/* Chronological Sequence List */}
      <div className="bg-white rounded-card border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-base font-semibold text-text-primary">
            Chronological Transfer Sequence
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Sequential list of recorded bank transfers. Click any transfer to inspect entity details.
          </p>
        </div>

        <div className="divide-y divide-border">
          {scenario.transactions.map((t, idx) => {
            const isActive = idx === timelineScrubberIndex;
            const isCompleted = idx <= timelineScrubberIndex;

            return (
              <div
                key={t.id}
                onClick={() => {
                  setTimelineScrubberIndex(idx);
                  setSelectedTransaction(t);
                }}
                className={`p-3.5 flex items-center justify-between text-xs cursor-pointer transition ${
                  isActive 
                    ? 'bg-brand-subtle' 
                    : isCompleted 
                      ? 'bg-white hover:bg-surface-hover' 
                      : 'bg-surface-secondary/40 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium text-text-muted w-16">
                    {t.displayTime}
                  </span>
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-secondary border border-border text-text-secondary">
                    {t.method}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-semibold text-text-primary">{t.source}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                    <span className="font-semibold text-text-primary">{t.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono-numbers">
                  <span className="font-bold text-text-primary">
                    ₹{t.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded border border-border">
                    Holding: {t.holdingTimeMinutes ? `${t.holdingTimeMinutes} min` : 'Direct'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analytical Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Holding Times */}
        <div className="bg-white rounded-card border border-border shadow-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-1">
            Holding Time per Transfer Hop (Minutes)
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            Brief holding durations reveal automated onward pass-through execution.
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdingTimeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="step" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}m`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D9E0E8', fontSize: '11px', borderRadius: '4px' }}
                  formatter={(val: any) => [`${val} min`, 'Holding duration']}
                />
                <Bar dataKey="holdingTime" fill="#B7791F" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Flow */}
        <div className="bg-white rounded-card border border-border shadow-card p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-1">
            Cumulative Transferred Capital (₹ Lakhs)
          </h3>
          <p className="text-xs text-text-secondary mb-4">
            Linear slope demonstrates rapid multi-bank layering velocity.
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="step" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D9E0E8', fontSize: '11px', borderRadius: '4px' }}
                  formatter={(val: any) => [`₹${Number(val).toFixed(2)} Lakh`, 'Cumulative flow']}
                />
                <Line type="monotone" dataKey="total" stroke="#1769E0" strokeWidth={2} dot={{ r: 3, fill: '#1769E0' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
