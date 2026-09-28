import React from 'react';

export const LoginFooter: React.FC = () => {
  return (
    <footer className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-muted gap-2 select-none">
      <div>
        © 2026 FINGRAPH. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-text-secondary transition-colors">
          Privacy
        </a>
        <span>•</span>
        <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-text-secondary transition-colors">
          Security
        </a>
        <span>•</span>
        <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-text-secondary transition-colors">
          Help
        </a>
      </div>
    </footer>
  );
};
