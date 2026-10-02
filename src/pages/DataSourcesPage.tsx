import React, { useState } from 'react';
import { 
  Database, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Layers, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  Server, 
  Share2, 
  Building2, 
  ShieldAlert,
  Sliders,
  Filter
} from 'lucide-react';
import { INGESTION_DATASETS } from '../data/mockData';

export const DataSourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'mapping'>('upload');
  const [selectedFormat, setSelectedFormat] = useState<'CSV' | 'JSON' | 'Excel' | 'API'>('CSV');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [ingestionComplete, setIngestionComplete] = useState(false);

  const pipelineStages = [
    { name: 'Upload Transaction Dataset', desc: 'Raw ingestion via high-throughput memory buffer' },
    { name: 'Schema Validation', desc: 'Check column data types, timestamps & ISO formats' },
    { name: 'Entity Resolution', desc: 'Deduplicate accounts, map IFSC codes to institutions' },
    { name: 'Transaction Normalization', desc: 'Standardize IMPS, RTGS, NEFT & UPI amounts in INR' },
    { name: 'Graph Construction', desc: 'Synthesize directed multigraph nodes and edges' },
    { name: 'Pattern Detection', desc: 'Execute circularity, rapid pass-through & smurfing heuristics' },
  ];

  const handleStartIngestion = () => {
    setIsProcessing(true);
    setCurrentStage(0);
    setIngestionComplete(false);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage < pipelineStages.length) {
        setCurrentStage(stage);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setIngestionComplete(true);
      }
    }, 850);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto select-none font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
            <Database className="w-3.5 h-3.5" />
            <span>RAW DATA INGESTION ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Transaction Log Ingestion & Graph Synthesis</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Stream raw inter-bank transaction logs, validate schema compliance, resolve cross-bank entities, and construct the forensic topological graph.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="neu-inset-sm px-3 py-1.5 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ingestion Pipeline: Ready</span>
          </div>
        </div>
      </div>

      {/* Pipeline Visual Flow Banner */}
      <div className="neu-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Automated Forensic Ingestion Pipeline
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            6 Pipeline Stages
          </span>
        </div>

        {/* Responsive Pipeline Steps */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {pipelineStages.map((step, idx) => {
            const isCompleted = ingestionComplete || (isProcessing && currentStage > idx);
            const isCurrent = isProcessing && currentStage === idx;

            return (
              <div 
                key={step.name}
                className={`p-3 rounded-xl border transition-all text-xs ${
                  isCompleted 
                    ? 'neu-inset border-emerald-500/40 bg-emerald-500/5 text-white' 
                    : isCurrent
                    ? 'neu-card border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                    : 'neu-inset-sm border-white/[0.05] text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[10px] text-slate-400">0{idx + 1}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                  )}
                </div>
                <div className="font-bold text-xs truncate text-white">{step.name}</div>
                <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {step.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Upload / Ingestion Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Upload Controller */}
        <div className="lg:col-span-2 space-y-6">
          <div className="neu-card p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-blue-400" />
                <span>Upload Transaction Dataset</span>
              </h2>

              {/* Format Selector Pills */}
              <div className="flex items-center gap-1 neu-inset p-1 rounded-xl text-xs">
                {(['CSV', 'JSON', 'Excel', 'API'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedFormat === fmt
                        ? 'neu-raised text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div className="neu-inset rounded-2xl p-8 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-3 hover:border-blue-500/40 transition">
              <div className="w-14 h-14 rounded-2xl neu-raised flex items-center justify-center text-blue-400 shadow-[6px_6px_14px_rgba(0,0,0,0.6)]">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Drop your inter-bank settlement {selectedFormat} file here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports multi-institution clearing logs, NEFT/RTGS batch feeds, and UPI transactional ledgers.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleStartIngestion}
                  disabled={isProcessing}
                  className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(37,99,235,0.4)] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Ingest & Synthesize Graph</span>
                    </>
                  )}
                </button>

                <a
                  href={`${import.meta.env.BASE_URL}sample_transaction_logs.csv`}
                  download="sample_transaction_logs.csv"
                  className="neu-btn px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Sample CSV</span>
                </a>
              </div>
            </div>

            {/* Post-Upload Ingestion Success Banner */}
            {ingestionComplete && (
              <div className="neu-card p-4 border border-emerald-500/30 bg-emerald-500/10 rounded-2xl space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>2,483,921 transactions successfully ingested</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="neu-inset-sm p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Accounts</span>
                    <span className="text-base font-extrabold text-white font-mono-numbers">48,231</span>
                  </div>
                  <div className="neu-inset-sm p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Institutions</span>
                    <span className="text-base font-extrabold text-white font-mono-numbers">5 Banks</span>
                  </div>
                  <div className="neu-inset-sm p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Suspicious Rings</span>
                    <span className="text-base font-extrabold text-red-400 font-mono-numbers">173 Clusters</span>
                  </div>
                  <div className="neu-inset-sm p-2 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Graph Build Time</span>
                    <span className="text-base font-extrabold text-cyan-400 font-mono-numbers">1.48s</span>
                  </div>
                </div>
              </div>
            )}

            {/* Expected Schema Mapping Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                Canonical Transaction Schema Specification
              </span>
              <div className="neu-inset-sm rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left font-mono">
                  <thead className="border-b border-white/[0.06] text-[10px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="py-2.5 px-3">Field</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Normalization Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-[11px] text-slate-300">
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">source_account</td>
                      <td className="py-2 px-3 text-slate-400">STRING</td>
                      <td className="py-2 px-3">Originating account identifier</td>
                      <td className="py-2 px-3 text-emerald-400">Entity Resolved</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">destination_account</td>
                      <td className="py-2 px-3 text-slate-400">STRING</td>
                      <td className="py-2 px-3">Beneficiary account identifier</td>
                      <td className="py-2 px-3 text-emerald-400">Entity Resolved</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">amount_inr</td>
                      <td className="py-2 px-3 text-slate-400">DECIMAL(18,2)</td>
                      <td className="py-2 px-3">Settlement value in Indian Rupee</td>
                      <td className="py-2 px-3 text-cyan-400">Direct Float conversion</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">timestamp_utc</td>
                      <td className="py-2 px-3 text-slate-400">ISO-8601</td>
                      <td className="py-2 px-3">Transaction execution timestamp</td>
                      <td className="py-2 px-3 text-cyan-400">IST Temporal indexing</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">rail_type</td>
                      <td className="py-2 px-3 text-slate-400">ENUM</td>
                      <td className="py-2 px-3">IMPS | RTGS | NEFT | UPI | WIRE</td>
                      <td className="py-2 px-3 text-slate-400">Payment system categorization</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-blue-400 font-bold">bank_ifsc</td>
                      <td className="py-2 px-3 text-slate-400">STRING(11)</td>
                      <td className="py-2 px-3">11-character Indian Financial Code</td>
                      <td className="py-2 px-3 text-amber-400">Maps to 5 Core Banks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ingestion Activity & Pre-loaded Logs */}
        <div className="space-y-6">
          {/* Preset Sample Datasets for Demo */}
          <div className="neu-card p-5 space-y-4">
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Pre-loaded Benchmark Datasets</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select one of the verified synthetic banking datasets to test heuristic accuracy:
            </p>

            <div className="space-y-2.5">
              {INGESTION_DATASETS.map((ds) => (
                <div
                  key={ds.id}
                  onClick={handleStartIngestion}
                  className="neu-btn p-3 rounded-xl cursor-pointer hover:border-blue-500/40 transition space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-400">{ds.format}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {ds.status}
                    </span>
                  </div>
                  <div className="font-bold text-white text-xs truncate">
                    {ds.filename}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1 border-t border-white/[0.06]">
                    <div>
                      <span>Txns: </span>
                      <strong className="text-white">{(ds.transactionsCount / 1000000).toFixed(2)}M</strong>
                    </div>
                    <div>
                      <span>Size: </span>
                      <strong className="text-white">{ds.sizeBytes}</strong>
                    </div>
                    <div>
                      <span>Clusters: </span>
                      <strong className="text-red-400">{ds.suspiciousClustersDetected}</strong>
                    </div>
                    <div>
                      <span>Banks: </span>
                      <strong className="text-cyan-400">{ds.institutionsCount}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Engine Telemetry */}
          <div className="neu-card p-5 space-y-3 text-xs">
            <div className="font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Normalization Telemetry</span>
            </div>

            <div className="space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Active Parser</span>
                <span className="font-mono text-white">Apache Arrow / Polars Engine</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Throughput Rate</span>
                <span className="font-mono text-emerald-400">185,000 txns/sec</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entity Disambiguation</span>
                <span className="font-mono text-cyan-400">PAN / GSTN Fuzzy Resolution</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cycle Detection DFS</span>
                <span className="font-mono text-amber-400">Tarjan Depth-First (k ≤ 8)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesPage;
