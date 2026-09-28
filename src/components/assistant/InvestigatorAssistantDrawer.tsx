import React, { useState } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  ArrowRight,
  Database
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
      text: `Forensic Assistant active for dataset: ${scenario.name}. You may query account relationships, shortest suspicious paths, or transaction timing.`,
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
    <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-white border-l border-border shadow-modal z-50 flex flex-col select-none text-xs">
      {/* Header */}
      <div className="p-3.5 border-b border-border flex items-center justify-between bg-surface-secondary">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand" />
          <div>
            <h3 className="text-xs font-semibold text-text-primary">
              Forensic Assistant
            </h3>
            <p className="text-[11px] text-text-muted">Evidence & data-backed query engine</p>
          </div>
        </div>
        <button 
          onClick={() => setAssistantOpen(false)}
          className="text-text-muted hover:text-text-primary p-1 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dataset Context Bar */}
      <div className="px-3.5 py-1.5 bg-white border-b border-border flex items-center justify-between text-[11px] text-text-secondary">
        <span>Dataset: <strong className="text-text-primary font-medium">{scenario.code}</strong></span>
        <span>{scenario.accounts.length} entities</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-page">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`max-w-[90%] rounded p-3 text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-white border border-border text-text-primary shadow-sm'
              }`}
            >
              <div>{m.text}</div>

              {m.suggestedAction && (
                <div className="mt-2 pt-2 border-t border-border text-[11px] text-text-secondary flex items-start gap-1">
                  <span>Recommendation:</span>
                  <span className="font-medium text-brand">{m.suggestedAction}</span>
                </div>
              )}

              {m.referencedAccounts && m.referencedAccounts.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1 pt-1.5 border-t border-border">
                  <span className="text-[10px] text-text-muted">Entities:</span>
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
                      className="px-1.5 py-0.2 rounded bg-surface-secondary text-brand font-mono text-[10px] border border-border hover:bg-brand-subtle"
                    >
                      {accId}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-text-muted mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Suggested Queries */}
      <div className="p-3 border-t border-border bg-white">
        <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
          Suggested Queries
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {quickQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] text-text-secondary hover:text-text-primary bg-surface-secondary border border-border px-2 py-1 rounded text-left transition"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputQuery)}
          placeholder="Ask about accounts, velocity, paths..."
          className="flex-1 bg-surface-secondary border border-border rounded px-3 py-1.5 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-brand focus:bg-white transition-colors"
        />
        <button
          onClick={() => handleSend(inputQuery)}
          className="p-1.5 rounded bg-brand text-white hover:bg-brand-hover transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
