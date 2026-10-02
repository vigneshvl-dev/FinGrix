import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  ArrowRight,
  Database,
  Sparkles
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
  referencedTransactions?: string[];
  referencedAccounts?: string[];
}

export const InvestigatorAssistantDrawer: React.FC = () => {
  const { assistantOpen, setAssistantOpen, askAssistant, scenario, setSelectedAccount } = useInvestigation();
  const navigate = useNavigate();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Forensic AI Copilot active for dataset: ${scenario.name}. You may query account relationships, shortest suspicious paths, or transaction timing.`,
      timestamp: '19:30',
      suggestedAction: 'Select a query below or enter an account identifier.',
    }
  ]);

  const quickQueries = [
    "Why was this network flagged?",
    "Show the shortest suspicious path.",
    "Show all accounts connected to ACC-1042.",
    "Which transactions occurred within 10 minutes of this transfer?",
    "Summarize this investigation.",
    "Prepare a case report."
  ];

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    setTimeout(() => {
      const response = askAssistant(queryText);
      const assistantMsg: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: response.suggestedAction,
        referencedTransactions: response.referencedTransactions,
        referencedAccounts: response.referencedAccounts,
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 200);
  };

  if (!assistantOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-[#0E131E] border-l border-white/[0.08] shadow-[-12px_0_36px_rgba(0,0,0,0.85)] z-50 flex flex-col select-none text-xs font-sans">
      {/* Neumorphic Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-[#111724]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl neu-raised flex items-center justify-center text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide">
              Forensic AI Copilot
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">Evidence-backed intelligence engine</p>
          </div>
        </div>
        <button 
          onClick={() => setAssistantOpen(false)}
          className="neu-btn text-slate-400 hover:text-white p-1.5 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dataset Context Bar */}
      <div className="px-4 py-2 bg-[#0A0D15] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Dataset: <strong className="text-white font-medium">{scenario.code}</strong></span>
        <span className="text-blue-400">{scenario.accounts.length} entities indexed</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0C1019]">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'neu-btn-primary shadow-[4px_4px_12px_rgba(0,0,0,0.6)]' 
                  : 'neu-card border border-white/[0.06] text-slate-200'
              }`}
            >
              <div>{m.text}</div>

              {m.suggestedAction && (
                <div className="mt-2.5 pt-2.5 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-start gap-1.5 neu-inset-sm p-2 rounded-lg">
                  <span className="text-blue-400 font-semibold font-mono">Recommendation:</span>
                  <span className="text-slate-200">{m.suggestedAction}</span>
                </div>
              )}

              {m.referencedAccounts && m.referencedAccounts.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 font-mono">Entities:</span>
                  {m.referencedAccounts.map(accId => (
                    <button
                      key={accId}
                      onClick={() => {
                        const entity = scenario.accounts.find(a => a.id === accId);
                        if (entity) {
                          setSelectedAccount(entity);
                          navigate('/investigations/FG-2026-001');
                        }
                      }}
                      className="px-2 py-0.5 rounded-lg neu-inset-sm text-blue-400 font-mono text-[10px] border border-blue-500/20 hover:border-blue-500/50 cursor-pointer"
                    >
                      {accId}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">{m.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Suggested Queries */}
      <div className="p-3 border-t border-white/[0.06] bg-[#0E131E]">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
          <Bot className="w-3 h-3 text-cyan-400" />
          Suggested Forensic Inquiries
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {quickQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] text-slate-300 hover:text-white neu-btn px-2.5 py-1 rounded-xl text-left transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.06] bg-[#111724] flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputQuery)}
          placeholder="Ask about accounts, velocity, loops..."
          className="neu-input flex-1 px-3 py-2 rounded-xl text-xs text-white placeholder-slate-500"
        />
        <button
          onClick={() => handleSend(inputQuery)}
          className="neu-btn-primary p-2 rounded-xl text-white transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InvestigatorAssistantDrawer;
