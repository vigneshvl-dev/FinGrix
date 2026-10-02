import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Share2, 
  ArrowLeftRight,
  Bell, 
  ShieldAlert, 
  Clock, 
  FolderKanban, 
  FileText, 
  Settings, 
  User,
  LogOut,
  ShieldCheck,
  Layers,
  Database,
  Building2,
  FileCheck,
  Zap,
  Activity
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, currentCase, currentUser, logout } = useInvestigation();
  const unreadAlerts = alerts.filter(a => a.status === 'New').length;

  const workspaceNav = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Investigations', path: '/investigations', icon: Search },
    { name: 'Network Graph', path: `/investigations/${currentCase?.id || 'INV-2026-0173'}`, icon: Share2 },
    { name: 'Transaction Explorer', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlerts },
  ];

  const forensicNav = [
    { name: 'Pattern Detection', path: '/detection', icon: ShieldAlert },
    { name: 'Temporal Analysis', path: '/temporal', icon: Clock },
    { name: 'Fund Flow', path: '/fund-flow', icon: Zap },
    { name: 'Account Clusters', path: '/account-clusters', icon: Layers },
    { name: 'Entity Intelligence', path: '/entity-intelligence', icon: Building2 },
  ];

  const caseNav = [
    { name: 'Cases', path: '/cases', icon: FolderKanban },
    { name: 'Evidence', path: '/evidence', icon: FileCheck },
    { name: 'Investigation Timeline', path: '/timeline', icon: Activity },
    { name: 'Reports / Dossier', path: '/reports', icon: FileText },
  ];

  const systemNav = [
    { name: 'Data Sources', path: '/data-sources', icon: Database },
    { name: 'Institution Network', path: '/institutions', icon: Building2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-[236px] bg-[#0E131E] border-r border-white/[0.06] shadow-[4px_0_16px_rgba(0,0,0,0.6)] flex flex-col flex-shrink-0 select-none z-20">
      {/* Neumorphic Brand Header */}
      <div className="px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-blue-400 border border-white/10 shadow-[4px_4px_10px_rgba(0,0,0,0.6),-2px_-2px_6px_rgba(255,255,255,0.04)]">
            <Share2 className="w-4 h-4 transform -rotate-12" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-wider text-white">
                FINGRIX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-blue-400 font-mono tracking-tight font-semibold">
              Financial Forensics
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation with Neumorphic items */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
        {/* WORKSPACE */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Workspace
          </div>
          <nav className="space-y-1">
            {workspaceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150
                    ${isActive 
                      ? 'neu-inset text-blue-400 font-semibold border border-blue-500/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-1px_-1px_3px_rgba(255,255,255,0.03)]' 
                      : 'text-slate-400 hover:text-white hover:neu-raised-sm'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* FORENSIC ANALYSIS */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Forensic Analysis
          </div>
          <nav className="space-y-1">
            {forensicNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150
                    ${isActive 
                      ? 'neu-inset text-blue-400 font-semibold border border-blue-500/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-1px_-1px_3px_rgba(255,255,255,0.03)]' 
                      : 'text-slate-400 hover:text-white hover:neu-raised-sm'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* CASE MANAGEMENT */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Case Management
          </div>
          <nav className="space-y-1">
            {caseNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150
                    ${isActive 
                      ? 'neu-inset text-blue-400 font-semibold border border-blue-500/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-1px_-1px_3px_rgba(255,255,255,0.03)]' 
                      : 'text-slate-400 hover:text-white hover:neu-raised-sm'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* SYSTEM */}
        <div>
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            System
          </div>
          <nav className="space-y-1">
            {systemNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150
                    ${isActive 
                      ? 'neu-inset text-blue-400 font-semibold border border-blue-500/30 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.7),inset_-1px_-1px_3px_rgba(255,255,255,0.03)]' 
                      : 'text-slate-400 hover:text-white hover:neu-raised-sm'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Logged In Investigator Profile with Neumorphic Tile */}
      <div className="p-3 border-t border-white/[0.06] bg-[#0A0D15]">
        <div className="p-2.5 rounded-xl neu-card border border-white/[0.06] flex items-center justify-between gap-2 shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.03)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg neu-inset-sm flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0 border border-blue-500/20">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                {currentUser.institution || 'HDFC Bank'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign out"
            className="w-7 h-7 rounded-lg neu-btn flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/30 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
