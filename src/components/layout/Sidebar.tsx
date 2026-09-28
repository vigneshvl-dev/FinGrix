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
  LogOut
} from 'lucide-react';
import { useInvestigation } from '../../context/InvestigationContext';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, currentCase, currentUser, logout } = useInvestigation();
  const unreadAlerts = alerts.filter(a => a.status === 'New').length;

  const workspaceNav = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Investigations', path: '/investigations', icon: Search },
    { name: 'Network Analysis', path: `/investigations/${currentCase?.id || 'FG-2026-001'}`, icon: Share2 },
    { name: 'Transactions', path: '/timeline', icon: ArrowLeftRight },
    { name: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlerts },
  ];

  const analysisNav = [
    { name: 'Detection', path: '/detection', icon: ShieldAlert },
    { name: 'Timeline', path: '/timeline', icon: Clock },
    { name: 'Cases', path: '/cases', icon: FolderKanban },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  return (
    <aside className="w-[230px] bg-white border-r border-border flex flex-col flex-shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-brand flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <Share2 className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="font-bold text-sm tracking-tight text-text-primary block font-sans">
              FINGRAPH
            </span>
            <p className="text-[11px] text-text-secondary truncate leading-tight">
              Forensic Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-3 overflow-y-auto space-y-5">
        {/* Workspace section */}
        <div>
          <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Workspace
          </div>
          <nav className="space-y-0.5">
            {workspaceNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors
                    ${isActive 
                      ? 'bg-brand-subtle text-brand border-l-2 border-brand font-semibold rounded-l-none' 
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded bg-risk text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Analysis section */}
        <div>
          <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Analysis
          </div>
          <nav className="space-y-0.5">
            {analysisNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-colors
                    ${isActive 
                      ? 'bg-brand-subtle text-brand border-l-2 border-brand font-semibold rounded-l-none' 
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
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

        {/* System section */}
        <div>
          <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            System
          </div>
          <nav className="space-y-0.5">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
            >
              <Settings className="w-4 h-4 text-text-muted flex-shrink-0" />
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Logged In Investigator Profile */}
      <div className="p-3 border-t border-border bg-surface-secondary">
        <div className="flex items-center justify-between gap-2 p-1 rounded">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded bg-brand-subtle border border-brand/20 flex items-center justify-center text-xs font-semibold text-brand flex-shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-text-primary truncate">{currentUser.name}</p>
              <p className="text-[11px] text-text-secondary truncate">{currentUser.institution || 'Lead Forensics'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign out"
            className="p-1 rounded text-text-muted hover:text-risk hover:bg-white transition"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
