import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ArrowRight,
  Clock,
  TrendingUp,
  Activity,
  Zap
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
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-4">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-blue-400" />
          <span>Temporal Transaction Timeline</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Chronological reconstruction of cross-clearing fund movements, hop velocities, and temporal holding intervals.
        </p>
      </div>

      {/* Analytical Velocity Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Average Velocity</div>
          <div className="text-xl font-extrabold text-white mt-1 font-mono-numbers">
            {scenario.stats.avgHoldingTime}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Per intermediary hop</div>
        </div>

        <div className="neu-card p-4 border-amber-500/20">
          <div className="text-[11px] text-amber-300 font-medium">Inter-Hop Interval</div>
          <div className="text-xl font-extrabold text-amber-400 mt-1 font-mono-numbers">
            4.8 min
          </div>
          <div className="text-[10px] text-amber-400 mt-1">Rapid pass-through</div>
        </div>

        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Traversal Window</div>
          <div className="text-xl font-extrabold text-white mt-1 font-mono-numbers">
            {scenario.stats.flowDuration}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Full network traversal</div>
        </div>

        <div className="neu-card p-4">
          <div className="text-[11px] text-slate-400 font-medium">Gross Flow Volume</div>
          <div className="text-xl font-extrabold text-blue-400 mt-1 font-mono-numbers">
            ₹{(scenario.stats.totalFlow / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{scenario.transactions.length} transfers recorded</div>
        </div>
      </div>

      {/* Controls & Master Timeline Bar */}
      <div className="neu-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimelineScrubberIndex(Math.max(0, timelineScrubberIndex - 1))}
              disabled={timelineScrubberIndex === 0}
              className="neu-btn p-1.5 rounded-xl text-slate-300 disabled:opacity-30 cursor-pointer"
              title="Previous transfer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
              className="neu-btn-primary px-4 py-1.5 rounded-xl text-white font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer"
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
              className="neu-btn p-1.5 rounded-xl text-slate-300 disabled:opacity-30 cursor-pointer"
              title="Next transfer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsTimelinePlaying(false);
                setTimelineScrubberIndex(0);
              }}
              className="neu-btn p-1.5 rounded-xl text-slate-300 hover:text-white ml-1 cursor-pointer"
              title="Reset Timeline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-xs text-slate-400 ml-2">
              Step <strong className="text-white">{Math.min(timelineScrubberIndex + 1, totalTxns)}</strong> of {totalTxns}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono neu-inset-sm px-3 py-1 rounded-xl">
            Current Marker: <strong className="text-blue-400">{scenario.transactions[timelineScrubberIndex]?.displayTime}</strong>
          </div>
        </div>

        {/* Inset Slider Track */}
        <div className="neu-inset-sm px-3 py-1.5 rounded-xl flex items-center">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalTxns - 1)}
            value={timelineScrubberIndex}
            onChange={(e) => setTimelineScrubberIndex(Number(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-transparent cursor-pointer"
          />
        </div>
      </div>

      {/* Chronological Sequence List */}
      <div className="neu-card overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <h2 className="text-base font-bold text-white tracking-tight">
            Chronological Transfer Sequence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sequential list of recorded bank transfers. Click any transfer to inspect entity details.
          </p>
        </div>

        <div className="divide-y divide-white/[0.04]">
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
                className={`p-3.5 flex items-center justify-between text-xs cursor-pointer transition-all ${
                  isActive 
                    ? 'neu-inset text-blue-400 font-semibold border-l-2 border-l-blue-500' 
                    : isCompleted 
                      ? 'hover:bg-white/[0.03] text-slate-200' 
                      : 'opacity-40 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400 w-16">
                    {t.displayTime}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md neu-inset-sm text-slate-300">
                    {t.method}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-bold text-white">{t.source}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span className="font-bold text-white">{t.target}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono-numbers">
                  <span className="font-bold text-white">
                    ₹{t.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-amber-400 neu-inset-sm px-2.5 py-0.5 rounded-full border border-amber-500/20 font-mono">
                    Holding: {t.holdingTimeMinutes ? `${t.holdingTimeMinutes} min` : 'Direct Hop'}
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
        <div className="neu-card p-5">
          <h3 className="text-sm font-bold text-white mb-1">
            Holding Time per Transfer Hop (Minutes)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Brief holding durations reveal automated onward pass-through execution.
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={holdingTimeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="step" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}m`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141A28', borderColor: 'rgba(255,255,255,0.1)', fontSize: '11px', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val: any) => [`${val} min`, 'Holding Duration']}
                />
                <Bar dataKey="holdingTime" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cumulative Flow */}
        <div className="neu-card p-5">
          <h3 className="text-sm font-bold text-white mb-1">
            Cumulative Transferred Capital (₹ Lakhs)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Linear slope demonstrates rapid multi-bank layering velocity.
          </p>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="step" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141A28', borderColor: 'rgba(255,255,255,0.1)', fontSize: '11px', borderRadius: '12px', color: '#FFF' }}
                  formatter={(val: any) => [`₹${Number(val).toFixed(2)} Lakh`, 'Cumulative Volume']}
                />
                <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 3, fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
