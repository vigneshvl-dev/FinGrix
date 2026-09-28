import React from 'react';

export const SecurityStatus: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-xs select-none">
      <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
      <span className="font-medium text-text-primary">Secure access</span>
      <span className="text-text-muted">•</span>
      <span className="text-text-secondary">System operational</span>
    </div>
  );
};
